import { describe, expect, it } from 'vitest';
import { convertBusinessDays, getChristmasDay, getColumbusDay, getHolidays, getInaugurationDay, getIndependenceDay, getJuneteenth, getLaborDay, getMemorialDay, getMLKDay, getNewYearsDay, getThanksgivingDay, getVeteransDay, getWashingtonBirthday } from '../../src/lib/convert-business-days.js';

describe('Individual holiday functions', () => {
  it('returns January 20, 2025 when getMLKDay receives 2025', () => {
    const mlkDay2025 = getMLKDay(2025);
    const mlkDayFormattedDate = mlkDay2025.toISOString().split('T')[0];

    expect(mlkDayFormattedDate).toBe('2025-01-20');
  });

  it('returns 2025-01-20 for inauguration day holiday on 2025', () => {
    const inaugurationDay2025 = getInaugurationDay(2025);
    const inaugurationDayFormattedDate = inaugurationDay2025.toISOString().split('T')[0];

    expect(inaugurationDayFormattedDate).toBe('2025-01-20');
  });

  it('returns 2025-02-17 for Washington birthday holiday on 2025', () => {
    const washingtonBirthday2025 = getWashingtonBirthday(2025);
    const washingtonBirthdayFormattedDate = washingtonBirthday2025.toISOString().split('T')[0];

    expect(washingtonBirthdayFormattedDate).toBe('2025-02-17');
  });

  it('returns 2025-05-26 for memorial day holiday on 2025', () => {
    const memorialDay2025 = getMemorialDay(2025);
    const memorialDayFormattedDate = memorialDay2025.toISOString().split('T')[0];

    expect(memorialDayFormattedDate).toBe('2025-05-26');
  });

  it('returns 2026-05-25 for memorial day holiday on 2026', () => {
    const memorialDay2026 = getMemorialDay(2026);
    const memorialDayFormattedDate = memorialDay2026.toISOString().split('T')[0];

    expect(memorialDayFormattedDate).toBe('2026-05-25');
  });

  it('returns 2022-06-20 for Juneteenth National Independence holiday for 2022', () => {
    const juneteenth2025 = getJuneteenth(2022);
    const juneteenthFormattedDate = juneteenth2025.toISOString().split('T')[0];

    expect(juneteenthFormattedDate).toBe('2022-06-20');
  });

  it('returns 2026-09-07 for Labor day holiday on 2026', () => {
    const laborDay2026 = getLaborDay(2026);
    const laborDayFormattedDate = laborDay2026.toISOString().split('T')[0];

    expect(laborDayFormattedDate).toBe('2026-09-07');
  });

  it('returns 2025-09-01 for Labor Day holiday on 2025', () => {
    const laborDay2025 = getLaborDay(2025);
    const laborDayFormattedDate = laborDay2025.toISOString().split('T')[0];

    expect(laborDayFormattedDate).toBe('2025-09-01');
  });

  it('returns 2026-10-12 for Columbus day holiday on 2026', () => {
    const columbusDay2026 = getColumbusDay(2026);
    const columbusDayFormattedDate = columbusDay2026.toISOString().split('T')[0];

    expect(columbusDayFormattedDate).toBe('2026-10-12');
  });

  // test Veterans Day for 2018 should be on 2018-11-12
  it('returns 2018-11-12 for Veterans Day holyday on 2018', () => {
    const veteransDay2018 = getVeteransDay(2018);
    const veteransDayFormattedDate = veteransDay2018.toISOString().split('T')[0];

    expect(veteransDayFormattedDate).toBe('2018-11-12');
  });

  it('returns 2017-11-10 for Veterans Day holyday on 2017', () => {
    const veteransDay2017 = getVeteransDay(2017);
    const veteransDayFormattedDate = veteransDay2017.toISOString().split('T')[0];

    expect(veteransDayFormattedDate).toBe('2017-11-10');
  });

  it('returns 2026-11-11 for Veterans Day holyday on 2026', () => {
    const veteransDay2026 = getVeteransDay(2026);
    const veteransDayFormattedDate = veteransDay2026.toISOString().split('T')[0];

    expect(veteransDayFormattedDate).toBe('2026-11-11');
  });

  it('returns 2026-07-03 for Independence day on 2026', () => {
    const independenceDay2026 = getIndependenceDay(2026);
    const independenceDayFormattedDate = independenceDay2026.toISOString().split('T')[0];

    expect(independenceDayFormattedDate).toBe('2026-07-03');
  });

  it('returns 2022-11-24 for Thanksgiving Day holyday on year 2022', () => {
    const thanksgivingDay2022 = getThanksgivingDay(2022);
    const thanksgivingDayFormattedDate = thanksgivingDay2022.toISOString().split('T')[0];

    expect(thanksgivingDayFormattedDate).toBe('2022-11-24');
  });

  it('returns 2022-12-26 for Christmas Day holiday on 2022', () => {
    const christmasDay2022 = getChristmasDay(2022);
    const christmasDayFormattedDate = christmasDay2022.toISOString().split('T')[0];

    expect(christmasDayFormattedDate).toBe('2022-12-26');
  });


  it('returns 2021-12-24 for Christmas Day holiday on 2021', () => {
    const christmasDay2026 = getChristmasDay(2021);
    const christmasDayFormattedDate = christmasDay2026.toISOString().split('T')[0];

    expect(christmasDayFormattedDate).toBe('2021-12-24');
  });

  it('returns 2021-01-01 for New Year Day holiday on 2021', () => {
    const newYearDay2021 = getNewYearsDay(2021);
    const newYearDayFormattedDate = newYearDay2021.toISOString().split('T')[0];

    expect(newYearDayFormattedDate).toBe('2021-01-01');
  });

  it('returns 2017-01-02 for New Year Day holiday on 2017', () => {
    const newYearDay2017 = getNewYearsDay(2017);
    const newYearDayFormattedDate = newYearDay2017.toISOString().split('T')[0];

    expect(newYearDayFormattedDate).toBe('2017-01-02');
  });

  it('returns 2027-12-31 for New Year Day holiday on 2028', () => {
    const newYearDay2028 = getNewYearsDay(2028);
    const newYearDayFormattedDate = newYearDay2028.toISOString().split('T')[0];

    expect(newYearDayFormattedDate).toBe('2027-12-31');
  });

  it('returns all holidays for year 2025', () => {
    const allHolidays2025 = getHolidays(2025);
    const allHolidaysFormattedDates = allHolidays2025.map(holiday => holiday.toISOString().split('T')[0]);

    expect(allHolidaysFormattedDates).toEqual([
      '2025-01-01',
      '2025-01-20',
      '2025-02-17',
      '2025-05-26',
      '2025-06-19',
      '2025-07-04',
      '2025-09-01',
      '2025-10-13',
      '2025-11-11',
      '2025-11-27',
      '2025-12-25',
    ]);
  });

  it('returns all holidays for year 2026', () => {
    const allHolidays2026 = getHolidays(2026);
    const allHolidaysFormattedDates = allHolidays2026.map(holiday => holiday.toISOString().split('T')[0]);

    expect(allHolidaysFormattedDates).toEqual([
      '2026-01-01',
      '2026-01-19',
      '2026-02-16',
      '2026-05-25',
      '2026-06-19',
      '2026-07-03',
      '2026-09-07',
      '2026-10-12',
      '2026-11-11',
      '2026-11-26',
      '2026-12-25',
    ]);
  });

  it('returns all holidays for year 2027', () => {
    const allHolidays2027 = getHolidays(2027);
    const allHolidaysFormattedDates = allHolidays2027.map(holiday => holiday.toISOString().split('T')[0]);

    expect(allHolidaysFormattedDates).toEqual([
      '2027-01-01',
      '2027-01-18',
      '2027-02-15',
      '2027-05-31',
      '2027-06-18',
      '2027-07-05',
      '2027-09-06',
      '2027-10-11',
      '2027-11-11',
      '2027-11-25',
      '2027-12-24',
    ]);
  });

  it('returns all holidays for year 2021', () => {
    const allHolidays2021 = getHolidays(2021);
    const allHolidaysFormattedDates = allHolidays2021.map(holiday => holiday.toISOString().split('T')[0]);

    expect(allHolidaysFormattedDates).toEqual([
      '2021-01-01',
      '2021-01-18',
      '2021-02-15',
      '2021-05-31',
      '2021-06-18',
      '2021-07-05',
      '2021-09-06',
      '2021-10-11',
      '2021-11-11',
      '2021-11-25',
      '2021-12-24',
    ]);
  });
});

describe('convertBusinessDays function', () => {
  it('should return 5 for a simple date range with no weekends or holidays', () => {
    expect(convertBusinessDays('2024-11-04', '2024-11-08')).toBe(5); // Mon-Fri
  });

  it('should return 2 for a range that includes weekends', () => {
    expect(convertBusinessDays('2024-11-08', '2024-11-11')).toBe(2); // Fri, Mon (Sat, Sun are weekends)
  });

  it('should return 4 for a range that includes Christmas Day', () => {
    // 2024: Dec 23 (Mon), Dec 24 (Tue), Dec 25 (Wed - Christmas), Dec 26 (Thu), Dec 27 (Fri)
    expect(convertBusinessDays('2024-12-23', '2024-12-27')).toBe(4);
  });

  it('should return 2 for a range with New Year Day on Sunday, observed on Monday', () => {
    // 2022-12-30 (Fri)
    // 2022-12-31 (Sat) - Weekend
    // 2023-01-01 (Sun) - New Year's Day (Weekend)
    // 2023-01-02 (Mon) - New Year's Day (Observed)
    // 2023-01-03 (Tue)
    expect(convertBusinessDays('2022-12-30', '2023-01-03')).toBe(2); // Fri, Tue
  });

  it('should return 3 for a range that spans across a month-end', () => {
    // Oct 30 (Wed), Oct 31 (Thu), Nov 1 (Fri)
    expect(convertBusinessDays('2024-10-30', '2024-11-01')).toBe(3);
  });

  it('should return 3 for a range that spans across a year-end', () => {
    // 2024-12-30 (Mon), 2024-12-31 (Tue)
    // 2025-01-01 (Wed - New Year's Day)
    // 2025-01-02 (Thu), 2025-01-03 (Fri)
    expect(convertBusinessDays('2024-12-30', '2025-01-03')).toBe(4); // Mon, Tue, Thu, Fri
  });

  it('should return 4 for a range including Inauguration Day in an applicable year', () => {
    // 2025: Jan 17 (Fri), Jan 20 (Mon - Inauguration Day & MLK Day), Jan 21 (Tue), Jan 22 (Wed), Jan 23 (Thu)
    // MLK Day is Jan 20, 2025. Inauguration Day is Jan 20, 2025. They overlap.
    // Result should be: Fri, Tue, Wed, Thu
    expect(convertBusinessDays('2025-01-17', '2025-01-23')).toBe(4);
  });

  it('should return 1 for a zero-day range on a business day', () => {
    expect(convertBusinessDays('2024-11-04', '2024-11-04')).toBe(1); // Monday
  });

  it('should return 0 for a zero-day range on a weekend', () => {
    expect(convertBusinessDays('2024-11-02', '2024-11-02')).toBe(0); // Saturday
  });

  it('should return 0 for a zero-day range on a holiday', () => {
    expect(convertBusinessDays('2024-12-25', '2024-12-25')).toBe(0); // Christmas Day
  });

  it('should return 0 for an invalid range (end date before start date)', () => {
    expect(convertBusinessDays('2024-11-08', '2024-11-04')).toBe(0);
  });

  it('should calculate business days correctly for a longer span with multiple holidays', () => {
    // From 2023-12-18 (Mon) to 2024-01-05 (Fri)
    // Holidays in this range:
    // Christmas Day 2023: 2023-12-25 (Mon)
    // New Year's Day 2024: 2024-01-01 (Mon)
    // Total days: 19
    // Weekends:
    // Dec 23, 24 (Sat, Sun)
    // Dec 30, 31 (Sat, Sun)
    // Business days = Total days - weekend days - holidays
    // Total days in range (inclusive) = 19
    // Weekend days: Dec 23, 24, 30, 31 = 4 days
    // Holidays: Dec 25 (Christmas), Jan 1 (New Year) = 2 days
    // Expected: 19 - 4 - 2 = 13
    expect(convertBusinessDays('2023-12-18', '2024-01-05')).toBe(13);
  });

   it('should handle Juneteenth correctly when it falls on a weekday', () => {
    // Juneteenth 2025 is on Thursday, June 19
    // 2025-06-18 (Wed), 2025-06-19 (Thu - Juneteenth), 2025-06-20 (Fri)
    expect(convertBusinessDays('2025-06-18', '2025-06-20')).toBe(2); // Wed, Fri
  });

  it('should handle Juneteenth observed on Friday when it falls on Saturday', () => {
    // Juneteenth 2027 is on Saturday, June 19. Observed on Friday, June 18.
    // 2027-06-17 (Thu), 2027-06-18 (Fri - Juneteenth observed), 2027-06-21 (Mon)
    // 2027-06-19 (Sat - Weekend, Actual Juneteenth)
    // 2027-06-20 (Sun - Weekend)
    expect(convertBusinessDays('2027-06-17', '2027-06-21')).toBe(2); // Thu, Mon
  });

  it('should handle Juneteenth observed on Monday when it falls on Sunday', () => {
    // Juneteenth 2022 is on Sunday, June 19. Observed on Monday, June 20.
    // 2022-06-17 (Fri), 2022-06-20 (Mon - Juneteenth observed), 2022-06-21 (Tue)
    // 2022-06-18 (Sat - Weekend)
    // 2022-06-19 (Sun - Weekend, Actual Juneteenth)
    expect(convertBusinessDays('2022-06-17', '2022-06-21')).toBe(2); // Fri, Tue
  });
});
