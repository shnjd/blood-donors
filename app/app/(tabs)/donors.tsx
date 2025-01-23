import { VStack } from '@/components/ui/vstack'
import { useDonors } from '@/lib/queries/donors'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import DonorCard from '@/components/donors/donor-card'
import { FilterX, LandPlot } from 'lucide-react-native'
import { Pressable } from '@/components/ui/pressable'
import { queryClient } from '@/lib/react-query'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { StatusBar } from 'react-native'
import { HStack } from '@/components/ui/hstack'
import { Filter } from 'lucide-react-native'
import { useLocalSearchParams } from 'expo-router'
import { useAreas } from '@/lib/queries/area'
import { BloodGroup } from '@/lib/constants/enums'
import { Database } from '@/lib/database.types'
import { Text } from '@/components/ui/text'
import DonorFilters from '@/components/donors/donor-filters'
import DonorModal from '@/components/donors/donor-modal'
import RemoveDonor from '@/components/donors/remove-donor'
import DonorBloodFormWrapper from '@/components/donors/blood-wrapper'

const DonorsScreen = () => {
  const [showFilters, setFilters] = useState(false)
  const offsetY = useSharedValue(0);
  const { bg: bloodGroupKey, area: areaId } = useLocalSearchParams()
  const { data: areas } = useAreas()
  const { data: donors, isFetching } = useDonors({ bloodGroup: bloodGroupKey, areaId })
  const [modalDonor, setDonor] = useState<Database['public']['Tables']['Donors']['Row'] | null>(null)
  const [removeId, setRemoveId] = useState<number | null>(null)
  const [modifyId, setModifyId] = useState<number | null>(null)

  const area = useMemo(() => {
    if (areaId && !isNaN(Number(areaId)) && areas)
      return areas.find(a => a.id === Number(areaId)) || null

    return null
  }, [areaId, areas])

  const bloodGroup = useMemo(() => {
    if (bloodGroupKey && typeof bloodGroupKey === 'string')
      // @ts-ignore
      return BloodGroup[bloodGroupKey] || null
    return null
  }, [bloodGroupKey])

  const imageContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offsetY.value, [0, 100], [1, 0.75], Extrapolation.CLAMP),
    scale: interpolate(offsetY.value, [0, 100], [1, 1.2], Extrapolation.CLAMP),
  }))

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(offsetY.value, [0, 100], [200, 60], Extrapolation.CLAMP),
    top: interpolate(offsetY.value, [0, 100], [0, 0], Extrapolation.CLAMP),
  }))

  const headerTitleStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(offsetY.value, [0, 100], [32, 18], Extrapolation.CLAMP),
    top: interpolate(offsetY.value, [0, 100], [80, 20], Extrapolation.CLAMP),
    left: `${interpolate(offsetY.value, [0, 100], [50, 5], Extrapolation.CLAMP)}%`,
    transform: [{
      translateX: `${interpolate(offsetY.value, [0, 100], [-50, 0], Extrapolation.CLAMP)}%`
    }]
  }))


  const scrollHandler = useAnimatedScrollHandler((event) => {
    offsetY.value = event.contentOffset.y;
  });

  return (
    <Fragment>
      <StatusBar barStyle='light-content' backgroundColor='#0d1321' />
      <VStack
        className='overflow-hidden grow bg-slate-50'
      >
        <Animated.FlatList
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: 12,
            backgroundColor: '#f8fafc',
            paddingBottom: 16
          }}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <Fragment>
              <Animated.View style={[{
                backgroundColor: '#0d1321',
                position: 'relative',
                marginTop: 0
              }, headerStyle]}
              >
                <HStack className='justify-end gap-1'>
                  {area && (
                    <HStack className='gap-2 items-center py-6 px-3'>
                      <LandPlot size={20} color="#f8fafc" />
                      <Text className='text-gray-50'>{area.name}</Text>
                    </HStack>
                  )}
                  <HStack className='px-4 py-5'>
                    <Pressable
                      onPress={() => setFilters(prev => !prev)}
                      className='justify-center p-1 items-center rounded-full'>
                      {showFilters ?
                        <FilterX size={20} color="#f8fafc" />
                        : <Filter size={20} color="#f8fafc" />}
                    </Pressable>
                  </HStack>
                </HStack>
                <Animated.Text
                  style={[{
                    color: "#f8fafc",
                    fontWeight: 700,
                    position: 'absolute'
                  }, headerTitleStyle]}
                >
                  {bloodGroup ? `${bloodGroup === BloodGroup.OTHER ? 'Rare' : bloodGroup} Blood Donors` : "All Donors"}
                </Animated.Text>
              </Animated.View>
              {showFilters && <DonorFilters />}
            </Fragment>
          }
          // ListHeaderComponentStyle={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          data={donors}
          refreshing={isFetching}
          renderItem={({ item }) => <DonorCard select={() => setDonor(item)} key={`donor-${item.id}`} donor={item} />}
          onRefresh={() => queryClient.refetchQueries({ queryKey: ['donors'] })}
          ListEmptyComponent={
            <VStack>
              <Text className='text-center'>{bloodGroupKey || areaId ? "No donors found; try changing the filters." : "No donors found."}</Text>
            </VStack>
          }
        />
      </VStack>

      {modalDonor &&
        <DonorModal
          donor={modalDonor}
          close={() => setDonor(null)}
          remove={() => setRemoveId(modalDonor.id)}
          modify={() => setModifyId(modalDonor.id)}
        />
      }

      {modifyId &&
        <DonorBloodFormWrapper
          donorId={modifyId}
          close={() => {
            setModifyId(null)
            setDonor(null)
          }}
        />
      }
      {removeId && (
        <RemoveDonor
          donorId={removeId}
          close={() => {
            setRemoveId(null)
            setDonor(null)
          }}
        />
      )}

    </Fragment>
  )
}

export default DonorsScreen
