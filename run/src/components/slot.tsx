import { composeRefs } from 'native-variants'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
} from 'react'

export interface SlotProps {
  children: ReactElement<any>
  [key: string]: any
}

const Slot = forwardRef<unknown, SlotProps>(function Slot(props, ref) {
  const { children, ...restProps } = props

  if (!isValidElement(children)) {
    console.warn('Slot requires a single valid React element as its child.')
    return null
  }

  const childProps = children.props as Record<string, any>
  const childRef = (children as any).ref

  return cloneElement(children, {
    ...restProps,
    ref: composeRefs(childRef, ref),
    style: [childProps.style, restProps.style].filter(Boolean),
    className: [childProps.className, restProps.className]
      .filter(Boolean)
      .join(' '),
  } as any)
})

export { Slot }
