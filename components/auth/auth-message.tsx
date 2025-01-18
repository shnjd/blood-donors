import { KeyboardAvoidingView, Platform } from "react-native"
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "../ui/actionsheet"
import { VStack } from "../ui/vstack"
import { Heading } from "../ui/heading"
import { Text } from '../ui//text'
import { Button, ButtonText } from "../ui/button"

interface Props {
  open: boolean,
  onClose: () => void
}

const AuthMessage = ({ open, onClose }: Props) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Actionsheet
        isOpen={open}
        onClose={onClose}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent className="">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack className="w-full p-3 gap-3">
            <Heading>Contact Admin</Heading>
            <Text>
              This application is supervised and accessible only to authorized users. Contact the administrator to create a new account or change your password.
            </Text>
            <Button variant="solid" onPress={onClose}>
              <ButtonText>Okay</ButtonText>
            </Button>
          </VStack>
        </ActionsheetContent>
      </Actionsheet>
    </KeyboardAvoidingView>
  );
}

export default AuthMessage

