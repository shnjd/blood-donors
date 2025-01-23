import { PHONE_REGEX } from '@/lib/constants'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { VStack } from '../ui/vstack'
import { FormControl } from '../ui/form-control'
import FormInput from '../form-ui/input'
import { Button, ButtonSpinner, ButtonText } from '../ui/button'
import { StaffRoles } from '@/lib/constants/enums'
import FormSelect from '../form-ui/select'
import RolesHelp from './roles-help'
import { User } from '@supabase/supabase-js'

type Props = {
  isLoading: boolean,
  staff?: User,
  onSubmit: (values: StaffSchema) => void
}

const staffSchema = z.object({
  email: z.string({ message: "Email address is required" }).email(),
  name: z.string({ message: 'Name is required' }),
  role: z.nativeEnum(StaffRoles),
  place: z.string({ message: 'Place is required' }),
  phone: z.string({ message: 'Phone number is required' }).regex(PHONE_REGEX, { message: 'Invalid Phone Number format' }),
  password: z.string()
})

export type StaffSchema = z.infer<typeof staffSchema>

const StaffForm = ({ isLoading, staff, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid }
  } = useForm<StaffSchema>({
    resolver: zodResolver(staffSchema),
  })

  useEffect(() => {
    reset({ ...staff?.user_metadata, email: staff?.email })
  }, [staff])

  return (
    <VStack className="p-3 gap-3 w-full">
      <FormControl
        className="gap-4 mb-2"
        isInvalid={isSubmitted && !isValid}
        isDisabled={isLoading}
      >
        <FormInput
          control={control}
          name="name"
          errors={errors}
          label="Name"
          placeholder="Enter full name of the donor"
          autoCapitalize='words'
        />
        <FormInput
          control={control}
          name="email"
          errors={errors}
          label="Email"
          placeholder="email@example.com"
          autoCapitalize={'none'}
          keyboardType="email-address"
        />
        {!staff && (
          <FormInput
            control={control}
            name="password"
            errors={errors}
            label="Password"
            autoCapitalize={'none'}
            isPassword
          />
        )}
        <VStack className='gap-1'>
          <FormSelect
            control={control}
            name="role"
            errors={errors}
            label="Role"
            placeholder="Choose a role for staff"
            options={Object.entries(StaffRoles).map(([_, label]) => ({ label, value: label }))}
          />
          <RolesHelp />
        </VStack>
        <FormInput
          control={control}
          name="place"
          errors={errors}
          label="Place"
          placeholder="Enter place"
        />

        <FormInput
          control={control}
          name="phone"
          errors={errors}
          label="Phone Number"
          placeholder="Enter staff's contact number"
          keyboardType='numeric'
        />
      </FormControl>

      <Button variant='solid' onPress={handleSubmit(onSubmit)}>
        <ButtonText>Save</ButtonText>
        {isLoading && <ButtonSpinner color='#ffffff' size={16} />}
      </Button>

    </VStack>
  )
}

export default StaffForm
