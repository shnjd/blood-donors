import { Database } from '@/lib/database.types'
import React from 'react'
import { VStack } from '../ui/vstack'
import { HStack } from '../ui/hstack'
import { CalendarArrowDown, LandPlot, MapPin } from 'lucide-react-native'
import { Text } from '@/components/ui/text'
import { useArea } from '@/lib/queries/area'
import { Pressable } from 'react-native'
import dayjs from 'dayjs'

type Props = {
  donor: Database['public']['Tables']['Donors']['Row'],
  select: () => void
}

const DonorCard = ({ donor, select }: Props) => {
  const { data: area } = useArea(donor.area_committee)

  return (
    <Pressable
      onPress={select}
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
        <HStack className='gap-1 items-center'>
          <Text
            size='sm'
            numberOfLines={1}
            className='text-primary-700'
          >
            Last donated on:
          </Text>
          <Text
            bold
            size='sm'
            numberOfLines={1}
            className='text-primary-700'
          >
            {dayjs(donor?.last_donated_on).isValid() ? dayjs(donor.last_donated_on).format('DD/MM/YYYY') : 'N/A'}
          </Text>
          <Text
            size='sm'
            numberOfLines={1}
            className='text-primary-700'
          >
            - count:
          </Text>
          <Text
            bold
            size='sm'
            numberOfLines={1}
            className='text-primary-700'
          >
            {donor?.donation_count ? donor.donation_count : 0}
          </Text>
        </HStack>

        {area && (
          <HStack className='gap-1.5 items-center'>
            <LandPlot size={14} color="#27447d" />
            <Text bold size='sm' className='text-primary-700'>{area[0].name}</Text>
          </HStack>
        )}
      </HStack>
    </Pressable>
  )
}

export default DonorCard
