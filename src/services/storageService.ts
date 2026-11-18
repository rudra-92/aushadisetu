import {
  INITIAL_HISTORY,
  INITIAL_NOTIFICATIONS,
  INITIAL_REPORTS
} from '../data/mockData';
import {
  MedicineReport,
  NotificationItem,
  User,
  VerificationHistoryItem,
  VerificationResult
} from '../types';

const STORAGE_KEYS = {
  USER: 'aushadhi_user',
  HISTORY: 'aushadhi_history',
  REPORTS: 'aushadhi_reports',
  NOTIFICATIONS: 'aushadhi_notifications',
  SETTINGS: 'aushadhi_settings'
};

export const DEFAULT_USER: User = {
  id: 'usr_demo_01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91 98765 43210',
  role: 'Consumer',
  totalScans: 6,
  totalReports: 2
};

export const storageService = {
  // --- USER SESSION ---
  getUser(): User | null {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  updateUserProfile(updates: Partial<User>): User {
    const current = this.getUser() || DEFAULT_USER;
    const updated = { ...current, ...updates };
    this.setUser(updated);
    return updated;
  },

  // --- VERIFICATION HISTORY ---
  getHistory(): VerificationHistoryItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(INITIAL_HISTORY));
      return INITIAL_HISTORY;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_HISTORY;
    }
  },

  addHistoryItem(result: VerificationResult): VerificationHistoryItem {
    const current = this.getHistory();
    let statusText: 'Matched' | 'Unmatched' | 'Incomplete' | 'Expired' = 'Matched';
    if (result.status === 'EXPIRED') statusText = 'Expired';
    else if (result.status === 'NOT_FOUND') statusText = 'Unmatched';
    else if (result.status === 'NO_CODE_DETECTED') statusText = 'Incomplete';

    const newItem: VerificationHistoryItem = {
      id: `hist-${Date.now()}`,
      medicineName: result.medicine?.name || result.submittedInfo?.medicineName || 'Scanned Product',
      batchNumber: result.medicine?.batchNumber || result.submittedInfo?.batchNumber || 'N/A',
      dateChecked: result.timestamp,
      status: statusText,
      productCode: result.detectedCode || result.medicine?.productCode || 'N/A',
      medicineId: result.medicine?.id,
      result
    };

    const updated = [newItem, ...current];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));

    // Update scan counter for user
    const user = this.getUser();
    if (user) {
      this.setUser({ ...user, totalScans: user.totalScans + 1 });
    }

    return newItem;
  },

  clearHistory(): void {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify([]));
  },

  // --- SUSPICIOUS REPORTS ---
  getReports(): MedicineReport[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
      return INITIAL_REPORTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_REPORTS;
    }
  },

  addReport(reportData: Omit<MedicineReport, 'id' | 'submissionDate' | 'status' | 'timeline'>): MedicineReport {
    const current = this.getReports();
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newReport: MedicineReport = {
      ...reportData,
      id: `RPT-2026-${randomId}`,
      submissionDate: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Submitted',
      timeline: [
        {
          date: new Date().toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          title: 'Report Submitted',
          note: 'Demonstration report logged and queued for simulated verification review.',
          status: 'Submitted'
        }
      ]
    };

    const updated = [newReport, ...current];
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(updated));

    // Update report count in user profile
    const user = this.getUser();
    if (user) {
      this.setUser({ ...user, totalReports: user.totalReports + 1 });
    }

    // Add automated notification
    this.addNotification({
      title: `Report Submitted (${newReport.id})`,
      description: `Your suspicious report for ${newReport.medicineName} has been recorded.`,
      type: 'report',
      link: `/app/reports/${newReport.id}`
    });

    return newReport;
  },

  getReportById(id: string): MedicineReport | undefined {
    return this.getReports().find((r) => r.id === id);
  },

  // --- NOTIFICATIONS ---
  getNotifications(): NotificationItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  markAllNotificationsRead(): NotificationItem[] {
    const current = this.getNotifications();
    const updated = current.map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  },

  markNotificationRead(id: string): NotificationItem[] {
    const current = this.getNotifications();
    const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
    return updated;
  },

  addNotification(item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>): void {
    const current = this.getNotifications();
    const newItem: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify([newItem, ...current]));
  }
};
