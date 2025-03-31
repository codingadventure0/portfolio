import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Html, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Glitch } from '@react-three/postprocessing';
import { GlitchMode } from 'postprocessing';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { LoadingManager } from 'three';
import '../assets/styles/Home.css';

const Home = () => {
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const [webGLError, setWebGLError] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Enhanced WebGL availability check
  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setWebGLAvailable(false);
          setWebGLError('WebGL is not supported in your browser');
          return;
        }

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          
          if (vendor.includes('Intel') && renderer.includes('HD Graphics')) {
            const versionMatch = renderer.match(/(\d+\.\d+\.\d+)/);
            if (versionMatch && versionMatch[0] < '10.18.10') {
              setWebGLError(`Your Intel HD Graphics driver (${versionMatch[0]}) may be too old for WebGL. Please update your graphics drivers.`);
            }
          }
        }
      } catch (e) {
        setWebGLAvailable(false);
        setWebGLError(`WebGL error: ${e.message}`);
      }
    };

    checkWebGL();
  }, []);

  // Fallback content if WebGL isn't available
  if (!webGLAvailable) {
    return (
      <section className="hero-section webgl-fallback">
        <div className="container">
          <div className="alert alert-danger mb-4">
            <h4>WebGL Not Available</h4>
            {webGLError && <p className="mb-2">{webGLError}</p>}
            <ul className="mb-4">
              <li>Try updating your graphics drivers</li>
              <li>Try using Chrome or Firefox</li>
              <li>Enable hardware acceleration in browser settings</li>
            </ul>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Full Stack Developer</h1>
              <p className="lead mb-4">Creating innovative solutions with cutting-edge technologies</p>
              <button className="btn btn-primary btn-lg px-4 me-2">View Projects</button>
              <button className="btn btn-outline-secondary btn-lg px-4">Contact Me</button>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                alt="Coding Illustration" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="particles-background" />
      
      <div className="container h-100 position-relative">
        <div className="row h-100 align-items-center">
          <div className="col-lg-6 hero-content">
            <h1 className="display-4 fw-bold mb-4 text-white">
              Hi, I'm <span className="text-primary">Developer</span>
            </h1>
            <p className="lead mb-4 text-white-50">
              Full Stack Developer | Cybersecurity Enthusiast | AI Explorer
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-primary btn-lg px-4 py-2">
                View Projects
              </button>
              <button className="btn btn-outline-light btn-lg px-4 py-2">
                Contact Me
              </button>
            </div>
            
            <div className="social-links mt-4">
              {['github', 'linkedin', 'twitter', 'instagram'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-light me-2"
                >
                  <i className={`bi bi-${social}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-lg-6 hero-3d-model">
            {!modelLoaded && (
              <div className="loading-overlay">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="progress mt-3" style={{ width: '200px' }}>
                  <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    role="progressbar" 
                    style={{ width: `${progress}%` }}
                  >
                    {progress}%
                  </div>
                </div>
              </div>
            )}
            
            <ErrorBoundary>
              <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  autoRotate 
                  autoRotateSpeed={2} 
                  maxPolarAngle={Math.PI / 2} 
                  minPolarAngle={Math.PI / 6}
                />
                
                <Suspense fallback={
                  <Html center>
                    <div className="text-white">Loading 3D model...</div>
                  </Html>
                }>
                  <CodingScene 
                    onLoaded={() => setModelLoaded(true)} 
                    onProgress={(p) => setProgress(p)}
                  />
                </Suspense>
                
                <EffectComposer>
                  <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                  <Glitch 
                    delay={[1.5, 3.5]} 
                    duration={[0.6, 1.0]} 
                    strength={[0.3, 1.0]} 
                    mode={GlitchMode.SPORADIC} 
                  />
                </EffectComposer>
              </Canvas>
            </ErrorBoundary>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-down"></div>
      </div>
    </section>
  );
};

// 3D Model Component
const CodingScene = ({ onLoaded, onProgress }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/laptop/model.gltf',
    undefined,
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);
      
      const loadingManager = new LoadingManager();
      loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
        const progress = Math.round((itemsLoaded / itemsTotal) * 100);
        onProgress(progress);
      };
      loader.setLoadingManager(loadingManager);
    }
  );
  
  const { actions } = useAnimations(animations, group);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (scene && animations && animations.length) {
      actions[animations[0].name].play();
      onLoaded();
    }
  }, [scene, animations, actions, onLoaded]);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.05
      );
      
      if (hovered) {
        group.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      }
    }
  });
  
  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={scene} 
        position={[0, -1, 0]} 
        scale={[0.8, 0.8, 0.8]}
        rotation={[0.1, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh position={[0, 0.9, -0.4]} rotation={[0, 0, 0]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshStandardMaterial color="#000" emissive="#0f0" emissiveIntensity={0.5}>
            <Html transform occlude="blending" distanceFactor={1.5} position={[0, 0, 0.01]}>
              <div className="code-screen">
                <pre>
                  <code className="language-javascript">
                    {`// Welcome to my portfolio!
function greet() {
  const skills = [
    'React', 'Three.js', 'Node.js',
    'Python', 'Cybersecurity', 'AI/ML'
  ];
  
  return \`I'm a developer passionate about 
    \${skills.join(', ')} and more!\`;
}`}
                  </code>
                </pre>
              </div>
            </Html>
          </meshStandardMaterial>
        </mesh>
      </primitive>
      
      <FloatingCodeParticles count={50} />
    </group>
  );
};

const FloatingCodeParticles = ({ count }) => {
  const particles = useRef();
  const symbols = ['{}', '()', '[]', '<>', ';', '=>', '=', '++', '--', '/*', '*/'];
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(state.clock.getElapsedTime() + i) * 0.005;
        particle.rotation.z += 0.01;
      });
    }
  });
  
  return (
    <group ref={particles}>
      {Array.from({ length: count }).map((_, i) => {
        const x = (Math.random() - 0.5) * 5;
        const y = (Math.random() - 0.5) * 3;
        const z = (Math.random() - 0.5) * 5;
        const size = Math.random() * 0.2 + 0.1;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        return (
          <Html key={i} position={[x, y, z]} transform>
            <div 
              className="code-particle" 
              style={{
                fontSize: `${size}rem`,
                color: `hsl(${Math.random() * 60 + 180}, 80%, 60%)`,
                opacity: Math.random() * 0.5 + 0.5,
                textShadow: '0 0 10px currentColor'
              }}
            >
              {symbol}
            </div>
          </Html>
        );
      })}
    </group>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('3D Render Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
          <span>3D rendering failed. Showing fallback content.</span>
        </div>
      );
    }
    return this.props.children;
  }
}

export default Home;