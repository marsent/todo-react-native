
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Task from './components/Task'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllTask from './components/AllTask'
import { AppContext } from './context/AppProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CompletedTasks from './components/CompletedTasks';
import UncompleteTask from './components/UncompleteTask';

const Tab = createBottomTabNavigator();

const App = () => {
  const [value, setValue] = useState('')
  const [todos, setTodos] = useState([])
  handleAddTodo = () => {
    if (value.length > 0) {
      setTodos([...todos, { name: value, key: Date.now(), checked: false }])
      setValue('')
    }
  }

  handleDeleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        if (todo.key !== id) return true
      })
    )
  }

  handleChecked = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.key === id) todo.checked = !todo.checked;
        return todo;
      })
    )
  }

  useEffect(async () => {
    let data = await AsyncStorage.getItem('taskListData');
    setTodos(JSON.parse(data))
  }, [])
  useEffect(async () => {
    return await AsyncStorage.setItem('taskListData', JSON.stringify(todos));
  }, [todos]);
  const props = {
    value,
    setValue,
    todos,
    setTodos,
    handleAddTodo,
    handleChecked,
    handleDeleteTodo
  }
  return (
    <AppContext.Provider value={props}>
      <View style={styles.container}>
        <Text style={styles.title}>Today's Task</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={false}
            onChangeText={(value) => setValue(value)}
            placeholder='Write a Task'
            placeholderTextColor="black"
            value={value}
            mode='outlined'
            focusable={false}
          />
          <TouchableOpacity onPress={() => handleAddTodo()}>
            <Icon name="plus" size={25} color="black" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
      <NavigationContainer
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Navigator >
          <Tab.Screen
            name="All Task"
            component={AllTask}
            options={{
              tabBarLabel: "AllTask",
              tabBarIcon: ({ color, size }) => (
                <Icon name='tasks' color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Completed"
            component={CompletedTasks}
            options={{
              tabBarLabel: "Completed",
              tabBarIcon: ({ color, size }) => (
                <Icon name='check-circle' color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Unomplete"
            component={UncompleteTask}
            options={{
              tabBarLabel: "Uncompleted",
              tabBarIcon: ({ color, size }) => (
                <Icon name='circle' color={color} size={20} />
              ),
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )


}
export default App
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
  },
  title: {
    marginTop: 10,
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  textInput: {
    width: "90%",
    height: 50,
    borderRadius: 20,
    borderColor: '#E4E6E8',
    borderWidth: 1,
    paddingHorizontal: 20,
    fontSize: 18,
    fontFamily: "Inter"

  },

  textInputContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgb(222,222,222)',
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 25

  },
  viewTask: { width: '100%', paddingHorizontal: 20 },
  navigation: {

  }

});