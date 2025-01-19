import { User } from '@supabase/supabase-js'
import React from 'react'
import { HStack } from '../ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonIcon, ButtonText } from '../ui/button'
import { UserRoundCog } from 'lucide-react-native'

type Props = {
  user: User
}

const UserItem = ({ user }: Props) => {
  return (
    <HStack className='px-3'>
      <HStack className='w-full py-1 items-center border-b border-b-gray-200 justify-between'>
        <Text className='font-medium text-primary-900'>{user.email}</Text>

        <Button variant='link' size='sm'>
          <ButtonText>Manage</ButtonText>
          <ButtonIcon as={UserRoundCog} />
        </Button>
      </HStack>
    </HStack>
  )
}

export default UserItem
