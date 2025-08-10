import { cn } from "@/lib/cn";

import { type VariantProps, createCTX } from "native-variants";
import { styled } from "@/lib/nva";
import { type ComponentProps, memo } from "react";
import { Image, Text, View } from "react-native";

export const shortName = (str: string): string => {
  if (!str.trim()) {
    return "UN";
  }

  const parts = str.trim().split(/\s+/);

  if (parts.length > 1) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  return parts[0].substring(0, 2).toUpperCase();
};

const { CTXProvider, useCTX } =
  createCTX<VariantProps<typeof avatarVariants>>();

const avatarVariants = styled((ctx, t) =>
  ctx({
    slots: ["root", "fallback", "image"],
    base: {
      root: {
        display: "flex",
        overflow: "hidden",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: t.radii.full,
        backgroundColor: t.colors.border,
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "fill",
        zIndex: t.zIndex["10"],
      },
      fallback: {
        position: "absolute",
        zIndex: -t.zIndex["10"],
      },
    },
    variants: {
      size: {
        default: {
          root: {
            width: 44,
            height: 44,
          },
          fallback: {
            fontSize: t.fontSizes.xs,
          },
        },
        sm: {
          root: {
            width: 56,
            height: 56,
          },
          fallback: {
            fontSize: t.fontSizes.xs,
          },
        },
        md: {
          root: {
            width: 72,
            height: 72,
          },
          fallback: {
            fontSize: t.fontSizes.lg,
          },
        },
        lg: {
          root: {
            width: 96,
            height: 96,
          },
          fallback: {
            fontSize: t.fontSizes["2xl"],
          },
        },
        xl: {
          root: {
            width: 128,
            height: 128,
          },
          fallback: {
            fontSize: t.fontSizes["5xl"],
          },
        },
      },
    },
    defaultVariants: {
      size: "default",
    },
  })
);

function AvatarComponent({
  style,
  size,
  ...props
}: ComponentProps<typeof View> & VariantProps<typeof avatarVariants>) {
  const { root } = avatarVariants({ size });

  return (
    <CTXProvider props={{ size }}>
      <View style={cn(root, style)} {...props} />
    </CTXProvider>
  );
}

function AvatarFallbackComponent({
  style,
  children,
  ...props
}: ComponentProps<typeof Text>) {
  const ctx = useCTX();
  const { fallback } = avatarVariants({ size: ctx?.size });

  return (
    <Text style={cn(fallback, style)} {...props}>
      {shortName(String(children))}
    </Text>
  );
}

function AvatarImageComponent({
  style,
  ...props
}: ComponentProps<typeof Image>) {
  const { image } = avatarVariants({});

  return <Image style={cn(image, style)} {...props} />;
}

const Avatar = memo(AvatarComponent);

const AvatarFallback = memo(AvatarFallbackComponent);

const AvatarImage = memo(AvatarImageComponent);

export { Avatar, AvatarFallback, AvatarImage };
