import AuthForm from '@/components/auth/auth-form'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { Button, ButtonText } from '@/components/ui/button'
import { HStack } from '@/components/ui/hstack'
import AuthMessage from '@/components/auth/auth-message'

const AuthScreen = () => {
  const [showMessage, setMessage] = useState(false)

  return (
    <VStack className='h-full'>
      <StatusBar barStyle='light-content' backgroundColor='#0d1321' />
      <VStack className='bg-[#0d1321] px-5 py-7 h-[40%] justify-end'>
        <Heading size='4xl' className='text-primary-50'>
          Welcome Back!
        </Heading>
        <Text size='lg' className='text-primary-200 max-w-[320px]'>
          Log in to your account using your email address and password.
        </Text>
      </VStack>
      <AuthForm />
      <VStack className='grow'>
        <Button variant='link' onPress={() => setMessage(true)}>
          <ButtonText>Forgot Password?</ButtonText>
        </Button>
      </VStack>
      <HStack className='justify-center items-center gap-1 pb-3'>
        <Text>Don't have an account?</Text>
        <Button variant='link' onPress={() => setMessage(true)}>
          <ButtonText>Register</ButtonText>
        </Button>
      </HStack>

      <AuthMessage open={showMessage} onClose={() => setMessage(false)} />
    </VStack>
  )
}

export default AuthScreen
