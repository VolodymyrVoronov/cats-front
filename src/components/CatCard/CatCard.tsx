import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { FaCat, FaBriefcaseMedical, FaHeart } from 'react-icons/fa';

import type { Cat } from '../../store/cats';

import IconIndicator from '../IconIndicator/IconIndicator';

import styles from './CatCard.module.css';

interface ICatCardProps {
  cat: Cat;
  fetchingCats: boolean;
  onEditCardClick: (id: string) => void;
}

const CatCard = ({
  cat,
  fetchingCats,
  onEditCardClick,
}: ICatCardProps): JSX.Element => {
  const {
    id,
    // createdAt,
    // updatedAt,
    name,
    age,
    breed,
    photo,
    diseases,
    marked,
    insurance,
    information,
    alive,
    dead,
  } = cat;

  const onEditButtonClick = (): void => {
    onEditCardClick(id);
  };

  const header = (
    <div
      className={styles.header}
      style={{ backgroundImage: `url(${photo})` }}
    />
  );

  return (
    <div className={styles.root}>
      <Card
        title={`${name}. Age: ${age}`}
        header={header}
        subTitle={<i>{breed}</i>}
      >
        <div className={styles.icons}>
          <IconIndicator
            icon={<FaHeart />}
            tooltipText={marked ? 'Marked' : 'Unmarked'}
            flag={marked}
          />

          <IconIndicator
            icon={<FaBriefcaseMedical />}
            tooltipText={insurance ? 'Insurance' : 'No insurance'}
            flag={insurance}
          />

          {alive && (
            <IconIndicator icon={<FaCat />} tooltipText='Alive' flag={alive} />
          )}

          {dead && (
            <IconIndicator icon={<FaCat />} tooltipText='Dead' flag={!dead} />
          )}
        </div>

        {information && (
          <p className={styles.text}>
            <Badge value='Information:' size='normal' severity='info' />{' '}
            {information}
          </p>
        )}

        {diseases && (
          <p className={styles.text}>
            <Badge value='Diseases:' size='normal' severity='warning' />{' '}
            {diseases}
          </p>
        )}

        <Divider />

        <Button
          className='flex ml-auto'
          onClick={onEditButtonClick}
          label='Edit'
          icon='pi pi-pencil'
          size='small'
          rounded
          raised
          tooltip='Edit cat card'
          tooltipOptions={{ position: 'top' }}
          loading={fetchingCats}
        />
      </Card>
    </div>
  );
};

export default CatCard;
