import { LucideCircleUserRound, LucideHistory, LucideHome, LucideIcon } from 'lucide-react-native'
import { cssInterop } from 'nativewind'

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })
}

interopIcon(LucideHome)
interopIcon(LucideHistory)
interopIcon(LucideCircleUserRound)

export { LucideCircleUserRound, LucideHistory, LucideHome }
