import * as React from 'react';

/**
 * Carte carré-arrondi — blanche par défaut, ou dégradé de famille via tone.
 * @startingPoint section="Composants" subtitle="Carte blanche ombrée ou dégradé de famille" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fond dégradé de famille (lavande/violet passent le contenu en blanc) */
  tone?: 'turquoise' | 'bleu' | 'lavande' | 'jaune' | 'violet';
  /** Sur-titre majuscule avec puce carrée jaune */
  kicker?: React.ReactNode;
  title?: React.ReactNode;
  /** Remontée au survol (défaut true) */
  hover?: boolean;
  children?: React.ReactNode;
}

export declare function Card(props: CardProps): JSX.Element;
