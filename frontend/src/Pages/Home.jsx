import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

const Home=()=>{

    const data = [
        {
          name: 'Product 17',
          // uv: 4000,
          // pv: 2400,
          // amt: 2400,
          sales:200
        },
        {
          name: 'Product 23',
          // uv: 3000,
          // pv: 1398,
          // amt: 2210,
          sales:160
        },
        {
          name: 'Product 72',
          // uv: 2000,
          // pv: 9800,
          // amt: 2290,
          sales:117
        },
        {
          name: 'Product 5',
          // uv: 2780,
          // pv: 3908,
          // amt: 2000,
          sales:107
        },
        {
          name: 'Product 15',
          // uv: 1890,
          // pv: 4800,
          // amt: 2181,
          sales:77
        },
        // {
        //   name: 'Product 2',
        //   // uv: 2390,
        //   // pv: 3800,
        //   // amt: 2500,
        //   sales:75
        // },
        {
          name: 'Product 72',
          // uv: 3490,
          // pv: 4300,
          // amt: 2100,
          sales:62
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>80</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>9</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>DAILY CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>83</h1>
            </div>
            {/* <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div> */}
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home