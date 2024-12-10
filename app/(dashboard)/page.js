// 'use client'
// // import node module libraries
// import { Fragment } from "react";
// import Link from 'next/link';
// import { Container, Col, Row } from 'react-bootstrap';

// // import widget/custom components
// import { StatRightTopIcon } from "widgets";

// // import sub components
// import { ActiveProjects, Teams, 
//     TasksPerformance 
// } from "sub-components";

// // import required data files
// import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

// const Home = () => {
//     return (
//         <Fragment>
//             <div className="bg-primary pt-10 pb-21"></div>
//             <Container fluid className="mt-n22 px-6">
//                 <Row>
//                     <Col lg={12} md={12} xs={12}>
//                         {/* Page header */}
//                         <div>
//                             <div className="d-flex justify-content-between align-items-center">
//                                 <div className="mb-2 mb-lg-0">
//                                     <h3 className="mb-0  text-white">Projects</h3>
//                                 </div>
//                                 <div>
//                                     <Link href="#" className="btn btn-white">Create New Project</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </Col>
//                     {ProjectsStatsData.map((item, index) => {
//                         return (
//                             <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
//                                 <StatRightTopIcon info={item} />
//                             </Col>
//                         )
//                     })}
//                 </Row>

//                 {/* Active Projects  */}
//                 <ActiveProjects />

//                 <Row className="my-6">
//                     <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">

//                         {/* Tasks Performance  */}
//                         <TasksPerformance />

//                     </Col>
//                     {/* card  */}
//                     <Col xl={8} lg={12} md={12} xs={12}>

//                         {/* Teams  */}
//                         <Teams />

//                     </Col>
//                 </Row>
//             </Container>
//         </Fragment>
//     )
// }
// export default Home;















'use client'

// import node module libraries
import { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Col, Row } from 'react-bootstrap'
import CustomAreaChart from '../../sub-components/dashboard/AreaChart'
import CustomBarChart from '../../sub-components/dashboard/CustomBarChart'
import { Briefcase, ListTask, People, Bullseye } from 'react-bootstrap-icons'

// import widget/custom components
import { StatRightTopIcon } from 'widgets'

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from 'sub-components'

const Home = () => {
  const [ProjectsStatsData, setProjectsStatsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Example chart data (unchanged from your original code)
  const data = [
    { name: '0', uv: 1000, pv: 1200, amt: 2400 },
    { name: '7', uv: 1000, pv: 1400, amt: 2210 },
    { name: '14', uv: 3000, pv: 1800, amt: 2290 },
    { name: '28', uv: 3000, pv: 2200, amt: 2000 },
    { name: '35', uv: 3000, pv: 2500, amt: 2181 },
    { name: '42', uv: 8000, pv: 2700, amt: 2500 },
    { name: '49', uv: 8000, pv: 2800, amt: 2100 }
  ]

  // Fetch data from the API
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1]

    const fetchStats = async () => {
      try {
        const response = await fetch(
          'https://betazone.promaticstechnologies.com/corporate/dashboardCardData',
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )

        const data = await response.json()

        if (response.ok) {
          const {
            employee_count,
            electicity_saved_percentage,
            water_saved_percentage,
            emission_saved_percentage
          } = data.data

          const transformedData = [
            {
              id: 1,
              title: 'Total Employees',
              value: employee_count.total_employee,
              icon: <People size={18} />,
              statInfo: `<span className="text-dark me-2">${employee_count.total_employee_login}</span> Logged In`
            },
            {
              id: 2,
              title: 'Electricity Saved',
              value: `${electicity_saved_percentage}%`,
              icon: <ListTask size={18} />,
              statInfo: `<span className="text-dark me-2">${electicity_saved_percentage}%</span> Saved`
            },
            {
              id: 3,
              title: 'Water Saved',
              value: `${water_saved_percentage}%`,
              icon: <Briefcase size={18} />,
              statInfo: `<span className="text-dark me-2">${water_saved_percentage}%</span> Saved`
            },
            {
              id: 4,
              title: 'Emission Saved',
              value: `${emission_saved_percentage}%`,
              icon: <Bullseye size={18} />,
              statInfo: `<span className="text-dark me-2">${emission_saved_percentage}%</span> Reduced`
            }
          ]

          setProjectsStatsData(transformedData)
        } else {
          throw new Error(data.message || 'Failed to fetch data')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Conditional rendering for API states
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!ProjectsStatsData.length) return <p>No data available.</p>


  const data1 = [
    { name: 'Electricity', uv: 4000, pv: 2400, hv: 2400 },
    { name: 'Water', uv: 3000, pv: 1398, hv: 6000 },
    { name: 'Commute', uv: 2780, pv: 3908, hv: 2750 },
  ];

  return (
    <Fragment>
      <div className='bgPrimary pt-10 pb-21'></div>
      <Container fluid className='mt-n22 px-6'>
        <Row>
          <Col lg={12} md={12} xs={12}>
            {/* Page header */}
            <div>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='mb-2 mb-lg-0'>
                  <h3 className='mb-0 text-white'>Dashboard</h3>
                </div>
                {/* <div>
                  <Link href='#' className='btn btn-white'>
                    Create New Project
                  </Link>
                </div> */}
              </div>
            </div>
          </Col>

          {/* Render fetched stats */}
          {ProjectsStatsData.map((item, index) => (
            <Col xl={3} lg={6} md={12} xs={12} className='mt-6' key={index}>
              <StatRightTopIcon info={item} />
            </Col>
          ))}
        </Row>

        {/* Active Projects */}
        <ActiveProjects />

        <Row className='my-6'>
          <Col xl={4} lg={12} md={12} xs={12} className='mb-6 mb-xl-0'>
            {/* Tasks Performance */}
            {/* <TasksPerformance /> */}
            <CustomBarChart
                data={data1}
                bar1Key='pv'
                bar1Color='#8884d8'
                bar2Key='uv'
                bar2Color='#82ca9d'
                bar3Key='hv'
                bar3Color='#f8bb30'
              />
          </Col>

          <Col xl={8} lg={12} md={12} xs={12}>
            {/* Teams */}
            {/* <CustomAreaChart data={data} /> */}
          </Col>
        </Row>

        <Row className='my-6'>
          <Col xl={12} lg={12} md={12} xs={12} className='mb-6 mb-xl-0'>
            {/* Teams */}
            <Teams />
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Home
