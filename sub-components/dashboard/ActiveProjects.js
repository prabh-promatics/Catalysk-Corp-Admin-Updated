import { useEffect, useState } from "react";
import Link from "next/link";
import { ProgressBar, Col, Row, Card, Table, Image } from "react-bootstrap";

const ActiveProjects = () => {
  const [activeProjectsData, setActiveProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];

    const fetchActiveProjects = async () => {
      try {
        const response = await fetch(
          "https://betazone.promaticstechnologies.com/corporate/dashboardTable",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const projects = [
            {
              projectName: "Electricity",
              brandLogo: "/images/brand/electricity.svg", // Replace with actual logo path
              brandLogoBg: "bg-white",
              totalSaved: data.data.electricity.total_saved.toFixed(2),
              totalPotentialSavings:
                data.data.electricity.total_potential_savings.toFixed(2),
              median: data.data.electricity.median_potential_savings.toFixed(2),
              progress: Math.min(
                (
                  (data.data.electricity.total_saved /
                    data.data.electricity.total_potential_savings) *
                  100
                ).toFixed(2),
                100
              ),
            },
            {
              projectName: "Water",
              brandLogo: "/images/brand/water.svg",
              brandLogoBg: "bg-white",
              totalSaved: data.data.water.total_saved.toFixed(2),
              totalPotentialSavings:
                data.data.water.total_potential_savings.toFixed(2),
              median: data.data.water.median_potential_savings.toFixed(2),
              progress: Math.min(
                (
                  (data.data.water.total_saved /
                    data.data.water.total_potential_savings) *
                  100
                ).toFixed(2),
                100
              ),
            },
            {
              projectName: "Emission",
              brandLogo: "/images/brand/emissions.svg",
              brandLogoBg: "bg-white",
              totalSaved: data.data.emission.total_saved.toFixed(2),
              totalPotentialSavings:
                data.data.emission.total_potential_savings.toFixed(2),
              median: data.data.emission.median_potential_savings.toFixed(2),
              progress: 0, // Since no data available, set progress to 0
            },
          ];

          setActiveProjectsData(projects);
        } else {
          throw new Error(data.message || "Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white py-4">
            <h4 className="mb-0">Overview</h4>
          </Card.Header>
          <Table responsive className="text-nowrap mb-0">
            <thead className="table-light">
              <tr>
                <th>Category</th>
                <th>Total Saved</th>
                <th>Total Potential Savings</th>
                <th>Median</th>
                <th>Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {activeProjectsData.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <div>
                        <div
                          className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}
                        >
                          <Image src={item.brandLogo} alt={item.projectName} />
                        </div>
                      </div>
                      <div className="ms-3 lh-1">
                        <h5 className="mb-1">
                          <Link href="#" className="text-inherit">
                            {item.projectName}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">{item.totalSaved}</td>
                  <td className="align-middle">{item.totalPotentialSavings}</td>
                  <td className="align-middle">{item.median}</td>
                  <td className="align-middle text-dark">
                    <div className="float-start me-3">{item.progress}%</div>
                    <div className="mt-2">
                      <ProgressBar
                        now={item.progress}
                        style={{ height: "5px" }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Col>
    </Row>
  );
};

export default ActiveProjects;