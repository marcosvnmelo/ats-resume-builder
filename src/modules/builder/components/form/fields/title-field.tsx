import { SquareCheckBigIcon, SquarePenIcon } from 'lucide-react';
import { Activity, useState } from 'react';

import { useFieldContext } from '#builder/contexts/builder-form-context.ts';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface TitleFieldProps {
  id?: string;
  title: string;
  label?: string;
  defaultValue: string;
  description?: string;

  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TitleField(props: TitleFieldProps) {
  const field = useFieldContext<string>();

  const isEditingState = useState(false);
  const isEditing = props.isEditing ?? isEditingState[0];
  const setIsEditing = props.setIsEditing ?? isEditingState[1];

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const inputId = props.id ?? field.name;

  return (
    <>
      <Activity mode={!isEditing ? 'visible' : 'hidden'}>
        <FieldLegend>
          {props.title}
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={() => setIsEditing(true)}
          >
            <SquarePenIcon />
          </Button>
        </FieldLegend>
      </Activity>

      <Activity mode={isEditing ? 'visible' : 'hidden'}>
        <Field data-invalid={isInvalid}>
          {props.label && (
            <FieldLabel htmlFor={inputId}>{props.label}</FieldLabel>
          )}

          <div className="flex gap-2">
            <Input
              id={inputId}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              aria-invalid={isInvalid}
            />

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => setIsEditing(false)}
            >
              <SquareCheckBigIcon />
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={() => field.handleChange(props.defaultValue)}
            >
              <IxHardReset />
            </Button>
          </div>

          {props.description && (
            <FieldDescription>{props.description}</FieldDescription>
          )}

          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
      </Activity>
    </>
  );
}

function IxHardReset(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      {/* Icon from Siemens Industrial Experience Icons by Siemens AG - https://github.com/siemens/ix-icons/blob/main/LICENSE.md */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M448 128v42.667l-68.666-.003c36.078 31.658 58.188 77.99 58.146 128.473c-.065 78.18-53.241 146.318-129.062 165.376c-75.82 19.058-154.896-15.838-191.92-84.694c-13.778-25.625-20.421-53.515-20.357-81.153h42.538q-.013.96-.012 1.92c1.05 69.942 58.05 126.089 128 126.08c64.072 1.056 118.709-46.194 126.906-109.748c6.124-47.483-15.135-92.74-52.237-118.948l-.002 79.363h-42.667V128zM178.847 64l.001 22.836a88.8 88.8 0 0 1 28.134 16.267l19.797-11.43l29.63 51.32l-19.784 11.424a89.4 89.4 0 0 1 1.482 16.25c0 5.55-.509 10.981-1.482 16.25l19.784 11.423l-29.63 51.32l-19.797-11.43a88.8 88.8 0 0 1-28.134 16.267v22.836h-59.26v-22.836a88.8 88.8 0 0 1-28.134-16.266L71.657 249.66l-29.63-51.32l19.784-11.423a89.4 89.4 0 0 1-1.482-16.25c0-5.55.509-10.983 1.482-16.251l-19.784-11.423l29.63-51.32l19.796 11.43a88.8 88.8 0 0 1 28.135-16.267V64zm-29.63 71.111c-19.636 0-35.555 15.919-35.555 35.556s15.92 35.555 35.556 35.555c19.637 0 35.555-15.919 35.555-35.555c0-19.637-15.918-35.556-35.555-35.556"
      />
    </svg>
  );
}
