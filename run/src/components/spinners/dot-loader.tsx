import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { type VariantProps } from 'native-variants'
import { ComponentProps, memo, useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

const dotsVariants = styled((ctx, t) =>
  ctx({
    slots: ['root', 'dot'],
    base: {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing['1.5'],
      },
      dot: {
        borderRadius: t.radii.full,
        backgroundColor: t.colors.primary,
      },
    },
    variants: {
      size: {
        sm: { dot: { width: 6, height: 6 } },
        default: { dot: { width: 8, height: 8 } },
        lg: { dot: { width: 12, height: 12 } },
      },
      color: {
        primary: { dot: { backgroundColor: t.colors.primary } },
        secondary: { dot: { backgroundColor: t.colors.secondary } },
        white: { dot: { backgroundColor: '#fff' } },
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
    },
  })
)

function DotsSpinnerComponent({
  style,
  size,
  color,
  duration = 1000,
  ...props
}: ComponentProps<typeof View> & {
  duration?: number
} & VariantProps<typeof dotsVariants>) {
  const styles = dotsVariants({ size, color })

  const scales = [useSharedValue(1), useSharedValue(1), useSharedValue(1)]

  useEffect(() => {
    scales.forEach((scale, index) => {
      scale.value = withDelay(
        index * (duration / 3),
        withRepeat(
          withSequence(
            withTiming(1.4, { duration: duration / 2, easing: Easing.ease }),
            withTiming(1, { duration: duration / 2, easing: Easing.ease })
          ),
          -1,
          false
        )
      )
    })
  }, [duration])

  const dotStyles = scales.map((scale) =>
    useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }))
  )

  return (
    <View style={cn(styles.root, style)} {...props}>
      <Animated.View style={[styles.dot, dotStyles[0]]} />
      <Animated.View style={[styles.dot, dotStyles[1]]} />
      <Animated.View style={[styles.dot, dotStyles[2]]} />
    </View>
  )
}

const DotsSpinner = memo(DotsSpinnerComponent)

export { DotsSpinner }
