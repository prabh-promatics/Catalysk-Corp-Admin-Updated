import { Fragment, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { ListGroup, Dropdown, Image } from 'react-bootstrap';
import Cookies from 'js-cookie';
import useMounted from 'hooks/useMounted';

const QuickMenu = () => {
    const hasMounted = useMounted();
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const rawCookie = Cookies.get('companyData');
        console.log('Raw Cookie:', rawCookie); // Debugging raw cookie
        if (rawCookie) {
            try {
                const parsedData = JSON.parse(decodeURIComponent(rawCookie));
                if (parsedData?.data?.company) {
                    setCompanyData(parsedData.data.company); // Extract company data
                } else {
                    console.error("Company data not found in cookie structure.");
                }
            } catch (error) {
                console.error("Error parsing cookie data:", error);
            }
        } else {
            console.error("Cookie not found.");
        }
    }, [companyData]);

    const handleSignOut = () => {
        Cookies.remove('authToken');
        window.location.assign('/');
    };

    const QuickMenuContent = () => {
        return (
            <Dropdown as="li" className="ms-2">
                <Dropdown.Toggle
                    as="a"
                    bsPrefix=" "
                    className="rounded-circle"
                    id="dropdownUser"
                >
                    <div className="avatar avatar-md avatar-indicators avatar-online">
                        <Image alt="avatar" src="/images/avatar/avatar-1.jpg" className="rounded-circle" />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                    className="dropdown-menu dropdown-menu-end"
                    align="end"
                    aria-labelledby="dropdownUser"
                >
                    <Dropdown.Item as="div" className="px-4 pb-0 pt-2" bsPrefix=" ">
                        {companyData ? (
                            <div className="lh-1">
                                <h5 className="mb-1">{companyData.corporate_name}</h5>
                                <p className="text-muted mb-0 small">ID: {companyData.corp_id}</p>
                                <p className="text-muted mb-0 small">Email: {companyData.email}</p>
                            </div>
                        ) : (
                            <div className="lh-1">
                                <h5 className="mb-1">No data available</h5>
                            </div>
                        )}
                        <div className="dropdown-divider mt-3 mb-2"></div>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut}>
                        <i className="fe fe-power me-2"></i> Sign Out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    };

    return (
        <Fragment>
            {hasMounted && (
                <ListGroup as="ul" bsPrefix="navbar-nav" className="navbar-right-wrap ms-auto d-flex nav-top-wrap">
                    <QuickMenuContent />
                </ListGroup>
            )}
        </Fragment>
    );
};

export default QuickMenu;
