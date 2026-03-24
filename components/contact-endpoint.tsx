"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const socialLinks = [
  { name: "GitHub", url: "https://github.com/codenameberyl", icon: "◇" },
  { name: "LinkedIn", url: "https://linkedin.com/in/codenameberyl", icon: "◈" },
  { name: "Twitter", url: "https://twitter.com/codenameberyl", icon: "⬡" },
  { name: "Email", url: "mailto:abiola@onasanya.dev", icon: "◆" },
]

export function ContactEndpoint() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate success
    setStatus('success')
    setFormState({ name: "", email: "", message: "" })
    
    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <section id="contact" className="relative py-32 px-6" ref={ref}>
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
            <span className="font-mono text-sm text-primary">06 // CONTACT_API</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Initialize Connection
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Form header */}
            <div className="px-6 py-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">POST</span>
                  <span className="font-mono text-sm text-muted-foreground">/api/contact</span>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-mono ${
                  status === 'success' 
                    ? 'bg-primary/10 text-primary' 
                    : status === 'error'
                    ? 'bg-destructive/10 text-destructive'
                    : status === 'sending'
                    ? 'bg-accent/10 text-accent'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {status === 'success' ? '200 OK' : status === 'error' ? '500 Error' : status === 'sending' ? 'Sending...' : 'Ready'}
                </span>
              </div>
            </div>

            {/* Form content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-mono text-muted-foreground">
                  {"// name: string (required)"}
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-muted-foreground">
                  {"// email: string (required)"}
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-muted-foreground">
                  {"// message: string (required)"}
                </label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-3 rounded font-mono text-sm transition-all duration-300 ${
                  status === 'sending'
                    ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                    : status === 'success'
                    ? 'bg-primary text-primary-foreground glow-yellow'
                    : 'bg-primary text-primary-foreground hover:glow-yellow'
                }`}
              >
                {status === 'sending' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending Request...</span>
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Message Sent!</span>
                  </span>
                ) : (
                  'Send Request →'
                )}
              </button>
            </form>
          </motion.div>

          {/* Info panel */}
          <div className="space-y-6">
            {/* API documentation */}
            <motion.div
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="px-6 py-4 border-b border-border">
                <span className="font-mono text-sm text-muted-foreground">api_documentation.md</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-4">
                <div>
                  <span className="text-muted-foreground">Response Time:</span>
                  <span className="text-primary ml-2">{"< 24 hours"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="text-primary ml-2">Open to opportunities</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Timezone:</span>
                  <span className="text-foreground ml-2">UTC +0</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Preferred Stack:</span>
                  <span className="text-foreground ml-2">Python, TypeScript, AI/ML</span>
                </div>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="px-6 py-4 border-b border-border">
                <span className="font-mono text-sm text-muted-foreground">social_endpoints.json</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 bg-secondary border border-border rounded hover:border-primary/30 hover:text-primary transition-all group"
                    >
                      <span className="text-primary opacity-50 group-hover:opacity-100">{link.icon}</span>
                      <span className="font-mono text-sm">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-32 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full" />
              <span>AI Engineer Portfolio v2.0.26</span>
            </div>
            <div>
              Built with Next.js • Designed to impress
            </div>
            <div>
              © {new Date().getFullYear()} All systems operational
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
