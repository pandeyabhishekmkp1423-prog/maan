import React from 'react';
import { Smartphone, Mail } from 'lucide-react';

const AuthTabs = ({ activeTab, onChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Authentication method"
      className="flex border-b border-[#E5E7EB] mb-6"
    >
      <button
        type="button"
        role="tab"
        id="tab-phone"
        aria-selected={activeTab === 'phone'}
        aria-controls="panel-phone"
        onClick={() => onChange('phone')}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm sm:text-[15px] font-semibold transition-all duration-200 relative cursor-pointer
          ${activeTab === 'phone'
            ? 'text-[#E53935]'
            : 'text-[#6B7280] hover:text-[#111827]'
          }
        `}
      >
        <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Phone Number</span>
        {activeTab === 'phone' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E53935] rounded-t-full transition-all duration-200" />
        )}
      </button>

      <button
        type="button"
        role="tab"
        id="tab-email"
        aria-selected={activeTab === 'email'}
        aria-controls="panel-email"
        onClick={() => onChange('email')}
        className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm sm:text-[15px] font-semibold transition-all duration-200 relative cursor-pointer
          ${activeTab === 'email'
            ? 'text-[#E53935]'
            : 'text-[#6B7280] hover:text-[#111827]'
          }
        `}
      >
        <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span>Email</span>
        {activeTab === 'email' && (
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E53935] rounded-t-full transition-all duration-200" />
        )}
      </button>
    </div>
  );
};

export default AuthTabs;
