import React, { useState } from "react";
import { Funnel, TFunnelProps, TFunnelStepProp } from "./Funnel";

type TFunnelComponent = {
  (props: TFunnelProps): React.ReactNode;
} & { Step: (props: TFunnelStepProp) => React.ReactNode };

type TFunnelCommander = {
  onPrev: () => void;
  onNext: (pushedState: TFunnelHistory) => void;
  onDone: () => void;
};

type TFunnelHistory = {
  name: string;
  state: Record<string, unknown>;
};

const useFunnel = (): [TFunnelComponent, TFunnelCommander] => {
  const [funnelHistories, setFunnelHistories] = useState<TFunnelHistory[]>([]);

  const popFunnelHistories = () => {
    setFunnelHistories((state) => state.slice(0, state.length - 1));
  };
  const pushFunnelHistories = (pushedState: TFunnelHistory) => {
    setFunnelHistories((state) => [...state, pushedState]);
  };

  const onPrev: TFunnelCommander["onPrev"] = () => {
    if (funnelHistories.length) {
      popFunnelHistories();
    }
  };

  const onNext: TFunnelCommander["onNext"] = (pushedState) => {
    pushFunnelHistories(pushedState);
  };

  const onDone: TFunnelCommander["onDone"] = () => {};

  return [Funnel, { onPrev, onNext, onDone }];
};

export default useFunnel;
