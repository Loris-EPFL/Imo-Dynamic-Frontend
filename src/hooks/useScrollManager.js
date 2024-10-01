// src/hooks/useScrollManager.js
import { useLayoutEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollManager = () => {
  const location = useLocation();

  const scrollRotate = useCallback(() => {
    const element = document.getElementById('animatedElement');
    console.log('Element element');
    
    if (element && element !== null && element.offsetTop !== undefined) {
      console.log('Element offsetTop:', element.offsetTop);
      const scrollPosition = window.pageYOffset;
      const elementPosition = element.offsetTop;
      const distance = scrollPosition - elementPosition;
      
      // Only apply transform if the element is in view
      if (distance >= 0 && distance <= window.innerHeight) {
        element.style.transform = `translateY(${distance * 0.5}px)`;
      }
    } else {
      console.log('Element not found or offsetTop is undefined');
    }
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('scroll', scrollRotate);

    // Initial call to set position
    scrollRotate();

    // Clean up the event listener when the route changes or component unmount
    return () => {
      window.removeEventListener('scroll', scrollRotate);
    };
  }, [location, scrollRotate]);
};

export default useScrollManager;
