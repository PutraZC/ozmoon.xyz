import { useState } from "react";
import CardDescription from "./card/CardDescription";
import CardMedia from "./card/CardMedia";
import CardButtons from "./card/CardButtons";
import CardStock from "./card/CardStock";

function Card({
  title,
  description,
  link,
  linkText = "Visit",
  external = false,
  slideshow,
  titlePosition = "top",
  secondaryButton,
  thirdButton,
  purchaseButton,
  onClick,
  children,
  maxDescLength = 100,
  price,
  discountPrice,
  currency = "$",
  stock,
  badge,
}) {
  const [showModal, setShowModal] = useState(false);

  const isLongDescription = description && description.length > maxDescLength;
  const displayDescription = isLongDescription
    ? description.slice(0, maxDescLength) + "..."
    : description;
  
  const isFree = price === 0;
  const isOutOfStock = stock === 0;
  const purchaseDisabled = isOutOfStock

  return (
    <div className="bg-sao-glass backdrop-blur-md rounded-lg p-6 hover:bg-zekken-tunic/20 transition-all duration-300 hover:scale-[1.02] h-fit break-inside-avoid-column border border-sao-border shadow-lg sao-glass-panel">
      
      {titlePosition === "top" && (
        <h3 className="text-xl font-header font-bold text-zekken-skin mb-4 border-b border-sao-border pb-2">
          {title}
        </h3>
      )}

      <CardMedia slideshow={slideshow} />

      {titlePosition === "bottom" && (
        <h3 className="text-xl font-header font-bold text-zekken-skin mb-2 mt-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-gray-300 font-body mb-4 text-sm leading-relaxed">
          {displayDescription}
          {isLongDescription && (
            <button
              onClick={() => setShowModal(true)}
              className="text-rosario-light hover:text-rosario-base hover:underline ml-1 transition-colors"
            >
              See more
            </button>
          )}
        </p>
      )}

      {children}

      <CardStock
        price={price}
        discountPrice={discountPrice}
        currency={currency}
        stock={stock}
        isFree={isFree}
        badge={badge}
      />

      <CardButtons
        onClick={onClick}
        link={link}
        linkText={linkText}
        external={external}
        secondaryButton={secondaryButton}
        thirdButton={thirdButton}
        purchaseButton={purchaseButton}
        purchaseDisabled={purchaseDisabled}
        isFree={isFree}
      />

      <CardDescription
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        description={description}
        title={title}
      />
    </div>
  );
}

export default Card;