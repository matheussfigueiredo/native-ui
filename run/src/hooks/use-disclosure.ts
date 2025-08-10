import React from "react";

interface DisclosureHookProps {
  init?: boolean;
}

export function useDisclosure(props?: DisclosureHookProps) {
  const init = props?.init ?? false;
  const [collapse, setCollapse] = React.useState<boolean>(init);

  const onCollapse = () => {
    setCollapse(!collapse);
  };

  return { collapse, setCollapse, onCollapse };
}
