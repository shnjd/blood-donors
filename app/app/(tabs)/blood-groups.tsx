import { VStack } from '@/components/ui/vstack'
import React, { Fragment, useMemo } from 'react'
import { StatusBar } from 'react-native'
import { BloodGroup } from '@/lib/constants/enums'
import BloodGroupCard from '@/components/blood-groups/blood-card'
import { FlatList } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useAreas } from '@/lib/queries/area'
import { Text } from '@/components/ui/text'
import { HStack } from '@/components/ui/hstack'
import { LandPlot } from 'lucide-react-native'
import { Image } from 'expo-image'
import { ScrollView } from 'react-native-gesture-handler'

const images = [
  require(`@/assets/images/cover-0.jpeg`),
  require(`@/assets/images/cover-1.jpeg`),
  require(`@/assets/images/cover-2.jpeg`),
  require(`@/assets/images/cover-3.jpeg`),
  require(`@/assets/images/cover-4.jpeg`),
  require(`@/assets/images/cover-5.jpeg`),
  require(`@/assets/images/cover-6.jpeg`),
  require(`@/assets/images/cover-7.jpeg`),
  require(`@/assets/images/cover-8.jpeg`),
  require(`@/assets/images/cover-9.jpeg`),
  require(`@/assets/images/cover-10.jpeg`),
  require(`@/assets/images/cover-11.jpeg`),
  require(`@/assets/images/cover-12.jpeg`)
]

const BloodGroupsScreen = () => {
  const { area: areaId } = useLocalSearchParams()
  const { data: areas } = useAreas()

  const area = useMemo(() =>
    (areaId && !isNaN(Number(areaId)) && areas) ?
      areas.find(a => a.id === Number(areaId))
      : null, [areas, areaId])


  return (
    <Fragment>
      <StatusBar barStyle='light-content' backgroundColor='#0d1321' />
      <VStack
        className='overflow-hidden grow bg-slate-50 h-full w-full relative'
      >
        <Image
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 60,
            left: 0,
            right: 0,
            bottom: 0
          }}
          resizeMode='cover'
          source={images[!isNaN(Number(areaId)) ? Number(areaId) : 0]}
        />
        <VStack style={[{
          backgroundColor: '#0d1321',
          position: 'relative',
          height: 60
        }]}
        >
          {area && (
            <HStack className='justify-end gap-2 items-center py-6 px-5'>
              <Text className='text-gray-50'>{area.name}</Text>
              <LandPlot size={20} color="#f8fafc" />
            </HStack>
          )}

          <Text
            style={[{
              color: "#f8fafc",
              fontWeight: 700,
              position: 'absolute',
              top: 20,
              left: '5%',
              fontSize: 18
            }]}
          >
            Blood Groups
          </Text>
        </VStack>
        <VStack className="grow" />

        <ScrollView>
          <HStack className='flex-wrap w-full gap-4 p-5 justify-between' >
            {Object.values(BloodGroup).map(item => <BloodGroupCard key={`bg-${item}`} bg={item} areaId={area?.id} />)}
          </HStack>
        </ScrollView>
      </VStack>
    </Fragment >
  )
}

export default BloodGroupsScreen
