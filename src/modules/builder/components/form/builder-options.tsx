import { localeMap } from 'intlayer';
import { useLocale } from 'react-intlayer';

import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const BuilderOptions = withBuilderFieldGroup({
  defaultValues: defaultValues.options,
  render: function Render({ group }) {
    const { locale: currentLocale, setLocale } = useLocale();

    const items = localeMap(({ locale }) => ({
      label: locale,
      value: locale,
    }));

    function onLocaleChange(_value: typeof currentLocale | null) {
      const value = _value ?? 'en';

      setLocale(value);
      group.setFieldValue('locale', value);
    }

    return (
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Language</FieldLabel>
            <Select
              id="locale"
              items={items}
              defaultValue={currentLocale}
              required
              onValueChange={onLocaleChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={true}>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </FieldSet>
    );
  },
});
