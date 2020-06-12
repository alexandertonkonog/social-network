<?php
	header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: POST,GET');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
        $name = $_GET['id'].'id.json'; //имя 1 файла
        $users = json_decode(file_get_contents('./users.json')); // открываем файл юзеров, чтобы достать нужного
        if(!file_exists('./messages/'.$name)) {
            echo 'not dialogs';
        }
        else {
            $jsonData = json_decode(file_get_contents('./messages/'.$name));  //открываем файл переписки
            $arr = [];
            foreach ($jsonData as $key => $value) {
                $needUser;
                foreach ($users->list as $user) {
                    if($user->id == preg_replace("/[^0-9]/", '', $key)) {
                        $needUser=$user;
                    }
                }
                $nuInfo = new stdClass; // создаем объект юзера, отправившего сообщение
                $nuInfo->id = $needUser->id;
                $nuInfo->name = $needUser->name;
                $nuInfo->img = $needUser->avatar;

                $lastMessage = $value[count($value)-1];
                $newDialog = new stdClass;
                $newDialog->user = $nuInfo;
                $newDialog->lastMessage = $lastMessage->text;
                $newDialog->time = $lastMessage->time;
                $newDialog->adresant = $lastMessage->user->id;

                array_push($arr, $newDialog);
            }
            echo json_encode($arr);
        }
    }
?>