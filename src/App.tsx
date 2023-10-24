import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { useAppStore } from './store/app';

import { Pages } from './constants';

import Home from './pages/Home/Home';
import Add from './pages/Add/Add';
import Selected from './pages/Selected/Selected';

import SideMenu from './components/SideMenu/SideMenu';
import TopMenu from './components/TopMenu/TopMenu';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedPage } = useAppStore();

  const [showSideBar, setShowSideBar] = useState(false);

  const onShowSideBarButtonClick = (): void => {
    setShowSideBar(true);
  };

  const onCloseSideBarButtonClick = (): void => {
    setShowSideBar(false);
  };

  useEffect(() => {
    if (selectedPage !== null && showSideBar === true) {
      navigate(selectedPage.code);
      setShowSideBar(false);
    }
  }, [selectedPage]);

  return (
    <>
      <TopMenu onShowSideBarButtonClick={onShowSideBarButtonClick} />
      <SideMenu
        showSideBar={showSideBar}
        onCloseSideBarButtonClick={onCloseSideBarButtonClick}
      />

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
