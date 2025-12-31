import { set, get } from 'idb-keyval';

const STORAGE_KEY = 'media_gallery_items';

export const saveMedia = async (items) => {
    try {
        await set(STORAGE_KEY, items);
    } catch (error) {
        console.error('Failed to save to IndexedDB:', error);
        // Alert removed as requested by user ("koi message alert ni hona chahiye")
    }
};

export const loadMedia = async () => {
    try {
        const stored = await get(STORAGE_KEY);
        return stored || [];
    } catch (error) {
        console.error('Failed to load from IndexedDB:', error);
        return [];
    }
};

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};
