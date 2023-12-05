import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import "primereact/resources/themes/viva-light/theme.css";
import 'primeicons/primeicons.css';
import AuthProvider from "./provider/authProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <App/>
    </AuthProvider>
);