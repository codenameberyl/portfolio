import { projects } from '@/lib/projects'
import Link from 'next/link'
import { NeuralNetworkBg } from '@/components/neural-network-bg'
import { Navigation } from '@/components/navigation'

export const metadata = {
  title: 'Projects | AI Engineer Portfolio',
  description: 'Complete portfolio of AI, ML, and full-stack development projects',
}

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Neural Network animated background */}
      <NeuralNetworkBg />
      
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none z-[1]" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none z-[2]" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Content */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 mt-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="font-mono text-sm text-primary">03 // ALL_PROJECTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Project Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Below is a comprehensive collection of my academic research, ML implementations, and full-stack development projects.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <div className="group bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer hover:glow-yellow-sm h-full">
                  <div className="p-8 space-y-6 h-full flex flex-col">
                    {/* Project Header */}
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.name}
                          </h2>
                          <p className="text-sm text-muted-foreground mt-1">{project.type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap ml-4 ${
                          project.status === 'deployed' 
                            ? 'bg-primary/10 text-primary border border-primary/30' 
                            : 'bg-accent/10 text-accent border border-accent/30'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-foreground mt-3">{project.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-mono bg-secondary/50 border border-border rounded text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border mt-auto">
                      {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-base font-bold text-primary">{value}</div>
                          <div className="text-[10px] font-mono text-muted-foreground uppercase mt-1">{key.replace(/_/g, ' ')}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="text-sm text-primary group-hover:translate-x-1 transition-transform duration-300">
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-20 pt-12 border-t border-border">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{projects.length}</div>
                <p className="text-muted-foreground">Active Projects</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(projects.flatMap(p => p.tags)).size}+
                </div>
                <p className="text-muted-foreground">Technologies & Tools</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <p className="text-muted-foreground">Code on GitHub</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating status indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-mono text-muted-foreground">System Active</span>
        </div>
      </div>
    </main>
  )
}
