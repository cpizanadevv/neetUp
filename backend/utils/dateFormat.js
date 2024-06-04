function dateFormat(date) {
  const tmp = new Date(date);
  const year = tmp.getFullYear();
  const month = String(tmp.getMonth() + 1).padStart(2, '0');
  const day = String(tmp.getDate()).padStart(2, '0');
  const hours = String(tmp.getHours()).padStart(2, '0');
  const minutes = String(tmp.getMinutes()).padStart(2, '0');
  const seconds = String(tmp.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDatesInObject(obj, seen = new Set()) {
  if (seen.has(obj)) {
    return;
  }
  seen.add(obj);

  for (let key in obj) {
    if (obj[key] instanceof Date) {
      obj[key] = dateFormat(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      formatDatesInObject(obj[key], seen);
    }
  }
}

module.exports = { dateFormat, formatDatesInObject };
