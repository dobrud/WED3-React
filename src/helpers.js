export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('de-CH', {day: '2-digit', month: '2-digit', year: 'numeric'});
}

export function formatAmount(amount: string) {
  return (Math.ceil(amount*20)/20).toFixed(2);
}
