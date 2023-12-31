import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { FaCat, FaBriefcaseMedical, FaHeart } from 'react-icons/fa';
import { Image } from 'primereact/image';

import type { Cat } from '../../store/cats';

import IconIndicator from '../IconIndicator/IconIndicator';

import styles from './CatCard.module.css';

interface ICatCardProps {
  cat: Cat;
  fetchingCats?: boolean;
  deletingCat?: boolean;
  onEditCardClick?: (id: string) => void;
  onDeleteCardClick?: (id: string) => void;
}

const CatCard = ({
  cat,
  fetchingCats,
  deletingCat,
  onEditCardClick,
  onDeleteCardClick,
}: ICatCardProps): JSX.Element => {
  const {
    id,
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

  const anyActions = onEditCardClick || onDeleteCardClick;

  const onEditButtonClick = (): void => {
    if (onEditCardClick) {
      onEditCardClick(id);
    }
  };

  const onDeleteButtonClick = (): void => {
    if (onDeleteCardClick) {
      onDeleteCardClick(id);
    }
  };

  const header = (
    <>
      {photo ? (
        <div
          className={styles.header}
          style={{
            backgroundImage: `url(${photo})`,
            filter: alive ? '' : 'grayscale(100%)',
          }}
        />
      ) : (
        <Image src='assets/black-cat.png' />
      )}
    </>
  );

  return (
    <div className={styles.root}>
      <Card
        title={
          <span>
            {name} <br />
            <small className='font-medium text-mdd'>
              Age: {age === 0 ? 'unknown' : age}
            </small>
          </span>
        }
        header={header}
        subTitle={<i>{breed}</i>}
        className='shadow-5'
      >
        <div className={styles.icons}>
          <IconIndicator
            icon={<FaHeart />}
            tooltipText={marked ? 'Selected' : 'Not selected'}
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

        {anyActions && (
          <>
            <Divider />

            <span className='flex justify-content-center p-buttonset'>
              <Button
                onClick={onEditButtonClick}
                label='Edit'
                icon='pi pi-pencil'
                size='small'
                rounded
                raised
                outlined
                tooltip="Edit cat's card"
                tooltipOptions={{ position: 'top' }}
                loading={fetchingCats || deletingCat}
              />

              <Button
                onClick={onDeleteButtonClick}
                className='p-button-danger'
                label='Delete'
                icon='pi pi-trash'
                size='small'
                rounded
                raised
                outlined
                tooltip="Delete cat's card"
                tooltipOptions={{ position: 'top' }}
                loading={fetchingCats || deletingCat}
              />
            </span>
          </>
        )}
      </Card>
    </div>
  );
};

export default CatCard;
