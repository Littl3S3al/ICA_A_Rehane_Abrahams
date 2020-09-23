import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/renderers/CSS3DRenderer.js';


// variables for event listeners
const beginBtn = document.querySelector('#btn-begin');
const overlay = document.querySelector('#overlay');
const threeJsWindow = document.querySelector('#three-js-container');

const zoomLevel = 10000;
const startZoom = 7500;
// three.js functions
const main  = () => {

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = zoomLevel;

    const scene = new THREE.Scene();

    const renderer = new CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    threeJsWindow.appendChild( renderer.domElement );

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.zoomSpeed = 0.5;
    controls.rotateSpeed = 0.1;
    controls.maxDistance = zoomLevel;
    // horizontal panning
    controls.minAzimuthAngle = -Math.PI*0.05;
    controls.maxAzimuthAngle = Math.PI*0.05;
    // vertical panning
    controls.minPolarAngle = Math.PI * 0.5;
    controls.maxPolarAngle = Math.PI*0.5;


    const layer1 = document.querySelector('.row-1');
    const layer2 = document.querySelector('.row-2');
    const layer3 = document.querySelector('.row-3');
    const layer4 = document.querySelector('.row-4');
    
    var Element = function (layer, x, y, z) {

        var object = new CSS3DObject( layer );
        object.position.set( x, y, z );

        return object;

    };

    var group = new THREE.Group();
    group.add( new Element( layer1, 0, 0, startZoom ) );
    group.add( new Element( layer2, 0, 0, startZoom - 500 ) );
    group.add( new Element( layer3, 1700, 0, startZoom - 400 ) );
    group.add( new Element( layer4, 0, 0, startZoom - 2000 ) );
    scene.add( group );



    const resizeRendererToDisplaySize = (renderer) => {

        const width = window.innerWidth;;
        const height = window.innerHeight;
        const needResize = renderer.domElement.width !== width || renderer.domElement.height !== height;
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;

    }



    // create a loop to render animation
    const render = () => {


        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
            camera.updateProjectionMatrix();
            }
        renderer.render(scene, camera);
        controls.update();

        requestAnimationFrame(render);
    }

    // render the scene
    renderer.render(scene, camera);
    requestAnimationFrame(render);


}


// event listeners
beginBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    threeJsWindow.style.display = 'block';
    main();
});
