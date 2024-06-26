// components/PageTransition.tsx
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 8 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
