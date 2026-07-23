import * as React from 'react';

/** Étiquette pill sélectionnable/retirable (filtres, compétences). */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
  onClick?: () => void;
  /** Affiche un × de suppression */
  onRemove?: () => void;
  children?: React.ReactNode;
}

export declare function Tag(props: TagProps): JSX.Element;
