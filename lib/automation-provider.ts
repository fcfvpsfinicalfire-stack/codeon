
/**
 * In a real production environment, these would be fetch() calls to your 
 * Middleware API which handles Pterodactyl or Proxmox authentication.
 */

export const triggerAutomation = async (type: 'vps' | 'pterodactyl', action: string, id: string) => {
  console.log(`[Automation] Triggering ${action} on ${type} ID: ${id}`);
  
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    message: `${action.toUpperCase()} signal sent successfully to node.`
  };
};

export const checkServiceHealth = async (id: string) => {
  // Mocking real-time resource usage
  return {
    cpu: (Math.random() * 45).toFixed(1) + '%',
    ram: (Math.random() * 2 + 1).toFixed(2) + ' GB',
    status: 'Online'
  };
};
