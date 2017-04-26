export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('de-CH', {day: '2-digit', month: '2-digit', year: 'numeric'});
}

export function formatAmount(amount: string) {
  if ( typeof amount === 'undefined' ) {
    return '';
  }

  return (Math.ceil(amount*20)/20).toLocaleString('en-US', {minimumFractionDigits: 2});
}
