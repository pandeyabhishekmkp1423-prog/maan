import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthTabs from './AuthTabs';
import PhoneInput from './PhoneInput';
import PasswordInput from './PasswordInput';
import Input from '../common/Input';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Alert from '../common/Alert';
import { validateEmail, validatePhone } from '../../utils/validation';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Form State
  const [method, setMethod] = useState('phone'); // 'phone' | 'email'
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Status State
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear specific field error on typing
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

    if (!password) {
      newErrors.password = 'Please enter your password.';
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
        remember,
        ...(method === 'phone' ? { country_code: countryCode, phone } : { email }),
      };

      const res = await login(payload);

      if (res && res.authenticated) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setErrors(err.errors);
      }
      setServerError(err.message || 'Invalid credentials. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
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
          id="login-phone"
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
          id="login-email"
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
        id="login-password"
        name="password"
        label="Password"
        value={password}
        onChange={(e) => handleFieldChange('password', setPassword)(e.target.value)}
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password}
        disabled={loading}
        required
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-1">
        <Checkbox
          id="login-remember"
          name="remember"
          checked={remember}
          onChange={setRemember}
          label="Remember me"
          disabled={loading}
        />

        <Link
          to="/forgot-password"
          className="text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 hover:underline whitespace-nowrap transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="blue"
        loading={loading}
        loadingText="Logging in..."
        disabled={loading}
        fullWidth
        className="mt-2 text-base font-extrabold shadow-lg shadow-blue-600/30"
      >
        Log In
      </Button>

      {/* Registration Redirect Link */}
      <div className="text-center pt-3 text-sm text-[#94A3B8]">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="font-bold text-amber-400 hover:text-amber-300 hover:underline transition-colors"
        >
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
