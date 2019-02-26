<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");	
	require_once("MysqliDb.php");
	require_once("config.php");
	$db = new MysqliDb(server, user, password, database);
	
	$db->where("email",$_REQUEST["email"]);
	
	$esta = $db->get('registros_mundial');
	if(empty($esta[0])){	
		$arr = array (								
			"nombre"		=> $_REQUEST["nombre"],								
			"dni "			=> $_REQUEST["dni"],	
			"email"			=> $_REQUEST["email"],	
			"id_personaje"	=> $_REQUEST["personaje"]
		);
		$id = $db->insert('registros_mundial', $arr);	
	}
	echo json_encode(true); 
?>