"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const commands = {
  help: {
    output: [
      "Available commands:",
      "",
      "  about       - Display system overview",
      "  skills      - Show tech stack matrix",
      "  projects    - List deployed models",
      "  experience  - View execution history",
      "  contact     - Initialize contact protocol",
      "  clear       - Clear terminal",
      "  social      - Show social links",
      "",
      "Type a command and press Enter to execute.",
    ]
  },
  about: {
    output: [
      "┌─────────────────────────────────────────┐",
      "│  NAME: Abiola Oluwaseun Onasanya       │",
      "│  ROLE: AI/ML Engineer                  │",
      "│  STATUS: Active                        │",
      "│  VERSION: 2.0.26                       │",
      "├─────────────────────────────────────────┤",
      "│  Software Engineer transitioning to    │",
      "│  AI/ML Engineering. Currently pursuing │",
      "│  MSc in Artificial Intelligence.       │",
      "│                                        │",
      "│  Specializing in:                      │",
      "│  • Natural Language Processing         │",
      "│  • Machine Learning Systems            │",
      "│  • Full-stack AI Applications          │",
      "└─────────────────────────────────────────┘",
    ]
  },
  skills: {
    output: [
      "Loading tech_stack.matrix...",
      "",
      "Languages   ████████████████████░░░░  80%",
      "AI/ML       ██████████████████████░░  88%",
      "Backend     ███████████████████░░░░░  76%",
      "Frontend    █████████████████░░░░░░░  68%",
      "",
      "Primary: Python, TypeScript, PyTorch, Next.js",
      "Run 'skills --verbose' for detailed breakdown.",
    ]
  },
  projects: {
    output: [
      "Fetching deployed models...",
      "",
      "ID          NAME                    STATUS",
      "────────────────────────────────────────────",
      "fig-nlp     FIG-Loneliness NLP     ● DEPLOYED",
      "url-short   URL Shortener          ● DEPLOYED",
      "menu-cart   Smart Menu System      ● DEPLOYED",
      "sentiment   Sentiment API          ◐ BETA",
      "",
      "4 systems found. Use 'view <id>' for details.",
    ]
  },
  experience: {
    output: [
      "Parsing execution_history.log...",
      "",
      "[2024-PRES] MSc AI · University",
      "[2022-PRES] Software Engineer · Tech Company",
      "[2021-2022] Jr. Software Engineer · Startup Inc",
      "[2020-2021] SWE Intern · Enterprise Corp",
      "",
      "Total experience: 4+ years in tech",
    ]
  },
  contact: {
    output: [
      "Initializing contact protocol...",
      "",
      "POST /api/contact HTTP/1.1",
      "Content-Type: application/json",
      "",
      "Options:",
      "  Email    → abiola@onasanya.dev",
      "  LinkedIn → linkedin.com/in/codenameberyl",
      "  GitHub   → github.com/codenameberyl",
      "",
      "Scroll down to access the contact form.",
    ]
  },
  social: {
    output: [
      "Social Links:",
      "",
      "  GitHub   → github.com/codenameberyl",
      "  LinkedIn → linkedin.com/in/codenameberyl",
      "  Twitter  → twitter.com/codenameberyl",
      "  Email    → abiola@onasanya.dev",
    ]
  },
  "": {
    output: [""]
  }
}

type CommandKey = keyof typeof commands;

export function LiveTerminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Array<{ command: string; output: string[] }>>([])
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Initial welcome message
  useEffect(() => {
    if (isInView && history.length === 0) {
      setHistory([
        {
          command: "",
          output: [
            "Welcome to AI Engineer Terminal v2.0.26",
            "Type 'help' for available commands.",
            "",
          ]
        }
      ])
    }
  }, [isInView, history.length])

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([])
      return
    }

    setIsTyping(true)

    const isValidCommand = trimmedCmd in commands;
    const response = isValidCommand 
      ? commands[trimmedCmd as CommandKey] 
      : {
          output: [`Command not found: ${cmd}`, "Type 'help' for available commands."]
        };

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    setHistory(prev => [...prev, { command: cmd, output: response.output }]);
    setIsTyping(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() || input === "") {
      handleCommand(input)
      setInput("")
    }
  }

  return (
    <section id="terminal" className="relative py-32 px-6" ref={ref}>
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
            <span className="font-mono text-sm text-primary">05 // LIVE_TERMINAL</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Interactive CLI
          </h2>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-accent/80" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-2 font-mono text-sm text-muted-foreground">abiola@root ~ zsh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-primary/10 rounded text-xs font-mono text-primary">Interactive</span>
            </div>
          </div>

          {/* Terminal content */}
          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto p-6 font-mono text-sm cursor-text"
          >
            {/* History */}
            {history.map((entry, i) => (
              <div key={i} className="mb-4">
                {entry.command && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary">❯</span>
                    <span className="text-foreground">{entry.command}</span>
                  </div>
                )}
                {entry.output.map((line, j) => (
                  <div key={j} className="text-muted-foreground pl-4 whitespace-pre">
                    {line}
                  </div>
                ))}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Processing</span>
                <span className="animate-pulse">...</span>
              </div>
            )}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-primary">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-foreground outline-none caret-primary"
                placeholder="Enter command..."
                autoComplete="off"
                spellCheck="false"
              />
              <span className="w-2 h-4 bg-primary animate-typing-cursor" />
            </form>
          </div>

          {/* Quick commands */}
          <div className="px-6 py-3 border-t border-border bg-secondary/30">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-mono text-muted-foreground">Quick commands:</span>
              {['help', 'about', 'skills', 'projects', 'contact'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setInput(cmd)
                    handleCommand(cmd)
                  }}
                  className="px-2 py-0.5 bg-secondary border border-border rounded text-xs font-mono text-foreground/80 hover:border-primary/30 hover:text-primary transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
