import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'MaanWin51 — Create Account';
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Register using your phone number or email."
      showBack
      backTo="/login"
      backLabel="Back to Login"
    >
      {({ openLegalModal }) => <RegisterForm openLegalModal={openLegalModal} />}
    </AuthLayout>
  );
};

export default Register;
