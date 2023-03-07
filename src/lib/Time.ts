export function breakdownMinutes( totalMinutes: number ): { days: number, hours: number, minutes: number } {
    
  const days    = Math.floor( totalMinutes / ( 60 * 24 ) );
  const hours   = Math.floor( totalMinutes / 60 ) % 24;
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
}