import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from './styles/style';
import { Task } from '@/types/types';

interface TaskItemProps {
  task: Task;
  onToggleTaskStatus: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleTaskStatus, onDeleteTask }) => {
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
