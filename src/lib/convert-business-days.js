// New Year’s Day, January 1.
// If January 1 falls on a Saturday, the holiday is observed on Friday, December 31 of the previous year.
// If January 1 falls on a Sunday, the holiday is observed on Monday, January 2.
export const getNewYearsDay = (year) => {
  // January 1st of the given year
  const newYearsDay = new Date(year, 0, 1);
   // Day of the week for January 1st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = newYearsDay.getDay();

  if (dayOfWeek === 0) {
    newYearsDay.setDate(2); // Move to Monday
  } else if (dayOfWeek === 6) {
    newYearsDay.setFullYear(year - 1); // Move to previous year
    newYearsDay.setDate(31); // Move to Friday
    newYearsDay.setMonth(11); // December
  }

  return newYearsDay;
};

// Birthday of Martin Luther King, Jr. (Third Monday in January)
export const getMLKDay = (year) => {
  const date = new Date(year, 0, 1); // January 1st
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday

  // Calculate days to add to reach the first Monday
  // (1 - dayOfWeek + 7) % 7 ensures we move forward to the next Monday
  // If dayOfWeek is Monday (1), (1-1+7)%7 = 0.
  // If dayOfWeek is Sunday (0), (1-0+7)%7 = 1.
  // If dayOfWeek is Tuesday (2), (1-2+7)%7 = 6.
  let daysToAdd = (1 - dayOfWeek + 7) % 7;

  // Add 14 more days to get to the third Monday (first Monday + 2 weeks)
  daysToAdd += 14;

  date.setDate(date.getDate() + daysToAdd);
  return date;
};

/**
 * 5 U.S. Code § 6103 - Holidays
 * https://www.law.cornell.edu/uscode/text/5/6103
 * (c)January 20 of each fourth year after 1965, Inauguration Day,
 * is a legal public holiday for the purpose of statutes relating
 * to pay and leave of employees as defined by section 2105 of this
 * title and individuals employed by the government of the District
 * of Columbia employed in the District of Columbia,
 * Montgomery and Prince Georges Counties in Maryland,
 * Arlington and Fairfax Counties in Virginia,
 * and the cities of Alexandria and Falls Church in Virginia.
 * When January 20 of any fourth year after 1965 falls on Sunday,
 * the next succeeding day selected for the public observance of
 * the inauguration of the President is a legal public holiday for the purpose of this subsection.
 */
export const getInaugurationDay = (year) => {
  if ((year - 1965) % 4 !== 0) {
    return null; // Not an inauguration year
  }

  const januaryTwentieth = new Date(year, 0, 20); // January 20th of the given year

  // If January 20th is a Sunday, move to the next day (Monday)
  if (januaryTwentieth.getDay() === 0) {
    januaryTwentieth.setDate(21);
  }

  return januaryTwentieth;
};


// Washington’s Birthday, the third Monday in February.
export const getWashingtonBirthday = (year) => {
  const date = new Date(year, 1, 1); // February 1st
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday

  // Calculate days to add to reach the first Monday
  let daysToAdd = (1 - dayOfWeek + 7) % 7; // 1 for Monday
  // Add 14 more days to get to the third Monday
  daysToAdd += 14;

  date.setDate(date.getDate() + daysToAdd);
  return date;
};

// Memorial Day, the last Monday in May.
export const getMemorialDay = (year) => {
  const date = new Date(year, 4, 31); // May 31st
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday

  // Calculate days to subtract to reach the previous Monday
  // If it's Monday (1), subtract 0.
  // If it's Sunday (0), subtract 6 to get to the previous Monday.
  // If it's Tuesday (2), subtract 1.
  const daysToSubtract = (dayOfWeek === 0) ? 6 : (dayOfWeek - 1);

  date.setDate(date.getDate() - daysToSubtract);
  return date;
};


// Juneteenth National Independence Day, June 19.
// If June 19 falls on a Saturday, the holiday is observed on Friday, June 18.
// If June 19 falls on a Sunday, the holiday is observed on Monday, June 20.
export const getJuneteenth = (year) => {
  const juneteenth = new Date(year, 5, 19); // June 19th of the given year
  const dayOfWeek = juneteenth.getDay(); // Day of the week for June 19th (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  if (dayOfWeek === 0) {
    juneteenth.setDate(20); // Move to Monday
  } else if (dayOfWeek === 6) {
    juneteenth.setDate(18); // Move to Friday
  }

  return juneteenth;
};

// Independence Day, July 4.
// if July 4 falls on a Saturday, the holiday is observed on Friday, July 3.
// if July 4 falls on a Sunday, the holiday is observed on Monday, July 5.
export const getIndependenceDay = (year) => {
  const independenceDay = new Date(year, 6, 4); // July 4th of the given year
  const dayOfWeek = independenceDay.getDay(); // Day of the week for July 4th (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  if (dayOfWeek === 0) {
    independenceDay.setDate(5); // Move to Monday
  } else if (dayOfWeek === 6) {
    independenceDay.setDate(3); // Move to Friday
  }

  return independenceDay;
};

// Labor Day, the first Monday in September.
export const getLaborDay = (year) => {
  const date = new Date(year, 8, 1); // September 1st
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday

  // If dayOfWeek is already Monday (1), add 0 days.
  // If dayOfWeek is Sunday (0), add 1 day ((1 - 0 + 7) % 7 = 1).
  // If dayOfWeek is Tuesday (2), add 6 days ((1 - 2 + 7) % 7 = 6).
  const daysToAdd = (1 - dayOfWeek + 7) % 7;

  date.setDate(date.getDate() + daysToAdd);
  return date;
};

// Columbus Day, the second Monday in October.
export const getColumbusDay = (year) => {
  const date = new Date(year, 9, 1); // October 1st
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday

  // Calculate days to add to reach the first Monday
  let daysToAdd = (1 - dayOfWeek + 7) % 7; // 1 for Monday
  // Add 7 more days to get to the second Monday
  daysToAdd += 7;

  date.setDate(date.getDate() + daysToAdd);
  return date;
};

// Veterans Day, November 11.
// If November 11 falls on a Saturday, the holiday is observed on Friday, November 10.
// If November 11 falls on a Sunday, the holiday is observed on Monday, November 12.
export const getVeteransDay = (year) => {
  const veteransDay = new Date(year, 10, 11); // November 11th of the given year
  const dayOfWeek = veteransDay.getDay(); // Day of the week for November 11th (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  if (dayOfWeek === 0) {
    veteransDay.setDate(12); // Move to Monday
  } else if (dayOfWeek === 6) {
    veteransDay.setDate(10); // Move to Friday
  }

  return veteransDay;
};

// Thanksgiving Day, the fourth Thursday in November.
export const getThanksgivingDay = (year) => {
  const date = new Date(year, 10, 1); // November 1st
  const dayOfWeek = date.getDay(); // 0 for Sunday, ..., 4 for Thursday

  // Calculate days to add to reach the first Thursday
  // If dayOfWeek is Thursday (4), (4-4+7)%7 = 0.
  // If dayOfWeek is Sunday (0), (4-0+7)%7 = 4.
  // If dayOfWeek is Friday (5), (4-5+7)%7 = 6.
  let daysToAdd = (4 - dayOfWeek + 7) % 7; // 4 for Thursday

  // Add 21 more days (3 weeks) to get to the fourth Thursday
  daysToAdd += 21;

  date.setDate(date.getDate() + daysToAdd);
  return date;
};

// Christmas Day, December 25.
// If December 25 falls on a Saturday, the holiday is observed on Friday, December 24.
// If December 25 falls on a Sunday, the holiday is observed on Monday, December 26.
export const getChristmasDay = (year) => {
  const christmasDay = new Date(year, 11, 25); // December 25th of the given year
  const dayOfWeek = christmasDay.getDay(); // Day of the week for December 25th (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  if (dayOfWeek === 0) {
    christmasDay.setDate(26); // Move to Monday
  } else if (dayOfWeek === 6) {
    christmasDay.setDate(24); // Move to Friday
  }

  return christmasDay;
};

// Generate an array of holidays for a given year
export const getHolidays = (year) => {
  return [
    getNewYearsDay(year),
    getMLKDay(year),
    getWashingtonBirthday(year),
    getMemorialDay(year),
    getJuneteenth(year),
    getIndependenceDay(year),
    getLaborDay(year),
    getColumbusDay(year),
    getVeteransDay(year),
    getThanksgivingDay(year),
    getChristmasDay(year),
  ];
};

// Helper function to check if a date is a business day
const isBusinessDay = (date, yearHolidaysList) => {
  const day = date.getDay();
  if (day === 0 || day === 6) { // Sunday or Saturday
    return false;
  }

  // Normalize the current date to midnight for comparison
  const currentDateNormalized = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

  for (const holiday of yearHolidaysList) {
    if (holiday) { // Ensure holiday is not null
        // Normalize holiday date to midnight for comparison
        const holidayNormalized = new Date(holiday.getFullYear(), holiday.getMonth(), holiday.getDate()).getTime();
        if (currentDateNormalized === holidayNormalized) {
            return false; // It's a holiday
        }
    }
  }
  return true; // It's a business day
};


/**
 *
 * @param {string} initialDateStr
 * @param {string} endDateStr
 * @returns
 */
export const convertBusinessDays = (initialDateStr, endDateStr) => {
  let count = 0;
  // Create dates in UTC to avoid issues with timezones and DST
  const initialDate = new Date(initialDateStr + 'T00:00:00Z');
  const finalDate = new Date(endDateStr + 'T00:00:00Z');

  if (initialDate > finalDate) {
    return 0;
  }

  let currentDate = new Date(initialDate);
  let currentYear = -1;
  let yearHolidaysForIsBusinessDay; // This list will include Inauguration Day

  while (currentDate <= finalDate) {
    const year = currentDate.getUTCFullYear(); // Use UTC year
    if (year !== currentYear) {
      const baseHolidays = getHolidays(year); // Does not include Inauguration Day
      const inaugurationDay = getInaugurationDay(year); // Get Inauguration Day for the current year

      yearHolidaysForIsBusinessDay = [...baseHolidays]; // Start with base holidays
      if (inaugurationDay) {
        // Add Inauguration Day if it exists, ensuring no time part comparison issues
        const inaugurationDayNormalizedTime = new Date(inaugurationDay.getFullYear(), inaugurationDay.getMonth(), inaugurationDay.getDate()).getTime();
        let alreadyExists = false;
        for(const h of yearHolidaysForIsBusinessDay) {
            if (new Date(h.getFullYear(), h.getMonth(), h.getDate()).getTime() === inaugurationDayNormalizedTime) {
                alreadyExists = true;
                break;
            }
        }
        if (!alreadyExists) {
          yearHolidaysForIsBusinessDay.push(inaugurationDay);
        }
      }
      currentYear = year;
    }

    // Create a new Date object for isBusinessDay to avoid modification issues if any
    if (isBusinessDay(new Date(currentDate), yearHolidaysForIsBusinessDay)) {
      count++;
    }
    currentDate.setUTCDate(currentDate.getUTCDate() + 1); // Increment day in UTC
  }

  return count;
};
