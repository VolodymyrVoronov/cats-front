import { ProgressBar } from 'primereact/progressbar';

import { useCatsStore } from '../../store/cats';

import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import CatCard from '../../components/CatCard/CatCard';

import styles from './Home.module.css';

const Home = (): JSX.Element => {
  const {
    cats,
    fetchingCats,
    errorFetchingCats,
    setCatToEdit,
    setShowEditForm,
  } = useCatsStore();

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
};

export default Home;
