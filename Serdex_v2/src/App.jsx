import { useState } from 'react'
import './App.css'
import PdfDropzone from './components/PdfDropzone';

function App() {
  const [pdfFiles, setPdfFiles] = useState([])

  const handleFileUpload = (files) => {
    setPdfFiles(files)
    console.log(files) // Ver los PDFs en la consola
  }

  return (
    <div style={{
      backgroundColor: '#1a1a1a', // Fondo oscuro
      minHeight: '100vh',
      color: '#fff', // Texto blanco
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '40px' }}>Serdex v2</h1>

      {/* Cuadro para arrastrar PDFs */}
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <PdfDropzone onFileUpload={handleFileUpload} />
      </div>

      {/* Listado de PDFs */}
      {pdfFiles.length > 0 && (
        <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
          {pdfFiles.map((file, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
