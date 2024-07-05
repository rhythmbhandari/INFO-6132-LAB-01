import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, View, Text, ActivityIndicator } from 'react-native';
import styles from './styles/style';
import TaskItem from '@/components/TaskItem/taskItem';
import { Task } from '@/types/types';
import { FIREBASE_DB } from '@/database/config';
import { addDoc, collection, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const addTask = async () => {
    if (newTaskTitle.trim() === '') {
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(FIREBASE_DB, 'tasks'), {
        title: newTaskTitle,
        status: false
      });
      setNewTaskTitle('');
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const tasksRef = collection(FIREBASE_DB, 'tasks');

    const subscriber = onSnapshot(tasksRef, (snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(updatedTasks);
      setLoading(false);
    });

    return () => subscriber();
  }, []);

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const updatedStatus = !task.status;
      await updateDoc(doc(FIREBASE_DB, `tasks/${id}`), { status: updatedStatus });
    }
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(FIREBASE_DB, `tasks/${id}`));
  };

  const renderItem = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggleTaskStatus={toggleTaskStatus}
      onDeleteTask={deleteTask}
    />
  );

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
          disabled={!newTaskTitle.trim() || loading}
        />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks yet.</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default App;