import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimelineNode } from "../data/timeline";
import * as THREE from "three";

function Network({ color }: { color: string }) {
  const ref = useRef<any>(null);
  const linesRef = useRef<any>(null);

  // Create random points in a sphere
  const [positions] = useState(() =>
    random.inSphere(new Float32Array(300 * 3), { radius: 3 }),
  );

  // Create line geometry
  const lineGeometry = useMemo(() => {
    const points = [];
    const maxDistance = 0.8;

    for (let i = 0; i < 300; i++) {
      for (let j = i + 1; j < 300; j++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];

        const distance = Math.sqrt(
          Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2),
        );

        if (distance < maxDistance) {
          points.push(new THREE.Vector3(x1, y1, z1));
          points.push(new THREE.Vector3(x2, y2, z2));
        }
      }
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [positions]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 30;
    }
    if (linesRef.current) {
      linesRef.current.rotation.x -= delta / 20;
      linesRef.current.rotation.y -= delta / 30;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

interface BackgroundProps {
  selectedNode: TimelineNode | null;
  imageUrl: string;
  color: string;
}

export function Background({ selectedNode, imageUrl, color }: BackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      {/* Three.js Network Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <Network color={color} />
        </Canvas>
      </div>

      {/* Image Transition Background */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.75, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            <div
              className="absolute bg-cover bg-center bg-no-repeat transition-all duration-1000"
              style={{
                inset: "-30px",
                ...(imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}),
                filter:
                  "blur(4px) brightness(0.45) saturate(1.3) contrast(1.2)",
              }}
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/30 to-black/80" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color Overlay */}
      <div
        className="absolute inset-0 z-20 mix-blend-color transition-colors duration-1000 pointer-events-none"
        style={{ backgroundColor: color, opacity: 0.2 }}
      />
    </div>
  );
}
