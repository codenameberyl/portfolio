"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const bootSequence = [
  { text: "Initializing AI Engineer Profile...", delay: 0 },
  { text: "Loading neural modules...", delay: 800 },
  { text: "Connecting to knowledge base...", delay: 1600 },
  { text: "System ready.", delay: 2400 },
]

export function HeroSection() {
  const [currentLine, setCurrentLine] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (currentLine < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
      }, bootSequence[currentLine].delay + 400)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setShowContent(true), 500)
      return () => clearTimeout(timer)
    }
  }, [currentLine])

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/20"
            initial={{ width: 100, height: 100, opacity: 0 }}
            animate={{ 
              width: [100, 600 + i * 200], 
              height: [100, 600 + i * 200], 
              opacity: [0.5, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 1.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Boot sequence terminal */}
      <motion.div 
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 1 }}
        animate={{ opacity: showContent ? 0 : 1, y: showContent ? -50 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: showContent ? 'none' : 'block' }}
      >
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 font-mono text-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
            <span className="ml-2 text-muted-foreground text-xs">system_boot.sh</span>
          </div>
          {bootSequence.slice(0, currentLine).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="text-primary">{'>'}</span>
              <span className="text-foreground/80">{line.text}</span>
              {i === currentLine - 1 && i < bootSequence.length - 1 && (
                <span className="inline-block w-2 h-4 bg-primary animate-typing-cursor ml-1" />
              )}
            </motion.div>
          ))}
          {currentLine < bootSequence.length && (
            <div className="flex items-center gap-2">
              <span className="text-primary">{'>'}</span>
              <span className="inline-block w-2 h-4 bg-primary animate-typing-cursor" />
            </div>
          )}
        </div>
      </motion.div>

      {/* Main hero content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ display: showContent ? 'block' : 'none' }}
      >
        {/* Status badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-primary/10 border border-primary/30 rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.9 }}
          transition={{ delay: 0.2 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-sm font-mono text-primary">System Online</span>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-foreground">Abiola</span>
          <span className="text-primary text-glow"> Onasanya</span>
        </motion.h1>

        {/* Role */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="px-3 py-1 bg-secondary border border-border rounded font-mono text-sm text-foreground/80">
            Software Engineer
          </span>
          <span className="text-primary font-mono text-sm flex items-center">|</span>
          <span className="px-3 py-1 bg-primary/10 border border-primary/30 rounded font-mono text-sm text-primary">
            AI/ML Engineer
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          Transitioning into AI/ML Engineering. Building intelligent systems from data to deployment.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ delay: 0.6 }}
        >
          <a 
            href="#deployments" 
            className="group px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded hover:glow-yellow transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <span>View Deployments</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 bg-secondary border border-border text-foreground font-mono text-sm rounded hover:border-primary/50 transition-all duration-300"
          >
            Initialize Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
