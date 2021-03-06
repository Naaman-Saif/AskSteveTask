import { StyleSheet } from "react-native";
export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  commitContainer: {
    marginTop: 20,
    height: "70%"
  },
  commit: {
    marginTop: 20
  },
  avatar: {
    width: 50,
    height: 50
  },
  loading: {
    alignItems: "center",
    justifyContent: "center"
  },
  logout: {
    marginTop: 50
  }
}));
