interface DateRangeProps {
  startYear: string;
  endYear: string;
}

export function DateRange({ startYear, endYear }: DateRangeProps) {
  const formattedDateRange = formatDateRange(startYear, endYear);

  return <p className="text-xs font-normal">{formattedDateRange}</p>;
}

function formatDateRange(
  startYear: string,
  endYear: string,
  locales: Intl.LocalesArgument = 'en-US',
) {
  if (startYear.length === 0) {
    return '';
  }

  const formattedStartYear = formatDate(startYear, locales);

  let formattedEndYear = 'Present';

  if (endYear.length > 0) {
    formattedEndYear = formatDate(endYear, locales);
  }

  return `${formattedStartYear} — ${formattedEndYear}`;
}

function formatDate(year: string, locales: Intl.LocalesArgument): string {
  const date = new Date(year);
  return `${date.toLocaleString(locales, { month: 'short' })} ${date.getFullYear()}`;
}
