/**
 * Optimized Lighting System
 * Adaptive quality lighting with performance tuning
 */

export function setupLights(scene, qualityLevel) {
  const lights = { directional: [], point: [], hemisphere: null };
  
  // Hemisphere light for ambient fill - essential for seeing everything
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444466, qualityLevel === 'high' ? 0.5 : 0.9);
  scene.add(hemisphereLight);
  lights.hemisphere = hemisphereLight;
  
  if (qualityLevel === 'high') {
    // High quality: Full cinematic lighting
    
    // Primary directional light with shadows
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.3);
    dir1.position.set(8, 10, 6);
    dir1.castShadow = true;
    dir1.shadow.mapSize.width = 2048;
    dir1.shadow.mapSize.height = 2048;
    dir1.shadow.camera.far = 100;
    dir1.shadow.camera.left = -50;
    dir1.shadow.camera.right = 50;
    dir1.shadow.camera.top = 50;
    dir1.shadow.camera.bottom = -50;
    dir1.shadow.bias = -0.0001;
    dir1.shadow.normalBias = 0.01;
    scene.add(dir1);
    lights.directional.push(dir1);
    
    // Fill light - softer secondary light
    const dir2 = new THREE.DirectionalLight(0xaabbff, 0.6);
    dir2.position.set(-5, 8, -3);
    scene.add(dir2);
    lights.directional.push(dir2);
    
    // Back light for separation
    const dir3 = new THREE.DirectionalLight(0xffccaa, 0.4);
    dir3.position.set(-8, 5, 8);
    scene.add(dir3);
    lights.directional.push(dir3);
    
  } else if (qualityLevel === 'med') {
    // Medium quality: Reduced shadow res, fewer lights
    
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.0);
    dir1.position.set(8, 10, 6);
    dir1.castShadow = true;
    dir1.shadow.mapSize.width = 1024;
    dir1.shadow.mapSize.height = 1024;
    dir1.shadow.camera.far = 100;
    dir1.shadow.bias = -0.0005;
    scene.add(dir1);
    lights.directional.push(dir1);
    
    const dir2 = new THREE.DirectionalLight(0xaabbff, 0.4);
    dir2.position.set(-5, 8, -3);
    scene.add(dir2);
    lights.directional.push(dir2);
    
  } else {
    // Low quality: No shadows, minimal lighting
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dir1.position.set(8, 10, 6);
    dir1.castShadow = false;
    scene.add(dir1);
    lights.directional.push(dir1);
  }
  
  console.log(`✓ Lighting setup: ${qualityLevel.toUpperCase()}`);
  return lights;
}

export function toggleShadows(enabled, renderer, lights) {
  renderer.shadowMap.enabled = enabled;
  lights.directional.forEach(light => {
    light.castShadow = enabled;
  });
  console.log(`${enabled ? '✓' : '✗'} Shadows: ${enabled ? 'enabled' : 'disabled'}`);
}
