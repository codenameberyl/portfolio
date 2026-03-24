"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Node {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  layer: number
  active: boolean
  pulseDelay: number
}

interface Connection {
  from: number
  to: number
  active: boolean
  dataFlowProgress: number
}

export function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const connectionsRef = useRef<Connection[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined) 
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Create layered neural network nodes
    const numLayers = 5
    const nodesPerLayer = [6, 10, 12, 10, 6]
    const nodes: Node[] = []
    let nodeId = 0

    for (let layer = 0; layer < numLayers; layer++) {
      const layerX = (dimensions.width / (numLayers + 1)) * (layer + 1)
      const numNodes = nodesPerLayer[layer]
      
      for (let i = 0; i < numNodes; i++) {
        const spacing = dimensions.height / (numNodes + 1)
        nodes.push({
          id: nodeId++,
          x: layerX + (Math.random() - 0.5) * 50,
          y: spacing * (i + 1) + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          layer,
          active: Math.random() > 0.7,
          pulseDelay: Math.random() * 3000
        })
      }
    }

    // Create connections between adjacent layers
    const connections: Connection[] = []
    for (let layer = 0; layer < numLayers - 1; layer++) {
      const currentLayerNodes = nodes.filter(n => n.layer === layer)
      const nextLayerNodes = nodes.filter(n => n.layer === layer + 1)
      
      currentLayerNodes.forEach(fromNode => {
        // Connect to 2-4 random nodes in next layer
        const numConnections = 2 + Math.floor(Math.random() * 3)
        const shuffled = [...nextLayerNodes].sort(() => Math.random() - 0.5)
        
        for (let i = 0; i < Math.min(numConnections, shuffled.length); i++) {
          connections.push({
            from: fromNode.id,
            to: shuffled[i].id,
            active: Math.random() > 0.5,
            dataFlowProgress: Math.random()
          })
        }
      })
    }

    nodesRef.current = nodes
    connectionsRef.current = connections

    let lastTime = 0
    const dataPackets: { x: number; y: number; progress: number; connection: Connection }[] = []

    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node positions with subtle movement
      nodesRef.current.forEach(node => {
        node.x += node.vx
        node.y += node.vy

        // Boundary bounce with layer constraints
        const layerX = (dimensions.width / (numLayers + 1)) * (node.layer + 1)
        if (Math.abs(node.x - layerX) > 60) {
          node.vx *= -1
        }
        if (node.y < 50 || node.y > canvas.height - 50) {
          node.vy *= -1
        }

        // Random activation
        if (Math.random() < 0.002) {
          node.active = !node.active
        }
      })

      // Draw connections
      connectionsRef.current.forEach(conn => {
        const fromNode = nodesRef.current.find(n => n.id === conn.from)!
        const toNode = nodesRef.current.find(n => n.id === conn.to)!

        // Connection line
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        
        const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y)
        const alpha = conn.active ? 0.15 : 0.05
        gradient.addColorStop(0, `rgba(255, 214, 0, ${alpha})`)
        gradient.addColorStop(1, `rgba(255, 214, 0, ${alpha * 0.5})`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = conn.active ? 1 : 0.5
        ctx.stroke()

        // Data flow animation
        if (conn.active && Math.random() < 0.01) {
          dataPackets.push({
            x: fromNode.x,
            y: fromNode.y,
            progress: 0,
            connection: conn
          })
        }
      })

      // Draw and update data packets
      for (let i = dataPackets.length - 1; i >= 0; i--) {
        const packet = dataPackets[i]
        const fromNode = nodesRef.current.find(n => n.id === packet.connection.from)!
        const toNode = nodesRef.current.find(n => n.id === packet.connection.to)!

        packet.progress += deltaTime * 0.001
        
        if (packet.progress >= 1) {
          dataPackets.splice(i, 1)
          continue
        }

        const x = fromNode.x + (toNode.x - fromNode.x) * packet.progress
        const y = fromNode.y + (toNode.y - fromNode.y) * packet.progress

        // Glowing data packet
        const packetGradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
        packetGradient.addColorStop(0, 'rgba(255, 214, 0, 0.8)')
        packetGradient.addColorStop(0.5, 'rgba(255, 214, 0, 0.3)')
        packetGradient.addColorStop(1, 'rgba(255, 214, 0, 0)')
        
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = packetGradient
        ctx.fill()
      }

      // Draw nodes
      nodesRef.current.forEach(node => {
        const pulsePhase = Math.sin((time + node.pulseDelay) * 0.002) * 0.5 + 0.5

        // Outer glow for active nodes
        if (node.active) {
          const glowGradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, 20
          )
          glowGradient.addColorStop(0, `rgba(255, 214, 0, ${0.3 * pulsePhase})`)
          glowGradient.addColorStop(1, 'rgba(255, 214, 0, 0)')
          
          ctx.beginPath()
          ctx.arc(node.x, node.y, 20, 0, Math.PI * 2)
          ctx.fillStyle = glowGradient
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.active ? 4 : 3, 0, Math.PI * 2)
        ctx.fillStyle = node.active 
          ? `rgba(255, 214, 0, ${0.6 + pulsePhase * 0.4})`
          : 'rgba(255, 214, 0, 0.2)'
        ctx.fill()

        // Node border
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.active ? 6 : 4, 0, Math.PI * 2)
        ctx.strokeStyle = node.active 
          ? `rgba(255, 214, 0, ${0.4 + pulsePhase * 0.3})`
          : 'rgba(255, 214, 0, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [dimensions])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  )
}
