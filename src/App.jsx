import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ArtPage from './pages/Artpage.jsx'
import ProjectDetailsPage from './pages/ProjectDetailsPage.jsx'
import { MotionContextProvider } from './context/MotionContext.jsx'

function App() {

  return (
      <MotionContextProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="projects">
              <Route index element={<ProjectsPage />} />
              <Route path=":projectId" element={<ProjectDetailsPage/>}/>
            </Route>
            <Route path="art" element={<ArtPage />} />
          </Route>
        </Routes>
      </MotionContextProvider>


  )
}

export default App
