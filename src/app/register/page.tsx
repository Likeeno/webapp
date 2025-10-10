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
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    // شبیه‌سازی ثبت نام
    setTimeout(() => {
      setIsLoading(false);
      console.log('Register attempt:', formData);
    }, 2000);
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`Register with ${provider}`);
    // اینجا می‌توانید منطق ثبت نام با شبکه‌های اجتماعی را اضافه کنید
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
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Register Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Register Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary-text mb-2">ثبت نام</h1>
              <p className="text-gray-600">حساب کاربری جدید در لایکینو ایجاد کنید</p>
            </div>

            {/* Social Register */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => handleSocialRegister('google')}
                className="w-full bg-white text-gray-800 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl border border-gray-200"
              >
                <svg className="w-6 h-6 ml-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                ثبت نام با گوگل
              </button>
              
              <button
                onClick={() => handleSocialRegister('telegram')}
                className="w-full bg-[#0088cc] text-white py-4 rounded-2xl font-bold hover:bg-[#0077b3] transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6 ml-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                ثبت نام با تلگرام
              </button>
            </div>

            {/* Divider */}
            <div className="mb-8 flex items-center">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-gray-500 text-sm">یا ثبت نام با ایمیل</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label htmlFor="firstName" className="block text-sm font-bold text-primary-text mb-3">
                    نام
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="نام خود را وارد کنید"
                    className="w-full px-6 py-4 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-lg"
                    required
                  />
                </div>
                
                <div className="group">
                  <label htmlFor="lastName" className="block text-sm font-bold text-primary-text mb-3">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="نام خانوادگی خود را وارد کنید"
                    className="w-full px-6 py-4 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-lg"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-bold text-primary-text mb-3">
                  ایمیل
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-[#279EFD] transition-colors duration-300" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    className="w-full pl-12 pr-6 py-4 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-lg"
                    required
                  />
                </div>
              </div>



              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-bold text-primary-text mb-3">
                  رمز عبور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#279EFD] transition-colors duration-300" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="رمز عبور خود را وارد کنید"
                    className="w-full pl-12 pr-14 py-4 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#279EFD] transition-colors duration-300"
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password Validation */}
                {formData.password && (
                  <div className="mt-3 p-4 bg-white/5 rounded-2xl">
                    <h4 className="text-sm font-bold text-primary-text mb-2">شرایط رمز عبور:</h4>
                    <div className="space-y-2">
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.minLength ? 'text-green-500' : 'text-gray-500'}`}>
                        {passwordValidation.minLength ? <FaCheck /> : <FaTimes />}
                        حداقل ۸ کاراکتر
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.hasUpperCase ? 'text-green-500' : 'text-gray-500'}`}>
                        {passwordValidation.hasUpperCase ? <FaCheck /> : <FaTimes />}
                        حرف بزرگ
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.hasLowerCase ? 'text-green-500' : 'text-gray-500'}`}>
                        {passwordValidation.hasLowerCase ? <FaCheck /> : <FaTimes />}
                        حرف کوچک
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.hasNumbers ? 'text-green-500' : 'text-gray-500'}`}>
                        {passwordValidation.hasNumbers ? <FaCheck /> : <FaTimes />}
                        عدد
                      </div>
                      <div className={`flex items-center gap-2 text-sm ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
                        {passwordValidation.hasSpecialChar ? <FaCheck /> : <FaTimes />}
                        کاراکتر خاص
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="group">
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-primary-text mb-3">
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-[#279EFD] transition-colors duration-300" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="رمز عبور خود را تکرار کنید"
                    className="w-full pl-12 pr-14 py-4 bg-white/30 backdrop-blur-xl border-2 border-white/40 rounded-2xl text-primary-text placeholder-gray-500 focus:outline-none focus:border-[#279EFD] focus:bg-white/40 focus:shadow-lg focus:shadow-[#279EFD]/20 transition-all duration-300 text-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#279EFD] transition-colors duration-300"
                  >
                    {showConfirmPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password Match Validation */}
                {formData.confirmPassword && (
                  <div className={`mt-2 text-sm ${formData.password === formData.confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
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
                  className="w-5 h-5 text-[#279EFD] bg-white/20 border-white/30 rounded focus:ring-[#279EFD] focus:ring-2 mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  <span>قوانین و شرایط </span>
                  <Link 
                    href="/terms"
                    className="text-[#279EFD] hover:text-[#1565C0] underline"
                  >
                    لایکینو
                  </Link>
                  <span> را می‌پذیرم</span>
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading || !agreedToTerms}
                className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-4 rounded-2xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
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
            <div className="text-center mt-8 pt-8 border-t border-white/20">
              <p className="text-gray-600">
                قبلاً حساب کاربری دارید؟{' '}
                <Link 
                  href="/login"
                  className="text-[#279EFD] hover:text-[#1565C0] font-bold transition-colors duration-300"
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