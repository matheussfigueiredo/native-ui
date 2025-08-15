import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { composeText, type VariantProps } from 'native-variants'
import { type ComponentProps, memo } from 'react'
import { View } from 'react-native'
import { TypographyProvider } from './typography'

const badgeVariants = styled((ctx, t) =>
  ctx({
    slots: ['root', 'text'],
    base: {
      root: {
        borderWidth: 1,
        display: 'flex',
        fontWeight: '400',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: t.radii.lg,
        textAlignVertical: 'center',
      },
    },
    variants: {
      variant: {
        default: {
          root: {
            borderColor: t.colors.primary,
            backgroundColor: t.colors.primary,
            color: t.colors.primaryForeground,
          },
        },
        ghost: {
          root: {
            borderColor: t.colors.transparent,
            backgroundColor: t.colors.transparent,
            color: t.colors.primary,
          },
        },
        outline: {
          root: {
            borderColor: t.colors.border,
            backgroundColor: t.colors.transparent,
            color: t.colors.primary,
          },
        },
        secondary: {
          root: {
            borderColor: t.colors.secondary,
            backgroundColor: t.colors.secondary,
            color: t.colors.secondaryForeground,
          },
        },
        destructive: {
          root: {
            borderColor: t.colors.destructive,
            backgroundColor: t.colors.destructive,
            color: t.colors.white,
          },
        },
      },
      size: {
        default: {
          root: {
            height: 30,
            paddingHorizontal: t.spacing['3.5'],
            fontSize: t.fontSizes.xxs,
          },
        },
        sm: {
          root: {
            height: 26,
            fontSize: t.fontSizes.xxs,
            paddingHorizontal: t.spacing['2.5'],
          },
        },
        lg: {
          root: {
            height: 34,
            fontSize: t.fontSizes.xxs,
            paddingHorizontal: t.spacing['2.5'],
          },
        },
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  })
)

function BadgeComponent({
  size,
  style,
  variant,
  ...props
}: ComponentProps<typeof View> & VariantProps<typeof badgeVariants>) {
  const styles = badgeVariants({ variant, size })

  return (
    <TypographyProvider props={composeText(styles.root)}>
      <View style={cn(styles.root, style as any)} {...props} />
    </TypographyProvider>
  )
}

const Badge = memo(BadgeComponent)

export { Badge, badgeVariants }
