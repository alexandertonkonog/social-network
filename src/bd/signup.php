<?php
	header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: POST, GET');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

    $jsonData = json_decode(file_get_contents('./login.json'));
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $needObj = [];
        foreach ($jsonData as $item) {
            array_push($needObj, $item->login); 
        }
        echo json_encode($needObj);
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input')); // для post используем -> для доступа к ключам объекта
        $users = json_decode(file_get_contents('./users.json'));
        $checkVar = 0;
        foreach ($jsonData as $item) {
            if($item->login == $data->login) {
                $obj = new stdClass;
                $obj->success = FALSE;
                $obj->error = 'This login already exist';
                $checkVar = 1;
                echo json_encode($obj);
            }
        }
        if($checkVar == 0) {
            $newObj = new stdClass;
            $newObj->login = $data->login;
            $newObj->password = $data->password;
            $newObj->id = count($jsonData)+1;
            array_push($jsonData, $newObj); 
            file_put_contents('./login.json', json_encode($jsonData));

            $userObj = new stdClass;
            $userObj->name = $data->name;
            $userObj->id = $newObj->id;
            $userObj->friends = 0;
            $userObj->active = date('d.m.y H:i');
            if(isset($data->link)) {
                $userObj->avatar = $data->link;
            }
            else {
                $userObj->avatar = "https://www.lifesciencetraininginstitute.com/wp-content/uploads/2017/08/instructor_man-placeholder.png";
            }
            $userObj->tag = "Newest";
            array_push($users->list, $userObj);
            file_put_contents('./users.json', json_encode($users));
            
            $obj = new stdClass;
            $obj->success = TRUE;
            $obj->id = $newObj->id;
            echo json_encode($obj); 
        }
    }
?>