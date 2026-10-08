import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Perform a health check on the backend API.
 */
export async function healthCheck() {
  const response = await apiClient.get('/health');
  return response.data;
}

/**
 * Upload an audio file for speech analysis (Mock on Day 1).
 * @param {File} file 
 */
export async function analyzeSpeech(file) {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }

  const response = await apiClient.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Fetch analysis results by ID (returns mock diagnostics on Day 1).
 * @param {string} id 
 */
export async function getResult(id) {
  const response = await apiClient.get(`/result/${id}`);
  return response.data;
}

export default apiClient;
