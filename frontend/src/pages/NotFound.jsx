import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import AuthHeader from '../components/auth/AuthHeader';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <AuthHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#FFF5F5] text-[#E53935] flex items-center justify-center font-extrabold text-2xl mb-4 border border-[#FEE2E2]">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-[#111827]">Page Not Found</h1>
        <p className="mt-2 text-sm text-[#6B7280] max-w-sm">
          The requested page does not exist or has been moved within MaanWin51.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E53935] hover:bg-[#C62828] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#111827] text-sm font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
