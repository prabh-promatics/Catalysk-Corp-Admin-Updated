'use client'
import { Container, Form } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
//import DropzoneComponent from '../../../../components/bootstrap/DropzoneComponent'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

function EfficientEmployees () {
  const showFilters = () => {
    setIsVisible(!isVisible)
  }

  const [files, setFiles] = useState([])

  const handleDrop = acceptedFiles => {
    setFiles(acceptedFiles)
    console.log(acceptedFiles)
  }

  const [isVisible, setIsVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [usersCommute, setUsersCommute] = useState([])
  const [totalItemsCommute, setTotalItemsCommute] = useState(0)
  const [searchCommute, setSearchCommute] = useState('')
  const [currentPageCommute, setCurrentPageCommute] = useState(1)
  const [currentPageWater, setCurrentPageWater] = useState(1)
  const [usersWater, setUsersWater] = useState([])
  const [totalItemsWater, setTotalItemsWater] = useState(0)

  const [searchWater, setSearchWater] = useState('')

  useEffect(() => {}, [currentPage, search])
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1]

    if (token) {
      fetchEfficientEmployees(token)
      fetchEfficientEmployeesWater(token)
      fetchEfficientEmployeesCommute(token)
    }
  }, [
    currentPage,
    search,
    currentPageCommute,
    currentPageWater,
    searchWater,
    searchCommute
  ])

  const fetchEfficientEmployees = async token => {
    try {
      const offset = (currentPage - 1) * pageSize
      const response = await fetch(
        `https://betazone.promaticstechnologies.com/corporate/efficeintEmployeeElectricity?limit=${pageSize}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()
      if (data.code === 200) {
        setUsers(data.data)
        setTotalItems(data.count)
      } else {
        console.error('Failed to fetch employees:', data.message)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchEfficientEmployeesWater = async token => {
    try {
      const offset = (currentPageWater - 1) * pageSize
      const response = await fetch(
        `https://betazone.promaticstechnologies.com/corporate/efficeintEmployeeWater?limit=${pageSize}&offset=${offset}&search=${searchWater}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()
      if (data.code === 200) {
        setUsersWater(data.data)
        setTotalItemsWater(data.count)
      }
    } catch (error) {
      console.error('Error fetching water data:', error)
    }
  }

  const fetchEfficientEmployeesCommute = async token => {
    try {
      const offset = (currentPageCommute - 1) * pageSize
      const response = await fetch(
        `https://betazone.promaticstechnologies.com/corporate/efficeintEmployeeCommute?limit=${pageSize}&offset=${offset}&search=${searchCommute}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()
      if (data.code === 200) {
        setUsersCommute(data.data)
        setTotalItemsCommute(data.count)
      }
    } catch (error) {
      console.error('Error fetching commute data:', error)
    }
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

  const calculateTimeToEfficiency = (onboarding, quest) => {
    const onboardingDate = new Date(onboarding)
    const questDate = new Date(quest)
    const diffInMs = Math.abs(questDate - onboardingDate)
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
    return `${diffInDays} days`
  }

  const totalPages = Math.ceil(totalItems / pageSize)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  /*** For Water */

  return (
    <>
      <Container fluid className='p-6'>
        {/* Page Heading */}
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Efficient Employees' />
        </div>

        <Tabs
          defaultActiveKey='electricity'
          id='uncontrolled-tab-example'
          className='mb-3'
        >
          <Tab eventKey='electricity' title='Electricity'>
            <div className='main-content-wrapper'>
              <div className='card'>
                <div className='card-body'>
                  <div className='filters-options-sec'>
                    <div className='flxx'>
                      <div className='d-flex align-items-center gap-3'>
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
                          <select className='form-control form-select'>
                            <option disabled selected>
                              Status
                            </option>
                            <option value='active'>Active</option>
                            <option value='block'>Blocked</option>
                          </select>
                        </div>
                      </div>
                      <div className='bttns-sec'>
                        {/* <button
                          className='btn btn-outline-white'
                          onClick={showFilters}
                        >
                          <i className='fe fe-sliders me-2'></i> Filter
                        </button> */}

                        <button
                          className='btnPrimary dropdown-toggle'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          <i className='fe fe-download me-2'></i>Export
                        </button>
                        {/* <ul className='dropdown-menu'>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#block-mddl'
                            >
                              Pdf
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#unblock-mddl'
                            >
                              CSV
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#delete-mddl'
                            >
                              Excel
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </div>
                    {/* {isVisible && (
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

                      </div>
                    )} */}
                  </div>
                  <div className='table-div'>
                    <div className='table-responsive'>
                      <table className='table table-striped'>
                        <thead>
                          <tr>
                            <th scope='col'>
                              <input type='checkbox' class='form-check-input' />
                            </th>
                            <th scope='col'>Employee Name</th>

                            <th scope='col'>Date Became Efficient</th>
                            <th scope='col'>Time Taken to Become Efficient</th>
                            <th scope='col'>Leaderboard Rank</th>
                            {/* <th scope="col">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(user => (
                            <tr key={user._id}>
                              <td scope='col'>
                                <input
                                  type='checkbox'
                                  class='form-check-input'
                                />
                              </td>
                              <td>{user.full_name}</td>
                              <td>
                                {new Date(
                                  user.efficient_date
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {calculateTimeToEfficiency(
                                  user.onboarding_completed_at,
                                  user.quest_completed_at
                                )}
                              </td>
                              <td>#{user.leaderboard_rank}</td>
                            </tr>
                          ))}
                          {users.length === 0 && (
                            <tr>
                              <td colSpan='5' className='text-center'>
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className='pagination-div'>
                      <nav aria-label='...'>
                        <ul className='pagination'>
                          <li className='page-item'>
                            <a
                              className='page-link'
                              onClick={prevPage}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </a>
                          </li>
                          {pageNumbers.map(pageNumber => (
                            <li
                              key={pageNumber}
                              className={`page-item ${
                                currentPage === pageNumber ? 'active' : ''
                              }`}
                            >
                              <button
                                className='page-link'
                                onClick={() => setCurrentPage(pageNumber)}
                              >
                                {pageNumber}
                              </button>
                            </li>
                          ))}
                          <li className='page-item'>
                            <a className='page-link' onClick={nextPage}>
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

          <Tab eventKey='water' title='Water'>
            <div className='main-content-wrapper'>
              <div className='card'>
                <div className='card-body'>
                  <div className='filters-options-sec'>
                    <div className='flxx'>
                      <div className='d-flex align-items-center gap-3'>
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
                          <select className='form-control form-select'>
                            <option disabled selected>
                              Status
                            </option>
                            <option value='active'>Active</option>
                            <option value='block'>Blocked</option>
                          </select>
                        </div>
                      </div>
                      <div className='bttns-sec'>
                        {/* <button
                          className='btn btn-outline-white'
                          onClick={showFilters}
                        >
                          <i className='fe fe-sliders me-2'></i> Filter
                        </button> */}

                        <button
                          className='btnPrimary dropdown-toggle'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          <i className='fe fe-download me-2'></i>Export
                        </button>
                        {/* <ul className='dropdown-menu'>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#block-mddl'
                            >
                              Pdf
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#unblock-mddl'
                            >
                              CSV
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#delete-mddl'
                            >
                              Excel
                            </a>
                          </li>
                        </ul> */}
                      </div>
                    </div>
                    {/* {isVisible && (
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
                    )} */}
                  </div>
                  <div className='table-div'>
                    <div className='table-responsive'>
                      <table className='table table-striped'>
                        <thead>
                          <tr>
                            <th scope='col'>
                              <input type='checkbox' class='form-check-input' />
                            </th>
                            <th scope='col'>Employee Name</th>

                            <th scope='col'>Date Became Efficient</th>
                            <th scope='col'>Time Taken to Become Efficient</th>
                            <th scope='col'>Leaderboard Rank</th>
                            {/* <th scope="col">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {usersWater.map(user => (
                            <tr key={user._id}>
                              <td scope='col'>
                                <input
                                  type='checkbox'
                                  class='form-check-input'
                                />
                              </td>
                              <td>{user.full_name}</td>
                              <td>
                                {new Date(
                                  user.efficient_date
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {calculateTimeToEfficiency(
                                  user.onboarding_completed_at,
                                  user.quest_completed_at
                                )}
                              </td>
                              <td>#{user.leaderboard_rank}</td>
                            </tr>
                          ))}
                          {usersWater.length === 0 && (
                            <tr>
                              <td colSpan='5' className='text-center'>
                                No data available
                              </td>
                            </tr>
                          )}
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

          <Tab eventKey='commute' title='Commute'>
            <div className='main-content-wrapper'>
              <div className='card'>
                <div className='card-body'>
                  <div className='filters-options-sec'>
                    <div className='flxx'>
                      <div className='d-flex align-items-center gap-3'>
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
                          <select className='form-control form-select'>
                            <option disabled selected>
                              Status
                            </option>
                            <option value='active'>Active</option>
                            <option value='block'>Blocked</option>
                          </select>
                        </div>
                      </div>
                      <div className='bttns-sec'>
                        {/* <button
                          className='btn btn-outline-white'
                          onClick={showFilters}
                        >
                          <i className='fe fe-sliders me-2'></i> Filter
                        </button> */}

                        <button
                          className='btnPrimary dropdown-toggle'
                          // data-bs-toggle='dropdown'
                          // aria-expanded='false'
                        >
                          <i className='fe fe-download me-2'></i>Export
                        </button>
                        {/* <ul className='dropdown-menu'>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#block-mddl'
                            >
                              Pdf
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#unblock-mddl'
                            >
                              CSV
                            </a>
                          </li>
                          <li>
                            <a
                              className='dropdown-item'
                              data-bs-toggle='modal'
                              data-bs-target='#delete-mddl'
                            >
                              Excel
                            </a>
                          </li>
                        </ul> */}
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
                            <th scope='col'>Employee Name</th>
                            <th scope='col'>Date Became Efficient</th>
                            <th scope='col'>Time Taken to Become Efficient</th>
                            <th scope='col'>Leaderboard Rank</th>
                            {/* <th scope="col">Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {usersCommute.map(user => (
                            <tr key={user._id}>
                              <td scope='col'>
                                <input
                                  type='checkbox'
                                  class='form-check-input'
                                />
                              </td>
                              <td>{user.full_name}</td>
                              <td>
                                {new Date(
                                  user.efficient_date
                                ).toLocaleDateString()}
                              </td>
                              <td>
                                {calculateTimeToEfficiency(
                                  user.onboarding_completed_at,
                                  user.quest_completed_at
                                )}
                              </td>
                              <td>#{user.leaderboard_rank}</td>
                            </tr>
                          ))}
                          {usersCommute.length === 0 && (
                            <tr>
                              <td colSpan='5' className='text-center'>
                                No data available
                              </td>
                            </tr>
                          )}
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
                 {/*  <DropzoneComponent
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

export default EfficientEmployees