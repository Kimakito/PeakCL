import * as React from 'react';

/** Case à cocher carré-arrondi, coche animée ressort. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  disabled?: boolean;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
