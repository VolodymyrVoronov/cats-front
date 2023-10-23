import React from 'react';

import TopMenu from '../../components/TopMenu/TopMenu';
import SideMenu from '../../components/SideMenu/SideMenu';

import styles from './Main.module.css';

const Main = (): JSX.Element => {
  const [showSideBar, setShowSideBar] = React.useState(false);

  const onShowSideBarButtonClick = (): void => {
    setShowSideBar(true);
  };

  const onCloseSideBarButtonClick = (): void => {
    setShowSideBar(false);
  };

  return (
    <div className={styles.root}>
      <TopMenu onShowSideBarButtonClick={onShowSideBarButtonClick} />
      <SideMenu
        showSideBar={showSideBar}
        onCloseSideBarButtonClick={onCloseSideBarButtonClick}
      />
    </div>
  );
};

export default Main;
