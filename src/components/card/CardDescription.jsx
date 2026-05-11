import { createPortal } from "react-dom";

function CardDescription({ isOpen, onClose, description, title }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-sao-glass backdrop-blur-md p-6 rounded-lg max-w-md w-full mx-4 relative border border-sao-border shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-rosario-light text-xl transition-colors"
        >
          ✕
        </button>

        <h3 className="text-zekken-skin text-xl font-header font-bold mb-4 border-b border-sao-border pb-2">
          {title}
        </h3>

        <p className="text-gray-300 font-body mb-6 whitespace-pre-line leading-relaxed">
          {description}
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-rosario-critical hover:bg-red-700 px-6 py-2 rounded-lg text-white font-body transition-all duration-200 transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CardDescription;