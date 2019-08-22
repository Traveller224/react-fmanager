<?php
header('Content-Type:application/json');

$res = ["err"=>"0","msg"=>""];
$dir = dirname(__FILE__, 2).DIRECTORY_SEPARATOR."data".DIRECTORY_SEPARATOR;

if(isset($_POST)){
	array_walk($_POST, 'sanitize');
	if(isset($_POST['delFile'])){
		if(unlink($dir.$_POST['delFile'])){
			$res["del"]=1;
			$res["msg"].="Файл удален с сервера!";
		}
		exit(json_encode($res));
	}
}

if(isset($_GET)){
	$files = scandir($dir);
	$fileList = [];

	foreach($files as $file){
		if(is_file($dir.$file)){
			$fileList[] = array("name" => "$file", "size" => filesize_format(filesize($dir.$file)), "lastmod" => date("H:i:s d-m-Y", filemtime($dir.$file)));
		}
	}
	exit(json_encode($fileList));
}

function filesize_format($filesize){
	$formats = array('Б','КБ','МБ','ГБ','ТБ');
	$format = 0;// формат размера по-умолчанию
	while ($filesize > 1024 && count($formats) != ++$format){
		$filesize = round($filesize / 1024, 2);
	}
	return $filesize." ".$formats[$format];
}



function sanitize($str){
	$str = stripslashes($str);
	$str = htmlspecialchars($str);
	$str = trim($str);
	return $str;
}
?>
