import { MMKV } from 'react-native-mmkv';
import { type StateStorage } from 'zustand/middleware';

const storage = new MMKV();

const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        if (!storage) return;
        return storage.set(name, value);
    },
    getItem: (name) => {
        if (!storage) return null;
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem: (name) => {
        if (!storage) return;
        return storage.delete(name);
    },
};

export default zustandStorage;
