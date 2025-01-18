import { VStack } from '@/components/ui/vstack'
import { useDonors } from '@/lib/queries/donors'
import React, { Fragment, useState } from 'react'
import DonorCard from '@/components/donors/donor-card'
import { FilterX, UserRoundPlus } from 'lucide-react-native'
import { Pressable } from '@/components/ui/pressable'
import DonorFormWrapper from '@/components/donors/form-wrapper'
import { Text } from '@/components/ui/text'
import { queryClient } from '@/lib/react-query'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { StatusBar } from 'react-native'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Filter } from 'lucide-react-native'

const DonorsScreen = () => {
  const { data: donors, isFetching } = useDonors()
  const [add, setAdd] = useState(false)
  const [showFilters, setFilters] = useState(false)
  const offsetY = useSharedValue(0);

  const imageContainerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(offsetY.value, [0, 100], [1, 0.75], Extrapolation.CLAMP),
    scale: interpolate(offsetY.value, [0, 100], [1, 1.2], Extrapolation.CLAMP),
  }))

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(offsetY.value, [0, 100], [200, 60], Extrapolation.CLAMP),
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
            <Animated.View style={[{
              backgroundColor: '#0d1321',
              position: 'relative',
            }, headerStyle]}
            >
              <HStack className='justify-end p-5'>
                <Pressable
                  onPress={() => setFilters(prev => !prev)}
                  className='h-10 w-10 justify-center items-center rounded-full'>
                  {showFilters ?
                    <FilterX size={20} color="#f8fafc" />
                    : <Filter size={20} color="#f8fafc" />}
                </Pressable>
              </HStack>
              <Animated.Text
                style={[{
                  color: "#f8fafc",
                  fontWeight: 700,
                  position: 'absolute'
                }, headerTitleStyle]}
              >
                All Donors
              </Animated.Text>
            </Animated.View>
          }
          // ListHeaderComponentStyle={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          data={donors}
          refreshing={isFetching}
          renderItem={({ item }) => <DonorCard key={`donor-${item.id}`} donor={item} />}
          onRefresh={() => queryClient.refetchQueries({ queryKey: ['donors'] })}
        />

        <Pressable
          onPress={() => setAdd(true)}
          className='absolute h-14 justify-center items-center w-14 bg-primary-500 rounded-full bottom-6 right-6'
        >
          <UserRoundPlus color='#ffffff' size={24} />
        </Pressable>
      </VStack>

      <DonorFormWrapper open={add} onClose={() => setAdd(false)} />
    </Fragment >
  )
}

export default DonorsScreen
