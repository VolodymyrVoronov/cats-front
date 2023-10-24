import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';

import styles from './PageLayout.module.css';

interface IPageLayoutProps {
  className?: string;
}

const PageLayout = ({
  className,
  children,
}: PropsWithChildren<IPageLayoutProps>) => {
  return (
    <motion.div
      className={cn(styles.root, className)}
      initial={{
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.975,
      }}
      exit={{
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.975,
        transition: {
          delay: 0.5,
          duration: 1,
        },
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageLayout;
