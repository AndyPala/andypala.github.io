$("document").ready(function(){
	$('.sidebar').first().sidebar('attach events', '.toggle.button');
	$('.toggle.button').removeClass('disabled');
	$('.menu .item').tab();
	$('#js-error').remove();
	$('#ignore-error').click(function(){
		$('#ie-error').slideUp();
	});

	var UAChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
	var UAFirefox = /firefox/.test(navigator.userAgent.toLowerCase());
	if (UAChrome  ||  UAFirefox){
		$('#ie-error').remove();
	}
});