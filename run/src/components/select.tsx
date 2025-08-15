import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import {
  alpha,
  composeText,
  createCTX,
  type VariantProps,
} from 'native-variants'
import { type ComponentProps, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from './icon'
import { TypographyProvider } from './typography'

type CommonProps = {
  value?: string
  onChange?: (input: string) => void
}

const { CTXProvider, useCTX } = createCTX<
  VariantProps<typeof selectVariants> & CommonProps
>()

const selectVariants = styled((ctx, t) =>
  ctx({
    slots: [
      'root',
      'wrapper',
      'content',
      'trigger',
      'indicator',
      'item',
      'group',
      'label',
    ],
    base: {
      root: {
        maxHeight: 250,
      },
      wrapper: {
        display: 'flex',
        gap: t.spacing['2'],
        flexDirection: 'column',
      },
      trigger: {
        height: 40,
        display: 'flex',
        fontWeight: '400',
        overflow: 'hidden',
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: t.radii.lg,

        textAlignVertical: 'center',
        justifyContent: 'space-between',
      },
      content: {
        display: 'flex',
        gap: t.spacing['2'],
        flexDirection: 'column',
      },
      item: {
        flex: 1,
        height: '100%',
        display: 'flex',
        gap: t.spacing['2'],
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: t.fontSizes.sm,
        paddingHorizontal: t.spacing['3.5'],
      },
      indicator: {
        marginLeft: 'auto',
      },
      group: {
        display: 'flex',
        gap: t.spacing['3.5'],
        flexDirection: 'column',
      },
      label: {
        position: 'static',
        fontSize: t.fontSizes.sm,
        color: t.colors.primary,
        fontWeight: '500',
      },
    },
    variants: {
      active: {
        true: {
          item: {
            color: t.colors.primary,
            backgroundColor: alpha(t.colors.primary, 5),
          },
          indicator: {
            color: t.colors.primary,
          },
        },
        false: {
          item: {
            color: t.colors.mutedForeground,
            backgroundColor: t.colors.background,
          },
        },
      },
    },
  })
)

function Select({
  style,
  value,
  onChange,
  defaultValue,
  ...props
}: ComponentProps<typeof View> &
  CommonProps & {
    defaultValue?: string
  }) {
  const styles = selectVariants()

  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue
  )

  const selectedValue = value ?? internalValue

  function handleChange(newValue: string) {
    setInternalValue(newValue)
    if (onChange) onChange(newValue)
  }

  return (
    <CTXProvider props={{ value: selectedValue, onChange: handleChange }}>
      <ScrollView
        style={cn(styles.root, style)}
        contentContainerStyle={styles.wrapper}
        {...props}
      />
    </CTXProvider>
  )
}

function SelectItem({
  value,
  style,
  children,
  ...props
}: ComponentProps<typeof TouchableOpacity> & Pick<CommonProps, 'value'>) {
  const ctx = useCTX()
  const active = ctx?.value === value

  const styles = selectVariants({ active })

  return (
    <TypographyProvider props={composeText(styles.item)}>
      <TouchableOpacity
        onPress={() => ctx?.onChange && ctx?.onChange(value!)}
        style={cn(styles.trigger, style)}
        {...props}
      >
        <View style={styles.item}>
          {children}
          {active && <Icon style={styles.indicator} name="check" />}
        </View>
      </TouchableOpacity>
    </TypographyProvider>
  )
}

function SelectGroup({ style, ...props }: ComponentProps<typeof View>) {
  const styles = selectVariants()

  return <View style={cn(styles.group, style)} {...props} />
}

function SelectContent({ style, ...props }: ComponentProps<typeof View>) {
  const styles = selectVariants()

  return <View style={cn(styles.content, style)} {...props} />
}

function SelectLabel({ style, ...props }: ComponentProps<typeof Text>) {
  const styles = selectVariants()

  return <Text style={cn(styles.label, style)} {...props} />
}

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel }
