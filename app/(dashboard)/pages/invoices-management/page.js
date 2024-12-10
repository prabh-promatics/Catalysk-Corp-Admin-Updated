'use client'
// import node module libraries
import { Container, Form } from 'react-bootstrap'

// import widget as custom components
import { PageHeading } from 'widgets'

// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useEffect, useState } from 'react'
// import DropzoneComponent from '../../../../components/bootstrap/DropzoneComponent'

// import sub components
import Link from 'next/link'

// hide show filters

function InvoicesManagement () {
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

  const [token, setToken] = useState('')

  useEffect(() => {
    // Only runs on the client-side
    const tokenFromLocalStorage = localStorage.getItem('token')
    setToken(tokenFromLocalStorage || '')
  }, [])

  useEffect(() => {
    // getdoc();
  }, [currentPage, search, token])
  //  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
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
          <PageHeading heading='Invoices Management' />
          <div className='d-flex items-center gap-3'>
            <div>
              {/* <button type="button" className="btnPrimary" >Employees Data</button> */}
              <Link href='/pages/invoices-data' passHref>
                <button type='button' className='btnPrimary'>
                  Employees Data
                </button>
              </Link>
            </div>
            {/* <div className="dropdown"> */}
            <button
              className='btnPrimary dropdown-toggle'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <i className='fe fe-download me-2'></i>Export
            </button>
            <ul className='dropdown-menu'>
              <li>
                <a
                  // onClick={(e) => blockid(tdata._id)}
                  className='dropdown-item'
                  data-bs-toggle='modal'
                  data-bs-target='#block-mddl'
                >
                  Pdf
                </a>
              </li>
              <li>
                <a
                  // onClick={(e) => blockid(tdata._id)}
                  className='dropdown-item'
                  data-bs-toggle='modal'
                  data-bs-target='#unblock-mddl'
                >
                  CSV
                </a>
              </li>
              <li>
                <a
                  // onClick={(e) => blockid(tdata._id)}
                  className='dropdown-item'
                  data-bs-toggle='modal'
                  data-bs-target='#delete-mddl'
                >
                  Excel
                </a>
              </li>
            </ul>
            {/* </div>sss */}
          </div>
        </div>

        <div className='main-content-wrapper'>
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
                      className='btn btn-outline-white bulk-action-btn dropdown-toggle'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <span
                        className='dropdown-toggle'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                      >
                        <i className='fe fe-more-vertical'></i>
                      </span>
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
                        <th scope='col'>Invoice Number</th>
                        <th scope='col'>Invoice Date</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
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
                        <td>INV-12345</td>
                        <td>Oct 25, 2024</td>
                        <td>$500</td>
                        <td>
                          <p className='text-danger'>Due: Nov 25, 2024</p>
                        </td>
                        <td className='action-td'>
                          <div className='dropdown'>
                            <span
                              className='cstmDropdown dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='fe fe-more-vertical'></i>
                            </span>
                            <ul className='dropdown-menu'>
                              <li>
                                <a
                                  className='dropdown-item'
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#block-mddl"
                                >
                                  Request PDF
                                </a>
                              </li>
                            </ul>
                          </div>
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
                        <td>INV-12345</td>
                        <td>Oct 25, 2024</td>
                        <td>$500</td>
                        <td>
                          <p className='text-success'>Paid: Oct 20, 2024</p>
                        </td>
                        <td className='action-td'>
                          <div className='dropdown'>
                            <span
                              className='cstmDropdown dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='fe fe-more-vertical'></i>
                            </span>
                            <ul className='dropdown-menu'>
                              <li>
                                <a className='dropdown-item'>Request PDF</a>
                              </li>
                            </ul>
                          </div>
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
                        <td>INV-12345</td>
                        <td>Oct 25, 2024</td>
                        <td>$500</td>
                        <td>
                          <p className='text-danger'>Due: Nov 25, 2024</p>
                        </td>
                        <td className='action-td'>
                          <div className='dropdown'>
                            <span
                              className='cstmDropdown dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='fe fe-more-vertical'></i>
                            </span>
                            <ul className='dropdown-menu'>
                              <li>
                                <a
                                  className='dropdown-item'
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#block-mddl"
                                >
                                  Request PDF
                                </a>
                              </li>
                            </ul>
                          </div>
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
                        <td>INV-12345</td>
                        <td>Oct 25, 2024</td>
                        <td>$500</td>
                        <td>
                          <p className='text-danger'>Due: Nov 25, 2024</p>
                        </td>
                        <td className='action-td'>
                          <div className='dropdown'>
                            <span
                              className='cstmDropdown dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='fe fe-more-vertical'></i>
                            </span>
                            <ul className='dropdown-menu'>
                              <li>
                                <a
                                  className='dropdown-item'
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#block-mddl"
                                >
                                  Request PDF
                                </a>
                              </li>
                            </ul>
                          </div>
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
                        <td>INV-12345</td>
                        <td>Oct 25, 2024</td>
                        <td>$500</td>
                        <td>
                          <p className='text-success'>Paid: Oct 20, 2024</p>
                        </td>
                        <td className='action-td'>
                          <div className='dropdown'>
                            <span
                              className='cstmDropdown dropdown-toggle'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              <i className='fe fe-more-vertical'></i>
                            </span>
                            <ul className='dropdown-menu'>
                              <li>
                                <a
                                  className='dropdown-item'
                                  // data-bs-toggle="modal"
                                  // data-bs-target="#block-mddl"
                                >
                                  Request PDF
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
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
                  {/* <DropzoneComponent
                    onDrop={handleDrop}
                    acceptedFiles='.jpg,.png,.pdf'
                  /> */}
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

export default InvoicesManagement
