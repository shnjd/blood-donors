import DonorForm, { DonorSchema } from "./donor-form"
import { useAddDonor } from "@/lib/queries/donors"
import { Database } from "@/lib/database.types"
import { SUPABASE_DATE_FORMAT } from "@/lib/constants"
import dayjs from "dayjs"
import { useAreas } from "@/lib/queries/area"

interface Props {
}

const DonorFormWrapper = ({ }: Props) => {
  const addDonor = useAddDonor()
  const { data: areas } = useAreas()

  const onSubmit = (values: DonorSchema) => {
    const data: Database['public']['Tables']['Donors']['Insert'] = {
      ...values,
      last_donated_on: dayjs(values?.last_donated_on).isValid() ? dayjs(values.last_donated_on).format(SUPABASE_DATE_FORMAT) : null
    }
    addDonor.mutate(data)
  }

  return <DonorForm isLoading={addDonor?.isPending} areas={areas} onSubmit={onSubmit} />
}


export default DonorFormWrapper
