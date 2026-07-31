import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';

import { useFieldContext } from '#builder/contexts/builder-form-context.ts';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateFieldProps {
  id?: string;
  label?: string;
  fieldClassName?: string;
}

import { useSelector } from '@tanstack/react-form';
import type { __DeclaredLocalesRegistry } from 'intlayer';
import type { DayPickerLocale } from 'react-day-picker';
import { enUS, ptBR } from 'react-day-picker/locale';

import type { BuilderFormInput } from '#builder/schemas/builder-form.schema.ts';

type DeclaredLocale = keyof __DeclaredLocalesRegistry;

const locales: Record<DeclaredLocale, DayPickerLocale> = {
  'en': enUS,
  'pt-BR': ptBR,
};

export function DateField(props: DateFieldProps) {
  const t = useIntlayer('date-field');

  const field = useFieldContext<string>();

  const locale = useSelector<{ values: BuilderFormInput }, DeclaredLocale>(
    field.form.store,
    (state) => state.values.options.locale as DeclaredLocale,
  );

  const [open, setOpen] = useState(false);

  const date: Date | undefined = stringDateToDate(field.state.value);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  function onOpenChange(open: boolean) {
    if (open === false) {
      field.handleBlur();
    }

    setOpen(open);
  }

  function onDateSelect(date: Date | undefined) {
    const stringDate = dateToStringDate(date);

    field.handleChange(stringDate);

    onOpenChange(false);
  }

  return (
    <Field
      data-invalid={isInvalid}
      className={cn('mx-auto w-44', props.fieldClassName)}
    >
      {props.label && <FieldLabel htmlFor={inputId}>{props.label}</FieldLabel>}

      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id={inputId}
              className="justify-start font-normal"
            >
              {date ? date.toLocaleDateString(locale) : t.trigger}
            </Button>
          }
        />
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            locale={locales[locale]}
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={onDateSelect}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}

/**
 * Converts a string date yyyy-mm-dd to a Date object
 */
function stringDateToDate(date: string): Date | undefined {
  const [year, month, day] = date.split('-');

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

/**
 * Converts a Date object to a string date yyyy-mm-dd
 */
function dateToStringDate(date: Date | undefined): string {
  if (!date) {
    return '';
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
