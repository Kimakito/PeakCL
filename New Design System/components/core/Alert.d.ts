import * as React from 'react';

/** Message pastel avec puce carrée — info/success/warning/brand. */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'info' | 'success' | 'warning' | 'brand';
  title?: React.ReactNode;
  children?: React.ReactNode;
}

export declare function Alert(props: AlertProps): JSX.Element;
