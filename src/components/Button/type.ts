import type { ComponentProps, ReactNode } from 'react';
import { ButtonBS } from './styles';

export type IButton = ComponentProps<typeof ButtonBS> & {
  loading?: boolean;
  label: ReactNode;
  loadingLabel?: ReactNode;
  badge?: string;
  onClick?: () => void | Promise<void>;
  [key: string]: any; // Allow additional props for flexibility
};