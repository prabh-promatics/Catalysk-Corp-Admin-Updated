'use client'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useEffect, useState } from 'react'
import { Container, Form, Card } from 'react-bootstrap'
//import { Input } from 'rsuite'
import { PageHeading } from 'widgets'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

function AdminManagement () {
  const [isVisible, setIsVisible] = useState(false)

  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const showFilters = () => {
    setIsVisible(!isVisible)
  }

  const [token, setToken] = useState('')

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token')
    setToken(tokenFromLocalStorage || '')
  }, [])

  useEffect(() => {}, [currentPage, search, token])

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

  return (
    <>
      <Container fluid className='p-6'>
        {/* Page Heading */}
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Admin Management' />
        </div>

        <Tabs
          defaultActiveKey='superAdmins'
          id='uncontrolled-tab-example'
          className='mb-3'
        >
          <Tab eventKey='superAdmins' title='Super Admins'>
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

                        <button
                          className='btnPrimary'
                          data-bs-toggle='modal'
                          data-bs-target='#addAdmin'
                        >
                          <i className='fe fe-plus me-2'></i>
                          Invite New Admin
                        </button>
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
                            <th scope='col'>Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Office</th>
                            <th scope='col'>Role</th>
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
                            <td>John</td>
                            <td>john.doe@corp.com</td>
                            <td>HQ, New York</td>
                            <td>Super Admin</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>Jane Smith</td>
                            <td>jane.smith@corp.com</td>
                            <td>Regional, LA</td>
                            <td>Super Admin</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>Luckar</td>
                            <td>luckar.doe@corp.com</td>
                            <td>HQ, New York</td>
                            <td>Super Admin</td>
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

                            const minPage = Math.max(
                              1,
                              currentPage - pagetominus
                            )
                            const maxPage = Math.min(
                              totalPages,
                              currentPage + pagetoplus
                            )

                            //console.log("minPage", minPage);
                            //console.log("maxPage", maxPage);

                            if (
                              pageNumber >= minPage &&
                              pageNumber <= maxPage
                            ) {
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
          </Tab>

          <Tab eventKey='adminsList' title='Admins List'>
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
                            <th scope='col'>Admin Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Office Building</th>
                            <th scope='col'>Department</th>
                            <th scope='col'>Role</th>
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
                            <td>Sarah Johnson</td>
                            <td>sarah.j@corp.com</td>
                            <td>HQ, New York</td>
                            <td>HR</td>
                            <td>Regular Admin</td>
                            <td>
                              <p className='text-success'>Active</p>
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
                                    <a className='dropdown-item'>
                                      Left company
                                    </a>
                                  </li>
                                  <li>
                                    <a className='dropdown-item'>
                                      Not an admin anymore
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
                            <td>Michael Brown</td>
                            <td>michael.b@corp.com</td>
                            <td>Regional, LA</td>
                            <td>Operations</td>
                            <td>Regular Admin</td>
                            <td>
                              <p className='text-danger'>Left Company (auto)</p>
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
                                    <a className='dropdown-item'>
                                      Left company
                                    </a>
                                  </li>
                                  <li>
                                    <a className='dropdown-item'>
                                      Not an admin anymore
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
                            <td>Sarah Johnson</td>
                            <td>sarah.j@corp.com</td>
                            <td>HQ, New York</td>
                            <td>HR</td>
                            <td>Regular Admin</td>
                            <td>
                              <p className='text-success'>Active</p>
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
                                    <a className='dropdown-item'>
                                      Left company
                                    </a>
                                  </li>
                                  <li>
                                    <a className='dropdown-item'>
                                      Not an admin anymore
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
                            <td>Sarah Johnson</td>
                            <td>sarah.j@corp.com</td>
                            <td>HQ, New York</td>
                            <td>HR</td>
                            <td>Regular Admin</td>
                            <td>
                              <p className='text-success'>Active</p>
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
                                    <a className='dropdown-item'>
                                      Left company
                                    </a>
                                  </li>
                                  <li>
                                    <a className='dropdown-item'>
                                      Not an admin anymore
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

                            const minPage = Math.max(
                              1,
                              currentPage - pagetominus
                            )
                            const maxPage = Math.min(
                              totalPages,
                              currentPage + pagetoplus
                            )

                            //console.log("minPage", minPage);
                            //console.log("maxPage", maxPage);

                            if (
                              pageNumber >= minPage &&
                              pageNumber <= maxPage
                            ) {
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
          </Tab>

          <Tab eventKey='corporateSettings' title='Corporate Settings'>
            <div className='main-content-wrapper'>
              <Card className='mb-5'>
                <div className='myFilterOptions'>
                  <div className='myFilters align-items-end justify-content-between'>
                    <div class='my-stts-flter'>
                      {/* <input type="search" placeholder='Search Templates'/> */}
                      <p className='fs-5 fw-bold mb-2'>
                        Whitelisted Email Domains
                      </p>
                      <input
                        type='text'
                        class='form-control'
                        id='exampleFormControlInput1'
                        placeholder='Enter Whitelisted Email Domain'
                      />
                    </div>
                    <button className='btnPrimary'>
                      <i className='fe fe-plus me-2'></i>Add More
                    </button>
                  </div>
                </div>
              </Card>

              <div className='card mb-4'>
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

                        <button
                          className='btnPrimary'
                          data-bs-toggle='modal'
                          data-bs-target='#addBuilding'
                        >
                          <i className='fe fe-plus me-2'></i>Add New Building
                        </button>
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
                            <th scope='col'> Name</th>
                            <th scope='col'>Address</th>
                            <th scope='col'>Zip Code</th>
                            <th scope='col'>Assigned Admin</th>
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
                            <td>HQ, New York</td>
                            <td>123 Main St, New York, NY</td>
                            <td>10001</td>
                            <td>John Doe</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>Regional, Los Angeles</td>
                            <td>456 West St, LA, CA</td>
                            <td>90001</td>
                            <td>Jane Smith</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>HQ, New York</td>
                            <td>123 Main St, New York, NY</td>
                            <td>10001</td>
                            <td>John Doe</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>HQ, New York</td>
                            <td>123 Main St, New York, NY</td>
                            <td>10001</td>
                            <td>John Doe</td>
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

                            const minPage = Math.max(
                              1,
                              currentPage - pagetominus
                            )
                            const maxPage = Math.min(
                              totalPages,
                              currentPage + pagetoplus
                            )

                            //console.log("minPage", minPage);
                            //console.log("maxPage", maxPage);

                            if (
                              pageNumber >= minPage &&
                              pageNumber <= maxPage
                            ) {
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

                        <button
                          className='btnPrimary'
                          data-bs-toggle='modal'
                          data-bs-target='#addDepartment'
                        >
                          <i className='fe fe-plus me-2'></i>Add New Department
                        </button>
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
                            <th scope='col'>Department</th>
                            <th scope='col'>Assigned Admin</th>
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
                            <td>HR</td>
                            <td>John Doe</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>Operations</td>
                            <td>Michael Brown</td>
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

                            const minPage = Math.max(
                              1,
                              currentPage - pagetominus
                            )
                            const maxPage = Math.min(
                              totalPages,
                              currentPage + pagetoplus
                            )

                            //console.log("minPage", minPage);
                            //console.log("maxPage", maxPage);

                            if (
                              pageNumber >= minPage &&
                              pageNumber <= maxPage
                            ) {
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
          </Tab>

          <Tab eventKey='fleetDetails' title='Fleet Details'>
            <Card className='mb-5'>
              <div className='myFilterOptions'>
                <div className='myFilters align-items-end justify-content-between'>
                  <div class='my-stts-flter'>
                    {/* <input type="search" placeholder='Search Templates'/> */}
                    <p className='fs-5 fw-bold mb-2'>Fuel Type</p>
                    <select className='form-control form-select'>
                      <option disabled selected>
                        Select Fuel Type
                      </option>
                      <option value='active'>Gasoline</option>
                      <option value='block'>Diesel</option>
                      <option value='block'>Electric</option>
                    </select>
                  </div>
                  <div class='my-stts-flter'>
                    {/* <input type="search" placeholder='Search Templates'/> */}
                    <p className='fs-5 fw-bold mb-2'>Car Type</p>
                    <select className='form-control form-select'>
                      <option disabled selected>
                        Select Car Type
                      </option>
                      <option value='active'>Sedan</option>
                      <option value='block'>SUV</option>
                      <option value='block'>Truck</option>
                    </select>
                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-center mt-4 mb-5'>
                  <button className='btnPrimary'>
                    Save
                  </button>
                </div>
              </div>
            </Card>
          </Tab>

          <Tab eventKey='securityLogs' title='Security Logs'>
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

                        {/* <button
                          className='btnPrimary'
                          data-bs-toggle='modal'
                          data-bs-target='#addAdmin'
                        >
                          <i className='fe fe-plus me-2'></i>
                          Invite New Admin
                        </button> */}
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
                            <th scope='col'>Date</th>
                            <th scope='col'>Action</th>
                            <th scope='col'>Admin</th>
                            <th scope='col'>Notes</th>
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
                            <td>2024-11-15</td>
                            <td>Downloaded Employee Report</td>
                            <td>Jane Smith</td>
                            <td>Quarterly Report</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>2024-11-16</td>
                            <td>Deactivated Employee</td>
                            <td>John Doe</td>
                            <td>Employee ID 1234</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>2024-11-15</td>
                            <td>Downloaded Employee Report</td>
                            <td>Jane Smith</td>
                            <td>Quarterly Report</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>2024-11-15</td>
                            <td>Downloaded Employee Report</td>
                            <td>Jane Smith</td>
                            <td>Quarterly Report</td>
                          </tr>
                          <tr>
                            <td>
                              {' '}
                              <input
                                type='checkbox'
                                class='form-check-input'
                              />{' '}
                            </td>
                            <td>2024-11-15</td>
                            <td>Downloaded Employee Report</td>
                            <td>Jane Smith</td>
                            <td>Quarterly Report</td>
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

                            const minPage = Math.max(
                              1,
                              currentPage - pagetominus
                            )
                            const maxPage = Math.min(
                              totalPages,
                              currentPage + pagetoplus
                            )

                            //console.log("minPage", minPage);
                            //console.log("maxPage", maxPage);

                            if (
                              pageNumber >= minPage &&
                              pageNumber <= maxPage
                            ) {
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
          </Tab>
        </Tabs>

        {/* modals */}

        <div
          class='modal fade'
          id='addAdmin'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Invite New Admin
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
                  <p className='fs-5 fw-bold mb-2'>Enter Corporate Email</p>
                  <Input
                    type='email'
                    placeholder='Enter Corporate Email'
                    className='mb-3'
                  />
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btnPrimary'
                  data-bs-dismiss='modal'
                >
                  Send Invite
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class='modal fade'
          id='addBuilding'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Add New Building
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
                  <div className='mb-4'>
                    <p className='fs-5 fw-bold mb-2'>Enter Name</p>
                    <Input type='email' placeholder='Enter Name' />
                  </div>
                  <div className='mb-4'>
                    <p className='fs-5 fw-bold mb-2'>Enter Address</p>
                    <Input
                      as='textarea'
                      rows={3}
                      placeholder='Enter Address'
                    />{' '}
                  </div>
                  <div className='mb-4'>
                    <p className='fs-5 fw-bold mb-2'>Enter Zip Code</p>
                    <Input type='email' placeholder='Enter Zip Code' />
                  </div>
                  <div className='mb-4'>
                    <p className='fs-5 fw-bold mb-2'>Assigned Admin</p>
                    <select className='form-control form-select'>
                      <option disabled selected>
                        Select Assigned Admin
                      </option>
                      <option value='active'>John Doe</option>
                      <option value='block'>Jane Smith</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btnPrimary'
                  data-bs-dismiss='modal'
                >
                  Add Building
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          class='modal fade'
          id='addDepartment'
          tabindex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h1 class='modal-title fs-4' id='exampleModalLabel'>
                  Add New Department
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
                  <div className='mb-4'>
                    <p className='fs-5 fw-bold mb-2'>Enter Department Name</p>
                    <Input type='email' placeholder='Enter Name' />
                  </div>
                  <div className='mb-4'>
                    <p className='fs-5 fw-bold mb-2'>Assigned Admin</p>
                    <select className='form-control form-select'>
                      <option disabled selected>
                        Select Assigned Admin
                      </option>
                      <option value='active'>John Doe</option>
                      <option value='block'>Jane Smith</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btnPrimary'
                  data-bs-dismiss='modal'
                >
                  Add Department
                </button>
                <button
                  type='button'
                  class='btn btn-outline-white'
                  data-bs-dismiss='modal'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default AdminManagement
