import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Card } from 'primereact/card';
import cn from 'classnames';
import { InputText } from 'primereact/inputtext';
import type { InputNumberChangeEvent } from 'primereact/inputnumber';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

import type { Cat } from '../../store/cats';
import { useCatsStore } from '../../store/cats';
// import { CatService } from '../../services/api/services';

import styles from './Form.module.css';
import ImageUploader from '../ImageUploader/ImageUploader';

interface IFormProps {
  wrapper?: 'card' | 'div';
}

const Form = ({ wrapper = 'card' }: IFormProps): JSX.Element => {
  const { catToEdit } = useCatsStore();

  const [showImageUploader, setShowImageUploader] = useState(false);

  const initialState =
    catToEdit !== null
      ? { ...catToEdit }
      : ({
          name: '',
          age: null,
          breed: '',
          photo: '',
          diseases: '',
          marked: false,
          insurance: false,
          information: '',
          alive: true,
          dead: false,
        } as Cat);

  const [cat, setCat] = useState(initialState);

  const onTextInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;

    setCat({ ...cat, [name]: value });
  };

  const onNumberInputChange = (e: InputNumberChangeEvent): void => {
    const { value } = e;

    setCat({ ...cat, age: value });
  };

  const onSaveImageClick = (image: string): void => {
    setCat({ ...cat, photo: image });

    setShowImageUploader(false);
  };

  const onDeletePhotoButtonClick = (): void => {
    setCat({ ...cat, photo: '' });
  };

  const onUploadPhotoButtonClick = (): void => {
    setShowImageUploader(true);
  };

  const onCloseImageUploaderButtonClick = (): void => {
    setShowImageUploader(false);
  };

  const form = (
    <>
      <Sidebar
        visible={showImageUploader}
        onHide={onCloseImageUploaderButtonClick}
        className='h-full z-1'
        position='top'
        dismissable={false}
      >
        <ImageUploader onSaveImageClick={onSaveImageClick} />
      </Sidebar>

      <div className='flex flex-column gap-2 mb-3'>
        <div
          className={cn(styles.photo, 'shadow-5')}
          style={{
            backgroundImage: `url(${cat.photo || 'assets/black-cat.png'})`,
          }}
        />

        <span className='flex m-auto p-buttonset mt-3 mb-3'>
          <Button
            onClick={onUploadPhotoButtonClick}
            icon='pi pi-upload'
            rounded
            raised
            aria-label='Upload new photo'
            tooltip='Upload new photo'
            tooltipOptions={{ position: 'top' }}
          />
          <Button
            onClick={onDeletePhotoButtonClick}
            icon='pi pi-trash'
            rounded
            raised
            aria-label='Delete uploaded photo'
            tooltip='Delete uploaded photo'
            tooltipOptions={{ position: 'top' }}
            disabled={!cat.photo}
          />
        </span>
      </div>

      <div className='flex flex-column gap-2 mb-3'>
        <label htmlFor='name' className='font-bold'>
          Name
        </label>
        <InputText
          value={cat.name}
          onChange={onTextInputChange}
          name='name'
          id='name'
          aria-describedby='name-help'
          required
        />
        <small id='name-help'>Enter cat's name.</small>
      </div>

      <div className='flex flex-column gap-2 mb-3'>
        <label htmlFor='age' className='font-bold'>
          Age
        </label>
        <InputNumber
          value={cat.age}
          onChange={onNumberInputChange}
          id='age'
          aria-describedby='age-help'
          required
          useGrouping={false}
          showButtons
          min={0}
        />
        <small id='age-help'>Enter cat's age. (0 if age is unknown)</small>
      </div>

      <div className='flex flex-column gap-2 mb-3'>
        <label htmlFor='breed' className='font-bold'>
          Breed
        </label>
        <InputText
          value={cat.breed}
          onChange={onTextInputChange}
          name='breed'
          id='breed'
          aria-describedby='breed-help'
        />
        <small id='breed-help'>
          Enter cat's breed. (If unknown leave blank)
        </small>
      </div>

      <div className='flex flex-column gap-2 mb-3'>
        <label htmlFor='diseases' className='font-bold'>
          Diseases
        </label>
        <InputText
          value={cat.diseases}
          onChange={onTextInputChange}
          name='diseases'
          id='diseases'
          aria-describedby='diseases-help'
        />
        <small id='diseases-help'>
          Enter cat's diseases. (Comma separated, if unknown leave blank)
        </small>
      </div>

      <div className='flex flex-column gap-2 mb-3'>
        <label htmlFor='information' className='font-bold'>
          Information
        </label>
        <InputTextarea
          value={cat.information}
          onChange={onTextInputChange}
          name='information'
          id='information'
          aria-describedby='information-help'
          autoResize
          rows={5}
        />
        <small id='information-help'>
          Enter cat's information. (If no information leave blank)
        </small>
      </div>
    </>
  );

  if (wrapper === 'card') {
    return <Card className={cn(styles.root, 'shadow-5')}>{form}</Card>;
  }

  return <div className={styles.root}>{form}</div>;
};

export default Form;
