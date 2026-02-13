// Weekend tour generation utilities

export interface WeekendDate {
  date: Date;
  type: 'saturday' | 'holiday_weekend';
  isLongWeekend?: boolean;
  occasion?: string;
}

/**
 * Get upcoming weekend dates for the next 12 weeks
 * @param startDate - Starting date (defaults to today)
 * @param weeksAhead - Number of weeks to generate (default: 12)
 * @returns Array of weekend dates with metadata
 */
export function getUpcomingWeekends(startDate: Date = new Date(), weeksAhead: number = 12): WeekendDate[] {
  const weekends: WeekendDate[] = [];
  const currentDate = new Date(startDate);
  
  // Find next Saturday
  const nextSaturday = new Date(currentDate);
  const daysUntilSaturday = (6 - currentDate.getDay() + 7) % 7;
  nextSaturday.setDate(currentDate.getDate() + daysUntilSaturday);
  
  for (let i = 0; i < weeksAhead; i++) {
    const saturday = new Date(nextSaturday);
    saturday.setDate(nextSaturday.getDate() + (i * 7));
    
    // Check if this is a special weekend/holiday
    const holidayInfo = checkForHoliday(saturday);
    
    weekends.push({
      date: saturday,
      type: holidayInfo ? 'holiday_weekend' : 'saturday',
      isLongWeekend: holidayInfo?.isLongWeekend || false,
      occasion: holidayInfo?.occasion
    });
  }
  
  return weekends;
}

/**
 * Check if a date falls on or near a holiday weekend
 * @param date - Date to check
 * @returns Holiday information or null
 */
function checkForHoliday(date: Date): { occasion: string; isLongWeekend: boolean } | null {
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  
  // Major Indian holidays that create long weekends
  const holidays = [
    // Diwali (varies, but usually in Oct/Nov)
    { month: 10, day: 24, occasion: 'Diwali Weekend', isLongWeekend: true },
    { month: 10, day: 25, occasion: 'Diwali Weekend', isLongWeekend: true },
    
    // Holi (usually March)
    { month: 2, day: 14, occasion: 'Holi Weekend', isLongWeekend: true },
    
    // Navratri/Durga Puja (usually Oct)
    { month: 9, day: 15, occasion: 'Navratri Special', isLongWeekend: true },
    
    // Janmashtami (usually Aug/Sep)
    { month: 7, day: 19, occasion: 'Janmashtami Weekend', isLongWeekend: true },
    
    // Ganesh Chaturthi (usually Sep)
    { month: 8, day: 7, occasion: 'Ganesh Chaturthi', isLongWeekend: true },
    
    // Independence Day (Aug 15)
    { month: 7, day: 15, occasion: 'Independence Day', isLongWeekend: true },
    
    // Republic Day (Jan 26)
    { month: 0, day: 26, occasion: 'Republic Day', isLongWeekend: true },
    
    // New Year weekend
    { month: 0, day: 1, occasion: 'New Year Special', isLongWeekend: true }
  ];
  
  // Check if date matches any holiday (within 2 days)
  for (const holiday of holidays) {
    if (Math.abs(date.getDate() - holiday.day) <= 2 && month === holiday.month) {
      return {
        occasion: holiday.occasion,
        isLongWeekend: holiday.isLongWeekend
      };
    }
  }
  
  return null;
}

/**
 * Generate departure and return dates for a weekend tour
 * @param saturday - Saturday date
 * @returns Departure and return dates
 */
export function generateWeekendTourDates(saturday: Date): { departureDate: Date; returnDate: Date } {
  const departureDate = new Date(saturday);
  departureDate.setHours(22, 0, 0, 0); // 10:00 PM Saturday
  
  const returnDate = new Date(saturday);
  returnDate.setDate(saturday.getDate() + 2); // Monday
  returnDate.setHours(5, 30, 0, 0); // 5:30 AM Monday
  
  return { departureDate, returnDate };
}

/**
 * Format date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatWeekendDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleDateString('en-IN', options);
}

/**
 * Get tour pricing based on weekend type and demand
 * @param tourType - Type of tour
 * @param weekendDate - Weekend date information
 * @returns Pricing details
 */
export function getTourPricing(tourType: string, weekendDate: WeekendDate): { 
  basePrice: number; 
  advancePrice: number; 
  demandMultiplier: number;
} {
  const basePrices = {
    'rajasthan': { base: 2000, advance: 500 },
    'braj': { base: 1800, advance: 400 },
    'ganga': { base: 2100, advance: 600 },
    'vaishno': { base: 3500, advance: 1000 }
  };
  
  const pricing = basePrices[tourType as keyof typeof basePrices] || basePrices.rajasthan;
  
  // Increase prices for holiday weekends
  let demandMultiplier = 1;
  if (weekendDate.occasion) {
    demandMultiplier = weekendDate.isLongWeekend ? 1.3 : 1.2;
  }
  
  return {
    basePrice: Math.round(pricing.base * demandMultiplier),
    advancePrice: Math.round(pricing.advance * demandMultiplier),
    demandMultiplier
  };
}