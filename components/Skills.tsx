'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  {
    category: 'Frontend',
    items: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Python', level: 95 },
      { name: 'FastAPI', level: 90 },
      { name: 'Flask', level: 85 },
      { name: 'RESTful APIs', level: 90 },
    ],
  },
  {
    category: 'AI/ML',
    items: [
      { name: 'Machine Learning', level: 98 },
      { name: 'Deep Learning', level: 95 },
      { name: 'Computer Vision', level: 95 },
      { name: 'NLP', level: 90 },
    ],
  },
  {
    category: 'Database & Tools',
    items: [
      { name: 'PostgreSQL', level: 95 },
      { name: 'MongoDB', level: 80 },
      { name: 'Docker', level: 80 },
      { name: 'Git', level: 95 },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-purple-400 mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-primary-400 transition-colors duration-200"
            >
              <h3 className="text-2xl font-semibold text-primary-400 mb-6">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                        }}
                        className="bg-gradient-to-r from-primary-400 to-purple-400 h-2.5 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
