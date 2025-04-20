import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { auth } from '../services/firebase';
import { useAuthStore } from '../store';

interface AuthFormProps {
  isLogin?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    
    try {
      let user;
      
      if (isLogin) {
        user = await auth.signIn(email, password);
      } else {
        user = await auth.signUp(email, password);
      }
      
      setUser(user);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-semibold text-primary-800">EcoTrade</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-neutral-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={isLogin ? "/signup" : "/login"} 
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full py-3"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  <span>{isLogin ? 'Sign in' : 'Create account'}</span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">Or {isLogin ? 'sign in' : 'sign up'} with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="btn flex justify-center py-2 px-4 border border-neutral-300 shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                Facebook
              </button>
              
              <button
                type="button"
                className="btn flex justify-center py-2 px-4 border border-neutral-300 shadow-sm bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_1_53)">
                    <path d="M12 0C5.372 0 0 5.373 0 12C0 18.627 5.372 24 12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0Z" fill="white"/>
                    <path d="M12.142 5.99999C14.012 5.99999 14.986 6.96799 15.402 7.39999C15.818 7.83199 16.666 7.69599 16.666 7.69599L18.328 5.99999C18.328 5.99999 17.006 4.51199 14.664 4.29599C12.322 4.07999 10.328 5.37599 9.34805 6.79999C8.36805 8.22399 8.15605 10.632 8.15605 11.364C8.15605 12.096 8.30005 14.46 9.90005 16.2C11.5 17.94 13.662 18 14.538 18C15.414 18 17.594 17.712 18.768 15.972C19.942 14.232 19.87 12.756 19.87 12C19.87 11.244 19.906 9.64798 18.464 8.39998C17.022 7.15198 15.306 6.96799 14.61 6.99999C13.914 7.03199 12.938 7.19999 12.142 7.79999V11.4H10.126V5.99999H12.142Z" fill="#EA4335"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1_53">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                Google
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-xs text-center text-neutral-500">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
  return <AuthForm isLogin={true} />;
};

export const SignupPage: React.FC = () => {
  return <AuthForm isLogin={false} />;
};