import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';

function AnnouncementStack() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetch(`/announcements.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(a => 
          a.scope === 'global' || a.scope === location.pathname
        );
        setAnnouncements(filtered);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load announcements:', err);
        setLoading(false);
      });
  }, [location.pathname]);

  if (loading || announcements.length === 0) return null;

  return (
    <div className="space-y-3">
      {announcements.map((announcement) => (
        <AnnouncementBar
          key={announcement.id}
          message={announcement.message}
          type={announcement.type}
          dismissible={announcement.dismissible}
          expired={announcement.expired}
          date={announcement.date}
          link={announcement.link}
        />
      ))}
    </div>
  );
}

export default AnnouncementStack;