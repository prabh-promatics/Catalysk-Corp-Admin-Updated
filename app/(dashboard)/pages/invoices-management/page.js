'use client';
import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { PageHeading } from 'widgets';
import debounce from 'lodash.debounce'; // Install lodash if not already installed
import { useCallback } from 'react';

import Link from 'next/link';

function InvoicesManagement() {
  const [isVisible, setIsVisible] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('');

  const pageSize = 10;

  useEffect(() => {
    // Check if document is defined to ensure this runs on the client side
    let token = ''
    if (typeof document !== 'undefined') {
      token = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))
        ?.split('=')[1]
      token = 'd527c719af2db07b02b744f836bd3361b4609c45bade79e1b9417641f79022e8935ac128ed40cc8fb52279e56cfcfba81f76a081753ec130ee584cbcd7ca982bd935531ea7b75952c1818d289353d00e4102e190747178277d18f51dbf804a12e49a6c67ee0905bf8627e033ce01942d37eedfeba43e1e3176695361ef523cca978eb763311d09a54b99a2ed9078d787c6ef6c1f71f0f5fc63642a433840eeb1274186f2c7f35d9e55ea4ec9681b841560856bc3abc51e2fc3590382de36960b46c19b710449258913560aa8983f3e86'
        setToken(token || '');
    }
    if (!token) {
      throw new Error('Authorization token not found in cookies.')
    }
    
  }, []);

  useEffect(() => {
    if (token) {
      fetchInvoices();
    }
  }, [currentPage, search, token]);

  const fetchInvoicesold = async () => {
    try {
      const response = await fetch(
        `https://betazone.promaticstechnologies.com/corporate/getInvoice`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.code === 200) {
        setInvoices(data.data);
        setTotalItems(data.count);
      } else {
        console.error('Failed to fetch invoices:', data);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const url = new URL(
        'https://betazone.promaticstechnologies.com/corporate/getInvoice'
      );
      
      // Add search as a query parameter if it's not empty
      if (search) {
        url.searchParams.append('search', search);
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.code === 200) {
        setInvoices(data.data);
        setTotalItems(data.count);
      } else {
        console.error('Failed to fetch invoices:', data);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };
  const handleSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300), // 300ms debounce delay
    []
  );

  const getInvoice = async (invoiceId) => {
    try {
      const response = await axios.post(
        "https://betazone.promaticstechnologies.com/corporate/downloadPdf",
        {
          id: invoiceId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer d527c719af2db07b02b744f836bd3361b4609c45bade79e1b9417641f79022e8935ac128ed40cc8fb52279e56cfcfba81f76a081753ec130ee584cbcd7ca982bd935531ea7b75952c1818d289353d00e4102e190747178277d18f51dbf804a12e49a6c67ee0905bf8627e033ce01942d37eedfeba43e1e3176695361ef523cca978eb763311d09a54b99a2ed9078d787c6ef6c1f71f0f5fc63642a433840eeb1274186f2c7f35d9e55ea4ec9681b841560856bc3abc51e2fc3590382de36960b46c19b710449258913560aa8983f3e86",
            Cookie:
              "token=16ada7fafe6c23a0690554e6ca70da8e09c019609281212f4fa74459d0f56dc131ee6393fd757120495e3c731b9d1b19c2f8acbdc1fb959fd26d7ac6d7d462fa0926b54f0b4763a3ccdee1c08deb08518ed786405d539b349b3fa4a584b301a330b64678df30cfc407e3c72d3efd625a78228efe7feae58bfc909b8bb1afa424f624baf5baaad409cfaa6a52cbdf796601b78df6ffdb5d7d40a4688b562c5eadf04d6f80d2f4e4bd76b9ab4bb17926971acdab6e45fd64db8b264bf8ee000052",
          },
        }
      );

      if (response.status === 200) {
        alert("Invoice has been sent to your email.");
      } else {
        alert("Failed to send the invoice.");
      }
    } catch (error) {
      console.error("Error sending invoice:", error);
      alert("An error occurred while sending the invoice.");
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(totalItems / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Container fluid className="p-6">
        <div className="d-flex justify-content-between">
          <PageHeading heading="Invoices Management" />
        </div>
        <div className="main-content-wrapper">
          <div className="card">
            <div className="card-body">
              <div className="filters-options-sec">
                <div className="search-bar">
                  <Form className="d-flex align-items-center">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </Form>
                </div>
              </div>
              <div className="table-div">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">
                         S.No
                        </th>
                        <th scope="col">Invoice Number</th>
                        <th scope="col">Invoice Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length > 0 ? (
                        invoices.map((invoice, index) => (
                          <tr key={invoice._id}>
                            <td>
                              {index+1}.
                            </td>
                            <td>{invoice.invoice_number}</td>
                            <td>{new Date(invoice.invoice_date).toLocaleDateString()}</td>
                            <td>${invoice.amount}</td>
                            <td>
  <p
    className={
      invoice.status === 'pending' && new Date(invoice.invoice_date) < new Date()
        ? 'text-danger' // Red for past due date
        : 'text-success' // Green otherwise
    }
  >
    {
      invoice.status === 'pending' && new Date(invoice.invoice_date) < new Date()
        ? 'Invoice Due:' // Red for past due date
        : 'Invoice Paid:' // Green otherwise
    } {new Date(invoice.due_date).toLocaleDateString()}
  </p>
</td>
                            <td>
                              <div className="dropdown">
                                <span
                                  className="cstmDropdown dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-vertical"></i>
                                </span>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a className="dropdown-item" onClick={() => getInvoice(invoice._id)}>Request Invoice</a>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No invoices found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="pagination-div">
                  <nav aria-label="Page navigation">
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={prevPage}>
                          Previous
                        </button>
                      </li>
                      <li className={`page-item ${currentPage >= Math.ceil(totalItems / pageSize) ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={nextPage}>
                          Next
                        </button>
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
  );
}

export default InvoicesManagement;
