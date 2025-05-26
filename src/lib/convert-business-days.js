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
// The third Monday in January is the day set aside to observe the birthday of Martin Luther King, Jr.
// The holiday is observed on the third Monday in January each year, which is around King's birthday, January 15.
export const getMLKDay = (year) => {
  const januaryFirst = new Date(year, 0, 1); // January 1st of the given year

  // Day of the week for January 1st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = januaryFirst.getDay();

  // Calculate the offset to the third Monday
  // 14 days to get to the third week, plus the offset to the next Monday
  const offset = (dayOfWeek === 0 ? 1 : 8 - dayOfWeek) + 14;

  return new Date(year, 0, 1 + offset); // January 1st + offset days
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
  const februaryFirst = new Date(year, 1, 1); // February 1st of the given year
  const dayOfWeek = februaryFirst.getDay(); // Day of the week for February 1st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  // Calculate the offset to the third Monday
  // const offset = (dayOfWeek === 0 ? 1 : 8 - dayOfWeek) + 14; // 14 days to get to the third week, plus the offset to the next Monday
  const offset = (dayOfWeek <= 2 ? ((3.5) * Math.pow(dayOfWeek, 2)) - (4.5 * dayOfWeek) + 1 : -dayOfWeek + 8) + 14;
  console.log(offset)
  return new Date(year, 1, 1 + offset); // February 1st + offset days
};

// Memorial Day, the last Monday in May.
export const getMemorialDay = (year) => {
  const mayThirtyFirst = new Date(year, 4, 31); // May 31st of the given year

  // Day of the week for May 31st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = mayThirtyFirst.getDay();

  // Calculate the offset to the last Monday
  // 31 days in May - day of the week for May 31st
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return new Date(year, 4, 31 - offset); // May 31st - offset days
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
  const septemberFirst = new Date(year, 8, 1); // September 1st of the given year
  const dayOfWeek = septemberFirst.getDay(); // Day of the week for September 1st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  // Calculate the offset to the first Monday
  // ```markdown
  // f(x) =
  // ⎧ (7/2)x² - (9/2)x + 1,   if x ≤ 2
  // ⎨ -x + 8,                 if x ≥ 3
  // ⎩
  // ```
  const offset = dayOfWeek <= 2 ? ((3.5) * Math.pow(dayOfWeek, 2)) - (4.5 * dayOfWeek) + 1 : -dayOfWeek + 8;
  console.log(dayOfWeek)
  console.log(offset);

  return new Date(year, 8, 1 + offset); // September 1st + offset days
};

// Columbus Day, the second Monday in October.
export const getColumbusDay = (year) => {
  const octoberFirst = new Date(year, 9, 1); // October 1st of the given year
  const dayOfWeek = octoberFirst.getDay(); // Day of the week for October 1st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  // Calculate the offset to the second Monday
  const offset = (dayOfWeek === 0 ? 1 : 8 - dayOfWeek) + 7;

  return new Date(year, 9, 1 + offset); // October 1st + offset days
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
  const novemberFirst = new Date(year, 10, 1); // November 1st of the given year

  // Day of the week for November 1st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = novemberFirst.getDay();

  // Calculate the offset to the fourth Thursday
  const offset = (dayOfWeek <= 4 ? 4 - dayOfWeek : 11 - dayOfWeek) + 21;

  return new Date(year, 10, 1 + offset); // November 1st + offset days
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


/**
 *
 * @param {string} initialDate
 * @param {string} endDate
 * @returns
 */
export const convertBusinessDays = (initialDate, endDate) => {
  let count = 0;

  let currentDate = new Date(initialDate);
  const finalDate = new Date(endDate);

  while (currentDate <= finalDate) {
    if (isBusinessDay(currentDate)) {
      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return count;
};
