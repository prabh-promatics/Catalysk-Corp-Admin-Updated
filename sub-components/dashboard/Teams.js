import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Table, Dropdown, Spinner } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';

const Teams = () => {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from cookies
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1];

  // Custom toggle for dropdown
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      href=''
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
      className='text-muted text-primary-hover'
    >
      {children}
    </Link>
  ));
  CustomToggle.displayName = 'CustomToggle';

  const ActionMenu = () => (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <MoreVertical size='15px' className='text-muted' />
      </Dropdown.Toggle>
      <Dropdown.Menu align={'end'}>
        <Dropdown.Item eventKey='1'>Calendar Year</Dropdown.Item>
        <Dropdown.Item eventKey='2'>Fiscal Year</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://betazone.promaticstechnologies.com/corporate/savingsBreakdown',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();

        // Format data for the table
        const formattedData = [
          {
            id: 1,
            name: 'Registrations',
            role: result.data.user_registered.current_month,
            cq: result.data.user_registered.current_quarter,
            pq: result.data.user_registered.prior_quarter,
            cf: result.data.user_registered.fiscal_quarter,
            total: result.data.user_registered.all_time,
          },
          {
            id: 2,
            name: 'Savings (kWh)',
            role: result.data.electicity.total_saved.current_month,
            cq: result.data.electicity.total_saved.current_quarter,
            pq: result.data.electicity.total_saved.prior_quarter,
            cf: result.data.electicity.total_saved.fiscal_quarter,
            total: result.data.electicity.total_saved.all_time,
          },
          {
            id: 3,
            name: 'Potential (kWh)',
            role: result.data.electicity.potential_saving.current_month,
            cq: result.data.electicity.potential_saving.current_quarter,
            pq: result.data.electicity.potential_saving.prior_quarter,
            cf: result.data.electicity.potential_saving.fiscal_quarter,
            total: result.data.electicity.potential_saving.all_time,
          },
        ];

        setTeamsData(formattedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <Card className='h-100'>
      <Card.Header className='bg-white py-4 d-flex justify-content-between align-items-center'>
        <h4 className='mb-0'>Savings Breakdown</h4>
       
      </Card.Header>
      {loading ? (
        <div className='text-center py-5'>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : error ? (
        <div className='text-center py-5 text-danger'>
          <p>{error}</p>
        </div>
      ) : (
        <Table responsive className='text-nowrap'>
          <thead className='table-light'>
            <tr>
              <th>Category</th>
              <th>Current Month (Jun 2025)</th>
              <th>Current Quarter (Apr-Jun 2025)</th>
              <th>Prior Quarter (Jan-Mar 2025)</th>
              <th>Current Fiscal Year (Apr 1-Jun 7, 2025)</th>
              <th>All Time</th>
            </tr>
          </thead>
          <tbody>
            {teamsData.map(item => (
              <tr key={item.id}>
                <td className='align-left'>
                  <div className='d-flex align-items-center'>
                    <div className='ms-3 lh-1'>
                      <h5 className=' mb-1'>{item.name}</h5>
                    </div>
                  </div>
                </td>
                <td className='align-middle'>{item.role ? item.role.toFixed(2) : 0}</td>
                <td className='align-middle'>{item.cq ? item.cq.toFixed(2) : 0}</td>
                <td className='align-middle'>{item.pq ? item.pq.toFixed(2) : 0}</td>
                <td className='align-middle'>{item.cf ? item.cf.toFixed(2) : 0}</td>
                <td className='align-middle'>{item.total ? item.total.toFixed(2) : 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default Teams;