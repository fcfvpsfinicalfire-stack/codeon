/**
 * provisioningService.ts
 * Handles interaction with external Hosting Panels (Pterodactyl, Virtualizor, etc.)
 */

interface ServerCredentials {
    node_name: string;
    ip_address: string;
    port: number;
    username?: string;
    password?: string;
    panel_url?: string;
}

export const provisionServer = async (order: any): Promise<ServerCredentials> => {
    console.log(`[PROVISIONING] 🚀 Starting provision for Order #${order.order_code} (${order.service_type})`);

    // SIMULATION DELAY (Replace this with real API call later)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // MOCK RESPONSE
    // TODO: Integrate Pterodactyl / Virtualizor API here
    const mockResponse: ServerCredentials = {
        node_name: "Node-Alpha-01",
        ip_address: "192.168.100.5",
        port: 25500 + Math.floor(Math.random() * 100), // Random port
        username: order.user?.username || `client_${order.user_id}`,
        password: generateTempPassword(),
        panel_url: "https://panel.codeon.lk"
    };

    console.log(`[PROVISIONING] ✅ Success: Server allocated on ${mockResponse.node_name}`);
    return mockResponse;
};

const generateTempPassword = () => {
    return Math.random().toString(36).slice(-8) + "Aa1!";
};
