export function getDuration(duration) {
  if (duration < 60) {
    return `${duration}м`;
  } else {
    const hours = Math.floor(duration / 60);
    const min = duration % (hours * 60);
    if (min === 0) {
      return `${hours}ч`;
    } else {
      return `${hours}ч ${min}м`;
    }
  }
}
