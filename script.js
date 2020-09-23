import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js';
import { TrackballControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/renderers/CSS3DRenderer.js';


// variables for event listeners
const beginBtn = document.querySelector('#btn-begin');
const overlay = document.querySelector('#overlay');
const threeJsWindow = document.querySelector('#three-js-container');

// three.js functions
const main  = () => {

    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 3000;

    const scene = new THREE.Scene();

    const renderer = new CSS3DRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    threeJsWindow.appendChild( renderer.domElement );

    const controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 4;
    
    var Element = function ( id, x, y, z, ry ) {

        var div = document.createElement( 'div' );
        div.style.width = '480px';
        div.style.height = '360px';
        div.style.backgroundColor = '#000';

        var iframe = document.createElement( 'iframe' );
        iframe.style.width = '480px';
        iframe.style.height = '360px';
        iframe.style.border = '0px';
        iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
        div.appendChild( iframe );

        var object = new CSS3DObject( div );
        object.position.set( x, y, z );
        object.rotation.y = ry;

        return object;

    };

    var group = new THREE.Group();
    group.add( new Element( 'SJOz3qjfQXU', 0, 0, 240, 0 ) );
    group.add( new Element( 'Y2-xZ-1HE-Q', 240, 0, 0, Math.PI / 2 ) );
    group.add( new Element( 'IrydklNpcFI', 0, 0, - 240, Math.PI ) );
    group.add( new Element( '9ubytEsCaS0', - 240, 0, 0, - Math.PI / 2 ) );
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
