import DonorForm, { DonorSchema } from "./donor-form"
import { useAddDonor, useDonors, useUpdateDonor } from "@/lib/queries/donors"
import { Database } from "@/lib/database.types"
import { SUPABASE_DATE_FORMAT } from "@/lib/constants"
import dayjs from "dayjs"
import { useAreas } from "@/lib/queries/area"
import { useMemo } from "react"

interface Props {
  donorId?: number
}

const DonorFormWrapper = ({ donorId }: Props) => {
  const addDonor = useAddDonor()
  const updateDonor = useUpdateDonor()
  const { data: areas } = useAreas()
  const { data: donors } = useDonors()

  const donor = useMemo(() => {
    if (donors)
      return donors.find(d => d.id === donorId)
    return null
  }, [donors, donorId])

  const onSubmit = (values: DonorSchema) => {
    const data: Database['public']['Tables']['Donors']['Insert'] = {
      ...values,
      last_donated_on: dayjs(values?.last_donated_on).isValid() ? dayjs(values.last_donated_on).format(SUPABASE_DATE_FORMAT) : null
    }
    if (donorId && donor)
      updateDonor.mutate({ donorId, donor: data })
    else addDonor.mutate(data)
  }

  return (
    <DonorForm
      isLoading={addDonor?.isPending}
      areas={areas}
      onSubmit={onSubmit}
      donor={donor}
    />
  )
}


export default DonorFormWrapper
