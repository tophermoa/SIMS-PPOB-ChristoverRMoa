import axios from 'axios';
import { getNavigate } from '../utils/NavigationService';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Modal from '../components/Modal';
import { CloseOutlined } from '@ant-design/icons';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// attach JWT token from localStorage to every request.
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isAuthModalOpen = false;

// modal for invalid token notification
const showAuthErrorModal = (message) => {
  if (isAuthModalOpen) return;
  isAuthModalOpen = true;

  const modalDiv = document.createElement('div');
  document.body.appendChild(modalDiv);
  const root = createRoot(modalDiv);

  const handleClose = () => {
    root.unmount();
    modalDiv.remove();
    isAuthModalOpen = false;

    localStorage.removeItem('token');
    const navigate = getNavigate();
    if (navigate) {
      navigate('/login');
    } else {
      window.location.href = '/login';
    }
  };

  root.render(
    React.createElement(Modal, {
      isOpen: true,
      icon: React.createElement('div', {
        style: {
          width: 70, height: 70, borderRadius: "50%", backgroundColor: "red",
          display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
        }
      }, React.createElement(CloseOutlined, { style: { color: "white" } })),
      iconBgColor: "green",
      title: "Invalid Token",
      description: message || "Token tidak tidak valid atau kadaluwarsa",
      primaryButtonText: "Kembali ke halaman Login",
      onPrimaryClick: handleClose
    })
  );
};


// handle global error responses (e.g. 401 Unauthorized).
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle 108 custom status inside successful HTTP 200
    if (response.data && response.data.status === 108) {
      showAuthErrorModal(response.data.message);
      return Promise.reject(new Error(response.data.message));
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      alert('Tidak ada koneksi internet');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Handle standard HTTP 401 or custom 108 inside 401
        showAuthErrorModal(data?.message || 'Token tidak tidak valid atau kadaluwarsa');
        break;

      case 500:
        alert(data?.message || 'Internal Server Error');
        break;

      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
