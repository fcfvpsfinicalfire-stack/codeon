
/**
 * Codeon Hosting Automation Orchestrator
 * Connects to Pterodactyl (Games) and Proxmox (VPS)
 */

const API_BASE = '/api/v1/automation';

export const ServiceModule = {
  // Pterodactyl Logic
  async controlGameServer(uuid: string, signal: 'start' | 'stop' | 'restart' | 'kill') {
    const res = await fetch(`${API_BASE}/pterodactyl/power`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid, signal })
    });
    return res.json();
  },

  // Proxmox Logic
  async controlVPS(vmid: string, node: string, status: 'start' | 'shutdown' | 'reboot' | 'stop') {
    const res = await fetch(`${API_BASE}/proxmox/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vmid, node, status })
    });
    return res.json();
  },

  // Provisioning
  async provisionService(planId: number, userId: number) {
    const res = await fetch(`${API_BASE}/provision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, userId })
    });
    return res.json();
  }
};
