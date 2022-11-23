/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import MenuUnstyled from '@mui/base/MenuUnstyled';
import PopperUnstyled, { PopperUnstyledProps } from '@mui/base/PopperUnstyled';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { MenuItem, MenuItemProps } from '@mui/material';
import React, { useState, useRef, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../states/State';
import ThemeParameter from '../states/ThemeParameter';

const defaultListbox = '';
const defaultRoot = 'bg-slate-50 drop-shadow-xl rounded px-2 py-1';

const Popper =
  // eslint-disable-next-line react/display-name
  React.forwardRef(
    (props: PopperUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) => (
      <PopperUnstyled {...props} placement="right" ref={ref} />
    ),
  );

export interface NestedMenuItemProps extends Omit<MenuItemProps, 'button'> {
  /**
   * Open state of parent `<Menu />`, used to close decendent menus when the
   * root menu is closed.
   */
  parentMenuOpen: boolean;
  /**
   * Component for the container element.
   * @default 'div'
   */
  component?: React.ElementType;
  /**
   * Effectively becomes the `children` prop passed to the `<MenuItem/>`
   * element.
   */
  label?: React.ReactNode;
  /**
   * @default <ArrowRight />
   */
  rightIcon?: React.ReactNode;
  /**
   * Props passed to container element.
   */
  ContainerProps?: React.HTMLAttributes<HTMLElement> &
    React.RefAttributes<HTMLElement | null>;
  /**
   * @see https://material-ui.com/api/list-item/
   */
  button?: true | undefined;
}

/**
 * Use as a drop-in replacement for `<MenuItem>` when you need to add cascading
 * menu elements as children to this component.
 */
// eslint-disable-next-line react/display-name
const NestedMenuItem = React.forwardRef<
  HTMLLIElement | null,
  NestedMenuItemProps
>((props, ref) => {
  const {
    parentMenuOpen,
    label,
    rightIcon = <ArrowRight />,
    children,
    tabIndex: tabIndexProp,
    ContainerProps: ContainerPropsProp = {},
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ...MenuItemProps
  } = props;

  const theme = useSelector<State, ThemeParameter>(state => state.theme);

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

  const menuItemRef = useRef<HTMLLIElement>(null);
  useImperativeHandle<HTMLLIElement | null, HTMLLIElement | null>(
    ref,
    () => menuItemRef.current,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(containerRefProp, () => containerRef.current);

  const menuContainerRef = useRef<HTMLDivElement>(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setIsSubMenuOpen(true);

    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event);
    }
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setIsSubMenuOpen(false);

    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event);
    }
  };

  // Check if any immediate children are active
  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument?.activeElement;
    // eslint-disable-next-line no-restricted-syntax
    for (const child of menuContainerRef.current?.children ?? []) {
      if (child === active) {
        return true;
      }
    }
    return false;
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (event.target === containerRef.current) {
      setIsSubMenuOpen(true);
    }

    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      return;
    }

    if (isSubmenuFocused()) {
      event.stopPropagation();
    }

    const active = containerRef.current?.ownerDocument?.activeElement;

    if (event.key === 'ArrowLeft' && isSubmenuFocused()) {
      containerRef.current?.focus();
    }

    if (
      event.key === 'ArrowRight' &&
      event.target === containerRef.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0] as
        | HTMLElement
        | undefined;
      firstChild?.focus();
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;

  // Root element must have a `tabIndex` attribute for keyboard navigation
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      {...ContainerProps}
      ref={containerRef}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}>
      <MenuItem {...MenuItemProps} ref={menuItemRef}>
        {label}
        {rightIcon}
      </MenuItem>
      <MenuUnstyled
        anchorEl={menuItemRef.current}
        open={open}
        slots={{ root: Popper, listbox: 'ul' }}
        slotProps={{
          listbox: { className: theme.style['Menu.listbox'] ?? defaultListbox },
          root: { className: theme.style['Menu.root'] ?? defaultRoot },
        }}
        onClose={() => {
          setIsSubMenuOpen(false);
        }}>
        <div ref={menuContainerRef} style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
      </MenuUnstyled>
    </div>
  );
});

export default NestedMenuItem;
