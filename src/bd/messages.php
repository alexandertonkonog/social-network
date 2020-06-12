<?php
	header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: POST,GET');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input')); // для post используем -> для доступа к ключам объекта

        $name1 = $data->id.'id.json'; //имя 1 файла
        $name2 = $data->userId.'id.json'; //имя 2 файла
        
        $jsonData1 = json_decode(file_get_contents('./messages/'.$name1));  //открываем файл переписки
        $jsonData2 = json_decode(file_get_contents('./messages/'.$name2));  
        $users = json_decode(file_get_contents('./users.json')); // открываем файл юзеров, чтобы достать нужного

        $needUser;

        foreach ($users->list as $user) { //достаем нужного, чтобы взять данные
            if($user->id == $data->id) {
                $needUser=$user;
            }
        }
        
        $nuInfo = new stdClass; // создаем объект юзера, отправившего сообщение
        $nuInfo->id = $needUser->id;
        $nuInfo->name = $needUser->name;
        $nuInfo->img = $needUser->avatar;
        
        $newMessage = new stdClass; // создаем объект сообщения
        $newMessage->user = $nuInfo;
        $newMessage->text = $data->text;
        $newMessage->time = date('d.m.y H:i');

        $needArr1 = $data->id.'id';
        $needArr2 = $data->userId.'id';

        array_push($jsonData1->$needArr2, $newMessage); //добавляем наш объект в массив из файла
        array_push($jsonData2->$needArr1, $newMessage); 

        file_put_contents('./messages/'.$name1, json_encode($jsonData1)); //перезаписываем в файл новый массив
        file_put_contents('./messages/'.$name2, json_encode($jsonData2)); 
        
        echo json_encode($jsonData1->$needArr2);        
    }
    else if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id']) && isset($_GET['userId'])) {
        $name1 = $_GET['id'].'id.json'; //имя 1 файла
        $name2 = $_GET['userId'].'id.json'; //имя 1 файла

        function getMessages($name, $userId){
            $jsonData = json_decode(file_get_contents('./messages/'.$name)); //открываем файл
            $needUser = $userId.'id';
            echo json_encode($jsonData->$needUser); //отправляем файл
        }
        function checkObj($name, $id){
            $jsonData = json_decode(file_get_contents('./messages/'.$name));
            $chekingArr = $id.'id';
            if(!isset($jsonData->$chekingArr)) {
                $jsonData->$chekingArr = [];
                file_put_contents('./messages/'.$name, json_encode($jsonData)); 
            } 
        }
        function createFile($name, $id) {
            $fp = fopen('./messages/'.$name, 'a');//создание файла, если его нет
            fclose($fp);
            $newObj = new stdClass;//создаем массив и передаем его в файл
            $newArr = $id.'id';
            $newObj->$newArr = []; 
            file_put_contents('./messages/'.$name, json_encode($newObj)); 
        }
        

        if(file_exists('./messages/'.$name1)) { //проверка существования файла
            if(!file_exists('./messages/'.$name2)) {
                createFile($name2, $_GET['id']);
            }
            else {
                checkObj($name2, $_GET['id']);
            }
            checkObj($name1, $_GET['userId']);
            getMessages($name1, $_GET['userId']); //отправляем файл1
        }
        else {
            createFile($name1, $_GET['userId']);
            if(!file_exists('./messages/'.$name2)) {
                createFile($name2, $_GET['id']);
            }
            else {
                checkObj($name2, $_GET['id']);
            }
            getMessages($name1, $_GET['userId']); //отправляем файл
        }

    }
    else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $newObj = new stdClass;
        $abc = 'abc';
        $newObj->$abc = [];
        echo json_encode($newObj);
    }
?>