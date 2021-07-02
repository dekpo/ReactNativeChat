import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { auth } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Bonjour developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])

      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])

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
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
}

export default ChatScreen