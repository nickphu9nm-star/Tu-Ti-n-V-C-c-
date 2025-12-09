import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App'; // Sửa đường dẫn trỏ vào App trong components

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);