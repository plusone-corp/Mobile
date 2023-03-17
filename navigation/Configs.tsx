import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Main: {
            screens: {
              MainScreen: 'MainScreen',
              DiscoveryScreen: 'DiscoveryScreen',
            },
          },
          Profile: {
            screens: {
                ProfileScreen: 'ProfileScreen',
            },
          },
        },
      },
      Authentication: {
        screens: {
          Register: "Register",
          LogIn: "LogIn",
          ForgotPassword: "ForgotPassword"
        }
      },
      Setting: 'modal',
      NotFound: '*',
      Splash: ""
    },
  },
};

export default linking;