import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/components/themed';
import { AuthStackScreenProps } from '../../types';
import { useContext } from 'react';
import { AuthContext } from '../../constants/AuthContext';

export default function LogInScreen({ navigation }: AuthStackScreenProps<'LogIn'>) {

  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is login screen.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Register')} style={styles.link}>
        <Text style={styles.linkText}>Go to register screen!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('ForgotPassword')} style={styles.link}>
        <Text style={styles.linkText}>Go to forgot password screen!</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signIn({ username: "admin", password: "admin" })} style={styles.link}>
        <Text style={styles.linkText}>LogIn</Text>
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