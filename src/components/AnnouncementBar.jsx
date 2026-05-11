import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaInfoCircle, 
  FaExclamationTriangle, 
  FaTimesCircle, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaWrench,
  FaCalendarAlt,
  FaTag,
  FaGift
} from 'react-icons/fa';

const announcementStyles = {
  info: 'bg-sky-900/50 border-sky-700 text-sky-200',
  warning: 'bg-orange-900/50 border-orange-700 text-orange-200',
  error: 'bg-red-900/50 border-red-700 text-red-200',
  success: 'bg-emerald-900/50 border-emerald-700 text-emerald-200',
  degraded: 'bg-stone-900/50 border-stone-700 text-stone-200',
  maintenance: 'bg-violet-900/50 border-violet-700 text-violet-200',
  event: 'bg-cyan-900/50 border-cyan-700 text-cyan-200',
  sale: 'bg-amber-900/50 border-amber-700 text-amber-200',
  celebration: 'bg-fuchsia-900/50 border-fuchsia-700 text-fuchsia-200'
};

const defaultIcons = {
  info: <FaInfoCircle className="text-lg" />,
  warning: <FaExclamationTriangle className="text-lg" />,
  error: <FaTimesCircle className="text-lg" />,
  success: <FaCheckCircle className="text-lg" />,
  degraded: <FaExclamationCircle className="text-lg" />,
  maintenance: <FaWrench className="text-lg" />,
  event: <FaCalendarAlt className="text-lg" />,
  sale: <FaTag className="text-lg" />,
  celebration: <FaGift className="text-lg" />
};

function parseExpired(expired) {
  if (!expired) return null;
  
  if (/^\d+$/.test(expired)) {
    return parseInt(expired) * 1000;
  }
  
  const match = expired.match(/^(\d+)([mh])$/);
  if (match) {
    const value = parseInt(match[1]);
    const unit = match[2];
    if (unit === 'm') return value * 60 * 1000;
    if (unit === 'h') return value * 60 * 60 * 1000;
  }
  
  return null;
}

function formatDate(dateString) {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const today = new Date();
  
  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffYears = Math.floor(diffDays / 365);
  const diffMonths = Math.floor(diffDays / 30);
  
  const fullDate = date.toLocaleDateString('en-US', { 
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
  
  if (diffDays === 0) {
    return `${fullDate} (Today)`;
  }
  if (diffDays === 1) {
    return `${fullDate} (Yesterday)`;
  }
  if (diffDays >= 2 && diffDays <= 6) {
    return `${fullDate} (${diffDays} days ago)`;
  }
  if (diffDays >= 7 && diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${fullDate} (${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago)`;
  }
  if (diffDays >= 30 && diffDays < 365) {
    return `${fullDate} (${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago)`;
  }
  if (diffDays >= 365) {
    return `${fullDate} (${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago)`;
  }
  
  return fullDate;
}

function AnnouncementBar({ 
  message, 
  type = 'info', 
  dismissible = true,
  expired,
  date,
  link,
  onDismiss,
  className = '',
  icon
}) {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (dismissible) {
      const stored = localStorage.getItem(`announcement_${message}`);
      if (stored) {
        try {
          const { dismissed, expiry } = JSON.parse(stored);
          if (dismissed && Date.now() < expiry) {
            setIsVisible(false);
            return;
          } else {
            localStorage.removeItem(`announcement_${message}`);
          }
        } catch {
          localStorage.removeItem(`announcement_${message}`);
        }
      }
    }
  }, [message, dismissible]);

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    
    if (dismissible) {
      const expiryTime = parseExpired(expired);
      if (expiryTime) {
        localStorage.setItem(`announcement_${message}`, JSON.stringify({
          dismissed: true,
          expiry: Date.now() + expiryTime
        }));
      } else {
        localStorage.setItem(`announcement_${message}`, 'true');
      }
    }
    
    if (onDismiss) onDismiss();
  };

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  if (!isVisible) return null;

  const formattedDate = formatDate(date);
  const isClickable = !!link;
  const isSamePage = link && location.pathname === link;
  const borderWidth = type === 'warning' || type === 'error' ? 'border-l-8' : 'border-l-4';

  return (
    <div 
      className={`
        ${announcementStyles[type]} 
        backdrop-blur-md
        ${borderWidth}
        px-4 py-3 rounded-lg shadow-lg 
        flex items-center justify-between 
        border border-sao-border
        ${className} 
        announcement-enter
        ${isClickable && !isSamePage ? 'cursor-pointer hover:scale-[1.01] hover:shadow-rosario-light/20 transition-all duration-300' : ''}
      `}
      onClick={isClickable && !isSamePage ? handleClick : undefined}
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="text-lg">{icon || defaultIcons[type]}</span>
        <div className="flex-1">
          <p className="text-sm font-body font-medium leading-relaxed text-zekken-skin">
            {message}
            {isClickable && !isSamePage && <span className="ml-2 text-xs text-rosario-light">↗</span>}
          </p>
          {formattedDate && (
            <p className="text-xs font-mono text-gray-400 mt-1 tracking-tight">
              {formattedDate}
            </p>
          )}
        </div>
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="hover:opacity-75 hover:bg-zekken-tunic/20 transition-all duration-200 text-lg ml-2 z-10 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-rosario-light"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default AnnouncementBar;