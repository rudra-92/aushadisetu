import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MedicineReport,
  NotificationItem,
  VerificationHistoryItem,
  VerificationResult
} from '../types';
import { storageService } from '../services/storageService';

interface AppContextType {
  history: VerificationHistoryItem[];
  reports: MedicineReport[];
  notifications: NotificationItem[];
  unreadCount: number;
  lastVerificationResult: VerificationResult | null;
  setLastVerificationResult: (res: VerificationResult | null) => void;
  recordVerification: (result: VerificationResult) => VerificationHistoryItem;
  submitMedicineReport: (
    reportData: Omit<MedicineReport, 'id' | 'submissionDate' | 'status' | 'timeline'>
  ) => MedicineReport;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<VerificationHistoryItem[]>([]);
  const [reports, setReports] = useState<MedicineReport[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [lastVerificationResult, setLastVerificationResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    setHistory(storageService.getHistory());
    setReports(storageService.getReports());
    setNotifications(storageService.getNotifications());
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const recordVerification = (result: VerificationResult): VerificationHistoryItem => {
    const newItem = storageService.addHistoryItem(result);
    setHistory(storageService.getHistory());
    setLastVerificationResult(result);
    return newItem;
  };

  const submitMedicineReport = (
    reportData: Omit<MedicineReport, 'id' | 'submissionDate' | 'status' | 'timeline'>
  ): MedicineReport => {
    const newReport = storageService.addReport(reportData);
    setReports(storageService.getReports());
    setNotifications(storageService.getNotifications());
    return newReport;
  };

  const markNotificationAsRead = (id: string) => {
    const updated = storageService.markNotificationRead(id);
    setNotifications(updated);
  };

  const markAllNotificationsAsRead = () => {
    const updated = storageService.markAllNotificationsRead();
    setNotifications(updated);
  };

  const clearHistory = () => {
    storageService.clearHistory();
    setHistory([]);
  };

  return (
    <AppContext.Provider
      value={{
        history,
        reports,
        notifications,
        unreadCount,
        lastVerificationResult,
        setLastVerificationResult,
        recordVerification,
        submitMedicineReport,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearHistory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
