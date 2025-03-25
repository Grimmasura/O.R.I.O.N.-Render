import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function OrionRender() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(5, 1, 256, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 20;

    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />;
}