import { ReactNode } from 'react'
import { Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './style'

import BackgroundImg from '@/assets/background.png'
import LogoSvg from '@/assets/logo.svg'
import { Div } from '@expo/html-elements'

export const WithImageBGLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Div className='bg-neutral-900 flex-1'>
      <Image
        resizeMode='contain'
        className='absolute'
        alt='Pessoas treinando'
        source={BackgroundImg}
      />

      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />

        <LogoSvg />

        {children}
      </SafeAreaView>
    </Div>
  )
}
