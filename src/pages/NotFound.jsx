import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="min-h-screen text-zekken-skin font-body selection:bg-rosario-base selection:text-white flex flex-col items-center justify-center text-center px-4">
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zekken-tunic/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-rosario-base/20 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="relative z-10 bg-sao-glass backdrop-blur-md rounded-lg p-8 md:p-12 border border-sao-border shadow-2xl max-w-md">
        <h1 className="text-8xl font-header font-bold text-rosario-light mb-4 tracking-wider">
          404
        </h1>
        
        <div className="w-16 h-px bg-sao-border mx-auto my-6"></div>
        
        <p className="text-2xl font-header text-zekken-skin mb-4">
          Page Not Found
        </p>
        
        <p className="text-gray-400 font-body mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link
          to="/"
          className="inline-block bg-zekken-tunic hover:bg-zekken-hair text-zekken-skin font-body px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          ← Go Back Home
        </Link>
      </div>
      
      <p className="absolute bottom-4 text-xs text-gray-600 font-mono">
        « System Error » · Connection Lost
      </p>
    </div>
  )
}

export default NotFound