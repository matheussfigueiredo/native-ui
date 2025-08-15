import { useInteractive } from '@/hooks/use-interactive'
import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { alpha, type VariantProps } from 'native-variants'
import { type ComponentProps, memo } from 'react'
import { type StyleProp, TextInput, type TextStyle, View } from 'react-native'

const inputVariants = styled((ctx, t) =>
  ctx({
    slots: ['root', 'field', 'input', 'icon', 'placeholder'],
    base: {
      root: {
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: t.radii.lg,
      },
      field: { flex: 1 },
      input: {
        flex: 1,
        borderTopEndRadius: t.radii.lg,
        borderBottomEndRadius: t.radii.lg,
        paddingHorizontal: t.spacing['4'],
        textAlignVertical: 'center',
      },
      placeholder: {
        color: t.colors.mutedForeground,
      },
    },
    variants: {
      focus: {
        true: {
          root: {
            borderColor: t.colors.ring,
            backgroundColor: t.colors.transparent,
          },
        },
        false: {
          root: {
            borderColor: t.colors.input,
            backgroundColor: alpha(t.colors.input, 30),
          },
        },
      },
      size: {
        default: {
          root: { height: 40 },
          field: { height: 40 },
        },
        lg: {
          root: { height: 46 },
          field: { height: 46 },
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
      focus: false,
      disabled: false,
    },
  })
)

function InputComponent({
  style,
  size,
  onChange,
  fieldStyle,
  disabled,
  children,
  ...props
}: Omit<ComponentProps<typeof TextInput>, 'editable'> &
  VariantProps<typeof inputVariants> & {
    onChange?: (input: string) => void
    fieldStyle?: StyleProp<TextStyle>
  }) {
  const { focus, onFocus, onBlur } = useInteractive()
  const { root, field, input, placeholder } = inputVariants({
    size,
    focus,
    disabled,
  })

  return (
    <View style={cn(root, style as any)}>
      <View style={field}>
        <TextInput
          style={cn(input, fieldStyle)}
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={onChange}
          editable={!disabled}
          placeholderTextColor={placeholder?.color}
          {...props}
        />
      </View>
      {children}
    </View>
  )
}

const Input = memo(InputComponent)

export { Input }
