import * as React from 'react';

/** Onglets — segmented pill (défaut) ou underline dégradé bleu. */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: Array<{ value: string; label: React.ReactNode }>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: 'pill' | 'underline';
}

export declare function Tabs(props: TabsProps): JSX.Element;
