import { Button } from 'primereact/button';

import styles from './TopMenu.module.css';

interface ITopMenuProps {
  onShowSideBarButtonClick: () => void;
}

const TopMenu = ({ onShowSideBarButtonClick }: ITopMenuProps): JSX.Element => {
  const onMenuButtonClick = () => {
    onShowSideBarButtonClick();
  };

  return (
    <div className={styles.root}>
      <Button icon='pi pi-bars' onClick={onMenuButtonClick} />
    </div>
  );
};

export default TopMenu;
