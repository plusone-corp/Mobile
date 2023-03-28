import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/components/themed';
import { RootStackScreenProps } from '../../types';

export default function SettingModal({ navigation }: RootStackScreenProps<'Setting'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the setting modal</Text>
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