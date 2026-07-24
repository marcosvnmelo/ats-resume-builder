import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '@/lib/utils';

function SectionContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<'p'>) {
  const defaultProps = {
    className: cn('text-sm font-normal', className),
  } as useRender.ComponentProps<'p'>;

  const element = useRender({
    defaultTagName: 'p',
    render,
    props: mergeProps<'p'>(defaultProps, props),
  });

  return element;
}

export { SectionContent };
