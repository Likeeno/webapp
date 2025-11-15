'use client';

import { useState } from 'react';
import {
  FaEdit,
  FaTimes,
  FaSave,
  FaLock,
  FaSignOutAlt,
  FaSpinner,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';

interface DashboardSettingsProps {
  userName: string;
  onProfileUpdate: (name: string) => Promise<void>;
  onPasswordChange: (password: string) => Promise<void>;
  onLogout: () => void;
}

export default function DashboardSettings({
  userName,
  onProfileUpdate,
  onPasswordChange,
  onLogout,
}: DashboardSettingsProps) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [settingsError, setSettingsError] = useState<string | null>(null);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOpenEditProfile = () => {
    setEditName(userName);
    setIsEditProfileOpen(true);
    setSettingsError(null);
    setSettingsSuccess(null);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setSettingsError('لطفاً نام خود را وارد کنید');
      return;
    }

    try {
      setSettingsLoading(true);
      setSettingsError(null);
      await onProfileUpdate(editName.trim());
      setSettingsSuccess('اطلاعات شما با موفقیت به‌روزرسانی شد');
      setIsEditProfileOpen(false);
      setTimeout(() => setSettingsSuccess(null), 3000);
    } catch (err) {
      console.error('Update profile error:', err);
      setSettingsError('خطا در به‌روزرسانی اطلاعات');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleOpenChangePassword = () => {
    setNewPassword('');
    setConfirmNewPassword('');
    setIsChangePasswordOpen(true);
    setSettingsError(null);
    setSettingsSuccess(null);
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      setSettingsError('رمز عبور جدید باید حداقل ۸ کاراکتر باشد');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSettingsError('رمز عبور جدید و تکرار آن یکسان نیستند');
      return;
    }

    try {
      setSettingsLoading(true);
      setSettingsError(null);
      await onPasswordChange(newPassword);
      setSettingsSuccess('رمز عبور با موفقیت تغییر کرد');
      setIsChangePasswordOpen(false);
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setSettingsSuccess(null), 3000);
    } catch (err) {
      console.error('Change password error:', err);
      setSettingsError('خطا در تغییر رمز عبور');
    } finally {
      setSettingsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {settingsSuccess && (
        <div className="rounded-2xl border border-green-500/30 bg-green-500/20 p-4">
          <p className="text-center font-bold text-green-600">{settingsSuccess}</p>
        </div>
      )}
      {settingsError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/20 p-4">
          <p className="text-center text-red-600">{settingsError}</p>
        </div>
      )}

      <div className="rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
        <h2 className="text-primary-text mb-6 text-xl font-bold">تنظیمات حساب</h2>
        <div className="space-y-4">
          {/* Edit Profile Section */}
          {!isEditProfileOpen ? (
            <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/30">
              <div>
                <h3 className="text-primary-text font-bold">ویرایش اطلاعات کاربری</h3>
                <p className="text-sm text-gray-700">نام و اطلاعات شخصی</p>
              </div>
              <button
                onClick={handleOpenEditProfile}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-4 py-2 text-white shadow-lg transition-colors duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
              >
                <FaEdit />
                ویرایش
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-primary-text font-bold">ویرایش نام</h3>
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  className="hover:text-primary-text text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="نام خود را وارد کنید"
                disabled={settingsLoading}
                className="text-primary-text mb-4 w-full rounded-2xl border-2 border-white/40 bg-white/30 px-4 py-3 placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none disabled:opacity-50"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  disabled={settingsLoading}
                  className="text-primary-text flex-1 rounded-xl border border-white/30 bg-white/20 px-4 py-2 font-bold transition-all duration-300 hover:bg-white/30 disabled:opacity-50"
                >
                  انصراف
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={settingsLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-4 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] disabled:opacity-50"
                >
                  {settingsLoading ? <FaSpinner className="animate-spin" /> : <FaSave />}
                  ذخیره
                </button>
              </div>
            </div>
          )}

          {/* Change Password Section */}
          {!isChangePasswordOpen ? (
            <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/30">
              <div>
                <h3 className="text-primary-text font-bold">تغییر رمز عبور</h3>
                <p className="text-sm text-gray-700">به‌روزرسانی رمز عبور حساب</p>
              </div>
              <button
                onClick={handleOpenChangePassword}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-4 py-2 text-white shadow-lg transition-colors duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1]"
              >
                <FaEdit />
                تغییر
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-primary-text font-bold">تغییر رمز عبور</h3>
                <button
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="hover:text-primary-text text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mb-4">
                <label className="text-primary-text mb-2 block text-sm font-bold">
                  رمز عبور جدید
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="رمز عبور جدید"
                    disabled={settingsLoading}
                    className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 px-4 py-3 pl-12 placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400 hover:text-[#279EFD]"
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-primary-text mb-2 block text-sm font-bold">
                  تکرار رمز عبور جدید
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="تکرار رمز عبور جدید"
                    disabled={settingsLoading}
                    className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 px-4 py-3 pl-12 placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400 hover:text-[#279EFD]"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsChangePasswordOpen(false)}
                  disabled={settingsLoading}
                  className="text-primary-text flex-1 rounded-xl border border-white/30 bg-white/20 px-4 py-2 font-bold transition-all duration-300 hover:bg-white/30 disabled:opacity-50"
                >
                  انصراف
                </button>
                <button
                  onClick={handleChangePassword}
                  disabled={settingsLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] px-4 py-2 font-bold text-white shadow-lg transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] disabled:opacity-50"
                >
                  {settingsLoading ? <FaSpinner className="animate-spin" /> : <FaLock />}
                  تغییر رمز عبور
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/20 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/30">
            <div>
              <h3 className="text-primary-text font-bold">خروج از حساب</h3>
              <p className="text-sm text-gray-700">خروج امن از حساب کاربری</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white shadow-lg transition-colors duration-300 hover:bg-red-600"
            >
              <FaSignOutAlt />
              خروج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
