import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { VStack } from '../ui/vstack'
import { FormControl } from '../ui/form-control'
import FormInput from '../form-ui/input'
import { Button, ButtonSpinner, ButtonText } from '../ui/button'

type Props = {
  isLoading: boolean,
  onSubmit: (values: StaffPasswordSchema) => void
}

const staffSchema = z.object({
  password: z.string()
})

export type StaffPasswordSchema = z.infer<typeof staffSchema>

const StaffPasswordForm = ({ isLoading, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid }
  } = useForm<StaffPasswordSchema>({
    resolver: zodResolver(staffSchema),
  })

  return (
    <VStack className="p-3 gap-3 w-full">
      <FormControl
        className="gap-4 mb-2"
        isInvalid={isSubmitted && !isValid}
        isDisabled={isLoading}
      >
        <FormInput
          control={control}
          name="password"
          errors={errors}
          label="Password"
          autoCapitalize={'none'}
          isPassword
        />
      </FormControl>
      <Button variant='solid' onPress={handleSubmit(onSubmit)}>
        <ButtonText>Save</ButtonText>
        {isLoading && <ButtonSpinner color='#ffffff' size={16} />}
      </Button>

    </VStack>
  )
}

export default StaffPasswordForm
