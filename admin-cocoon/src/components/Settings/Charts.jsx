import React from "react"; 
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import './Charts.css';

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Charts = () => {
  // Dữ liệu mẫu cho các biểu đồ
  const barData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: [12000, 19000, 3000, 5000, 2000],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b"],
      },
    ],
  };

  const lineData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Người dùng",
        data: [50, 100, 150, 200, 250],
        fill: false,
        borderColor: "#4e73df",
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ["Trực tiếp", "Giới thiệu", "Xã hội"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
      },
    ],
  };

  // Tùy chọn cho biểu đồ tròn
  const pieOptions = {
    plugins: {
      legend: {
        position: 'right', // Đặt vị trí của legend bên phải biểu đồ
        labels: {
          boxWidth: 25, // Chiều rộng của hộp màu
          padding: 20, // Khoảng cách giữa các mục trong legend
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#4e73df" }}>The Cocoon Original</h2>
      <div className="charts">
        <div className="chart-container">
          <h4>Biểu Đồ Tròn</h4>
          <div style={{ display: "flex", alignItems: "flex-start" }}> {/* Đặt alignItems thành flex-start để di chuyển lên trên */}
            <div style={{ flex: 1, marginRight: "20px", marginTop: "-20px" }}> {/* Thêm marginTop để di chuyển lên trên */}
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>
        <div className="chart-container">
          <h4>Biểu Đồ Đường</h4>
          <Line data={lineData} />
        </div>
      </div>
      <div className="bar-chart-container">
        <h4>Biểu Đồ Cột</h4>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;
