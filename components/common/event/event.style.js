import { StyleSheet } from "react-native";

import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  img: {
    width: 120,
    height: 200,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  overlay: {
    width: 120,
    height: 200,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: '#00000090',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10
  },
  name: {
    fontWeight: 500,
    color: '#ddd',
    bottom: 10,
    opacity: 1,
    textAlign: 'center'
  }
});

export default styles;
