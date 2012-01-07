<?php
/*
	N1 0.1 | github.com/datagutt/N1 
	Builder
*/
$avail = array();
$files = array();
$avail["core"] = "on";
$avail["dom"] = isset($_POST["dom"]) ? $_POST["dom"] : "";
$avail["ajax"] = isset($_POST["ajax"]) ? $_POST["ajax"] : "";
$avail["effects"] = isset($_POST["effects"]) ? $_POST["effects"] : "";
foreach($avail as $item => $value){
	if($value == "on"){
		$files[] = "N1.".$item.".js";
	}
}
$output = '';
$time = time();
// add each files output to variable
foreach($files as $file){
	$output .= file_get_contents("../js/".$file);
}
// compress js
$ch = curl_init('http://closure-compiler.appspot.com/compile');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'output_info=compiled_code&output_format=text&compilation_level=SIMPLE_OPTIMIZATIONS&js_code=' . urlencode($output));
$compressed_output = curl_exec($ch);
curl_close($ch);
$filename = "../js/N1.min.js";
file_put_contents($filename, $compressed_output);
echo "N1 is now built. It is available in your ../js folder, and it is named $filename.";