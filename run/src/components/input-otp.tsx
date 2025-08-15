import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { createCTX } from 'native-variants'
import {
  type ComponentProps,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'

type CommonProps = {
  value: string
  setValue: (next: string) => void
  maxLength: number
  secure?: boolean
  disabled?: boolean
  focusHidden: () => void
}

const { CTXProvider, useCTX } = createCTX<CommonProps>()

const otpVariants = styled((ctx, t) =>
  ctx({
    slots: [
      'root',
      'hiddenInput',
      'group',
      'separator',
      'slot',
      'slotText',
      'cursor',
    ],
    base: {
      root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.spacing['2'],
      },
      hiddenInput: {
        position: 'absolute',
        opacity: 0,
        width: 1,
        height: 1,
      },
      group: {
        display: 'flex',
        gap: t.spacing['2'],
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      separator: {
        marginHorizontal: t.spacing['1'],
        color: t.colors.border,
      },
      slot: {
        width: 36,
        height: 36,
        borderWidth: 1,
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: t.radii.sm,
        borderColor: t.colors.border,
      },
      slotText: {
        fontSize: t.fontSizes.sm,
      },
      cursor: {
        width: 0.8,
        height: '60%',
        backgroundColor: t.colors.primary,
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
      focused: {
        true: {
          slot: {
            borderColor: t.colors.primary,
          },
        },
        false: {},
      },
      filled: {
        true: {
          slot: {
            borderColor: t.colors.muted,
            backgroundColor: t.colors.muted,
          },
          slotText: {
            color: t.colors.foreground,
            fontWeight: '600',
          },
        },
        false: {},
      },
    },
    defaultVariants: {
      disabled: false,
      focused: false,
      filled: false,
    },
  })
)

function InputOTP({
  value,
  onChange,
  maxLength,
  secure = false,
  autoFocus,
  disabled = false,
  style,
  children,
  ...props
}: PropsWithChildren &
  ComponentProps<typeof Pressable> &
  VariantProps<typeof otpVariants> & {
    value: string
    maxLength: number
    secure?: boolean
    autoFocus?: boolean
    onChange: (input: string) => void
  }) {
  const styles = otpVariants({ disabled })
  const inputRef = useRef<TextInput>(null)

  const normalize = useCallback(
    (text: string) => text.replace(/\D+/g, '').slice(0, maxLength),
    [maxLength]
  )

  const setValue = useCallback(
    (text: string) => onChange(normalize(text)),
    [onChange, normalize]
  )

  const handleChangeText = (text: string) => {
    setValue(text)
  }

  const handleKeyPress = (e: any) => {
    if (e?.nativeEvent?.key === 'Backspace' && value.length > 0) {
      setValue(value.slice(0, -1))
    }
  }

  const focusHidden = () => {
    if (!disabled) inputRef.current?.focus()
  }

  useEffect(() => {
    if (autoFocus) focusHidden()
  }, [autoFocus])

  return (
    <CTXProvider
      props={{
        value,
        secure,
        disabled,
        setValue,
        maxLength,
        focusHidden,
      }}
    >
      <Pressable
        onPress={focusHidden}
        disabled={disabled}
        style={cn(styles.root, style)}
        accessibilityRole="keyboardkey"
        {...props}
      >
        <TextInput
          caretHidden
          value={value}
          ref={inputRef}
          autoCorrect={false}
          editable={!disabled}
          maxLength={maxLength}
          contextMenuHidden={false}
          keyboardType="number-pad"
          importantForAutofill="yes"
          style={styles.hiddenInput}
          onKeyPress={handleKeyPress}
          textContentType="oneTimeCode"
          onChangeText={handleChangeText}
        />
        {children}
      </Pressable>
    </CTXProvider>
  )
}

function InputOTPGroup({
  children,
  style,
  ...props
}: ComponentProps<typeof View>) {
  const styles = otpVariants()
  return (
    <View style={cn(styles.group, style)} {...props}>
      {children}
    </View>
  )
}

function InputOTPSeparator({
  children = <Text>|</Text>,
  style,
  ...props
}: ComponentProps<typeof Text>) {
  const styles = otpVariants()
  return (
    <Text style={cn(styles.separator, style)} {...props}>
      {children}
    </Text>
  )
}

function InputOTPSlot({
  index,
  style,
  textStyle,
  ...props
}: ComponentProps<typeof View> & {
  textStyle?: ComponentProps<typeof Text>['style']
  index: number
}) {
  const ctx = useCTX()
  const ch = ctx?.value[index] ?? ''
  const filled = ch !== ''
  const isLast = index === ctx?.maxLength! - 1
  const isCurrent =
    ctx?.value.length === index ||
    (isLast && ctx?.value.length === ctx?.maxLength)
  const focused = isCurrent

  const styles = otpVariants({
    focused,
    filled,
    disabled: !!ctx?.disabled,
  })

  const handlePress = () => {
    if (!ctx?.disabled) ctx?.focusHidden()
  }

  return (
    <Pressable onPress={handlePress} disabled={ctx?.disabled}>
      <View style={cn(styles.slot, style as any)} {...props}>
        {filled ? (
          <Text style={cn(styles.slotText, textStyle)}>
            {ctx?.secure ? '•' : ch}
          </Text>
        ) : focused ? (
          <View style={styles.cursor} />
        ) : (
          <Text style={cn(styles.slotText, textStyle)}> </Text>
        )}
      </View>
    </Pressable>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
