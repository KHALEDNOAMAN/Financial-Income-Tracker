const toKurus = (amount) => Math.round(parseFloat(amount) * 100);
const fromKurus = (kurus) => (parseInt(kurus) / 100).toFixed(2);
const formatCurrency = (amount, currency = 'TRY') => {
  const symbols = { TRY: 'â‚º', USD: '$', EUR: 'â‚¬' };
  const symbol = symbols[currency] || currency;
  return `${symbol}${parseFloat(amount).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const addMoney = (a, b) => fromKurus(toKurus(a) + toKurus(b));
const subtractMoney = (a, b) => fromKurus(toKurus(a) - toKurus(b));
module.exports = { toKurus, fromKurus, formatCurrency, addMoney, subtractMoney };
