import { Stack } from "expo-router";

import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Toaster } from 'sonner-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <GluestackUIProvider mode="light">
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="index" />
            <Stack.Screen
              name="auth/index"
              options={{
                title: 'Login',
                headerShown: false,
              }}
            />
          </Stack>
          <Toaster />
        </QueryClientProvider>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
