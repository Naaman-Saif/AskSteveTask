import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  KeyboardAvoidingView
} from "react-native";
import styles from "./styles";

export default class SigninScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      username: "",
      error: null
    };
  }
  async componentDidMount() {
    BackHandler.addEventListener("hadrwareBackPress", this.handleBackHandler);
  }
  handleBackHandler() {
    BackHandler.exitApp();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hadrwareBackPress",
      this.handleBackHandler
    );
  }
  onChangeUser = value => {
    this.setState({
      username: value
    });
  };
  onSubmit = () => {
    const { navigate } = this.props.navigation;
    navigate("Password", { username: this.state.username });
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style={styles.logoImage}
          source={require("./github-octocat.png")}
        />
        <Text>Please enter your github username</Text>
        <View style={styles.loginInputContainer}>
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.loginInput}
            placeholder="Username"
            onChangeText={this.onChangeUser}
            placeholderTextColor="#8f98a9"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.login} onPress={this.onSubmit}>
            <Text style={styles.loginText}>></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
