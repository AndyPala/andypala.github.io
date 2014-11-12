function init(){
	viewport = {width:window.innerWidth*0.97, height:window.innerHeight*0.97};

	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.01 );

	camera = new THREE.PerspectiveCamera( 75,  viewport.width/viewport.height , 0.1, 1000 );
	camera.lookAt(new THREE.Vector3( 0, 0, -5 ));

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( viewport.width, viewport.height );
	//0x060710
	renderer.setClearColor( 0x00000000, 1 );//304049
	document.body.appendChild( renderer.domElement );

	//------------Particulas
	paritclesGeometry = new THREE.Geometry();
	particlesMap = THREE.ImageUtils.loadTexture("textures/disc.png");
	particleAttributes = 
	{
		size: 10,
		map: particlesMap,
		transparent: true,
		sizeAttenuation: false
	};
	particlesMaterial = new THREE.PointCloudMaterial(particleAttributes);
	particlesMaterial.color.setHSL( 0.16, 1.0, 0.5 );

	for (var i = 0; i < 1000; i++) {
		var vertice = new THREE.Vector3();
		vertice.x = Math.random() * 500 - 250;
		vertice.y = Math.random() * 500 - 250;
		vertice.z = Math.random() * 500 - 250;

		paritclesGeometry.vertices.push(vertice);
	}

	particles = new THREE.PointCloud( paritclesGeometry, particlesMaterial );
	particles.sortParticles = true;
	scene.add(particles);

	rotationYC = 0.0005;
}

function render() {
	requestAnimationFrame(render);

	update();

	renderer.render(scene, camera);
}

function update(){
	particles.rotation.y += rotationYC;
}

infoHtml = "";
imgHtml = "";
codeHtml = "";

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

function bindEvents(){
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
}


$(document).ready(function(){
	linkSidr();
	bindEvents();

	init();
	render();
});