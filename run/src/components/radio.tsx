import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { type ComponentProps, memo } from 'react'
import { TouchableOpacity, View } from 'react-native'

const radioVariants = styled((ctx, t) =>
  ctx({
    slots: ['root', 'indicator'],
    base: {
      root: {
        width: 22,
        height: 22,
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: t.radii.full,
      },
      indicator: {
        padding: 1,
        minWidth: 12,
        minHeight: 12,
        overflow: 'hidden',
        borderRadius: t.radii.full,
      },
    },
    variants: {
      active: {
        true: {
          root: {
            borderColor: t.colors.primary,
          },
          indicator: {
            backgroundColor: t.colors.primary,
          },
        },
        false: {
          root: {
            borderColor: t.colors.input,
          },
          indicator: {
            backgroundColor: t.colors.transparent,
          },
        },
      },
    },
    defaultVariants: {
      active: false,
    },
  })
)

function RadioComponent({
  style,
  value: active,
  ...props
}: ComponentProps<typeof TouchableOpacity> & {
  value?: boolean
}) {
  const styles = radioVariants({ active })

  return (
    <TouchableOpacity style={cn(styles.root, style)} {...props}>
      <View style={styles.indicator} />
    </TouchableOpacity>
  )
}

const Radio = memo(RadioComponent)

export { Radio }
