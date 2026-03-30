// lib/projects.ts

export interface PipelineStage {
  step: string;
  icon: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'deployed' | 'beta';
  type: string;
  description: string;
  fullDescription: string;
  tags: string[];
  metrics: Record<string, string>;
  pipeline: PipelineStage[];
  links: { github: string; demo: string };
  content: string;
}

export const projects: Project[] = [
  {
    id: "robotics-arm",
    name: "Advanced Robotics: Package Sorting System",
    status: "deployed",
    type: "Robotics & CV",
    description: "Robotic package-sorting system using UR10e arm in Webots simulation with computer vision.",
    fullDescription: "Designed and implemented a complete robotic package-sorting system using a UR10e collaborative robot arm in Webots simulation. Developed a custom dataset generation pipeline and trained an Ultralytics YOLOv8 segmentation model for precise object detection within the simulation environment.",
    tags: ["Robotics", "Computer Vision", "YOLOv8", "Webots", "Python"],
    metrics: { accuracy: "89%", detection_speed: "120fps", dataset_size: "2000+" },
    pipeline: [
      { step: "Simulation", icon: "◇", description: "Webots environment setup" },
      { step: "Dataset Gen", icon: "◈", description: "Custom data generation" },
      { step: "Model Train", icon: "⬡", description: "YOLOv8 segmentation" },
      { step: "Integration", icon: "◆", description: "Robot arm control" },
      { step: "Deployment", icon: "⊕", description: "Real-time inference" },
    ],
    links: { github: "https://github.com/codenameberyl/zspms", demo: "#" },
    content: `Advanced Robotics and Artificial Intelligence (81% - 40 Credits). A sophisticated robotic system that combines computer vision with robotic manipulation to sort packages in a simulated environment. Repository: github.com/codenameberyl/zspms`
  },
  {
    id: "dnn-story-reasoning",
    name: "Deep Neural Networks: Story Reasoning System",
    status: "deployed",
    type: "Deep Learning",
    description: "Neural network solution for structured story-reasoning dataset using advanced deep learning.",
    fullDescription: "Implemented a neural network-based solution for a structured story-reasoning dataset. Applied deep learning techniques to model reasoning patterns within sequential data and evaluated model performance through comprehensive testing.",
    tags: ["PyTorch", "Deep Learning", "NLP", "Sequential Models"],
    metrics: { f1_score: "87.3%", inference_time: "25ms", epochs: "50" },
    pipeline: [
      { step: "Data Load", icon: "◇", description: "Story dataset preparation" },
      { step: "Embedding", icon: "◈", description: "Sequence embedding layer" },
      { step: "RNN/LSTM", icon: "⬡", description: "Sequential processing" },
      { step: "Training", icon: "◆", description: "Model optimization" },
      { step: "Evaluation", icon: "⊕", description: "Performance metrics" },
    ],
    links: { github: "https://github.com/codenameberyl/dnnls", demo: "#" },
    content: `Deep Neural Networks and Learning Systems (81% - 20 Credits). A comprehensive implementation of deep learning techniques for understanding and reasoning over sequential story data. Repository: github.com/codenameberyl/dnnls`
  },
  {
    id: "rest-api",
    name: "Scalable Backend & RESTful API Architecture",
    status: "deployed",
    type: "Backend Development",
    description: "High-performance backend systems and REST APIs with optimized architecture and reliability.",
    fullDescription: "Designed and implemented scalable backend systems and RESTful APIs that improved application performance and system reliability. Translated business requirements into efficient technical architectures with comprehensive database design and API specification.",
    tags: ["Django", "FastAPI", "PostgreSQL", "Python"],
    metrics: { response_time: "45ms", latency_99p: "120ms", uptime: "99.9%" },
    pipeline: [
      { step: "Design", icon: "◇", description: "API specification" },
      { step: "Database", icon: "◈", description: "Schema optimization" },
      { step: "Backend", icon: "⬡", description: "Service implementation" },
      { step: "Testing", icon: "◆", description: "Integration tests" },
      { step: "Deployment", icon: "⊕", description: "Production deployment" },
    ],
    links: { github: "#", demo: "#" },
    content: "Professional experience at Validators Innovation. Engineered scalable systems that improved application performance while maintaining code quality and system reliability through best practices in software architecture."
  },
  {
    id: "full-stack-dev",
    name: "Full-Stack Web Development Portfolio",
    status: "deployed",
    type: "Full-Stack Development",
    description: "Production-ready web applications combining modern frontend and backend technologies.",
    fullDescription: "Developed complete full-stack applications using Next.js, React, and Django. Implemented responsive UI design, state management, API integration, and deployment pipelines. Enhanced development productivity through testing and CI/CD automation.",
    tags: ["Next.js", "React", "Django", "TypeScript", "Tailwind"],
    metrics: { projects: "10+", lighthouse: "95+", uptime: "99.8%" },
    pipeline: [
      { step: "Frontend", icon: "◇", description: "Next.js + React" },
      { step: "UI/UX", icon: "◈", description: "Tailwind CSS design" },
      { step: "Backend", icon: "⬡", description: "API development" },
      { step: "Database", icon: "◆", description: "PostgreSQL" },
      { step: "Deploy", icon: "⊕", description: "CI/CD pipeline" },
    ],
    links: { github: "https://github.com/codenameberyl", demo: "#" },
    content: "Contributed to multiple projects combining modern web technologies. Implemented feature development, improved application performance, and contributed to technical documentation and data-driven decision-making."
  }
];