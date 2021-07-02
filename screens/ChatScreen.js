import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ChatScreen = () => {
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