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
  const [selectedArea, setArea] = useState<string | null>(null)
  const [selectedBlood, setBlood] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (bloodGroupKey && typeof bloodGroupKey === 'string')
      // @ts-ignore
      setBlood(BloodGroup[bloodGroupKey] || null)

    if (areaId && areas && !isNaN(Number(areaId)))
      setArea(areas.find(a => a.id === Number(areaId))?.name || null)
  }, [areas])

  useEffect(() => {
    // @ts-ignore
    const bloodGroupKey = Object.keys(BloodGroup)[Object.values(BloodGroup).indexOf(selectedBlood)] || null;
    const foundAreaId = areas ? areas.find(a => a.name === selectedArea)?.id : null
    const qs: string[] = []
    if (bloodGroupKey) qs.push(`bg=${bloodGroupKey}`)
    if (foundAreaId) qs.push(`area=${foundAreaId}`)
    router.push(`/app/donors${qs.length > 0 ? `?${qs.join('&')}` : ''}` as Href)
  }, [selectedBlood, selectedArea])

  useEffect(() => {
    console.log(areaId)
    if (areaId && !isNaN(Number(areaId)) && areas)
      setArea(areas.find(a => a.id === Number(areaId))?.name || null)

    if (bloodGroupKey && typeof bloodGroupKey === 'string')
      // @ts-ignore
      setBlood(BloodGroup[bloodGroupKey] || null)
  }, [bloodGroupKey, areaId, areas])

  return (
    <HStack className='p-3 justify-between bg-gray-50'>
      {areas && (
        <Select className='w-[48%]' selectedValue={selectedArea} onValueChange={setArea} >
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

      <Select className='w-[48%]' selectedValue={selectedBlood} onValueChange={setBlood}>
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
