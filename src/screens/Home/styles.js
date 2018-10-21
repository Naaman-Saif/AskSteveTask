import { StyleSheet } from "react-native";
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logoImage: {
    height: 60,
    width: 60,
    marginBottom: 20
  },
  repoInput: {
    width: 250,
    fontSize: 18,
    marginTop: 10
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 50,
    marginBottom: 10,
    borderBottomWidth: 1
  },
  login: {
    width: 250,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#fec93b",
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "Roboto"
  }
}));
