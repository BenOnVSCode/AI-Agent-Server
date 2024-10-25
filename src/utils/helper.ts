export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [hours, minutes, secs]
    .map((val) => String(val).padStart(2, '0'))
    .join(':');
}


export function calculateDuration(startedAt: string, endedAt: string) {
  // Parse the input strings into Date objects
  const start = new Date(startedAt);
  const end = new Date(endedAt);

  // Check if both dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return undefined
  }

  // Calculate the duration in milliseconds
  const durationMs = end.getTime() - start.getTime();

  // Convert duration to different units
  const durationSeconds = Math.floor(durationMs / 1000);
  const durationMinutes = Math.floor(durationMs / (1000 * 60));
  const durationHours = (durationMs / (1000 * 60 * 60)).toFixed(2);

  return {
    durationSeconds,
    durationMinutes,
    durationHours,
  };
}


export function filterUndefined(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );
}