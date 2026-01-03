
import React, { useEffect } from 'react';

const TawkChat: React.FC = () => {
  useEffect(() => {
    // Tawk.to official embed script initialization
    // Property ID: 69217489805df0195d5eed4a
    // Widget ID: 1jalaueak
    
    (window as any).Tawk_API = (window as any).Tawk_API || {};
    (window as any).Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69217489805df0195d5eed4a/1jalaueak';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    }

    // Advanced proactive triggers via Tawk_API
    (window as any).Tawk_API.onLoad = function() {
      console.log("Tawk.to Chat Widget Loaded Successfully");
      
      // Proactively popup the chat after 30 seconds if user hasn't opened it
      // This increases conversion on pricing/order pages
      setTimeout(() => {
        if (!(window as any).Tawk_API.isChatMaximized()) {
          // Optional: Only maximize on high-intent pages if needed
          // (window as any).Tawk_API.maximize();
        }
      }, 30000);
    };

    return () => {
      // Cleanup: hide widget if the component were to unmount
      if ((window as any).Tawk_API && (window as any).Tawk_API.hideWidget) {
        try {
          (window as any).Tawk_API.hideWidget();
        } catch (e) {
          console.debug("Tawk.to cleanup failed", e);
        }
      }
    };
  }, []);

  return null;
};

export default TawkChat;
