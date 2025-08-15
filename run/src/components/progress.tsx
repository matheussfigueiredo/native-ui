import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { type VariantProps } from 'native-variants'
import { type ComponentProps } from 'react'
import { Text, View } from 'react-native'

type CommonProps = {
  min: number
  value: number
  max: number
}

const progressVariants = styled((ctx, t) =>
  ctx({
    slots: ['root', 'wrapper', 'bar', 'label'],
    base: {
      root: {
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        gap: t.spacing['1'],
        flexDirection: 'column',
      },
      wrapper: {
        borderRadius: t.radii.full,
        backgroundColor: t.colors.input,
      },
      bar: {
        height: '100%',
        borderRadius: t.radii.full,
        backgroundColor: t.colors.primary,
      },
      label: {
        textAlign: 'right',
        fontSize: t.fontSizes.xxs,
        color: t.colors.mutedForeground,
      },
    },
    variants: {
      size: {
        default: {
          wrapper: {
            height: 8,
          },
        },
        sm: {
          wrapper: {
            height: 6,
          },
        },
        lg: {
          wrapper: {
            height: 10,
          },
        },
      },
    },
    defaultVariants: {
      size: 'default',
    },
  })
)

function getProgressValue(config: CommonProps): number {
  const { max, min, value } = config

  const clampedValue = Math.min(Math.max(value, min), max)
  return max - min === 0 ? 0 : (clampedValue - min) / (max - min)
}

function Progress({
  min = 0,
  value = 0,
  max = 100,
  size,
  ...props
}: ComponentProps<typeof View> &
  CommonProps &
  VariantProps<typeof progressVariants>) {
  const styles = progressVariants({ size })
  const progress = getProgressValue({ min, value, max })

  return (
    <View style={styles.root} {...props}>
      <View style={styles.wrapper}>
        <View style={cn(styles.bar, { width: `${progress * 100}%` })} />
      </View>
      <Text style={styles.label}>{`${value} / ${max}`}</Text>
    </View>
  )
}

export { Progress }
