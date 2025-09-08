import React, { useEffect, useState } from "react";
import { MonthlySale } from "../types";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlySalesChart: React.FC<{ vendor: string }> = ({ vendor }) => {
    const [data, setData] = useState<MonthlySale[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/sales/monthly?vendor=${vendor}`).then((res: any) => {
            setData(res.data);
        });
    }, [vendor]);

    const monthNames = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    const backgroundColors = [
        "#3b82f6", "#2563eb", "#1d4ed8", "#60a5fa", "#93c5fd", "#1e40af", "#4338ca",
        "#818cf8", "#6366f1", "#4f46e5", "#6366f1", "#4338ca"
    ];

    const chartData = {
        labels: data.map(d => `${monthNames[d.month - 1]} ${d.year}`),
        datasets: [
            {
                data: data.map(d => d.totalQuantity),
                backgroundColor: data.map((_, i) => backgroundColors[i % backgroundColors.length]),
            },
        ],
    };

    const options = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return <Bar data={chartData} options={options} />;
};

export default MonthlySalesChart;