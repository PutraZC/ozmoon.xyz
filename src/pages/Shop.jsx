import { useEffect, useState } from "react"
import Card from "../components/Card"

function Shop() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`/shop.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="min-h-screen text-zekken-skin font-body selection:bg-rosario-base selection:text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <h1 className="text-4xl font-header font-bold text-zekken-skin mb-8 border-b border-sao-border pb-4 inline-block">
          Store
        </h1>

        <div className="md:columns-2 columns-1 gap-8 space-y-8">
          {products.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              slideshow={item.slideshow}
              price={item.price}
              discountPrice={item.discountPrice}
              stock={item.stock}
              maxDescLength={item.maxDescLength}
              badge={item.badge}
              purchaseButton={item.buttons?.buy ? {
                text: item.buttons.buy.text,
                onClick: () => window.open(item.buttons.buy.url)
              } : null}
              secondaryButton={item.buttons?.secondary ? {
                text: item.buttons.secondary.text,
                color: item.buttons.secondary.color || "bg-sao-glass border border-sao-border",
                onClick: () => window.open(item.buttons.secondary.url)
              } : null}
              thirdButton={item.buttons?.third ? {
                text: item.buttons.third.text,
                color: item.buttons.third.color || "bg-sao-glass border border-sao-border",
                onClick: () => window.open(item.buttons.third.url)
              } : null}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Shop