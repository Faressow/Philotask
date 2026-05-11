/* ═══════════════════════════════════════════════════════════
   PhiloTask — Coptic Orthodox Calendar
   13 months: 12 × 30 days + 1 small month (5 or 6 days)
   ═══════════════════════════════════════════════════════════ */

const COPTIC_MONTHS = [
  { name: 'Thout',           alt: 'Tout',       num: 1 },
  { name: 'Paopi',           alt: 'Babah',      num: 2 },
  { name: 'Hathor',          alt: 'Hator',      num: 3 },
  { name: 'Koiak',           alt: 'Kiahk',      num: 4 },
  { name: 'Tobi',            alt: 'Toba',       num: 5 },
  { name: 'Meshir',          alt: 'Amshir',     num: 6 },
  { name: 'Paremhat',        alt: 'Baramhat',   num: 7 },
  { name: 'Paremoude',       alt: 'Baramouda',  num: 8 },
  { name: 'Pashons',         alt: 'Bashans',    num: 9 },
  { name: 'Paoni',           alt: 'Baona',      num: 10 },
  { name: 'Epip',            alt: 'Abib',       num: 11 },
  { name: 'Mesori',          alt: 'Misra',      num: 12 },
  { name: 'Pi Kogi Enavot',  alt: 'Nasie',      num: 13 },
];

/**
 * Convert a Gregorian date to a Coptic date.
 * The Coptic calendar epoch: Year 1 started on August 29, 284 AD (Julian)
 * which corresponds to September 11, 284 AD (Gregorian, before 1582 proleptic).
 *
 * In the modern era (post-1582):
 *  - Coptic New Year (1 Thout) falls on September 11 (or Sept 12 in Gregorian
 *    leap year preceding a Coptic leap year).
 *
 * Algorithm:
 *  1. Calculate the Julian Day Number (JDN) of the Gregorian date.
 *  2. Subtract the JDN of the Coptic epoch to get days since epoch.
 *  3. Divide into 4-year cycles (1461 days = 3×365 + 366).
 */
function gregorianToJDN(year, month, day) {
  // Gregorian to Julian Day Number
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y
    + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function jdnToCoptic(jdn) {
  // Coptic epoch in JDN: August 29, 284 AD (Julian) = JDN 1825030
  // But we need the Gregorian-adjusted epoch.
  // 1 Thout, Year 1 of Coptic = JDN 1825030 (Julian) = approx JDN 1825030
  // The standard epoch for Coptic in JDN is 1825029.5, so integer = 1825030
  const COPTIC_EPOCH = 1824665;

  const diff = jdn - COPTIC_EPOCH;
  // Each 4-year cycle = 1461 days (3 years of 365 + 1 year of 366)
  const cycle = Math.floor(diff / 1461);
  const remainder = diff - cycle * 1461;

  let yearInCycle = Math.floor(remainder / 365);
  if (yearInCycle > 3) yearInCycle = 3; // clamp for leap year

  const dayOfYear = remainder - yearInCycle * 365;
  const year = 4 * cycle + yearInCycle;

  let month, day;
  if (dayOfYear < 360) {
    // Months 1-12: each 30 days
    month = Math.floor(dayOfYear / 30);
    day = dayOfYear - month * 30 + 1;
    month += 1;
  } else {
    // Month 13 (Pi Kogi Enavot / Nasie): 5 or 6 days
    month = 13;
    day = dayOfYear - 360 + 1;
  }

  return { year, month, day };
}

function getCopticDate(gregorianDate) {
  const gDate = gregorianDate || new Date();
  const jdn = gregorianToJDN(gDate.getFullYear(), gDate.getMonth() + 1, gDate.getDate());
  const coptic = jdnToCoptic(jdn);
  const monthData = COPTIC_MONTHS[coptic.month - 1];

  return {
    day: coptic.day,
    month: coptic.month,
    monthName: monthData.name,
    monthAlt: monthData.alt,
    year: coptic.year,
    formatted: `${coptic.day} ${monthData.name} (${monthData.alt}) ${coptic.year} AM`,
    shortFormatted: `${coptic.day} ${monthData.name} ${coptic.year}`,
  };
}

function renderCopticCalendar() {
  const coptic = getCopticDate();
  const dateEl = document.getElementById('coptic-date');
  const badgeEl = document.getElementById('coptic-month-badge');

  if (dateEl) dateEl.textContent = coptic.formatted;
  if (badgeEl) badgeEl.textContent = coptic.monthName;
}
