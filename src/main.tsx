import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Ensure you have this for global styles or create it as needed

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Create a root and render the App component
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found. Ensure your HTML has an element with id="root".');
}
