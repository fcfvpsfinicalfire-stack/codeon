
import React, { useState, useEffect } from 'react';

const NotificationBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasBeenDismissed = sessionStorage.getItem('notificationBannerDismissed');
        if (!hasBeenDismissed) {
            setIsVisible(true);
        }
    }, []);

    const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        sessionStorage.setItem('notificationBannerDismissed', 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <a 
            href="https://discord.gg/codeon" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black animate-fade-in relative z-40 group"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                <div className="flex-grow flex items-center justify-center gap-3">
                    <p className="text-sm sm:text-base font-bold text-center">
                        🎉 All orders are processed via Discord! Join our server to place your order.
                    </p>
                </div>
                <button 
                    onClick={handleDismiss} 
                    className="text-black/70 hover:bg-black/10 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center transition-colors"
                    aria-label="Dismiss notification"
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </a>
    );
};

export default NotificationBanner;
