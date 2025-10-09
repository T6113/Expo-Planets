// NASA API configuration and functions
const API_BASE_URL = "https://api.nasa.gov/planetary/apod";

// APOD service started on June 16, 1995
const APOD_START_DATE = "1995-06-16";

// Utility function to format date as YYYY-MM-DD
export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Utility function to validate date range
export const isValidAPODDate = (dateString) => {
  const inputDate = new Date(dateString);
  const startDate = new Date(APOD_START_DATE);
  const today = new Date();

  return inputDate >= startDate && inputDate <= today;
};

// Get today's APOD
export const getTodaysAPOD = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}?api_key=${import.meta.env.VITE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching today's APOD:", error);
    throw error;
  }
};

// Get APOD for specific date
export const getAPODByDate = async (date) => {
  try {
    // Validate date range
    if (!isValidAPODDate(date)) {
      throw new Error(`Date must be between ${APOD_START_DATE} and today`);
    }

    const response = await fetch(
      `${API_BASE_URL}?api_key=${import.meta.env.VITE_API_KEY}&date=${date}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("No APOD available for this date");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching APOD by date:", error);
    throw error;
  }
};

// Get APOD for birthday (convenience function)
export const getAPODByBirthday = async (month, day, year) => {
  try {
    // Format birthday as YYYY-MM-DD
    const paddedMonth = month.toString().padStart(2, "0");
    const paddedDay = day.toString().padStart(2, "0");
    const dateString = `${year}-${paddedMonth}-${paddedDay}`;

    return await getAPODByDate(dateString);
  } catch (error) {
    console.error("Error fetching APOD by birthday:", error);
    throw error;
  }
};

// Zodiac sign definitions with date ranges
export const ZODIAC_SIGNS = {
  aries: {
    name: "Aries",
    symbol: "♈",
    dateRange: { startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    colors: ["#FF6B6B", "#FF8E53"],
    element: "Fire",
  },
  taurus: {
    name: "Taurus",
    symbol: "♉",
    dateRange: { startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    colors: ["#4ECDC4", "#44A08D"],
    element: "Earth",
  },
  gemini: {
    name: "Gemini",
    symbol: "♊",
    dateRange: { startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
    colors: ["#FFD93D", "#6BCF7F"],
    element: "Air",
  },
  cancer: {
    name: "Cancer",
    symbol: "♋",
    dateRange: { startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
    colors: ["#A8EDEA", "#FED6E3"],
    element: "Water",
  },
  leo: {
    name: "Leo",
    symbol: "♌",
    dateRange: { startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    colors: ["#FF9A8B", "#FECFEF"],
    element: "Fire",
  },
  virgo: {
    name: "Virgo",
    symbol: "♍",
    dateRange: { startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    colors: ["#A8E6CF", "#88D8C0"],
    element: "Earth",
  },
  libra: {
    name: "Libra",
    symbol: "♎",
    dateRange: { startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
    colors: ["#FFB347", "#FFCC33"],
    element: "Air",
  },
  scorpio: {
    name: "Scorpio",
    symbol: "♏",
    dateRange: { startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
    colors: ["#D63031", "#A29BFE"],
    element: "Water",
  },
  sagittarius: {
    name: "Sagittarius",
    symbol: "♐",
    dateRange: { startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
    colors: ["#6C5CE7", "#A29BFE"],
    element: "Fire",
  },
  capricorn: {
    name: "Capricorn",
    symbol: "♑",
    dateRange: { startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    colors: ["#2D3436", "#636E72"],
    element: "Earth",
  },
  aquarius: {
    name: "Aquarius",
    symbol: "♒",
    dateRange: { startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    colors: ["#00CEC9", "#55A3FF"],
    element: "Air",
  },
  pisces: {
    name: "Pisces",
    symbol: "♓",
    dateRange: { startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    colors: ["#81ECEC", "#A29BFE"],
    element: "Water",
  },
};

// Generate all possible dates for a zodiac sign across all years
const generateZodiacDates = (zodiacSign) => {
  const dates = [];
  const currentYear = new Date().getFullYear();
  const startYear = 1995;

  const { startMonth, startDay, endMonth, endDay } =
    ZODIAC_SIGNS[zodiacSign].dateRange;

  for (let year = startYear; year <= currentYear; year++) {
    // Handle zodiac signs that cross year boundaries (like Capricorn)
    if (startMonth > endMonth) {
      // First part of the range (December of current year)
      for (let month = startMonth; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        const startDayForMonth = month === startMonth ? startDay : 1;

        for (let day = startDayForMonth; day <= daysInMonth; day++) {
          const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          if (isValidAPODDate(dateString)) {
            dates.push(dateString);
          }
        }
      }

      // Second part of the range (January of next year)
      for (let month = 1; month <= endMonth; month++) {
        const daysInMonth = new Date(year + 1, month, 0).getDate();
        const endDayForMonth = month === endMonth ? endDay : daysInMonth;

        for (let day = 1; day <= endDayForMonth; day++) {
          const dateString = `${year + 1}-${month
            .toString()
            .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
          if (isValidAPODDate(dateString)) {
            dates.push(dateString);
          }
        }
      }
    } else {
      // Normal range within the same year
      for (let month = startMonth; month <= endMonth; month++) {
        const daysInMonth = new Date(year, month, 0).getDate();
        const startDayForMonth = month === startMonth ? startDay : 1;
        const endDayForMonth = month === endMonth ? endDay : daysInMonth;

        for (let day = startDayForMonth; day <= endDayForMonth; day++) {
          const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          if (isValidAPODDate(dateString)) {
            dates.push(dateString);
          }
        }
      }
    }
  }

  return dates;
};

// Get random APOD for a zodiac sign
export const getAPODByZodiac = async (zodiacSign) => {
  try {
    const zodiacKey = zodiacSign.toLowerCase();
    if (!ZODIAC_SIGNS[zodiacKey]) {
      throw new Error("Invalid zodiac sign");
    }

    const possibleDates = generateZodiacDates(zodiacKey);
    if (possibleDates.length === 0) {
      throw new Error("No dates available for this zodiac sign");
    }

    // Pick a random date from the available dates
    const randomIndex = Math.floor(Math.random() * possibleDates.length);
    const randomDate = possibleDates[randomIndex];

    const apodData = await getAPODByDate(randomDate);

    // Add zodiac context to the response
    return {
      ...apodData,
      zodiacSign: {
        ...ZODIAC_SIGNS[zodiacKey],
        key: zodiacKey,
      },
      cosmicMessage: `The cosmos aligned for ${ZODIAC_SIGNS[zodiacKey].name} ${ZODIAC_SIGNS[zodiacKey].symbol} on this date...`,
    };
  } catch (error) {
    console.error("Error fetching APOD by zodiac:", error);
    throw error;
  }
};
