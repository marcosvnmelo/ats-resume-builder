import { defaultValues } from '#builder/constants/builder-form-options.ts';
import { withBuilderFieldGroup } from '#builder/hooks/use-builder-form.ts';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export const PersonalInformationSection = withBuilderFieldGroup({
  defaultValues: defaultValues.personalInformation,
  render: function Render({ group }) {
    return (
      <FieldSet>
        <FieldLegend>Personal Information</FieldLegend>
        <FieldGroup className="grid md:grid-cols-2">
          <group.AppField name="name">
            {(field) => (
              <field.TextField label="Full Name" placeholder="MARCUS HALL" />
            )}
          </group.AppField>

          <group.AppField name="position">
            {(field) => (
              <field.TextField
                label="Job Title"
                placeholder="Fullstack Developer"
              />
            )}
          </group.AppField>

          <group.AppField name="contactInformation">
            {(field) => (
              <field.TextField
                label="Contact Information"
                placeholder="+1-555-0100"
              />
            )}
          </group.AppField>

          <group.AppField name="email">
            {(field) => (
              <field.TextField
                type="email"
                label="Email"
                placeholder="beddylea@gmail.com"
              />
            )}
          </group.AppField>

          <group.AppField name="address">
            {(field) => (
              <field.TextField
                label="Address"
                placeholder="San Francisco, CA"
              />
            )}
          </group.AppField>

          <group.Field name="profilePicture">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Profile Picture</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="file"
                    accept="image/png, image/jpeg"
                    onBlur={field.handleBlur}
                    onChange={async (e) => {
                      const file = e.target.files?.item(0);
                      if (!file) return;

                      const base64 = await convertToBase64(file);

                      field.handleChange(base64);
                    }}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </group.Field>
        </FieldGroup>
      </FieldSet>
    );
  },
});

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() ?? '');
    reader.onerror = (error) => reject(error);
  });
}
