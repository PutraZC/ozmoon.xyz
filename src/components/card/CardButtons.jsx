import { Link } from "react-router-dom";

function CardButtons({
  onClick,
  link,
  linkText = "Visit",
  external = false,
  secondaryButton,
  thirdButton,
  purchaseButton,
  purchaseDisabled,
  isFree = false
}) {
  const baseClass = "px-4 py-2 rounded font-body text-sm transition-all duration-200 transform hover:scale-105";
  const isSoldOut = purchaseDisabled === true;

  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      {onClick ? (
        <button onClick={onClick} className={`${baseClass} bg-zekken-tunic hover:bg-zekken-hair text-zekken-skin shadow-md`}>
          {linkText}
        </button>
      ) : external ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className={`${baseClass} bg-zekken-tunic hover:bg-zekken-hair text-zekken-skin shadow-md inline-block text-center`}>
          {linkText}
        </a>
      ) : link ? (
        <Link to={link} className={`${baseClass} bg-zekken-tunic hover:bg-zekken-hair text-zekken-skin shadow-md inline-block text-center`}>
          {linkText}
        </Link>
      ) : null}

      {secondaryButton && !isSoldOut && (
        <button
          onClick={secondaryButton.onClick}
          className={`${baseClass} ${secondaryButton.color || "bg-sao-glass border border-sao-border hover:bg-zekken-tunic/30"} text-zekken-skin`}
        >
          {secondaryButton.text}
        </button>
      )}

      {thirdButton && !isSoldOut && (
        <button
          onClick={thirdButton.onClick}
          className={`${baseClass} ${thirdButton.color || "bg-sao-glass border border-sao-border hover:bg-zekken-tunic/30"} text-zekken-skin`}
        >
          {thirdButton.text}
        </button>
      )}

      {purchaseButton && (
        <button
          onClick={!purchaseDisabled ? purchaseButton.onClick : undefined}
          disabled={purchaseDisabled}
          className={`${baseClass} ${
            purchaseDisabled
              ? "bg-gray-600 opacity-60 cursor-not-allowed"
              : isFree
                ? "bg-pink-600 hover:bg-pink-700 text-white shadow-md"
                : purchaseButton.color || "bg-rosario-critical hover:bg-red-700 text-white shadow-md"
          }`}
        >
          {purchaseDisabled ? "Sold Out" : (isFree ? "Get Free" : purchaseButton.text)}
        </button>
      )}
    </div>
  );
}

export default CardButtons;