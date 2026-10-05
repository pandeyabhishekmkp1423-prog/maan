import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false, message = 'Loading MaanWin51...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white shadow-sm border border-[#E5E7EB]">
          <div className="w-12 h-12 rounded-xl bg-[#E53935] flex items-center justify-center text-white font-extrabold text-xl tracking-tight shadow-md">
            M51
          </div>
          <Loader2 className="w-7 h-7 text-[#E53935] animate-spin" />
          <p className="text-sm font-medium text-[#6B7280]">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <Loader2 className="w-8 h-8 text-[#E53935] animate-spin" />
      {message && <p className="text-sm text-[#6B7280]">{message}</p>}
    </div>
  );
};

export default Loader;
