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
    id: "fig-nlp",
    name: "FIG-Loneliness NLP Analysis",
    status: "deployed",
    type: "NLP Pipeline",
    description: "End-to-end NLP system for analyzing loneliness patterns in text data using transformer models.",
    fullDescription: "A comprehensive natural language processing pipeline designed to identify and analyze patterns of loneliness in textual data. The system leverages BERT for deep semantic understanding, combined with traditional machine learning (SVM, Random Forest) for robust classification.",
    tags: ["NLP", "BERT", "PyTorch", "SHAP"],
    metrics: { accuracy: "94.2%", latency: "45ms", uptime: "99.9%" },
    pipeline: [
      { step: "Preprocessing", icon: "◇", description: "Text cleaning and tokenization" },
      { step: "TF-IDF", icon: "◈", description: "Feature extraction" },
      { step: "ML Models", icon: "⬡", description: "Random Forest ensemble" },
      { step: "BERT", icon: "◆", description: "Deep semantic analysis" },
      { step: "SHAP", icon: "⊕", description: "Explainable AI outputs" },
    ],
    links: { github: "#", demo: "#" },
    content: `This project detects loneliness in Reddit posts using a hybrid approach of TF-IDF and BERT. 
    Achieved high F1 scores and built a full API pipeline.`
  },
  {
    id: "url-shortener",
    name: "Intelligent URL Shortener",
    status: "deployed",
    type: "Full-stack Application",
    description: "High-performance URL shortening service with analytics dashboard and custom link management.",
    fullDescription: "A scalable URL shortening platform featuring real-time analytics, custom branded links, and QR generation. Built with FastAPI for high-throughput and Redis for caching.",
    tags: ["FastAPI", "PostgreSQL", "React", "Redis"],
    metrics: { requests: "1M+/mo", latency: "12ms", uptime: "99.99%" },
    pipeline: [
      { step: "API Gateway", icon: "◇", description: "Request routing" },
      { step: "Auth Layer", icon: "◈", description: "JWT authentication" },
      { step: "Core Logic", icon: "⬡", description: "URL hashing" },
      { step: "Cache", icon: "◆", description: "Redis hot-link caching" },
      { step: "Analytics", icon: "⊕", description: "Click tracking" },
    ],
    links: { github: "#", demo: "#" },
    content: "Features JWT Authentication, Analytics tracking, and a Django + Next.js architecture."
  },
  {
    id: "menu-cart",
    name: "Smart Menu & Cart System",
    status: "deployed",
    type: "E-commerce Module",
    description: "Intelligent ordering system with real-time inventory management and recommendation engine.",
    fullDescription: "An AI-powered e-commerce ordering system featuring intelligent product recommendations based on user behavior.",
    tags: ["Next.js", "Node.js", "MongoDB", "ML"],
    metrics: { orders: "500+/day", conversion: "12%", satisfaction: "4.8/5" },
    pipeline: [
      { step: "UI Layer", icon: "◇", description: "React components" },
      { step: "State Mgmt", icon: "◈", description: "Global cart state" },
      { step: "API", icon: "⬡", description: "RESTful backend" },
      { step: "Recommender", icon: "◆", description: "Collaborative filtering" },
      { step: "Payment", icon: "⊕", description: "Stripe integration" },
    ],
    links: { github: "#", demo: "#" },
    content: "Real-time inventory synchronization and ML-based recommendation engine."
  },
  {
    id: "sentiment-api",
    name: "Real-time Sentiment API",
    status: "beta",
    type: "ML Service",
    description: "RESTful API for real-time sentiment analysis supporting multiple languages.",
    fullDescription: "A production-ready sentiment analysis API with sub-50ms response times and support for multi-language tokenization.",
    tags: ["spaCy", "FastAPI", "Docker", "AWS"],
    metrics: { accuracy: "91.5%", languages: "5", models: "3" },
    pipeline: [
      { step: "Input", icon: "◇", description: "Request validation" },
      { step: "Tokenizer", icon: "◈", description: "Language detection" },
      { step: "Embedding", icon: "⬡", description: "Word vectors" },
      { step: "Classifier", icon: "◆", description: "Prediction" },
      { step: "Response", icon: "⊕", description: "JSON formatting" },
    ],
    links: { github: "#", demo: "#" },
    content: "Supports custom model fine-tuning and containerized deployment via Docker."
  }
];