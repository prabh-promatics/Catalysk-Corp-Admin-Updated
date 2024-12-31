'use client'

import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { PageHeading } from 'widgets';
import { Input } from 'rsuite';

function CatalyskManagement() {
  const [liaisonOfficers, setLiaisonOfficers] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    if (token) {
      // Fetch liaison officers
      fetch('https://betazone.promaticstechnologies.com/corporate/getCatalyskManagement', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => setLiaisonOfficers(data.data || []))
        // console.log(data.data)
        .catch(console.error);

      // Fetch company details
      fetch('https://betazone.promaticstechnologies.com/corporate/getAppCompnayDetails', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => setCompanyDetails(data.data || {}))
        .catch(console.error);
    }
  }, []);



  // console.log(liaisonOfficers)
  // console.log(companyDetails)

  return (
    <>
      <Container fluid className='p-6'>
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Catalysk Management' />
        </div>

        <Card className='p-3'>
          <div className='colsContainer mb-5'>
            <div className='colBody'>
              <div className='colHeader mb-3'>
                <h5>Catalysk Liaison Officers</h5>
              </div>
              <div className='colPoints'>
                {liaisonOfficers.map((officer, index) => (
                  <div className='colPoint' key={officer._id}>
                    <div className='row'>
                      <div className='col-lg-6 mb-3'>
                        <p className='fs-5 fw-bold mb-2'>Name</p>
                        <Input type='text' disabled value={officer.name} readOnly />
                      </div>
                      <div className='col-lg-6 mb-3'>
                        <p className='fs-5 fw-bold mb-2'>Email</p>
                        <Input type='email' disabled value={officer.email} readOnly />
                      </div>
                      <div className='col-lg-6 mb-3'>
                        <p className='fs-5 fw-bold mb-2'>Contact No.</p>
                        <Input type='text' disabled value={officer.phone_number} readOnly />
                      </div>
                      <div className='col-lg-6 mb-3'>
                        <p className='fs-5 fw-bold mb-2'>Additional Notes</p>
                        <Input as='textarea' disabled rows={3} value={officer.comment} readOnly />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='colsContainer mb-5'>
            <div className='colBody'>
              <div className='colHeader mb-3'>
                <h5>Catalysk Company Details</h5>
              </div>
              <div className='colPoints'>
                <div className='colPoint'>
                  <div className='row'>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Company Full Name</p>
                      <Input
                        disabled
                        type='text'
                        value={companyDetails.company_full_name || ''}
                        readOnly
                      />
                    </div>
                    {/* <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Bank Account No.</p>
                      <Input
                         disabled
                        type='text'
                        value={companyDetails.bank_details?.account_number || ''}
                        readOnly
                      />
                    </div> */}
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>GSTIN No.</p>
                      <Input type='text' disabled value={companyDetails.gstin || ''} readOnly />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>MSME No.</p>
                      <Input type='text' disabled value={companyDetails.msme || ''} readOnly />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Registered Address</p>
                      <Input
                        as='textarea'
                        disabled
                        rows={3}
                        value={companyDetails.registered_address || ''}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='colsContainer mb-5'>
            <div className='colBody'>
              <div className='colHeader mb-3'>
                <h5>Catalysk Bank Details</h5>
              </div>
              <div className='colPoints'>
                <div className='colPoint'>
                  <div className='row'>
                  <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Bank Name</p>
                      <Input type='text' disabled value={companyDetails.bank_details?.bank_name || ''} readOnly />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>Bank Account No.</p>
                      <Input
                         disabled
                        type='text'
                        value={companyDetails.bank_details?.account_number || ''}
                        readOnly
                      />
                    </div>
                    <div className='col-lg-6 mb-3'>
                      <p className='fs-5 fw-bold mb-2'>IFSC Code</p>
                      <Input type='text' disabled value={companyDetails.gstin || ''} readOnly />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default CatalyskManagement;
