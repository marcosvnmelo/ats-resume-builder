import type React from 'react';

import { Card } from '@/components/ui/card';

import { DeleteButton } from './delete-button';

interface ArrayFieldsLayoutProps extends React.PropsWithChildren {
  onRemoveItem: () => void;
}

export function ArrayFieldsLayout(props: ArrayFieldsLayoutProps) {
  return (
    <Card className="bg-secondary relative p-(--card-spacing)">
      {props.children}

      <DeleteButton
        className="absolute top-0 right-0 rounded-none rounded-tr-xl rounded-bl-xl"
        onClick={props.onRemoveItem}
      />
    </Card>
  );
}
