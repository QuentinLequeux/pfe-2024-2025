import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const ScrollButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const viewportHeight = 600;

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > viewportHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <Button onClick={scrollToTop} className={`bg-main hover:bg-hover !p-2.5 fixed right-5 bottom-5 rounded-full shadow-xl transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8L8 1M8 1L15 8M8 1V15" stroke="#09090B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Button>
        </div>
    );
}

export default ScrollButton;
