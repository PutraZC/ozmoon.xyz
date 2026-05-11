import { useState } from "react"
import { Link } from "react-router-dom"
import logoUrl from '../assets/T_IconRoleHead150_53_UI.png'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-sao-glass backdrop-blur-md border-b border-sao-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logoUrl} 
              alt="OZMoon Logo" 
              className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <h1 className="text-xl font-header font-bold text-zekken-skin tracking-wider group-hover:text-rosario-light transition-colors">
              OZMoon
            </h1>
          </Link>

          <button
            className="md:hidden text-2xl text-zekken-skin hover:text-rosario-light transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className="hidden md:flex gap-8">
            <Link to="/" className="font-body text-zekken-skin hover:text-rosario-light hover:-translate-y-0.5 transition-all duration-200">
              Home
            </Link>
            <Link to="/shop" className="font-body text-zekken-skin hover:text-rosario-light hover:-translate-y-0.5 transition-all duration-200">
              Shop
            </Link>
            <Link to="https://discord.ozmoon.xyz" className="font-body text-zekken-skin hover:text-rosario-light hover:-translate-y-0.5 transition-all duration-200">
              Discord
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-3 mt-4 pt-3 border-t border-sao-border md:hidden">
            <Link to="/" onClick={() => setMenuOpen(false)} className="font-body text-zekken-skin hover:text-rosario-light py-1 transition-colors">
              Home
            </Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="font-body text-zekken-skin hover:text-rosario-light py-1 transition-colors">
              Shop
            </Link>
            <Link to="https://discord.ozmoon.xyz" onClick={() => setMenuOpen(false)} className="font-body text-zekken-skin hover:text-rosario-light py-1 transition-colors">
              Discord
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar