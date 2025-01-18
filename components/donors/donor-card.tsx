import { Database } from '@/lib/database.types'
import React from 'react'
import { VStack } from '../ui/vstack'
import { HStack } from '../ui/hstack'
import { CalendarArrowDown, LandPlot, MapPin } from 'lucide-react-native'
import { Text } from '@/components/ui/text'
import { useArea } from '@/lib/queries/area'

type Props = {
  donor: Database['public']['Tables']['Donors']['Row']
}

const DonorCard = ({ donor }: Props) => {
  const { data: area } = useArea(donor.area_committee)

  return (
    <VStack
      className='p-4 bg-primary-100 rounded-xl gap-1.5 mx-3'
    >
      <HStack className='justify-between items-center'>
        <Text
          size='2xl'
          bold
          numberOfLines={1}
          className='font-semibold grow text-primary-900 max-w-[90%]'
        >
          {donor.name}
        </Text>
        <Text
          bold
          size='xl'
          className='uppercase text-center font-semibold text-red-700'
        >
          {donor.blood_group}
        </Text>
      </HStack>

      <HStack className='justify-between items-center'>
        <HStack className='gap-1.5 items-center'>
          <MapPin size={14} color="#27447d" />
          <Text
            bold
            size='sm'
            numberOfLines={1}
            className='text-primary-700 max-w-[70%] grow'
          >
            {donor.place}
          </Text>
        </HStack>

        {area && (
          <HStack className='gap-1.5 items-center'>
            <LandPlot size={14} color="#27447d" />
            <Text bold size='sm' className='text-primary-700'>{area[0].name}</Text>
          </HStack>
        )}
      </HStack>
    </VStack>
  )
}

export default DonorCard
