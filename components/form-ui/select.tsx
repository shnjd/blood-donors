import React from 'react'
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '../ui/select'
import { ChevronDownIcon, CircleAlert } from 'lucide-react-native'
import { VStack } from '../ui/vstack'
import { Control, Path, FieldErrors, FieldValues, Controller } from 'react-hook-form'
import { FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '../ui/form-control'

interface ISelectOption {
  label: string,
  value: string
}

interface Props<T extends FieldValues> {
  control: Control<T>,
  name: Path<T>,
  errors: FieldErrors<T>,
  options: ISelectOption[],
  inputSize?: 'sm' | 'md' | 'lg' | 'xl'
  placeholder?: string,
  label?: string,
  helperText?: string,
}

const FormSelect = <T extends FieldValues>({
  label,
  name,
  control,
  options,
  inputSize = 'lg',
  placeholder,
  helperText,
  errors,
}: Props<T>) => {
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
          <Select selectedValue={value} onValueChange={onChange}>
            <SelectTrigger variant="outline" className='items-center' size={inputSize}>
              <SelectInput className='grow' placeholder={placeholder || 'Select'} />
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {options.map(o => (
                  <SelectItem key={o.label} label={o.label} value={o.value} />
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
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

export default FormSelect
