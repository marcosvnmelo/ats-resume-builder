import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '@/lib/utils';

function Label({
  className,
  render,
  ...props
}: useRender.ComponentProps<'label'>) {
  const defaultProps = {
    'data-slot': 'label',
    'className': cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className,
    ),
  } as useRender.ComponentProps<'label'>;

  const element = useRender({
    defaultTagName: 'label',
    render,
    props: mergeProps<'label'>(defaultProps, props),
  });

  return element;
}

export { Label };
