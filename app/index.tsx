import 'react-native-url-polyfill/auto'
import { Link } from 'expo-router'
import { VStack } from '@/components/ui/vstack'

export default function App() {
  return (
    <VStack className='gap-5 p-5'>
      <Link href='/auth'>Login</Link>
    </VStack>
  )
}
