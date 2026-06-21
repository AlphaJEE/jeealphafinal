'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  title: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (title: string, message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const icons: Record<ToastVariant, string> = {
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  error: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
};

const colors: Record<ToastVariant, string> = {
  success: 'border-[#d5fad3] text-[#0f0e0b] bg-[#d5fad3]',
  error: 'border-red-200 text-red-900 bg-red-50',
  warning: 'border-amber-200 text-amber-900 bg-amber-50',
  info: 'border-[#badbee] text-[#0f0e0b] bg-[#badbee]',
};

const iconColors: Record<ToastVariant, string> = {
  success: 'text-green-700',
  error: 'text-red-600',
  warning: 'text-amber-600',
  info: 'text-blue-600',
};

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, message: string, variant: ToastVariant = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [{ id, title, message, variant }, ...prev]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 7000);
  }, []);

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-md px-4 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast-enter flex items-start gap-3 p-4 border pointer-events-auto ${colors[toast.variant]}`}
            style={{ borderRadius: '0' }}
          >
            <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors[toast.variant]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[toast.variant]} />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-code-label font-semibold uppercase">{toast.title}</p>
              <p className="text-body-small mt-0.5 opacity-80">{toast.message}</p>
            </div>
            <button onClick={() => dismiss(toast.id)} className="opacity-50 hover:opacity-100 transition-opacity pointer-events-auto flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
