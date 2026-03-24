import { HeroSection } from '@/components/hero-section'
import { SystemOverview } from '@/components/system-overview'
import { TechStackMatrix } from '@/components/tech-stack-matrix'
import { ModelDeployments } from '@/components/model-deployments'
import { ExecutionHistory } from '@/components/execution-history'
import { LiveTerminal } from '@/components/live-terminal'
import { ContactEndpoint } from '@/components/contact-endpoint'
import { Navigation } from '@/components/navigation'
import { NeuralNetworkBg } from '@/components/neural-network-bg'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden scroll-smooth">
      {/* Neural Network animated background */}
      <NeuralNetworkBg />
      
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none z-[1]" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none z-[2]" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <div className="relative z-10">
        <HeroSection />
        <SystemOverview />
        <TechStackMatrix />
        <ModelDeployments />
        <ExecutionHistory />
        <LiveTerminal />
        <ContactEndpoint />
      </div>
      
      {/* Floating status indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-mono text-muted-foreground">Neural Net Active</span>
        </div>
      </div>
    </main>
  )
}
