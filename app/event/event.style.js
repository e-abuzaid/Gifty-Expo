import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // padding: 15,
    backgroundColor: '#22004b',
    height: '100%'
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
  },
  info: {
    padding: 5,
    paddingLeft: 15,
  },
  img: {
    width: '100%',
    height: 250,
  },
  overlay: {
    width: '100%',
    height: 250,
    position: 'absolute',
    backgroundColor: '#00000090',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 10
  },
  name: {
    fontSize: 50,
    fontWeight: 500,
    color: '#ddd'
  },
  relation: {
    fontSize: 20,
    fontWeight: 500,
    color: '#ddd',
    marginBottom: 10,
  },
  remainingTime: {
    color: '#aaa',
    padding: 15,
    fontSize: 20,
    alignSelf: 'flex-end'
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
    color: '#777',
    borderRadius: 10,
    fontSize: 12,
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
  },
  btnText2: {
    backgroundColor: '#ddd',
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    fontWeight: 500,
    textAlign: 'center'
  },
  nameInput: {
    borderColor: '#22004b',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    fontSize: 50,
    color: '#ddd',
  },
  dateInput: {
    borderColor: '#22004b',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    color: '#ddd',
  },
  personImg: (id, people) => ({
    width: 50,
    height: 50,
    borderRadius: 50,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: people.length > 0 && people?.some((person) => person._id === id) ? 3 : 0,
    borderColor: '#fff',
  }),
  personName: {
    color: '#ddd',
    textAlign: 'center',
    fontWeight: 500,
  }

});

export default styles;
