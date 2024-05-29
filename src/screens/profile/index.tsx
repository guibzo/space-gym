import fallbackAvatarImg from '@/assets/userPhotoDefault.png'
import { AppHeaderContainer } from '@/components/app-header-container'
import { LucideUser } from '@/components/icons'
import { AppLayout } from '@/components/layouts/app'
import { LoadingIndicator } from '@/components/loading-indicator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/hooks/use-auth'
import { api } from '@/lib/axios'
import { Div, H3 } from '@expo/html-elements'
import { zodResolver } from '@hookform/resolvers/zod'
import { getInfoAsync } from 'expo-file-system'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, ScrollView } from 'react-native'
import { updateProfileSchema, type UpdateProfileSchema } from './update-profile-schema'

export const ProfileScreen = () => {
  const [isUpdatingUserProfile, setIsUpdatingUserProfile] = useState(false)
  const { userData, updateUserProfile } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    resetField,
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    mode: 'onChange',
    defaultValues: {
      name: userData?.name,
      email: userData?.email,
    },
  })

  if (!userData) {
    return null
  }

  const userAvatar = `${api.defaults.baseURL}/avatar/${userData?.avatar}`

  const handleSelectAvatarImage = async () => {
    try {
      const selectedImage = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (selectedImage.canceled) return

      if (selectedImage.assets[0].uri) {
        const photoInfo = await getInfoAsync(selectedImage.assets[0].uri)

        // 5mb
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return Alert.alert('Escolha uma imagem de no máximo 5MB.')
        }

        const fileExtension = selectedImage.assets[0].uri.split('.').pop()

        const sanitizedImageName = `${userData.name}.${fileExtension}`
          .trim()
          .split(' ')
          .join('-')
          .toLowerCase()

        const avatarImageFile = {
          name: sanitizedImageName,
          uri: selectedImage.assets[0].uri,
          type: selectedImage.assets[0].mimeType,
        } as any

        const avatarImageUploadForm = new FormData()
        avatarImageUploadForm.append('avatar', avatarImageFile)

        await handleUpdateUserAvatar({ avatarImageUploadForm })
      }
    } catch (error: any) {
      Alert.alert(
        error.response.data.message ??
          'Tivemos um erro ao carregar seu avatar. Tente novamente mais tarde.'
      )
    }
  }

  const handleUpdateUserAvatar = async ({
    avatarImageUploadForm,
  }: {
    avatarImageUploadForm: FormData
  }) => {
    try {
      const { data: updateAvatarResponse } = await api.patch(
        '/users/avatar',
        avatarImageUploadForm,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      await updateUserProfile({
        ...userData,
        avatar: updateAvatarResponse.avatar,
      })

      Alert.alert('Avatar atualizado com sucesso!')
    } catch (error: any) {
      Alert.alert(
        `${error.response.data.message ?? 'Não foi possível carregar os detalhes do exercício.'}`
      )
    }
  }

  const handleUpdateProfile = async ({ name, newPassword, oldPassword }: UpdateProfileSchema) => {
    try {
      setIsUpdatingUserProfile(true)

      await api.put('/users', {
        password: newPassword,
        old_password: oldPassword,
        name,
      })

      await updateUserProfile({
        ...userData,
        name,
      })

      resetField('oldPassword')
      resetField('newPassword')
      resetField('confirmNewPassword')

      Alert.alert('Perfil atualizado com sucesso!')
    } catch (error: any) {
      Alert.alert(
        error.response.data.message ?? 'Erro ao atualizar perfil. Tente novamente mais tarde.'
      )
    } finally {
      setIsUpdatingUserProfile(false)
    }
  }

  return (
    <>
      <AppHeaderContainer>
        <Div className='flex w-full items-center justify-center'>
          <H3 className='font-semibold text-neutral-100'>Perfil</H3>
        </Div>
      </AppHeaderContainer>

      <AppLayout>
        <ScrollView
          className='w-full'
          contentContainerClassName='items-center flex pb-3 pt-1'
        >
          <Avatar
            className='size-[148px] m-0 p-0 border-2 border-neutral-700'
            alt="Zach Nugent's Avatar"
          >
            <AvatarImage source={userAvatar ? { uri: userAvatar } : fallbackAvatarImg} />
            <AvatarFallback>
              <LucideUser
                size={74}
                className='text-neutral-400'
              />
            </AvatarFallback>
          </Avatar>

          <Button
            variant='ghost'
            onPress={handleSelectAvatarImage}
            className='mt-2'
          >
            <Text className='text-primary text-lg font-semibold'>Alterar foto</Text>
          </Button>

          <Div className='flex flex-col gap-2 w-full mt-8'>
            <Div className='flex flex-col gap-1'>
              <Controller
                control={control}
                name='name'
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder='Digite seu nome'
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />

              {errors.name && <Text className='m-0 text-red-500'>{errors.name.message}</Text>}
            </Div>

            <Div className='flex flex-col gap-1'>
              <Controller
                control={control}
                name='email'
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder='Digite seu e-mail'
                    keyboardType='email-address'
                    onChangeText={onChange}
                    value={value}
                    editable={false}
                  />
                )}
              />

              {errors.email && <Text className='m-0 text-red-500'>{errors.email.message}</Text>}
            </Div>
          </Div>

          <Div className='flex flex-col gap-4 w-full mt-8'>
            <Text className='text-lg font-semibold'>Alterar senha</Text>

            <Div className='flex flex-col gap-2'>
              <Div className='flex flex-col gap-1'>
                <Controller
                  control={control}
                  name='oldPassword'
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder='Senha antiga'
                      secureTextEntry
                      onChangeText={(text) => {
                        onChange(text)
                        setValue('oldPassword', text === '' ? undefined : text)
                        trigger('oldPassword')
                      }}
                      value={value ?? undefined}
                    />
                  )}
                />

                {errors.oldPassword && (
                  <Text className='m-0 text-red-500'>{errors.oldPassword.message}</Text>
                )}
              </Div>

              <Div className='flex flex-col gap-1'>
                <Controller
                  control={control}
                  name='newPassword'
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder='Nova senha'
                      secureTextEntry
                      onChangeText={(text) => {
                        onChange(text)
                        setValue('newPassword', text === '' ? undefined : text)
                        trigger('newPassword')
                      }}
                      value={value ?? undefined}
                    />
                  )}
                />

                {errors.newPassword && (
                  <Text className='m-0 text-red-500'>{errors.newPassword.message}</Text>
                )}
              </Div>

              <Div className='flex flex-col gap-1'>
                <Controller
                  control={control}
                  name='confirmNewPassword'
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      placeholder='Confirmar nova senha'
                      secureTextEntry
                      onChangeText={(text) => {
                        onChange(text)
                        setValue('confirmNewPassword', text === '' ? undefined : text)
                        trigger('confirmNewPassword')
                      }}
                      value={value ?? undefined}
                    />
                  )}
                />

                {errors.confirmNewPassword && (
                  <Text className='m-0 text-red-500'>{errors.confirmNewPassword.message}</Text>
                )}
              </Div>
            </Div>

            <Button onPress={handleSubmit(handleUpdateProfile)}>
              {isUpdatingUserProfile ? (
                <LoadingIndicator />
              ) : (
                <Text className='bg-primary text-lg font-semibold'>Atualizar</Text>
              )}
            </Button>
          </Div>
        </ScrollView>
      </AppLayout>
    </>
  )
}
