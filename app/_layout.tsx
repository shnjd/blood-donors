import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import '@/lib/react-query'
import { asyncStoragePersister, queryClient } from "@/lib/react-query";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <GluestackUIProvider mode='system'>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
        >
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="auth/index"
              options={{
                title: 'Sign In',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="app/(tabs)"
              options={{
                headerShown: false
              }}
            />
          </Stack>
          <Toaster />
        </PersistQueryClientProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
