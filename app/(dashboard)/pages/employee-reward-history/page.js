'use client'

import { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import axios from 'axios'
import Cookies from 'js-cookie'

function EmployeeRewardHistory() {
  const [isVisible, setIsVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')




  useEffect(() => {
    const token = Cookies.get('authToken') // Assuming your token is stored in a cookie named `authToken`
    if (token) {
      fetchRewardHistory(token)
    }
  }, [currentPage, search])

  const fetchRewardHistory = async (token) => {
    try {
      const offset = (currentPage - 1) * pageSize
      const response = await axios.get(
        `https://betazone.promaticstechnologies.com/corporate/getRewardHistory`,
        {
          params: {
            search,
            limit: pageSize,
            offset,
            date: '',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const { data, count } = response.data
      setUsers(data)
      setTotalItems(count)
    } catch (error) {
      console.error('Error fetching reward history:', error)
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

  const totalPages = Math.ceil(totalItems / pageSize)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <Container fluid className="p-6">
        <div className="d-flex justify-content-between">
          <PageHeading heading="Employee Reward History" />
        </div>
        <div className="main-content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="filters-options-sec">
                <div className="flxx">
                  <div className="search-bar">
                    <Form className="d-flex align-items-center">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Form>
                  </div>
                </div>
              </div>
              <div className="table-div">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Employee</th>
                        <th scope="col">Reward Type</th>
                        <th scope="col">Note</th>
                        <th scope="col">Date Granted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user, index) => (
                                     
                          <tr key={user._id}>
                          <td>{index + 1}.</td>
                            <td>{user.full_name}</td>
                            <td>{user.full_name}</td>
                            <td>{user.note}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pagination-div">
                  <nav aria-label="...">
                    <ul className="pagination">
                      <li className="page-item">
                        <a
                          className="page-link"
                          onClick={prevPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </a>
                      </li>
                      {pageNumbers.map((pageNumber) => (
                        <li
                          key={pageNumber}
                          className={`page-item ${
                            currentPage === pageNumber ? 'active' : ''
                          }`}
                        >
                          <button
                            className={`page-link`}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      ))}
                      <li className="page-item">
                        <a className="page-link" onClick={nextPage}>
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
      </Container>
    </>
  )
}

export default EmployeeRewardHistory
