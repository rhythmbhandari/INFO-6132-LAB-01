import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from './styles/style';
import { Task } from '@/types/types';

type Props = {
  task: Task;
  onToggleTaskStatus: (id: number) => void;
  onDeleteTask: (id: number) => void;
};

const TaskItem: React.FC<Props> = ({ task, onToggleTaskStatus, onDeleteTask }) => {
  return (
    <View style={[styles.taskContainer, task.status && styles.taskDone]}>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <View style={styles.taskActions}>
        <Switch
          value={task.status}
          onValueChange={() => onToggleTaskStatus(task.id)}
          accessible={true}
          accessibilityLabel={`Toggle task ${task.title}`}
        />
        <TouchableOpacity
          onPress={() => onDeleteTask(task.id)}
          accessible={true}
          accessibilityLabel={`Delete task ${task.title}`}
        >
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskItem;
