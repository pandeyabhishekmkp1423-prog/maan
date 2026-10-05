import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false, message = 'Loading MaanWin51...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090E]">
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-[#0F1420] shadow-2xl border border-[#1E283D]">
          <img
            src="/logo.jpeg"
            alt="Logo"
            className="h-12 w-auto object-contain rounded-xl"
          />
          <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
          <p className="text-sm font-semibold text-[#94A3B8]">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      {message && <p className="text-sm text-[#94A3B8]">{message}</p>}
    </div>
  );
};

export default Loader;
