<?php
	header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    	session_start();
    	if (!isset($_SESSION['time1'])) {
		    $_SESSION['time1'] = date("H:i:s");
		}
		else {
			echo $_SESSION['time1'];
		}
    }

?>