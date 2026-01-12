
export const formatLKR = (amount: number) => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const calculateNextDueDate = (months = 1) => {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split('T')[0];
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'paid': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    case 'unpaid':
    case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    case 'overdue':
    case 'suspended': return 'bg-red-500/10 text-red-500 border-red-500/20';
    default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  }
};
