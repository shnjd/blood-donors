import React, { useState } from 'react'
import { VStack } from '../ui/vstack'
import { FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from '../ui/form-control'
import { Input, InputField, InputIcon, InputSlot } from '../ui/input'
import { CircleAlert, EyeIcon, EyeOffIcon } from 'lucide-react-native'
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form"

interface Props<T extends FieldValues> {
  control: Control<T>,
  name: Path<T>,
  errors: FieldErrors<T>,
  inputSize?: 'sm' | 'md' | 'lg' | 'xl'
  placeholder?: string,
  label?: string,
  isPassword?: boolean,
  helperText?: string,
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  secureTextEntry?: boolean,
  keyboardType?: 'numeric' | 'email-address',
  numberOfLines?: number
}

const FormInput = <T extends FieldValues>({
  label,
  name,
  control,
  isPassword = false,
  inputSize = 'lg',
  placeholder,
  helperText,
  errors,
  autoCapitalize = 'sentences',
  secureTextEntry = false,
  keyboardType,
  numberOfLines
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false)

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
          <Input
            size={inputSize}
            className='bg-white/50'
            isInvalid={!!errors?.[name]}
          >
            <InputField
              type={(!isPassword || showPassword) ? 'text' : 'password'}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              autoCapitalize={autoCapitalize}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              numberOfLines={numberOfLines}
              multiline={!!numberOfLines && numberOfLines > 1}
            />
            {isPassword && (
              <InputSlot className="pr-3" onPress={() => setShowPassword(prev => !prev)}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            )}
          </Input>
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

export default FormInput
