import { cn } from "@/lib/cn";
import { createCTX, type VariantProps } from "native-variants";
import { styled } from "@/lib/nva";
import { type ComponentProps, memo } from "react";
import { type StyleProp, Text, type TextStyle } from "react-native";

const typographyVariants = styled((ctx, t) =>
  ctx({
    slots: ["root"],
    base: {
      root: {
        letterSpacing: -0.05,
        color: t.colors.foreground,
      },
    },
    variants: {
      as: {
        xxs: {
          root: {
            fontSize: t.fontSizes.xxs,
            fontWeight: "400",
          },
        },
        xs: {
          root: {
            fontSize: t.fontSizes.xs,
            fontWeight: "400",
          },
        },
        sm: {
          root: {
            fontSize: t.fontSizes.sm,
            fontWeight: "400",
          },
        },
        base: {
          root: {
            fontSize: t.fontSizes.base,
            fontWeight: "500",
          },
        },
        lg: {
          root: {
            fontSize: t.fontSizes.lg,
            fontWeight: "500",
          },
        },
        xl: {
          root: {
            fontSize: t.fontSizes.xl,
            fontWeight: "600",
          },
        },
        "2xl": {
          root: {
            fontSize: t.fontSizes["2xl"],
            fontWeight: "600",
          },
        },
        "3xl": {
          root: {
            fontSize: t.fontSizes["3xl"],
            fontWeight: "600",
          },
        },
        "4xl": {
          root: {
            fontSize: t.fontSizes["4xl"],
            fontWeight: "700",
          },
        },
        "5xl": {
          root: {
            fontSize: t.fontSizes["5xl"],
            fontWeight: "700",
          },
        },
        "6xl": {
          root: {
            fontSize: t.fontSizes["6xl"],
            fontWeight: "700",
          },
        },
      },
      textCase: {
        uppercase: {
          root: {
            textTransform: "uppercase",
          },
        },
        lowercase: {
          root: {
            textTransform: "lowercase",
          },
        },
        capitalize: {
          root: {
            textTransform: "capitalize",
          },
        },
      },
    },
    defaultVariants: {
      as: "sm",
      textCase: "capitalize",
    },
  })
);

const { CTXProvider: TypographyProvider, useCTX: useTypography } =
  createCTX<StyleProp<TextStyle>>();

function TypographyComponent({
  as,
  textCase,
  style,
  ...props
}: ComponentProps<typeof Text> & VariantProps<typeof typographyVariants>) {
  const ctx = useTypography();
  const styles = typographyVariants({ as, textCase });

  return <Text style={cn(styles.root, ctx, style)} {...props} />;
}

const Typography = memo(TypographyComponent);

export { Typography, TypographyProvider, useTypography };
