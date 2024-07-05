import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, View, Text } from 'react-native';
import styles from './styles/style';
import TaskItem from '@/components/TaskItem/taskItem';
import { Task } from '@/types/types';

const App = () => {
  const [tasks, setTasks] = useState<{ [key: number]: Task }>({});
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      return;
    }
    
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      status: false,
    };
  
    setTasks(prevTasks => ({
      ...prevTasks,
      [newTask.id]: newTask,
    }));
    setNewTaskTitle('');
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [id]: {
        ...prevTasks[id],
        status: !prevTasks[id].status,
      },
    }));
  };
  
  const deleteTask = (id: number) => {
    const { [id]: deletedTask, ...remainingTasks } = tasks;
    setTasks(remainingTasks);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>ToDo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <Button
          title="Add Task"
          onPress={addTask}
          disabled={!newTaskTitle.trim()}
        />
      </View>
      <FlatList
        data={Object.values(tasks)}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggleTaskStatus={toggleTaskStatus}
            onDeleteTask={deleteTask}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default App;