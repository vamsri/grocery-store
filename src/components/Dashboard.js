/* eslint-disable */
import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';

const Dashboard = () => {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];
  return (
    <div className="container mx-auto p-10 h-screen overflow-scroll grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="w-102 h-80 bg-white border-2">
        <h1 className="text-sm bg-red-400 text-white uppercase w-full mx-auto p-2">Sales Overview</h1>
        <div className='w-full h-4/5'>
          <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
        </div>
      </div>
      <div className="w-102 h-80 bg-white border-2">
        <h1 className="text-sm bg-red-400 text-white uppercase w-full mx-auto p-2">Order Management</h1>
        <div className='w-full h-4/5'>
          <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 }
            ]}
          />
        </div>
      </div>
      <div className="w-102 h-80 bg-white border-2">
        <h1 className="text-sm bg-red-400 text-white uppercase w-full mx-auto p-2">Customer Management</h1>
        <div className='w-full h-4/5'>
          <VictoryPie
            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 }
            ]}
          />
        </div>
      </div>
      <div className="w-102 h-80 bg-white border-2">
        <h1 className="text-sm bg-red-400 text-white uppercase w-full mx-auto p-2">Product Inventory</h1>
        <div className='w-full h-4/5'>
          <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
        </div>
      </div>
      
      <div className="w-102 h-80 bg-white border-2">
        <h1 className="text-sm bg-red-400 text-white uppercase w-full mx-auto p-2">Product Inventory</h1>
        <div className='w-full h-4/5'>
          <VictoryChart
            // adding the material theme provided with Victory
            theme={VictoryTheme.material}
            domainPadding={20}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
            />
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
