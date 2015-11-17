$(document).ready(function(){
	var $output;
	$("#button").click(function(){

       output='<p>'+$("#text").val()+'</p>';
       $("#div").append(output);
	});
});