
/**
 * Codeon Hosting PayHere Integration Service
 * Follows PayHere Merchant API Specification
 */

interface PayHereParams {
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  currency: 'LKR';
  amount: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
}

export const initiatePayHerePayment = (params: PayHereParams, hash: string) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://web.payhere.lk/pay/checkout'; // Change to sandbox.payhere.lk for testing

  const fields = { ...params, hash };

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value.toString();
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};

/**
 * Backend logic (PHP/Node) for generating the hash:
 * md5(merchant_id + order_id + amount_formatted + currency + md5(merchant_secret).toUpperCase()).toUpperCase()
 */
