import React, { ComponentProps, memo, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { styled } from "@/lib/nva";
import { VariantProps } from "native-variants";

const pulseVariants = styled((ctx, t) =>
  ctx({
    slots: ["root"],
    base: {
      root: {
        borderRadius: 9999,
        backgroundColor: t.colors.primary,
      },
    },
    variants: {
      size: {
        sm: { root: { width: 16, height: 16 } },
        default: { root: { width: 24, height: 24 } },
        lg: { root: { width: 40, height: 40 } },
      },
      color: {
        primary: { root: { backgroundColor: t.colors.primary } },
        secondary: { root: { backgroundColor: t.colors.secondary } },
        white: { root: { backgroundColor: "#fff" } },
      },
    },
    defaultVariants: {
      size: "default",
      color: "primary",
    },
  })
);

function PulseComponent({
  style,
  size,
  color,
  duration = 1500,
  ...props
}: ComponentProps<typeof View> & {
  duration?: number;
} & VariantProps<typeof pulseVariants>) {
  const styles = pulseVariants({ size, color });

  const scale = useSharedValue(0.4);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration, easing: Easing.linear }),
      -1,
      false
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: duration / 2, easing: Easing.ease }),
        withTiming(0.4, { duration: duration / 2, easing: Easing.ease })
      ),
      -1,
      false
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.root, animatedStyle, style]} {...props} />
  );
}

const Pulse = memo(PulseComponent);

export { Pulse };
