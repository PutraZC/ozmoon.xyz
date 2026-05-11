import { useState } from "react";

function CardMedia({ slideshow }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!slideshow) return null;

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slideshow.length) % slideshow.length);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slideshow.length);
  };

  return (
    <div className="relative mb-4 overflow-hidden rounded-lg border border-sao-border">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slideshow.map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-full h-40 object-cover flex-shrink-0"
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-2xl leading-none bg-zekken-obsidian/50 hover:bg-zekken-tunic/70 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
      >
        ‹
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-2xl leading-none bg-zekken-obsidian/50 hover:bg-zekken-tunic/70 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slideshow.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 w-4 rounded-full transition-all duration-200 ${
              i === currentSlide 
                ? "bg-rosario-light w-6" 
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default CardMedia;