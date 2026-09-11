import type { Registrant } from "./Registrant";

const STORAGE_KEY = "lab14.registrant";

const defaultRegistrants: Registrant[] = [];

export const loadRegistrants = (): Registrant[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw
            ? JSON.parse(raw)
            : [];
    } catch {
        return defaultRegistrants;
    }
};

export const saveRegistrants = (newRegistrant: Registrant[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRegistrant));
};
