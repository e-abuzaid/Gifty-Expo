import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // container: {
    //   height: 80,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingBottom: 10,
    //   padding: 20,
    //   // borderBottomColor: '#ccc',
    //   // borderBottomWidth: 1,
    // },
    container: {
      // display: 'flex',
      width: '100%',
      // justifyContent: 'center',
      // alignItems: 'center',
      position: 'relative'
    },
    img: {
      width: '100%',
      height: 300,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    overlay: {
      width: '100%',
      height: 300,
      position: 'absolute',
      bottom: 0,
      // alignItems: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#00000090',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20
    },
    name: {
      fontWeight: 500,
      color: '#ddd',
      bottom: 10,
      opacity: 1,
      marginTop: 10,
      textAlign: 'center',
      alignSelf: 'flex-end'

    },
    title: {
      fontSize: 50,
      fontWeight: 'bold',
      color: '#ddd',
      alignSelf: 'flex-end'
    },
    btn: {
      alignSelf: 'flex-start'
    },
    btnText: {
      backgroundColor: '#ddd',
      padding: 7,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10,
      fontWeight: 500,
    }
  });

  export default styles