/**
 * Real-time Performance Monitoring
 * Tracks FPS, memory, and rendering metrics
 */

class PerformanceMonitor {
  constructor() {
    this.frameCount = 0;
    this.fps = 60;
    this.fpsHistory = [];
    this.lastFrameTime = performance.now();
    this.lastFpsUpdate = performance.now();
    this.metrics = {
      drawCalls: 0,
      meshes: 0,
      triangles: 0,
      textures: 0,
      memory: 0,
      frameTime: 16.67
    };
  }
  
  update() {
    const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;
    
    this.frameCount++;
    
    // Update FPS every 500ms
    if (now - this.lastFpsUpdate >= 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsUpdate));
      this.fpsHistory.push(this.fps);
      if (this.fpsHistory.length > 120) this.fpsHistory.shift();
      
      this.frameCount = 0;
      this.lastFpsUpdate = now;
    }
    
    this.metrics.frameTime = deltaTime;
    
    // Update memory if available
    if (performance.memory) {
      this.metrics.memory = (performance.memory.usedJSHeapSize / 1048576).toFixed(0);
    }
  }
  
  getAverageFps() {
    if (this.fpsHistory.length === 0) return 60;
    const sum = this.fpsHistory.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsHistory.length);
  }
  
  updateSceneMetrics(scene) {
    let meshCount = 0;
    let triangleCount = 0;
    
    scene.traverse(obj => {
      if (obj.isMesh) {
        meshCount++;
        if (obj.geometry && obj.geometry.index) {
          triangleCount += obj.geometry.index.count / 3;
        } else if (obj.geometry && obj.geometry.attributes.position) {
          triangleCount += obj.geometry.attributes.position.count / 3;
        }
      }
    });
    
    this.metrics.drawCalls = meshCount;
    this.metrics.meshes = meshCount;
    this.metrics.triangles = Math.round(triangleCount / 1000);
  }
  
  getMetrics() {
    return {
      fps: this.fps,
      avgFps: this.getAverageFps(),
      frameTime: this.metrics.frameTime.toFixed(2),
      drawCalls: this.metrics.drawCalls,
      meshes: this.metrics.meshes,
      triangles: this.metrics.triangles,
      memory: this.metrics.memory
    };
  }
}

export default PerformanceMonitor;
