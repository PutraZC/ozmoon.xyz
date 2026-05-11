import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"

function GuidePage() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentFile, setCurrentFile] = useState("README.md")

  useEffect(() => {
    setLoading(true)
    fetch(`/guide/${currentFile}`)
      .then((res) => res.text())
      .then((text) => {
        const trimmed = text.trim().toLowerCase()
        if (trimmed.startsWith('<!doctype html>') || trimmed.includes('<html')) {
          throw new Error("File not found")
        }
        setContent(text)
        setLoading(false)
      })
      .catch((err) => {
        let errorMsg = "**Error loading guide.**"
        if (err.message === "File not found") {
          errorMsg = `**Error Page Missing / Not Found.**\n\n This may because tutorial outdated/deleted\n\nPlease [Back to Guide](README.md) or choose other from button above.`
        }
        setContent(errorMsg)
        setLoading(false)
      })
  }, [currentFile])

  const guideLinks = [
    { name: "Guide", file: "README.md" },
    { name: "PC English", file: "Win_Guide_EN.md" },
    { name: "Android English", file: "Android_Guide_EN.md" },
    { name: "Pre-CBT English", file: "CBT_Guide_EN.md" },
  ]

  const MarkdownLink = ({ href, children }) => {
    if (href && href.endsWith(".md")) {
      const fileName = href.split('/').pop();
      return (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentFile(fileName);
          }}
          className="text-rosario-light hover:text-rosario-base hover:underline cursor-pointer transition-colors"
        >
          {children}
        </a>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-rosario-light hover:text-rosario-base hover:underline transition-colors"
      >
        {children}
      </a>
    )
  }

  return (
    <div className="min-h-screen text-zekken-skin font-body selection:bg-rosario-base selection:text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-block mb-6 text-rosario-light hover:text-rosario-base hover:underline transition-colors">
          ← Back to Home
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {guideLinks.map((link) => (
            <button
              key={link.file}
              onClick={() => setCurrentFile(link.file)}
              className={`px-4 py-2 rounded font-body text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                currentFile === link.file
                  ? "bg-zekken-tunic text-zekken-skin shadow-md"
                  : "bg-sao-glass border border-sao-border text-zekken-skin hover:bg-zekken-tunic/30"
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        <div className="bg-sao-glass backdrop-blur-md rounded-lg p-6 border border-sao-border shadow-lg">
          {loading ? (
            <p className="text-gray-400 font-body">Loading...</p>
          ) : (
            <ReactMarkdown
              components={{
                a: MarkdownLink,
                h1: ({ node, ...props }) => <h1 className="text-3xl font-header font-bold text-zekken-skin mt-6 mb-4 border-b border-sao-border pb-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-header font-semibold text-zekken-skin mt-5 mb-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-header font-medium text-rosario-light mt-4 mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="text-gray-300 font-body mb-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-300 font-body mb-4" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-300 font-body mb-4" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                code: ({ inline, ...props }) => {
                  return inline ? (
                    <code className="bg-zekken-obsidian px-1 py-0.5 rounded text-sm font-mono text-rosario-light" {...props} />
                  ) : (
                    <code className="text-sm font-mono text-rosario-light bg-zekken-obsidian p-2 rounded block" {...props} />
                  )
                },
                pre: ({ ...props }) => (
                  <pre className="bg-zekken-obsidian p-3 rounded text-sm overflow-x-auto border border-sao-border" {...props} />
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  )
}

export default GuidePage