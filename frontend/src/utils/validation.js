/**
 * MaanWin51 - Frontend Validation Utilities
 */

export const normalizePhone = (phone) => {
  if (!phone) return '';
  return String(phone).replace(/\D/g, '');
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return 'Email address is required.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address.';
  }
  return '';
};

export const validatePhone = (phone, countryCode = '+91') => {
  const digits = normalizePhone(phone);
  if (!digits) {
    return 'Phone number is required.';
  }

  if (countryCode === '+91') {
    if (digits.length !== 10) {
      return 'Indian phone number must be exactly 10 digits.';
    }
    if (!/^[6-9]\d{9}$/.test(digits)) {
      return 'Please enter a valid Indian mobile number.';
    }
  } else {
    if (digits.length < 7 || digits.length > 15) {
      return 'Phone number must be between 7 and 15 digits.';
    }
  }

  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required.';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  return '';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password.';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  return '';
};
