'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function InfoPage() {
  const [activeCard, setActiveCard] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const infoCards = [
    {
      title: 'Web3 Integration',
      description: 'Seamless blockchain connectivity powered by wagmi',
      icon: '⛓️',
      gradient: 'from-blue-600 to-cyan-500',
    },
    {
      title: 'Smart Contracts',
      description: 'Deploy and interact with contracts efficiently',
      icon: '📝',
      gradient: 'from-purple-600 to-pink-500',
    },
    {
      title: 'NFT Management',
      description: 'Create, mint, and manage digital assets',
      icon: '🎨',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: 'Cross-Chain',
      description: 'Bridge multiple blockchains seamlessly',
      icon: '🌉',
      gradient: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_25%,rgba(68,68,68,.2)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.2)_75%,rgba(68,68,68,.2))] bg-[length:60px_60px] opacity-30" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          className="px-6 md:px-12 pt-20 pb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 leading-tight">
              Web3 Info
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
              Explore the future of decentralized applications with bleeding-edge blockchain technology
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="px-6 md:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Chains', value: '10+' },
            { label: 'Contracts', value: '500+' },
            { label: 'Users', value: '50K+' },
            { label: 'Transactions', value: '1M+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Cards Section */}
        <motion.div
          className="px-6 md:px-12 pb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400"
          >
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {infoCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveCard(idx)}
              >
                {/* Card Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Card Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-slate-700/50 group-hover:border-slate-400/50 transition-colors duration-300" />

                {/* Animated Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div>
                    <motion.span
                      className="text-5xl mb-4 inline-block"
                      animate={activeCard === idx ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.icon}
                    </motion.span>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                  <motion.p
                    className="text-slate-300 text-sm leading-relaxed"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {card.description}
                  </motion.p>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${card.gradient} w-0 group-hover:w-full transition-all duration-500`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA Section */}
        <motion.div
          className="px-6 md:px-12 py-20 border-t border-slate-700/30"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Explore?</h3>
            <p className="text-slate-300 mb-8 text-lg">
              Join thousands of developers building on Web3 with cutting-edge tools and seamless blockchain integration.
            </p>
            <motion.button
              className="px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
