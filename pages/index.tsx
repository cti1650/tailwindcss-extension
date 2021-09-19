import React, { useEffect, useRef, useState } from 'react';
import { FiExternalLink } from 'react-icons/fi';

const Pages = () => {
    const [url, setUrl] = useState(null);
    const FrmRef = useRef(null);
    const handleLoad = (e) => {
        if (FrmRef) {
            setUrl(prev => { if (prev !== FrmRef.current.src) { return FrmRef.current.src } })
        }
    };
    const handleNewTab = () => {
        window.open(url, "_blank");
    };
    return (
        <div className="relative" style={{ width: 600, height: 550 }}>
            <div className="absolute top-0 left-0">
                <iframe
                    onLoad={handleLoad}
                    allow="payment"
                    ref={FrmRef}
                    id='frm-child'
                    src='https://tailwindcss.com/docs'
                    width='600'
                    height='550'
                    className="border-0"
                ></iframe>
            </div>
            <div className="absolute top-0 right-0 pr-5 pt-0.5 text-lg text-gray-500 hover:text-blue-500">
                <div onClick={handleNewTab}><FiExternalLink /></div>
            </div>
        </div>
    );
};

export default Pages;
