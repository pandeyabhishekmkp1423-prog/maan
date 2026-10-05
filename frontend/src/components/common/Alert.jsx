import React from 'react';
import { AlertCircle, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

const Alert = ({
  type = 'error',
  title,
  message,
  children,
  onClose,
  className = '',
}) => {
  const content = message || children;
  if (!content) return null;

  const styles = {
    error: {
      container: 'bg-[#FFF5F5] border-[#FEE2E2] text-[#DC2626]',
      icon: AlertCircle,
      iconColor: 'text-[#DC2626]',
    },
    success: {
      container: 'bg-[#F0FDF4] border-[#DCFCE7] text-[#16A34A]',
      icon: CheckCircle2,
      iconColor: 'text-[#16A34A]',
    },
    warning: {
      container: 'bg-[#FFFBEB] border-[#FEF3C7] text-[#D97706]',
      icon: AlertTriangle,
      iconColor: 'text-[#D97706]',
    },
    info: {
      container: 'bg-[#EFF6FF] border-[#DBEAFE] text-[#2563EB]',
      icon: Info,
      iconColor: 'text-[#2563EB]',
    },
  };

  const current = styles[type] || styles.error;
  const Icon = current.icon;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-[14px] border text-sm transition-all duration-200 ${current.container} ${className}`}
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} aria-hidden="true" />

      <div className="flex-1">
        {title && <h5 className="font-semibold mb-0.5">{title}</h5>}
        <div className="leading-snug">{content}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="shrink-0 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
