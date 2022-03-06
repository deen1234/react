import { ReactChild } from 'react';

export declare type DirectionType = 'ltr' | 'rtl' | undefined;
export interface DirectionState {
  language: string;
  direction: DirectionType;
}
export interface DirectionProps {
  children?: ReactChild;
}

export type ContainerState = DirectionState;
