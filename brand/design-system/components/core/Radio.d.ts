import * as React from 'react';

/** Bouton radio rond bleu. Grouper par name. */
export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  disabled?: boolean;
}

export declare function Radio(props: RadioProps): JSX.Element;
