import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import SignInScreen from '../screens/Signin';
import PasswordScreen from '../screens/Signin/password';
import HomeScreen from '../screens/Home';
import AuthLoadingScreen from '../screens/AuthLoading';
import CommitsScreen from '../screens/Commits';

const AppStack = createStackNavigator({ Home: HomeScreen, Commits: CommitsScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen, Password: PasswordScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);