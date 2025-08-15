import { styled } from '@/lib/nva'
import { type VariantProps } from 'native-variants'
import { ComponentProps, memo, useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

const spinnerVariants = styled((ctx, t) =>
  ctx({
    slots: ['root'],
    base: {
      root: {
        borderWidth: 3,
        borderRadius: 9999,
        borderTopColor: t.colors.primary,
        borderRightColor: 'transparent',
        borderBottomColor: t.colors.primary,
        borderLeftColor: 'transparent',
      },
    },
    variants: {
      size: {
        sm: { root: { width: 16, height: 16 } },
        default: { root: { width: 24, height: 24 } },
        lg: { root: { width: 40, height: 40 } },
      },
      color: {
        primary: {
          root: {
            borderTopColor: t.colors.primary,
            borderBottomColor: t.colors.primary,
          },
        },
        secondary: {
          root: {
            borderTopColor: t.colors.secondary,
            borderBottomColor: t.colors.secondary,
          },
        },
        white: {
          root: {
            borderTopColor: '#fff',
            borderBottomColor: '#fff',
          },
        },
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
    },
  })
)

function SpinnerComponent({
  style,
  size,
  color,
  duration = 800,
  ...props
}: ComponentProps<typeof View> & {
  duration?: number
} & VariantProps<typeof spinnerVariants>) {
  const styles = spinnerVariants({ size, color })

  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration, easing: Easing.linear }),
      -1,
      false
    )
  }, [duration])

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ rotate: `${rotation.value}deg` }] }
  })

  return (
    <Animated.View style={[styles.root, animatedStyle, style]} {...props} />
  )
}

const Spinner2 = memo(SpinnerComponent)

export { Spinner2 }
