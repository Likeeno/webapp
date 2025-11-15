'use client';

import { Header, Footer } from '../../components';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOAuth, setShowOAuth] = useState(true); // Set to false to hide OAuth buttons

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } catch {
      setError('خطا در ورود. لطفاً دوباره تلاش کنید.');
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
        // If OAuth is not enabled, hide the OAuth buttons
        if (result.error.message.includes('فعال نیست')) {
          setShowOAuth(false);
        }
      }
    } catch {
      setError('خطا در ورود با شبکه اجتماعی. لطفاً دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary-background min-h-screen">
      <Header />

      {/* Login Section */}
      <section className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-md">
          {/* Login Card */}
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-primary-text mb-2 text-3xl font-bold">ورود به حساب</h1>
              <p className="text-gray-600">به پنل کاربری لایکینو خوش آمدید</p>
            </div>

            {/* Social Login - Only show if OAuth is enabled */}
            {showOAuth && (
              <>
                <div className="mb-8 space-y-4">
                  <button
                    onClick={() => handleSocialLogin('google')}
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
                    ورود با گوگل
                  </button>
                </div>

                {/* Divider */}
                <div className="mb-8 flex items-center">
                  <div className="h-px flex-1 bg-white/20"></div>
                  <span className="px-4 text-sm text-gray-500">یا ورود با ایمیل</span>
                  <div className="h-px flex-1 bg-white/20"></div>
                </div>
              </>
            )}

            {/* Error Display */}
            {error && (
              <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/20 p-4">
                <p className="text-center text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
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

              {/* Password Input */}
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/30 bg-white/20 text-[#279EFD] focus:ring-2 focus:ring-[#279EFD]"
                  />
                  <span className="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#279EFD] transition-colors duration-300 hover:text-[#1565C0]"
                >
                  فراموشی رمز؟
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#279EFD] to-[#1565C0] py-4 font-bold text-white transition-all duration-300 hover:from-[#1E88E5] hover:to-[#0D47A1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="ml-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    در حال ورود...
                  </>
                ) : (
                  <>
                    <FaUser className="ml-2" />
                    ورود
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-8 border-t border-white/20 pt-8 text-center">
              <p className="text-gray-600">
                حساب کاربری ندارید؟{' '}
                <Link
                  href="/register"
                  className="font-bold text-[#279EFD] transition-colors duration-300 hover:text-[#1565C0]"
                >
                  ثبت نام کنید
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
