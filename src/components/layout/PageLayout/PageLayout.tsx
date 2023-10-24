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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default PageLayout;
