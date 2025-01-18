import { KeyboardAvoidingView, Platform } from "react-native"
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetScrollView } from "../ui/actionsheet"
import DonorForm, { DonorSchema } from "./donor-form"
import { Heading } from '@/components/ui/heading'
import { useAddDonor } from "@/lib/queries/donors"
import { Database } from "@/lib/database.types"
import { SUPABASE_DATE_FORMAT } from "@/lib/constants"
import dayjs from "dayjs"
import { useAreas } from "@/lib/queries/area"

interface Props {
  open: boolean,
  onClose: () => void
}

const DonorFormWrapper = ({ open, onClose }: Props) => {
  const addDonor = useAddDonor()
  const { data: areas } = useAreas()

  const onSubmit = (values: DonorSchema) => {
    const data: Database['public']['Tables']['Donors']['Insert'] = {
      ...values,
      last_donated_on: dayjs(values?.last_donated_on).isValid() ? dayjs(values.last_donated_on).format(SUPABASE_DATE_FORMAT) : null
    }
    addDonor.mutate(data)
    onClose()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Actionsheet
        isOpen={open}
        onClose={onClose}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[90%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Heading size='xl' className='text-center my-1'>
            Add New Donor
          </Heading>

          <ActionsheetScrollView>
            <DonorForm isLoading={addDonor?.isPending} areas={areas} onSubmit={onSubmit} />
          </ActionsheetScrollView>
        </ActionsheetContent>
      </Actionsheet>
    </KeyboardAvoidingView>
  );
}


export default DonorFormWrapper
