import React, { Fragment } from 'react'
import { VStack } from '../ui/vstack'
import { FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '../ui/form-control'
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { CircleAlert } from 'lucide-react-native'
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form"
import { Input, InputField } from '../ui/input';
import { Modal, ModalBackdrop, ModalContent } from '../ui/modal';
import { HStack } from '../ui/hstack';

interface Props<T extends FieldValues> {
  control: Control<T>,
  name: Path<T>,
  errors: FieldErrors<T>,
  placeholder?: string,
  label?: string,
  helperText?: string,
}

const FormDatePicker = <T extends FieldValues>({
  label,
  name,
  control,
  placeholder,
  helperText,
  errors,
}: Props<T>) => {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <VStack>
      {label && (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
      )}
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Fragment>
            <Input
              variant="outline"
            // isReadOnly
            >
              <InputField
                variant='outline'
                placeholder={placeholder}
                value={dayjs(value).isValid() ? dayjs(value).format('DD-MM-YYYY') : ''}
                readOnly
                onPress={() => setShowModal(true)}
              />
            </Input>
            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false)
              }}
              size='lg'
            >
              <ModalBackdrop />
              <ModalContent>
                <DateTimePicker
                  maxDate={dayjs().add(1, 'day')}
                  mode="single"
                  date={value}
                  onChange={({ date }) => {
                    setShowModal(false)
                    onChange(date)
                  }}
                />
              </ModalContent>
            </Modal>
          </Fragment>
        )}
      />
      {helperText && (
        <FormControlHelper>
          <FormControlHelperText>
            {helperText}
          </FormControlHelperText>
        </FormControlHelper>
      )}
      {errors?.[name] && (
        <FormControlError>
          <FormControlErrorIcon as={CircleAlert} />
          <FormControlErrorText>
            {(errors[name]?.message || '') as string}
          </FormControlErrorText>
        </FormControlError>
      )}
    </VStack>
  )
}

export default FormDatePicker
