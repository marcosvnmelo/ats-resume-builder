import React from 'react';

import { FieldGroup, FieldSeparator } from '@/components/ui/field';

interface SeparatedSectionsProps {
  children: React.ReactNode;
}

export function SeparatedSections(props: SeparatedSectionsProps) {
  const sections = React.Children.map(props.children, (child, index) => {
    const isLastChild =
      Array.isArray(props.children) && index === props.children.length - 1;

    if (isLastChild) return child;

    return (
      <>
        {child}
        <FieldSeparator />
      </>
    );
  });

  return <FieldGroup>{sections}</FieldGroup>;
}
