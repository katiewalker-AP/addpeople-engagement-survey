// Returns CSS classes for traffic-light colouring of 1–5 scale scores.
export function trafficLightScore(avg: number): {
  bg: string;
  text: string;
  label: string;
  hex: string;
} {
  if (avg >= 4.5) return { bg: 'tl-bg-strong-positive', text: 'text-white', label: 'Excellent',    hex: '#1a7a40' };
  if (avg >= 3.5) return { bg: 'tl-bg-positive',        text: 'text-white', label: 'Good',         hex: '#27ae60' };
  if (avg >= 2.5) return { bg: 'tl-bg-neutral',         text: 'text-[#5a3e00]', label: 'Neutral', hex: '#f0c040' };
  if (avg >= 1.5) return { bg: 'tl-bg-concern',         text: 'text-white', label: 'Needs attention', hex: '#e67e22' };
  return               { bg: 'tl-bg-poor',           text: 'text-white', label: 'Poor',         hex: '#c0392b' };
}

export function trafficLightENPS(score: number): {
  hex: string;
  label: string;
} {
  if (score >= 40) return { hex: '#1a7a40', label: 'Excellent' };
  if (score >= 20) return { hex: '#27ae60', label: 'Good' };
  if (score >= 0)  return { hex: '#f0c040', label: 'Needs improvement' };
  return               { hex: '#c0392b', label: 'Poor' };
}
