'use client';

import { Header, Footer } from '../../components';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('لطفاً قوانین و شرایط را بپذیرید');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('رمز عبور و تکرار آن یکسان نیستند');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'خطا در ثبت نام');
        return;
      }

      // Redirect to login page
      window.location.href = '/login?registered=true';
    } catch (error) {
      console.error('Register error:', error);
      alert('خطا در ثبت نام. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = async (provider: string) => {
    if (provider === 'google') {
      window.location.href = '/api/auth/signin/google';
    }
  };

  const isPasswordValid = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return { minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar };
  };

  const passwordValidation = isPasswordValid(formData.password);

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Register Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-2xl">
          {/* Register Card */}
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-primary-text mb-2 text-3xl font-bold">ثبت نام</h1>
              <p className="text-gray-600">حساب کاربری جدید در لایکینو ایجاد کنید</p>
            </div>

            {/* Social Register */}
            <div className="mb-8 space-y-4">
              <button
                onClick={() => handleSocialRegister('google')}
                className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white py-4 font-bold text-gray-800 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl"
              >
                <svg className="ml-3 h-6 w-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                ثبت نام با گوگل
              </button>
            </div>

            {/* Divider */}
            <div className="mb-8 flex items-center">
              <div className="h-px flex-1 bg-white/20"></div>
              <span className="px-4 text-sm text-gray-500">یا ثبت نام با ایمیل</span>
              <div className="h-px flex-1 bg-white/20"></div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="group">
                  <label
                    htmlFor="firstName"
                    className="text-primary-text mb-3 block text-sm font-bold"
                  >
                    نام
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="نام خود را وارد کنید"
                    className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 px-6 py-4 text-lg placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none"
                    required
                  />
                </div>

                <div className="group">
                  <label
                    htmlFor="lastName"
                    className="text-primary-text mb-3 block text-sm font-bold"
                  >
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="نام خانوادگی خود را وارد کنید"
                    className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 px-6 py-4 text-lg placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="text-primary-text mb-3 block text-sm font-bold">
                  ایمیل
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaEnvelope className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#279EFD]" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 py-4 pr-6 pl-12 text-lg placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="password"
                  className="text-primary-text mb-3 block text-sm font-bold"
                >
                  رمز عبور
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaLock className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#279EFD]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 py-4 pr-14 pl-12 text-lg placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors duration-300 hover:text-[#279EFD]"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Validation */}
                {formData.password && (
                  <div className="mt-3 rounded-2xl bg-white/5 p-4">
                    <h4 className="text-primary-text mb-2 text-sm font-bold">شرایط رمز عبور:</h4>
                    <div className="space-y-2">
                      <div
                        className={`flex items-center gap-2 text-sm ${passwordValidation.minLength ? 'text-green-500' : 'text-gray-500'}`}
                      >
                        {passwordValidation.minLength ? <FaCheck /> : <FaTimes />}
                        حداقل ۸ کاراکتر
                      </div>
                      <div
                        className={`flex items-center gap-2 text-sm ${passwordValidation.hasUpperCase ? 'text-green-500' : 'text-gray-500'}`}
                      >
                        {passwordValidation.hasUpperCase ? <FaCheck /> : <FaTimes />}
                        حرف بزرگ
                      </div>
                      <div
                        className={`flex items-center gap-2 text-sm ${passwordValidation.hasLowerCase ? 'text-green-500' : 'text-gray-500'}`}
                      >
                        {passwordValidation.hasLowerCase ? <FaCheck /> : <FaTimes />}
                        حرف کوچک
                      </div>
                      <div
                        className={`flex items-center gap-2 text-sm ${passwordValidation.hasNumbers ? 'text-green-500' : 'text-gray-500'}`}
                      >
                        {passwordValidation.hasNumbers ? <FaCheck /> : <FaTimes />}
                        عدد
                      </div>
                      <div
                        className={`flex items-center gap-2 text-sm ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}
                      >
                        {passwordValidation.hasSpecialChar ? <FaCheck /> : <FaTimes />}
                        کاراکتر خاص
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label
                  htmlFor="confirmPassword"
                  className="text-primary-text mb-3 block text-sm font-bold"
                >
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaLock className="h-5 w-5 text-gray-400 transition-colors duration-300 group-focus-within:text-[#279EFD]" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="رمز عبور خود را تکرار کنید"
                    className="text-primary-text w-full rounded-2xl border-2 border-white/40 bg-white/30 py-4 pr-14 pl-12 text-lg placeholder-gray-500 backdrop-blur-xl transition-all duration-300 focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 transition-colors duration-300 hover:text-[#279EFD]"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password Match Validation */}
                {formData.confirmPassword && (
                  <div
                    className={`mt-2 text-sm ${formData.password === formData.confirmPassword ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {formData.password === formData.confirmPassword ? (
                      <div className="flex items-center gap-2">
                        <FaCheck />
                        رمز عبور مطابقت دارد
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <FaTimes />
                        رمز عبور مطابقت ندارد
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/30 bg-white/20 text-[#279EFD] focus:ring-2 focus:ring-[#279EFD]"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  <span>قوانین و شرایط </span>
                  <Link href="/terms" className="text-[#279EFD] underline hover:text-[#1565C0]">
                    لایکینو
                  </Link>
                  <span> را می‌پذیرم</span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading || !agreedToTerms}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-4 font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    در حال ثبت نام...
                  </>
                ) : (
                  <>
                    <FaUser className="ml-2" />
                    ثبت نام
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 border-t border-white/20 pt-8 text-center">
              <p className="text-gray-600">
                قبلاً حساب کاربری دارید؟{' '}
                <Link
                  href="/login"
                  className="font-bold text-[#279EFD] transition-colors duration-300 hover:text-[#1565C0]"
                >
                  وارد شوید
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
