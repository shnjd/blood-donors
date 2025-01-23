import { VStack } from '@/components/ui/vstack'
import { useUsers } from '@/lib/queries/users'
import { useLocalSearchParams } from 'expo-router'
import { Heading } from '@/components/ui/heading'
import React, { useMemo, useState } from 'react'
import { Divider } from '@/components/ui/divider'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { Button, ButtonText } from '@/components/ui/button'
import StaffFormWrapper from '@/components/staffs/form-wrapper'
import { number } from 'zod'
import RemoveStaff from '@/components/staffs/remove-staff'
import StaffPasswordFormWrapper from '@/components/staffs/pasword-wrapper'

type Props = {}

const StaffScreen = (props: Props) => {
  const { userId } = useLocalSearchParams()
  const { data: users } = useUsers()
  const [modify, setModify] = useState(false)
  const [password, setPassword] = useState(false)

  const staff = useMemo(() => {
    if (userId && users?.users && users.users.length > 0)
      return users.users.find(u => u.id === userId)

    return null
  }, [users, userId])

  return (
    <VStack className='p-5'>
      <Heading size='2xl' className='text-center text-primary-900'>
        {staff?.user_metadata?.name || staff?.email}
      </Heading>

      <VStack className='p-5 my-3 gap-1 bg-white rounded-xl'>
        <Text size='lg' bold className='text-primary-900'>Details</Text>
        <Divider />
        <HStack className='justify-between py-1'>
          <Text className='text-primary-950'>Email</Text>
          <Text className='text-primary-950' bold>{staff?.email || 'Unavailable'}</Text>
        </HStack>
        <HStack className='justify-between py-1'>
          <Text className='text-primary-950'>Role</Text>
          <Text className='text-primary-950' bold>{staff?.user_metadata?.role || 'Unavailable'}</Text>
        </HStack>
        <HStack className='justify-between py-1'>
          <Text className='text-primary-950'>Place</Text>
          <Text className='text-primary-950' bold>{staff?.user_metadata?.place || 'Unavailable'}</Text>
        </HStack>
        <HStack className='justify-between py-1'>
          <Text className='text-primary-950'>Phone Number</Text>
          <Text className='text-primary-950' bold>{staff?.user_metadata?.phone || 'Unavailable'}</Text>
        </HStack>
      </VStack>

      <VStack className='p-5 my-3 gap-1 bg-white rounded-xl'>
        <Text size='lg' bold className='text-primary-900'>Actions</Text>
        <Divider />
        <Button className='my-2' onPress={() => setModify(true)}>
          <ButtonText>
            Modify Details
          </ButtonText>
        </Button>
        <Button className='my-2' action='negative' onPress={() => setPassword(true)}>
          <ButtonText>
            Change Password
          </ButtonText>
        </Button>
        <RemoveStaff staffId={staff?.id} />
      </VStack>

      {(staff && modify) && <StaffFormWrapper staff={staff} onClose={() => setModify(false)} />}
      {(staff && password) && <StaffPasswordFormWrapper staff={staff} onClose={() => setModify(false)} />}

    </VStack>
  )
}

export default StaffScreen 
