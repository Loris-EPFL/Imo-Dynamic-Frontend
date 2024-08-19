// src/hooks/useScrollManager.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollRotate = () => {
      const element = document.getElementById('animatedElement');
      if (element) {
        element.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', scrollRotate);

    // Clean up the event listener when the route changes or component unmounts
    return () => {
      window.removeEventListener('scroll', scrollRotate);
    };
  }, [location]); // Re-run effect when route changes
};

export default useScrollManager;
