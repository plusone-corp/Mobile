import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../../components/components/themed';
import { AuthStackScreenProps } from '../../types';

export default function ForgotPasswordScreen({ navigation }: AuthStackScreenProps<'ForgotPassword'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is forgot password screen.</Text>
      <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.push("LogIn")} style={styles.link}>
        <Text style={styles.linkText}>Go to login screen!</Text>
      </TouchableOpacity>
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