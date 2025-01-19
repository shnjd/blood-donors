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
        className='overflow-hidden grow bg-slate-50'
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            backgroundColor: '#f8fafc',
            gap: 16
          }}
          columnWrapperStyle={{
            gap: 12,
            justifyContent: 'space-evenly'
          }}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
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
          }
          data={Object.values(BloodGroup)}
          renderItem={({ item }) => <BloodGroupCard key={`bg-${item}`} bg={item} areaId={area?.id} />}
        />
      </VStack>
    </Fragment >
  )
}

export default BloodGroupsScreen
