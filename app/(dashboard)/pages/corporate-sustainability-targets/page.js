'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import Image from 'next/image'
import axios from 'axios'

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
  const [targetElectricity, setTargetElectricity] = useState('')
  const [targetWater, setTargetWater] = useState('')
  const [targetEmissions, setTargetEmissions] = useState('')

  const handleSaveTargets = async () => {
    let token = ''
    if (typeof document !== 'undefined') {
      token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1]
      token = 'd527c719af2db07b02b744f836bd3361b4609c45bade79e1b9417641f79022e8935ac128ed40cc8fb52279e56cfcfba81f76a081753ec130ee584cbcd7ca982bd935531ea7b75952c1818d289353d00e4102e190747178277d18f51dbf804a12e49a6c67ee0905bf8627e033ce01942d37eedfeba43e1e3176695361ef523cca978eb763311d09a54b99a2ed9078d787c6ef6c1f71f0f5fc63642a433840eeb1274186f2c7f35d9e55ea4ec9681b841560856bc3abc51e2fc3590382de36960b46c19b710449258913560aa8983f3e86'
        //setToken(token || '');
    }
    if (!token) {
      throw new Error('Authorization token not found in cookies.')
    }
    const data = {
      targets: {
        electricityReduction: targetElectricity,
        waterReduction: targetWater,
        emissionsReduction: targetEmissions,
      },
    }

    try {
      const response = await axios.put(
        'https://betazone.promaticstechnologies.com/corporate/addTarget',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+token,
          },
        }
      )
      console.log('Save successful:', response.data)
      alert('Targets saved successfully!')
    } catch (error) {
      console.error('Error saving targets:', error)
      alert('Failed to save targets. Please try again.')
    }
  }
  return (
    <>
      <Container fluid className='p-6'>
        {/* Page Heading */}
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Coprorate Sustainability Targets' />
          <div className='d-flex items-center gap-3'>
          <button className='btnPrimary' onClick={handleSaveTargets}>
            Save Targets
          </button>
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
                                onChange={(e) => setTargetElectricity(e.target.value)}
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
                                onChange={(e) => setTargetWater(e.target.value)}
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
                                onChange={(e) => setTargetEmissions(e.target.value)}
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

        
      </Container>
    </>
  )
}

export default CorporateSustainabilityTargets
