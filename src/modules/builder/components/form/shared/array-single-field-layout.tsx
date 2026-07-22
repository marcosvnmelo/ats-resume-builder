import type React from 'react';

import { DeleteButton } from './delete-button';

interface ArraySingleFieldLayoutProps extends React.PropsWithChildren {
  onRemoveItem: () => void;
}

export function ArraySingleFieldLayout(props: ArraySingleFieldLayoutProps) {
  return (
    <div className="flex gap-3">
      {props.children}

      <DeleteButton onClick={props.onRemoveItem} />
    </div>
  );
}
