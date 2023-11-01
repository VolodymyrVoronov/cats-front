import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

import { useAppStore } from './store/app';
import { useCatsStore } from './store/cats';

import { pages } from './constants';

import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Selected from './pages/Selected/Selected';

import SideMenu from './components/SideMenu/SideMenu';
import TopMenu from './components/TopMenu/TopMenu';
import Form from './components/Form/Form';

import styles from './App.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedPage, showEditForm, setShowEditForm } = useAppStore();
  const { fetchAllCats, setCatToEdit } = useCatsStore();

  const [showSideBar, setShowSideBar] = useState(false);

  const onShowSideBarButtonClick = (): void => {
    setShowSideBar(true);
  };

  const onCloseSideBarButtonClick = (): void => {
    setShowSideBar(false);
  };

  const onCloseEditForm = () => {
    setShowEditForm(false);
  };

  useEffect(() => {
    if (selectedPage !== null && showSideBar === true) {
      navigate(selectedPage.code);
      setShowSideBar(false);
    }
    setCatToEdit(null);
  }, [selectedPage]);

  useEffect(() => {
    fetchAllCats();
  }, []);

  return (
    <>
      <TopMenu onShowSideBarButtonClick={onShowSideBarButtonClick} />
      <SideMenu
        showSideBar={showSideBar}
        onCloseSideBarButtonClick={onCloseSideBarButtonClick}
      />

      <Dialog
        visible={showEditForm}
        onHide={onCloseEditForm}
        className={styles.dialog}
        draggable={false}
      >
        <Form wrapper='div' />
      </Dialog>

      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path={pages.Home} element={<Home />} />
          <Route path={pages.Add} element={<Add />} />
          <Route path={pages.Selected} element={<Selected />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
