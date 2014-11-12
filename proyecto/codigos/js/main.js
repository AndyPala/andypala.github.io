function init(){

}

function render () {

}

function linkSidr(){

	$('#subwooferInfo').sidr({
		side: 'right',
		displace: false
	});

	$('#tvInfo').sidr({
		side: 'right',
		displace: false
	});

	$('#dvdInfo').sidr({
		side: 'right',
		displace: false
	});
	
	$('#bocinaInfo').sidr({
		side: 'right',
		displace: false
	});

	$('#monitorInfo').sidr({
		side: 'right',
		displace: false
	});

	$('#torreInfo').sidr({
		side: 'right',
		displace: false
	});

	$('#laptopInfo').sidr({
		side: 'right',
		displace: false
	});
}

infoHtml = "";
imgHtml = "";

$(document).ready(function(){
	init();
	render();
	//alert("hola jquery");

	linkSidr();

	$('#subwooferInfo').click(function() {
		infoHtml = "Subwoofer marca gato - 25cm - 120v";
		imgHtml = "<img src=\"imgs/subw.png\" height=\"100\" width=\"100\">";
		$('#sidrInfo').html(infoHtml);
		$('#sidrImg').html(imgHtml);
	});
	/*
	tvInfo
	dvdInfo
	bocinaInfo
	monitorInfo
	torreInfo
	laptopInfo
	*/
});