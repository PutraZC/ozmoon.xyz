import { 
  FaBolt, FaFire, FaClock, FaBell, FaCrown, FaGem, FaMagic, FaStar
} from 'react-icons/fa';

const getBadgeIcon = (text) => {
  const t = text?.toLowerCase() || '';
  if (t.includes('flash')) return <FaBolt className="inline text-base md:text-lg" />;
  if (t.includes('promo')) return <FaFire className="inline text-base md:text-lg" />;
  if (t.includes('limited')) return <FaClock className="inline text-base md:text-lg" />;
  if (t.includes('new')) return <FaBell className="inline text-base md:text-lg" />;
  if (t.includes('best') || t.includes('seller')) return <FaCrown className="inline text-base md:text-lg" />;
  if (t.includes('hot')) return <FaFire className="inline text-base md:text-lg" />;
  if (t.includes('exclusive')) return <FaGem className="inline text-base md:text-lg" />;
  if (t.includes('epic')) return <FaMagic className="inline text-base md:text-lg" />;
  return <FaStar className="inline text-base md:text-lg" />;
};

const getBadgeColor = (text) => {
  const t = text?.toLowerCase() || '';
  if (t.includes('flash')) return 'bg-yellow-500 hover:bg-yellow-600';
  if (t.includes('promo')) return 'bg-orange-500 hover:bg-orange-600';
  if (t.includes('limited')) return 'bg-purple-500 hover:bg-purple-600';
  if (t.includes('new')) return 'bg-blue-500 hover:bg-blue-600';
  if (t.includes('best') || t.includes('seller')) return 'bg-amber-500 hover:bg-amber-600';
  if (t.includes('hot')) return 'bg-red-500 hover:bg-red-600';
  if (t.includes('exclusive')) return 'bg-emerald-500 hover:bg-emerald-600';
  if (t.includes('epic')) return 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700';
  return 'bg-cyan-500 hover:bg-cyan-600';
};

function CardBadge({ text }) {
  if (!text) return null;
  
  return (
    <div className={`${getBadgeColor(text)} text-white font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all duration-200 hover:scale-105`}>
      {getBadgeIcon(text)}
      <span className="text-sm md:text-base font-bold tracking-wide">{text}</span>
    </div>
  );
}

export default CardBadge;