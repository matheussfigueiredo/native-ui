import { cn } from '@/lib/cn'
import { styled } from '@/lib/nva'
import { type ComponentProps, createContext, useContext, useId } from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from 'react-hook-form'
import { Text, View } from 'react-native'

const formVariants = styled((ctx, t) =>
  ctx({
    slots: [
      'root',
      'item',
      'field',
      'label',
      'description',
      'control',
      'message',
    ],
    base: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        gap: t.spacing['1.5'],
        justifyContent: 'center',
      },
      item: {
        display: 'flex',
        flexDirection: 'column',
        gap: t.spacing['0.5'],
        width: '100%',
      },
      field: {
        width: '100%',
      },
      label: {
        fontSize: t.fontSizes.xs,
        fontWeight: '500',
        color: t.colors.mutedForeground,
      },
      description: {
        fontSize: t.fontSizes.xs,
        color: t.colors.mutedForeground,
        fontWeight: '400',
      },
      control: {
        width: '100%',
        height: 'auto',
      },
      message: {
        fontSize: t.fontSizes.xs,
        color: t.colors.destructive,
        fontWeight: '400',
      },
    },
  })
)

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const Form = FormProvider

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function FormItem({ style, ...props }: ComponentProps<typeof View>) {
  const id = useId()
  const styles = formVariants()

  return (
    <FormItemContext.Provider value={{ id }}>
      <View style={cn(styles.item, style)} {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ style, ...props }: ComponentProps<typeof Text>) {
  const styles = formVariants()

  return <Text style={cn(styles.label, style)} {...props} />
}

function FormDescription({ style, ...props }: ComponentProps<typeof Text>) {
  const { formDescriptionId } = useFormField()
  const styles = formVariants()

  return (
    <Text
      id={formDescriptionId}
      style={cn(styles.description, style)}
      {...props}
    />
  )
}

function FormMessage({ style, ...props }: ComponentProps<typeof Text>) {
  const styles = formVariants()
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children

  if (!body) {
    return null
  }

  return (
    <Text id={formMessageId} style={cn(styles.message, style)} {...props}>
      {body}
    </Text>
  )
}

function FormControl({ style, ...props }: ComponentProps<typeof View>) {
  const { formItemId } = useFormField()

  const styles = formVariants()

  return <View id={formItemId} style={cn(styles.control, style)} {...props} />
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
}
