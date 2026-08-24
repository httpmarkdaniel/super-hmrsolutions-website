import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroBgCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x080e16, 1)
    mount.appendChild(renderer.domElement)

    // ── Scene & Camera ──
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x080e16, 0.028)

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.set(0, 10, 26)
    camera.lookAt(0, 0, 0)

    // ── Undulating grid plane ──
    const SEG = 70
    const planeGeo = new THREE.PlaneGeometry(100, 100, SEG, SEG)
    planeGeo.rotateX(-Math.PI / 2)

    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x005eb8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })

    const plane = new THREE.Mesh(planeGeo, planeMat)
    plane.position.y = -6
    scene.add(plane)

    // store original vertex Y positions
    const pos = planeGeo.attributes.position
    const baseY = new Float32Array(pos.count)
    for (let i = 0; i < pos.count; i++) baseY[i] = pos.getY(i)

    // ── Second, brighter grid offset slightly ──
    const planeGeo2 = new THREE.PlaneGeometry(100, 100, 30, 30)
    planeGeo2.rotateX(-Math.PI / 2)
    const planeMat2 = new THREE.MeshBasicMaterial({
      color: 0x1a6fd4,
      wireframe: true,
      transparent: true,
      opacity: 0.10,
    })
    const plane2 = new THREE.Mesh(planeGeo2, planeMat2)
    plane2.position.y = -5.8
    scene.add(plane2)

    const pos2 = planeGeo2.attributes.position
    const baseY2 = new Float32Array(pos2.count)
    for (let i = 0; i < pos2.count; i++) baseY2[i] = pos2.getY(i)

    // ── Floating particles ──
    const PART = 220
    const partPos = new Float32Array(PART * 3)
    const partVel = new Float32Array(PART * 3)
    for (let i = 0; i < PART; i++) {
      partPos[i * 3]     = (Math.random() - 0.5) * 90
      partPos[i * 3 + 1] = Math.random() * 22 - 2
      partPos[i * 3 + 2] = (Math.random() - 0.5) * 60
      partVel[i * 3]     = (Math.random() - 0.5) * 0.008
      partVel[i * 3 + 1] = (Math.random()) * 0.005 + 0.002
      partVel[i * 3 + 2] = (Math.random() - 0.5) * 0.006
    }
    const partGeo = new THREE.BufferGeometry()
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3))
    const partMat = new THREE.PointsMaterial({
      color: 0x63aee8,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(partGeo, partMat)
    scene.add(particles)

    // ── Glowing orbs (wide, soft points) ──
    const ORB_COUNT = 6
    const orbPos = new Float32Array(ORB_COUNT * 3)
    for (let i = 0; i < ORB_COUNT; i++) {
      orbPos[i * 3]     = (Math.random() - 0.5) * 60
      orbPos[i * 3 + 1] = Math.random() * 10
      orbPos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    const orbGeo = new THREE.BufferGeometry()
    orbGeo.setAttribute('position', new THREE.BufferAttribute(orbPos, 3))
    const orbMat = new THREE.PointsMaterial({
      color: 0x4d9de0,
      size: 3.5,
      transparent: true,
      opacity: 0.18,
      sizeAttenuation: true,
    })
    scene.add(new THREE.Points(orbGeo, orbMat))

    // ── Mouse ──
    let mx = 0, my = 0
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // ── Resize ──
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Animation loop ──
    let frameId, t = 0
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.007

      // Wave grid 1
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i)
        const z = pos.getZ(i)
        const wave = Math.sin(x * 0.13 + t) * Math.cos(z * 0.11 + t * 0.6) * 1.8
               + Math.sin(x * 0.06 + t * 0.4) * 0.8
        pos.setY(i, baseY[i] + wave)
      }
      pos.needsUpdate = true

      // Wave grid 2 (offset phase)
      for (let i = 0; i < pos2.count; i++) {
        const x = pos2.getX(i)
        const z = pos2.getZ(i)
        const wave = Math.sin(x * 0.10 + t * 0.8 + 1.2) * Math.cos(z * 0.13 + t * 0.5) * 1.4
        pos2.setY(i, baseY2[i] + wave)
      }
      pos2.needsUpdate = true

      // Float particles upward, wrap
      const pp = partGeo.attributes.position.array
      for (let i = 0; i < PART; i++) {
        pp[i * 3]     += partVel[i * 3]
        pp[i * 3 + 1] += partVel[i * 3 + 1]
        pp[i * 3 + 2] += partVel[i * 3 + 2]
        if (pp[i * 3 + 1] > 20) {
          pp[i * 3 + 1] = -2
          pp[i * 3]     = (Math.random() - 0.5) * 90
          pp[i * 3 + 2] = (Math.random() - 0.5) * 60
        }
      }
      partGeo.attributes.position.needsUpdate = true

      // Camera mouse parallax
      camera.position.x += (mx * 5  - camera.position.x) * 0.018
      camera.position.y += (-my * 2 + 10 - camera.position.y) * 0.018
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      planeGeo.dispose(); planeMat.dispose()
      planeGeo2.dispose(); planeMat2.dispose()
      partGeo.dispose(); partMat.dispose()
      orbGeo.dispose(); orbMat.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
