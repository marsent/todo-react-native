import React, { useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Task from './Task'
import { AppContext } from '../context/AppProvider'

export default function CompletedTasks() {
    const todos = useContext(AppContext).todos;
    return (<ScrollView style={styles.viewTask}>
        {todos.map(task => {
            if (task.checked == true) {
                return <Task
                    {...task}
                    handleChecked={() => handleChecked(task.key)}
                    handleDeleteTodo={() => handleDeleteTodo(task.key)}
                    key={task.key} />
            }

        })}
    </ScrollView>
    )
}

const styles = StyleSheet.create({

    viewTask: { width: '100%', paddingHorizontal: 20 }

});