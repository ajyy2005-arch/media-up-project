import React, { useState } from 'react';
import MediaModal from './MediaModal';

const MediaGallery = ({ items, onDelete }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    if (items.length === 0) {
        return (
            <div className="text-center py-20 text-slate-500">
                No media uploaded yet. Start by adding some files!
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {items.map((item) => (
                    <div key={item.id} className="relative group rounded-xl overflow-hidden bg-slate-800 shadow-xl border border-slate-700/50 aspect-video">
                        {item.type === 'image' ? (
                            <img
                                src={item.src}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        ) : (
                            <video
                                src={item.src}
                                className="w-full h-full object-cover"
                            />
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                            <button
                                onClick={() => setSelectedItem(item)}
                                className="bg-blue-500/90 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg flex items-center gap-2"
                            >
                                <span>👁️</span> View  
                            </button>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg delay-75"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <MediaModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </>
    );
};

export default MediaGallery;
