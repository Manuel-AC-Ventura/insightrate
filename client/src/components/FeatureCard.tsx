import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 border border-zinc-300/50">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  )
}