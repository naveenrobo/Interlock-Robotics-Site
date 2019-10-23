function init() {
    let isMobile  = document.querySelector("html").classList.contains("mobile");
    if(isMobile){
        THREE.WEBGL.isWebGLAvailable() ? (dwInitWebGL(), initSounds()) : dwShowError();
    }else {
        setTimeout(()=>{
            document.querySelector(".landing").style.display = "none";
            document.getElementById('loader').classList.remove('-visible');
        },3000)
    }
    
}
function dwShowError() {

}
function dwInitWebGL() {
    dwCreateWebgl();
    document.querySelector('.specs').style.opacity = 0;
}
function bmChangeSection(a) {
    if (a != cameraTarget) {

        if (THREE.WEBGL.isWebGLAvailable()) {
            dwResetHighlights();
            cameraTarget = a;
            bmChangeWebGl(a);
            switch (a) {
                case "wheels":
                case "controller":
                case "body":
                case "servo":
                case "lidar":
                    soundManager.play(soundList[0]),
                        soundManager.play(soundList[generateRandomNumber(1, 2)])
            }

        }
    }

    document.querySelector('.specs').style.opacity = 1;
    document.querySelectorAll('.spec').forEach(ele => {
        ele.style.opacity = 0;
    })
    document.querySelector(`#spec-${a}`).style.opacity = 1;
}
function bmChangeWebGl(a) {

    "auto" == cameraTarget && "auto" == a && (a = "free"),
        cameraTarget = a;
    switch (cameraTarget) {
        case "body":
            bodyObject.material = fresnelTextureHighlight;
            break;
        case "lidar":
            lidarObject.material = fresnelTextureHighlight;
            break;
        case "servo":
            motorObject.material = fresnelTextureHighlight;
            break;
        case "wheels":
            wheelObject.material = fresnelTextureHighlight;
            break;
        case "controller":
            boardObject.material = fresnelTextureHighlight;
    }
}
function bmResetCamera() {
    destCameraD = 175,
        setOrbiterTarget(0, 10, 0),
        cameraTarget = "free";
    dwResetHighlights();
}
function mouseDown(a) {
    a.preventDefault(),
        isMouseDown = !0,
        mouseX = a.clientX,
        mouseY = a.clientY
}
function mouseMove(a) {
    a.preventDefault(),
        clientMouseX = a.clientX,
        clientMouseY = a.clientY
}
function mouseUp(a) {
    a.preventDefault(),
        isMouseDown = !1
}
function dwResetHighlights() {
    try {
        bodyObject = scene.getObjectByName("body", true),
            lidarObject = scene.getObjectByName('lidar', true),
            motorObject = scene.getObjectByName('servo', true),
            wheelObject = scene.getObjectByName("wheels", true),
            boardObject = scene.getObjectByName("controller", true);

        bodyObject.material = fresnelTexture;
        boardObject.material = fresnelTexture;
        lidarObject.material = fresnelTexture;
        wheelObject.material = fresnelTexture;
        motorObject.material = fresnelTexture;
        fresnelTexture.uniforms.tCube.value = environmentMap

        document.querySelector('.specs').style.opacity = 0;

    } catch (err) {
        console.error(err);
    }
}

var deltaCameraD = 0,
    deltaCameraP = 0,
    deltaCameraY = 0,
    destCameraD = 175,
    destCameraP,
    destCameraY,
    curCameraP = 85,
    curCameraY = 215,
    curCameraD = 175,
    targetOrbiterX = 0,
    targetOrbiterY = 10,
    targetOrbiterZ = 0,
    orbiterX = 0,
    orbiterY = 10,
    orbiterZ = 0,
    isMouseDown = !1;

function bmOrbitController(a) {
    switch (cameraTarget) {
        case "auto":
            deltaCameraD = (destCameraD - curCameraD) / 6,
                isMouseDown ? (destCameraD = 175,
                    Math.abs(mouseX - clientMouseX) >= 1 && (deltaCameraY = (mouseX - clientMouseX) / 6),
                    deltaCameraP = (mouseY - clientMouseY) / 6) : curCameraY += .05,
                curCameraD += deltaCameraD,
                curCameraP += deltaCameraP,
                curCameraY -= deltaCameraY,
                setOrbiterTarget(0, 20, 0);
            break;
        case "free":
            isMouseDown && (bmResetCamera(),
                Math.abs(mouseX - clientMouseX) >= 1 && (deltaCameraY = (mouseX - clientMouseX) / 6),
                deltaCameraP = (mouseY - clientMouseY) / 6),
                deltaCameraD = (destCameraD - curCameraD) / 6,
                curCameraD += deltaCameraD,
                curCameraP += deltaCameraP,
                curCameraY -= deltaCameraY,
                setOrbiterTarget(0, 10, 0);
            break;

        case "servo":
            isMouseDown && bmResetCamera(),
                destCameraD = 145,
                destCameraP = 55,
                destCameraY = 270,
                setOrbiterTarget(0, 40, 0);

            0 > curCameraY && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                curCameraY > 360 && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                deltaCameraD = (destCameraD - curCameraD) / 6,
                deltaCameraP = (destCameraP - curCameraP) / 6,
                Math.abs(destCameraY - curCameraY) >= 1 && (deltaCameraY = (destCameraY - curCameraY) / 6),
                curCameraD += deltaCameraD,
                curCameraP += deltaCameraP,
                curCameraY += deltaCameraY;
            break;

        case "wheels":
            isMouseDown && bmResetCamera(),
                destCameraD = 160,
                destCameraP = 90,
                destCameraY = 30,
                setOrbiterTarget(52, 14, 41);

            0 > curCameraY && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                curCameraY > 360 && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                deltaCameraD = (destCameraD - curCameraD) / 6,
                deltaCameraP = (destCameraP - curCameraP) / 6,
                Math.abs(destCameraY - curCameraY) >= 1 && (deltaCameraY = (destCameraY - curCameraY) / 6),
                curCameraD += deltaCameraD,
                curCameraP += deltaCameraP,
                curCameraY += deltaCameraY;
            break;
        case "controller":
            isMouseDown && bmResetCamera(),
                destCameraD = 45,
                destCameraP = 45,
                destCameraY = 90,
                setOrbiterTarget(0, 7, 0);

            0 > curCameraY && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                curCameraY > 360 && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                deltaCameraD = (destCameraD - curCameraD) / 6,
                deltaCameraP = (destCameraP - curCameraP) / 6,
                Math.abs(destCameraY - curCameraY) >= 1 && (deltaCameraY = (destCameraY - curCameraY) / 6),
                curCameraD += deltaCameraD,
                curCameraP += deltaCameraP,
                curCameraY += deltaCameraY;
            break;
        case "lidar":
            isMouseDown && bmResetCamera(),
                destCameraD = 120,
                destCameraP = 0,
                destCameraY = 90,
                setOrbiterTarget(0, 80, -30);

            0 > curCameraY && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                curCameraY > 360 && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                deltaCameraD = (destCameraD - curCameraD) / 6,
                deltaCameraP = (destCameraP - curCameraP) / 6,
                Math.abs(destCameraY - curCameraY) >= 1 && (deltaCameraY = (destCameraY - curCameraY) / 6),
                curCameraD += deltaCameraD,
                curCameraP += deltaCameraP,
                curCameraY += deltaCameraY;
            break;
        case "body":
            isMouseDown && bmResetCamera(),
                destCameraD = 175,
                destCameraP = 0,
                destCameraY = 90,
                setOrbiterTarget(0, 50, 0);

            0 > curCameraY && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                curCameraY > 360 && (curCameraY -= 360 * Math.floor(curCameraY / 360)),
                deltaCameraD = (destCameraD - curCameraD) / 6,
                deltaCameraP = (destCameraP - curCameraP) / 6,
                Math.abs(destCameraY - curCameraY) >= 1 && (deltaCameraY = (destCameraY - curCameraY) / 6),
                curCameraD += deltaCameraD,
                curCameraP += deltaCameraP,
                curCameraY += deltaCameraY;
            break;

    }

    switch (curCameraP >= 90 && (curCameraP = 89.9),
    cameraTarget) {
        case "servo":
        case "controller":
        case "wheels":
        case "lidar":
        case "body":
            break;
        default:
            65 >= curCameraP && (curCameraP = 65.1)
    }
    deltaCameraD *= .7,
        deltaCameraY *= .7,
        deltaCameraP *= .7,
        a.position.y = curCameraD * Math.cos(curCameraP * Math.PI / 180),
        a.position.x = curCameraD * Math.sin(curCameraP * Math.PI / 180) * Math.cos(curCameraY * Math.PI / 180),
        a.position.z = curCameraD * Math.sin(curCameraP * Math.PI / 180) * Math.sin(curCameraY * Math.PI / 180),

        orbiterX += (targetOrbiterX - orbiterX) / 6,
        orbiterY += (targetOrbiterY - orbiterY) / 6,
        orbiterZ += (targetOrbiterZ - orbiterZ) / 6,

        a.lookAt(orbiterX, orbiterY, orbiterZ)
    mouseX = clientMouseX,
        mouseY = clientMouseY

}

function setOrbiterTarget(a, b, c) {
    targetOrbiterX = a,
        targetOrbiterY = b,
        targetOrbiterZ = c
}

// Load assets
function initPreloadAssets() {
    bmPreloadBattle();
}
async function bmPreloadBattle() {
    let totalAssets = dwRobots.length, loaded = [];
    for (var i = 0; i < totalAssets; i++) {
        let objName = "";
        switch (i) {
            case 0:
                objName = "body";
                break;
            case 1:
                objName = "lidar";
                break;
            case 2:
                objName = "servo";
                break;
            case 3:
                objName = "wheels";
                break;
            case 4:
                objName = "controller";
                break;
        }
        loaded.push(dwProcessModel(dwRobots[i], objName))
    }

    Promise.all(loaded).then(() => {
        console.log("Added models to scene");
        scene.add(dwModelRobot);
        dwResetHighlights();
        document.getElementById('loader').classList.remove('-visible');
    });
}
function dwProcessModel(url, name) {
    return new Promise(async (resolve, reject) => {
        const resp = await fetch(url);
        const data = await resp.arrayBuffer();

        my_lzma.decompress(new Uint8Array(data), function on_finish(result) {
            console.log("Decompression complete.")
            var loader = new THREE.GLTFLoader();
            loader.parse(result, 'assets/models/KCT/',
                function (gltf) {
                    try {

                        gltf.scene.traverse(function (child) {
                            if (child.isMesh) {
                                try {
                                    bmPlaceBattleModel(child.geometry, 3.2, fresnelTexture, -7, -17.5, 0, 0, 0, name, dwModelRobot)
                                    resolve(true)
                                } catch (err1) {
                                    console.log("Caught your culprit")
                                }
                            }
                        });
                    } catch (err) {
                        console.log("Unable to place model on scene object")
                    }
                },
                function (err) {
                    console.log('An error happened while loading the model');
                    reject(false)
                }
            );
        }, function on_progress(percent) {
            console.log(percent);
        })

    })
}
function bmPlaceBattleModel(a, b, c, d, e, f, g, h, i, j) {
    var k = new THREE.Mesh(a, c);
    k.position.set(0, -15.92, 0),
        k.scale.set(25, 25, 25),
        k.rotation.x = 1.54,
        k.rotation.z = 0,
        k.name = i,
        j.add(k);
}
function bmShowWebgl() {

}
function dwCreateWebgl() {
    container = document.getElementById("dw-robot");

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.name = "Perspective Camera";

    scene = new THREE.Scene(),
        scene.name = "root scene",
        // window.scene = scene,
        scene.add(camera);

    sceneLight = new THREE.DirectionalLight(16777215, 1, 1000),
        sceneLight.name = "scene light",
        sceneLight.position.set(0, 1, 0).normalize(),
        scene.add(sceneLight);

    reflectiveLight = new THREE.SpotLight(16777215, 1, 1000),
        reflectiveLight.name = "reflective light",
        scene.add(reflectiveLight);

    environmentArray = ["blue/gradient.jpg", "blue/gradient.jpg",
        "blue/floor.jpg", "blue/floor.jpg", "blue/gradient.jpg",
        "blue/gradient.jpg"
    ],
        environmentArrayDimmed = ["blue2/gradient.jpg", "blue2/gradient.jpg",
            "blue2/floor.jpg", "blue2/floor.jpg",
            "blue2/gradient.jpg", "blue2/gradient.jpg"
        ],
        environmentArrayHighlight = ["red/gradient.jpg", "red/gradient.jpg",
            "red/floor.jpg", "red/floor.jpg", "red/gradient.jpg",
            "red/gradient.jpg"
        ];
    environmentMap = new THREE.CubeTextureLoader()
        .setPath(pathTextures)
        .load(environmentArray),

        environmentMapDimmed = new THREE.CubeTextureLoader()
            .setPath(pathTextures)
            .load(environmentArrayDimmed),

        environmentMapHighlight = new THREE.CubeTextureLoader()
            .setPath(pathTextures)
            .load(environmentArrayHighlight);

    dwModelRobot = new THREE.Object3D;
    dwModelRobot.visible = true;

    floorObject = new THREE.Object3D,
        floorObject.name = "root floor";
    floorTron = new THREE.TextureLoader().load(pathTextures + "tron.jpg"),
        floorTron.wrapS = floorTron.wrapT = THREE.RepeatWrapping,
        floorTron.repeat.set(15, 15),
        floorTron.anisotropy = 8,
        floorTron2 = new THREE.TextureLoader().load(pathTextures + "tron2.jpg"),
        floorTron2.wrapS = floorTron2.wrapT = THREE.RepeatWrapping,
        floorTron2.repeat.set(25, 25),
        floorTron2.anisotropy = 8,
        floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(1100, 1100, 1, 1), new THREE
            .MeshPhongMaterial({
                map: floorTron
            })),
        floorMesh.position.y = -17,
        floorMesh.rotation.x = -Math.PI / 2,
        floorMesh.name = "floor",
        floorObject.add(floorMesh);
    var a = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(pathTextures + "concrete-shadow2.png"),
        transparent: true
    });
    var b = new THREE.Mesh(new THREE.PlaneGeometry(1100, 1100, 1, 1), a);
    b.position.y = -16,
        b.rotation.x = -Math.PI / 2,
        b.name = "Plane Geometry",
        floorObject.add(b);
    scene.add(floorObject);

    shader = FresnelShader;
    uniforms = THREE.UniformsUtils.clone(shader.uniforms),
        uniforms.tCube.value = environmentMap,
        uniforms.mRefractionRatio.value = 1.02,
        uniforms.mFresnelBias.value = .1,
        uniforms.mFresnelPower.value = 1.5,
        uniforms.mFresnelScale.value = 1,
        fresnelTexture = new THREE.ShaderMaterial({
            fragmentShader: shader.fragmentShader,
            vertexShader: shader.vertexShader,
            uniforms: uniforms,
            transparent: !0
        }),
        fresnelTexture.needsUpdate = !0;

    shaderHighlight = FresnelShader2;
    uniformsHighlight = THREE.UniformsUtils.clone(shaderHighlight
        .uniforms),
        uniformsHighlight.tCube.value = environmentMapHighlight,
        uniformsHighlight.mRefractionRatio.value = 1.02,
        uniformsHighlight.mFresnelBias.value = .1,
        uniformsHighlight.mFresnelPower.value = 1.5,
        uniformsHighlight.mFresnelScale.value = 2,
        fresnelTextureHighlight = new THREE.ShaderMaterial({
            fragmentShader: shaderHighlight.fragmentShader,
            vertexShader: shaderHighlight.vertexShader,
            uniforms: uniformsHighlight,
            transparent: !0
        }),
        fresnelTextureHighlight.needsUpdate = !0,
        renderer = new THREE.WebGLRenderer({
            antialias: !0,
            alpha: !0
        }),
        renderer.setSize(window.innerWidth, window.innerHeight),
        renderer.setClearColor(921102, 1),
        renderer.clear(),
        renderer.sortObjects = !0,
        container.appendChild(renderer.domElement);

    container.addEventListener("mousemove", mouseMove, !1),
        container.addEventListener("mousedown", mouseDown, !1),
        container.addEventListener("mouseup", mouseUp, !1);

    window.addEventListener('resize', onWindowResize);

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        window.scene = scene;
    initPreloadAssets();

    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(0, 50, 190);

    render();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function isWebGl() {
    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl")
        || canvas.getContext("experimental-webgl");

    if (gl && gl instanceof WebGLRenderingContext) {
        return true;
    } else {
        return false;
    }
}
function render() {
    requestAnimationFrame(render);
    bmOrbitController(camera);
    renderer.render(scene, camera);
}
function initSounds() {
    soundManager.setup({
        url: "../assets/batmobile/swf",
        flashVersion: 9,
        debugMode: !1,
        onready: function () {
            (soundManager.createSound({
                id: soundList[0],
                url: "./assets/audio/BML_ButtonPress.mp3",
                autoLoad: !0,
                autoPlay: !1,
                loops: 1,
                onload: function () { },
                volume: 50
            }),
                soundManager.createSound({
                    id: soundList[1],
                    url: "./assets/audio/BML_Mech_02.mp3",
                    autoLoad: !0,
                    autoPlay: !1,
                    loops: 1,
                    onload: function () { },
                    volume: 50
                }),
                soundManager.createSound({
                    id: soundList[2],
                    url: "./assets/audio/BML_Mech_02.mp3",
                    autoLoad: !0,
                    autoPlay: !1,
                    loops: 1,
                    onload: function () { },
                    volume: 50
                }),
                soundManager.createSound({
                    id: soundList[3],
                    url: "./assets/audio/BML_Mech_01.mp3",
                    autoLoad: !0,
                    autoPlay: !1,
                    loops: 1,
                    onload: function () { },
                    volume: 50
                }))
        }
    })
}
function toggleSound() {
    soundEnabled && (soundMuted = !soundMuted,
        soundMuted ? muteSounds() : unmuteSounds())
}
function generateRandomNumber(a, b) { var c = Math.floor(Math.random() * (b - a + 1)) + a; return c }
function playSound(a) {
    soundEnabled && soundManager.play(a)
}

var container, controls, camera, scene, renderer, floorObject, sceneLight, reflectiveLight,
    dwModelRobot, pathTextures = "./assets/textures/",
    shader, uniforms, fresnelTexture, environmentArray, environmentMap, environmentArrayDimmed,
    environmentMapDimmed, shaderHighlight, uniformsHighlight, fresnelTextureHighlight,
    environmentArrayHighlight, environmentMapHighlight,
    floorMesh, floorTron, floorTron2,
    mouseX = 0, mouseY = 0,
    clientMouseX = 0,
    clientMouseY = 0,

    cameraTarget = "auto",
    //dwRobots = ["assets/models/Legs.gltf", "assets/models/Head.gltf", "assets/models/Body.gltf"],
    dwRobots = [
        "assets/models/KCT/Robot_KCT_Body.gltf.lzma",
        "assets/models/KCT/Robot_KCT_Lidar.gltf.lzma",
        "assets/models/KCT/Robot_KCT_Motor.gltf.lzma",
        "assets/models/KCT/Robot_KCT_Wheel.gltf.lzma",
        "assets/models/KCT/Robot_KCT_Board.gltf.lzma"],
    bmLoadedAssets = 0,
    bmLoadedBattle = 0,

    bodyObject,
    lidarObject,
    motorObject,
    wheelObject,
    boardObject,



    index = 0,




    my_lzma = new LZMA("assets/js/lzma_worker.js"),
    soundEnabled = true,
    soundList = ["click", "woosh1", "woosh2", "toggle"],
    bmTotalBattle = dwRobots.length,

    FresnelShader = {
        uniforms: {
            mRefractionRatio: {
                type: "f",
                value: null
            },
            mFresnelBias: {
                type: "f",
                value: null
            },
            mFresnelPower: {
                type: "f",
                value: null
            },
            mFresnelScale: {
                type: "f",
                value: null
            },
            tCube: {
                type: "t",
                value: null
            }
        },
        vertexShader: ["uniform float mRefractionRatio;", "uniform float mFresnelBias;",
            "uniform float mFresnelScale;", "uniform float mFresnelPower;",
            "varying vec3 vReflect;",
            "varying vec3 vRefract[3];", "varying float vReflectionFactor;", "void main() {",
            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
            "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
            "vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",
            "vec3 I = worldPosition.xyz - cameraPosition;", "vReflect = reflect( I, worldNormal );",
            "vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );",
            "vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );",
            "vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );",
            "vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );",
            "gl_Position = projectionMatrix * mvPosition;", "}"
        ].join("\n"),
        fragmentShader: ["uniform samplerCube tCube;", "varying vec3 vReflect;",
            "varying vec3 vRefract[3];",
            "varying float vReflectionFactor;", "void main() {",
            "vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );",
            "vec4 refractedColor = vec4( 0.0 );",
            "refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;",
            "refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;",
            "refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;",
            "gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );",
            "}"
        ].join("\n")
    },
    FresnelShader2 = {
        uniforms: {
            mRefractionRatio: {
                type: "f",
                value: null
            },
            mFresnelBias: {
                type: "f",
                value: null
            },
            mFresnelPower: {
                type: "f",
                value: null
            },
            mFresnelScale: {
                type: "f",
                value: null
            },
            tCube: {
                type: "t",
                value: null
            }
        },
        vertexShader: ["uniform float mRefractionRatio;", "uniform float mFresnelBias;",
            "uniform float mFresnelScale;", "uniform float mFresnelPower;", "varying vec3 vReflect;",
            "varying vec3 vRefract[3];", "varying float vReflectionFactor;", "void main() {",
            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
            "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
            "vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );",
            "vec3 I = worldPosition.xyz - cameraPosition;", "vReflect = reflect( I, worldNormal );",
            "vRefract[0] = refract( normalize( I ), worldNormal, mRefractionRatio );",
            "vRefract[1] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.99 );",
            "vRefract[2] = refract( normalize( I ), worldNormal, mRefractionRatio * 0.98 );",
            "vReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), mFresnelPower );",
            "gl_Position = projectionMatrix * mvPosition;", "}"
        ].join("\n"),
        fragmentShader: ["uniform samplerCube tCube;", "varying vec3 vReflect;", "varying vec3 vRefract[3];",
            "varying float vReflectionFactor;", "void main() {",
            "vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );",
            "vec4 refractedColor = vec4( 0.5 );",
            "refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;",
            "refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;",
            "refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;",
            "gl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );",
            "}"
        ].join("\n")
    };


init();