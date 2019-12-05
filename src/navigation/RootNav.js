import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MemberNav from './MemberNav'
import Splash from '../screens/Splash'
import GuestNav from './GuestNav'

const RootNavigator = createSwitchNavigator({
    Splash: Splash,
    GuestNav: GuestNav,
    MemberNav : MemberNav
}
)

export default createAppContainer(RootNavigator)