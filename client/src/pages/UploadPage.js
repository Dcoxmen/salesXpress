import React from 'react'
import FileUpload from '../components/FileUpload/FileUpload'

function UploadPage() {

    return (
        <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
       Document File Upload
    </h4>
    <p>Note: Files uploaded for this app are for the document library system. Image files will be displayed immediately
      upon a successful upload. Other file types like PDF, DOCX, EXCL will not display. A default image clarifying next steps
      will be displayed. </p>

    <FileUpload />
    
  </div>
    )
}

export default UploadPage