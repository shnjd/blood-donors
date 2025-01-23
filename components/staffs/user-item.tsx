import { User } from '@supabase/supabase-js'
import React from 'react'
import { HStack } from '../ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonIcon, ButtonText } from '../ui/button'
import { UserRoundCog } from 'lucide-react-native'
import { VStack } from '../ui/vstack'
import { Pressable } from 'react-native'
import { useRouter } from 'expo-router'

type Props = {
  user: User
}

const UserItem = ({ user }: Props) => {
  const router = useRouter()

  return (
    <Pressable onPress={() => router.push(`/app/(tabs)/staffs/${user.id}`)}>
      <HStack className='px-3'>
        <HStack className='w-full items-center border-b border-b-gray-200 justify-between'>
          <VStack className='py-3'>
            <Text size='lg' className='font-medium text-primary-900'>{user?.user_metadata?.name || user.email}</Text>
            {user?.user_metadata?.name && <Text size='sm' className='font-medium text-primary-700'>{user?.email}</Text>}
          </VStack>
          <Button variant='link' size='sm'>
            <ButtonText>Manage</ButtonText>
            <ButtonIcon as={UserRoundCog} />
          </Button>
        </HStack>
      </HStack>
    </Pressable>
  )
}

export default UserItem
