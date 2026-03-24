"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const techCategories = [
  {
    name: "Languages",
    icon: "{ }",
    items: [
      { name: "Python", level: 95, description: "Primary language for ML/AI" },
      { name: "JavaScript", level: 90, description: "Full-stack web development" },
      { name: "TypeScript", level: 88, description: "Type-safe applications" },
      { name: "SQL", level: 85, description: "Database queries & analytics" },
      { name: "R", level: 70, description: "Statistical analysis" },
    ]
  },
  {
    name: "AI/ML",
    icon: "◈",
    items: [
      { name: "PyTorch", level: 90, description: "Deep learning framework" },
      { name: "TensorFlow", level: 85, description: "Neural network training" },
      { name: "spaCy", level: 88, description: "NLP pipelines" },
      { name: "BERT/Transformers", level: 85, description: "Language models" },
      { name: "Scikit-learn", level: 92, description: "Classical ML algorithms" },
    ]
  },
  {
    name: "Backend",
    icon: "⬡",
    items: [
      { name: "Django", level: 88, description: "Python web framework" },
      { name: "FastAPI", level: 90, description: "Modern API development" },
      { name: "PostgreSQL", level: 85, description: "Relational database" },
      { name: "Redis", level: 78, description: "Caching & queues" },
      { name: "Docker", level: 82, description: "Containerization" },
    ]
  },
  {
    name: "Frontend",
    icon: "◇",
    items: [
      { name: "Next.js", level: 88, description: "React framework" },
      { name: "React", level: 90, description: "UI library" },
      { name: "Tailwind CSS", level: 92, description: "Utility-first CSS" },
      { name: "Three.js", level: 65, description: "3D graphics" },
      { name: "Framer Motion", level: 80, description: "Animations" },
    ]
  },
]

export function TechStackMatrix() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  return (
    <section id="stack" className="relative py-32 px-6" ref={ref}>
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
            <span className="font-mono text-sm text-primary">02 // TECH_STACK_MATRIX</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Technology Arsenal
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {techCategories.map((category, i) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(i)}
              className={`relative px-4 py-2 font-mono text-sm rounded transition-all duration-200 ${
                activeCategory === i
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="opacity-50">{category.icon}</span>
                <span>{category.name}</span>
              </span>
              {activeCategory === i && (
                <motion.div
                  layoutId="activeTechTab"
                  className="absolute inset-0 bg-primary/10 border border-primary/30 rounded"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tech grid */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Grid header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-primary opacity-50">{techCategories[activeCategory].icon}</span>
              <span className="font-mono text-sm text-muted-foreground">
                {techCategories[activeCategory].name.toLowerCase()}.matrix
              </span>
            </div>
            <span className="font-mono text-xs text-primary">
              {techCategories[activeCategory].items.length} modules loaded
            </span>
          </div>

          {/* Tech items */}
          <div className="p-6">
            <div className="space-y-4">
              {techCategories[activeCategory].items.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="group relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <div className="flex items-center gap-4">
                    {/* Tech name */}
                    <div className="w-32 md:w-40">
                      <span className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                        {tech.name}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                        style={{
                          boxShadow: hoveredTech === tech.name ? '0 0 10px var(--glow-yellow)' : 'none'
                        }}
                      />
                    </div>

                    {/* Percentage */}
                    <div className="w-12 text-right">
                      <span className="font-mono text-sm text-primary">{tech.level}%</span>
                    </div>
                  </div>

                  {/* Description tooltip */}
                  {hoveredTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-32 md:left-40 mt-1 px-3 py-1.5 bg-card border border-primary/30 rounded text-xs text-muted-foreground font-mono z-10"
                    >
                      {tech.description}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Visual network graph */}
        <motion.div
          className="mt-8 relative h-64 bg-card/30 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Connection lines */}
              <motion.g stroke="currentColor" strokeWidth="1" className="text-border">
                {[
                  { x1: 200, y1: 100, x2: 100, y2: 50 },
                  { x1: 200, y1: 100, x2: 300, y2: 50 },
                  { x1: 200, y1: 100, x2: 100, y2: 150 },
                  { x1: 200, y1: 100, x2: 300, y2: 150 },
                  { x1: 100, y1: 50, x2: 50, y2: 100 },
                  { x1: 300, y1: 50, x2: 350, y2: 100 },
                  { x1: 100, y1: 150, x2: 50, y2: 100 },
                  { x1: 300, y1: 150, x2: 350, y2: 100 },
                ].map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: 0.3 } : {}}
                    transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                  />
                ))}
              </motion.g>

              {/* Nodes */}
              {[
                { x: 200, y: 100, label: "Core", size: 12 },
                { x: 100, y: 50, label: "Python", size: 8 },
                { x: 300, y: 50, label: "JS/TS", size: 8 },
                { x: 100, y: 150, label: "PyTorch", size: 8 },
                { x: 300, y: 150, label: "Next.js", size: 8 },
                { x: 50, y: 100, label: "FastAPI", size: 6 },
                { x: 350, y: 100, label: "React", size: 6 },
              ].map((node, i) => (
                <motion.g key={i}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    className="fill-primary"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                  />
                  <motion.text
                    x={node.x}
                    y={node.y + node.size + 12}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[8px] font-mono"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                  >
                    {node.label}
                  </motion.text>
                </motion.g>
              ))}
            </svg>
          </div>

          {/* Overlay label */}
          <div className="absolute bottom-4 right-4">
            <span className="font-mono text-xs text-muted-foreground">Technology Network Graph</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
