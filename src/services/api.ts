import axios from 'axios';

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const API_URL = "INSERT_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE";

export interface Order {
    OrderID: string;
    ClientName: string;
    Email: string;
    Amount: string;
    Method: string;
    ReceiptURL: string;
    Status: string;
    CreatedAt: string;
}

export const api = {
    createOrder: async (orderData: any) => {
        // Apps Script requires text/plain for CORS sometimes or specific handling
        // We'll try standard JSON first, but often text/plain is safer for Apps Script doPost
        return axios.post(API_URL, JSON.stringify({ action: 'create_order', ...orderData }), {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });
    },

    getOrders: async (email?: string) => {
        let url = API_URL;
        if (email) {
            url += `?email=${encodeURIComponent(email)}`;
        }
        return axios.get(url);
    },

    updateStatus: async (orderId: string, status: string, clientEmail?: string) => {
        return axios.post(API_URL, JSON.stringify({
            action: 'update_status',
            orderId,
            status,
            clientEmail
        }), {
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
        });
    },
};
