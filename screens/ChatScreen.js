import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

const ChatScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{
                    marginLeft: 20
                }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }} />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={signOut} style={{
                    marginRight: 20
                }}>
                    <AntDesign name="logout" size={24} color="black" />
                </TouchableOpacity>
            )
        })

    }, [])

    const signOut = () => {
        auth.signOut().then(
            () => {
                navigation.replace('Login');
            }
        ).catch(error => {
            console.log(error);
        })
    }

    return (
        <View style={styles.container}>
            <Text>Chat Screen</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
});