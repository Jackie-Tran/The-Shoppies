import { createContext } from 'react';

export type Alert = {
    severity: 'error' | 'success' | 'warning' | 'information';
    message: string;
}

export type AlertContextType = {
    alert: Alert;
    setAlert: React.Dispatch<React.SetStateAction<Alert>>;
}

export const AlertContext = createContext<AlertContextType>({
    alert: {
        severity: 'information',
        message: '',
    },
    setAlert: () => { console.warn('no alert provider') }
});