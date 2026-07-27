import { PlusCircleIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { FieldLegend, FieldSet } from '@/components/ui/field';

interface ArraySectionProps extends React.PropsWithChildren {
  legend: React.ReactNode;
  onAddItem: () => void;
}

export function ArraySectionLayout(props: ArraySectionProps) {
  return (
    <FieldSet>
      {typeof props.legend === 'string' ? (
        <FieldLegend>{props.legend}</FieldLegend>
      ) : (
        props.legend
      )}
      {props.children}
      <AddButton onClick={props.onAddItem} />
    </FieldSet>
  );
}

interface AddButtonProps {
  onClick: () => void;
}

function AddButton(props: AddButtonProps) {
  return (
    <Button type="button" size="icon" variant="ghost" onClick={props.onClick}>
      <PlusCircleIcon />
    </Button>
  );
}
