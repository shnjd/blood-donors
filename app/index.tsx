import 'react-native-url-polyfill/auto'
import { Redirect, useRouter } from 'expo-router'
import { VStack } from '@/components/ui/vstack'
import { useUser } from '@/lib/queries/auth'
import { Spinner } from '@/components/ui/spinner';
import { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { Button, ButtonText } from '@/components/ui/button'
import { Image } from 'expo-image'

export default function App() {
  const router = useRouter()
  const { data: user, isFetching } = useUser()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isFetching && !user)
        router.push('/auth')
      else if (!isFetching && user) router.push('/app/(tabs)')
      setLoaded(true)
    }, 2500)

    return () => clearTimeout(timeoutId)
  }, [])

  if (loaded && !isFetching && !user) return <Redirect href='/auth' />

  if (loaded && !isFetching && user) return <Redirect href='/app/(tabs)' />

  return (
    <VStack className='gap-3 justify-center items-center h-full relative'>
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <Image
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
        source={require('@/assets/images/cover-screen.jpeg')}
      />
      {isFetching && <Spinner size='small' color="#ffffff" className='absolute bottom-4' />}
      {/* {(!isFetching && user) && <Redirect href='/app/(tabs)' />} */}
      {(!isFetching && !user) && (
        <Button size='sm' className='absolute bg-[#2f58b2] px-8 bottom-1' onPress={() => router.push('/auth')}>
          <ButtonText>Login
          </ButtonText>
        </Button>
      )}
    </VStack>
  )
}
