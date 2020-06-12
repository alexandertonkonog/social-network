<?php
	header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Credentials: true");
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Max-Age: 1000');
  header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
  //$data = json_decode(file_get_contents('php://input'), true); (для post)
  $jsonString = file_get_contents('./users.json'); 
  if ($_SERVER['REQUEST_METHOD'] === 'GET' && !isset($_GET['id'])) {
    echo $jsonString;
  }
  else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['group']) && isset($_GET['id'])) {
    $jsonFile = json_decode($jsonString, true);
    foreach ($jsonFile['groups'] as $item) {
      if($item['id'] == $_GET['id']) {
        $obj = json_encode($item);
        echo $obj;
      }
    }
  }
  else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    $jsonFile = json_decode($jsonString, true);
    foreach ($jsonFile['list'] as $item) {
      if($item['id'] == $_GET['id']) {
        $obj = json_encode($item);
        echo $obj;
      }
    }
  } 
?>