import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 32,
    },
    appTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 32,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    input: {
      flex: 1,
      height: 40,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginEnd: 10,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontSize: 18,
      color: '#999999',
    },
  });

  export default styles;