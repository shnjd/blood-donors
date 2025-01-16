import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { VStack } from './ui/vstack'
import { Input, InputField } from './ui/input'
import { Button, ButtonText } from './ui/button'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) console.log(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) console.log(error.message)
    if (!session) console.log('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <VStack className='gap-4 justify-center p-5 h-full'>
      <VStack>
        <Input>
          <InputField
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </Input>
      </VStack>
      <VStack>
        <Input>
          <InputField
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </Input>
      </VStack>
      <VStack>
        <Button variant='solid' disabled={loading} onPress={() => signInWithEmail()}>
          <ButtonText>Sign In</ButtonText>
        </Button>
      </VStack>
    </VStack>
  )
}

