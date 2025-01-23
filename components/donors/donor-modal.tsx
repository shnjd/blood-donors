import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import { Heading } from '@/components/ui/heading';
import { Fragment, useEffect, useState } from 'react';
import { CloseIcon } from '../ui/icon';
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { Database } from '@/lib/database.types';
import { HStack } from '../ui/hstack';
import { Divider } from '../ui/divider';
import dayjs from 'dayjs';
import { useArea } from '@/lib/queries/area';
import { BloodGroup, StaffRoles } from '@/lib/constants/enums';
import { VStack } from '../ui/vstack';
import { Button, ButtonText } from '../ui/button';
import { useRouter } from 'expo-router';
import { useUser } from '@/lib/queries/auth';

interface Props {
  donor: Database['public']['Tables']['Donors']['Row'],
  close: () => void,
  remove: () => void,
  modify: () => void
}
export default function DonorModal({ donor, close, remove, modify }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { data: area } = useArea(donor.area_committee)
  const { data: user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (donor) setShowModal(true)
  }, [donor])

  const handleClose = () => {
    setShowModal(false)
    close()
  }

  const handleEdit = () => {
    router.push(`/app/edit-donor?donorId=${donor.id}`)
    close()
  }

  return (
    <Modal
      isOpen={showModal}
      onClose={handleClose}
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size='lg'>
            {donor.name}
          </Heading>
          <ModalCloseButton >
            <Icon as={CloseIcon} size="xl"
              className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Divider className='mt-2 mb-4' />

          {(donor?.blood_group === BloodGroup.OTHER && donor.other_blood_group) ? (
            <HStack className='justify-between py-1'>
              <Text className='text-primary-950'>Other Blood Group</Text>
              <Text className='text-primary-950' bold>{donor?.other_blood_group || 'Unavailable'}</Text>
            </HStack>
          ) : (
            <HStack className='justify-between py-1'>
              <Text className='text-primary-950'>Blood Group</Text>
              <Text className='text-primary-950' bold>{donor?.blood_group || 'Unavailable'}</Text>
            </HStack>
          )}
          <HStack className='justify-between py-1'>
            <Text className='text-primary-950'>Place</Text>
            <Text className='text-primary-950' bold>{donor?.place || 'Unavailable'}</Text>
          </HStack>
          <HStack className='justify-between py-1'>
            <Text className='text-primary-950'>Last Donated on</Text>
            <Text className='text-primary-950' bold>{dayjs(donor.last_donated_on).isValid() ? dayjs(donor.last_donated_on).format('DD-MM-YYYY') : 'Unavailable'}</Text>
          </HStack>
          <HStack className='justify-between py-1'>
            <Text className='text-primary-950'>Hospital</Text>
            <Text className='text-primary-950' bold>{donor?.donation_hospital || 'N/A'}</Text>
          </HStack>
          <HStack className='justify-between py-1'>
            <Text className='text-primary-950'>Phone Number</Text>
            <Text className='text-primary-950' bold>{donor.phone || 'Unavailable'}</Text>
          </HStack>
          {donor?.phone_alt && (
            <HStack className='justify-between py-1'>
              <Text className='text-primary-950'>Alternative Phone Number</Text>
              <Text className='text-primary-950' bold>{donor.phone_alt || 'Unavailable'}</Text>
            </HStack>
          )}
          {area && (
            <HStack className='justify-between py-1'>
              <Text className='text-primary-950'>Area Committee</Text>
              <Text className='text-primary-950' bold>{area[0]?.name || 'Unavailable'}</Text>
            </HStack>
          )}
          <HStack className='justify-between py-1'>
            <Text className='text-primary-950'>Donation Count</Text>
            <Text className='text-primary-950' bold>{donor.donation_count || 'Unavailable'}</Text>
          </HStack>
          {donor?.address && (
            <VStack className='pt-3 pb-1 gap-1'>
              <Text className='text-primary-950'>Address</Text>
              <Text className='text-primary-950' bold>{donor.address || 'Unavailable'}</Text>
            </VStack>
          )}
          {donor?.comments && (
            <VStack className='pt-3 pb-1 gap-1'>
              <Text className='text-primary-950'>Comments</Text>
              <Text className='text-primary-950' bold>{donor.comments || 'Unavailable'}</Text>
            </VStack>
          )}

          <Divider className='my-4' />
          <VStack className='gap-3'>
            <Button onPress={modify}>
              <ButtonText>Modify Donation Info</ButtonText>
            </Button>
            {(user?.user_metadata?.role === StaffRoles.ADMIN || user?.user_metadata?.role === StaffRoles.STAFF_ELEVATED) && (
              <Fragment>
                <Button onPress={handleEdit}>
                  <ButtonText>Edit Donor</ButtonText>
                </Button>
                <Button action='negative' onPress={remove}>
                  <ButtonText>Delete Donor</ButtonText>
                </Button>
              </Fragment>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

