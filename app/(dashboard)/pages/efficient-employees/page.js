'use client'
import { Container, Form } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import { useEffect, useState } from 'react'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import DropzoneComponent from '../../../../components/bootstrap/DropzoneComponent'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

function EfficientEmployees () {
 

  return (
    <>
      <Container fluid className='p-6'>
        {/* Page Heading */}
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Efficient Employees' />
        </div>

       
      </Container>
    </>
  )
}

export default EfficientEmployees
