<?php
	header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Max-Age: 1000');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
  //$data = json_decode(file_get_contents('php://input'), true); (для post)
  $jsonString = file_get_contents('./actions.json'); 
  if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['id'])) {
    $jsonFile = json_decode($jsonString, true);
    echo $jsonString;
  }
  else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id']) && isset($_GET['group'])) {
    $jsonFile = json_decode($jsonString, true);
    $array = [];
    foreach ($jsonFile as $item) {
      if($item['group']['id'] == $_GET['id'] || ($item['followedUser']['type']=='group' && $item['followedUser']['id'] == $_GET['id'])) {
        array_push($array, $item);
      }
    }
    $obj = json_encode($array);
    echo $obj;
  } 
  else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $jsonFile = json_decode($jsonString, true);
    $array = [];
    foreach ($jsonFile as $item) {
      if($item['user']['id'] == $_GET['id'] || ($item['followedUser']['id'] == $_GET['id'] && $item['followedUser']['type'] == 'user')) {
        array_push($array, $item);
      }
    }
    $obj = json_encode($array);
    echo $obj;
  } 
?>