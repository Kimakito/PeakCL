import * as React from 'react';

/** Champ texte avec label et hint. multiline pour textarea. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: boolean;
  multiline?: boolean;
}

export declare function Input(props: InputProps): JSX.Element;
