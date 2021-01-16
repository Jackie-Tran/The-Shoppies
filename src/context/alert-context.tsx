import { createContext } from 'react';

export type Alert = {
    severity: 'error' | 'success' | 'warning' | 'information';
    message: string;
}

export type AlertContextType = {
    alert: Alert;
    setAlert: React.Dispatch<React.SetStateAction<Alert>>;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AlertContext = createContext<AlertContextType>({
    alert: {
        severity: 'information',
        message: '',
    },
    setAlert: () => { console.warn('no alert provider') },
    open: false,
    setOpen: () => { console.warn('no alert provider') },
});