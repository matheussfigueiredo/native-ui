import { type ComponentProps, memo } from "react";
import { TextInput, View } from "react-native";
import { useInteractive } from "@/hooks/use-interactive";
import { cn } from "@/lib/cn";
import { styled, theme } from "@/lib/nva";
import { alpha, type VariantProps } from "native-variants";

const textAreaVariants = styled((ctx, t) =>
  ctx({
    slots: ["root", "field", "textarea", "icon", "placeholder"],
    base: {
      root: {
        minHeight: 120,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        borderRadius: t.radii.lg,
        paddingLeft: t.spacing["4"],
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      field: { flex: 1 },
      textarea: {
        flex: 1,
        height: "100%",
        textAlignVertical: "top",
        paddingRight: t.spacing["4"],
        paddingTop: theme?.spacing["2"],
        borderTopEndRadius: t.radii.lg,
        borderBottomEndRadius: t.radii.lg,
      },
      placeholder: {
        color: t.colors.mutedForeground,
      },
    },
    variants: {
      focus: {
        true: {
          root: {
            borderColor: t.colors.ring,
            backgroundColor: t.colors.transparent,
          },
        },
        false: {
          root: {
            borderColor: t.colors.input,
            backgroundColor: alpha(t.colors.input, 30),
          },
        },
      },
      size: {
        default: {
          root: { height: 40 },
        },
        lg: {
          root: { height: 46 },
        },
      },
      disabled: {
        true: {
          root: {
            opacity: t.opacity["50"],
            pointerEvents: "none",
            userSelect: "none",
          },
        },
        false: {
          root: {
            opacity: t.opacity["100"],
            pointerEvents: "auto",
            userSelect: "auto",
          },
        },
      },
    },
    defaultVariants: {
      size: "default",
      focus: false,
      disabled: false,
    },
  })
);

function TextAreaComponent({
  style,
  disabled,
  ...props
}: Omit<ComponentProps<typeof TextInput>, "editable"> &
  VariantProps<typeof textAreaVariants>) {
  const { focus, onFocus, onBlur } = useInteractive();
  const { root, textarea, placeholder } = textAreaVariants({ focus, disabled });

  return (
    <View style={cn(root, style) as any}>
      <TextInput
        multiline
        onBlur={onBlur}
        onFocus={onFocus}
        editable={!disabled}
        placeholderTextColor={placeholder?.color}
        style={cn(textarea, style, {
          height: "100%",
          textAlignVertical: "top",
        })}
        {...props}
      />
    </View>
  );
}

const TextArea = memo(TextAreaComponent);

export { TextArea };
