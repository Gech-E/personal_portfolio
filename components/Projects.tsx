'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'AI-Powered E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with ML-based recommendation system, computer vision for product search, and real-time inventory management.',
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'ML', 'CV'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: '/api/placeholder/600/400',
  },
  {
    id: 2,
    title: 'NLP Sentiment Analysis API',
    description:
      'RESTful API for real-time sentiment analysis using deep learning models. Processes text data and provides sentiment scores with high accuracy.',
    technologies: ['FastAPI', 'Python', 'NLP', 'Deep Learning', 'Docker'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: '/api/placeholder/600/400',
  },
  {
    id: 3,
    title: 'Computer Vision Object Detection',
    description:
      'Real-time object detection system using YOLO and custom deep learning models. Web interface for uploading and analyzing images.',
    technologies: ['React', 'Flask', 'CV', 'Deep Learning', 'OpenCV'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: '/api/placeholder/600/400',
  },
  {
    id: 4,
    title: 'ML Model Deployment Platform',
    description:
      'Platform for deploying and managing machine learning models with versioning, A/B testing, and monitoring capabilities.',
    technologies: ['Next.js', 'FastAPI', 'PostgreSQL', 'ML', 'Docker'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    image: '/api/placeholder/600/400',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-purple-400 mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700 hover:border-primary-400 transition-all duration-300 hover:shadow-xl hover:shadow-primary-400/20"
            >
              <div className="h-48 bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center">
                <div className="text-white text-4xl font-bold opacity-50">
                  {project.title.charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-700/50 text-primary-300 text-sm rounded-full border border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    <Github size={20} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    <ExternalLink size={20} />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
