import React, { useEffect, useState } from 'react'
import { HStack } from '../ui/hstack'
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '../ui/select'
import { useAreas } from '@/lib/queries/area'
import { ChevronDownIcon } from 'lucide-react-native'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import { BloodGroup } from '@/lib/constants/enums'

type Props = {
}

const DonorFilters = (props: Props) => {
  const { data: areas } = useAreas()
  const { bg: bloodGroupKey, area: areaId } = useLocalSearchParams()
  const router = useRouter()

  const selectedArea = areaId && !isNaN(Number(areaId)) && areas ? areas.find(a => a.id === Number(areaId))?.name || null : null
  // @ts-ignore
  const selectedBlood = bloodGroupKey && typeof bloodGroupKey === 'string' ? BloodGroup[bloodGroupKey] || null : null

  const handleAreaChange = (area: string) => {
    // @ts-ignore
    const bloodGroupKey = Object.keys(BloodGroup)[Object.values(BloodGroup).indexOf(selectedBlood)] || null;
    const foundAreaId = areas ? areas.find(a => a.name === area)?.id : null
    const qs: string[] = []
    if (bloodGroupKey) qs.push(`bg=${bloodGroupKey}`)
    if (foundAreaId) qs.push(`area=${foundAreaId}`)
    router.push(`/app/donors${qs.length > 0 ? `?${qs.join('&')}` : ''}` as Href)
  }

  const handleBloodChange = (blood: string) => {
    // @ts-ignore
    const bloodGroupKey = Object.keys(BloodGroup)[Object.values(BloodGroup).indexOf(blood)] || null;
    const foundAreaId = areas ? areas.find(a => a.name === selectedArea)?.id : null
    const qs: string[] = []
    if (bloodGroupKey) qs.push(`bg=${bloodGroupKey}`)
    if (foundAreaId) qs.push(`area=${foundAreaId}`)
    router.push(`/app/donors${qs.length > 0 ? `?${qs.join('&')}` : ''}` as Href)
  }

  return (
    <HStack className='p-3 justify-between bg-gray-50'>
      {areas && (
        <Select className='w-[48%]' selectedValue={selectedArea} onValueChange={handleAreaChange} >
          <SelectTrigger variant="rounded" size='xl' className='items-center'>
            <SelectInput className='grow' placeholder='Area Committee' />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {[{ name: 'All' }, ...areas].map(area => (
                <SelectItem key={area.name} label={area.name} value={String(area.name)} />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      )}

      <Select className='w-[48%]' selectedValue={selectedBlood} onValueChange={handleBloodChange}>
        <SelectTrigger variant="rounded" className='items-center' size='xl'>
          <SelectInput className='grow' placeholder='Blood Group' />
          <SelectIcon className="mr-3" as={ChevronDownIcon} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {['All Groups', ...Object.values(BloodGroup)].map(bg => (
              <SelectItem key={bg} label={bg === BloodGroup.OTHER ? 'Rare Groups' : bg} value={bg} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>

    </HStack>
  )
}

export default DonorFilters
