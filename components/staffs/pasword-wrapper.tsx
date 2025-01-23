import { useCreateUser, useUpdateUser } from "@/lib/queries/users"
import { Fragment, useEffect, useState } from "react"
import { Fab, FabLabel, FabIcon } from '@/components/ui/fab';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "../ui/actionsheet"
import { UserRoundPlus } from "lucide-react-native"
import { Heading } from "../ui/heading";
import { User } from "@supabase/supabase-js";
import StaffPasswordForm, { StaffPasswordSchema } from "./password-form";

interface Props {
  staff?: User,
  onClose?: () => void
}

const StaffPasswordFormWrapper = ({ staff, onClose }: Props) => {
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const [showActionsheet, setShowActionsheet] = useState(false)

  useEffect(() => {
    if (staff) setShowActionsheet(true)
  }, [])

  const onSubmit = (values: StaffPasswordSchema) => {
    if (staff)
      updateUser.mutate({ userId: staff.id, user: { password: values.password } })
    if (onClose) onClose()
    setShowActionsheet(false)
  }

  return (
    <Fragment>
      {!staff && (
        <Fab onPress={() => setShowActionsheet(true)}>
          <FabIcon as={UserRoundPlus} className="ml-2" />
          <FabLabel>Add Staff</FabLabel>
        </Fab>
      )}
      <Actionsheet isOpen={showActionsheet} onClose={() => {
        setShowActionsheet(false)
        if (onClose) onClose()
      }}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Heading className="mt-3 mb-1">Change Password</Heading>
          <StaffPasswordForm isLoading={createUser?.isPending} onSubmit={onSubmit} />
        </ActionsheetContent>
      </Actionsheet>
    </Fragment>
  )
}


export default StaffPasswordFormWrapper
