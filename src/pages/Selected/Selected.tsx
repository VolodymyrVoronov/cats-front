import { useCatsStore } from '../../store/cats';

import CatCard from '../../components/CatCard/CatCard';
import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';

import styles from './Selected.module.css';

const Selected = (): JSX.Element => {
  const { cats } = useCatsStore();

  const markedCats = cats.filter((cat) => cat.marked);

  return (
    <PageWrapper className={styles.root}>
      {markedCats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </PageWrapper>
  );
};

export default Selected;
