'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
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
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-purple-400 mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-gray-300 text-lg leading-relaxed"
          >
            <p>
              I'm a passionate Python Full Stack Developer and AI/ML Engineer
              with expertise in building scalable web applications and
              intelligent machine learning solutions. I specialize in creating
              end-to-end systems that combine robust backend architecture with
              modern frontend experiences.
            </p>
            <p>
              My journey in technology has led me to master various frameworks
              and tools, from React and Next.js for frontend development to
              FastAPI and Flask for backend services. I'm particularly
              interested in leveraging AI/ML capabilities to solve real-world
              problems.
            </p>
            <p>
              Whether it's developing RESTful APIs, implementing deep learning
              models, or building computer vision applications, I bring a
              comprehensive approach to every project, ensuring high-quality,
              maintainable, and efficient solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Years of Experience', value: '5+' },
              { label: 'Projects Completed', value: '50+' },
              { label: 'Technologies', value: '20+' },
              { label: 'Happy Clients', value: '30+' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-primary-400 transition-colors duration-200"
              >
                <div className="text-3xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
