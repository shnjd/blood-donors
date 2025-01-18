import { VStack } from "../ui/vstack"
import { Button, ButtonSpinner, ButtonText } from "../ui/button"
import FormInput from "../form-ui/input"
import { FormControl } from "../ui/form-control"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignin, useUser } from "@/lib/queries/auth"
import { useEffect } from "react"
import { toast } from "sonner-native"
import { Redirect, useRouter } from "expo-router"

const signinSchema = z.object({
  email: z.string({ message: "Email address is required" }).email('Invalid email address'),
  password: z.string({ message: "Password is required" }).min(1, "Password is required")
})

type SigninSchema = z.infer<typeof signinSchema>

export default function AuthForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid }
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema)
  })
  const signin = useSignin()
  const { data: user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      toast.warning('Already signed in', {
        description: "You're already signed in. sign out first to sign in as a different user."
      })
      router.push('/app/account')
    }
  }, [])

  const onSubmit = (values: SigninSchema) => {
    signin.mutate(values)
    reset()
  }

  if (user) return <Redirect href='/app' />

  return (
    <VStack className="py-5 gap-4 px-7">
      <FormControl
        className="gap-4"
        size="md"
        isInvalid={isSubmitted && !isValid}
        isDisabled={signin.isPending}
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
          keyboardType="email-address"
        />
        <FormInput
          control={control}
          name="password"
          errors={errors}
          label="Password"
          secureTextEntry
          placeholder="********"
          autoCapitalize='none'
        />
      </FormControl>
      <Button variant='solid' onPress={handleSubmit(onSubmit)}>
        <ButtonText>Sign In</ButtonText>
        {signin.isPending && <ButtonSpinner color='#ffffff' size={16} />}
      </Button>
    </VStack>
  )
}

