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
      container: 'bg-red-950/40 border-red-500/30 text-red-200',
      icon: AlertCircle,
      iconColor: 'text-red-400',
    },
    success: {
      container: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
    },
    warning: {
      container: 'bg-amber-950/40 border-amber-500/30 text-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
    },
    info: {
      container: 'bg-blue-950/40 border-blue-500/30 text-blue-200',
      icon: Info,
      iconColor: 'text-blue-400',
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
