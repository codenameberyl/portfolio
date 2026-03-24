"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { NeuralNetworkBg } from './neural-network-bg'
import { projects } from '@/lib/projects'

type Project = typeof projects[number]

interface Props {
  project: Project
}

export function ProjectDetail({ project }: Props) {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Neural Network animated background */}
      <NeuralNetworkBg />
      
      {/* Subtle grid overlay */}
      <div className="fixed inset-0 grid-bg opacity-10 pointer-events-none z-[1]" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-overlay pointer-events-none z-[2]" />

      {/* Content */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/#deployments"
              className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-lg font-mono text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all mb-12"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Deployments</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.span 
                className={`w-3 h-3 rounded-full ${
                  project.status === 'deployed' ? 'bg-primary' : 'bg-accent'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-sm text-primary uppercase">{project.status}</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-mono text-sm text-muted-foreground">{project.type}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              {project.name}
            </h1>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm font-mono text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.header>

          {/* Description */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-mono text-sm text-muted-foreground">project_overview.md</span>
              </div>
              <div className="p-6">
                <p className="text-foreground/90 leading-relaxed text-lg">
                  {project.fullDescription}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Pipeline Architecture */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="font-mono text-primary text-sm">PIPELINE_ARCHITECTURE</span>
            </h2>
            
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <div className="relative">
                {/* Connection lines */}
                <div className="absolute top-12 left-8 right-8 h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded hidden md:block">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* Pipeline stages */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {project.pipeline.map((stage, i) => (
                    <motion.div
                      key={stage.step}
                      className="relative flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <motion.div
                        className="w-16 h-16 bg-secondary border border-border rounded-lg flex items-center justify-center mb-3 relative z-10"
                        animate={{
                          borderColor: ['rgba(255,214,0,0.2)', 'rgba(255,214,0,0.5)', 'rgba(255,214,0,0.2)'],
                          boxShadow: [
                            '0 0 0 rgba(255,214,0,0)',
                            '0 0 20px rgba(255,214,0,0.3)',
                            '0 0 0 rgba(255,214,0,0)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                      >
                        <span className="text-primary text-2xl">{stage.icon}</span>
                      </motion.div>
                      <span className="font-mono text-sm text-foreground font-medium text-center">
                        {stage.step}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground text-center mt-1 max-w-24">
                        {stage.description}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Performance Metrics */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
              <span className="font-mono text-primary text-sm">PERFORMANCE_METRICS</span>
            </h2>
            
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(project.metrics).map(([key, value], i) => (
                <motion.div
                  key={key}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 text-center hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 text-glow">
                    {value}
                  </div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-wide">
                    {key}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Action buttons */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-wrap gap-4">
              <a
                href={project.links.github}
                className="flex-1 min-w-48 px-6 py-4 bg-secondary border border-border rounded-lg text-center font-mono text-sm text-foreground hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View Source Code</span>
              </a>
              <a
                href={project.links.demo}
                className="flex-1 min-w-48 px-6 py-4 bg-primary text-primary-foreground rounded-lg text-center font-mono text-sm hover:glow-yellow transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Launch Live Demo</span>
              </a>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Floating status indicator */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-mono text-muted-foreground">Viewing: {project.id}</span>
        </div>
      </div>
    </main>
  )
}
