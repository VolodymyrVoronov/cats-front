import { memo } from 'react';
import { ProgressBar } from 'primereact/progressbar';

import { useCatsStore } from '../../store/cats';
import { useAppStore } from '../../store/app';

import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import CatCard from '../../components/CatCard/CatCard';

import styles from './Home.module.css';

const Home = memo((): JSX.Element => {
  const { setShowEditForm } = useAppStore();
  const { cats, fetchingCats, errorFetchingCats, setCatToEdit } =
    useCatsStore();

  if (fetchingCats) {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />;
  }

  if (errorFetchingCats) {
    return <div>{errorFetchingCats}</div>;
  }

  const onEditCardClick = (id: string) => {
    setCatToEdit(id);
    setShowEditForm(true);
  };

  return (
    <PageWrapper className={styles.root}>
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          cat={cat}
          fetchingCats={fetchingCats}
          onEditCardClick={onEditCardClick}
        />
      ))}
    </PageWrapper>
  );
});

export default Home;
