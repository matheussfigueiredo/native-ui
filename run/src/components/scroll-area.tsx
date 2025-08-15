import { type ComponentProps } from 'react'
import { ScrollView } from 'react-native'

function ScrollArea({ ...props }: ComponentProps<typeof ScrollView>) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  )
}

export { ScrollArea }
