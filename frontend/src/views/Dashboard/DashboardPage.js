import React, { useState, useEffect } from 'react';
import './DashboardPage.css'; // Assuming you'll create a CSS file for styling
import { Line, Bar } from 'react-chartjs-2';
import clock from '../../images/clock.jpg';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  GridLine,
} from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUsers, 
    faDumbbell, 
    faCreditCard
  } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

function DashboardPage() {
  const [stats, setStats] = useState({
    availableCoaches: 0,
    subscribers: 0,
    damagedEquipment: 0,
    availableCoachesChange: '+6% par rapport au mois dernier', // Placeholder for indicator (French)
    subscribersChange: '+4% par rapport au mois dernier', // Placeholder for indicator (French)
    damagedEquipmentChange: '-2% par rapport au mois dernier', // Placeholder for indicator (French)
  });

  const [annualIncomeDataCurrentYear, setAnnualIncomeDataCurrentYear] = useState([]);
  const [annualIncomeDataLastYear, setAnnualIncomeDataLastYear] = useState([]);
  const [unpaidSubscriptionsData, setUnpaidSubscriptionsData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date()); // State for current time

  useEffect(() => {
    // Simulate fetching data for stats and graphs
    setTimeout(() => {
      setStats({
        availableCoaches: 15,
        subscribers: 250,
        damagedEquipment: 5,
        availableCoachesChange: '+6% par rapport au mois dernier', // Simulate data (French)
        subscribersChange: '+4% par rapport au mois dernier', // Simulate data (French)
        damagedEquipmentChange: '-2% par rapport au mois dernier', // Simulate data (negative example) (French)
      });

      // Example data structure for annual income graph (Current Year)
      const today = new Date();
      const currentMonth = today.getMonth(); // 0-indexed

      const currentYearIncome = [
        { month: 'Jan', income: 5500 },
        { month: 'Feb', income: 6500 },
        { month: 'Mar', income: 7800 },
        { month: 'Apr', income: 8200 },
        { month: 'May', income: 7300 },
        { month: 'Jun', income: 8800 },
        { month: 'Jul', income: 9300 },
        { month: 'Aug', income: 9000 },
        { month: 'Sep', income: 9800 },
        { month: 'Oct', income: 10500 },
        { month: 'Nov', income: 9500 },
        { month: 'Dec', income: 10000 },
      ].slice(0, currentMonth + 1); // Slice to include data up to the current month

      setAnnualIncomeDataCurrentYear(currentYearIncome);

      // Example data structure for annual income graph (Last Year)
       const lastYearIncome = [
        { month: 'Jan', income: 5000 },
        { month: 'Feb', income: 6000 },
        { month: 'Mar', income: 7500 },
        { month: 'Apr', income: 8000 },
        { month: 'May', income: 7000 },
        { month: 'Jun', income: 8500 },
        { month: 'Jul', income: 9000 },
        { month: 'Aug', income: 8800 },
        { month: 'Sep', income: 9500 },
        { month: 'Oct', income: 10000 },
        { month: 'Nov', income: 9200 },
        { month: 'Dec', income: 9800 },
      ];

      setAnnualIncomeDataLastYear(lastYearIncome);

      // Generate data for all days of the current month
      const year = today.getFullYear();
      const month = today.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const monthlyUnpaidData = [];
      for (let i = 1; i <= daysInMonth; i++) {
        // Simulate a random number of unpaid subscriptions for each day
        const simulatedUnpaidCount = Math.floor(Math.random() * 10); // Random count between 0 and 9
        monthlyUnpaidData.push({ day: i, count: simulatedUnpaidCount });
      }

      setUnpaidSubscriptionsData(monthlyUnpaidData);
    }, 1000); // Simulate network delay

    // Set up interval for the clock
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);

  }, []);

   const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  const annualIncomeChartData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'], // Months in French
    datasets: [
        {
            label: 'Revenu Annuel Actuel', // Current Year Income (French)
            data: annualIncomeDataCurrentYear.map(data => data.income),
            fill: true, // Fill area under the line
            backgroundColor: 'rgba(128, 0, 128, 0.1)', // Lighter purple shade with transparency
            borderColor: 'rgb(253 126 20)', // Purple color
            tension: 0.3, // Soften the line curves
            pointRadius: 4, // Slightly smaller point size
            pointBackgroundColor: 'rgb(253 126 20)', // Purple point color
            pointHoverRadius: 6,
            pointHitRadius: 10,
        },
         {
            label: 'Revenu Annuel de l\'année dernière', // Last Year Income (French)
            data: annualIncomeDataLastYear.map(data => data.income),
            fill: false, // Don't fill area under this line
            borderColor: 'rgba(108, 117, 125, 0.5)', // Gray color for last year
            tension: 0.3, // Soften the line curves
            pointRadius: 4,
            pointBackgroundColor: 'rgba(108, 117, 125, 0.5)',
            pointHoverRadius: 6,
            pointHitRadius: 10,
        },
    ],
  };

  const annualIncomeChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to adjust height
    plugins: {
      legend: {
        display: true, // Show legend to differentiate lines
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
            autoSkip: true,
            maxTicksLimit: 12,
        }
      },
      y: {
        beginAtZero: true,
        grid: {
           color: '#e9e9e9', // Lighter gray grid lines for y-axis
           drawBorder: false, // Hide y-axis border
        },
         ticks: {
            autoSkip: true,
            maxTicksLimit: 8,
         }
      }
    }
  };

  const unpaidSubscriptionsChartData = {
    labels: unpaidSubscriptionsData.map(data => `Jour ${data.day}`), // Day X (French)
    datasets: [
      {
        label: 'Abonnements impayés', // Unpaid Subscriptions (French)
        data: unpaidSubscriptionsData.map(data => data.count),
        backgroundColor: 'rgba(255, 152, 0, 0.6)', // Reddish color with more opacity
         borderColor: 'rgba(255, 152, 0, 1)', // Solid reddish border
         borderWidth: 1,
         borderRadius: 5,
      },
    ],
  };

   const unpaidSubscriptionsChartOptions = {
    responsive: true,
     maintainAspectRatio: false, // Allow chart to adjust height
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: false,
      },
       tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
     scales: {
      x: {
         grid: {
          display: false, // Hide x-axis grid lines
        },
         ticks: {
            autoSkip: true,
            maxTicksLimit: 15, // Limit ticks to avoid clutter
         }
      },
      y: {
        beginAtZero: true,
         max: 10, // Set max for y-axis based on simulated data range
         grid: {
           color: '#e9e9e9', // Lighter gray grid lines for y-axis
           drawBorder: false, // Hide y-axis border
         },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
         }
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1>Aperçu</h1>{/* Overview (French) */}

      <div className="dashboard-stats">
        {/* Placeholder for stats: Available Coaches, Subscribers, Damaged Equipment */}
        <div className="stat-card">
          <h2>Coachs Disponibles <span className="stat-card-icon"> <FontAwesomeIcon icon={faUsers} /> </span></h2>{/* Available Coaches (French) */}

          <div className="stat-card-number">
            <p>{stats.availableCoaches}</p>
            {/* Use className based on positive or negative change */}
            <span className={`stat-indicator ${stats.availableCoachesChange.startsWith('+') ? 'positive' : 'negative'}`}>
              {stats.availableCoachesChange}
              </span>
          </div>
        </div>
        <div className="stat-card">
          <h2>Abonnés <span className="stat-card-icon"> <FontAwesomeIcon icon={faCreditCard} /> </span></h2>{/* Subscribers (French) */}
           <div className="stat-card-number">
            <p>{stats.subscribers}</p>
             {/* Use className based on positive or negative change */}
            <span className={`stat-indicator ${stats.subscribersChange.startsWith('+') ? 'positive' : 'negative'}`}>
              {stats.subscribersChange}
              </span>
          </div>
        </div>
        <div className="stat-card">
          <h2>Équipement Endommagé <span className="stat-card-icon"> <FontAwesomeIcon icon={faDumbbell} /> </span></h2>{/* Damaged Equipment (French) */}
           <div className="stat-card-number">
             <p>{stats.damagedEquipment}</p>
              {/* Use className based on positive or negative change */}
              <span className={`stat-indicator ${stats.damagedEquipmentChange.startsWith('+') ? 'positive' : 'negative'}`}>
                {stats.damagedEquipmentChange}
                </span>
          </div>
        </div>
      </div>

      <div className="dashboard-middle-graph">
        <h2>Revenu Annuel (Paiements & Abonnements)</h2>{/* Annual Income (Payments & Subscriptions) (French) */}
        {/* Integrate your annual income graph here using a library like Chart.js */}
        <div className="chart-container">
           <Line data={annualIncomeChartData} options={annualIncomeChartOptions} />
        </div>
      </div>

      <div className="dashboard-bottom-section">
        <div className="dashboard-bottom-left-graph">
          <h2>Abonnements impayés (Mensuel)</h2>{/* Unpaid Subscriptions (Monthly) (French) */}
           {/* Integrate your unpaid subscriptions graph here using a library like Chart.js */}
          {/* Using a Bar chart */}
           <div className="chart-container">
             <Bar data={unpaidSubscriptionsChartData} options={unpaidSubscriptionsChartOptions} />
           </div>
        </div>

        <div className="dashboard-clock-area" style={{ backgroundImage: `url(${clock})` }}>
          <h2>Heure Actuelle</h2>{/* Current Time (French) */}
          {/* Integrate your Clock component here */}
          {/* Use the Clock component */}
          <div className="clock-time-display">{formatTime(currentTime)}</div> {/* Display formatted current time in a div */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage; 