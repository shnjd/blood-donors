import React, { Fragment } from 'react'
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Button, ButtonText } from '../ui/button';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text'
import { CloseIcon, Icon } from '@/components/ui/icon'
import { Divider } from '../ui/divider';

type Props = {}

const RolesHelp = (props: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Fragment>
      <Button variant='link' className='self-end' onPress={() => setShowModal(true)}>
        <ButtonText>What are roles?</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Staff Roles
            </Heading>
            <ModalCloseButton >
              <Icon as={CloseIcon} size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text size='md' bold className='mt-2 mb-1'>Staff</Text>
            <Text size="sm" className="text-typography-500">
              Staffs are users who can add donors and modify details related blood donation.
            </Text>

            <Text size='md' bold className='mt-3 mb-1'>Staff - Elevated</Text>
            <Text size="sm" className="text-typography-500">
              Apart from Staff's ability, Elevated Staffs can modify or delete donors.
            </Text>

            <Text size='md' bold className='mt-3 mb-1'>Administrator</Text>
            <Text size="sm" className="text-typography-500">
              Admins can add, modify or delete both donors and other staffs.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Okay</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );

}

export default RolesHelp
