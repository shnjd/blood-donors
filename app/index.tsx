import 'react-native-url-polyfill/auto'
import { Link, useRouter } from 'expo-router'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'

export default function App() {
  const router = useRouter()

  return (
    <VStack className='gap-3 p-5 justify-center items-center h-full'>
      <Text size='2xl' bold>SFI</Text>
      <Heading size='5xl'>Blood Donors</Heading>
      <Button onPress={() => router.push('/auth')} className='mt-5'>
        <ButtonText>
          Sign In
        </ButtonText>
      </Button>
    </VStack>
  )
}
