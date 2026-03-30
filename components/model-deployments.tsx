// components/model-deployment.tsx
"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { projects, Project, PipelineStage } from '@/lib/projects' // Unified Import

function DataFlowPipeline({ pipeline, isHovered }: { pipeline: PipelineStage[], isHovered: boolean }) {
  return (
    <div className="pt-4 border-t border-border">
      <div className="text-xs font-mono text-muted-foreground mb-3">Pipeline Architecture</div>
      <div className="relative flex items-center justify-between">
        <div className="absolute top-4 left-4 right-4 h-px bg-border">
          {isHovered && (
            <motion.div
              className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '1200%' }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
        
        {pipeline.map((stage, j) => (
          <motion.div key={stage.step} className="flex flex-col items-center relative z-10">
            <motion.div 
              className={`w-8 h-8 bg-secondary border rounded flex items-center justify-center transition-all duration-300 ${
                isHovered ? 'border-primary/50 glow-yellow-sm' : 'border-border'
              }`}
            >
              <span className="text-primary text-xs">{stage.icon}</span>
            </motion.div>
            <span className="text-[10px] font-mono text-muted-foreground mt-1 text-center max-w-12 truncate">
              {stage.step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function ModelDeployments() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <section id="deployments" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="font-mono text-sm text-primary">03 // MODEL_DEPLOYMENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Active Deployments
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`group bg-card/50 backdrop-blur-sm border rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                hoveredProject === project.id ? 'border-primary/50 glow-yellow-sm' : 'border-border'
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Link href={`/projects/${project.id}`} className="block">
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold group-hover:text-primary">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  
                  <DataFlowPipeline pipeline={project.pipeline} isHovered={hoveredProject === project.id} />
                  
                  <div className="pt-4 border-t border-border grid grid-cols-3 gap-2">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-bold text-primary">{value}</div>
                        <div className="text-[9px] font-mono text-muted-foreground uppercase">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}