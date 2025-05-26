import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  linkTo?: string
}

const sizeClasses = {
  sm: "h-6",
  md: "h-8",
  lg: "h-12",
  xl: "h-16",
}

export function Logo({ size = "md", className = "", linkTo = "/" }: LogoProps) {
  const logoElement = (
    <img
      src="/images/agribaba-logo.png"
      alt="AgriBaba - Connect Farmers with Buyers"
      className={`w-auto ${sizeClasses[size]} ${className}`}
    />
  )

  if (linkTo) {
    return (
      <Link href={linkTo} className="inline-block">
        {logoElement}
      </Link>
    )
  }

  return logoElement
}
