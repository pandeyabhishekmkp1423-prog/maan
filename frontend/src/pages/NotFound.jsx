import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import AuthHeader from '../components/auth/AuthHeader';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#07090E] flex flex-col text-slate-100">
      <AuthHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-extrabold text-2xl mb-4 border border-amber-500/30">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
        <p className="mt-2 text-sm text-[#94A3B8] max-w-sm">
          The requested page does not exist or has been moved within MaanWin51.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-black text-sm font-extrabold rounded-xl transition-all shadow-lg shadow-amber-500/20"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F1420] border border-[#1E283D] hover:bg-[#141B2A] text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Login</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
