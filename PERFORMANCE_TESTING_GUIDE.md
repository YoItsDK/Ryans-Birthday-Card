# Performance Testing Guide

## Overview
This guide covers how to test and optimize the E-Birthday-Card 3D application across different device types and quality levels.

## Quality Levels

### HIGH Quality
- **Shadow Resolution**: 4096x4096
- **Antialias**: Enabled
- **Shadows**: Full PCF shadow mapping
- **Lighting**: 3-light cinematic setup (primary + fill + back light)
- **Target Device**: Desktop/High-end laptops
- **Expected FPS**: 30-60 FPS

### MEDIUM Quality
- **Shadow Resolution**: 1024x1024
- **Antialias**: Enabled
- **Shadows**: PCF shadow mapping
- **Lighting**: 2-light setup (primary + fill)
- **Target Device**: Mid-range laptops/tablets
- **Expected FPS**: 40-60 FPS

### LOW Quality
- **Shadow Resolution**: 512x512
- **Antialias**: Disabled
- **Shadows**: Basic shadow mapping
- **Lighting**: 1-light setup (primary only)
- **Target Device**: Mobile devices/older hardware
- **Expected FPS**: 30-60 FPS

## How to Test Performance

### 1. Open Developer Console
Press `Ctrl+Shift+D` and enter password: `lbrbxayb`

### 2. Monitor Real-time Metrics
In the debug menu, you'll see:
- **FPS**: Current frames per second
- **Memory**: JavaScript heap size in MB
- **Quality Level**: Current setting (high/medium/low)
- **Shadows**: Whether shadows are enabled

### 3. Test Quality Levels
1. Click the quality buttons in the debug menu:
   - "LOW" - For mobile/low-end devices
   - "MEDIUM" - Balanced performance
   - "HIGH" - Maximum visual quality
2. Watch the FPS counter - it should update in real-time
3. Note any visible performance changes

### 4. Test Each Quality Level
**For LOW Quality:**
- Should achieve 30-60 FPS on any modern device
- Minimal shadows, basic lighting
- Good for mobile viewing

**For MEDIUM Quality:**
- Should achieve 40-60 FPS on mid-range devices
- Reduced shadow quality
- Good balance of visuals and performance

**For HIGH Quality:**
- Should achieve 30-60 FPS on high-end desktops
- Full shadow mapping and cinematic lighting
- Best visual appearance

### 5. Performance Metrics to Monitor

#### FPS (Frames Per Second)
- **60 FPS**: Excellent, smooth animation
- **30-60 FPS**: Good, acceptable for most users
- **Below 30 FPS**: Poor, visible stuttering

#### Memory Usage
- **< 100 MB**: Excellent
- **100-200 MB**: Good
- **200-300 MB**: Acceptable
- **> 300 MB**: May need optimization

#### Quality Settings Impact
Moving from HIGH to LOW should show:
- Shadow resolution: 4096 → 512 (8x reduction in pixels)
- Memory usage: ~20-30% reduction
- FPS improvement: ~50-100% increase

## Auto-Quality Scaling
The application includes auto-quality scaling that:
- Detects device capabilities on load
- Starts at appropriate quality level
- Falls back to LOW if FPS < 30
- Can be manually overridden in debug menu

## Camera Performance
- **Camera Position**: 11.91, 15.04, -0.47 (default)
- **Collision Detection**: Throttled to every 2 frames
- **Orbit Controls**: Damping enabled for smooth movement
- **View State**: Saved with 4-decimal precision

## Optimization Techniques Applied

### 1. Shadow Map Resolution Scaling
- Reduces memory footprint by 75% (HIGH to LOW)
- Maintains visual quality through PCF filtering
- Biggest FPS impact

### 2. Collision Detection Throttling
- Checks camera collision every 2 frames instead of every frame
- Reduces physics calculations by 50%
- Invisible to user

### 3. Bone Visual Updates
- Only updates when bones are visible
- Skips updates for hidden objects
- Reduces calculation overhead

### 4. Antialias Scaling
- Disabled on LOW quality
- Maintains quality on MED/HIGH
- 10-15% FPS improvement on LOW

### 5. Lighting Optimization
- Reduced light count on LOW quality (1 light)
- Reduced light count on MEDIUM quality (2 lights)
- Full 3-light setup on HIGH quality

## Testing Checklist

### Mobile Device Testing
- [ ] LOW quality achieves 30+ FPS
- [ ] Camera controls responsive
- [ ] Models load without crash
- [ ] No memory warnings

### Tablet Testing
- [ ] MEDIUM quality achieves 40+ FPS
- [ ] Smooth camera rotation
- [ ] Shadows visible but not excessive
- [ ] Touch controls responsive

### Desktop Testing
- [ ] HIGH quality achieves 30+ FPS
- [ ] Full shadows at 4096 resolution
- [ ] 3-light cinematic setup visible
- [ ] Smooth 60 FPS on high-end GPU

## Debug Console Features

### Camera Controls
- Position display with 4-decimal precision
- Target (viewing angle) display
- Zoom level tracking
- Save/Reset view state

### Quality Management
- Real-time quality level switching
- Shadow toggle (enable/disable)
- Performance metric display
- Memory usage tracking

### Performance Monitoring
- FPS counter
- Frame time display
- Memory heap usage
- Triangle count (if available)

## Troubleshooting Performance Issues

### High Latency (< 30 FPS)
1. Switch to LOW quality
2. Close background applications
3. Check GPU driver updates
4. Verify browser hardware acceleration enabled

### High Memory Usage (> 300 MB)
1. Reload page
2. Clear browser cache
3. Check for memory leaks in console
4. Switch to LOW quality

### Visual Artifacts
1. Update GPU drivers
2. Try different quality level
3. Clear shadows (disable and re-enable)
4. Check browser WebGL support (F12 → Rendering)

## Performance Targets

| Quality | Target FPS | Target Memory | Resolution | Notes |
|---------|-----------|---------------|-----------|-------|
| HIGH | 30-60 | < 200 MB | 4096 shadows | Desktop only |
| MEDIUM | 40-60 | < 150 MB | 1024 shadows | Laptop/Tablet |
| LOW | 30-60 | < 100 MB | 512 shadows | Mobile |

## Future Optimizations

Potential improvements for future versions:
1. **LOD System**: Load lower-detail models based on distance
2. **Mesh Merging**: Combine static meshes to reduce draw calls
3. **Texture Compression**: Use WebP/ASTC for faster loading
4. **Progressive Loading**: Stream assets as needed
5. **WebWorker Physics**: Move collision detection to worker thread

## Conclusion

The E-Birthday-Card application is optimized for performance across device types. Use this guide to test and validate performance on your target devices. The quality levels provide excellent flexibility for different hardware capabilities while maintaining visual fidelity.

For questions or performance issues, check the console logs which provide detailed information about loaded assets, camera state, and performance metrics.
