import { Button } from '@/components/button'
import { Flex } from '@/components/flex'
import { Typography } from '@/components/typography'
import { theme } from '@/lib/nva'
import { View } from 'react-native'

export default function Index() {
  return (
    <View style={{ flex: 1, gap: 10 }}>
      <Flex
        align="center"
        style={{
          height: 150,
          paddingHorizontal: 24,
          borderEndEndRadius: theme.radii.xl,
          borderEndStartRadius: theme.radii.xl,
          backgroundColor: theme.colors.primaryForeground,
        }}
      >
        <Typography as="3xl">Native UI - Run</Typography>
      </Flex>

      <Button>
        <Typography>Click Me!</Typography>
      </Button>
    </View>
  )
}
