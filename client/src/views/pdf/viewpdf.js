import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable
} from '@coreui/react'
import SinglePagePDFViewer from "./single-page";
import dummy1 from "./uploads/cheatsheet1.pdf";
import usersData from '../users/UsersData.js';
const fields = ['name','registered', 'role', 'status']


function VwPdf() {
  return (
   
    <div className="App">
      <div className='container'>
        <div className='row'>
        <div className='col' md={6} sm={12}>
          <h4>Single Page</h4>
          <SinglePagePDFViewer pdf={dummy1} />
        </div>

        <div className='col' md={6} sm={12}>
        <CCol > 
        <h4>Thumbnails Here</h4>
        
          <CCard>
            <CCardHeader>
              Striped Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={usersData}
              fields={fields}
              striped
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      
                    </td>
                  )

              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
        </div>
      <hr />

        </div>
      </div>
    </div>
    
  );
}

export default VwPdf;
