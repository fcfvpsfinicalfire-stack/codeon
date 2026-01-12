
/**
 * Codeon Hosting - PayHere LKR Integration
 */

interface PayHereOrder {
  merchant_id: string;
  order_id: string;
  amount: number;
  currency: 'LKR';
  items: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export const checkoutWithPayHere = (order: PayHereOrder, hash: string) => {
  const form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', 'https://web.payhere.lk/pay/checkout'); // Use sandbox.payhere.lk for testing

  const fields = {
    ...order,
    hash,
    return_url: `${window.location.origin}/dashboard?payment=success`,
    cancel_url: `${window.location.origin}/dashboard?payment=cancelled`,
    notify_url: `${process.env.API_URL}/payments/payhere/notify`,
  };

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', key);
    input.setAttribute('value', String(value));
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};
