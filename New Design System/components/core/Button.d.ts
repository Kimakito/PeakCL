import * as React from 'react';

/**
 * Bouton PeakCL — pill, arrondi, joyeux.
 * @startingPoint section="Composants" subtitle="Boutons primaires jaune dégradé, secondaires bleus, ghost" viewport="700x120"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = CTA jaune dégradé (texte indigo) · secondary = bleu plein · ghost = contour · inverse = blanc (fonds sombres) */
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  size?: 'sm' | 'md' | 'lg';
  /** Icône à gauche (élément SVG 1.1em) */
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  full?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
