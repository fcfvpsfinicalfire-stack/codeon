/**
 * CODEON HOSTING - Node.js Backend Client
 * Connects to the local Express/Prisma API
 */
import axios from 'axios';

// Backend URL (Node.js Server)
const API_URL = `http://${window.location.hostname}:5000/api`;

export const api = {
  getAuthToken: () => localStorage.getItem('codeon_jwt'),

  setAuthToken: (token: string) => {
    if (token) {
      localStorage.setItem('codeon_jwt', token);
    } else {
      localStorage.removeItem('codeon_jwt');
      localStorage.removeItem('codeon_user');
    }
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('codeon_user');
      return user ? JSON.parse(user) : null;
    } catch (e) {
      localStorage.removeItem('codeon_user');
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem('codeon_user');
    localStorage.removeItem('codeon_jwt');
    window.location.href = '/login';
  },

  // --- GENERIC REQUESTER ---
  request: async (endpoint: string, method: string = 'GET', body: any = null, isFormData: boolean = false) => {
    try {
      const headers: any = {};
      const token = api.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      const url = `${API_URL}${endpoint}`;

      const config = {
        method,
        url,
        headers,
        data: body
      };

      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      console.error(`API Error [${endpoint}]:`, error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  // --- AUTHENTICATION ---
  register: async (name: string, email: string, password: string) => { // Fixed: Explicit params
    const res = await api.post('/auth/register', { name, email, password });
    if (res.token) {
      api.setAuthToken(res.token);
      localStorage.setItem('codeon_user', JSON.stringify(res.user));
    }
    return res;
  },

  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.token) {
      api.setAuthToken(res.token);
      localStorage.setItem('codeon_user', JSON.stringify(res.user));
    }
    return res;
  },

  verifyMagicLink: async (token: string) => {
    const res = await api.post('/auth/verify-magic-link', { token });
    if (res.token) {
      api.setAuthToken(res.token);
      localStorage.setItem('codeon_user', JSON.stringify(res.user));
    }
    return res;
  },

  checkEmail: async (email: string) => {
    return await api.post('/auth/check-email', { email });
  },

  getLoginHistory: async () => {
    return await api.get('/auth/history');
  },

  // --- ORDERS ---
  createOrder: async (data: any) => {
    // Direct integration with POST /api/orders
    // Backend expects: email, password (optional), username, fullName, serviceType, planName, amount, ram
    const payload = {
      email: data.email,
      password: data.password, // Optional if new user
      username: data.clientName?.replace(/\s+/g, '').toLowerCase() || data.email?.split('@')[0],
      fullName: data.clientName,
      serviceType: data.serviceType || 'minecraft', // map from UI
      planName: data.plan_name,
      amount: data.price,
      ram: data.ram // Extract from UI if available
    };

    const res = await api.post('/orders', payload);

    // Auto-login if token returned
    if (res.token) {
      api.setAuthToken(res.token);
      localStorage.setItem('codeon_user', JSON.stringify(res.user));
    }
    return res;
  },

  getMyOrders: async () => {
    return await api.get('/orders');
  },

  toggleAutoRenew: async (orderId: number) => {
    return await api.putAuth(`/orders/${orderId}/toggle-renew`, {});
  },

  getTrustStatus: async (orderId: string | number) => {
    return await api.get(`/orders/${orderId}/trust-status`);
  },

  // --- PAYMENTS ---
  // --- PAYMENTS ---
  submitPayment: async (data: { orderId: string, amount: string, date: string, method: string, notes?: string, file: File }) => {
    const formData = new FormData();
    formData.append('orderId', data.orderId);
    formData.append('amount', data.amount);
    formData.append('date', data.date);
    formData.append('method', data.method);
    if (data.notes) formData.append('notes', data.notes);
    formData.append('proof', data.file);
    return await api.request('/payments/submit', 'POST', formData, true);
  },

  // Legacy alias if needed, but safe to remove if unused
  uploadProof: async (orderId: string, file: File) => {
    // Basic fallback
    return api.submitPayment({
      orderId,
      file,
      amount: '0',
      date: new Date().toISOString(),
      method: 'MANUAL'
    });
  },

  // --- ADMIN (Protected) ---
  getPendingOrders: async () => {
    return await api.get('/admin/pending');
  },

  approveOrder: async (orderId: string) => {
    return await api.post('/payments/approve', { orderId });
  },

  rejectOrder: async (orderId: string, reason: string) => {
    return await api.post('/payments/reject', { orderId, reason });
  },

  // --- TICKETS ---
  getMyTickets: async () => {
    return await api.get('/tickets');
  },

  createTicket: async (subject: string, message: string) => {
    return await api.post('/tickets', { subject, message });
  },

  replyTicket: async (ticketId: string, message: string) => {
    return await api.post(`/tickets/${ticketId}/reply`, { message });
  },

  // --- NOTIFICATIONS ---
  getNotifications: async () => {
    return await api.get('/notifications');
  },

  markNotificationRead: async (id: string) => {
    return await api.putAuth(`/notifications/${id}/read`, {});
  },

  updateProfile: async (data: any) => {
    return await api.putAuth('/auth/me', data);
  },

  // --- HELPERS ---
  get: (url: string) => api.request(url, 'GET'),
  post: (url: string, data: any) => api.request(url, 'POST', data),
  putAuth: (url: string, data: any) => api.request(url, 'PUT', data),
};
