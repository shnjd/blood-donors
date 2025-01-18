import { queryClient } from '@/lib/react-query';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, useRouter } from 'expo-router';
import { CircleUserRound, LandPlot, UsersRound } from 'lucide-react-native';
import { useEffect } from 'react';

export default function TabLayout() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        AsyncStorage.clear()
        queryClient.clear()
        router.push('/')
      }
    })

  }, [])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#27447d',
        headerTitleStyle: {
          fontWeight: 700
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Area Committees',

          tabBarIcon: ({ color }) => <LandPlot size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="donors"
        options={{
          title: 'All Donors',
          tabBarIcon: ({ color }) => <UsersRound size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <CircleUserRound size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
