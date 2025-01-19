import { Database } from '@/lib/database.types'
import React from 'react'
import { Heading } from '@/components/ui/heading'
import { useRouter } from 'expo-router'
import { Pressable } from '@/components/ui/pressable'

type Props = {
  area: Database['public']['Tables']['AreaCommittee']['Row']
}

const AreaCard = ({ area }: Props) => {
  const router = useRouter()

  return (
    <Pressable
      onPress={() => router.push(`/app/blood-groups?area=${area.id}`)}
      className='w-[45%] h-36 justify-center items-center rounded-2xl bg-primary-100'
    >
      <Heading size='xl' className='text-primary-900'>{area.name}</Heading>
    </Pressable>
  )
}

export default AreaCard
