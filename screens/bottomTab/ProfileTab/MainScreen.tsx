import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/components/themed';
import { ProfileStackScreenProps } from '../../../types';

export default function MainScreenProfileTabScreen({ navigation }: ProfileStackScreenProps<'MainScreen'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Main screen of Profile tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});