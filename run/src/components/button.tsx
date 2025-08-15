import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { composeText, type VariantProps } from 'native-variants'
import { type ComponentProps, memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { Slot } from './slot'
import { TypographyProvider } from './typography'

const buttonVariants = styled((ctx, t) =>
  ctx({
    slots: ['root'],
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
            height: 40,
            paddingHorizontal: t.spacing['3.5'],
            fontSize: t.fontSizes.sm,
          },
        },
        sm: {
          root: {
            height: 38,
            fontSize: t.fontSizes.xs,
            paddingHorizontal: t.spacing['2.5'],
          },
        },
        lg: {
          root: {
            height: 44,
            fontSize: t.fontSizes.sm,
            paddingHorizontal: t.spacing['2.5'],
          },
        },
        icon: {
          root: {
            width: 40,
            height: 40,
            padding: t.spacing['0'],
            borderRadius: t.radii.full,
          },
        },
      },
      disabled: {
        true: {
          root: {
            opacity: t.opacity['50'],
            pointerEvents: 'none',
            userSelect: 'none',
          },
        },
        false: {
          root: {
            opacity: t.opacity['100'],
            pointerEvents: 'auto',
            userSelect: 'auto',
          },
        },
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      disabled: 'false',
    },
  })
)

function ButtonComponent({
  size,
  style,
  variant,
  asChild = false,
  disabled = false,
  ...props
}: ComponentProps<typeof TouchableOpacity> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : TouchableOpacity
  const styles = buttonVariants({ variant, size, disabled })

  return (
    <TypographyProvider props={composeText(styles.root)}>
      <Comp
        activeOpacity={0.6}
        style={cn(styles.root, style as any)}
        {...props}
      />
    </TypographyProvider>
  )
}

const Button = memo(ButtonComponent)

export { Button, buttonVariants }
