import React, { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import App from '../App';

export const AppContext = React.createContext();

export function useApp() {
    return useContext(AppContext)
}

export function AppProvider({ children }) {
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
    const props = {
        value,
        setValue,
        todos,
        setTodos,
        handleAddTodo,
        handleChecked,
        handleDeleteTodo
    }
    useEffect(async () => {
        let data = await AsyncStorage.getItem('taskListData');
        setTodos(JSON.parse(data))
    }, [])
    useEffect(async () => {
        return await AsyncStorage.setItem('taskListData', JSON.stringify(todos));
    }, [todos]);
    return <AppContext.Provider value={props}>
        {children}
    </AppContext.Provider>
}