import { Sidebar } from 'primereact/sidebar';
import SideMenuList from '../SideMenuList/SideMenuList';

import styles from './SideMenu.module.css';

interface ISideMenuProps {
  showSideBar: boolean;
  onCloseSideBarButtonClick: () => void;
}

const SideMenu = ({
  showSideBar,
  onCloseSideBarButtonClick,
}: ISideMenuProps): JSX.Element => {
  const onCloseButtonClick = (): void => {
    onCloseSideBarButtonClick();
  };

  return (
    <Sidebar
      header={<h2 className={styles.header}>Cats</h2>}
      visible={showSideBar}
      onHide={onCloseButtonClick}
    >
      <SideMenuList />
    </Sidebar>
  );
};

export default SideMenu;
