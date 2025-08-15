import { styled } from '@/lib/nva'
import type { VariantProps } from 'native-variants'
import { memo, useEffect } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

const spinnerVariants = styled((ctx, t) =>
  ctx({
    slots: ['container', 'spinner'],
    base: {
      spinner: {
        width: 40,
        height: 40,
        borderWidth: 4,
        borderRadius: t.radii.full,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: t.colors.primary,
      },
    },
    variants: {
      size: {
        sm: {
          spinner: {
            width: 24,
            height: 24,
            borderWidth: 3,
          },
        },
        default: {
          spinner: {
            width: 26,
            height: 26,
            borderWidth: 3,
          },
        },
        lg: {
          spinner: {
            width: 32,
            height: 32,
            borderWidth: 4,
          },
        },
      },
      color: {
        primary: { spinner: { borderTopColor: t.colors.primary } },
        secondary: { spinner: { borderTopColor: t.colors.secondary } },
        white: { spinner: { borderTopColor: '#fff' } },
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
}: {
  style?: StyleProp<ViewStyle>
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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }))

  return (
    <Animated.View style={[styles.spinner, animatedStyle, style]} {...props} />
  )
}

const Spinner = memo(SpinnerComponent)

export { Spinner }
