// Leaving old app.jsx code here because I have never coded wiht shadcn before.

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Retro from "./pages/Retro.jsx";
import Modern from "./pages/Modern.jsx";
import AboutPage from "./pages/modern/AboutPage.jsx";
import ProjectsPage from "./pages/modern/ProjectsPage.jsx";
import ResearchPage from "./pages/modern/ResearchPage.jsx";
import ResumePage from "./pages/modern/ResumePage.jsx";
import ContactPage from "./pages/modern/ContactPage.jsx";
import LinuxPage from "./pages/modern/LinuxPage.jsx";
import TopBar from "./components/TopBar.jsx";

// Layout wrapper for modern sub-pages
function ModernLayout({ children }) {
  return (
    <div className="min-h-screen text-foreground page-enter">
      <TopBar />
      {children}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/retro/" element={<Retro />} />
        <Route path="/modern/" element={<Modern />} />
        <Route 
          path="/modern/about" 
          element={
            <ModernLayout>
              <AboutPage />
            </ModernLayout>
          } 
        />
        <Route 
          path="/modern/projects" 
          element={
            <ModernLayout>
              <ProjectsPage />
            </ModernLayout>
          } 
        />
        <Route 
          path="/modern/research" 
          element={
            <ModernLayout>
              <ResearchPage />
            </ModernLayout>
          } 
        />
        <Route 
          path="/modern/resume" 
          element={
            <ModernLayout>
              <ResumePage />
            </ModernLayout>
          } 
        />
        <Route 
          path="/modern/contact" 
          element={
            <ModernLayout>
              <ContactPage />
            </ModernLayout>
          } 
        />
        <Route 
          path="/modern/linux" 
          element={
            <ModernLayout>
              <LinuxPage />
            </ModernLayout>
          } 
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
