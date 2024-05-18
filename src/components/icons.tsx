import {
  LucideChevronRight,
  LucideCircleUserRound,
  LucideHistory,
  LucideHome,
  LucideIcon,
  LucideLogOut,
  LucideUser,
} from 'lucide-react-native'
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
interopIcon(LucideLogOut)
interopIcon(LucideUser)
interopIcon(LucideChevronRight)

export {
  LucideChevronRight,
  LucideCircleUserRound,
  LucideHistory,
  LucideHome,
  LucideLogOut,
  LucideUser,
}
