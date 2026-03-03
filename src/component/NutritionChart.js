import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Đăng ký các module của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * NutritionChart - Component hiển thị biểu đồ dinh dưỡng
 * Chứa 2 biểu đồ:
 * 1. Pie chart: Phân bổ Macro (Carb, Protein, Fat)
 * 2. Bar chart: Calories & Fiber so với mục tiêu ngày
 */
const NutritionChart = ({ nutrition }) => {
  if (!nutrition) return null;

  const { Calories, Protein, Carb, Fat, Fiber } = nutrition;

  // Pie Chart Data (Macro Distribution)
  const pieData = {
    labels: ['Carbs', 'Protein', 'Fat'],
    datasets: [
      {
        data: [Carb, Protein, Fat],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)', // Blue for Carb
          'rgba(75, 192, 192, 0.8)', // Green for Protein
          'rgba(255, 99, 132, 0.8)'  // Red for Fat
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Macro Distribution (g)', font: { size: 16 } },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${context.raw}g`
        }
      }
    },
  };

  // Bar Chart Data (Calories & Fiber vs Target)
  const barData = {
    labels: ['Calories (kcal)', 'Fiber (g)'],
    datasets: [
      {
        label: 'Giá trị video',
        data: [Calories, Fiber],
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
      },
      {
        label: 'Mục tiêu khuyến nghị/bữa',
        data: [600, 10], // Giả sử mục tiêu 1 bữa là 600 calo, 10g xơ
        backgroundColor: 'rgba(201, 203, 207, 0.5)',
      }
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Năng Lượng & Chất Xơ', font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="nutrition-charts-container" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div className="chart-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '300px' }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
      <div className="chart-wrapper">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default NutritionChart;
