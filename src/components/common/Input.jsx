/**
 * Input Component
 * 
 * Componente Input reutilizable con soporte para error y helper text
 */

export function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span style={{ color: 'var(--color-error)' }}> *</span>}
        </label>
      )}
      
      <input
        id={inputId}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        style={error ? { borderColor: 'var(--color-error)' } : {}}
        {...props}
      />
      
      {error && <div className="form-error">{error}</div>}
      {helperText && !error && <div className="form-helper">{helperText}</div>}
    </div>
  );
}