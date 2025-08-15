import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import type { VariantProps } from 'native-variants'
import { type ComponentProps, memo } from 'react'
import { View } from 'react-native'

const flexVariants = styled((ctx, _) =>
  ctx({
    slots: ['root'],
    base: {
      root: {
        display: 'flex',
      },
    },
    variants: {
      vertical: {
        true: { root: { flexDirection: 'column' } },
        false: { root: { flexDirection: 'row' } },
      },
      align: {
        end: { root: { alignItems: 'flex-end' } },
        center: { root: { alignItems: 'center' } },
        stretch: { root: { alignItems: 'stretch' } },
        start: { root: { alignItems: 'flex-start' } },
        baseline: { root: { alignItems: 'baseline' } },
      },
      justify: {
        end: { root: { justifyContent: 'flex-end' } },
        center: { root: { justifyContent: 'center' } },
        start: { root: { justifyContent: 'flex-start' } },
        between: { root: { justifyContent: 'space-between' } },
        evenly: { root: { justifyContent: 'space-evenly' } },
        around: { root: { justifyContent: 'space-around' } },
      },
    },
    defaultVariants: {
      vertical: false,
      align: 'start',
      justify: 'start',
    },
  })
)

function FlexComponent({
  style,
  align,
  justify,
  vertical,
  noWrap = false,
  ...props
}: {
  noWrap?: boolean
} & ComponentProps<typeof View> &
  VariantProps<typeof flexVariants>) {
  const styles = flexVariants({ align, justify, vertical })

  return (
    <View
      style={cn(
        styles.root,
        style,
        noWrap && {
          flexWrap: 'nowrap',
        }
      )}
      {...props}
    />
  )
}

const Flex = memo(FlexComponent)

export { Flex }
