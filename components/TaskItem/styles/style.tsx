import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    taskContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: '#F0F0F0',
    },
    taskTitle: {
      flex: 1,
      fontSize: 16,
      color: '#333',
    },
    taskActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deleteButton: {
      color: 'red',
      marginLeft: 10,
    },
    taskDone: {
      backgroundColor: '#D3FFD3',
    },
  });

export default styles;