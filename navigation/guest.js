import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../views/auth/login/Login';

const AppNavigator = createStackNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: () => ({
				title: 'Login',
				header: null,
			})
		},
	},
	{
		initialRouteName: 'Login',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#0099D8'
			},
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#fff',
				fontWeight: 'bold'
			}
		}
	}
);

export default createAppContainer(AppNavigator);