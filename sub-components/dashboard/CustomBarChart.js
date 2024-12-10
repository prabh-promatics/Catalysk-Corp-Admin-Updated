import React, { PureComponent } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

class CustomBarChart extends PureComponent {
  render () {
    const { data, bar1Key, bar1Color, bar2Key, bar2Color, bar3Key, bar3Color } = this.props

    return (
      <Card className='h-100'>
        <Card.Body>
          <div className='d-flex align-items-center justify-content-between mb-4'>
            <div>
              <h4 className='mb-0'>Active Visualization</h4>
            </div>
          </div>
          <ResponsiveContainer width='100%' height={450}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: -60,
                bottom: 5
              }}
              barCategoryGap={15}
            >
              {/* <CartesianGrid strokeDasharray='3 3' /> */}
              <XAxis dataKey='name' />
              <YAxis tick={false} axisLine={false} />
              <Tooltip />
              {/* <Legend /> */}
              <Bar
                dataKey={bar1Key}
                fill={bar1Color}
                activeBar={<Rectangle fill='pink' stroke='blue' />}
              />
              <Bar
                dataKey={bar2Key}
                fill={bar2Color}
                activeBar={<Rectangle fill='gold' stroke='purple' />}
              />
              <Bar
                dataKey={bar3Key}
                fill={bar3Color}
                activeBar={<Rectangle fill='lightgreen' stroke='purple' />}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    )
  }
}

export default CustomBarChart
