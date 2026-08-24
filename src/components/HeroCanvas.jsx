import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 120
const CONNECTION_DISTANCE = 8
const SPREAD = { x: 50, y: 25, z: 15 }

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene + Camera ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 20

    // ── Particles ──
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD.x
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD.y
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD.z
      velocities.push(
        (Math.random() - 0.5) * 0.018,
        (Math.random() - 0.5) * 0.018,
        (Math.random() - 0.5) * 0.005,
      )
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0x63aee8,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    })

    const particleMesh = new THREE.Points(particleGeo, particleMat)
    scene.add(particleMesh)

    // ── Connecting lines ──
    const MAX_LINES = PARTICLE_COUNT * PARTICLE_COUNT
    const linePositions = new Float32Array(MAX_LINES * 6)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x005eb8,
      transparent: true,
      opacity: 0.35,
    })

    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    // ── Mouse tracking ──
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ──
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ──
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)

      // Move particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3]     += velocities[i * 3]
        positions[i * 3 + 1] += velocities[i * 3 + 1]
        positions[i * 3 + 2] += velocities[i * 3 + 2]

        if (Math.abs(positions[i * 3])     > SPREAD.x / 2) velocities[i * 3]     *= -1
        if (Math.abs(positions[i * 3 + 1]) > SPREAD.y / 2) velocities[i * 3 + 1] *= -1
        if (Math.abs(positions[i * 3 + 2]) > SPREAD.z / 2) velocities[i * 3 + 2] *= -1
      }
      particleGeo.attributes.position.needsUpdate = true

      // Draw connection lines
      let lineIdx = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = positions[i * 3]     - positions[j * 3]
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < CONNECTION_DISTANCE && lineIdx < MAX_LINES - 1) {
            linePositions[lineIdx * 6]     = positions[i * 3]
            linePositions[lineIdx * 6 + 1] = positions[i * 3 + 1]
            linePositions[lineIdx * 6 + 2] = positions[i * 3 + 2]
            linePositions[lineIdx * 6 + 3] = positions[j * 3]
            linePositions[lineIdx * 6 + 4] = positions[j * 3 + 1]
            linePositions[lineIdx * 6 + 5] = positions[j * 3 + 2]
            lineIdx++
          }
        }
      }
      lineGeo.setDrawRange(0, lineIdx * 2)
      lineGeo.attributes.position.needsUpdate = true

      // Subtle camera drift following mouse
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.025
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.025
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
