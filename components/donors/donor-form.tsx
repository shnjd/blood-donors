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

const donorSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  place: z.string({ message: 'Place is required' }),
  blood_group: z.nativeEnum(BloodGroup, { message: "Blood Group is required" }),
  donation_count: z.coerce.number({ message: 'Enter a valid number' }),
  phone: z.string({ message: 'Phone number is required' }).regex(PHONE_REGEX, { message: 'Invalid Phone Number format' }),
  phone_alt: z.string().regex(PHONE_REGEX, { message: 'Invalid Phone umber format' }).optional(),
  area_committee: z.coerce.number().optional(),
  last_donated_on: z.instanceof(dayjs as unknown as typeof Dayjs, { message: "Invalid date" }).optional().nullable(),
  address: z.string().optional(),
  comments: z.string().optional(),
  other_blood_group: z.string().optional(),
  donation_hospital: z.string().optional()
})

export type DonorSchema = z.infer<typeof donorSchema>

type Props = {
  areas: Database['public']['Tables']['AreaCommittee']['Row'][] | undefined,
  donor?: Database['public']['Tables']['Donors']['Row'] | null,
  isLoading: boolean,
  onSubmit: (values: DonorSchema) => void
}

const DonorForm = ({ areas, isLoading, donor, onSubmit }: Props) => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid }
  } = useForm<DonorSchema>({
    resolver: zodResolver(donorSchema),
  })

  useEffect(() => {
    if (donor) {
      reset({
        ...donor,
        blood_group: donor.blood_group as BloodGroup,
        phone_alt: donor?.phone_alt || undefined,
        area_committee: donor?.area_committee || undefined,
        address: donor?.address || undefined,
        comments: donor?.comments || undefined,
        other_blood_group: donor?.other_blood_group || undefined,
        last_donated_on: dayjs(donor?.last_donated_on).isValid() ? dayjs(donor.last_donated_on) : undefined,
        donation_hospital: donor?.donation_hospital || undefined
      })
    }
  }, [donor])

  return (
    <VStack className="p-3 gap-3 w-full">
      <FormControl
        className="gap-4"
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
          name="place"
          errors={errors}
          label="Place"
          placeholder="Enter place"
        />
        <FormSelect
          control={control}
          name="blood_group"
          errors={errors}
          label="Blood Group"
          placeholder="Choose a blood group"
          options={Object.values(BloodGroup).map(bg => ({ label: bg, value: bg }))}
        />
        {watch('blood_group') === BloodGroup.OTHER && (<FormInput
          control={control}
          name="other_blood_group"
          errors={errors}
          label="Blood Group (Optional)"
          placeholder="Mention the other blood group"
        />
        )}
        <FormInput
          control={control}
          name="donation_count"
          errors={errors}
          label="Donation Count"
          placeholder="Enter a count"
          helperText='The number of times the donor previously donated'
          keyboardType='numeric'
        />
        <FormDatePicker
          control={control}
          name="last_donated_on"
          errors={errors}
          label="Last Donated Date (Optional)"
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
        <FormInput
          control={control}
          name="phone"
          errors={errors}
          label="Phone Number"
          placeholder="Enter donor's contact number"
          keyboardType='numeric'
        />
        <FormInput
          control={control}
          name="phone_alt"
          errors={errors}
          label="Alternative Phone Number (Optional)"
          placeholder="Enter an alternative phone number"
          keyboardType='numeric'
        />
        <FormSelect
          control={control}
          name="area_committee"
          errors={errors}
          label="Area Committee (Optional)"
          placeholder="Choose an area committee"
          helperText='Area Committee to which the donor belongs to'
          options={areas ? areas.map(area => ({ label: area.name, value: String(area.id) })) : []}
        />
        <FormInput
          control={control}
          name="address"
          errors={errors}
          label="Address (Optional)"
          placeholder="Enter address details"
          numberOfLines={3}
        />
        <FormInput
          control={control}
          name="comments"
          errors={errors}
          label="Comments (Optional)"
          placeholder="Enter comments"
          helperText='Enter additional details/comments about donor here'
          numberOfLines={3}
        />
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

export default DonorForm
