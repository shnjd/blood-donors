import AuthForm from '@/components/auth/auth-form'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import AuthMessage from '@/components/auth/auth-message'
import { Image } from 'expo-image'

const AuthScreen = () => {
  const [showMessage, setMessage] = useState(false)

  return (
    <VStack className='h-full relative justify-end'>
      <StatusBar barStyle='dark-content' backgroundColor='#F4DB03' />
      {/* <VStack className='bg-[#0d1321] px-5 py-7 h-[40%] justify-end'> */}
      {/*   <Heading size='4xl' className='text-primary-50'> */}
      {/*     Welcome Back! */}
      {/*   </Heading> */}
      {/*   <Text size='lg' className='text-primary-200 max-w-[320px]'> */}
      {/*     Sign in to your account using your email address and password. */}
      {/*   </Text> */}
      {/* </VStack> */}
      <Image
        style={{
          position: 'absolute',
          height: '101%',
          width: '100%',
          top: -5,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        contentFit='cover'
        contentPosition='center'
        source={require('@/assets/images/auth-cover.jpeg')}
      />
      <VStack className='h-[50%]'>
        <AuthForm />
        <VStack className='grow'>
          <Button variant='link' onPress={() => setMessage(true)}>
            <ButtonText>Forgot Password?</ButtonText>
          </Button>
        </VStack>
        <VStack>
          <HStack className='justify-center items-center gap-1 pb-3'>
            <Text>Don't have an account?</Text>
            <Button variant='link' onPress={() => setMessage(true)}>
              <ButtonText>Register</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>

      <AuthMessage open={showMessage} onClose={() => setMessage(false)} />
    </VStack>
  )
}

export default AuthScreen
