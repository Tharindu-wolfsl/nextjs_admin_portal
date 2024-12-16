"use client"; // Ensure this is included if using client-side hooks like useRef

import {Doughnut, Bar} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement, Title, LinearScale} from 'chart.js';
import '/src/app/css/common.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, BarElement, Title, LinearScale);

export default function Dashboard() {
    const donutData = {
        labels: ['Success', 'Failed', 'Refund'],
        datasets: [
            {
                data: [55, 25, 20],
                backgroundColor: ['#04334D', '#01ACED', '#3358ff'],
                hoverBackgroundColor: ['#66BB6A', '#FF7043', '#FFD54F'],
            },
        ],
    };

    const barData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Transactions',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#03A9F4',
            },
        ],
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex-auto bg-blue-200 p-10 rounded-md">
                <h1 className="text-lg md:text-2xl lg:text-3xl text-[#04334D] font-bold">
                    Update your KYC changes
                </h1>
            </div>

            {/*<div className="flex gap-4">*/}
            {/*    {['Hourly', 'Daily', 'Weekly', 'Monthly', 'Custom'].map((label) => (*/}
            {/*        <div*/}
            {/*            key={label}*/}
            {/*            className="box-border text-stone-400 h-2.5 w-16 p-2 border-2 border-neutral-400 flex items-center justify-center rounded-md"*/}
            {/*        >*/}
            {/*            <div>{label}</div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}

            <div className="flex gap-4 text-stone-400">
                {[
                    'Total Transactions',
                    'Success Transactions',
                    'Failed Transactions',
                    'Refund Transactions',
                    'Void Transactions',
                    'Chargebacks',
                ].map((label) => (
                    <div
                        key={label}
                        className="flex-1 box-border h-16 p-2 border-2 border-neutral-400 flex items-center justify-center"
                    >
                        <div>{label}</div>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <div className="-flex-1 bg-white p-4 shadow-md rounded-md">
                    <h2 className="text-center md:text-lg lg:text-xl text-[#04334D] text-base font-semibold mb-4">Payments
                        by Method</h2>
                    <div className="w-2/3 h-48 mx-auto"> {/* Responsive sizing */}
                        <Doughnut data={donutData}/>
                    </div>
                </div>

                <div className="flex-1 bg-slate-800 p-4 shadow-md rounded-md">
                    <h2 className="text-center md:text-lg lg:text-xl text-[#04334D] text-base font-semibold mb-4">Monthly
                        Success Transactions</h2>
                    <div className="w-2/3 h-48 mx-auto"> {/* Responsive sizing */}
                        <Bar data={barData}/>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="-flex-1 bg-slate-800 p-4 shadow-md rounded-md">
                    <h2 className="text-center md:text-lg lg:text-xl text-[#04334D] text-base font-semibold mb-4">Recent
                        Transactions</h2>
                </div>
                <div className="-flex-1 bg-slate-800 p-4 shadow-md rounded-md">
                    <h2 className="text-center md:text-lg lg:text-xl text-[#04334D] text-base font-semibold mb-4">Transaction
                        by Integrations</h2>
                </div>
            </div>

        </div>
    );
}
