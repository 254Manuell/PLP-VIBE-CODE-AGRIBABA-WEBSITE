import { Logo } from "@/components/logo"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-pulse">
          <Logo size="xl" linkTo="" />
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce animate-bounce-delay-1"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce animate-bounce-delay-2"></div>
        </div>
        <p className="text-green-600 font-medium">Loading AgriBaba...</p>
      </div>
    </div>
  )
}
