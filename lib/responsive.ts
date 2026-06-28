import { useState, useEffect } from 'react';

export function useResponsive() {
  const [state, setState] = useState({ isMobile: false, isTablet: false });
  useEffect(() => {
    const update = () => setState({
      isMobile: window.innerWidth <= 768,
      isTablet: window.innerWidth <= 1024,
    });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return state;
}
