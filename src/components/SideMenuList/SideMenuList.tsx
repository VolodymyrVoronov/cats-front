import { ListBox } from 'primereact/listbox';

import { useAppStore } from '../../store/app';
import { useCatsStore } from '../../store/cats';

import { pages } from '../../constants';

const SideMenuList = (): JSX.Element => {
  const { setSelectedPage } = useAppStore();
  const { cats } = useCatsStore();

  const anyMarkedCats = cats.some((cat) => cat.marked);

  const menuItems = [
    { name: 'Home', code: pages.Home, icon: 'pi-home' },
    { name: 'Add', code: pages.Add, icon: 'pi-plus' },
    {
      name: 'Selected',
      code: pages.Selected,
      icon: `${anyMarkedCats ? 'pi-heart-fill' : 'pi-heart'}`,
    },
  ];

  const menuItemsTemplate = (option: { name: string; icon: string }) => {
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
    <ListBox
      onChange={(e) => setSelectedPage(e.value)}
      options={menuItems}
      itemTemplate={menuItemsTemplate}
      optionLabel='name'
      className='w-full'
    />
  );
};

export default SideMenuList;
