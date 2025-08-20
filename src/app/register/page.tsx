'use client';

import { Header, Footer } from '../../components';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaUserPlus } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('رمزهای عبور مطابقت ندارند');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(formData.email, formData.password);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess('حساب کاربری با موفقیت ایجاد شد! لطفاً ایمیل خود را برای تایید بررسی کنید.');
        setFormData({ email: '', password: '', confirmPassword: '' });
      }
    } catch (err) {
      setError('خطا در ثبت نام. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let result;
      if (provider === 'google') {
        result = await signInWithGoogle();
      }

      if (result?.error) {
        setError(result.error.message);
      }
    } catch (err) {
      setError('خطا در ثبت نام با شبکه اجتماعی. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-background">
      <Header />
      
      {/* Register Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
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
                onClick={() => handleSocialLogin('google')}
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
              

            </div>

            {/* Divider */}
            <div className="mb-8 flex items-center">
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="px-4 text-gray-500 text-sm">یا ثبت نام با ایمیل</span>
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Error/Success Display */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-6">
                <p className="text-red-600 text-sm text-center">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 mb-6">
                <p className="text-green-600 text-sm text-center">{success}</p>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
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

              {/* Password Input */}
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
                    placeholder="حداقل ۶ کاراکتر"
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
              </div>

              {/* Confirm Password Input */}
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
                    placeholder="تکرار رمز عبور"
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
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-[#279EFD] bg-white/20 border-white/30 rounded focus:ring-[#279EFD] focus:ring-2 mt-1"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600 mr-2">
                  با <Link href="/terms" className="text-[#279EFD] hover:text-[#1565C0]">قوانین و شرایط</Link> لایکینو موافقم
                </label>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#279EFD] to-[#1565C0] text-white py-4 rounded-2xl font-bold hover:from-[#1E88E5] hover:to-[#0D47A1] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    در حال ثبت نام...
                  </>
                ) : (
                  <>
                    <FaUserPlus className="ml-2" />
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