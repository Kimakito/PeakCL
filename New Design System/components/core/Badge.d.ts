import * as React from 'react';

/** Pastille pill dans une famille de couleur de la palette. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'turquoise' | 'bleu' | 'lavande' | 'jaune' | 'violet' | 'neutre';
  /** Petit carré arrondi (puce maison) avant le texte */
  dot?: boolean;
  children?: React.ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
