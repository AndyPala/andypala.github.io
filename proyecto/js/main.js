threshold = 128;
DEBUG = false;
var SELECTED;
var mouse = new THREE.Vector2();
var objects = [];

selectedItem = {
	descripcion:"ufyfuguguoihiluhkhlkjhgi",
	precio:1.5445,
	index: 0,
	toString: function(){
		var todo = "Descripcion: " + selectedItem.descripcion + "<br/>Precio: $" + selectedItem.precio;
		return todo;
	}
};

getUserMedia = function(t, onsuccess, onerror) {
	if (navigator.getUserMedia) {
		return navigator.getUserMedia(t, onsuccess, onerror);
	} else if (navigator.webkitGetUserMedia) {
		return navigator.webkitGetUserMedia(t, onsuccess, onerror);
	} else if (navigator.mozGetUserMedia) {
		return navigator.mozGetUserMedia(t, onsuccess, onerror);
	} else if (navigator.msGetUserMedia) {
		return navigator.msGetUserMedia(t, onsuccess, onerror);
	} else {
		onerror(new Error("No getUserMedia implementation found."));
	}
};

URL = window.URL || window.webkitURL;

createObjectURL = URL.createObjectURL || webkitURL.createObjectURL;
if (!createObjectURL) {
	throw new Error("URL.createObjectURL not found.");
}

getUserMedia({'video': true},
	function(stream) {
		url = createObjectURL(stream);
		video.src = url;
	},
	function(error) {
		alert("Couldn't access webcam.");
	}
);

function loadModels(){
	var loader = new THREE.OBJMTLLoader();
	speakerModel1 = new THREE.Object3D();
	tvModel = new THREE.Object3D();

	loader.load( 'obj/Speaker/speaker.obj', 'obj/Speaker/speaker.mtl', function( object ) {
		for (a in object.children){
			part = object.children[a];

			if (part.material){
				part.material.side = THREE.DoubleSide;
			}

			if (part.children.length>0){
				for(b in part.children){
					child = part.children[b];
					if (child.material){
						child.material.side = THREE.DoubleSide;
					}
				}
			}
		}
		speakerModel1 = object;
		//objects.push(speakerModel1);
	} );

	loader.load( 'obj/TV/tv_1.obj', 'obj/TV/tv_1.mtl', function( object ) {
		for (a in object.children){
			part = object.children[a];

			if (part.material){
				part.material.side = THREE.DoubleSide;
			}

			if (part.children.length>0){
				for(b in part.children){
					child = part.children[b];
					if (child.material){
						child.material.side = THREE.DoubleSide;
					}
				}
			}
		}
		tvModel = object;
		//objects.push(tvModel);
	} );
}

function init(){
	loadModels();

	video = document.createElement('video');
	video.width = 640;
	video.height = 480;
	video.loop = true;
	video.volume = 0;
	video.autoplay = true;
	video.controls = true;
	document.body.appendChild(video);
	video.style.display = 'none';

	canvas = document.createElement('canvas');
	canvas.width = 320;
	canvas.height = 240;
	document.body.appendChild(canvas);
	canvas.style.display = 'none';


	debugCanvas = document.createElement('canvas');
	debugCanvas.id = 'debugCanvas';
	debugCanvas.width = 320;
	debugCanvas.height = 240;
	document.body.appendChild(debugCanvas);
	debugCanvas.style.display = 'none';

	videoCanvas = document.createElement('canvas');
	videoCanvas.width = video.width;
	videoCanvas.height = video.width*3/4;

	ctx = canvas.getContext('2d');
	ctx.font = "24px URW Gothic L, Arial, Sans-serif";

	raster = new NyARRgbRaster_Canvas2D(canvas);
	param = new FLARParam(320,240);

	resultMat = new NyARTransMatResult();

	detector = new FLARMultiIdMarkerDetector(param, 120);
	detector.setContinueMode(true);

	tmp = new Float32Array(16);
	tmpMat = new THREE.Matrix4();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(960, 720);

	renderer.domElement.id = "glCanvas";
	glCanvas = renderer.domElement;
	s = glCanvas.style;
	document.body.appendChild(glCanvas);

	scene = new THREE.Scene();

	light = new THREE.PointLight(0xffffff);
	light.position.set(400, 500, 100);
	scene.add(light);
	light = new THREE.PointLight(0xffffff);
	light.position.set(-400, -500, -100);
	scene.add(light);

	// Create a camera and a marker root object for your Three.js scene.
	camera = new THREE.Camera();
	scene.add(camera);

	// Next we need to make the Three.js camera use the FLARParam matrix.
	param.copyCameraMatrix(tmp, 10, 10000);
	camera.projectionMatrix.setFromArray(tmp);

	videoTex = new THREE.Texture(videoCanvas);

	// Create scene and quad for the video.
	plane = new THREE.Mesh(
		new THREE.PlaneGeometry(2, 2, 0),
		new THREE.MeshBasicMaterial({map: videoTex})
	);
	plane.material.depthTest = false;
	plane.material.depthWrite = false;
	videoCam = new THREE.Camera();
	videoScene = new THREE.Scene();
	videoScene.add(plane);
	videoScene.add(videoCam);

	times = [];
	markers = {};
	lastTime = 0;

	projector = new THREE.Projector();
}

function update(){
	if (video.ended) video.play();
	if (video.paused) return;
	if (window.paused) return;
	if (video.currentTime == video.duration) {
		video.currentTime = 0;
	}
	if (video.currentTime == lastTime) return;
	lastTime = video.currentTime;
	videoCanvas.getContext('2d').drawImage(video,0,0);
	ctx.drawImage(videoCanvas, 0,0,320,240);

	canvas.changed = true;
	videoTex.needsUpdate = true;

	detected = detector.detectMarkerLite(raster, threshold);
	for (idx = 0; idx<detected; idx++) {
		id = detector.getIdMarkerData(idx);
		//currId;
		if (id.packetLength > 4) {
			currId = -1;
		}else{
			currId=0;
			for (i = 0; i < id.packetLength; i++ ) {
				currId = (currId << 8) | id.getPacketData(i);
			}
		}
		if (!markers[currId]) {
			markers[currId] = {};
		}
		detector.getTransformMatrix(idx, resultMat);
		markers[currId].age = 0;
		markers[currId].transform = Object.asCopy(resultMat);
	}
	for (i in markers) {
		r = markers[i];
		if (r.age > 1) {
			delete markers[i];
			scene.remove(r.model);
		}
		r.age++;
	}
	for (i in markers) {
		m = markers[i];
		if (!m.model) {

			if(typeof mesh !== 'undefined')
				delete mesh;
			meshMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
			switch(i){
				case '0':
					mesh = new THREE.Object3D();
					mesh = speakerModel1;
					objects.push(mesh);
				break;
				case '1':
					mesh = new THREE.Object3D();
					mesh = tvModel;
				break;
				case '2':
					meshGeometry = new THREE.TorusKnotGeometry();
					meshMaterial.color.setHSL( 0.02, 1.0, 0.5 );
					mesh = new THREE.Mesh( meshGeometry, meshMaterial);
					mesh.position.z = -50;
					mesh.doubleSided = true;
				break;
				case '62':
					meshGeometry = new THREE.IcosahedronGeometry(100);
					meshMaterial.color.setHSL( 0.64, 1.0, 0.5 );
					mesh = new THREE.Mesh( meshGeometry, meshMaterial);
					mesh.position.z = -50;
					mesh.doubleSided = true;
				break;
				default:
					meshGeometry = new THREE.SphereGeometry(100,32,32);
					meshMaterial.color.setHSL( 0.8, 1.0, 0.5 );
					mesh = new THREE.Mesh( meshGeometry, meshMaterial);
					mesh.position.z = -50;
					mesh.doubleSided = true;
				break;
			}
			
			m.model = new THREE.Object3D();
			m.model.matrixAutoUpdate = false;
			m.model.add(mesh);
			scene.add(m.model);
		}//if(!m.model)

		tmpMat.elements[0] = m.transform.m00;
		tmpMat.elements[1] = -m.transform.m10;
		tmpMat.elements[2] = m.transform.m20;
		tmpMat.elements[3] = 0;

		tmpMat.elements[4] = -m.transform.m01;
		tmpMat.elements[5] = m.transform.m11;
		tmpMat.elements[6] = -m.transform.m21;
		tmpMat.elements[7] = 0;
		
		tmpMat.elements[8] = -m.transform.m02;
		tmpMat.elements[9] = m.transform.m12;
		tmpMat.elements[10] = -m.transform.m22;
		tmpMat.elements[11] = 0;
		
		tmpMat.elements[12] = m.transform.m03;
		tmpMat.elements[13] = -m.transform.m13;
		tmpMat.elements[14] = m.transform.m23;
		tmpMat.elements[15] = 1;
 
		m.model.matrix.copy(tmpMat);
		m.model.matrixWorldNeedsUpdate = true;
	}
}

function render(){
	requestAnimationFrame(render);

	update();

	renderer.autoClear = false;
	renderer.clear();
	renderer.render(videoScene, videoCam);
	renderer.render(scene, camera);
}

THREE.Matrix4.prototype.setFromArray = function(m) {
	return this.set(
		m[0], m[4], m[8], m[12],
		m[1], m[5], m[9], m[13],
		m[2], m[6], m[10], m[14],
		m[3], m[7], m[11], m[15]
	);
};

function copyMatrix(mat, cm) {
	cm[0] = mat.m00;
	cm[1] = -mat.m10;
	cm[2] = mat.m20;
	cm[3] = 0;
	cm[4] = mat.m01;
	cm[5] = -mat.m11;
	cm[6] = mat.m21;
	cm[7] = 0;
	cm[8] = -mat.m02;
	cm[9] = mat.m12;
	cm[10] = -mat.m22;
	cm[11] = 0;
	cm[12] = mat.m03;
	cm[13] = -mat.m13;
	cm[14] = mat.m23;
	cm[15] = 1;
}

function updateInfo(){
	switch(selectedItem.index){
		case 0://tele
			selectedItem.descripcion = "Television marca gato :v - 3D - 4K";
			selectedItem.precio = 14999.99;
		break;
		case 1://bocina
			selectedItem.descripcion = "Subwufer marca pato :v - 10cm - 120v";
			selectedItem.precio = 1000;
		break;
		default:
		break;
	}
	$('#infoText').html(selectedItem.toString());
}

function onDocumentMouseMove( event ) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onDocumentMouseDown( event ) {
	event.preventDefault();

	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vector, camera );

	var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {

		controls.enabled = false;

		SELECTED = intersects[ 0 ].object;

		var intersects = raycaster.intersectObject( plane );
		offset.copy( intersects[ 0 ].point ).sub( plane.position );

		container.style.cursor = 'move';

	}
	console.log(SELECTED);

}

$(document).ready(function(){
	init();
	render();
	//alert("hola jquery");
	$('#infoShow').sidr({
		side: 'right',
		displace: false
	});

	$('#infoHide').sidr({
		side: 'right',
		displace: false
	});

	$('#infoShow').click(function(){
		updateInfo();
	});
	/*
	document.onmousemove = onDocumentMouseMove;
	document.onmousedown = onDocumentMouseDown;
	*/
});