'use client'
// import node module libraries
import { Container, Form } from 'react-bootstrap'

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.bundle.min.js')
}

// import widget as custom components
import { PageHeading } from 'widgets'
import axios from 'axios'

import { useEffect, useState } from 'react'

import DropzoneComponent from '../../../../components/bootstrap/DropzoneComponent'

// import sub components
import Link from 'next/link'

// hide show filters

function EmployeeManagement () {
  const [isVisible, setIsVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedItem, setselectedItem] = useState([])
  /// Pagination
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  //const [offsetentry, setoffsetentry] = useState(0)
  //const [entry, setentry] = useState(0)
  const [status, setStatus] = useState('') // State for status filter

  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [loading, setLoading] = useState(false)

  const limit = 10

  const [search, setSearch] = useState('')

  const fetchEmployees = async (page = 1) => {
    setIsLoading(true)
    // const offset = (page - 1) * limit
    // Check if document is defined to ensure this runs on the client side
    let token = ''
    if (typeof document !== 'undefined') {
      token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1]
    }
    try {
      setIsLoading(true)
      const offset = (page - 1) * limit

      if (!token) {
        throw new Error('Authorization token not found in cookies.')
      }

      const response = await fetch(
        `https://betazone.promaticstechnologies.com/corporate/employeeListing?limit=${limit}&offset=${offset}&search=&date=&status=${status}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const result = await response.json()
      const { data, count } = result
      setEmployees(data)
      setTotalItems(count)
    } catch (error) {
      console.error('Error fetching employee data:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const fetchEmployeesold = async (page = 1) => {
    try {
      setIsLoading(true)
      const offset = (page - 1) * limit
      // Check if document is defined to ensure this runs on the client side
      let token = ''
      if (typeof document !== 'undefined') {
        token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1]
      }
      if (!token) {
        throw new Error('Authorization token not found in cookies.')
      }
      const response = await fetch(
        `https:betazone.promaticstechnologies.com/corporate/employeeListing?limit=${limit}&offset=${offset}&search=&date=&status=`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }
      const result = await response.json()
      const { data, count } = result
      setEmployees(data)
      setTotalPages(Math.ceil(count / limit))
    } catch (error) {
      console.error('Error fetching employee data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeactivate = async () => {
    let token = ''
    if (typeof document !== 'undefined') {
      token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1]
    }
    if (!token) {
      throw new Error('Authorization token not found in cookies.')
    }
    if (files.length === 0) {
      alert('Please upload a file before deactivating employees.')
      return
    }

    const formData = new FormData()
    formData.append('type', 'excel')
    formData.append('employee', files[0]) // Assuming single file upload
    setLoading(true)
    try {
      const response = await axios.post(
        'https://betazone.promaticstechnologies.com/corporate/bulkDeactivateUser',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        alert('Employees deactivated successfully.')

        //   const modal = document.getElementById('deActivateModal');
        //   const bootstrapModal = bootstrap.Modal.getInstance(modal); // Bootstrap modal API
        //   bootstrapModal.hide();
      } else {
        alert('Failed to deactivate employees. Please try again.')
      }
    } catch (error) {
      console.error('Error deactivating employees:', error)
      alert('An error occurred while deactivating employees.')
      //  const modal = document.getElementById('deActivateModal');
      //  const bootstrapModal = bootstrap.Modal.getInstance(modal); // Bootstrap modal API
      //  bootstrapModal.hide();
    } finally {
      setLoading(false)
      //  const modal = document.getElementById('deActivateModal');
      //  const bootstrapModal = bootstrap.Modal.getInstance(modal); // Bootstrap modal API
      //  bootstrapModal.hide();
    }
  }
  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees(currentPage)
  }, [currentPage, status])

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)
  const [deactivationReason, setDeactivationReason] = useState('')
  const openDeactivationModal = employeeId => {
    setSelectedEmployeeId(employeeId)
    setDeactivationReason('') // Reset reason on open
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
    setSelectedEmployeeId(null)
    setDeactivationReason('')
  }

  const deactivateEmployee = async () => {
    if (!deactivationReason.trim()) {
      alert('Please enter a deactivation reason.')
      return
    }

    try {
      const response = await axios.patch(
        `https://betazone.promaticstechnologies.com/corporate/deativateUser/${selectedEmployeeId}`,
        { reason: deactivationReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status === 200) {
        alert('Employee deactivated successfully!')
        fetchEmployees(currentPage) // Refresh the table
        closeModal()
      }
    } catch (error) {
      console.error('Error deactivating employee:', error)
      alert('Failed to deactivate employee. Please try again.')
      console.error('Error details:', error.response || error.message)
    }
  }

  // Fetch data on component mount and when the page changes
  useEffect(() => {
    fetchEmployees(currentPage)
  }, [currentPage])

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const [token, setToken] = useState('')

  // Fetch token from cookies client-side
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const tokenFromCookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1]
      setToken(tokenFromCookies)
    }
  }, [])

  useEffect(() => {
    // getdoc();
    if (token) {
      fetchEmployees(currentPage)
    }
  }, [currentPage, search, token])
  //  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const exportApi = async () => {
    try {
      const response = await axios.get(
        'https://betazone.promaticstechnologies.com/corporate/exportEmployee',
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob' // Handle file download
        }
      )
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'employees_data.xlsx') // Adjust file name and extension as needed
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      alert('Employee data exported successfully!')
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Failed to export data. Please try again.')
    }
  }

  const totalPages = Math.ceil(totalItems / pageSize)
  console.log('totalPages', totalPages, totalItems, pageSize)
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const [files, setFiles] = useState([])

  const handleDrop = acceptedFiles => {
    setFiles(acceptedFiles)
    console.log(acceptedFiles) // Log or handle files here
  }
  // Handle Filter Change
  const handleStatusChange = e => {
    setStatus(e.target.value) // Update status filter
    setCurrentPage(1) // Reset to the first page
  }

  return (
    <>
      <Container fluid className='p-6'>
        {/* Page Heading */}
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Employee Management' />
          <div className='d-flex items-center gap-3'>
            <div>
              <button
                type='button'
                className='btnPrimary'
                data-bs-toggle='modal'
                data-bs-target='#deActivateModal'
              >
                Deactivate Employee(s)
              </button>
            </div>

            <button className='btnPrimary ' onClick={exportApi}>
              <i className='fe fe-download me-2'></i>Export
            </button>
          </div>
        </div>

        <div className='main-content-wrapper'>
          <div className='card'>
            <div className='card-body'>
              <div className='filters-options-sec'>
                <div className='flxx'>
                  <div className='flxx gap-3'>
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

                    <div class='stts-flter'>
                      <select
                        className='form-control form-select  
                     '
                        value={status}
                        onChange={handleStatusChange}
                      >
                        <option disabled selected>
                          Status
                        </option>
                        <option value='active'>Active</option>
                        <option value='block'>Blocked</option>
                      </select>
                    </div>
                  </div>

                  <div className='bttns-sec'>
                    {/* <Link className='btn btn-primary' href='/pages/add-user'>
                      Add New User
                    </Link> */}

                    <div className='dropdown'>
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
                            Deactivate
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='table-div'>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div className='table-responsive'>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th scope='col'>S.No.</th>
                          <th scope='col'>Employee Name</th>
                          <th scope='col'>Email</th>
                          <th scope='col'>Location of Office</th>
                          <th scope='col'>Leaderboard Rank</th>
                          <th scope='col'>Last Login</th>
                          <th scope='col'>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.length > 0 ? (
                          employees.map((employee, index) => (
                            <tr key={employee._id}>
                              <td>{index + 1}.</td>
                              <td>{employee.full_name}</td>
                              <td style={{whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '200px'}}>{employee.email}</td>
                              <td>Sample Office Location</td>
                              <td>12</td>
                              <td>
                                {new Date(
                                  employee.last_log_in
                                ).toLocaleString()}
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
                                    {/* <li>
                                      <a
                                        className='dropdown-item'
                                        data-bs-toggle='modal'
                                        data-bs-target='#block-mddl'
                                      >
                                        Activate
                                      </a>
                                    </li> */}
                                    <li>
                                      <a
                                        className='dropdown-item'
                                        data-bs-toggle='modal'
                                        data-bs-target='#unblock-mddl'
                                        onClick={() =>
                                          openDeactivationModal(
                                            employee.user_id
                                          )
                                        }
                                        // onClick={()=>deactivateEmployee(employee.user_id,"Demo reason")}
                                      >
                                        Deactivate
                                      </a>
                                    </li>
                                    
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan='5'>No employees found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className='pagination-div'>
                  <nav aria-label='Page navigation'>
                    <ul className='pagination'>
                      <li
                        className={`page-item ${
                          currentPage === 1 ? 'disabled' : ''
                        }`}
                      >
                        <button className='page-link' onClick={prevPage}>
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? 'active' : ''
                          }`}
                        >
                          <button
                            className='page-link'
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? 'disabled' : ''
                        }`}
                      >
                        <button className='page-link' onClick={nextPage}>
                          Next
                        </button>
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
                    Are you sure want to delete this user?
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
                    Are you sure want to delete users?
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
                    Are you sure want to activate this employee?
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
                    acceptedFiles='.xlsx'
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
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btnPrimary'
                  onClick={handleDeactivate}
                  disabled={loading}
                >
                  {loading ? 'Deactivating...' : 'Deactivate'}
                </button>
                <button
                  type='button'
                  className='btn btn-outline-white'
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
                  <h5 className='mb-2'>
                    Enter the reason to Deactivate Employee
                  </h5>
                </div>
                <Form className='d-flex align-items-center mb-3'>
                  <Form.Control
                    as='textarea'
                    placeholder='Enter Deactivation Reason'
                    value={deactivationReason}
                    onChange={e => setDeactivationReason(e.target.value)}
                    rows={3}
                  />
                </Form>
              </div>
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btnPrimary'
                  data-bs-dismiss='modal'
                  onClick={deactivateEmployee}
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

export default EmployeeManagement
