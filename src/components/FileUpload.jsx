import React, { useState } from 'react';
import { fileToBase64 } from '../utils/storageUtils';

const FileUpload = ({ onUpload, currentCount = 0 }) => {
    const [errors, setErrors] = useState([]);

    const validateFile = (file) => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const validVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime']; // .mov is usually video/quicktime
        const MAX_IMG_SIZE = 5 * 1024 * 1024; // 5MB
        const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

        if (file.type.startsWith('image/')) {
            if (!validImageTypes.includes(file.type)) {
                return `Invalid image format "${file.name}". Allowed: jpg, png, webp`;
            }
            if (file.size > MAX_IMG_SIZE) {
                return `Image "${file.name}" exceeds 5MB limit`;
            }
        } else if (file.type.startsWith('video/')) {
            if (!validVideoTypes.includes(file.type)) {
                return `Invalid video format "${file.name}". Allowed: mp4, webm, mov`;
            }
            if (file.size > MAX_VIDEO_SIZE) {
                return `Video "${file.name}" exceeds 50MB limit`;
            }
        } else {
            return `Unsupported file type: "${file.name}"`;
        }
        return null;
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Check if total limit exceeded
        if (currentCount + files.length > 5) {
            setErrors([`Limit exceeded! You can only store 5 items total. You have ${currentCount}.`]);
            e.target.value = ''; // Reset input
            return;
        }

        setErrors([]); // Clear previous errors
        const newErrors = [];
        const validFiles = [];

        files.forEach(file => {
            const error = validateFile(file);
            if (error) {
                newErrors.push(error);
            } else {
                validFiles.push(file);
            }
        });

        if (newErrors.length > 0) {
            setErrors(newErrors);
        }

        if (validFiles.length > 0) {
            const newMediaItems = await Promise.all(validFiles.map(async (file) => {
                const base64 = await fileToBase64(file);
                return {
                    id: Date.now() + Math.random(),
                    type: file.type.startsWith('image/') ? 'image' : 'video',
                    src: base64,
                    name: file.name,
                    date: new Date().toISOString()
                };
            }));
            onUpload(newMediaItems);
        }

        e.target.value = ''; // Reset input
    };

    return (
        <div className="space-y-4">
            <div className="p-8 border-2 border-dashed border-slate-600 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all text-center cursor-pointer relative group">
                <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="space-y-2 pointer-events-none">
                    <div className="text-5xl mb-4">📂</div>
                    <h3 className="text-2xl pb-2 font-medium text-slate-200 group-hover:text-blue-400 transition-colors">
                        Click or Drag files to upload
                    </h3>
                    <p className="text-sm text-slate-400">
                        Images (jpg, png, webp) up to 5MB <br />
                        Videos (mp4, webm, mov) up to 50MB
                    </p>
                </div>
            </div>

            {errors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-red-400 font-medium mb-1">
                        ⚠️ Upload Issues:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-red-300/90 space-y-1">
                        {errors.map((err, index) => (
                            <li key={index}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
