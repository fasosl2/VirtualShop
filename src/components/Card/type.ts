import type { CSSProperties, ReactNode } from "react";

export interface ControlButton {
  label: string;
  loadingLabel: string;
  variant: string;
  onClick: () => void;
  freeShow?: boolean;
}

export interface ICard {
  _id?: string;
  image?: string;
  title?: string;
  subTitle?: string | ReactNode;
  onClick?: () => void;
  controls?: ControlButton[];
  style?: CSSProperties;
  styleBody?: CSSProperties;
  styleFooter?: CSSProperties;
  classFooter?: string;
  children?: ReactNode;
  hideControls?: boolean;
}