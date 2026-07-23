import * as React from 'react';

/** Bouton rond à icône seule. Fournir aria-label. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  /** Fond bleu plein au lieu du contour */
  solid?: boolean;
  size?: 'sm' | 'md';
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
