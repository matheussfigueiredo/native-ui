import { cn } from "@/lib/cn";
import { styled } from "@/lib/nva";
import { type ComponentProps, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { TypographyProvider } from "./typography";
import { composeText, createCTX } from "native-variants";

type CommonProps = {
  value?: string;
  onChange?: (input: string) => void;
};

const { CTXProvider, useCTX } = createCTX<CommonProps>();

const tabsVariants = styled((ctx, t) =>
  ctx({
    slots: ["root", "list", "trigger", "content"],
    base: {
      root: {
        display: "flex",
        flexDirection: "column",
      },
      list: {
        height: 40,
        display: "flex",
        flexDirection: "row",
      },
      trigger: {
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 2,
        fontSize: t.fontSizes.sm,
        justifyContent: "center",
        textAlignVertical: "center",
      },
      content: {},
    },
    variants: {
      active: {
        true: {
          trigger: {
            color: t.colors.primary,
            borderColor: t.colors.primary,
          },
        },
        false: {
          trigger: {
            color: t.colors.mutedForeground,
            borderBottomColor: t.colors.input,
          },
        },
      },
      disabled: {
        true: {
          trigger: {
            opacity: t.opacity["50"],
            pointerEvents: "none",
            userSelect: "none",
          },
        },
        false: {
          trigger: {
            opacity: t.opacity["100"],
            pointerEvents: "auto",
            userSelect: "auto",
          },
        },
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  })
);

function Tabs({
  style,
  value,
  onChange,
  defaultValue,
  ...props
}: ComponentProps<typeof View> &
  CommonProps & {
    defaultValue?: string;
  }) {
  const styles = tabsVariants();

  const [internalValue, setInternalValue] = useState<string | undefined>(
    value ?? defaultValue
  );

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const handleInternalChange = (input: string) => {
    if (onChange) {
      onChange(input);
    } else {
      setInternalValue(input);
    }
  };

  return (
    <CTXProvider
      props={{
        value: internalValue,
        onChange: handleInternalChange,
      }}
    >
      <View style={cn(styles.root, style)} {...props} />
    </CTXProvider>
  );
}

function TabsTrigger({
  style,
  value,
  disabled = false,
  ...props
}: ComponentProps<typeof TouchableOpacity> & {
  value: string;
}) {
  const ctx = useCTX();
  const styles = tabsVariants({ active: ctx?.value === value, disabled });

  const handleInternalChange = () => {
    if (value !== ctx?.value) {
      ctx?.onChange?.(value);
    }
  };

  return (
    <TypographyProvider props={composeText(styles.trigger)}>
      <TouchableOpacity
        onPress={handleInternalChange}
        style={cn(styles.trigger, style)}
        {...props}
      />
    </TypographyProvider>
  );
}

function TabsList({ style, ...props }: ComponentProps<typeof View>) {
  const styles = tabsVariants();

  return <View style={cn(styles.list, style)} {...props} />;
}

function TabsContent({
  style,
  value,
  keepMounted = true,
  children,
  ...props
}: ComponentProps<typeof View> & {
  value: string;
  keepMounted?: boolean;
}) {
  const ctx = useCTX();
  const base = tabsVariants();
  const isActive = ctx?.value === value;

  if (keepMounted) {
    return (
      <View
        style={cn(base.content, !isActive && { display: "none" }, style)}
        {...props}
      >
        {children}
      </View>
    );
  }

  if (!isActive) return null;

  return (
    <View style={cn(base.content, style)} {...props}>
      {children}
    </View>
  );
}

export { Tabs, TabsTrigger, TabsList, TabsContent };
