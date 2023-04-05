import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#22004b',
    height: '100%'
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative'
  },
  info: {
    padding: 5,
    paddingLeft: 15,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  name: {
    fontSize: 80,
    fontWeight: 500,
    color: '#ddd'
  },
  relation: {
    fontSize: 20,
    fontWeight: 500,
    color: '#ddd',
    marginBottom: 10,
  },
  occupation: {
    fontSize: 17,
    // fontWeight: 500,
    color: '#ddd',
    marginBottom: 10,
  },
  birthday: {
    fontSize: 17,
    // fontWeight: 500,
    color: '#ddd',
    marginBottom: 1,
  },
  birthdayDate: {
    fontSize: 12,
    // fontWeight: 500,
    color: '#ddd',
    marginBottom: 4,
  },
  interest: {
    padding: 5,
    backgroundColor: '#ddd',
    color: '#444',
    borderRadius: 10,
    fontSize: 12,
    marginBottom: 5,
    maxWidth: '80%',
    textAlign: 'center'
  },

});

export default styles;
