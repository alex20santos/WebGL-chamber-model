
function loadTextures(){
  panelF = new THREE.TextureLoader().load( "static/js/estufaWebGL/textures/panel2.jpg" );
  panelF.wrapS = THREE.RepeatWrapping;
  panelF.wrapT = THREE.RepeatWrapping;
  panelF.repeat.set( 5, 5);


  panelSmallSide = new THREE.TextureLoader().load( "static/js/estufaWebGL/textures/panel2.jpg" );
  panelSmallSide.wrapS = THREE.RepeatWrapping;
  panelSmallSide.wrapT = THREE.RepeatWrapping;
  panelSmallSide.repeat.set( 0.35, 0.35);

  panelSmall = new THREE.TextureLoader().load( "static/js/estufaWebGL/textures/panel2.jpg" );
  panelSmall.wrapS = THREE.RepeatWrapping;
  panelSmall.wrapT = THREE.RepeatWrapping;
  panelSmall.repeat.set( 1, 1);

  panelOrigin = new THREE.TextureLoader().load( "static/js/estufaWebGL/textures/panel2.jpg" );
  panelOrigin.wrapS = THREE.RepeatWrapping;
  panelOrigin.wrapT = THREE.RepeatWrapping;
  panelOrigin.repeat.set( 1.9, 1.9);

  panel = new THREE.TextureLoader().load( "static/js/estufaWebGL/textures/panel2.jpg" );
  panel.wrapS = THREE.RepeatWrapping;
  panel.wrapT = THREE.RepeatWrapping;
  panel.repeat.set( 3,3);

  panelR = new THREE.TextureLoader().load( "static/js/estufaWebGL/textures/panel2R.jpg" );
  panelR.wrapS = THREE.RepeatWrapping;
  panelR.wrapT = THREE.RepeatWrapping;
  panelR.repeat.set( 5,5);

  silver = new THREE.TextureLoader().load( "static/js/estufaWebGL/textures/aluminio.jpg" );
  silver.wrapS = THREE.RepeatWrapping;
  silver.wrapT = THREE.RepeatWrapping;
  silver.repeat.set( 1,1);

}

function loadSTLFiles(){
  var loader = new THREE.STLLoader();
  loader.load( 'static/js/estufaWebGL/models/AC-outside.stl', function ( geometry ) {

    var material = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0XEEEEEE, shininess: 400 } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, 100, 180 );
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( 0.8, 0.8, 0.8 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    cube.add( mesh );
    acObj.push(mesh);

  } );


  loader.load( 'static/js/estufaWebGL/models/extractor.stl', function ( geometry ) {
    var material = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 70, 95 , - 100 );
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( 100, 100, 100 );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    cube.add( mesh );
    extractorObj.push(mesh);


    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( -70, 95 , 180  );
    mesh.rotation.set( 0, 0, 0 );
    mesh.scale.set( 100, 100, 100 );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    cube.add( mesh );
    extractorObj.push(mesh);
  } );

  loader.load( 'static/js/estufaWebGL/models/klima.stl', function ( geometry ) {
    var material = new THREE.MeshPhongMaterial( {color: 0xff0000 , specular: 0XEEEEEE, shininess: 400  } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 35, 80 ,200   );
    mesh.rotation.set( 0, Math.PI, 0 );
    mesh.scale.set( 70, 70, 70 );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    cube.add( mesh );
    acObj.push(mesh);
  });

  loader.load( 'static/js/estufaWebGL/models/Nozzle.stl', function ( geometry ) {

    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0XEEEEEE, shininess: 400 } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 2, 250, 0 );

    mesh.rotation.set( 0, 0, Math.PI );
    mesh.scale.set( 0.1, 0.1, 0.1 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );
    misting_obj.push(mesh);
  } );
}
