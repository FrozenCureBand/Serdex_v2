import { useState } from 'react'
import './App.css'
import PdfDropzone from './components/PdfDropzone';
import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

function App() {
  const [pdfFiles, setPdfFiles] = useState([])
  const [pdfData, setPdfData] = useState([])

  const handleFileUpload = (files) => {
    setPdfFiles(files)

    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result)
        const pdf = await pdfjsLib.getDocument(typedArray).promise
        let text = ''
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const pageText = content.items.map(item => item.str).join(' ')
          text += pageText + '\n'
        }

        // Aquí parseamos a columnas (ejemplo simple)
        const lines = text.split('\n').filter(line => line.trim() !== '')
        const parsedData = lines.map(line => {
          const parts = line.split(' ')
          return {
            nombre: parts[0] || '',
            edad: parts[1] || '',
            email: parts[2] || ''
          }
        })

        setPdfData(prev => [...prev, ...parsedData])
      }
      reader.readAsArrayBuffer(file)
    })
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Serdex v2</h1>

      <div className="dropzone-container">
        <PdfDropzone onFileUpload={handleFileUpload} />
      </div>

      {pdfData.length > 0 && (
        <div className="table-wrapper">
          <table className="pdf-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {pdfData.map((row, index) => (
                <tr key={index}>
                  <td>{row.nombre}</td>
                  <td>{row.edad}</td>
                  <td>{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
