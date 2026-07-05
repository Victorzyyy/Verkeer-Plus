import React from 'react'

interface FieldProps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

export function Field({ label, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-muted">
        {label}{required && <span className="text-accent ml-1" aria-hidden>*</span>}
      </label>
      {children}
      {error && <p className="text-[12px] text-accent-soft">{error}</p>}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`field-base ${className}`}
      {...props}
    />
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`field-base resize-y min-h-[90px] ${className}`}
      {...props}
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}
export function Select({ className = '', children, ...props }: SelectProps) {
  return (
    <select
      className={`field-base cursor-pointer appearance-none bg-no-repeat pr-9`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237a756c' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundPosition: 'right 14px center',
      }}
      {...props}
    >
      {children}
    </select>
  )
}

interface RadioPillGroupProps {
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}
export function RadioPillGroup({ name, options, value, onChange }: RadioPillGroupProps) {
  return (
    <div className="flex gap-2.5 mt-0.5">
      {options.map(opt => (
        <label
          key={opt.value}
          className={`relative cursor-pointer flex items-center justify-center px-4 py-2 text-[14px] font-medium rounded-md border transition-all duration-200 ${
            value === opt.value
              ? 'bg-accent/10 border-accent text-white'
              : 'bg-bg border-concrete text-muted hover:border-dim'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="absolute opacity-0 w-0 h-0"
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}

interface FileUploadProps {
  id: string
  accept?: string
  label: string
  hint: string
  fileName?: string
  error?: string
  onChange: (file: File | null) => void
}
export function FileUpload({ id, accept, label, hint, fileName, error, onChange }: FileUploadProps) {
  return (
    <div>
      <label className="text-[13px] font-medium text-muted block mb-1.5">{label}</label>
      <label
        htmlFor={id}
        className="relative flex items-center gap-3 px-4 py-3.5 bg-bg border border-dashed border-concrete rounded-md cursor-pointer hover:border-dim transition-colors"
      >
        <input
          id={id}
          type="file"
          accept={accept}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={e => onChange(e.target.files?.[0] ?? null)}
        />
        <div className="flex-shrink-0 w-8 h-8 bg-raised rounded flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a756c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <p className="text-[13px] text-dim leading-snug" dangerouslySetInnerHTML={{ __html: hint.replace('PDF, DOC', '<strong class="text-muted">PDF, DOC</strong>') }} />
      </label>
      {fileName && <p className="text-[13px] text-green-500 mt-1.5">✓ {fileName}</p>}
      {error && <p className="text-[12px] text-accent-soft mt-1">{error}</p>}
    </div>
  )
}

interface FormMessageProps {
  type: 'success' | 'error' | null
  html?: string
}
export function FormMessage({ type, html }: FormMessageProps) {
  if (!type || !html) return null
  return (
    <div
      className={`mt-4 px-4 py-3.5 rounded-md text-[14px] leading-relaxed ${
        type === 'success'
          ? 'bg-green-500/10 border border-green-500/30 text-green-400'
          : 'bg-accent/10 border border-accent/30 text-accent-soft'
      }`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
