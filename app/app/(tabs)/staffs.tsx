import { VStack } from '@/components/ui/vstack'
import { useUsers } from '@/lib/queries/users'
import React, { Fragment, useState } from 'react'
import { FilterX } from 'lucide-react-native'
import { Pressable } from '@/components/ui/pressable'
import { queryClient } from '@/lib/react-query'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { StatusBar } from 'react-native'
import { HStack } from '@/components/ui/hstack'
import { Filter } from 'lucide-react-native'
import { useLocalSearchParams } from 'expo-router'
import DonorFilters from '@/components/donors/donor-filters'
import { Divider } from "@/components/ui/divider"
import UserItem from '@/components/staffs/user-item'

const StaffsScreen = () => {
  const { data: users, isFetching } = useUsers()
  const [showFilters, setFilters] = useState(false)
  const offsetY = useSharedValue(0);
  // const { bg: bloodGroupKey, area: areaId } = useLocalSearchParams()


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
                  Staff Users
                </Animated.Text>
              </Animated.View>
              {showFilters && <DonorFilters />}
            </Fragment>
          }
          // ListHeaderComponentStyle={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          data={users?.users}
          refreshing={isFetching}
          renderItem={({ item }) => <UserItem key={item.id} user={item} />}
          onRefresh={() => queryClient.refetchQueries({ queryKey: ['users'] })}
        />
      </VStack>
    </Fragment >
  )
}

export default StaffsScreen
