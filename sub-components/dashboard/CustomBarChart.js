import React, { useEffect, useState } from 'react';
import CustomBarChart from './CustomBarChart';

const ChartContainer = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parse the token from cookies
    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('authToken='))
    ?.split('=')[1]

    if (!token) {
      setError('Token not found. Please log in.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://betazone.promaticstechnologies.com/corporate/targetGraph',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const { data } = await response.json();

        // Transform data into chart-compatible format
        const formattedData = [
          { name: 'Electricity', Target: data.electricity_target, Saved: data.electicity_saved_till_now },
          { name: 'Water', Target: data.water_target, Saved: data.water_saved_till_now },
          { name: 'Emission', Target: data.emission_target, Saved: data.emission_saved_till_now },
        ];

        setChartData(formattedData);
      } catch (err) {
        console.log("error is", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <CustomBarChart
      data={chartData}
      bar1Key="Target"
      bar1Color="#8884d8"
      bar2Key="Saved"
      bar2Color="#82ca9d"
    />
  );
};

export default ChartContainer;
