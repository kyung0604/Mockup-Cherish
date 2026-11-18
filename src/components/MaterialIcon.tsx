type MaterialIconProps = {
  name: string
  className?: string
  filled?: boolean
}

export function MaterialIcon({ name, className = '', filled = false }: MaterialIconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-rounded ${filled ? 'is-filled' : ''} ${className}`}
    >
      {name}
    </span>
  )
}
