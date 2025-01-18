import { VStack } from "../ui/vstack"
import { Button, ButtonText } from "../ui/button"
import FormInput from "../form-ui/input"
import { FormControl } from "../ui/form-control"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin, useUser } from "@/lib/queries/auth"
import { useEffect } from "react"
import { toast } from "sonner-native"
import { useRouter } from "expo-router"

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, "Password is required")
})

type LoginSchema = z.infer<typeof loginSchema>

export default function AuthForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
  const login = useLogin()
  const { data: user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      toast.warning('Already logged in', {
        description: "You're already logged in. sign out to log in as a different user."
      })
      router.push('/app/account')
    }
  }, [])

  const onSubmit = (values: LoginSchema) => {
    login.mutate(values)
    reset()
  }

  return (
    <VStack className="py-5 gap-4 px-7">
      <FormControl
        className="gap-4"
        size="md"
        isDisabled={login.isPending}
        isReadOnly={false}
        isRequired={false}
      >
        <FormInput
          control={control}
          name="email"
          errors={errors}
          label="Email"
          placeholder="email@example.com"
          autoCapitalize={'none'}
        />
        <FormInput
          control={control}
          name="password"
          errors={errors}
          label="Password"
          secureTextEntry={true}
          placeholder="********"
          autoCapitalize={'none'}
        />
      </FormControl>
      <Button variant='solid' onPress={handleSubmit(onSubmit)}>
        <ButtonText>Sign In</ButtonText>
      </Button>
    </VStack>
  )
}

