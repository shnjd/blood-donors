import { VStack } from '@/components/ui/vstack'
import React, { Fragment, useState } from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { StatusBar } from 'react-native'
import { useAreas } from '@/lib/queries/area'
import AreaCard from '@/components/areas/area-card'
import { Image } from 'expo-image'

const AreaCommitteeScreen = () => {
  const { data: areas } = useAreas()




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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          resizeMode='cover'
          source={require('@/assets/images/areas-cover.jpeg')}
        />
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          numColumns={3}
          contentContainerStyle={{
            // backgroundColor: '#f8fafc',
            paddingBottom: 16,
            paddingTop: 180,
            gap: 16
          }}
          columnWrapperStyle={{
            gap: 12,
            justifyContent: 'space-evenly'
          }}
          // ListHeaderComponentStyle={{ position: 'absolute', top: 0, left: 0, right: 0 }}
          data={areas}
          // refreshing={isFetching}
          renderItem={({ item }) => <AreaCard key={`area-${item.id}`} area={item} />}
        // onRefresh={() => queryClient.refetchQueries({ queryKey: ['donors'] })}
        />

      </VStack>

    </Fragment >
  )
}

export default AreaCommitteeScreen
