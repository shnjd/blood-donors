import 'react-native-url-polyfill/auto'
import { Redirect, useRouter } from 'expo-router'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import { useUser } from '@/lib/queries/auth'
import { Spinner } from '@/components/ui/spinner';

export default function App() {
  const router = useRouter()
  const { data: user, isFetching } = useUser()

  return (
    <VStack className='gap-3 p-5 justify-center items-center h-full'>
      <Text size='2xl' bold>SFI</Text>
      <Heading size='5xl'>Blood Donors</Heading>
      <Button onPress={() => router.push('/auth')} className='mt-3'>
        <ButtonText>
          Sign In
        </ButtonText>
      </Button>

      {isFetching && <Spinner size='small' className='mt-3' />}
      {(!isFetching && user) && <Redirect href='/app/(tabs)' />}
    </VStack>
  )
}
