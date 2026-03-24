"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const experiences = [
  {
    id: "swe-senior",
    period: "2022 — Present",
    title: "Software Engineer",
    company: "Tech Company",
    type: "FULL_TIME",
    description: "Leading development of AI-powered features and full-stack applications. Architecting scalable systems and mentoring junior developers.",
    achievements: [
      "Built ML pipeline reducing processing time by 60%",
      "Led team of 4 engineers on critical projects",
      "Implemented CI/CD reducing deployment time by 75%",
    ],
    stack: ["Python", "TypeScript", "AWS", "PyTorch"]
  },
  {
    id: "swe-junior",
    period: "2021 — 2022",
    title: "Junior Software Engineer",
    company: "Startup Inc",
    type: "FULL_TIME",
    description: "Developed and maintained web applications. Collaborated with cross-functional teams to deliver product features.",
    achievements: [
      "Delivered 15+ features ahead of schedule",
      "Improved API response time by 40%",
      "Contributed to open-source projects",
    ],
    stack: ["JavaScript", "React", "Node.js", "PostgreSQL"]
  },
  {
    id: "intern",
    period: "2020 — 2021",
    title: "Software Engineering Intern",
    company: "Enterprise Corp",
    type: "INTERNSHIP",
    description: "Assisted in development of internal tools and automation scripts. Gained experience in agile methodologies.",
    achievements: [
      "Automated report generation saving 10hrs/week",
      "Built dashboard for team analytics",
      "Received full-time offer",
    ],
    stack: ["Python", "Django", "JavaScript", "MySQL"]
  },
  {
    id: "msc",
    period: "2024 — Present",
    title: "MSc Artificial Intelligence",
    company: "University",
    type: "EDUCATION",
    description: "Advanced studies in machine learning, deep learning, natural language processing, and AI systems design.",
    achievements: [
      "Focus: NLP & Computer Vision",
      "Research: Transformer architectures",
      "GPA: Distinction track",
    ],
    stack: ["PyTorch", "TensorFlow", "BERT", "Computer Vision"]
  },
]

export function ExecutionHistory() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section id="history" className="relative py-32 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="font-mono text-sm text-primary">04 // EXECUTION_HISTORY</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            System Logs
          </h2>
        </motion.div>

        {/* Log terminal window */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Terminal header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-accent/80" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-2 font-mono text-sm text-muted-foreground">execution_history.log</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">Streaming...</span>
            </div>
          </div>

          {/* Timeline content */}
          <div className="p-6">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border" />

              {/* Log entries */}
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    className="relative pl-8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-1 w-[14px] h-[14px] rounded-full border-2 ${
                      exp.type === 'EDUCATION' 
                        ? 'bg-accent border-accent' 
                        : 'bg-primary border-primary'
                    }`} />

                    {/* Log entry */}
                    <div 
                      className={`group bg-secondary/30 border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        expandedId === exp.id 
                          ? 'border-primary/50' 
                          : 'border-border hover:border-primary/30'
                      }`}
                      onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                    >
                      {/* Entry header */}
                      <div className="px-4 py-3 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-primary">[{exp.period}]</span>
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </span>
                        <span className="text-muted-foreground">@</span>
                        <span className="text-foreground/80">{exp.company}</span>
                        <span className={`ml-auto px-2 py-0.5 rounded text-xs font-mono ${
                          exp.type === 'EDUCATION' 
                            ? 'bg-accent/20 text-accent' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {exp.type}
                        </span>
                      </div>

                      {/* Expanded content */}
                      {expandedId === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="px-4 pb-4 border-t border-border"
                        >
                          <p className="text-sm text-muted-foreground mt-3 mb-4">
                            {exp.description}
                          </p>

                          <div className="mb-4">
                            <div className="text-xs font-mono text-muted-foreground mb-2">// Key Achievements</div>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                                  <span className="text-primary mt-1">▸</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="text-xs font-mono text-muted-foreground mb-2">// Tech Stack</div>
                            <div className="flex flex-wrap gap-2">
                              {exp.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-2 py-0.5 bg-secondary border border-border rounded text-xs font-mono text-foreground/80"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Cursor animation at bottom */}
              <motion.div
                className="relative pl-8 mt-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="absolute left-0 top-1 w-[14px] h-[14px] rounded-full border-2 border-dashed border-primary/30" />
                <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm">
                  <span>Loading next chapter...</span>
                  <span className="inline-block w-2 h-4 bg-primary animate-typing-cursor" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
