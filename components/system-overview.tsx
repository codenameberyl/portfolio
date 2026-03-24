"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const statusIndicators = [
  { label: "Model Accuracy", value: "High", status: "active" },
  { label: "Deployment Ready", value: "True", status: "active" },
  { label: "Learning Mode", value: "Active", status: "active" },
  { label: "System Uptime", value: "99.9%", status: "active" },
]

const metrics = [
  { label: "Projects Deployed", value: "15+", icon: "◆" },
  { label: "Models Trained", value: "10+", icon: "⬡" },
  { label: "Lines of Code", value: "50K+", icon: "≡" },
  { label: "Coffee Consumed", value: "∞", icon: "☕" },
]

export function SystemOverview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="overview" className="relative py-32 px-6" ref={ref}>
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
            <span className="font-mono text-sm text-primary">01 // SYSTEM_OVERVIEW</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            System Configuration
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main info panel */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Panel header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span className="font-mono text-sm text-muted-foreground">profile.config</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">READ_ONLY</span>
            </div>

            {/* Panel content */}
            <div className="p-6 space-y-6">
              <div>
                <div className="text-xs font-mono text-muted-foreground mb-2">// Current Focus</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  MSc Artificial Intelligence
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing advanced studies in AI with a focus on Natural Language Processing, 
                  Machine Learning, and Full-stack AI systems development.
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-muted-foreground mb-2">// Mission Statement</div>
                <p className="text-foreground/80 leading-relaxed">
                  Bridging the gap between software engineering and artificial intelligence to build 
                  intelligent, scalable systems that solve real-world problems. Passionate about 
                  transforming complex data into actionable insights.
                </p>
              </div>

              <div>
                <div className="text-xs font-mono text-muted-foreground mb-3">// Core Competencies</div>
                <div className="flex flex-wrap gap-2">
                  {['NLP', 'Machine Learning', 'Deep Learning', 'Full-stack Dev', 'Data Engineering'].map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-secondary border border-border rounded text-xs font-mono text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status panel */}
          <div className="space-y-6">
            {/* System status */}
            <motion.div
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="font-mono text-sm text-muted-foreground">system.status</span>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {statusIndicators.map((indicator, i) => (
                  <motion.div
                    key={indicator.label}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full glow-yellow-sm" />
                    <div>
                      <div className="text-xs text-muted-foreground font-mono">{indicator.label}</div>
                      <div className="text-sm text-primary font-mono">{indicator.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Metrics */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary opacity-50">{metric.icon}</span>
                    <span className="text-xs font-mono text-muted-foreground">{metric.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
