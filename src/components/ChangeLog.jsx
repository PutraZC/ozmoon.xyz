import { useEffect, useState } from "react"

function ChangelogModal({ show, onClose }) {
    const [animateModal, setAnimateModal] = useState(false)
    const [logs, setLogs] = useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        fetch(`/changelogs.json?t=${Date.now()}`)
            .then(res => res.json())
            .then(data => setLogs(data))
    }, [])

    useEffect(() => {
        if (show) {
            setTimeout(() => setAnimateModal(true), 10)
            localStorage.setItem('changelog_lastSeen', Date.now().toString())
        } else {
            setAnimateModal(false)
        }
    }, [show])

    const closeModal = () => {
        setAnimateModal(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }

    const logsPerPage = 2
    const totalPages = Math.ceil(logs.length / logsPerPage)

    const currentLogs = logs.slice(
        page * logsPerPage,
        page * logsPerPage + logsPerPage
    )

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") closeModal()
        }
        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [])

    if (!show) return null

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[9999] transition-opacity duration-300 p-4"
            onClick={closeModal}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-sao-glass backdrop-blur-md rounded-lg w-full max-w-2xl relative 
                    transform transition-all duration-300 border border-sao-border shadow-2xl
                    ${animateModal
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-6 scale-95"
                    }
                `}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-rosario-light text-xl transition-colors z-10"
                >
                    ✕
                </button>

                <div className="p-6">
                    <h2 className="text-2xl font-header font-bold text-zekken-skin mb-6 border-b border-sao-border pb-2">
                        Changelogs
                    </h2>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {currentLogs.map((log, i) => (
                            <div key={i} className="border border-sao-border rounded-lg p-4 bg-zekken-obsidian/30">
                                <p className="font-mono text-rosario-light mb-3">
                                    [{log.date}]
                                </p>
                                <div className="space-y-1">
                                    {log.changes.map((c, index) => (
                                        <p key={index} className="text-gray-300 text-sm leading-relaxed">
                                            • {c}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-sao-border">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(page - 1)}
                            className="px-4 py-2 bg-sao-glass border border-sao-border rounded-lg text-zekken-skin hover:bg-zekken-tunic/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-gray-400 font-mono">
                            Page {page + 1} of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => setPage(page + 1)}
                            className="px-4 py-2 bg-sao-glass border border-sao-border rounded-lg text-zekken-skin hover:bg-zekken-tunic/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed font-body"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangelogModal