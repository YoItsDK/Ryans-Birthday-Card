/**
 * Three.js Scene, Camera, and Renderer Setup
 * Handles core WebGL initialization and viewport management
 */

let scene, camera, renderer, controls;
let pixelRatio, qualityLevel, enableShadows;

export function initializeThreeJs() {
  // Detect device capabilities and quality level
  const gl = document.createElement('canvas').getContext('webgl2');
  const capabilities = {
    maxTexSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxRenderbufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE)
  };
  
  pixelRatio = window.devicePixelRatio || 1;
  
  // Detect mobile and auto-set quality
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  qualityLevel = isMobile ? 'low' : 'high';
  enableShadows = !isMobile;
  
  console.log(`Device capability: ${qualityLevel} | Mobile: ${isMobile} | MaxTexSize: ${capabilities.maxTexSize}`);
  
  // Create scene with dark background
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0c10);
  console.log('Scene created');
  
  // Create camera with appropriate aspect ratio
  camera = new THREE.PerspectiveCamera(39, innerWidth / innerHeight, 0.1, 1000);
  
  // Load saved camera position or use defaults
  const savedStartingCam = localStorage.getItem('startingCameraPos');
  if (savedStartingCam) {
    const pos = JSON.parse(savedStartingCam);
    camera.position.set(pos.x, pos.y, pos.z);
    console.log(`Loaded saved starting camera: X=${pos.x.toFixed(2)}, Y=${pos.y.toFixed(2)}, Z=${pos.z.toFixed(2)}`);
  } else {
    camera.position.set(8.6169, 13.9496, -0.2345);
  }
  camera.updateProjectionMatrix();
  console.log('Camera created with clipping range: 0.1m - 1000m');
  
  // Create optimized WebGL renderer
  renderer = new THREE.WebGLRenderer({ 
    antialias: qualityLevel !== 'low', 
    powerPreference: 'high-performance',
    precision: qualityLevel === 'high' ? 'highp' : 'mediump',
    alpha: false,
    stencil: false,
    depth: true
  });
  
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(pixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  
  // Enable hardware acceleration features
  if (qualityLevel === 'high') {
    renderer.shadowMap.enabled = enableShadows;
    renderer.shadowMap.type = THREE.PCFShadowMap;
  } else {
    renderer.shadowMap.enabled = false;
  }
  
  // Append to canvas container
  const container = document.getElementById('canvas-container');
  container.appendChild(renderer.domElement);
  
  console.log(`Renderer created - Quality: ${qualityLevel}`);
  
  // Setup OrbitControls for camera movement
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotateSpeed = 4;
  controls.autoRotate = false;
  controls.update();
  console.log('Controls created');
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  return { scene, camera, renderer, controls, qualityLevel, enableShadows };
}

function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(pixelRatio);
}

export function getScene() { return scene; }
export function getCamera() { return camera; }
export function getRenderer() { return renderer; }
export function getControls() { return controls; }
export function getQualityLevel() { return qualityLevel; }

export function setQualityLevel(level) {
  qualityLevel = level;
  if (level === 'low') {
    renderer.setPixelRatio(1);
    enableShadows = false;
  } else if (level === 'med') {
    renderer.setPixelRatio(pixelRatio * 0.75);
    enableShadows = true;
  } else {
    renderer.setPixelRatio(pixelRatio);
    enableShadows = true;
  }
}
