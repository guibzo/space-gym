import {
  LucideArrowLeft,
  LucideChevronRight,
  LucideCircleUserRound,
  LucideDumbbell,
  LucideHistory,
  LucideHome,
  LucideIcon,
  LucideLogOut,
  LucidePersonStanding,
  LucideRepeat,
  LucideSearchX,
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
interopIcon(LucideArrowLeft)
interopIcon(LucideSearchX)
interopIcon(LucidePersonStanding)
interopIcon(LucideDumbbell)
interopIcon(LucideRepeat)

export {
  LucideArrowLeft,
  LucideChevronRight,
  LucideCircleUserRound,
  LucideDumbbell,
  LucideHistory,
  LucideHome,
  LucideLogOut,
  LucidePersonStanding,
  LucideRepeat,
  LucideSearchX,
  LucideUser,
}
