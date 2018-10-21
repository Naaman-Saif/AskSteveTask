import { StyleSheet } from "react-native";
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  logoImage: {
    height: 75,
    width: 60,
    marginBottom: 20
  },
  login: {
    width: 250,
    height: 50,
    borderRadius: 50,
    marginTop: 30,
    backgroundColor: "#fec93b",
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Roboto"
  },
  loginInput: {
    width: 250,
    fontSize: 20,
    fontFamily: "Roboto"
  },
  loginInputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 70,
    borderBottomWidth: 1
  },
  loginPage: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#FFF",
    backgroundColor: "#FFF",
    alignItems: "center"
  },
  loginInput: {
    width: 250,
    fontSize: 20,
    marginTop: 10
  }
}));
