import { useDropzone, FileRejection, DropEvent } from 'react-dropzone';
import "@/styles/dropzone.scss";
import React, { useCallback, useState, useMemo } from "react";

interface Props<T extends Blob | MediaSource> {
  files: T[];
  setFiles: React.Dispatch<React.SetStateAction<T[]>>;
}

export default function Dropzone<T extends Blob | MediaSource>({ files, setFiles }: Props<T>) {
  const [selectedImages, setSelectedImages] = useState<T[]>(files);

  const onDrop = useCallback((acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => {
    setFiles((curr) => [...curr, ...acceptedFiles]);
    acceptedFiles.forEach((file: T) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, [setFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop: onDrop as unknown as (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void });

  const style = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {})
    }),
    [isDragAccept, isDragReject]
  );

  return (
    <div className='dropzone-container'>
      <div className={'dropzone'} {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop file(s) here ...</p>
            :
            <p>Drag and drop file(s) here, or click to select files</p>
        }
      </div>
      <div className={'images'}>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
          ))}
      </div>
    </div>
  );
}
