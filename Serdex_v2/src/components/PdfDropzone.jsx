import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function PdfDropzone({ onFileUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Filtramos solo PDFs
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    onFileUpload(pdfFiles);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{
      border: '2px dashed #888',
      padding: '20px',
      textAlign: 'center',
      borderRadius: '8px',
      cursor: 'pointer'
    }}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Suelta los archivos aquí...</p>
          : <p>Arrastra tus PDFs aquí, o haz clic para seleccionarlos</p>
      }
    </div>
  );
}

export default PdfDropzone;
