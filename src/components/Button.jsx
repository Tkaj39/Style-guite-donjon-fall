import { forwardRef } from 'react'

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 disabled:pointer-events-none disabled:opacity-40 select-none'

const variants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 focus-visible:ring-brand-500',
  secondary:
    'bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:bg-neutral-600 focus-visible:ring-neutral-500',
  outline:
    'border border-neutral-700 text-neutral-200 bg-transparent hover:bg-neutral-800 hover:border-neutral-600 active:bg-neutral-700 focus-visible:ring-neutral-500',
  ghost:
    'text-neutral-300 bg-transparent hover:bg-neutral-800 hover:text-neutral-100 active:bg-neutral-700 focus-visible:ring-neutral-500',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500',
  'danger-outline':
    'border border-red-700 text-red-400 bg-transparent hover:bg-red-950 hover:border-red-600 active:bg-red-900 focus-visible:ring-red-500',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 focus-visible:ring-emerald-500',
  link:
    'text-brand-400 bg-transparent underline-offset-4 hover:underline hover:text-brand-300 focus-visible:ring-brand-500 px-0',
}

const sizes = {
  xs: 'h-7 px-2.5 text-xs rounded-md gap-1.5',
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
  xl: 'h-13 px-6 text-lg',
}

const iconSizes = {
  xs: 'h-7 w-7 rounded-md',
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-11 w-11',
  xl: 'h-13 w-13',
}

function Spinner({ className = '' }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    iconOnly = false,
    loading = false,
    leadingIcon,
    trailingIcon,
    fullWidth = false,
    className = '',
    children,
    disabled,
    ...props
  },
  ref,
) {
  const sizeClass = iconOnly ? iconSizes[size] : sizes[size]

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={[
        base,
        variants[variant] ?? variants.primary,
        sizeClass,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <>
          <Spinner className="w-4 h-4" />
          {!iconOnly && <span>{children}</span>}
        </>
      ) : (
        <>
          {leadingIcon && <span className="w-4 h-4 flex items-center">{leadingIcon}</span>}
          {!iconOnly && children}
          {trailingIcon && <span className="w-4 h-4 flex items-center">{trailingIcon}</span>}
        </>
      )}
    </button>
  )
})

export default Button
