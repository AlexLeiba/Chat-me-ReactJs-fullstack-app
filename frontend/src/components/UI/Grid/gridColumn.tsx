import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const columnVariants = cva(['max-w-full', 'lg:px-3', 'md:px-3', 'px-3'], {
  variants: {
    lg: {
      12: 'lg:w-full',
      11: 'lg:w-11/12',
      10: 'lg:w-10/12',
      9: 'lg:w-9/12',
      8: 'lg:w-8/12',
      7: 'lg:w-7/12',
      6: 'lg:w-6/12',
      5: 'lg:w-5/12',
      4: 'lg:w-4/12',
      3: 'lg:w-3/12',
      2: 'lg:w-2/12',
      1: 'lg:w-1/12',
    },
    lgOffset: {
      11: 'lg:ml-[91.666667%]',
      10: 'lg:ml-[83.333333%]',
      9: 'lg:ml-[75%]',
      8: 'lg:ml-[66.666667%]',
      7: 'lg:ml-[58.333333%]',
      6: 'lg:ml-[50%]',
      5: 'lg:ml-[41.666667%]',
      4: 'lg:ml-[33.333333%]',
      3: 'lg:ml-[25%]',
      2: 'lg:ml-[16.666667%]',
      1: 'lg:ml-[8.333333%]',
    },
    md: {
      4: 'md:w-full',
      3: 'md:w-3/4',
      2: 'md:w-2/4',
      1: 'md:w-1/4',
    },
    mdOffset: {
      3: 'md:ml-[75%]',
      2: 'md:ml-[50%]',
      1: 'md:ml-[25%]',
    },
    sm: {
      4: 'w-full',
      3: 'w-3/4',
      2: 'w-2/4',
      1: 'w-1/4',
    },
    smOffset: {
      3: 'ml-[75%]',
      2: 'ml-[50%]',
      1: 'ml-[25%]',
    },
  },
});

type ContainerProps = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'className' | 'children'
> &
  Pick<VariantProps<typeof columnVariants>, 'lg' | 'md' | 'sm'> &
  Pick<
    VariantProps<typeof columnVariants>,
    'lgOffset' | 'mdOffset' | 'smOffset'
  >;

/**
 * GridCol
 *
 * @param children - jsxElement: what is inside the component
 * @param className - string: classes to be passed to component
 * @param lg - 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | null: the size of the column for large screens
 * @param md - 6 | 5 | 4 | 3 | 2 | 1 | null: the size of the column for medium screens
 * @param sm - 4 | 3 | 2 | 1 | null: the size of the column for small screens
 * @param lgOffset - 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | null | undefined: the offset for the column for large screens
 * @param mdOffset - 5 | 4 | 3 | 2 | 1 | null | undefined: the offset for the column for medium screens
 * @param smOffset - 3 | 2 | 1 | null | undefined: the offset for the column for small screens
 *
 */

export const GridCol = ({
  children,
  className,
  lg = 12,
  md = 4,
  sm = 4,
  lgOffset,
  mdOffset,
  smOffset,
}: ContainerProps) => {
  return (
    <div
      className={cn(
        columnVariants({ lg, md, sm, lgOffset, mdOffset, smOffset, className })
      )}
    >
      {children}
    </div>
  );
};
