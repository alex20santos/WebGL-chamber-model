var container, stats;
var camera, scene, renderer;
var cube, plane;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var shelves = [[], [], []];
var cubeObj = [];
var acObj = [];
var misting_obj = [];
var extractorObj = [];
var op_cube = 0.9;
var op_wall = 0.9;
var panelF, panelSmallSide, panelSmall, panelOrigin, panel, panelR, silver;
var tick = 0, clock = new THREE.Clock();
var selectedShelf; // left, middle, right
var sensors = [];
var sensorObjects = [];
let sides = ["right", "middle", "left"];
var sensorsFromJson;
var data_from_db;
var misting = false;
var spotLight;

var read_interval = 5000; // 5 seconds

loadTextures();
init();
animate();



setInterval(function(){
    $.getJSON("static/js/estufaWebGL/json/data.json", function(json) { // change this path
         data_from_db = json;
    });
}, read_interval ); //change the interval


setInterval(function(){
    try {
        // change state of AC
        if (data_from_db["climatisation"] === true) {
            //console.log('true');
            for (let i = 0; i < acObj.length; i++) {
                acObj[i].material.color.set(0x00ff00)
            }
        }
        else if (data_from_db["climatisation"] === false) {
            for (let i = 0; i < acObj.length; i++) {
                acObj[i].material.color.set(0xff0000)
            }
        }
        else if (data_from_db["climatisation"] === null) {
            for (let i = 0; i < acObj.length; i++) {
                acObj[i].material.color.set(0xff0000)
            }
        }

        // change state of Extractor
        if (data_from_db["air_circulation"] === true) {
            for (let i = 0; i < extractorObj.length; i++) {
                extractorObj[i].material.color.set(0x00ff00)
            }
        }
        else if (data_from_db["air_circulation"] === false) {
            for (let i = 0; i < extractorObj.length; i++) {
                extractorObj[i].material.color.set(0xff0000)
            }
        }
        else if (data_from_db["air_circulation"] === null) {
            for (let i = 0; i < extractorObj.length; i++) {
                extractorObj[i].material.color.set(0xff0000)
            }
        }

        // change state of Misting
        if (data_from_db["misting"] === true) {
            misting = true;
            misting_obj[0].material.color.set(0x00ff00);
        }
        else if (data_from_db["misting"] === null) {
            misting = false;
            misting_obj[0].material.color.set(0xff0000);
        }
        else {
            misting = false;
            misting_obj[0].material.color.set(0xff0000);
        }


        spotLight.visible = data_from_db["lighting"] === true;

        var state;

        if(data_from_db["misting"] === false){
            state = "Off";
        }
        else if(data_from_db["misting"] === null){
            state = "N/A";
        }
        else{
            state = "On";
        }
        $('#dt-info-misting').html('Misting: '+ state);


        if(data_from_db["air_circulation"] === false){
            state = "Off";
        }
        else if(data_from_db["air_circulation"] === null){
            state = "N/A";
        }
        else {
            state = "On";
        }
        $('#dt-info-air-circulation').html('Air circulation: '+state);

        if(data_from_db["access_control"] === false){
            state = "Off";
        }
        else if(data_from_db["access_control"] === null){
            state = "N/A";
        }
        else {
            state = "On";
        }
        $('#dt-info-access-control').html('Access control: '+state);

        if(data_from_db["lighting"] === false){
            state = "Off";
        }
        else if(data_from_db["lighting"] === null){
            state = "N/A";
        }
        else {
            state = "On";
        }
        $('#dt-info-lighting').html('Lighting: '+state);

        if(data_from_db["climatisation"] === false){
            state = "Off";
        }
        else if(data_from_db["climatisation"] === null){
            state = "N/A";
        }
        else {
            state = "On";
        }
        $('#dt-info-climatisation').html('Climatisation: ' + state);
    }
    catch (e) {
        $('#dt-info-misting').html('Misting: N/A');
        $('#dt-info-air-circulation').html('Air circulation: N/A');
        $('#dt-info-access-control').html('Access control: N/A');
        $('#dt-info-lighting').html('Lighting: N/A');
        $('#dt-info-climatisation').html('Climatisation: N/A');

        console.log("Couldn't find values from database")
    }


}, read_interval ); // change the interval

function init() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            sensorsFromJson = JSON.parse(this.responseText);
            //console.log(sensorsFromJson);
            drawSensors();
        }
    };
    xmlhttp.open("GET", "static/js/estufaWebGL/json/dataSensors.json", true);
    xmlhttp.send();


    container = document.getElementById('container-col');
    if(container.clientHeight == 0){
        container.style.height= 416+'px';
    }
    if(container.clientWidth == 0){
        container.style.width= 416+'px';
    }



    camera = new THREE.PerspectiveCamera(45,container.clientWidth/container.clientHeight , 1, 1000);
    camera.position.y = 180;
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    scene.add(new THREE.HemisphereLight(0x443333, 0x111122));
    //
    addShadowedLight(0, 200, 300, 0xffffff, 0.9);
    addShadowedLight(100, 200, 300, 0xffffff, 0.9);
    addShadowedLight(-100, 200, 300, 0xffffff, 0.9);

    spotLight = new THREE.SpotLight( 0xFFFF00 );
    spotLight.position.set( 2, 250, 0 );

    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.penumbra = 0;
    spotLight.intensity = 2;
    spotLight.angle = 1;
    spotLight.visible = false;


    scene.add(spotLight);



    drawCube();
    drawWalls();
    drawShelf(5, -85, 0, 73.5, 20, 250, 0);
    drawShelf(5, 0, 0, 73.5, 40, 250, 1);
    drawShelf(5, 85, 0, 50, 20, 299, 2);
    loadSTLFiles();
    initParticles();


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.localClippingEnabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( container.clientWidth, container.clientHeight);
    renderer.localClippingEnabled = false;
    renderer.domElement.id = "digital-twin";
    container.appendChild(renderer.domElement);


    stats = new Stats();

    container.addEventListener('mousedown', onDocumentMouseDown, false);
    container.addEventListener('touchstart', onDocumentTouchStart, false);
    container.addEventListener('touchmove', onDocumentTouchMove, false);
    window.addEventListener('resize', onWindowResize, false);

}


function drawSensors() {
    let i = 0;
    for (let s in sensorsFromJson) {
        let geometry = new THREE.SphereGeometry(5, 32, 32);
        let material = new THREE.MeshPhongMaterial({color: 0xffff00, side: THREE.DoubleSide});
        let sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(sensorsFromJson[i].position.x, sensorsFromJson[i].position.y, sensorsFromJson[i].position.z);
        var aux2 = Object.assign({}, sensorsFromJson[i]);
        sensors.push(aux2);
        var aux = [sphere];
        sensorObjects.push(aux);

        if (sensorsFromJson[i].display === 'hidden') {
            sensorObjects[i][0].traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.visible = false;
                }
            });
        }
        cube.add(sphere);
        i++;
    }
}


function initParticles() {
    particleSystem = new THREE.GPUParticleSystem();
    particleSystem.position.set(0, 250, 0);
    particleSystem.scale.set(50, 50, 50);
    particleSystem.rotation.set(0, 0, Math.PI + 0.7)

    scene.add(particleSystem);
    options = {
        position: new THREE.Vector3(),
        positionRandomness: .1,
        velocity: new THREE.Vector3(),
        velocityRandomness: .3,
        color: 0x111111,
        colorRandomness: .0,
        turbulence: .08,
        lifetime: 2,
        size: 4.5,
        sizeRandomness: 1
    };
    spawnerOptions = {
        spawnRate: 6000,
        horizontalSpeed: 0,
        verticalSpeed: 0,
        timeScale: 0.13
    };

}
function drawWalls() {
    //parede meio
    var geometry_obj = new THREE.PlaneGeometry(120, 200, 0);

    var material_obj = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        map: panelOrigin,
        opacity: op_wall,
        side: THREE.FrontSide
    });
    var object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(40, 0, -110);
    cube.add(object);

    geometry_obj = new THREE.PlaneGeometry(20, 200, 0);

    material_obj = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        map: panelSmallSide,
        opacity: op_wall,
        side: THREE.FrontSide
    });
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(-90, 0, -110);
    cube.add(object);

    geometry_obj = new THREE.PlaneGeometry(60, 40, 0);

    material_obj = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        map: panelSmall,
        opacity: op_wall,
        side: THREE.FrontSide
    });
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(-50, 80, -110);
    cube.add(object);

    geometry_obj = new THREE.PlaneGeometry(2, 160, 100);

    material_obj = new THREE.MeshBasicMaterial({color: 'grey', side: THREE.FrontSide});
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(-21, -20, -110);
    cube.add(object);

    material_obj = new THREE.MeshBasicMaterial({color: 'grey', side: THREE.FrontSide});
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(-79, -20, -110);
    cube.add(object);

    geometry_obj = new THREE.PlaneGeometry(60, 2, 100);

    material_obj = new THREE.MeshBasicMaterial({color: 'grey', side: THREE.FrontSide});
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(-50, 59, -110);
    cube.add(object);


    //parede lado com porta
    geometry_obj = new THREE.PlaneGeometry(120, 200, 0);

    material_obj = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        map: panelOrigin,
        opacity: op_wall,
        side: THREE.FrontSide
    });
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(-40, 0, -200);
    cube.add(object);

    geometry_obj = new THREE.PlaneGeometry(20, 200, 0);

    material_obj = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        map: panelSmallSide,
        opacity: op_wall,
        side: THREE.FrontSide
    });
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(90, 0, -200);
    cube.add(object);

    geometry_obj = new THREE.PlaneGeometry(60, 40, 0);

    material_obj = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        map: panelSmall,
        opacity: op_wall,
        side: THREE.FrontSide
    });
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(50, 80, -200);
    cube.add(object);

    geometry_obj = new THREE.PlaneGeometry(2, 160, 100);

    material_obj = new THREE.MeshBasicMaterial({color: 'grey', side: THREE.FrontSide});
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(21, -20, -200);
    cube.add(object);

    material_obj = new THREE.MeshBasicMaterial({color: 'grey', side: THREE.FrontSide});
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(79, -20, -200);
    cube.add(object);
    geometry_obj = new THREE.PlaneGeometry(60, 2, 100);

    material_obj = new THREE.MeshBasicMaterial({color: 'grey', side: THREE.FrontSide});
    object = new THREE.Mesh(geometry_obj, material_obj);
    object.position.set(50, 59, -200);
    cube.add(object);


}

function drawCube() {

    var geometry = new THREE.BoxGeometry(200, 200, 400);
    var cubeMaterials = [
        //frentes grandes
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: op_cube,
            map: panelF,
            side: THREE.BackSide
        }),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            map: panelF,
            opacity: op_cube,
            side: THREE.BackSide
        }),
        //cima
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            map: panelR,
            opacity: op_cube,
            side: THREE.BackSide
        }),
        //baixo
        new THREE.MeshBasicMaterial({color: 0x97A4AA, transparent: true, opacity: op_cube, side: THREE.BackSide}),

        //lado
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            map: panel,
            opacity: op_cube,
            side: THREE.BackSide
        })
    ];
    cube = new THREE.Mesh(geometry, cubeMaterials);
    cube.position.y = 150;
    geometry.parameters.width = 50;
    scene.add(cube);
    cubeObj.push(cube);
}

function drawShelf(n, x, y, z, w, l, id) {
    var distance = 23;
    var leg_length = 3;
    var shelf_width = w;
    var shelf_height = 1;
    var shelf_length = l;
    var leg_height = distance - (shelf_height / 2);
    var delta = 100 - y - leg_height;
    for (let i = 0; i < n; i++) {
        var shelf_geometry = new THREE.BoxGeometry(shelf_width, shelf_height, shelf_length);
        var shelf_material = new THREE.MeshPhongMaterial({
            map: silver,
            color: 0xc0c0c0,
            transparent: true,
            opacity: 1,
            side: THREE.FrontSide
        });
        var shelf = new THREE.Mesh(shelf_geometry, shelf_material);
        shelves[id].push(shelf);
        shelf.position.set(x, y + i * distance - delta, z);

        let leg_geometry = new THREE.BoxGeometry(leg_length, leg_height, leg_length);
        let leg_material = new THREE.MeshPhongMaterial({
            color: 0x1c1a19,
            transparent: true,
            opacity: 1,
            side: THREE.FrontSide
        });
        let leg = new THREE.Mesh(leg_geometry, leg_material);
        let x_pos_leg = 0.45 * shelf_width


        for (let j = 0; j < 6; j++) {
            leg = new THREE.Mesh(leg_geometry, leg_material);
            var leg2 = new THREE.Mesh(leg_geometry, leg_material);
            if (shelf_length <= 250 && j == 5) {
                leg.position.set(x_pos_leg, (shelf_height / 2) - distance / 2, -shelf_length / 2 + leg_length / 2);
                shelf.add(leg);
                leg2.position.set(-x_pos_leg, (shelf_height / 2) - distance / 2, -shelf_length / 2 + leg_length / 2);
                shelf.add(leg2);
                shelves[id].push(leg);
                shelves[id].push(leg2);
                break;
            }
            if (shelf_length > 250) {
                leg.position.set(x_pos_leg, (shelf_height / 2) - distance / 2, shelf_length / 2 - leg_length / 2 - 60 * j);
                shelf.add(leg);
                leg2.position.set(-x_pos_leg, (shelf_height / 2) - distance / 2, shelf_length / 2 - leg_length / 2 - 60 * j);
                shelf.add(leg2);
                shelves[id].push(leg);
                shelves[id].push(leg2);
            }
            else {
                leg.position.set(x_pos_leg, (shelf_height / 2) - distance / 2, shelf_length / 2 - leg_length / 2 - 55 * j);
                shelf.add(leg);
                leg2.position.set(-x_pos_leg, (shelf_height / 2) - distance / 2, shelf_length / 2 - leg_length / 2 - 55 * j);
                shelf.add(leg2);
                shelves[id].push(leg);
                shelves[id].push(leg2);
            }
        }


        cube.add(shelf);
    }
}

function addShadowedLight(x, y, z, color, intensity) {

    var directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);

    directionalLight.castShadow = true;

    var d = 1;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.shadow.bias = -0.002;

}

function onWindowResize() {

    container = document.getElementById('container-col');

    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth,container.clientHeight);


}

function shelvesVisible() {
    for (let i = 0; i < shelves.length; i++) {
        for (let j = 0; j < shelves[i].length; j++) {
            shelves[i][j].material.opacity = 1;
        }
    }
}

function hiddenAllSpheres() {
    //hidden all
    for (let i = 0; i < sensors.length; i++) {
        sensorObjects[i][0].traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.visible = false;
            }
        });
    }
}

function showSpheres() {
    for (let i = 0; i < sensors.length; i++) {
        if (selectedShelf === sensors[i].side) {
            sensorObjects[i][0].traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.visible = true;
                }
            });
        }
    }
}

function allSpheresUnselected() {
    for (let i = 0; i < sensorObjects.length; i++) {
        sensorObjects[i][0].material.color.set(0x1919ff);
    }
}

function hideRestShelves(selected) {
    for (let i = 0; i < shelves.length; i++) {
        for (let j = 0; j < shelves[i].length; j++) {
            if (i !== selected) {
                shelves[i][j].material.opacity = 0.1;  //hide non selected
            }
        }
    }
}

function clearDtInfo() {
    $('#dt-info-dht-mg11').html('');
    $('#dt-info-tsl').html('');
    $('#dt-info-temp').html('');
    $('#dt-info-hum').html('');
    $('#dt-info-co2').html('');
    $('#dt-info-lum').html('');
}

function onDocumentMouseDown(event) {

    event.preventDefault();
    container.addEventListener('mousemove', onDocumentMouseMove, false);
    container.addEventListener('mouseup', onDocumentMouseUp, false);
    container.addEventListener('mouseout', onDocumentMouseOut, false);

    var size = renderer.getSize();

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

    var x = event.offsetX === undefined ? event.layerX : event.offsetX;
    var y = event.offsetY === undefined ? event.layerY : event.offsetY;

    var mouse3D = new THREE.Vector3(2 * (x / size.width) - 1, 1 - 2 * (y / size.height), 0);
    var raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(mouse3D, camera);

    allSpheresUnselected();

    // for the spheres
    for (let id = 0; id < sensorObjects.length; id++) {
        intersects = raycaster.intersectObjects(sensorObjects[id]);
        if (intersects.length > 0) {
            //select sphere
            //sensorObjects[id][0] to access Mesh objects
            sensorObjects[id][0].material.color.set(0x00b200);
            var sensorName = sensors[id].name;
            var res = sensorName.split(" + ");
            var split_res = sensorName.split(" ").slice(-1)[0];

            var sensor_number = split_res.substring(1,split_res.length);



            $('#dt-info-dht-mg11').html(res[0]); // Show sensor name on card -> DHT or MG811

            try {
                if (res[0].includes('DHT')) {
                    $('#dt-info-temp').html("Temperature: " + data_from_db["pos" + sensor_number + "_temp"] + " ºC");
                    $('#dt-info-hum').html("Humidity: " + data_from_db["pos" + sensor_number + "_humd"] + " %");
                    $('#dt-info-co2').html("");
                }
                else {
                    $('#dt-info-co2').html("CO2: " + data_from_db["pos" + sensor_number + "_co2c"] + " ppm");
                    $('#dt-info-temp').html("");
                    $('#dt-info-hum').html("");
                }

                if (res.length > 1) {
                    $('#dt-info-tsl').html(res[1]); // -> TSL
                    $('#dt-info-lum').html("Luminosity: " + data_from_db["pos" + sensor_number + "_lumy"] + " lux");
                }
                else {
                    $('#dt-info-tsl').html('');
                    $('#dt-info-lum').html('');
                }


            }
            catch (e) {
                if (res[0].includes('DHT')) {
                    $('#dt-info-temp').html("Temperature: N/A");
                    $('#dt-info-hum').html("Humidity: N/A");
                    $('#dt-info-co2').html("");
                }
                else {
                    $('#dt-info-co2').html("CO2: N/A");
                    $('#dt-info-temp').html("");
                    $('#dt-info-hum').html("");
                }

                if (res.length > 1) {
                    $('#dt-info-tsl').html(res[1]); // -> TSL
                    $('#dt-info-lum').html("Luminosity: N/A");
                }
                else {
                    $('#dt-info-tsl').html('');
                    $('#dt-info-lum').html('');
                }
            }
            return;
        }
    }

    hiddenAllSpheres();
    clearDtInfo();

    //shelves intersection
    intersects = raycaster.intersectObjects(cubeObj);
    if (intersects.length > 0) {
        shelvesVisible();
        selectedShelf = '';
    }
    for (let id = 0; id < 3; id++) {
        var intersects = raycaster.intersectObjects(shelves[id]);
        //console.log("-", intersects, "-");
        if (intersects.length > 0) {
            for (let j = 0; j < shelves[id].length; j++) {
                shelves[id][j].material.opacity = 1;  //show selected shelves
            }
            selectedShelf = sides[id];
            hideRestShelves(id);
        }
    }
    showSpheres();

}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
}

function onDocumentMouseUp(event) {

    container.removeEventListener('mousemove', onDocumentMouseMove, false);
    container.removeEventListener('mouseup', onDocumentMouseUp, false);
    container.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentMouseOut(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;

    }
}

function animate() {

    requestAnimationFrame(animate);


    stats.begin();
    let delta = clock.getDelta() * spawnerOptions.timeScale;
    tick += delta;
    if (tick < 0) tick = 0;
    if (delta > 0) {
        options.position.x = Math.sin(tick * spawnerOptions.horizontalSpeed) * 20;
        options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 10;
        options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 5;
        if(misting === true)
            for (let x = 0; x < spawnerOptions.spawnRate * delta; x++) {
            // Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
            // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
            particleSystem.spawnParticle(options);

        }
    }
    particleSystem.update(tick);

    render();
    stats.end();

}



function render() {
    cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
    renderer.render(scene, camera);

}
