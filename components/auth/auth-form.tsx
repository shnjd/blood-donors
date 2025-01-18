import { useState } from "react"
import { VStack } from "../ui/vstack"
import { Button, ButtonText } from "../ui/button"
import FormInput from "../form-ui/input"
import { FormControl } from "../ui/form-control"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from "sonner-native"
import authApi from "@/lib/api/auth"
import { AuthError } from "@supabase/supabase-js"

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, "Password is required")
})

type LoginSchema = z.infer<typeof loginSchema>

export default function AuthForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = (values: LoginSchema) => {

    authApi.signIn(values).then((data) => {
      console.log(data)
    }).catch((error: AuthError) => {
      console.log(error.code)
      if (error.code === 'invalid_credentials') {
        toast.error('Failed to login', {
          description: 'Invalid email or password! try again'
        })
      } else toast.error('Failed to login')
    })

    // if(error) {
    //   if(
    //     Array.isArray(error) && 
    //     error.length > 0 && 
    //       error.some(v => String(v).toLowerCase().includes('invalid'))
    //   )
    // }
  }

  return (
    <VStack className="py-5 gap-4 px-7">
      <FormControl
        isInvalid={isSubmitted && !isValid}
        className="gap-4"
        size="md"
        isDisabled={false}
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
      <Button variant='solid' disabled={loading} onPress={handleSubmit(onSubmit)}>
        <ButtonText>Sign In</ButtonText>
      </Button>
    </VStack>
  )
}

