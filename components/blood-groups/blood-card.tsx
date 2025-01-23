import React, { useMemo } from 'react'
import { Heading } from '@/components/ui/heading'
import { BloodGroup } from '@/lib/constants/enums'
import { Pressable } from '@/components/ui/pressable'
import { Href, useRouter } from 'expo-router'

type Props = {
  bg: BloodGroup | string,
  areaId?: number
}

const BloodGroupCard = ({ bg, areaId }: Props) => {
  const router = useRouter()

  const queries = useMemo(() => {
    // @ts-ignore
    const bloodGroupKey = Object.keys(BloodGroup)[Object.values(BloodGroup).indexOf(bg)];
    const qs: string[] = []
    if (bloodGroupKey) qs.push(`bg=${bloodGroupKey}`)
    if (areaId) qs.push(`area=${areaId}`)
    return qs.length > 0 ? `?${qs.join('&')}` : ''
  }, [bg, areaId])

  return (
    <Pressable
      onPress={() => router.push(`/app/donors${queries}` as Href)}
      className='w-[29%] h-28 justify-center items-center rounded-xl bg-gray-50 opacity-85'>
      <Heading size='3xl' className='text-red-700'>{bg === BloodGroup.OTHER ? 'RARE' : bg}</Heading>
    </Pressable>
  )
}

export default BloodGroupCard
