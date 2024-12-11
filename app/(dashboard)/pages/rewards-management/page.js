'use client'

import React, { useState, useEffect } from 'react'
import { Card, Container, Form } from 'react-bootstrap'
import { PageHeading } from 'widgets'
import { SelectPicker } from 'rsuite'
import Link from 'next/link'
import Cookies from 'js-cookie'

function RewardsManegement() {
  const [category, setCategory] = useState(null)
  const [percentage, setPercentage] = useState(null)
  const [note, setNote] = useState('')
  const [rewards, setRewards] = useState([])
  const [loading, setLoading] = useState(false)
  const [assignRewardloading, setAssignRewardLoading] = useState(false)

  const [employeeHistory, setEmployeeHistory] = useState([])
  const [expandedReward, setExpandedReward] = useState(null);



  const categoryData = ['Electricity', 'Water', 'Commute'].map(item => ({
    label: item,
    value: item
  }))
  const percentageData = ['10%', '20%', '50%', '75%', '100%'].map(item => ({
    label: item,
    value: parseInt(item)
  }))

  const fetchRewards = async () => {
    try {
      setLoading(true)
      const token = Cookies.get('authToken') // Assuming your token is stored in a cookie named `authToken`
      const response = await fetch(
        'https://betazone.promaticstechnologies.com/corporate/getRewardProgram',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()
      if (data.code === 200) {
        setRewards(data.data)
      }
    } catch (error) {
      console.error('Error fetching rewards:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveReward = async () => {
    if (!category || !percentage) {
      alert('Please select both category and percentage.')
      return
    }
    try {
      const token = Cookies.get('authToken')
      const response = await fetch(
        'https://betazone.promaticstechnologies.com/corporate/addRewardProgram',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            type: category.toLowerCase(),
            percentage,
            reward_name:note
          })
        }
      )
      const result = await response.json()
      if (result.code === 200) {
        alert('Reward added successfully!')
        setCategory(null)
        setPercentage(null)
        setNote('')
        fetchRewards() // Refresh the rewards table
      } else {
        alert('Failed to add reward. Please try again.')
      }
    } catch (error) {
      console.error('Error saving reward:', error)
    }
  }

  const fetchEmployeeHistory = async rewardId => {
    try {
      const token = Cookies.get('authToken')
      rewardId="67517edec4d3bcd56714e205";
      const response = await fetch(
        `https://betazone.promaticstechnologies.com/corporate/getEmployeeHisotryForReward?reward_id=${rewardId}`,
        {
          headers: {
            Authorization: `Bearer d527c719af2db07b02b744f836bd3361b4609c45bade79e1b9417641f79022e8935ac128ed40cc8fb52279e56cfcfba81f76a081753ec130ee584cbcd7ca982bd935531ea7b75952c1818d289353d00e4102e190747178277d18f51dbf804a12e49a6c67ee0905bf8627e033ce01942d37eedfeba43e1e3176695361ef523cca978eb763311d09a54b99a2ed9078d787c6ef6c1f71f0f5fc63642a433840eeb1274186f2c7f35d9e55ea4ec9681b841560856bc3abc51e2fc3590382de36960b46c19b710449258913560aa8983f3e86`
          }
        }
      )
      const data = await response.json()
      if (data.code === 200) {
        setEmployeeHistory(data.data)
      }
    } catch (error) {
      console.error('Error fetching employee history:', error)
    }
  }

  const handleShowTableClick = rewardId => {
    if (expandedReward === rewardId) {
      setExpandedReward(null)
      setEmployeeHistory([])
    } else {
      setExpandedReward(rewardId)
      fetchEmployeeHistory(rewardId)
    }
  }

  const assignReward = async (employeeId, rewardId) => {
    const token = Cookies.get('authToken')

    try {
      setAssignRewardLoading(true);
      const response = await fetch("https://betazone.promaticstechnologies.com/corporate/assignReward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          employee_ids: [employeeId],
          note: "reward",
          reward_id: rewardId,
        }),
      });

      const result = await response.json();

      // Check for success condition
      if (result.code === 200 && result.message === 'Reward assigned successfully') {
        setAssignRewardLoading(false);
        alert(result.message); // Show success message from response
          //setCategory(null);
          //setPercentage(null);
          //setNote('');
          //fetchRewards(); // Refresh the rewards table
      } else {
        setAssignRewardLoading(false);
          alert('Failed to add reward. Please try again.'); // Generic failure message
      }
    } catch (error) {
      setAssignRewardLoading(false);

      console.error("Error assigning reward:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setAssignRewardLoading(false);

      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRewards()
  }, [])



  return (
    <>
      <Container fluid className='p-6'>
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Rewards and Incentives Management' />
          <Link href='/pages/employee-reward-history' passHref>
            <button type='button' className='btnPrimary'>
              Employee Reward History
            </button>
          </Link>
        </div>

        <Card className='h-100'>
          <div className='p-4'>
            <h5 className='mb-3'>Create Reward Criteria</h5>
            <div className='mt-3 d-flex align-items-center gap-3'>
              <SelectPicker
                searchable={false}
                data={categoryData}
                style={{ width: 240 }}
                placeholder='Select Category'
                value={category}
                onChange={setCategory}
              />
              <SelectPicker
                data={percentageData}
                searchable={false}
                style={{ width: 240 }}
                placeholder='Select Efficiency Percentage'
                value={percentage}
                onChange={setPercentage}
              />
            </div>
            <div className='mt-3'>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Add a note (optional)'
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
            <div className='mt-3'>
              <button className='btnPrimary' onClick={saveReward}>
                Save Reward
              </button>
            </div>
          </div>
        </Card>

    

        <Card className='mt-3'>
        <div className='table-div'>
          <div className='table-responsive'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>SI. No.</th>
                  <th scope='col'>Category</th>
                  <th scope='col'>Percentage</th>
                  <th scope='col'>Note</th>
                  <th scope='col'>Created At</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan='6'>Loading...</td>
                  </tr>
                ) : rewards.length > 0 ? (
                  rewards.map((reward, index) => (
                    <React.Fragment key={reward._id}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{reward.type}</td>
                        <td>{reward.percentage}%</td>
                        <td>{reward.reward_name}</td>
                        <td>{new Date(reward.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            // className='btn btn-sm btn-primary'
                            className='btnPrimary'
                            onClick={() => handleShowTableClick(reward._id)}
                          >
                            {expandedReward === reward._id ? 'Hide Table' : 'Show Table'}
                          </button>
                        </td>
                      </tr>
                      {expandedReward === reward._id && (
                        <tr>
                          <td colSpan='6'>
                            <div className='table-responsive'>
                              <table className='table table-bordered'>
                                <thead>
                                  <tr>
                                    <th>Full Name</th>
                                    <th>Signup Date</th>
                                    <th>Quest Completed At</th>
                                    <th>Reward Given</th>
                                    <th>Became Efficient At</th>
                                    <th>Assign Reward</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {employeeHistory.length > 0 ? (
                                    employeeHistory.map(employee => (
                                      <tr key={employee._id}>
                                        <td>{employee.full_name}</td>
                                        <td>{new Date(employee.sign_up_date).toLocaleDateString()}</td>
                                        <td>{new Date(employee.quest_completed_at).toLocaleDateString()}</td>
                                        <td>{employee.reward_given ? 'Yes' : 'No'}</td>
                                        <td>{new Date(employee.became_effiecient_at).toLocaleDateString()}</td>
                                        <td>
                 {!employee.reward_given ? <button
                    // className="btn btn-primary"
                    className='btnPrimary'
                    onClick={() => assignReward(reward.employee_id, reward.reward_id)}
                    disabled={assignRewardloading}
                  >
                    {assignRewardloading ? "Assigning..." : "Assign Reward"}
                  </button> : <button
                    // className="btn btn-primary"
                    className='btnPrimary'
                    disabled={true}
                  >
                   Reward Assigned 
                  </button> }



                </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan='5'>No data available</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6'>No rewards found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      </Container>
    </>
  )
}

export default RewardsManegement
