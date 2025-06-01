'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // 추가: 애니메이션 지연 시간 prop
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay = 0 }) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // 20% 보였을 때 애니메이션 시작
      transition={{ duration: 0.7, ease: 'easeOut', delay }} // duration, ease, delay 적용
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection; 