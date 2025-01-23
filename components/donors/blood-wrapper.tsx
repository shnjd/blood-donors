import { useAddDonor, useDonors, useUpdateDonor } from "@/lib/queries/donors"
import { Database } from "@/lib/database.types"
import { SUPABASE_DATE_FORMAT } from "@/lib/constants"
import dayjs from "dayjs"
import { useAreas } from "@/lib/queries/area"
import { useMemo } from "react"
import DonorBloodForm, { DonorBloodSchema } from "./blood-form"
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet"
import { Heading } from '@/components/ui/heading'

interface Props {
  donorId?: number,
  close: () => void
}

const DonorBloodFormWrapper = ({ donorId, close }: Props) => {
  const addDonor = useAddDonor()
  const updateDonor = useUpdateDonor()
  const { data: areas } = useAreas()
  const { data: donors } = useDonors()

  const donor = useMemo(() => {
    if (donors)
      return donors.find(d => d.id === donorId)
    return null
  }, [donors, donorId])

  const onSubmit = (values: DonorBloodSchema) => {
    if (donorId && donor) {
      const data: Database['public']['Tables']['Donors']['Insert'] = {
        ...donor,
        ...values,
        last_donated_on: dayjs(values?.last_donated_on).isValid() ? dayjs(values.last_donated_on).format(SUPABASE_DATE_FORMAT) : null
      }
      updateDonor.mutate({ donorId, donor: data })
    }
    close()
  }

  return (
    <Actionsheet isOpen={!!donorId} onClose={close}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <Heading className="my-3">Modify Blood Donation Details</Heading>
        <DonorBloodForm
          isLoading={addDonor?.isPending}
          areas={areas}
          onSubmit={onSubmit}
          donor={donor}
        />
      </ActionsheetContent>
    </Actionsheet>
  )
}


export default DonorBloodFormWrapper
