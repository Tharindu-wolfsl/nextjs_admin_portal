import { Bar, Pie } from 'react-chartjs-2';

export default function ChartComponent({ type, data, options }) {
    return (
        <>
            {type === 'bar' && <Bar data={data} options={options} />}
            {type === 'pie' && <Pie data={data} options={options} />}
        </>
    );
}
