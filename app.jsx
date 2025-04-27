// App.jsx - Main Application Component
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF } from '@react-three/drei';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import CodingPlatforms from './components/CodingPlatforms';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import './styles/App.css';

// 3D Model Component
const ComputerModel = () => {
  const computer = useGLTF('./models/desktop_pc/scene.gltf');
  
  return (
    <primitive 
      object={computer.scene}
      scale={0.75}
      position={[0, -3.25, -1.5]}
      rotation={[-0.01, -0.2, -0.1]}
    />
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 2000);
  }, []);
  
  if (loading) return <Loader />;
  
  return (
    <Router>
      <div className="relative z-0 bg-gradient-to-b from-gray-900 to-black">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        
        {/* 3D Computer Model Section */}
        <div className="relative h-screen">
          <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <OrbitControls 
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <Stars />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <ComputerModel />
            </Suspense>
          </Canvas>
        </div>
        
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <CodingPlatforms />
        <Skills />
        <div className="relative z-0">
          <Contact />
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
