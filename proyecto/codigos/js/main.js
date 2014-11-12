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
codeHtml = "";

$(document).ready(function(){
	init();
	render();
	//alert("hola jquery");

	linkSidr();

	$('#subwooferInfo').click(function() {
		infoHtml = "Subwoofer marca gato - 25cm - 120v";
		imgHtml = "<img src=\"imgs/subw.png\" height=\"100\" width=\"100\">";
		codeHtml = "<img src=\"imgs/codes/0.jpg\" height=\"100\" width=\"100\">";
		$('#sidrImg').html(imgHtml);
		$('#sidrInfo').html(infoHtml);
		$('#sidrCode').html(codeHtml);
	});

	$('#tvInfo').click(function() {
		infoHtml = "Television marca pato - 3D - 4K";
		imgHtml = "<img src=\"imgs/tv.png\" height=\"100\" width=\"100\">";
		codeHtml = "<img src=\"imgs/codes/1.jpg\" height=\"100\" width=\"100\">";
		$('#sidrImg').html(imgHtml);
		$('#sidrInfo').html(infoHtml);
		$('#sidrCode').html(codeHtml);
	});

	$('#dvdInfo').click(function() {
		infoHtml = "Reproductor de Dvd marca perro";
		imgHtml = "<img src=\"imgs/dvd.png\" height=\"100\" width=\"100\">";
		codeHtml = "<img src=\"imgs/codes/2.jpg\" height=\"100\" width=\"100\">";
		$('#sidrImg').html(imgHtml);
		$('#sidrInfo').html(infoHtml);
		$('#sidrCode').html(codeHtml);
	});

	$('#bocinaInfo').click(function() {
		infoHtml = "Bocina para microondas - 5cm - 20v";
		imgHtml = "<img src=\"imgs/bocina.png\" height=\"100\" width=\"100\">";
		codeHtml = "<img src=\"imgs/codes/3.jpg\" height=\"100\" width=\"100\">";
		$('#sidrImg').html(imgHtml);
		$('#sidrInfo').html(infoHtml);
		$('#sidrCode').html(codeHtml);
	});

	$('#monitorInfo').click(function() {
		infoHtml = "Juego mi primer computadora";
		imgHtml = "<img src=\"imgs/pc.png\" height=\"100\" width=\"100\">";
		codeHtml = "<img src=\"imgs/codes/4.jpg\" height=\"100\" width=\"100\">";
		$('#sidrImg').html(imgHtml);
		$('#sidrInfo').html(infoHtml);
		$('#sidrCode').html(codeHtml);
	});

	$('#torreInfo').click(function() {
		infoHtml = "Ladrillo LEGO para construccion";
		imgHtml = "<img src=\"imgs/torre.png\" height=\"100\" width=\"100\">";
		codeHtml = "<img src=\"imgs/codes/5.jpg\" height=\"100\" width=\"100\">";
		$('#sidrImg').html(imgHtml);
		$('#sidrInfo').html(infoHtml);
		$('#sidrCode').html(codeHtml);
	});

	$('#laptopInfo').click(function() {
		infoHtml = "Laptop marca laptop";
		imgHtml = "<img src=\"imgs/laptop.png\" height=\"100\" width=\"100\">";
		codeHtml = "<img src=\"imgs/codes/6.jpg\" height=\"100\" width=\"100\">";
		$('#sidrImg').html(imgHtml);
		$('#sidrInfo').html(infoHtml);
		$('#sidrCode').html(codeHtml);
	});
});