import StaffForm, { StaffSchema } from "./staff-form"
import { useCreateUser, useUpdateUser } from "@/lib/queries/users"
import { Fragment, useEffect, useState } from "react"
import { Fab, FabLabel, FabIcon } from '@/components/ui/fab';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "../ui/actionsheet"
import { UserRoundPlus } from "lucide-react-native"
import { Heading } from "../ui/heading";
import { User } from "@supabase/supabase-js";

interface Props {
  staff?: User,
  onClose?: () => void
}

const StaffFormWrapper = ({ staff, onClose }: Props) => {
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const [showActionsheet, setShowActionsheet] = useState(false)

  useEffect(() => {
    if (staff) setShowActionsheet(true)
  }, [])

  const onSubmit = (values: StaffSchema) => {
    const { email, password, ...user_metadata } = values
    if (staff)
      updateUser.mutate({
        userId: staff.id, user: {
          email,
          user_metadata
        }
      })
    else createUser.mutate({
      email,
      password,
      user_metadata
    })
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
          <Heading className="mt-3 mb-1">{staff ? "Edit" : "Add"} Staff</Heading>
          <StaffForm staff={staff} isLoading={createUser?.isPending} onSubmit={onSubmit} />
        </ActionsheetContent>
      </Actionsheet>
    </Fragment>
  )
}


export default StaffFormWrapper
