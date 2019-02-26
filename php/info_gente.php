<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");	
	require_once("MysqliDb.php");
	require_once("config.php");
	$db = new MysqliDb(server, user, password, database);
	$sql = "SELECT id,nombre,id_personaje FROM registros_mundial LIMIT 40";

	$result = $db->query($sql);	
	//setcookie("num_soc", $result[0]['COUNT(*)'], time()+3600,'/'); 

	echo $_GET['jsoncallbackinfo'] . "(" . json_encode($result)." ) ";
?>