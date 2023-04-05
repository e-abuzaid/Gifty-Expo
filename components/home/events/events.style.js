import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 10,
      borderBottomColor: '#875fb6',
      borderBottomWidth: 1,
    },
    heading: {
      fontSize: 20,
      fontWeight: 500,
      color: '#ddd',
      marginBottom: 20
    },
    btnContainer: {
      height: 200,
      justifyContent: 'center',
      alignItems: 'center'
    },
    btn: {
      fontSize: 50,
      fontWeight: 'bold',
      borderColor: '#000',
      height: 60,
      width: 60,
      borderRadius: 60,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd'
    },
    btnText: {
      fontSize: 40,
      color: '#666'
    }
  });

  export default styles