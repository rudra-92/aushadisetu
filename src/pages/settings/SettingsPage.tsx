import React, { useState } from 'react';
import {
  User,
  Bell,
  Lock,
  Shield,
  Eye,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'accessibility'>('account');

  // Account form
  const [accountForm, setAccountForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: ''
  });
  const [accountSuccess, setAccountSuccess] = useState(false);

  // Notification toggles
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    verificationUpdates: true,
    reportUpdates: true,
    safetyArticles: true
  });

  // Accessibility settings
  const [accessibility, setAccessibility] = useState({
    fontSize: 'standard',
    reducedMotion: false,
    language: 'English'
  });

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: accountForm.name,
      email: accountForm.email,
      phone: accountForm.phone
    });
    setAccountSuccess(true);
    setTimeout(() => setAccountSuccess(false), 2500);
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    logout();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#E4ECE7]">
        <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">Account & System Settings</h2>
        <p className="text-xs sm:text-sm text-[#687871]">
          Manage security preferences, communication channels, privacy limits, and display accessibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-4 space-y-1">
          {[
            { id: 'account', label: 'Account & Security', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy & Data', icon: Shield },
            { id: 'accessibility', label: 'Accessibility', icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#167A55] text-white shadow-xs'
                      : 'bg-white border border-[#E4ECE7] text-[#687871] hover:text-[#172923] hover:bg-[#F2F6F4]'
                  }
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-8">
          {/* TAB 1: ACCOUNT SETTINGS */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-2xl border border-[#E4ECE7] p-6 space-y-6 shadow-xs animate-in fade-in">
              <div className="border-b border-[#E4ECE7] pb-3">
                <h3 className="text-base font-bold text-[#172923]">Personal & Security Details</h3>
                <p className="text-xs text-[#687871]">
                  Update your contact email, phone number, and password credentials.
                </p>
              </div>

              {accountSuccess && (
                <div className="p-3 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-xs text-[#165C39] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#218653]" />
                  <span>Account details updated successfully.</span>
                </div>
              )}

              <form onSubmit={handleSaveAccount} className="space-y-4">
                <Input
                  label="Full Name"
                  required
                  value={accountForm.name}
                  onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                />

                <Input
                  type="email"
                  label="Email Address"
                  required
                  value={accountForm.email}
                  onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                />

                <Input
                  type="tel"
                  label="Mobile Number"
                  required
                  value={accountForm.phone}
                  onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
                />

                <div className="pt-3 border-t border-[#E4ECE7] space-y-3">
                  <h4 className="text-xs font-bold text-[#172923]">Change Password</h4>
                  <Input
                    type="password"
                    label="Current Password"
                    placeholder="Enter current password"
                    value={accountForm.currentPassword}
                    onChange={(e) =>
                      setAccountForm({ ...accountForm, currentPassword: e.target.value })
                    }
                  />
                  <Input
                    type="password"
                    label="New Password"
                    placeholder="Enter new strong password"
                    value={accountForm.newPassword}
                    onChange={(e) =>
                      setAccountForm({ ...accountForm, newPassword: e.target.value })
                    }
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="md">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: NOTIFICATION SETTINGS */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#E4ECE7] p-6 space-y-6 shadow-xs animate-in fade-in">
              <div className="border-b border-[#E4ECE7] pb-3">
                <h3 className="text-base font-bold text-[#172923]">Notification Preferences</h3>
                <p className="text-xs text-[#687871]">
                  Choose which alerts and communication channels you want to receive.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {[
                  {
                    key: 'emailAlerts' as const,
                    title: 'Email Notifications',
                    desc: 'Receive digest summaries of verified medicines and safety alerts.'
                  },
                  {
                    key: 'verificationUpdates' as const,
                    title: 'Verification Updates',
                    desc: 'Instant notifications when batch scan or OCR parsing finishes.'
                  },
                  {
                    key: 'reportUpdates' as const,
                    title: 'Suspicious Report Status Updates',
                    desc: 'Alerts when your filed packaging reports change investigation status.'
                  },
                  {
                    key: 'safetyArticles' as const,
                    title: 'Medicine Safety & Education Articles',
                    desc: 'Weekly practical guides on packaging inspection and consumer storage.'
                  }
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3.5 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl"
                  >
                    <div>
                      <p className="font-semibold text-sm text-[#172923]">{item.title}</p>
                      <p className="text-[11px] text-[#687871] mt-0.5">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifSettings[item.key]}
                        onChange={(e) =>
                          setNotifSettings({ ...notifSettings, [item.key]: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-[#E4ECE7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#CCD8D1] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#167A55]"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY & DATA */}
          {activeTab === 'privacy' && (
            <div className="bg-white rounded-2xl border border-[#E4ECE7] p-6 space-y-6 shadow-xs animate-in fade-in">
              <div className="border-b border-[#E4ECE7] pb-3">
                <h3 className="text-base font-bold text-[#172923]">Privacy & Data Governance</h3>
                <p className="text-xs text-[#687871]">
                  Learn how AushadhiSetu isolates health verification data and manage your session data.
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#687871]">
                <div className="p-4 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl space-y-1.5">
                  <h4 className="font-semibold text-sm text-[#172923]">Local Session Storage</h4>
                  <p className="leading-relaxed">
                    This prototype stores verified logs and submitted reports inside your browser's encrypted localStorage. No biometric camera data or personal prescription records are shared with third-party tracking networks.
                  </p>
                </div>

                <div className="p-4 bg-[#FDF3F3] border border-[#F8D2D2] rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-[#D64B4B] font-bold text-sm">
                    <Trash2 className="w-4 h-4" />
                    <span>Danger Zone: Delete Account</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#962626]">
                    Deleting your account will erase your verification history, filed reports, and profile credentials from this device.
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Delete Account & Purge Data
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ACCESSIBILITY */}
          {activeTab === 'accessibility' && (
            <div className="bg-white rounded-2xl border border-[#E4ECE7] p-6 space-y-6 shadow-xs animate-in fade-in">
              <div className="border-b border-[#E4ECE7] pb-3">
                <h3 className="text-base font-bold text-[#172923]">Display & Accessibility</h3>
                <p className="text-xs text-[#687871]">
                  Configure readability standards and reduced motion preferences.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-medium text-[#172923]">Font Scaling</label>
                  <select
                    value={accessibility.fontSize}
                    onChange={(e) =>
                      setAccessibility({ ...accessibility, fontSize: e.target.value })
                    }
                    className="w-full text-xs sm:text-sm bg-white border border-[#E4ECE7] rounded-lg p-2.5 text-[#172923] focus:border-[#167A55] focus:outline-none"
                  >
                    <option value="standard">Standard (Default Inter 14px/16px)</option>
                    <option value="large">Comfortable (18px for seniors & high legibility)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#F7FAF8] border border-[#E4ECE7] rounded-xl">
                  <div>
                    <p className="font-semibold text-sm text-[#172923]">Reduced Motion</p>
                    <p className="text-[11px] text-[#687871]">
                      Minimize interface transitions and radar animations.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accessibility.reducedMotion}
                      onChange={(e) =>
                        setAccessibility({ ...accessibility, reducedMotion: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#E4ECE7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#CCD8D1] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#167A55]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Account Deletion"
        description="Permanently purge profile and verification history"
      >
        <div className="space-y-4 text-xs text-[#687871]">
          <p>
            Are you sure you want to delete your account? All local audit history, verification checks, and submitted reports will be removed from your browser.
          </p>
          <div className="flex justify-end gap-2 pt-2 border-t border-[#E4ECE7]">
            <Button variant="ghost" size="sm" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
              Yes, Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
