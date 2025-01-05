import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const containerVariants = cva(
  [
    'mx-auto w-full',
    'lg:max-w-[1296px] lg:px-8',
    'md:max-w-[calc(100vw_-_128px)] md:px-4',
    'max-w-full px-4 md:px-8 lg:px-8',
  ],
  {
    variants: {
      variant: {
        default: '',
        fluid: '!max-w-full lg:px-8 md:px-8 px-4',
      },
      spacing: {
        none: 'lg:py-0 md:py-0 py-0',
        default: 'lg:py-24 md:py-12 ',
        large: 'lg:py-48 md:py-24 py-24',
        medium: 'lg:py-24 md:py-12 py-12',
        small: 'lg:py-8 md:py-8 py-8',
      },
    },
    defaultVariants: {
      spacing: 'default',
      variant: 'default',
    },
  }
);

type ContainerProps = {
  id?: string;
  spacing?: 'none' | 'large' | 'medium' | 'small';
} & Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'className' | 'children'
> &
  VariantProps<typeof containerVariants>;

/**
 * GridContainer
 *
 * @param children - jsxElement: what is inside the component
 * @param className - string: classes to be passed to component
 * @param id - string | undefined: the id passed to the component
 * @param variant - 'default' | 'fluid' | null | undefined: the varaint of the container
 * @param spacing - 'none' | 'large' | 'medium' | 'default' | null | undefined: the spacing of the container which adds to its children on top and bottom padding
 */

export const GridContainer = ({
  id,
  children,
  className,
  spacing,
  variant,
}: ContainerProps) => {
  return (
    <div
      className={cn(containerVariants({ variant, className, spacing }))}
      id={id || ''}
    >
      {children}
    </div>
  );
};
