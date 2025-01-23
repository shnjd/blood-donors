import { VStack } from '@/components/ui/vstack'
import { useUsers } from '@/lib/queries/users'
import React, { Fragment, useState } from 'react'
import { queryClient } from '@/lib/react-query'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { StatusBar } from 'react-native'
import DonorFilters from '@/components/donors/donor-filters'
import UserItem from '@/components/staffs/user-item'
import StaffFormWrapper from '@/components/staffs/form-wrapper'
import { Redirect } from 'expo-router'
import { StaffRoles } from '@/lib/constants/enums'
import { useUser } from '@/lib/queries/auth'

const StaffsScreen = () => {
  const { data: users, isFetching } = useUsers()
  const [showFilters, setFilters] = useState(false)
  const offsetY = useSharedValue(0);
  const { data: user } = useUser()


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


  if (user?.user_metadata?.role !== StaffRoles.ADMIN)
    return <Redirect href='/app/(tabs)' />

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
                {/* <HStack className='justify-end gap-1'> */}

                {/*   <HStack className='px-4 py-5'> */}
                {/*     <Pressable */}
                {/*       onPress={() => setFilters(prev => !prev)} */}
                {/*       className='justify-center p-1 items-center rounded-full'> */}
                {/*       {showFilters ? */}
                {/*         <FilterX size={20} color="#f8fafc" /> */}
                {/*         : <Filter size={20} color="#f8fafc" />} */}
                {/*     </Pressable> */}
                {/*   </HStack> */}
                {/* </HStack> */}
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
          data={users?.users ? users.users.filter(u => !(u.email && u.email?.includes('shinjith'))) : []}
          refreshing={isFetching}
          renderItem={({ item }) => <UserItem key={item.id} user={item} />}
          onRefresh={() => queryClient.refetchQueries({ queryKey: ['users'] })}
        />

        <StaffFormWrapper />
      </VStack>
    </Fragment >
  )
}

export default StaffsScreen
