'use client'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useEffect, useState } from 'react'
import { Container, Form, Card, Modal, Button } from 'react-bootstrap'
import { Input } from 'rsuite'
import { PageHeading } from 'widgets'

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.bundle.min.js')
}
function AdminManagement() {
  const [isVisible, setIsVisible] = useState(false)

  const [pageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  const [buildings, setBuildings] = useState([]);
  const [ips, setIps] = useState([]);
  const [domain, setDomain] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    zip_code: ''
  });
  const [search, setSearch] = useState('')
  const showFilters = () => {
    setIsVisible(!isVisible)
  }

  const isValidFQDN = (domain) => {
    const fqdnRegex = /^(?=.{1,253}$)((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,}$/;
    return fqdnRegex.test(domain.trim());
  };

  const [token, setToken] = useState('')
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const tokenFromCookies = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1];
      setToken(tokenFromCookies);
    }
  }, []);

  // Fetch buildings whenever relevant state changes
  useEffect(() => {
    fetchBuildings();
    fetchDomains();
  }, [currentPage, search, token]);

  const fetchBuildings = async () => {
    const url = `https:betazone.promaticstechnologies.com/corporate/listBuildings`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(url, { headers });
      if (response.ok) {
        const result = await response.json();
        setBuildings(result.buildings);
        setTotalItems(result.totalItems);
      } else {
        console.error('Failed to fetch buildings');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDomains = async () => {
    const url = `https:betazone.promaticstechnologies.com/corporate/getDomains`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await fetch(url, { headers });
      if (response.ok) {
        const result = await response.json();
        setIps(result.domains);
        //setTotalItems(result.totalItems);
      } else {
        console.error('Failed to fetch buildings');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddBuilding = async () => {
    const url = 'https:betazone.promaticstechnologies.com/corporate/createBuilding';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Building added successfully!');
        setFormData({ name: '', address: '', zipCode: '', assignedAdmin: '' });
        fetchBuildings(); // Refresh the list
        setShowModal(false); // Close the modal
      } else {
        alert('Error adding building');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the building');
    }
  };

  const handleAddDomain = async () => {
    const trimmedDomain = domain.trim();

    // Check for blank input
    if (!trimmedDomain) {
      alert("Please enter a valid email domain.");
      return;
    }

    // Validate FQDN
    if (!isValidFQDN(trimmedDomain)) {
      alert("Please enter a valid Fully Qualified Domain Name (FQDN).");
      return;
    }

    const domainData = { domain }
    const url = 'https:betazone.promaticstechnologies.com/corporate/addDomain';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(domainData),
      });

      if (response.ok) {
        alert('Domain whitelisted successfully!');
        setDomain('')
        fetchDomains(); // Refresh the list
        // setShowModal(false); // Close the modal
      } else {
        alert('Error adding building');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the building');
    }
  };

  const handleDeleteDomain = async (domainId) => {
 // Ask for confirmation
      const isConfirmed = window.confirm("Are you sure you want to delete this domain?");
      if (!isConfirmed) {
        return; // Exit if the user cancels
      }
    const domainData = { domainId }
    const url = 'https:betazone.promaticstechnologies.com/corporate/deleteDomain';
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(domainData),
      });

      if (response.ok) {
        alert('Domain Deleted successfully!');
        setDomain('')
        fetchDomains(); // Refresh the list
        // setShowModal(false); // Close the modal
      } else {
        alert('Error adding building');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the building');
    }
  };

  const handleDeleteBuilding = async (buildingId) => {
    // Ask for confirmation
         const isConfirmed = window.confirm("Are you sure you want to delete this building?");
         if (!isConfirmed) {
           return; // Exit if the user cancels
         }
       const buildingData = { buildingId }
       const url = 'https:betazone.promaticstechnologies.com/corporate/deleteBuilding';
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       try {
         const response = await fetch(url, {
           method: 'POST',
           headers,
           body: JSON.stringify(buildingData),
         });
   
         if (response.ok) {
           alert('Building Deleted successfully!');
           //setDomain('')
           fetchBuildings(); // Refresh the list
           // setShowModal(false); // Close the modal
         } else {
           alert('Error deleting building');
         }
       } catch (error) {
         console.error('Error:', error);
         alert('An error occurred while adding the building');
       }
     };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <Container fluid className='p-6'>
        {/* Page Heading */}
        <div className='d-flex justify-content-between'>
          <PageHeading heading='Corporate Settings' />
        </div>



        <div className='main-content-wrapper'>
          <div className='card mb-4'>
            <div className='card-body'>
              <div className='filters-options-sec'>
                <div className='flxx'>

                  <div className='bttns-sec'>


                    <button
                      className='btnPrimary'
                      // data-bs-toggle='modal'
                      // data-bs-target='#addBuilding'
                      onClick={() => setShowModal(true)}
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

                        <th scope='col'> Name</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Zip Code</th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildings.map((building) => (
                        <tr key={building._id}>
                          <td>{building.name}</td>
                          <td>{building.address}</td>
                          <td>{building.zip_code}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteBuilding(building._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>

        </div>


        <div className='main-content-wrapper'>
          <div className='card mb-4'>
            <div className='card-body'>
              <div className='filters-options-sec'>
                <Card className='mb-5'>
                  <div className='myFilterOptions'>
                    <div className='myFilters align-items-end'>
                      <div class='my-stts-flter'>
                        {/* <input type="search" placeholder='Search Templates'/> */}
                        <p className='fs-5 fw-bold mb-2'>Whitelisted Email Domains</p>
                        <input
                          type="text"
                          value={domain}
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Enter Whitelisted Email Domain"
                          onChange={(e) => setDomain(e.target.value)} // Update domain on input change
                        />
                      </div>
                      <button className='btnPrimary' onClick={handleAddDomain}>
                        Save
                      </button>
                    </div>
                  </div>
                </Card>

              </div>
              <div className='table-div'>
                <div className='table-responsive'>
                  <table className='table table-striped'>
                    <thead>
                      <tr>

                        <th scope='col'> S.No</th>
                        <th scope='col'>Whitelisted Domain</th>
                        <th scope='col'>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ips.map((ip, index) => (
                        <tr key={ip?._id}>
                          <td>{index + 1}.</td>
                          <td>{ip?.domain}</td>

                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteDomain(ip?._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>

        </div>
        {/* modals */}

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Building</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zip_code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddBuilding}>
              Add Building
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export default AdminManagement
