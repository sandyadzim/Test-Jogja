import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Details from '../screens/Details';
import Home from '../screens/Home';
import Logout from '../screens/Logout';
import Mapp from '../screens/Mapp'

const MemberNav = createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions:{
            header: null
        }
    },
    Details : {
        screen: Details,
        navigationOptions:{
            header: null
        }
    },
    Logout: {
        screen: Logout,
        navigationOptions:{
            header:null
        }
    },
    Mapp:{
        screen: Mapp,
        navigationOptions:{
            header: null
        }
    }
},
{
    initialRouteName: 'Home'
})

export default createAppContainer(MemberNav);