import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ArtPage from './pages/Artpage.jsx'
import { MotionContextProvider } from './context/MotionContext.jsx'

function App() {

  return (
      <MotionContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="art" element={<ArtPage />} />
          </Route>
        </Routes>
      </MotionContextProvider>


  )
}

export default App
