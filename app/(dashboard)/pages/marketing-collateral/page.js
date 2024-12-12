'use client';

import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { PageHeading } from 'widgets';
import axios from 'axios';

function MarketingCollateral() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the API data
  const fetchTemplates = async () => {
    try {
      // Extract token from cookies
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=').map(c => c.trim());
        acc[key] = value;
        return acc;
      }, {});

      const token = cookies['authToken']; // Replace with the actual cookie key for the token

      // API Call
      const response = await axios.get(
        'https://betazone.promaticstechnologies.com/corporate/getMarketingCollateral',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.code === 200) {
        setTemplates(response.data.data);
      } else {
        throw new Error('Failed to fetch templates');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching templates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <>
      <Container fluid className="p-6">
        <div className="d-flex justify-content-between">
          <PageHeading heading="Marketing Collateral" />
        </div>
        {/* <Card className="mb-5">
          <div className="myFilterOptions">
            <div className="myFilters">
              <div className="my-stts-flter">
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Search templates..."
                />
              </div>

              <div className="stts-flter">
                <select className="form-control form-select">
                  <option disabled selected>
                    Filter by Type
                  </option>
                  <option value="individual">Individual</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>

              <div className="stts-flter">
                <input
                  className="form-control"
                  type="date"
                  name="start_time"
                />
              </div>
            </div>
          </div>
        </Card> */}

        {loading ? (
          <p>Loading templates...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <Card className="p-3">
            <div className="colsContainer mb-5">
              {templates.map(template => (
                <div className="colBody" key={template._id}>
                  <div className="colHeader mb-3">
                    <h5>Template Category</h5>
                    <p>1 item</p>
                  </div>
                  <div className="colPoints">
                    <div className="colPoint">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-5 fw-bold">{template.name}</p>
                        <div>
                          <button
                            className="btnPrimary "
                          >
                            <i className="fe fe-download me-2"></i>Export
                          </button>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </Container>
    </>
  );
}

export default MarketingCollateral;
