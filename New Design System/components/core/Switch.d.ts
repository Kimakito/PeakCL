import * as React from 'react';

/** Interrupteur pill — piste dégradé bleu quand actif. */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  disabled?: boolean;
}

export declare function Switch(props: SwitchProps): JSX.Element;
