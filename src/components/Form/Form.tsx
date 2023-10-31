import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import cn from 'classnames';
import { InputText } from 'primereact/inputtext';
import type { InputNumberChangeEvent } from 'primereact/inputnumber';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import type { SelectButtonChangeEvent } from 'primereact/selectbutton';
import { SelectButton } from 'primereact/selectbutton';
import { Sidebar } from 'primereact/sidebar';
import { Fieldset } from 'primereact/fieldset';

import type { Cat } from '../../store/cats';
import { useAppStore } from '../../store/app';
import { useCatsStore } from '../../store/cats';
import { CatService } from '../../services/api/services';

import { Pages } from '../../constants';

import ImageUploader from '../ImageUploader/ImageUploader';

import styles from './Form.module.css';

interface IFormProps {
  wrapper?: 'card' | 'div';
}

type SelectButtonType = 'marked' | 'insurance' | 'alive';

const Form = ({ wrapper = 'card' }: IFormProps): JSX.Element => {
  const navigate = useNavigate();

  const { setShowEditForm } = useAppStore();
  const { catToEdit, fetchAllCats } = useCatsStore();

  const [showImageUploader, setShowImageUploader] = useState(false);

  const initialState =
    catToEdit !== null
      ? { ...catToEdit }
      : ({
          name: '',
          age: 0,
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

  const hasId = !!cat.id;

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

  const onSelectButtonChange = (
    e: SelectButtonChangeEvent,
    type: SelectButtonType,
  ): void => {
    const { value } = e;

    if (type === 'marked') {
      setCat({ ...cat, marked: value });
    }

    if (type === 'insurance') {
      setCat({ ...cat, insurance: value });
    }

    if (type === 'alive') {
      if (value) {
        setCat({ ...cat, dead: false, alive: true });
      } else {
        setCat({ ...cat, dead: true, alive: false });
      }
    }
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

  const onSaveButtonClick = async (): Promise<void> => {
    if (hasId) {
      const res = await CatService.updateCat(cat.id, cat);

      if (res.status === 200) {
        fetchAllCats();

        if (wrapper === 'card') {
          navigate(Pages.Home);
        } else {
          setShowEditForm(false);
        }
      }
    } else {
      const res = await CatService.createCat(cat);

      if (res.status === 201) {
        fetchAllCats();

        if (wrapper === 'card') {
          navigate(Pages.Home);
        } else {
          setShowEditForm(false);
        }
      }
    }
  };

  const onClearButtonClick = (): void => {
    setCat(initialState);
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
          Name*
        </label>
        <InputText
          value={cat.name}
          onChange={onTextInputChange}
          name='name'
          id='name'
          aria-describedby='name-help'
          required
        />
        <small id='name-help'>Enter cat's name. (*required)</small>
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

      <div className='flex flex-column gap-2 mb-6'>
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

      <Fieldset legend='Short information' className='mb-6'>
        <div className={styles.toggles}>
          <SelectButton
            value={cat.marked}
            onChange={(e) => {
              onSelectButtonChange(e, 'marked');
            }}
            options={[
              { label: 'Marked', value: true },
              { label: 'Not marked', value: false },
            ]}
            name='marked'
            tooltip='Is cat marked?'
            tooltipOptions={{ position: 'top' }}
            allowEmpty={false}
          />

          <SelectButton
            value={cat.insurance}
            onChange={(e) => {
              onSelectButtonChange(e, 'insurance');
            }}
            options={[
              { label: 'Insurance', value: true },
              { label: 'No insurance', value: false },
            ]}
            name='insurance'
            tooltip='Does cat have insurance?'
            tooltipOptions={{ position: 'top' }}
            allowEmpty={false}
          />

          <SelectButton
            value={cat.alive}
            onChange={(e) => {
              onSelectButtonChange(e, 'alive');
            }}
            options={[
              { label: 'Alive', value: true },
              { label: 'Dead', value: false },
            ]}
            name='alive'
            tooltip='Is cat alive?'
            tooltipOptions={{ position: 'top' }}
            allowEmpty={false}
          />
        </div>
      </Fieldset>

      <span className='flex justify-content-center p-buttonset'>
        <Button
          onClick={onClearButtonClick}
          label={hasId ? 'Reset changes' : 'Clear'}
          icon='pi pi-trash'
          rounded
          raised
          size='large'
          severity='secondary'
          tooltip={hasId ? 'Reset changes' : 'Clear'}
          tooltipOptions={{ position: 'top' }}
        />

        <Button
          onClick={onSaveButtonClick}
          label={hasId ? 'Save changes' : 'Save'}
          icon='pi pi-save'
          rounded
          raised
          size='large'
          severity='help'
          disabled={!cat.name}
          tooltip={hasId ? 'Save changes' : 'Save'}
          tooltipOptions={{ position: 'top' }}
        />
      </span>
    </>
  );

  if (wrapper === 'card') {
    return <Card className={cn(styles.root, 'shadow-5')}>{form}</Card>;
  }

  return <div className={styles.root}>{form}</div>;
};

export default Form;
