import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper'
const Task = (props) => {
    const today = new Date();
    return (


        <View style={[styles.item, props.checked ? styles.backgroundChecked : '']}>
            <Checkbox
                onPress={() => props.handleChecked()}
                status={props.checked ? 'checked' : 'unchecked'}
                color='#F8FBFD'

            />
            <Text style={[styles.taskName, props.checked ? styles.textChecked : '']}>{props.name}</Text>
            <TouchableOpacity
                onPress={() => props.handleDeleteTodo()}
            >
                <Icon
                    name='trash-can'
                    style={[styles.icon]}

                />
            </TouchableOpacity>
        </View>
    )
}

export default Task

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 50,
        borderColor: '#FBFBFB',
        backgroundColor: '#FFFFFF',
        elevation: 5
    },
    taskName: {
        fontSize: 20,
        color: '#070707',
        fontWeight: '800',
        fontFamily: 'Inter'

    },
    textChecked: {
        textDecorationLine: 'line-through',
        // color: '#FFFFFF'
        color: '#DBE1E8'
    },
    backgroundChecked: {
        backgroundColor: '#60D8B2',
    }, icon: {
        fontSize: 32
    }
})
