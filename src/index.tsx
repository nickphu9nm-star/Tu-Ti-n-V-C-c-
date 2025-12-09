import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Đã sửa: bỏ chữ /src thừa đi
import './index.css'; // Giữ nguyên dòng này nếu bạn có file css

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)