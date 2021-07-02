import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {

                // Signed in 
                let user = userCredential.user;
                user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl ? imageUrl : "https://source.unsplash.com/random"
                }).catch(function(error){
                    alert(error.message)
                });

            })
            .catch((error) => {
                alert(error.message)
            });
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
                placeholder="Enter your name"
                label='Name'
                leftIcon={{ type: 'material', name: 'badge' }}
                value={name}
                onChangeText={text => setName(text)}
            />
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
            <Input
                placeholder="Enter your image url"
                label='Profil Pic Url'
                leftIcon={{ type: 'material', name: 'face' }}
                value={imageUrl}
                onChangeText={text => setImageUrl(text)}
            />
            <Button title="Register" onPress={register} />
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
});