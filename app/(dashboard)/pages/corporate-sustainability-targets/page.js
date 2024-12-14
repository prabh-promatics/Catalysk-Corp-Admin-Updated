'use client'

import { useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import Image from 'next/image'
import axios from 'axios'
function CorporateSustainabilityTargets () {

  const [targetElectricity, setTargetElectricity] = useState(0)
  const [targetWater, setTargetWater] = useState(0)
  const [targetEmissions, setTargetEmissions] = useState(0)
  const [employeeCount, setEmployeeCount] = useState(0)


  const [electricityReductionMedian, setElectricityReductionMedian] = useState(0)
  const [emissionReductionMedian, setEmissionReductionMedian] = useState(0)
  const [waterReductionMedian, setWaterReductionMedian] = useState(0)
  const [initialYear, setInitialYear] = useState(0)
  const [employeeLogin, setTotalEmployeeLogin] = useState(0)



  useEffect(() => {
    const fetchTargets = async () => {
      let token = '';
      if (typeof document !== 'undefined') {
        token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];
      }

      if (!token) {
        console.error('Authorization token not found in cookies.');
        return;
      }

      try {
        const response = await axios.get(
          'https://betazone.promaticstechnologies.com/corporate/getTarget',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        );
        const data = response.data.data;
        console.log("Data is---", data);
        // Assuming the response structure matches your state variables
        setEmployeeCount(data.employee_count || 0);
        setTargetElectricity(data.electricity_reduction || 0);
        setTargetWater(data.water_reduction || 0);
        setTargetEmissions(data.emission_reduction || 0);
        setElectricityReductionMedian(data.electricity_reduction_median || 0);
        setEmissionReductionMedian(data.emission_reduction_median || 0);
        setWaterReductionMedian(data.water_reduction_median || 0);
        setInitialYear(data.intial_year || 0);
        setTotalEmployeeLogin(data.total_employee_login || 0);
      } catch (error) {
        console.error('Error fetching targets:', error);
        alert('Failed to load targets. Please try again.');
      }
    };

    fetchTargets();
  }, []);

  

  const handleSaveTargets = async () => {
    let token = ''
    if (typeof document !== 'undefined') {
      token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1]
      //token = 'd527c719af2db07b02b744f836bd3361b4609c45bade79e1b9417641f79022e8935ac128ed40cc8fb52279e56cfcfba81f76a081753ec130ee584cbcd7ca982bd935531ea7b75952c1818d289353d00e4102e190747178277d18f51dbf804a12e49a6c67ee0905bf8627e033ce01942d37eedfeba43e1e3176695361ef523cca978eb763311d09a54b99a2ed9078d787c6ef6c1f71f0f5fc63642a433840eeb1274186f2c7f35d9e55ea4ec9681b841560856bc3abc51e2fc3590382de36960b46c19b710449258913560aa8983f3e86'
        //setToken(token || '');
    }
    if (!token) {
      throw new Error('Authorization token not found in cookies.')
    }
    const data = {
        employee_count: employeeCount,
        electricity_reduction: targetElectricity,
        water_reduction: targetWater,
        emission_reduction: targetEmissions
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
                          readOnly
                          disabled
                          value={employeeLogin}
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
                          value={employeeCount}

                          required
                          onChange={(e) => setEmployeeCount(e.target.value)}

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
                         S.no
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
                         1.
                        </td>
                        <td>
                          Electricity reduction <br /> (kWh/yr)
                        </td>
                        <td>{employeeLogin*1260} kW/yr</td>
                        <td>
                          <div class='input-group'>
                            <div className='form-floating is-invalid'>
                              <input
                                type='text'
                                className='form-control'
                                id='floatingInputGroup2'
                                placeholder='Username'
                                value={targetElectricity}

                                required
                                onChange={(e) => setTargetElectricity(e.target.value)}
                              />
                              <label for='floatingInputGroup2'>
                                Enter value
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>{waterReductionMedian}kWh/yr</td>
                      </tr>
                      <tr>
                        <td>
                          2.
                        </td>
                        <td>
                          Water reduction <br /> (Litres/yr)
                        </td>
                        <td>{employeeLogin*192000} Litres</td>
                        <td>
                          <div class='input-group'>
                            <div className='form-floating is-invalid'>
                              <input
                                type='text'
                                className='form-control'
                                id='floatingInputGroup2'
                                placeholder='Username'
                                value={targetWater}

                                required
                                onChange={(e) => setTargetWater(e.target.value)}
                              />
                              <label for='floatingInputGroup2'>
                                Enter value
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>{waterReductionMedian} Litres
                        </td>
                      </tr>
                      <tr>
                        <td>
                          3.
                        </td>
                        <td>
                          Emissions reduction <br /> (kg Co2e / yr)
                        </td>
                        <td>{employeeLogin} ton kg CO2e</td>
                        <td>
                          <div class='input-group'>
                            <div className='form-floating is-invalid'>
                              <input
                                type='text'
                                className='form-control'
                                id='floatingInputGroup2'
                                placeholder='Username'
                                required
                                value={targetEmissions}
                                onChange={(e) => setTargetEmissions(e.target.value)}
                              />
                              <label for='floatingInputGroup2'>
                                Enter value
                              </label>
                            </div>
                          </div>
                        </td>
                        <td>{emissionReductionMedian} kg CO2e</td>
                      </tr>
                    </tbody>
                  </table>
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
