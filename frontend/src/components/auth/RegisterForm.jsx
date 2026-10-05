import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Gift } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthTabs from './AuthTabs';
import PhoneInput from './PhoneInput';
import PasswordInput from './PasswordInput';
import Input from '../common/Input';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Alert from '../common/Alert';
import {
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
} from '../../utils/validation';

const RegisterForm = ({ openLegalModal }) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [method, setMethod] = useState('phone'); // 'phone' | 'email'
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [consent, setConsent] = useState(false);

  // Status State
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (field, setter) => (val) => {
    setter(val);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (serverError) setServerError('');
  };

  const handleTabChange = (newTab) => {
    setMethod(newTab);
    setErrors({});
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const newErrors = {};

    if (method === 'phone') {
      const phoneErr = validatePhone(phone, countryCode);
      if (phoneErr) newErrors.phone = phoneErr;
    } else {
      const emailErr = validateEmail(email);
      if (emailErr) newErrors.email = emailErr;
    }

    const pwdErr = validatePassword(password);
    if (pwdErr) newErrors.password = pwdErr;

    const confirmErr = validateConfirmPassword(password, confirmPassword);
    if (confirmErr) newErrors.confirm_password = confirmErr;

    if (!consent) {
      newErrors.consent = 'You must agree to the Privacy Policy and Terms & Conditions to proceed.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        method,
        password,
        confirm_password: confirmPassword,
        invite_code: inviteCode.trim(),
        consent: true,
        ...(method === 'phone' ? { country_code: countryCode, phone } : { email }),
      };

      // Calls register API -> sets session cookie -> updates AuthContext
      const res = await register(payload);

      // AUTOMATIC LOGIN AFTER REGISTRATION -> Redirect directly to /dashboard
      if (res && res.authenticated) {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setErrors(err.errors);
      }
      setServerError(err.message || 'Registration failed. Please check your information and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
      {serverError && (
        <Alert
          type="error"
          message={serverError}
          onClose={() => setServerError('')}
        />
      )}

      {/* Phone / Email Selector Tabs */}
      <AuthTabs activeTab={method} onChange={handleTabChange} />

      {/* Dynamic Method Input */}
      {method === 'phone' ? (
        <PhoneInput
          id="register-phone"
          label="Phone Number"
          countryCode={countryCode}
          onCountryCodeChange={(code) => setCountryCode(code)}
          phone={phone}
          onPhoneChange={handleFieldChange('phone', setPhone)}
          error={errors.phone}
          disabled={loading}
          required
        />
      ) : (
        <Input
          id="register-email"
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleFieldChange('email', setEmail)(e.target.value)}
          placeholder="name@example.com"
          autoComplete="email"
          icon={Mail}
          error={errors.email}
          disabled={loading}
          required
        />
      )}

      {/* Password Input */}
      <PasswordInput
        id="register-password"
        name="password"
        label="Create Password"
        value={password}
        onChange={(e) => handleFieldChange('password', setPassword)(e.target.value)}
        placeholder="At least 8 characters"
        autoComplete="new-password"
        error={errors.password}
        disabled={loading}
        required
      />

      {/* Confirm Password Input */}
      <PasswordInput
        id="register-confirm-password"
        name="confirm_password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => handleFieldChange('confirm_password', setConfirmPassword)(e.target.value)}
        placeholder="Re-enter your password"
        autoComplete="new-password"
        error={errors.confirm_password}
        disabled={loading}
        required
      />

      {/* Invite Code (Optional) */}
      <Input
        id="register-invite-code"
        label="Invite Code (Optional)"
        name="invite_code"
        value={inviteCode}
        onChange={(e) => handleFieldChange('invite_code', setInviteCode)(e.target.value.toUpperCase())}
        placeholder="Enter referral / invite code"
        icon={Gift}
        error={errors.invite_code}
        disabled={loading}
      />

      {/* Terms & Privacy Consent Checkbox */}
      <div className="pt-1">
        <Checkbox
          id="register-consent"
          name="consent"
          checked={consent}
          onChange={(val) => handleFieldChange('consent', setConsent)(val)}
          disabled={loading}
          error={errors.consent}
          label={
            <span>
              I have read and agree to the{' '}
              <button
                type="button"
                onClick={() => openLegalModal && openLegalModal('privacy')}
                className="text-amber-400 font-semibold hover:text-amber-300 hover:underline cursor-pointer"
              >
                Privacy Policy
              </button>{' '}
              and{' '}
              <button
                type="button"
                onClick={() => openLegalModal && openLegalModal('terms')}
                className="text-amber-400 font-semibold hover:text-amber-300 hover:underline cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              .
            </span>
          }
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        loadingText="Creating account..."
        disabled={loading}
        fullWidth
        className="mt-2"
      >
        Create Account
      </Button>

      {/* Login Redirect Link */}
      <div className="text-center pt-2 text-sm text-[#94A3B8]">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors"
        >
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
