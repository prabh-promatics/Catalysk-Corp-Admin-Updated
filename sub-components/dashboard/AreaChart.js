// import React, { useState, useEffect } from 'react';
// import { Card } from 'react-bootstrap';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   linearGradient,
// } from 'recharts';
// import { differenceInDays } from 'date-fns';

// const CustomAreaChart = () => {
//   const [data, setData] = useState([]);
//   const [graphData, setGraphData] = useState({});
//   const [xAxisTicks, setXAxisTicks] = useState([]);
//   const [electricitySavingPercentage, setElectricitySavingPercentage] = useState(0);
//   const [waterSavingPercentage, setWaterSavingPercentage] = useState(0);

//   useEffect(() => {
//     const token = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('authToken='))
//       ?.split('=')[1]

//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           'https://betazone.promaticstechnologies.com/corporate/companyGraph',
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const result = await response.json();
//         const apiData = result.data;
//         setGraphData(apiData);

//         const today = new Date();
//         const firstQuestDate = new Date(apiData.start_date);

//         // Prepare chart data
//         const chartData = apiData.electricity.date.map((date, index) => ({
//           day: differenceInDays(new Date(date), firstQuestDate),
//           electricity: apiData.electricity.data[index] || 0,
//           water: apiData.water.data[index] || 0,
//           emissions: apiData.commute.data[index] || 0,
//         }));

//         // Determine X-axis ticks
//         const numberOfPoints = 6;
//         const totalDays = differenceInDays(today, firstQuestDate);
//         const xAxisPoints = Array.from(
//           { length: numberOfPoints },
//           (_, i) => Math.round((totalDays / (numberOfPoints - 1)) * i)
//         );

//         setXAxisTicks(xAxisPoints);
//         setData(chartData);

//         // Calculate percentage saved
//         const electricitySavedPercentage =
//           (apiData.total_electricity_saved / apiData.total_electricty_potential_saving) * 100;
//         const waterSavedPercentage =
//           (apiData.total_water_saved / apiData.total_water_potential_saving) * 100;

//         setElectricitySavingPercentage(electricitySavedPercentage.toFixed(2));
//         setWaterSavingPercentage(waterSavingPercentage.toFixed(2));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <Card className="h-100">
//       <div className="d-flex align-items-center justify-content-between px-3 py-4">
//         <div>
//           <h4 className="mb-0">Savings</h4>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={400}>
//         <AreaChart
//           data={data}
//           margin={{
//             top: 10,
//             right: 40,
//             left: -20,
//             bottom: 0,
//           }}
//         >
//           <defs>
//             <linearGradient id="colorElectricity" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#48b461" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#48b461" stopOpacity={0} />
//             </linearGradient>
//             <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
//             </linearGradient>
//             <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#D3D3D3" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#D3D3D3" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <XAxis
//             dataKey="day"
//             ticks={xAxisTicks}
//             tickFormatter={(day) => `Day ${day}`}
//           />
//           <YAxis tick={false} axisLine={false} />
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="electricity"
//             stroke="#48b461"
//             fill="url(#colorElectricity)"
//           />
//           <Area
//             type="monotone"
//             dataKey="water"
//             stroke="#82ca9d"
//             fill="url(#colorWater)"
//           />
//           <Area
//             type="monotone"
//             dataKey="emissions"
//             stroke="#D3D3D3"
//             fill="url(#colorEmissions)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>

//       {/* Custom Legend */}
//       <div className="px-3 py-2">
//         <div className="d-flex align-items-center mb-2">
//           <span
//             style={{
//               backgroundColor: '#48b461',
//               borderRadius: '50%',
//               width: '12px',
//               height: '12px',
//               marginRight: '8px',
//             }}
//           ></span>
//           <p className="mb-0">Electricity ({electricitySavingPercentage}% saved)</p>
//         </div>
//         <div className="d-flex align-items-center mb-2">
//           <span
//             style={{
//               backgroundColor: '#82ca9d',
//               borderRadius: '50%',
//               width: '12px',
//               height: '12px',
//               marginRight: '8px',
//             }}
//           ></span>
//           <p className="mb-0">Water ({waterSavingPercentage}% saved)</p>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default CustomAreaChart;
