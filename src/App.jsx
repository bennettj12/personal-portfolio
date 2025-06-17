import { Routes, Route } from 'react-router-dom'
import { AnimatePresense } from 'framer-motion'

import Layout from './components/Layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ArtPage from './pages/Artpage.jsx'

function App() {

  return (
    <AnimatePresense mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="art" element={<ArtPage />} />
        </Route>
      </Routes>
    </AnimatePresense>

  )
}

export default App
