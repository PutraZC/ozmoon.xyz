import { FaTags, FaGift } from 'react-icons/fa';
import CardBadge from './CardBadge';
import { getStockInfo } from '../../utils/stockUtils';

function CardStock({ price, discountPrice, currency = "$", stock, badge }) {
  const discountPercent =
    price && discountPrice
      ? Math.round(((price - discountPrice) / price) * 100)
      : null;

  const isFree = price === 0;
  const isOutOfStock = stock === 0;
  const isUnlimited = stock > 999;

  const stockInfo = getStockInfo(stock, isOutOfStock, isUnlimited);

  return (
    <>
      <div className="mb-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {isFree ? (
            <>
              <FaGift className="text-2xl md:text-3xl text-pink-400" />
              <span className="text-2xl md:text-3xl font-bold text-pink-400">FREE</span>
              {discountPrice && price > 0 && (
                <span className="text-sm text-gray-400 line-through">
                  {currency}{price}
                </span>
              )}
            </>
          ) : discountPrice ? (
            <>
              <span className="text-2xl md:text-3xl font-bold text-rosario-light">
                {currency}{discountPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {currency}{price}
              </span>
              {discountPercent && (
                <span className="text-xs bg-rosario-critical/80 text-white px-2 py-0.5 rounded flex items-center gap-1">
                  <FaTags className="text-xs" />
                  -{discountPercent}%
                </span>
              )}
            </>
          ) : price ? (
            <span className="text-xl md:text-2xl font-bold text-rosario-light">
              {currency}{price}
            </span>
          ) : null}
        </div>

        <CardBadge text={badge} />
      </div>

      {stock !== undefined && (
        <div className="mb-4">
          <span className={`text-sm font-mono flex items-center gap-1 ${stockInfo.color}`}>
            {stockInfo.icon}
            {stockInfo.message}
          </span>
        </div>
      )}
    </>
  );
}

export default CardStock;