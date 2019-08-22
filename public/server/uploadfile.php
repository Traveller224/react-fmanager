<?php
header('Content-Type:application/json');
$res = ["add"=>"0","msg"=>""];

$dir = dirname(__FILE__, 2).DIRECTORY_SEPARATOR."data".DIRECTORY_SEPARATOR;
//$uploadfile = $dir . basename($_FILES['file']['name']);

foreach ($_FILES as $k=>$v){
	$uploadfile = $dir . basename($v['name']);
	if(move_uploaded_file($v['tmp_name'], $uploadfile)){
		$res["add"]=1;
		$res["msg"].="Файл добавлен(ы)!";
	} else {
		$res["msg"].="Ошибка добавления файла(ов)!";
	}
}
exit(json_encode($res));
?>
