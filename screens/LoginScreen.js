import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password)
        .catch(error => {
            alert(error.message);
        })
    }
    useEffect(()=>{
        const isSigned = auth.onAuthStateChanged(user => {
            if (user) {
                console.log('User Signed: ', user)
                // user is signed
            } else {
                // no user signed
            }
        });
        return isSigned;
    },[])

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
            <Button title="Login" onPress={signIn} />
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