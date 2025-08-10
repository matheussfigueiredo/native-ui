import React from "react";
import { Keyboard } from "react-native";

export function useInteractive() {
  const [focus, setFocus] = React.useState<boolean>(false);

  function onFocus() {
    setFocus(true);
  }

  function onBlur() {
    setFocus(false);
    requestAnimationFrame(() => {
      Keyboard.dismiss();
    });
  }

  return { focus, onFocus, onBlur };
}
