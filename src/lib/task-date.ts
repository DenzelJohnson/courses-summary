const twentyFourHourTime = /\b([01]?\d|2[0-3]):([0-5]\d)\b/g;

export function formatTaskDate(date: string) {
  return date.replace(twentyFourHourTime, (_, hourText: string, minutes: string) => {
    const hour = Number(hourText);
    const period = hour >= 12 ? "PM" : "AM";
    const twelveHour = hour % 12 || 12;

    return `${twelveHour}:${minutes} ${period}`;
  });
}
