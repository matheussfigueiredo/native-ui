import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { styled, theme } from "@/lib/nva";
import { type ComponentProps, useEffect } from "react";
import { cn } from "@/lib/cn";

const skeletonVariants = styled((ctx, t) =>
  ctx({
    slots: ["root", "wrapper", "content"],
    base: {
      root: {
        backgroundColor: theme.colors.ring,
        overflow: "hidden",
      },
      wrapper: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
      },
      content: {
        opacity: t.opacity["0"],
      },
    },
  })
);

function Skeleton({
  width,
  height,
  radius = 6,
  children,
  ...props
}: ComponentProps<typeof View> & {
  width?: string | number;
  height?: string | number;
  radius?: number;
}) {
  const styles = skeletonVariants();
  const widthNumber = typeof width === "number" ? width : 200;
  const shimmerWidth = widthNumber * 0.6;
  const translateX = useSharedValue(-shimmerWidth);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(widthNumber + shimmerWidth, { duration: 1500 }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      //@ts-ignore
      style={cn(styles.root, { width, height, borderRadius: radius })}
      {...props}
    >
      <Animated.View style={cn(styles.wrapper, animatedStyle)}>
        <LinearGradient
          colors={[theme.colors.ring, theme.colors.input, theme.colors.ring]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { width: "100%" }]}
        />
      </Animated.View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export { Skeleton };
