import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import MediaGallery from './MediaGallery';
import { saveMedia, loadMedia } from '../utils/storageUtils';

const MediaManager = () => {
    const [mediaItems, setMediaItems] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            const loaded = await loadMedia();
            setMediaItems(loaded);
        };
        loadItems();
    }, []);

    const handleUpload = (newItems) => {
        const updatedItems = [...newItems, ...mediaItems]; // Newest first
        setMediaItems(updatedItems);
        saveMedia(updatedItems);
    };

    const handleDelete = (id) => {
        const updatedItems = mediaItems.filter(item => item.id !== id);
        setMediaItems(updatedItems);
        saveMedia(updatedItems);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <header className="text-center py-8">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Media Gallery
                </h1>
                <p className="text-xl text-white mt-2">Secure Local Storage Manager</p>
            </header>

            <FileUpload onUpload={handleUpload} currentCount={mediaItems.length} />
            <MediaGallery items={mediaItems} onDelete={handleDelete} />
        </div>
    );
};

export default MediaManager;
