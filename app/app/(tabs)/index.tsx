import { VStack } from '@/components/ui/vstack'
import React, { Fragment, useState } from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { StatusBar } from 'react-native'
import { useAreas } from '@/lib/queries/area'
import AreaCard from '@/components/areas/area-card'

const AreaCommitteeScreen = () => {
  const { data: areas } = useAreas()
  const offsetY = useSharedValue(0);

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
          numColumns={2}
          contentContainerStyle={{
            backgroundColor: '#f8fafc',
            paddingBottom: 16,
            gap: 16
          }}
          columnWrapperStyle={{
            gap: 12,
            justifyContent: 'space-evenly'
          }}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <Animated.View style={[{
              backgroundColor: '#0d1321',
              position: 'relative',
              marginTop: 0
            }, headerStyle]}
            >
              <Animated.Text
                style={[{
                  color: "#f8fafc",
                  fontWeight: 700,
                  position: 'absolute'
                }, headerTitleStyle]}
              >
                Area Committees
              </Animated.Text>
            </Animated.View>
          }
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
