export const pageVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
