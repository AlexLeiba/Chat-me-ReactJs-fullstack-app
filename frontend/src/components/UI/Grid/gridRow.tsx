import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const rowVariants = cva(
  [
    'flex flex-wrap',
    'lg:-mx-3',
    'md:-mx-3',
    '-mx-3',
    'lg:gap-y-12 md:gap-y-6 gap-y-6',
  ],
  {
    variants: {
      variant: {
        default: '',
        fluid: '!max-w-full',
      },
      spacing: {
        none: 'lg:gap-y-0 md:gap-y-0 gap-y-0', //0px
        default: 'lg:gap-y-12 md:gap-y-6 gap-y-6', //48px
        large: 'lg:gap-y-12 md:gap-y-6 gap-y-6', //48px
        medium: 'lg:gap-y-6 md:gap-y-3 gap-y-3', //24px
        small: 'lg:gap-y-4 md:gap-y-2 gap-y-2', //16px
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'default',
    },
  }
);

type RowProps = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'className' | 'children'
> &
  VariantProps<typeof rowVariants>;

/**
 * GridRow
 *
 * @param children - jsxElement: what is inside the component
 * @param className - string: classes to be passed to component
 * @param variant - 'default' | 'fluid' | null | undefined: the varaint of the row
 * @spacing - 'none' | 'default- 48px ' | 'large - 48px' | 'medium - 24px' | 'small - 16px' | null | undefined: the spacing between the rows
 */

export const GridRow = ({
  children,
  className,
  variant,
  spacing,
}: RowProps) => {
  return (
    <div className={cn(rowVariants({ variant, className, spacing }))}>
      {children}
    </div>
  );
};
