import { StyleSheet } from 'react-native';
// light: #875fb6
// dark: #22004b
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#875fb6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#22004b',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    color: '#ddd',
  },
  image: {
    width: '100px',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ddd'
  },
  button: {
    backgroundColor: '#22004b',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ddd',
    textAlign: 'center',
    fontWeight: 500,
  },
  interestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  interestInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#22004b',
    padding: 10,
    marginRight: 10,
  },
  interestButton: {
    backgroundColor: '#22004b',
    padding: 10,
    borderRadius: 5,
  },
  interestButtonText: {
    color: '#ddd',
    textAlign: 'center',
  },
  interestList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  interestItem: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
});

export default styles;
