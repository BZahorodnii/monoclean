/* constants */
const DAY_START = 7;          // 07:00
const DAY_END   = 20;         // 20:00
const THREE_HOURS = 3 * 60 * 60 * 1000;

export const isSameDay = (a: Date, b: Date) =>
  a.toDateString() === b.toDateString();

/* MIN TIME ------------------------------------------------------- */
export const minSelectableTime = (date: Date): Date | null => {
  const today = new Date();

  /* —— any day that is NOT today → always 07:00 —— */
  if (!isSameDay(date, today)) {
    const d = new Date(date);
    d.setHours(DAY_START, 0, 0, 0);
    return d;
  }

  /* —— today → now + 3 h ——————————— */
  const earliest = new Date(today.getTime() + THREE_HOURS);

  /* if 3 h jumps into tomorrow, the rest of “today” is closed */
  if (!isSameDay(earliest, today)) return null;

  /* clamp to at least 07:00 */
  if (earliest.getHours() < DAY_START) {
    earliest.setHours(DAY_START, 0, 0, 0);
  }

  /* if earliest is already ≥ 20:00, no slots left */
  if (earliest.getHours() >= DAY_END) return null;

  /* round-up to the next 30-min tick so the list aligns cleanly */
  const mins = earliest.getMinutes();
  const extra = (30 - (mins % 30)) % 30;
  earliest.setMinutes(mins + extra, 0, 0);

  return earliest;
};

/* MAX TIME (unchanged) ------------------------------------------- */
export const maxSelectableTime = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(DAY_END, 0, 0, 0);
  return d;
};

export const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Adjusts `d` to the first legal slot on *its own* day.
 *  Returns `null` if that day has no slots left. */
export const clampToEarliest = (d: Date): Date | null => {
  const min = minSelectableTime(d);
  if (!min) return null;

  /* if current time part is illegal, move to earliest legal */
  if (d < min || d > maxSelectableTime(d)) {
    d = new Date(min);                // clone so we don’t mutate outside
  }
  return d;
};
