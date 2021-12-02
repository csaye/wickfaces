// time constants
const MIN = 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

// returns representation of time since given date
export default function getAgoText(date) {
  const ms = new Date() - date;
  const secs = Math.floor(ms / 1000);
  if (secs < MIN) return `${secs}s ago`;
  if (secs < HOUR) return `${Math.floor(secs / MIN)}m ago`;
  if (secs < DAY) return `${Math.floor(secs / HOUR)}h ago`;
  if (secs < WEEK) return `${Math.floor(secs / DAY)}d ago`;
  return `${Math.floor(secs / WEEK)}w ago`;
}
