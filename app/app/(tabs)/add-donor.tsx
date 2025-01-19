import { VStack } from '@/components/ui/vstack'
import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import DonorFormWrapper from '@/components/donors/form-wrapper'
import { View, Text, ScrollView } from 'react-native'

const AddDonorScreen = () => {
  return (
    <Fragment>
      <StatusBar barStyle='light-content' backgroundColor='#0d1321' />
      <VStack
        className='grow bg-slate-50'
      >
        <View
          style={{
            backgroundColor: '#0d1321',
            position: 'relative',
            marginTop: 0,
            top: 0,
            height: 60,
            marginBottom: 12
          }}
        >
          <Text
            style={[{
              color: "#f8fafc",
              fontWeight: 700,
              position: 'absolute',
              fontSize: 18,
              top: 20,
              left: '5%'
            }]}
          >
            Add New Donor
          </Text>
        </View>

        <ScrollView
          style={{
            flexGrow: 1,
            maxHeight: '90%'
          }}
        >
          <DonorFormWrapper />
        </ScrollView>
      </VStack>

    </Fragment >
  )
}

export default AddDonorScreen
