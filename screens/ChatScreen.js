import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { auth,db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

      useLayoutEffect(()=>{
          const getMessages = db.collection('chats').orderBy('createdAt', 'desc').onSnapshot(
              snapshot => setMessages(
                  snapshot.docs.map(
                      doc => ({
                          _id: doc.data()._id,
                          createdAt: doc.data().createdAt.toDate(),
                          text: doc.data().text,
                          user: doc.data().user
                      })
                  )
              )
          );
          return getMessages;
      },[])

      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0];
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        })
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
                        <Text>{auth?.currentUser?.displayName}</Text>
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

    const signOut = async () => {
        await db.collection('chats').add({
            _id: uuid.v4(),
            createdAt:new Date(),
            text: 'Im out!',
            user: {
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
              }
        });
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
        showAvatarForEveryMessage={true}
        renderUsernameOnMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name: auth?.currentUser?.displayName,
          avatar: auth?.currentUser?.photoURL
        }}
      />
    )
}

export default ChatScreen