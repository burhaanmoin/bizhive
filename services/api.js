import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // <-- match your backend port // Adjust this to match your backend URL

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEnterpriseById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/enterprise/${id}`);
  return response.data;
};

export const getEnterpriseDocuments = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/enterprise/${id}/documents`);
  return response.data;
};

export const getEnterpriseReports = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/enterprise/${id}/reports`);
  return response.data;
};

export const uploadEnterpriseDocument = async (id, file, name, status) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('status', status);
  const response = await axios.post(`${API_BASE_URL}/api/enterprise/${id}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const uploadEnterpriseReport = async (id, report) => {
  const response = await axios.post(`${API_BASE_URL}/api/enterprise/${id}/reports`, report);
  return response.data;
};

export const deleteEnterpriseDocument = async (docId) => {
  const response = await axios.delete(`${API_BASE_URL}/api/enterprise/documents/${docId}`);
  return response.data;
};

export const deleteEnterpriseReport = async (reportId) => {
  const response = await axios.delete(`${API_BASE_URL}/api/enterprise/reports/${reportId}`);
  return response.data;
};

export const updateEnterprise = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/api/enterprise/${id}`, data);
  return response.data;
};

// You can keep the default export if needed
const api = {
  login: loginUser,
  getEnterpriseById: getEnterpriseById,
  getEnterpriseDocuments: getEnterpriseDocuments,
  getEnterpriseReports: getEnterpriseReports,
  uploadEnterpriseDocument: uploadEnterpriseDocument,
  uploadEnterpriseReport: uploadEnterpriseReport,
  deleteEnterpriseDocument: deleteEnterpriseDocument,
  deleteEnterpriseReport: deleteEnterpriseReport,
  updateEnterprise: updateEnterprise,
  // Add other API methods as needed
};

export default api; 