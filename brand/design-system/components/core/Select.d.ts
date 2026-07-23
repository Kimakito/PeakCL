import * as React from 'react';

/** Liste déroulante native stylée (chevron indigo). */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  options?: Array<string | { value: string; label: string }>;
  placeholder?: string;
}

export declare function Select(props: SelectProps): JSX.Element;
