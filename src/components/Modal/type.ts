import type { ReactNode } from 'react';
import type { IButton } from '../Button/type';

export interface IModal {
    title?: ReactNode;
    children?: ReactNode;
    open?: boolean;
    onHide?: () => void;
    controls?: IButton[];
}