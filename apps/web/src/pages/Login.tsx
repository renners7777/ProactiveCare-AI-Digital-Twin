import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const navigate = useNavigate();
  const { signIn, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    try {
      setError('');
      setLoading(true);
      await resetPassword(email);
      setSuccess('Password reset instructions have been sent to your email.');
      setIsResettingPassword(false);
    } catch (err: any) {
      if (err.message?.includes('rate limit')) {
        setError('Please wait a few seconds before requesting another password reset.');
      } else {
        setError('Failed to send password reset email. Please try again later.');
      }
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <LogIn className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
            {isResettingPassword ? 'Reset Password' : 'Sign in to ProactiveCare'}
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            {isResettingPassword 
              ? 'Enter your email to receive password reset instructions' 
              : 'Access your patient monitoring dashboard'}
          </p>
        </div>

        {error && (
          <div className="flex items-center p-4 text-sm text-danger-800 bg-danger-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-danger-500 mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center p-4 text-sm text-success-800 bg-success-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-success-500 mr-2" />
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={isResettingPassword ? handlePasswordReset : handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>

            {!isResettingPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            )}
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {loading 
                ? (isResettingPassword ? 'Sending...' : 'Signing in...') 
                : (isResettingPassword ? 'Send Reset Instructions' : 'Sign in')}
            </Button>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <button
              type="button"
              onClick={() => {
                setIsResettingPassword(!isResettingPassword);
                setError('');
                setSuccess('');
              }}
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              {isResettingPassword 
                ? 'Back to Sign In' 
                : 'Forgot your password?'}
            </button>
            
            {!isResettingPassword && (
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-sm text-primary-600 hover:text-primary-500"
              >
                Don't have an account? Register here
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;