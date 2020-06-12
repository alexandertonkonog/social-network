<?php
	header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        session_start();
        session_destroy();
        $obj = new stdClass;
        $obj->success = TRUE;
        echo json_encode($obj);
    }
?>

