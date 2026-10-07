import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthTabs from '../components/auth/AuthTabs';
import PhoneInput from '../components/auth/PhoneInput';
import PasswordInput from '../components/auth/PasswordInput';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import authService from '../services/authService';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validation';
import { EXTERNAL_LINKS } from '../utils/constants';

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlToken = searchParams.get('token') || '';

  useEffect(() => {
    document.title = 'MaanWin51 — Forgot Password';
  }, []);

  // Mode: 'request' or 'reset'
  const [mode, setMode] = useState(urlToken ? 'reset' : 'request');
  const [activeToken, setActiveToken] = useState(urlToken);

  // Request state
  const [method, setMethod] = useState('phone');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [successInfo, setSuccessInfo] = useState('');
  const [devToken, setDevToken] = useState('');

  // Reset state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Common status
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    const newErrors = {};
    if (method === 'phone') {
      const err = validatePhone(phone, countryCode);
      if (err) newErrors.phone = err;
    } else {
      const err = validateEmail(email);
      if (err) newErrors.email = err;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        method,
        ...(method === 'phone' ? { country_code: countryCode, phone } : { email }),
      };

      const res = await authService.forgotPassword(payload);
      setRequestSubmitted(true);
      setSuccessInfo(res.message || 'If an account exists with those details, reset instructions have been dispatched.');

      if (res.dev_reset_token) {
        setDevToken(res.dev_reset_token);
      }
    } catch (err) {
      setServerError(err.message || 'Failed to submit reset request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setErrors({});

    const newErrors = {};
    const pwdErr = validatePassword(newPassword);
    if (pwdErr) newErrors.password = pwdErr;

    const confErr = validateConfirmPassword(newPassword, confirmPassword);
    if (confErr) newErrors.confirm_password = confErr;

    if (!activeToken) {
      newErrors.token = 'Reset token is missing.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword({
        token: activeToken,
        password: newPassword,
        confirm_password: confirmPassword,
      });

      setResetSuccess(true);
    } catch (err) {
      setServerError(err.message || 'Unable to reset password. The link may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={mode === 'reset' ? 'Set New Password' : 'Forgot Password?'}
      subtitle={
        mode === 'reset'
          ? 'Enter and confirm your new secure password below.'
          : 'Enter your registered phone number or email to receive reset instructions.'
      }
      showBack
      backTo="/login"
      backLabel="Back to Login"
    >
      {serverError && (
        <Alert
          type="error"
          message={serverError}
          onClose={() => setServerError('')}
          className="mb-5"
        />
      )}

      {/* Mode 1: Request Password Reset */}
      {mode === 'request' && (
        <>
          {requestSubmitted ? (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Request Dispatched</h3>
                <p className="text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
                  {successInfo}
                </p>
              </div>

              {devToken && (
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-left text-xs text-amber-300 space-y-2">
                  <span className="font-bold">Development Mode Active:</span>
                  <p>Reset token generated for testing:</p>
                  <code className="block bg-[#0A0D15] p-2 rounded border border-amber-500/40 font-mono break-all text-[11px] text-amber-200">
                    {devToken}
                  </code>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setActiveToken(devToken);
                      setMode('reset');
                    }}
                  >
                    Proceed with this Test Token
                  </Button>
                </div>
              )}

              <a
                href={EXTERNAL_LINKS.LOGIN}
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 hover:underline"
              >
                Return to Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleRequestSubmit} noValidate className="space-y-5">
              <AuthTabs activeTab={method} onChange={(t) => { setMethod(t); setErrors({}); }} />

              {method === 'phone' ? (
                <PhoneInput
                  id="forgot-phone"
                  label="Registered Phone Number"
                  countryCode={countryCode}
                  onCountryCodeChange={setCountryCode}
                  phone={phone}
                  onPhoneChange={(p) => { setPhone(p); setErrors({}); }}
                  error={errors.phone}
                  disabled={loading}
                  required
                />
              ) : (
                <Input
                  id="forgot-email"
                  label="Registered Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                  placeholder="name@example.com"
                  icon={Mail}
                  error={errors.email}
                  disabled={loading}
                  required
                />
              )}

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                loadingText="Sending instructions..."
                fullWidth
              >
                Continue
              </Button>

              <div className="text-center pt-2">
                <a
                  href={EXTERNAL_LINKS.LOGIN}
                  className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white hover:underline"
                >
                  Remembered your password? Log in
                </a>
              </div>
            </form>
          )}
        </>
      )}

      {/* Mode 2: Reset with Token */}
      {mode === 'reset' && (
        <>
          {resetSuccess ? (
            <div className="space-y-5 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/40 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Password Updated!</h3>
                <p className="text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
                  Your MaanWin51 account password has been updated securely. You may now sign in with your new credentials.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                fullWidth
                onClick={() => { window.location.href = EXTERNAL_LINKS.LOGIN; }}
              >
                Go to Log In
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetSubmit} noValidate className="space-y-4 sm:space-y-5">
              <PasswordInput
                id="new-password"
                name="new_password"
                label="New Password"
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setErrors({}); }}
                placeholder="At least 8 characters"
                error={errors.password}
                disabled={loading}
                required
              />

              <PasswordInput
                id="confirm-new-password"
                name="confirm_new_password"
                label="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setErrors({}); }}
                placeholder="Re-enter your new password"
                error={errors.confirm_password}
                disabled={loading}
                required
              />

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                loadingText="Updating password..."
                fullWidth
              >
                Update Password
              </Button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('request'); setActiveToken(''); }}
                  className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-white cursor-pointer"
                >
                  Request a new reset link
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
