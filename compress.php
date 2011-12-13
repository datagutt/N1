<?php
$filesAvailable = array("N1.core.js","N1.dom.js","N1.effects.js","N1.ajax.js");
$output = '';
// add each files output to variable
foreach($filesAvailable as $file){
	$output .= file_get_contents("js/".$file);
}
// compress js
$ch = curl_init('http://closure-compiler.appspot.com/compile');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, 'output_info=compiled_code&output_format=text&compilation_level=SIMPLE_OPTIMIZATIONS&js_code=' . urlencode($output));
$compressed_output = curl_exec($ch);
curl_close($ch);
file_put_contents("js/N1.min.js", $compressed_output);