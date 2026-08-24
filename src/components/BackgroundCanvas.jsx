import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function BackgroundCanvas({ darkMode }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = window.innerWidth
    const H = window.innerHeight

    // Scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 1000)
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // Particles
    const COUNT = 130
    const positions = new Float32Array(COUNT * 3)
    const velocities = []

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 130
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      velocities.push({
        x: (Math.random() - 0.5) * 0.025,
        y: (Math.random() - 0.5) * 0.025,
        z: (Math.random() - 0.5) * 0.008,
      })
    }

    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const ptColor = darkMode ? 0x63aee8 : 0x005eb8
    const ptMat = new THREE.PointsMaterial({
      color: ptColor,
      size: 0.55,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(ptGeo, ptMat)
    scene.add(points)

    // Lines
    const MAX_LINES = COUNT * COUNT
    const linePositions = new Float32Array(MAX_LINES * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineColor = darkMode ? 0x63aee8 : 0x005eb8
    const lineMesh = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: darkMode ? 0.18 : 0.12,
    }))
    scene.add(lineMesh)

    // Mouse drift
    let mx = 0, my = 0
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Resize
    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    let frameId
    const animate = () => {
      frameId = requestAnimationFrame(animate)

      const pos = ptGeo.attributes.position.array
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3]     += velocities[i].x
        pos[i * 3 + 1] += velocities[i].y
        pos[i * 3 + 2] += velocities[i].z
        if (pos[i * 3]     >  65) pos[i * 3]     = -65
        if (pos[i * 3]     < -65) pos[i * 3]     =  65
        if (pos[i * 3 + 1] >  45) pos[i * 3 + 1] = -45
        if (pos[i * 3 + 1] < -45) pos[i * 3 + 1] =  45
      }
      ptGeo.attributes.position.needsUpdate = true

      // Draw connecting lines
      const lp = lineGeo.attributes.position.array
      let li = 0
      for (let i = 0; i < COUNT && li < MAX_LINES - 1; i++) {
        for (let j = i + 1; j < COUNT && li < MAX_LINES - 1; j++) {
          const dx = pos[i*3] - pos[j*3]
          const dy = pos[i*3+1] - pos[j*3+1]
          const dz = pos[i*3+2] - pos[j*3+2]
          if (dx*dx + dy*dy + dz*dz < 280) {
            lp[li*6]   = pos[i*3];   lp[li*6+1] = pos[i*3+1]; lp[li*6+2] = pos[i*3+2]
            lp[li*6+3] = pos[j*3];   lp[li*6+4] = pos[j*3+1]; lp[li*6+5] = pos[j*3+2]
            li++
          }
        }
      }
      lineGeo.setDrawRange(0, li * 2)
      lineGeo.attributes.position.needsUpdate = true

      // Gentle camera drift following mouse
      camera.position.x += (mx * 5 - camera.position.x) * 0.018
      camera.position.y += (-my * 3 - camera.position.y) * 0.018

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
      ptGeo.dispose()
      ptMat.dispose()
      lineGeo.dispose()
    }
  }, [darkMode])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: darkMode ? 0.28 : 0.13,
      }}
    />
  )
}
