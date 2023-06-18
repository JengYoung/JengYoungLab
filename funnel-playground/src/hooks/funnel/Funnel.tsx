import React from "react";

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type TFunnelStepProp = {
  name: string;
} & React.PropsWithChildren;

export type TFunnelProps = React.PropsWithChildren<{ step: string }>;

/**
 *
 * @
 */
export const Funnel = ({ step, children }: TFunnelProps) => {
  const ValidStep = React.Children.toArray(children).find(
    (elem) => React.isValidElement(elem) && elem.props.name === step
  );

  return <>{ValidStep}</>;
};

const FunnelStep = ({ children }: TFunnelStepProp) => {
  return <>{children}</>;
};

Funnel.Step = FunnelStep;
