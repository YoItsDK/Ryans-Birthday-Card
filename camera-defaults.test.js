/**
 * Camera Default Position Test
 * Verifies that the default camera position correctly frames the birthday card mesh
 */

// Expected default values
const EXPECTED_DEFAULTS = {
  camera: {
    x: 8.6169,
    y: 13.9496,
    z: -0.2345
  },
  target: {
    x: 0,
    y: 0,
    z: 0
  },
  zoom: 1,
  orbitalAngles: {
    azimuth: 1.598,
    polar: 0.5535
  }
};

/**
 * Test suite for camera defaults
 */
function runCameraDefaultTests() {
  console.log('=== CAMERA DEFAULTS TEST SUITE ===');
  
  let passedTests = 0;
  let totalTests = 5;
  
  // Test 1: Camera position X coordinate
  if (testCameraPositionX()) passedTests++;
  
  // Test 2: Camera position Y coordinate
  if (testCameraPositionY()) passedTests++;
  
  // Test 3: Camera position Z coordinate
  if (testCameraPositionZ()) passedTests++;
  
  // Test 4: Target position
  if (testTargetPosition()) passedTests++;
  
  // Test 5: Zoom level
  if (testZoomLevel()) passedTests++;
  
  // Summary
  console.log(`\n✅ TESTS PASSED: ${passedTests}/${totalTests}`);
  if (passedTests === totalTests) {
    console.log('🎉 All camera defaults are correct!');
    return true;
  } else {
    console.log('⚠️ Some defaults may be incorrect. Check console for details.');
    return false;
  }
}

function testCameraPositionX() {
  const tolerance = 0.001;
  const expected = EXPECTED_DEFAULTS.camera.x;
  const actual = window.camera?.position?.x;
  
  if (actual === undefined) {
    console.warn('❌ Camera not initialized yet');
    return false;
  }
  
  const passed = Math.abs(actual - expected) < tolerance;
  const status = passed ? '✅' : '❌';
  console.log(`${status} Camera X: Expected ${expected}, Got ${actual?.toFixed(4)}`);
  return passed;
}

function testCameraPositionY() {
  const tolerance = 0.001;
  const expected = EXPECTED_DEFAULTS.camera.y;
  const actual = window.camera?.position?.y;
  
  if (actual === undefined) {
    console.warn('❌ Camera not initialized yet');
    return false;
  }
  
  const passed = Math.abs(actual - expected) < tolerance;
  const status = passed ? '✅' : '❌';
  console.log(`${status} Camera Y: Expected ${expected}, Got ${actual?.toFixed(4)}`);
  return passed;
}

function testCameraPositionZ() {
  const tolerance = 0.001;
  const expected = EXPECTED_DEFAULTS.camera.z;
  const actual = window.camera?.position?.z;
  
  if (actual === undefined) {
    console.warn('❌ Camera not initialized yet');
    return false;
  }
  
  const passed = Math.abs(actual - expected) < tolerance;
  const status = passed ? '✅' : '❌';
  console.log(`${status} Camera Z: Expected ${expected}, Got ${actual?.toFixed(4)}`);
  return passed;
}

function testTargetPosition() {
  const tolerance = 0.001;
  const expectedX = EXPECTED_DEFAULTS.target.x;
  const expectedY = EXPECTED_DEFAULTS.target.y;
  const expectedZ = EXPECTED_DEFAULTS.target.z;
  
  const actualX = window.controls?.target?.x;
  const actualY = window.controls?.target?.y;
  const actualZ = window.controls?.target?.z;
  
  if (actualX === undefined) {
    console.warn('❌ Controls target not initialized yet');
    return false;
  }
  
  const passedX = Math.abs(actualX - expectedX) < tolerance;
  const passedY = Math.abs(actualY - expectedY) < tolerance;
  const passedZ = Math.abs(actualZ - expectedZ) < tolerance;
  const passed = passedX && passedY && passedZ;
  
  const status = passed ? '✅' : '❌';
  console.log(`${status} Target: Expected (${expectedX}, ${expectedY}, ${expectedZ}), Got (${actualX?.toFixed(4)}, ${actualY?.toFixed(4)}, ${actualZ?.toFixed(4)})`);
  return passed;
}

function testZoomLevel() {
  const tolerance = 0.01;
  const expected = EXPECTED_DEFAULTS.zoom;
  const actual = window.camera?.zoom;
  
  if (actual === undefined) {
    console.warn('❌ Camera zoom not initialized yet');
    return false;
  }
  
  const passed = Math.abs(actual - expected) < tolerance;
  const status = passed ? '✅' : '❌';
  console.log(`${status} Zoom: Expected ${expected}, Got ${actual?.toFixed(2)}`);
  return passed;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runCameraDefaultTests, EXPECTED_DEFAULTS };
}
