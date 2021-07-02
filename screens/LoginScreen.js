import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

const LoginScreen = ({ navigation }) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter your email"
                label='Email'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder="Enter your password"
                label='Password'
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title="Login" onPress={() => alert('Login')} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
});