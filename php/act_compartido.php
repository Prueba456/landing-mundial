<?php
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: *");	
	require_once("MysqliDb.php");
	require_once("config.php");
	$db = new MysqliDb(server, user, password, database);
	
	$db->where("id",$_REQUEST["num_soc"]);

	$arr = array (								
		"compartido"	=> 1
	);
	$id = $db->update('registros_mundial', $arr);	
	echo json_encode(true); 
?>