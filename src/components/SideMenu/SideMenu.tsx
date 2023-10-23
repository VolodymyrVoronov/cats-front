import { Sidebar } from 'primereact/sidebar';
import { ListBox } from 'primereact/listbox';

import styles from './SideMenu.module.css';
import { useEffect, useState } from 'react';

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

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const menuItems = [
    { name: 'Add', code: 'add', icon: 'pi-plus' },
    { name: 'Selected', code: 'selected', icon: 'pi-heart' },
  ];

  const groupTemplate = (option: {
    name: string;
    icon: string;
  }) => {
    return (
      <div className='flex align-items-center gap-2'>
        <i
          className={`pi ${option.icon}`}
          style={{ width: '1.25rem', marginRight: '.5rem' }}
        />
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <Sidebar
      header={<h2 className={styles.header}>Menu</h2>}
      visible={showSideBar}
      onHide={onCloseButtonClick}
    >
      <ListBox
        value={selectedMenuItem}
        onChange={(e) => setSelectedMenuItem(e.value)}
        options={menuItems}
        itemTemplate={groupTemplate}
        optionLabel='name'
        className='w-full'
      />
    </Sidebar>
  );
};

export default SideMenu;
