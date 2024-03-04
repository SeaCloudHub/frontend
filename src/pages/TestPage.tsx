import DashBoard from './admin/dashboard/DashBoard';

const TestPage = () => {
  return (
    <>
      {/* <div className='flex'>
        <PieChartCore
          data={[
            { value: 10, label: 'Aadfasfasffsadfasfdsf' },
            { value: 20, label: 'Báadfsdffdasf' },
          ]}
          sizing={{ height: 200 }}
        />
        <PieChartCore
          data={[
            { value: 10, label: 'A' },
            { value: 20, label: 'B' },
            { value: 30, label: 'C' },
          ]}
          sizing={{ height: 200 }}
        />
      </div> */}
      {/* <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      /> */}
      {/* <BarChartCore
        data={[
          { name: 1, value: 10 },
          { name: 1.4, value: 20 },
          { name: 2, value: 20 },
        ]}
        color='blue'
        sizing={{ height: 200 }}
      /> */}
      {/* <LineChartCore
        data={[
          { name: 0, value: 80 },
          { name: 1, value: 10 },
          { name: 1.4, value: 20 },
          { name: 2, value: 20 },
        ]}
        color='blue'
        sizing={{ height: 200 }}
      /> */}
      <DashBoard />
    </>
  );
};

export default TestPage;
