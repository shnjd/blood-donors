import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '../ui/button';
import { Heading } from '@/components/ui/heading';
import { useState } from 'react';
import { Text } from '@/components/ui/text'
import { useRemoveUser } from '@/lib/queries/users';

interface Props {
  staffId?: string
}

function RemoveStaff({ staffId }: Props) {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);
  const removeStaff = useRemoveUser()

  const handleRemove = () => {
    if (staffId) {
      removeStaff.mutate(staffId)
      setShowAlertDialog(false)
    }
  }

  return (
    <>
      <Button onPress={() => setShowAlertDialog(true)} action='negative'>
        <ButtonText>Delete Staff</ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-[90%] max-w-[415px] gap-4">
          <AlertDialogHeader>
            <Heading size="xl">Are you sure?</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>
              Are you sure want to remove this staff. This action is irreversible!
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-3">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
              className="px-8"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="negative"
              onPress={handleRemove}
              className="px-8"
            >
              <ButtonText>Delete</ButtonText>
            </Button>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}


export default RemoveStaff
