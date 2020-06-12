<?php
	header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input')); // для post используем -> для доступа к ключам объекта
        $jsonString = file_get_contents('./login.json');  
        $jsonData = json_decode($jsonString);
        $newObj;
        foreach ($jsonData as $item) {
            if ($data->login==$item->login) {
                $newObj = $item;
            }
        }
        if($newObj->password==$data->password) {
            session_start();
            
            $obj = new stdClass;
            $obj->success = TRUE;
            $obj->id = $newObj->id;
            echo json_encode($obj);
        }
        else {
            $obj = new stdClass;
            $obj->success = FALSE;
            $obj->error = 'Wrong login or password';
            echo json_encode($obj);
        }
    }
?>

