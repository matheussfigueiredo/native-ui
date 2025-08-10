import { cn } from "@/lib/cn";
import { styled } from "@/lib/nva";
import type { ComponentProps } from "react";
import { Text, View } from "react-native";

const cardVariants = styled((ctx, t) =>
  ctx({
    slots: ["root", "title", "description", "header", "content", "footer"],
    base: {
      root: {
        borderWidth: 1,
        display: "flex",
        gap: t.spacing["6"],
        flexDirection: "column",
        borderRadius: t.radii["xl"],
        borderColor: t.colors.border,
        backgroundColor: t.colors.card,
        paddingVertical: t.spacing["6"],
      },
      title: {
        fontWeight: "600",
        fontSize: t.fontSizes.xl,
        color: t.colors.cardForeground,
      },
      description: {
        fontSize: t.fontSizes.sm,
        color: t.colors.mutedForeground,
      },
      header: {
        display: "flex",
        gap: t.spacing["1.5"],
        flexDirection: "column",
        alignItems: "flex-start",
        paddingHorizontal: t.spacing["6"],
      },
      content: {
        paddingHorizontal: t.spacing["6"],
      },
      footer: {
        display: "flex",
        gap: t.spacing["3"],
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: t.spacing["6"],
      },
    },
  })
);

function Card({ style, ...props }: ComponentProps<typeof View>) {
  const styles = cardVariants();

  return <View style={cn(styles.root, style)} {...props} />;
}

function CardTitle({ style, ...props }: ComponentProps<typeof Text>) {
  const styles = cardVariants();

  return <Text style={cn(styles.title, style)} {...props} />;
}

function CardDescription({ style, ...props }: ComponentProps<typeof Text>) {
  const styles = cardVariants();

  return <Text style={cn(styles.description, style)} {...props} />;
}

function CardHeader({ style, ...props }: ComponentProps<typeof View>) {
  const styles = cardVariants();

  return <View style={cn(styles.header, style)} {...props} />;
}

function CardContent({ style, ...props }: ComponentProps<typeof View>) {
  const styles = cardVariants();

  return <View style={cn(styles.content, style)} {...props} />;
}

function CardFooter({ style, ...props }: ComponentProps<typeof View>) {
  const styles = cardVariants();

  return <View style={cn(styles.footer, style)} {...props} />;
}

export {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
};
