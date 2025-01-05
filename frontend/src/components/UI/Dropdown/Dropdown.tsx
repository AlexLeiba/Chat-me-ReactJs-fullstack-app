'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '../../../lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Select component
 *
 * @param defaultValue - string: the value of the select when initially rendered use when you do not need to control the state of the select
 * @param value - string: the controlled value of the select, should be used in conjunction with onValueChange
 * @param onValueChange - function: (value: string) => void: event handler called when the value changes
 * @param defaultOpen - boolean: the open state of the select when it is initially rendered, use when you do not need to control its open state
 * @param open - boolean: the controlled open state of the select, must be used with onOpenChange
 * @param onOpenChange - function: (open: boolean) => void: event handler called when the open state of the select changes
 * @param dir - 'ltr' | 'rtl': the reading direction of the select when applicable, if omitted, inherits globally from DirectionProvider or assumes ltr
 * @param name - string: the name of the select, submitted with its owning form as part of a name/value pair
 * @param disabled - boolean: when true, prevents the user from interacting with select
 * @param required - boolean: when true, indicates that the user must select a value before the owning form can be submitted
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const Select = SelectPrimitive.Root;

/**
 * SelectGroup component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectGroup = SelectPrimitive.Group;

/**
 * SelectValue component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param placeholder - ReactNode: the content that will be rendered inside the Select.value when no value or defaultValue is set
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectValue = SelectPrimitive.Value;

const selectTriggerVariant = cva(
  'group data-[disabled]:border-none data-[disabled]:bg-baseline-50 data-[disabled]:text-baseline-300 data-[state=open]:ring-primary-100 group flex h-11 w-full gap-2 items-center justify-between rounded border border-baseline-300 bg-white py-2.5 pl-4 pr-3 text-base text-baseline-950 placeholder:text-baseline-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed data-[state=open]:border-accent-600 data-[state=open]:outline-0 data-[state=open]:ring-2 data-[state=open]:ring-accent-100 data-[state=open]:ring-offset-0 [&>span]:line-clamp-1 [&>span]:text-left',
  {
    variants: {
      variant: {
        default: '',
        chip: 'w-fit bg-baseline-50 rounded-full focus:ring-0 data-[state=open]:ring-0 data-[state=open]:bg-accent-700 data-[state=open]:text-white border-transparent',
      },
    },
  }
);

/**
 * SelectTrigger component
 *
 * @param className - string: classes to be passed to component
 * @param variant - 'default' | 'chip' | null | undefined: determines the visual variant of the select trigger
 * @param children - ReactNode: children to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param [data-state] - 'open' | 'closed'
 * @param [data-disabled] - Present when disabled
 * @param [data-placeholder] - Present when has placeholder
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof selectTriggerVariant>
>(({ className, children, variant, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariant({ variant, className }))}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        size={20}
        className={cn(
          'text-[20px] text-baseline-950 transition-transform group-data-[state=open]:rotate-180 group-data-[disabled]:border-none group-data-[disabled]:text-baseline-300',
          variant === 'chip' && 'group-data-[state=open]:text-white'
        )}
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectScrollUpButton component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp size={20} />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * SelectScrollDownButton component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown size={20} />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/**
 * SelectContent component
 *
 * @param className - string: classes to be passed to component
 * @param children - ReactNode: children to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param onCloseAutoFocus - function: (event: Event) => void: event handler called when focus moves to the trigger after closing
 * @param onEscapeKeyDown - function: (event: KeyboardEvent) => void: event handler called when the escape key is down
 * @param onPointerDownOutside - function: onPointerDownOutside: event handler called when a pointer event occurs outside the bounds of the component
 * @param position - 'item-aligned' | 'popper' by default item-aligned: the positioning mode to use, item-aligned is the default and behaves similarly to a native MacOS menu by positioning content relative to the active item. popper positions content in the same way as our other primitives, for example Popover or DropdownMenu
 * @param side - 'top' | 'right' | 'bottom' | 'left' by default bottom: the preferred side of the anchor to render against when open, will be reversed when collisions occur and avoidCollisions is enabled, only available when position is set to popper
 * @param sideOffset - number by default 0: the distance in pixels from the anchor, only available when position is set to popper
 * @param align - 'start' | 'center' | 'end' by default start: the preferred alignment against the anchor, may change when collisions occur, only available when position is set to popper
 * @param alignOffset - number by default 0: an offset in pixels from the "start" or "end" alignment options, only available when position is set to popper
 * @param avoidCollisions - boolean by default true: when true, overrides the side andalign preferences to prevent collisions with boundary edges, only available when position is set to popper
 * @param collisionBoundary - boundary: Element | null | Array<Element | null> by default []: the element used as the collision boundary, by default this is the viewport, though you can provide additional element(s) to be included in this check, only available when position is set to popper
 * @param collisionPadding - number | padding: number | Partial<Record<Side, number>> by default 10: the distance in pixels from the boundary edges where collision detection should occur
 * @param arrowPadding - number by default 0: the padding between the arrow and the edges of the content, if your content has border-radius, this will prevent it from overflowing the corners, only available when position is set to popper
 * @param sticky - 'partial' | 'always' by default partial: the sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless, only available when position is set to popper
 * @param hideWhenDetached - boolean by default false: whether to hide the content when the trigger becomes fully occluded, only available when position is set to popper
 * @param [data-state] - 'open' | 'closed'
 * @param [data-side] - 'left' | 'right' | 'bottom' | 'top'
 * @param [data-align] - 'start' | 'end' | 'center'
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded border border-baseline-100 bg-white py-1.5 text-baseline-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectLabel component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'pb-2 pl-3 pr-2 pt-[18px] text-xs text-baseline-500',
      className
    )}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * SelectItem component
 *
 * @param className - string: classes to be passed to component
 * @param children - ReactNode: children to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param value - string: the value given as data when submitted with a name
 * @param disabled - boolean: when true, prevents the user from interacting with the item.
 * @param textValue - string: optional text used for typeahead purposes, by default the typeahead behavior will use the .textContent of the Select.ItemText part, use this when the content is complex, or you have non-textual content inside
 * @param [data-state] - 'checked' | 'unchecked'
 * @param [data-highlighted] - Present when highlighted
 * @param [data-disabled] - Present when disabled
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center py-2.5 pl-[37px] pr-2 text-base outline-none hover:bg-baseline-50 focus:bg-baseline-50 data-[disabled]:pointer-events-none data-[disabled]:text-baseline-300',
      className
    )}
    {...props}
  >
    <span className='absolute left-3 flex size-4 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <Check size={20} />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * SelectSeparator component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 *
 * [Radix select](https://www.radix-ui.com/primitives/docs/components/select)
 */

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-baseline-100', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
