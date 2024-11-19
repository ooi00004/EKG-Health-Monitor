import React, { useState, useEffect } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function App() {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false); 
  const [isFetchingData, setIsFetchingData] = useState(false); 

  useEffect(() => {
    let interval;
    if (isFetchingData) {
      // Start fetching data every second
      interval = setInterval(() => {
        fetch('http://localhost:5010/api/data')
          .then((response) => response.json())
          .then((newData) => {
            const ekgData = newData?.data || [];
            setData((prevData) => [...prevData.slice(-40), ...ekgData]);
          })
          .catch((error) => console.error('Error fetching data:', error));
      }, 1000);
    } else {
      // Stop fetching data
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFetchingData]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Start fetching data
  const handleStart = () => {
    console.log('Start button clicked');
    setIsFetchingData(true); 
  };

  // Stop fetching data
  const handleStop = () => {
    console.log('Stop button clicked');
    setIsFetchingData(false); 
  };

  const ekgData = {
    labels: Array.from({ length: data.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'EKG Signal',
        data: data,
        borderColor: darkMode ? '#fa7970' : '#e76f51',
        backgroundColor: darkMode ? '#faa406' : '#e76f51',
        tension: 0,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className={`BodyContainer ${darkMode ? 'dark' : 'light'}`}>
      <h1>Electrocardiogram Health Monitor</h1>

      <div className='ButtonContainer'>
        <button className={`start ${darkMode ? 'dark' : 'light'}`} onClick={handleStart}>Start</button>
        <button className={`pause ${darkMode ? 'dark' : 'light'}`}>Pause</button>
        <button className={`record ${darkMode ? 'dark' : 'light'}`}>Record</button>
        <button className={`stop ${darkMode ? 'dark' : 'light'}`} onClick={handleStop}>Stop</button>
      </div>

      <div className={`ChartContainer ${darkMode ? 'dark' : 'light'}`}>
      {data.length > 0 ? (
          <Line
            data={ekgData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: {
                  display: true,
                  title: { display: true, text: 'Time (s)' },
                  ticks: {
                    display: false,
                  },
                  grid: {
                    display: true,
                    color: darkMode ? '#333' : '#eee',
                  }
                },
                y: {
                  display: true,
                  title: { display: true, text: 'Amplitude' },
                  grid: {color: darkMode ? '#333' : '#eee',}
                },
              },
            }}
          />
        ) : (
          <p>No data available. Please turn on the microcontroller</p>
        )}
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="toggle-container">
        <div className={`toggle ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
          <div className="toggle-slider"></div>
        </div>
        <span className="toggle-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      {/* Test to see if backend and frontend are working */}
      {/* <button onClick={fetchData}>Get Data from Backend</button> */}
      {/* <p>{data ? data : 'Click the button to fetch data'}</p> */}
    </div>
  );
}

export default App;