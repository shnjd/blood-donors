import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { VStack } from '@/components/ui/vstack'
import { useSignout, useUser } from '@/lib/queries/auth'
import { Redirect } from 'expo-router'
import React from 'react'
import { Text } from '@/components/ui/text'

const AccountScreen = () => {
  const { data: user } = useUser()
  const signOut = useSignout()

  if (!user) return <Redirect href='/' />

  return (
    <VStack className='p-5'>
      <Heading size='xl'>{user?.user_metadata?.name || user.email}</Heading>
      <Text>{user.email}</Text>
      <Button action='negative' onPress={() => signOut.mutate()}>
        <ButtonText>Sign Out</ButtonText>
        {signOut.isPending && (<ButtonSpinner color='#ffffff' size={16} />)}
      </Button>
    </VStack>
  )
}

export default AccountScreen
