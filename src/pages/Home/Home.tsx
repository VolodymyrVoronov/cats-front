import { ProgressBar } from 'primereact/progressbar';

import { useCatsStore } from '../../store/cats';

import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';

import styles from './Home.module.css';

const Home = (): JSX.Element => {
  const { fetchingCats, errorFetchingCats } = useCatsStore();

  // console.log(cats);

  if (fetchingCats) {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />;
  }

  if (errorFetchingCats) {
    return <div>{errorFetchingCats}</div>;
  }

  return <PageWrapper className={styles.root}>Home</PageWrapper>;
};

export default Home;
