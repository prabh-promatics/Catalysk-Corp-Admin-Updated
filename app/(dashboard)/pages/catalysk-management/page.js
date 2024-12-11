'use client'

import { Card, Container } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import { Input } from 'rsuite'

function CatalyskManagement () {
  return (
    <>
      <Container fluid className='p-6'>
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Catalysk Management' />
        </div>

        {/* <Card className='mb-5'>
          <div className='myFilterOptions'>
            <div className='myFilters'>
              <div class='my-stts-flter'>
                <input
                  type='email'
                  class='form-control'
                  id='exampleFormControlInput1'
                  placeholder='Search templates...'
                />
              </div>

              <div class='stts-flter'>
                <select className='form-control form-select'>
                  <option disabled selected>
                    Filter by Type
                  </option>
                  <option value='individual'>Individual</option>
                  <option value='corporate'>Corporate</option>
                </select>
              </div>

              <div class='stts-flter'>
                <input
                  className='form-control'
                  type='date'
                  name='start_time'
                  onChange={e => handleInputChangenew(e)}
                />
              </div>
            </div>
          </div>
        </Card> */}

        <Card className='p-3'>
          <div className='colsContainer mb-5'>
            <div className='colBody'>
              <div className='colHeader mb-3'>
                <h5>Catalysk Liaison Officers</h5>
              </div>
              <div className='colPoints'>
                <div className='colPoint'>
                  <div className='row'>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Enter Name</p>
                      <Input type='text' placeholder='Enter Name' />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Enter Email</p>
                      <Input type='email' placeholder='Enter Email' />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Enter Contact No.</p>
                      <Input type='text' placeholder='Enter Contact No.' />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>
                        Enter Additional Notes
                      </p>
                      <Input
                        as='textarea'
                        rows={3}
                        placeholder='Enter Additional Notes'
                      />
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <button
                    className='btnPrimary dropdown-toggle'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <i className='fe fe-plus me-2'></i>Add more
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='colsContainer mb-5'>
            <div className='colBody'>
              <div className='colHeader mb-3'>
                <h5>Catalysk Company Details</h5>
              </div>
              <div className='colPoints'>
                <div className='colPoint'>
                  <div className='row'>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Company Full Name</p>
                      <Input type='text' placeholder='Enter Company Full Name' />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Bank Account No.</p>
                      <Input type='text' placeholder='Enter Bank Account No.' />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Enter GSTIN No.</p>
                      <Input type='text' placeholder='Enter Contact No.' />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Enter MSME No.</p>
                      <Input type='text' placeholder='Enter Contact No.' />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>
                        Registered Address
                      </p>
                      <Input
                        as='textarea'
                        rows={3}
                        placeholder='Enter Registered Address'
                      />
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <button
                    className='btnPrimary dropdown-toggle'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </Card>
      </Container>
    </>
  )
}

export default CatalyskManagement
