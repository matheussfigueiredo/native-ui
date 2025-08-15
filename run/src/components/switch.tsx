import { styled, theme } from '@/lib/nva'
import { Styles, VariantProps } from 'native-variants'
import { type ComponentProps, memo, useEffect, useState } from 'react'
import { Pressable, type StyleProp, View, type ViewStyle } from 'react-native'
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const TRACK_OFF = theme.colors.input
const TRACK_ON = theme.colors.primary

const switchVariants = styled((ctx, t) =>
  ctx({
    slots: ['root', 'thumb'],
    base: {
      root: {
        width: 44,
        height: 26,
        paddingHorizontal: t.spacing['1'] - 1,
        borderRadius: t.radii.xl,
        justifyContent: 'center',
      },
      thumb: {
        width: 20,
        height: 20,
        borderRadius: t.radii.full,
        backgroundColor: t.colors.white,
      },
    },
    variants: {
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
      disabled: 'false',
    },
  })
)

function calcTravel(root?: Styles, thumb?: Styles) {
  const pad = (root?.paddingHorizontal as number | undefined) ?? 4
  const rootW = (root?.width as number) ?? 52
  const thumbW = (thumb?.width as number) ?? 24
  return Math.max(rootW - thumbW - pad * 2, 0)
}

function useTrackAnimatedStyle(progress: SharedValue<number>) {
  return useAnimatedStyle(() => {
    const bg = interpolateColor(progress.value, [0, 1], [TRACK_OFF, TRACK_ON])
    return { backgroundColor: bg }
  })
}

function useThumbAnimatedStyle(progress: SharedValue<number>, travel: number) {
  return useAnimatedStyle(() => {
    return { transform: [{ translateX: progress.value * travel }] }
  })
}

function SwitchComponent({
  style,
  value,
  defaultValue,
  onChange,
  disabled = false,
  duration = 180,
  hitSlop = 2,
  ...props
}: Omit<ComponentProps<typeof View>, 'onLayout'> &
  VariantProps<typeof switchVariants> & {
    value?: boolean
    onChange?: (next: boolean) => void
    defaultValue?: boolean
    duration?: number
    style?: StyleProp<ViewStyle>
    hitSlop?:
      | number
      | { top?: number; right?: number; bottom?: number; left?: number }
  }) {
  const styles = switchVariants({ disabled })

  const [internalValue, setInternalValue] = useState<boolean>(
    value ?? defaultValue ?? false
  )

  useEffect(() => {
    if (value !== undefined) setInternalValue(value)
  }, [value])
  const checked = internalValue

  const travel = calcTravel(styles.root, styles.thumb)

  const progress = useSharedValue(checked ? 1 : 0)
  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, { duration })
  }, [checked, duration])

  const trackAnimatedStyle = useTrackAnimatedStyle(progress)
  const thumbAnimatedStyle = useThumbAnimatedStyle(progress, travel)

  const handleInternalChange = () => {
    if (disabled) return
    const next = !checked
    onChange ? onChange(next) : setInternalValue(next)
  }

  return (
    <Pressable
      onPress={handleInternalChange}
      hitSlop={hitSlop as any}
      accessibilityRole="switch"
      accessibilityState={{ disabled: !!disabled, checked }}
      style={style as any}
      {...props}
    >
      <Animated.View style={[styles.root, trackAnimatedStyle]}>
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  )
}

const Switch = memo(SwitchComponent)

export { Switch }
