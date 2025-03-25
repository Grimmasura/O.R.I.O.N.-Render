import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OrionRender() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // ✅ FIX: STRONGER LIGHTING ADDED
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5); // Brighter intensity
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // ✅ FIX: OBJECT SIZE ADJUSTMENT
    const geometry = new THREE.TorusKnotGeometry(8, 2, 256, 64); // Increased size
    const material = new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: false });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // ✅ FIX: CAMERA POSITION ADJUSTMENT
    camera.position.z = 20;
    camera.lookAt(torus.position);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();

    // Handle resizing
    function handleResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} style={{ position: "absolute", inset: 0, backgroundColor: "black" }} />;
}
