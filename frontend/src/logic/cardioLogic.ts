export const calculatePace = (duration: number, distance: number): string => {
  if (distance === 0) return "0:00 min/km";
  const paceInSeconds = duration / distance;
  const minutes = Math.floor(paceInSeconds / 60);
  const seconds = Math.round(paceInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")} min/km`;
};

export const calculateSpeed = (duration: number, distance: number): string => {
  if (duration === 0) return "0 km/h";
  const speed = (distance / duration) * 3600; // Convert to km/h
  return `${speed.toFixed(2)} km/h`;
};