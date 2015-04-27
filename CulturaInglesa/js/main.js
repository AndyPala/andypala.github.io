$("document").ready(function(){
	$('.sidebar').first().sidebar('attach events', '.button');
	$('.toggle.button').removeClass('disabled');
	$('.menu .item').tab()
;
});