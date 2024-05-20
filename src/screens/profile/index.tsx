import { AppHeaderContainer } from '@/components/app-header-container'
import { LucideUser } from '@/components/icons'
import { AppLayout } from '@/components/layouts/app'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Div, H3 } from '@expo/html-elements'
import { getInfoAsync } from 'expo-file-system'
import { MediaTypeOptions, launchImageLibraryAsync } from 'expo-image-picker'
import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'

export const ProfileScreen = () => {
  const [userAvatarUri, setUserAvatarUri] = useState<string | undefined>(undefined)

  const handleSelectAvatarImage = async () => {
    try {
      const selectedImage = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (selectedImage.canceled) {
        return
      }

      if (selectedImage.assets[0].uri) {
        const photoInfo = await getInfoAsync(selectedImage.assets[0].uri)

        // 5mb
        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return Alert.alert('Escolha uma imagem de no máximo 5MB.')
        }

        setUserAvatarUri(selectedImage.assets[0].uri)
      }
    } catch (err) {
      console.log(err)
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
            <AvatarImage source={{ uri: userAvatarUri ?? undefined }} />
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
            <Input
              placeholder='Digite seu nome'
              value='Guilherme Viana'
            />

            <Input
              placeholder='Digite seu e-mail'
              keyboardType='email-address'
              value='iml18@hotmail.com'
              editable={false}
            />
          </Div>

          <Div className='flex flex-col gap-4 w-full mt-8'>
            <Text className='text-lg font-semibold'>Alterar senha</Text>

            <Div className='flex flex-col gap-2'>
              <Input
                placeholder='Senha antiga'
                secureTextEntry
              />

              <Input
                placeholder='Nova senha'
                secureTextEntry
              />
            </Div>

            <Button>
              <Text className='bg-primary text-lg font-semibold'>Atualizar</Text>
            </Button>
          </Div>
        </ScrollView>
      </AppLayout>
    </>
  )
}
