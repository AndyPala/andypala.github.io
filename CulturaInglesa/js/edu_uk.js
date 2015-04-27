$("document").ready(function(){
	$('.sidebar').first().sidebar('attach events', '.button');
	$('.toggle.button').removeClass('disabled');
	$('.menu .item').tab();
	var options = { $AutoPlay: true };
	var jssor_slider1 = new $JssorSlider$('slider2_container', options);
	var jssor_slider1 = new $JssorSlider$('slider2_container_2', options);
});