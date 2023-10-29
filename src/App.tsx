import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';

import { useAppStore } from './store/app';
import { useCatsStore } from './store/cats';

import { Pages } from './constants';

import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Selected from './pages/Selected/Selected';

import SideMenu from './components/SideMenu/SideMenu';
import TopMenu from './components/TopMenu/TopMenu';

import styles from './App.module.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedPage } = useAppStore();
  const { showEditForm, fetchAllCats, setShowEditForm } = useCatsStore();

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
        <h2>Sidebar</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Dialog>

      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path={Pages.Home} element={<Home />} />
          <Route path={Pages.Add} element={<Add />} />
          <Route path={Pages.Selected} element={<Selected />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
