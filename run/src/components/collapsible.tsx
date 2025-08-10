import { cn } from "@/lib/cn";
import { styled } from "@/lib/nva";
import { type ComponentProps, useState } from "react";
import {
  type GestureResponderEvent,
  type LayoutChangeEvent,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Slot } from "./slot";
import { Button } from "./button";
import { createCTX } from "native-variants";

type CommonProps = {
  onChange?: VoidFunction;
  value?: boolean;
  duration?: number;
  minHeight?: number;
};

const { CTXProvider, useCTX } = createCTX<CommonProps>();

const collapsibleVariants = styled((ctx, _) =>
  ctx({
    slots: ["root", "content"],
    base: {
      root: {
        overflow: "hidden",
        width: "100%",
      },
      content: {
        position: "absolute",
        height: "auto",
        width: "100%",
      },
    },
  })
);

function Collapsible({
  style,
  value,
  onChange,
  minHeight = 0,
  duration = 400,
  defaultValue = false,
  children,
  ...props
}: ComponentProps<typeof View> &
  CommonProps & {
    defaultValue?: boolean;
    children: React.ReactNode;
  }) {
  const styles = collapsibleVariants({});
  const [internalValue, setInternalValue] = useState<boolean>(
    value ?? defaultValue
  );

  const handleInternalChange = () => {
    if (onChange) {
      onChange();
    } else {
      setInternalValue((prevState) => !prevState);
    }
  };

  return (
    <CTXProvider
      props={{
        value: value ?? internalValue,
        onChange: handleInternalChange,
        duration,
        minHeight,
      }}
    >
      <View style={cn(styles.root, style)} {...props}>
        {children}
      </View>
    </CTXProvider>
  );
}

function CollapsibleTrigger({
  asChild = false,
  variant,
  size,
  disabled,
  onPress,
  ...props
}: ComponentProps<typeof Button> & {
  asChild?: boolean;
}) {
  const ctx = useCTX();
  const Comp = asChild ? Slot : Button;

  const onToggle = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }

    ctx?.onChange?.();
  };

  return <Comp onPress={onToggle} {...props} />;
}

function CollapsibleContent({ style, ...props }: ComponentProps<typeof View>) {
  const ctx = useCTX();
  const styles = collapsibleVariants({});
  const animatedHeight = useSharedValue(0);
  const [height, setHeight] = useState<number>(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const animation = useAnimatedStyle(() => {
    const targetHeight = ctx?.value ? height : 0;
    animatedHeight.value = withTiming(
      Math.max(targetHeight, ctx?.minHeight ?? 0),
      {
        duration: ctx?.duration,
      }
    );

    return {
      height: animatedHeight.value,
    };
  }, [ctx?.value, ctx?.duration, height, ctx?.minHeight]);

  return (
    <Animated.View {...props} style={cn(styles.root, animation)}>
      <View onLayout={onLayout} style={cn(styles.content, style)} {...props} />
    </Animated.View>
  );
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
