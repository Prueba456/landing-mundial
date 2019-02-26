<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");	
	require_once("MysqliDb.php");
	require_once("config.php");
	$db = new MysqliDb(server, user, password, database);
	$sql = "SELECT COUNT(*) FROM registros_mundial";

	$result = $db->query($sql);	
	setcookie("num_soc", $result[0]['COUNT(*)'], time()+3600,'/'); 
	echo "jsoncallback(".$result[0]['COUNT(*)'].")"; 
?>