import { PHONE_REGEX } from '@/lib/constants'
import { BloodGroup } from '@/lib/constants/enums'
import React, { useEffect } from 'react'
import * as z from 'zod'
import dayjs, { Dayjs } from 'dayjs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VStack } from '../ui/vstack'
import { FormControl } from '../ui/form-control'
import FormInput from '@/components/form-ui/input'
import { Button, ButtonSpinner, ButtonText } from '../ui/button'
import FormSelect from '../form-ui/select'
import { Database } from '@/lib/database.types'
import FormDatePicker from '../form-ui/date-picker'
import { HStack } from '../ui/hstack'
import { Text } from '@/components/ui/text'

const donorBloodSchema = z.object({
  donation_count: z.coerce.number({ message: 'Enter a valid number' }),
  last_donated_on: z.instanceof(dayjs as unknown as typeof Dayjs, { message: "Invalid date" }).optional().nullable(),
  donation_hospital: z.string().optional()
})

export type DonorBloodSchema = z.infer<typeof donorBloodSchema>

type Props = {
  areas: Database['public']['Tables']['AreaCommittee']['Row'][] | undefined,
  donor?: Database['public']['Tables']['Donors']['Row'] | null,
  isLoading: boolean,
  onSubmit: (values: DonorBloodSchema) => void
}

const DonorBloodForm = ({ areas, isLoading, donor, onSubmit }: Props) => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitted, isValid }
  } = useForm<DonorBloodSchema>({
    resolver: zodResolver(donorBloodSchema),
  })

  useEffect(() => {
    if (donor)
      reset({
        donation_count: donor?.donation_count || undefined,
        last_donated_on: dayjs(donor?.last_donated_on).isValid() ? dayjs(donor.last_donated_on) : undefined
      })
  }, [donor])

  return (
    <VStack className="p-3 gap-3 w-full">
      <FormControl
        className="gap-4"
        isInvalid={isSubmitted && !isValid}
        isDisabled={isLoading}
      >
        <VStack className='gap-1'>
          <Text>
            Donation Count
          </Text>
          <HStack className='items-center justify-between'>
            <Text size='2xl' bold className='grow text-center'>
              {watch('donation_count')}
            </Text>
            <Button action='positive' onPress={() => setValue('donation_count', Number(watch('donation_count') || 0) + 1)}>
              <ButtonText>
                Update Count (+1)
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
        <FormDatePicker
          control={control}
          name="last_donated_on"
          errors={errors}
          label="Last Donated Date"
          placeholder="Select a date"
        />
        <FormSelect
          control={control}
          name="donation_hospital"
          errors={errors}
          label="Hospital of Donation"
          placeholder="Select a hospital"
          options={['GENERAL HOSPITAL, KASARAGOD', 'DISTRICT HOSPITAL, KANHANGAD', 'OTHER'].map(h => ({ label: h, value: h === 'OTHER' ? '' : h }))}
        />
        {watch('donation_hospital') === '' && (
          <FormInput
            control={control}
            name="donation_hospital"
            errors={errors}
            label="Hospital Name"
            placeholder="Name of the other hospital"
            autoCapitalize='words'
          />
        )}
      </FormControl>

      <Button variant='solid' onPress={handleSubmit((values) => {
        onSubmit(values)
        reset()
      })}>
        <ButtonText>Save</ButtonText>
        {isLoading && <ButtonSpinner color='#ffffff' size={16} />}
      </Button>

    </VStack>
  )
}

export default DonorBloodForm
