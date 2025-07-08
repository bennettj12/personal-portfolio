import { createContext, useState, useEffect } from "react";

export const MotionContext = createContext();

export function MotionContextProvider({ children }) {
    // default true
    const [animationsEnabled, setAnimationsEnabled] = useState(true);

    // Load saved preference
    useEffect(() => {
        const savedPreference = localStorage.getItem(`animationsEnabled`);
        if (savedPreference !== null) {
            setAnimationsEnabled(JSON.parse(savedPreference));
        }
    }, []);

    const toggleMotion = () => {
        const toggled = !animationsEnabled;
        setAnimationsEnabled(toggled);
        localStorage.setItem(`animationsEnabled`, JSON.stringify(toggled));
    }

    return (
        <MotionContext.Provider
            value={{ animationsEnabled, toggleMotion}}
        >
            {children}
        </MotionContext.Provider>
    )
}