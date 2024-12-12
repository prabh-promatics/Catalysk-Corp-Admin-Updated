// 'use client'
// // import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// // import 'rsuite/dist/rsuite.min.css';
// import React, { useEffect, useState } from 'react'
// import { Container } from 'react-bootstrap'
// import { PageHeading } from 'widgets'
// import Image from 'next/image'

// import { Steps, Panel, Placeholder, ButtonGroup, Button } from 'rsuite'

// function CorporateSustainabilityTargets () {
//   const [step, setStep] = React.useState(0)
//   const onChange = nextStep => {
//     setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep)
//   }

//   const onNext = () => onChange(step + 1)
//   const onPrevious = () => onChange(step - 1)

//   // Content for each step
//   const stepContent = [
//     <div>
//       <div className='row'>
//         <div className='col-lg-6'>
//           <div className='targetBox'>
//             <div className='targetImageBox'>
//               <Image
//                 src='/images/brand/electricity.svg'
//                 alt='electricity-logo'
//                 width={40}
//                 height={40}
//               />
//             </div>
//             <div>
//               <h5 className='mb-4'>
//                 Electricity Reduction Target{' '}
//                 <span className='fs-5 fw-medium'>(for FY 2024-25)</span>
//               </h5>
//               <div class='input-group'>
//                 <div className='form-floating is-invalid'>
//                   <input
//                     type='text'
//                     className='form-control'
//                     id='floatingInputGroup2'
//                     placeholder='Username'
//                     required
//                   />
//                   <label for='floatingInputGroup2'>Enter value</label>
//                 </div>
//                 <span className='input-group-text'>kWh</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='col-lg-6'>
//           <div className='targetBox'>
//             <div className='targetImageBox'>
//               <Image
//                 src='/images/brand/water.svg'
//                 alt='electricity-logo'
//                 width={40}
//                 height={40}
//               />
//             </div>
//             <div>
//               <h5 className='mb-4'>
//                 Water Reduction Target{' '}
//                 <span className='fs-5 fw-medium'>(for FY 2024-25)</span>
//               </h5>
//               <div class='input-group'>
//                 <div className='form-floating is-invalid'>
//                   <input
//                     type='text'
//                     className='form-control'
//                     id='floatingInputGroup2'
//                     placeholder='Username'
//                     required
//                   />
//                   <label for='floatingInputGroup2'>Enter value</label>
//                 </div>
//                 <span className='input-group-text'>L</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>,
//     <div>
//       <div className='row'>
//         <div className='col-lg-6'>
//           <div className='targetBox'>
//             <div className='targetImageBox'>
//               <Image
//                 src='/images/brand/catalysk.svg'
//                 alt='electricity-logo'
//                 width={40}
//                 height={40}
//               />
//             </div>
//             <div>
//               <h5 className='mb-4'>
//                 Target Registration Numbers{' '}
//                 <span className='fs-5 fw-medium'>(for FY 2024-25)</span>
//               </h5>
//               <div class='input-group'>
//                 <div className='form-floating is-invalid'>
//                   <input
//                     type='text'
//                     className='form-control'
//                     id='floatingInputGroup2'
//                     placeholder='Username'
//                     required
//                   />
//                   <label for='floatingInputGroup2'>
//                     Enter target registrations
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='col-lg-6'>
//           <div className='targetBox'>
//             <div className='targetImageBox'>
//               <Image
//                 src='/images/brand/catalysk.svg'
//                 alt='electricity-logo'
//                 width={40}
//                 height={40}
//               />
//             </div>
//             <div>
//               <h5 className='mb-4'>
//                 Target Savings on Catalysk{' '}
//                 <span className='fs-5 fw-medium'>(for FY 2024-25)</span>
//               </h5>
//               <div class='input-group'>
//                 <div className='form-floating is-invalid'>
//                   <input
//                     type='text'
//                     className='form-control'
//                     id='floatingInputGroup2'
//                     placeholder='Username'
//                     required
//                   />
//                   <label for='floatingInputGroup2'>
//                     Enter target savings (kWh, L, CO₂)
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   ]

//   return (
//     <>
//       <Container fluid className='p-6'>
//         {/* Page Heading */}
//         <div className='d-flex justify-content-between'>
//           <PageHeading heading='Corporate Sustainability Targets' />
//         </div>

//         <div>
//           <div className='mt-3'>
//             <Steps current={step}>
//               <Steps.Item
//                 title='Reduction Targets'
//                 description='Specify Reduction Targets'
//               />
//               <Steps.Item
//                 title='In Progress'
//                 description='Specify Saving Targets'
//               />
//             </Steps>
//             <hr />
//             <Panel header={`Step: ${step + 1}`}>
//               {/* <Placeholder.Paragraph /> */}
//               {stepContent[step]}{' '}
//               {/* Render content based on the current step */}
//             </Panel>
//             <hr />
//             <div className='d-flex justify-content-between align-items-center'>
//               <div>
//                 <button type='button' className='btnPrimary'>
//                   Save
//                 </button>
//               </div>
//               <ButtonGroup>
//                 <Button onClick={onPrevious} disabled={step === 0}>
//                   Previous
//                 </Button>
//                 <Button onClick={onNext} disabled={step === 1}>
//                   Next
//                 </Button>
//               </ButtonGroup>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   )
// }

// export default CorporateSustainabilityTargets

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import Image from 'next/image'

import DropzoneComponent from '../../../../components/bootstrap/DropzoneComponent'

function CorporateSustainabilityTargets () {
  const [isVisible, setIsVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedItem, setselectedItem] = useState([])
  /// Pagination
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  const [offsetentry, setoffsetentry] = useState(0)
  const [entry, setentry] = useState(0)
  const [search, setSearch] = useState('')
  const showFilters = () => {
    setIsVisible(!isVisible)
  }

  const nextPage = () => {
    const totalPages = Math.ceil(totalItems / pageSize)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const totalPages = Math.ceil(totalItems / pageSize)
  console.log('totalPages', totalPages, totalItems, pageSize)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const [value, setvalue] = useState('')

  const [files, setFiles] = useState([])

  const handleDrop = acceptedFiles => {
    setFiles(acceptedFiles)
    console.log(acceptedFiles) // Log or handle files here
  }

  return (
    <>
      <Container fluid className='p-6'>
        {/* Page Heading */}
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Coprorate Sustainability Targets' />
          <div className='d-flex items-center gap-3'>
            {/* <div>
              <Link href='/pages/invoices-data' passHref>
                <button type='button' className='btnPrimary'>
                  Employees Data
                </button>
              </Link>
            </div> */}
            {/* <div className="dropdown"> */}
            <button
              className='btnPrimary '
             
            >
              <i className='fe fe-download me-2'></i>Export
            </button>
            
            {/* </div>sss */}
          </div>
        </div>

        <div className='main-content-wrapper'>
          <div>
            <div className='row mb-5'>
              <div className='col-lg-6'>
                <div className='targetBox'>
                  <div className='targetImageBox'>
                    <Image
                      src='/images/brand/catalysk.svg'
                      alt='electricity-logo'
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h5 className='mb-4'>
                      Total Registered Employees{' '}
                      {/* <span className='fs-5 fw-medium'>(for FY 2024-25)</span> */}
                    </h5>
                    <div class='input-group'>
                      <div className='form-floating is-invalid'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingInputGroup2'
                          placeholder='Username'
                          required
                        />
                        <label for='floatingInputGroup2'>
                          Enter Total no. of Registered Employees
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6'>
                <div className='targetBox'>
                  <div className='targetImageBox'>
                    <Image
                      src='/images/brand/catalysk.svg'
                      alt='electricity-logo'
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h5 className='mb-4'>
                      Target Registered Employees{' '}
                      <span className='fs-5 fw-medium'>(for FY 2024-25)</span>
                    </h5>
                    <div class='input-group'>
                      <div className='form-floating is-invalid'>
                        <input
                          type='text'
                          className='form-control'
                          id='floatingInputGroup2'
                          placeholder='Username'
                          required
                        />
                        <label for='floatingInputGroup2'>
                          Enter Target Registered Employees
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card'>
            <div className='card-body'>
              <div className='filters-options-sec'>
                <div className='flxx'>
                  <div className='search-bar'>
                    {/* Search Form */}
                    <Form className='d-flex align-items-center'>
                      <Form.Control
                        type='search'
                        placeholder='Search'
                        onChange={e => setSearch(e.target.value)}
                      />
                    </Form>
                  </div>
                  <div className='bttns-sec'>
                    <button
                      className='btn btn-outline-white'
                      onClick={showFilters}
                    >
                      <i className='fe fe-sliders me-2'></i> Filter
                    </button>

                    <div
                      className="dropdown"
                    >
                      <button
                        className='btn btn-outline-white bulk-action-btn dropdown-toggle'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <span>
                          <i className='fe fe-more-vertical'></i>
                        </span>
                      </button>
                      <ul className='dropdown-menu'>
                        <li>
                          <a
                            className='dropdown-item'
                            data-bs-toggle='modal'
                            data-bs-target='#blockall-mddl'
                          >
                            Export
                          </a>
                        </li>
                        <li>
                          <a
                            className='dropdown-item'
                            data-bs-toggle='modal'
                            data-bs-target='#deleteall-mddl'
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {isVisible && (
                  <div className='sub-filter-sec'>
                    <div>
                      <h4 className='mb-0'>Filters : </h4>
                    </div>
                    <div class='stts-flter'>
                      <select className='form-control form-select'>
                        <option disabled selected>
                          Status
                        </option>
                        <option value='active'>Active</option>
                        <option value='block'>Blocked</option>
                      </select>
                    </div>

                    <div class='stts-flter'>
                      <select className='form-control form-select'>
                        <option disabled selected>
                          Type
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
                )}
              </div>
              <div className='table-div'>
                <div className='table-responsive'>
                  <table className='table table-striped'>
                    <thead>
                      <tr>
                        <th scope='col'>
                          <input type='checkbox' class='form-check-input' />
                        </th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Total potential reduction 12 months</th>
                        <th scope='col'>Target 12 months</th>
                        <th scope='col'>Target (median) 12 months</th>
                        {/* <th scope='col'>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {' '}
                          <input
                            type='checkbox'
                            class='form-check-input'
                          />{' '}
                        </td>
                        <td>
                          Electricity reduction <br /> (kWh/yr)
                        </td>
                        <td>15,000 kWh</td>
                        <td>
                          <div class='input-group'>
                            <div className='form-floating is-invalid'>
                              <input
                                type='text'
                                className='form-control'
                                id='floatingInputGroup2'
                                placeholder='Username'
                                required
                              />
                              <label for='floatingInputGroup2'>
                                Enter value
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>10,000 kWh</td>
                      </tr>
                      <tr>
                        <td>
                          {' '}
                          <input
                            type='checkbox'
                            class='form-check-input'
                          />{' '}
                        </td>
                        <td>
                          Water reduction <br /> (Litres/yr)
                        </td>
                        <td>20,000 Litres</td>
                        <td>
                          <div class='input-group'>
                            <div className='form-floating is-invalid'>
                              <input
                                type='text'
                                className='form-control'
                                id='floatingInputGroup2'
                                placeholder='Username'
                                required
                              />
                              <label for='floatingInputGroup2'>
                                Enter value
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>15,000 Litres
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {' '}
                          <input
                            type='checkbox'
                            class='form-check-input'
                          />{' '}
                        </td>
                        <td>
                          Emissions reduction <br /> (kg Co2e / yr)
                        </td>
                        <td>5,000 kg CO2e</td>
                        <td>
                          <div class='input-group'>
                            <div className='form-floating is-invalid'>
                              <input
                                type='text'
                                className='form-control'
                                id='floatingInputGroup2'
                                placeholder='Username'
                                required
                              />
                              <label for='floatingInputGroup2'>
                                Enter value
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>3,500 kg CO2e</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='pagination-div'>
                  <nav aria-label='...'>
                    <ul class='pagination'>
                      <li class='page-item disabled'>
                        <span>
                          <a
                            class='page-link'
                            onClick={prevPage}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </a>
                        </span>
                      </li>
                      {pageNumbers.map(pageNumber => {
                        let pagetominus = 2
                        let pagetoplus = 2

                        if (currentPage == 1) {
                          pagetominus = 1
                          pagetoplus = 4
                        } else if (currentPage == 2) {
                          pagetominus = 2
                          pagetoplus = 3
                        } else if (currentPage == 3) {
                          pagetominus = 3
                          pagetoplus = 2
                        } else if (currentPage + 1 == totalPages) {
                          pagetominus = 3
                          pagetoplus = 2
                        } else if (currentPage == totalPages) {
                          pagetominus = 4
                          pagetoplus = 2
                        }

                        const minPage = Math.max(1, currentPage - pagetominus)
                        const maxPage = Math.min(
                          totalPages,
                          currentPage + pagetoplus
                        )

                        //console.log("minPage", minPage);
                        //console.log("maxPage", maxPage);

                        if (pageNumber >= minPage && pageNumber <= maxPage) {
                          return (
                            <li
                              key={pageNumber}
                              className={`page-item ${
                                currentPage === pageNumber ? 'active' : ''
                              }`}
                            >
                              <button
                                className={`page-link ${
                                  currentPage === pageNumber
                                    ? 'bg-dark text-white border-dark'
                                    : 'text-dark'
                                }`}
                                onClick={() => setCurrentPage(pageNumber)}
                              >
                                <b>{pageNumber}</b>
                              </button>
                            </li>
                          )
                        }
                        return null
                      })}

                      <li class='page-item'>
                        <a class='page-link' onClick={nextPage}>
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* modals */}

        {/* <!-- Modal --> */}

        <div
          class='modal fade'
          id='delete-mddl'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Delete User
                </h1>
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body'>
                <div className='dlt-mdl'>
                  <h4 className='text-center'>
                    Are you sure you want to delete this user?
                  </h4>
                </div>
              </div>
              <div class='modal-footer'>
                <button type='button' class='btn btn-primary'>
                  Delete
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class='modal fade'
          id='deleteall-mddl'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Delete User
                </h1>
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body'>
                <div className='dlt-mdl'>
                  <h4 className='text-center'>
                    Are you sure you want to delete users?
                  </h4>
                </div>
              </div>
              <div class='modal-footer'>
                <button type='button' class='btn btn-primary'>
                  Delete
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!--Block- Modal --> */}

        <div
          class='modal fade'
          id='block-mddl'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Activate Employee
                </h1>
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body'>
                <div className='dlt-mdl'>
                  <h4 className='text-center'>
                    Are you sure you want to activate this employee?
                  </h4>
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btnPrimary'
                  data-bs-dismiss='modal'
                >
                  Activate
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class='modal fade'
          id='deActivateModal'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Deactivate Employees
                </h1>
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body'>
                <div className='dlt-mdl'>
                  <h5>Drop File Below:</h5>
                  <DropzoneComponent
                    onDrop={handleDrop}
                    acceptedFiles='.jpg,.png,.pdf'
                  />
                  <div className='mt-3'>
                    <h5>Files Selected:</h5>
                    <ul>
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btnPrimary'
                  data-bs-dismiss='modal'
                >
                  Deactivate
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class='modal fade'
          id='unblock-mddl'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Deactivate Employee
                </h1>
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div class='modal-body'>
                <div className='dlt-mdl'>
                  <h5 className=''>Enter Deactivation Date</h5>
                </div>
                <Form className='d-flex align-items-center'>
                  <Form.Control
                    type='date'
                    placeholder='Enter Deactivation Date'
                  />
                </Form>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btnPrimary'
                  data-bs-dismiss='modal'
                >
                  Deactivate
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default CorporateSustainabilityTargets
