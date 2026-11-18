import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  QrCode,
  FileText,
  Edit2,
  CheckCircle2,
  Settings,
  Globe,
  Bell
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { history, reports } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    email: user?.email || 'aarav.sharma@example.com',
    phone: user?.phone || '+91 98765 43210',
    role: (user?.role || 'Consumer') as UserRole
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E4ECE7]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#172923]">User Profile</h2>
          <p className="text-xs sm:text-sm text-[#687871]">
            Manage your personal profile details, healthcare role, and account activity.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(true)}
          leftIcon={<Edit2 className="w-3.5 h-3.5" />}
        >
          Edit Profile
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-3 bg-[#F0F8F4] border border-[#D1EBDD] rounded-xl text-xs text-[#165C39] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#218653]" />
          <span>Profile changes saved successfully in your local browser session.</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#E4ECE7] shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-[#E4ECE7]">
          {/* Avatar Initial Circle */}
          <div className="w-16 h-16 rounded-2xl bg-[#167A55] text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'AS'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#172923]">{user?.name}</h3>
              <span className="text-xs font-semibold text-[#167A55] bg-[#EBF3EF] px-2.5 py-0.5 rounded">
                {user?.role}
              </span>
            </div>
            <p className="text-xs text-[#687871]">{user?.email}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#687871]">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] p-4 text-xs">
            <div>
              <span className="text-[#687871] block">Full Name:</span>
              <span className="font-semibold text-sm text-[#172923]">{user?.name}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Primary Email:</span>
              <span className="font-semibold text-sm text-[#172923]">{user?.email}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Mobile Number:</span>
              <span className="font-semibold text-sm text-[#172923]">{user?.phone}</span>
            </div>
            <div>
              <span className="text-[#687871] block">Healthcare Role:</span>
              <span className="font-semibold text-sm text-[#172923]">{user?.role}</span>
            </div>
          </div>
        </div>

        {/* Account Activity Summary */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#687871]">
            Platform Activity Summary
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#E4ECE7] bg-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#167A55]/10 text-[#167A55] flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#172923]">{history.length}</p>
                <p className="text-xs text-[#687871]">Total Verifications</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#E4ECE7] bg-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D64B4B]/10 text-[#D64B4B] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#172923]">{reports.length}</p>
                <p className="text-xs text-[#687871]">Suspicious Reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Preferences */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#687871]">
            Language & Region Preferences
          </h4>

          <div className="p-4 bg-[#F7FAF8] rounded-xl border border-[#E4ECE7] flex items-center justify-between text-xs text-[#172923]">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#167A55]" />
              <div>
                <p className="font-semibold">Interface Language</p>
                <p className="text-[11px] text-[#687871]">English (India) — Default</p>
              </div>
            </div>
            <span className="text-[11px] font-medium text-[#167A55]">Standard</span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Personal Information"
        description="Update your contact and profile details"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <Input
            label="Mobile Number"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#172923]">Healthcare Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
              className="w-full text-xs sm:text-sm bg-white border border-[#E4ECE7] rounded-lg p-2.5 text-[#172923] focus:border-[#167A55] focus:outline-none"
            >
              <option value="Consumer">Consumer</option>
              <option value="Caregiver">Caregiver</option>
              <option value="Other">Other Healthcare Interest</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#E4ECE7]">
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
