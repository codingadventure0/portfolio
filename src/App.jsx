import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
// import ProjectDetails from './pages/ProjectDetails';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './assets/styles/global.css';
import Loader from './components/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading your app
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust time as needed (matches loader animation)

    return () => clearTimeout(timer);
  }, []);

  return (
   
      <div className="app">
        {isLoading ? (
          <Loader />
        ) : (
          <>
          <Navbar />
          {/* <Home /> */}
          <Routes>
            <Route path="/portfolio" element={<Home />} exact/>
            <Route path="/projects" element={<Projects />} exact/>
            {/* <Route path="/projects/:id" element={<ProjectDetails />} exact/> */}
            <Route path="/contact" element={<Contact />} exact/>
            {/* <Route path="/about" element={<About />} exact/> */}
          </Routes>
          <Footer />
          </>
        )}
      </div>
  
  );
}

export default App;