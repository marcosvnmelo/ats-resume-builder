import type { ResumeData } from '#builder/schemas/resume-data.schema.ts';
import { useBuilderPreviewStore } from '#builder/stores/use-builder-preview-store.ts';

interface DateRangeProps {
  startYear: string;
  endYear: string;
}

export function DateRange({ startYear, endYear }: DateRangeProps) {
  const locale = useBuilderPreviewStore(
    (state) => state.resumeData.options.locale,
  );
  const monthFormat = useBuilderPreviewStore(
    (state) => state.resumeData.options.dateRangeMonthFormat,
  );

  const formattedDateRange = formatDateRange(startYear, endYear, {
    locale,
    monthFormat,
  });

  return <p className="text-xs font-normal">{formattedDateRange}</p>;
}

interface FormatOptions {
  monthFormat: ResumeData['options']['dateRangeMonthFormat'];
  locale: Intl.LocalesArgument;
}

function formatDateRange(
  startYear: string,
  endYear: string,
  formatOptions: FormatOptions,
) {
  if (startYear.length === 0) {
    return '';
  }

  const formattedStartYear = formatDate(startYear, formatOptions);

  let formattedEndYear = 'Present';

  if (endYear.length > 0) {
    formattedEndYear = formatDate(endYear, formatOptions);
  }

  return `${formattedStartYear} — ${formattedEndYear}`;
}

function formatDate(year: string, formatOptions: FormatOptions): string {
  const date = new Date(year);

  const formattedMonth = date.toLocaleString(formatOptions.locale, {
    month: formatOptions.monthFormat,
  });
  const formattedYear = date.getFullYear();

  switch (formatOptions.monthFormat) {
    case 'short':
      return `${formattedMonth} ${formattedYear}`;
    case '2-digit':
      return `${formattedMonth}/${formattedYear}`;
    default:
      throw new Error(
        `Invalid date range month format: ${formatOptions.monthFormat satisfies never}`,
      );
  }
}
