import { TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  className?: string;
  onClick: () => void;
}

export function DeleteButton(props: DeleteButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      variant="destructive"
      className={props.className}
      onClick={props.onClick}
    >
      <TrashIcon />
    </Button>
  );
}
