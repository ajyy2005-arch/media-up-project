import React from 'react';

const MediaModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop - placed before content so clicks register */}
            <div
                className="absolute inset-0 z-40 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={onClose}
            />

            <div className="relative z-50 max-w-[90vw] max-h-[90vh] p-2">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {item.type === 'image' ? (
                    <img
                        src={item.src}
                        alt={item.name}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                ) : (
                    <video
                        src={item.src}
                        controls
                        autoPlay
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                    />
                )}

                <div className="text-center mt-4 font-medium text-slate-300">
                    {item.name}
                </div>
            </div>
        </div>
    );
};

export default MediaModal;
