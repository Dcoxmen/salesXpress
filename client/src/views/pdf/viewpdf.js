import React from 'react'
import SinglePagePDFViewer from "./single-page";
import dummy1 from "./uploads/cheatsheet1.pdf";




function VwPdf() {
  return (
   
    <div className="App">
      <div className='container'>
        <div className='row'>
        <div className='col' sm={8}>
          <h4>Single Page</h4>
          <SinglePagePDFViewer pdf={dummy1} />
        </div>

        <div className='col' sm={4}>
        <h4>Thumbnails Here</h4>
         
        </div>
      <hr />

        </div>
      </div>
    </div>
    
  );
}

export default VwPdf;
