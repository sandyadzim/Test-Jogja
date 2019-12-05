import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Details from '../screens/Details';
import Home from '../screens/Home';

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
},
{
    initialRouteName: 'Home'
})

export default createAppContainer(MemberNav);