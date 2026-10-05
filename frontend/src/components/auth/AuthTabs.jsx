import React from 'react';
import { Smartphone, Mail } from 'lucide-react';

const AuthTabs = ({ activeTab, onChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Authentication method"
      className="flex border-b border-[#1E283D] mb-6"
    >
      <button
        type="button"
        role="tab"
        id="tab-phone"
        aria-selected={activeTab === 'phone'}
        aria-controls="panel-phone"
        onClick={() => onChange('phone')}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm sm:text-[15px] font-bold transition-all duration-200 relative cursor-pointer
          ${activeTab === 'phone'
            ? 'text-amber-400'
            : 'text-[#94A3B8] hover:text-white'
          }
        `}
      >
        <Smartphone className={`w-4 h-4 shrink-0 ${activeTab === 'phone' ? 'text-amber-400' : 'text-[#64748B]'}`} aria-hidden="true" />
        <span>Phone Number</span>
        {activeTab === 'phone' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-t-full shadow-sm shadow-amber-500/50 transition-all duration-200" />
        )}
      </button>

      <button
        type="button"
        role="tab"
        id="tab-email"
        aria-selected={activeTab === 'email'}
        aria-controls="panel-email"
        onClick={() => onChange('email')}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm sm:text-[15px] font-bold transition-all duration-200 relative cursor-pointer
          ${activeTab === 'email'
            ? 'text-amber-400'
            : 'text-[#94A3B8] hover:text-white'
          }
        `}
      >
        <Mail className={`w-4 h-4 shrink-0 ${activeTab === 'email' ? 'text-amber-400' : 'text-[#64748B]'}`} aria-hidden="true" />
        <span>Email Address</span>
        {activeTab === 'email' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-t-full shadow-sm shadow-amber-500/50 transition-all duration-200" />
        )}
      </button>
    </div>
  );
};

export default AuthTabs;
