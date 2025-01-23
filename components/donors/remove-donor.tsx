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
import { useEffect, useState } from 'react';
import { Text } from '@/components/ui/text'
import { useRemoveDonor } from '@/lib/queries/donors';

interface Props {
  donorId?: number,
  close: () => void
}

function RemoveDonor({ donorId, close }: Props) {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const removeDonor = useRemoveDonor()

  useEffect(() => {
    if (donorId) setShowAlertDialog(true)
  }, [donorId])

  const handleClose = () => {
    setShowAlertDialog(false);
    close()
  }

  const handleRemove = () => {
    if (donorId) {
      removeDonor.mutate(donorId)
      setShowAlertDialog(false)
    }
    close()
  }

  return (
    <AlertDialog isOpen={showAlertDialog} onClose={handleClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent className="w-[90%] max-w-[415px] gap-4">
        <AlertDialogHeader>
          <Heading size="xl">Are you sure?</Heading>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text>
            Are you sure want to remove this donor? This action is irreversible!
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
  );
}


export default RemoveDonor
