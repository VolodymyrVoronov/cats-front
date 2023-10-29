import { memo } from 'react';

import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import Form from '../../components/Form/Form';

import styles from './Add.module.css';

const Add = memo((): JSX.Element => {
  return (
    <PageWrapper className={styles.root}>
      <Form />
    </PageWrapper>
  );
});

export default Add;
