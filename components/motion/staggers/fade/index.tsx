"use client";

import { motion, useReducedMotion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.24,
    },
  },
};

function Container({ children, className }: React.HTMLProps<HTMLDivElement>) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div variants={container} initial={reducedMotion ? false : "hidden"} animate="show" className={className}>
      {children}
    </motion.div>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}

export { Container, Item };
