import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { VStack } from '@/components/ui/vstack'
import { useSignout, useUser } from '@/lib/queries/auth'
import { Redirect } from 'expo-router'
import React from 'react'
import { Text } from '@/components/ui/text'
import { StatusBar } from 'react-native'
import { Divider } from '@/components/ui/divider'
import { HStack } from '@/components/ui/hstack'

const AccountScreen = () => {
  const { data: user } = useUser()
  const signOut = useSignout()

  if (!user) return <Redirect href='/' />

  return (
    <VStack className='p-5'>
      <StatusBar barStyle='light-content' backgroundColor='#0d1321' />
      <Heading size='2xl' className='text-center text-primary-900'>
        {user?.user_metadata?.name || user?.email}
      </Heading>

      <VStack className='p-5 my-5 gap-1 bg-white rounded-xl'>
        <Text size='lg' bold className='text-primary-900'>Details</Text>
        <Divider />
        <HStack className='justify-between py-1'>
          <Text className='text-primary-950'>Email</Text>
          <Text className='text-primary-950' bold>{user?.email || 'Unavailable'}</Text>
        </HStack>
        <HStack className='justify-between py-1'>
          <Text className='text-primary-950'>Place</Text>
          <Text className='text-primary-950' bold>{user?.user_metadata?.place || 'Unavailable'}</Text>
        </HStack>
        <HStack className='justify-between py-1'>
          <Text className='text-primary-950'>Phone Number</Text>
          <Text className='text-primary-950' bold>{user?.user_metadata?.phone || 'Unavailable'}</Text>
        </HStack>
      </VStack>
      <Button action='negative' onPress={() => signOut.mutate()}>
        <ButtonText>Sign Out</ButtonText>
        {signOut.isPending && (<ButtonSpinner color='#ffffff' size={16} />)}
      </Button>
    </VStack>
  )
}

export default AccountScreen
