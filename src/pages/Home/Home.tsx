import { memo, useEffect, useRef } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { useCatsStore } from '../../store/cats';
import { useAppStore } from '../../store/app';

import PageWrapper from '../../components/layout/PageWrapper/PageWrapper';
import CatCard from '../../components/CatCard/CatCard';

import styles from './Home.module.css';

const Home = memo((): JSX.Element => {
  const { setShowEditForm } = useAppStore();
  const {
    cats,
    fetchingCats,
    errorFetchingCats,
    deletingCat,
    errorDeletingCat,
    deleteCat,
    setCatToEdit,
  } = useCatsStore();

  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (errorFetchingCats) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error fetching cats',
        detail: 'Try again later',
        life: 3000,
      });
    }
  }, [errorFetchingCats]);

  useEffect(() => {
    if (errorDeletingCat) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error deleting cat',
        detail: 'Try again later',
        life: 3000,
      });
    }
  }, [errorDeletingCat]);

  if (fetchingCats || deletingCat) {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />;
  }

  const onEditCardClick = (id: string): void => {
    setCatToEdit(id);
    setShowEditForm(true);
  };

  const onDeleteCardClick = (id: string): void => {
    confirmDialog({
      message: "Are you sure you want to delete this cat's card?",
      header: 'Confirm the deletion!',
      icon: 'pi pi-exclamation-triangle',
      accept() {
        deleteCat(id);
      },
    });
  };

  return (
    <>
      <ConfirmDialog />
      <Toast ref={toast} />

      <PageWrapper className={styles.root}>
        {cats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            fetchingCats={fetchingCats}
            deletingCat={deletingCat}
            onEditCardClick={onEditCardClick}
            onDeleteCardClick={onDeleteCardClick}
          />
        ))}
      </PageWrapper>
    </>
  );
});

export default Home;
