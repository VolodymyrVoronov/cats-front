import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Button } from 'primereact/button';
import cn from 'classnames';

import styles from './ImageUploader.module.css';

interface IImageUploaderProps {
  onSaveImageClick: (image: string) => void;
}

const ImageUploader = ({
  onSaveImageClick,
}: IImageUploaderProps): JSX.Element => {
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const convertToBase64 = (
    file: File,
  ): Promise<string | ArrayBuffer | null> => {
    setLoading(true);

    return new Promise((resolve, reject): void => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        setLoading(false);
      };

      fileReader.onerror = (error) => {
        reject(error);
        setLoading(false);
      };
    });
  };

  const onUploadFileButtonClick = async (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);

      if (base64) {
        setImage(base64 as string);
      }
    }
  };

  const onDeleteImageButtonClick = (): void => {
    setImage('');
  };

  const onSaveImageButtonClick = (): void => {
    onSaveImageClick(image);
  };

  return (
    <div className={styles.root}>
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={styles['root-overlay']}
      />

      {image ? (
        <div
          className={cn(styles['image-preview'], 'shadow-5')}
          style={{ backgroundImage: `url(${image})` }}
        />
      ) : (
        <img
          className={cn(styles['image-preview'], 'shadow-5')}
          src='assets/black-cat.png'
        />
      )}

      <span className='p-buttonset mt-5'>
        <Button
          className={styles['upload-button']}
          label='Upload'
          icon='pi pi-upload'
          size='small'
          rounded
          tooltip='Upload new photo'
          tooltipOptions={{ position: 'top' }}
          disabled={loading}
        >
          <input
            className={styles['upload-input']}
            name='photo'
            type='file'
            accept='image/*'
            onChange={onUploadFileButtonClick}
          />
        </Button>
        <Button
          onClick={onDeleteImageButtonClick}
          disabled={!image}
          label='Delete'
          icon='pi pi-trash'
          size='small'
          rounded
          tooltip='Delete current photo'
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          onClick={onSaveImageButtonClick}
          disabled={!image}
          label='Save'
          icon='pi pi-save'
          size='small'
          rounded
          tooltip='Save photo'
          tooltipOptions={{ position: 'top' }}
        />
      </span>
    </div>
  );
};

export default ImageUploader;
