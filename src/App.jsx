import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ChangelogModal from "./components/ChangeLog"
import Navbar from "./components/NavBar"
import GuidePage from "./pages/GuidePage"
import NotFound from "./pages/NotFound"
import Shop from "./pages/Shop"
import AnnouncementStack from "./components/AnnouncementStack"
import HeroSection from "./features/profile/HeroSection"
import ProjectsSection from "./features/profile/ProjectsSection"
import SaoMenuSystem from "./components/sao-ui/SaoMenuSystem"

function App() {
  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault()
    document.addEventListener("contextmenu", disableRightClick)
    return () => document.removeEventListener("contextmenu", disableRightClick)
  }, [])

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const [showModal, setShowModal] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  useEffect(() => {
    const lastSeen = localStorage.getItem('changelog_lastSeen')
    const now = Date.now()
    
    if (!lastSeen || (now - parseInt(lastSeen)) > 43200000) {
      setShowModal(true)
    }
  }, [])
  return (
    <div className="min-h-screen text-zekken-skin bg-transparent font-body selection:bg-rosario-base selection:text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <AnnouncementStack />
      </div>

      {isHome && (
        <div className="relative md:fixed top-0 left-0 w-full md:w-80 h-auto md:h-full pointer-events-none z-10 md:z-10">
          <div className="pointer-events-auto h-auto md:h-full flex flex-col justify-start md:justify-center px-2 pt-2 md:p-0 md:pl-4 lg:pl-12 w-full md:w-80">
            <SaoMenuSystem onSectionChange={(section) => setActiveSection(section)} />
          </div>
        </div>
      )}

      <main className={`
        pt-24 md:pt-0 pr-4 md:pr-12 w-full transition-all duration-500 ease-in-out
        ${isHome ? 'pl-4 md:pl-80 lg:pl-96' : 'pl-4'}
      `}>
        <Routes>
          <Route path="/" element={
            <>
              <ChangelogModal show={showModal} onClose={() => setShowModal(false)} />
              <div className="pt-4">
                <div className={`transition-opacity duration-500 ${activeSection === 'profile' ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  <HeroSection />
                </div>
                <div className={`transition-opacity duration-500 pt-24 ${activeSection === 'projects' ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  <ProjectsSection />
                </div>
              </div>
            </>
          } />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="fixed bottom-0 w-full text-center py-4 z-40 bg-gradient-to-t from-zekken-obsidian to-transparent pointer-events-none">
         <p className="text-xs font-mono text-gray-500 tracking-widest uppercase">
           Website Full Credit: github.com/YuukiPS
         </p>
      </footer>
    </div>
  )
}

export default App