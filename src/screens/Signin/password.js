import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native";
import axios from "axios";
import BaseUrl from "../../constants/BaseUrl";
import { Bubbles } from "react-native-loader";
import styles from "./styles";

export default class PasswordScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      load: 1
    };
  }
  componentWillMount = () => {
    var username = this.props.navigation.state.params.username;
    this.setState({
      username: username,
      load: 0
    });
  };
  onChangePassword = value => {
    this.setState({
      password: value
    });
  };
  onSubmit = () => {
    const navigation = this.props.navigation;
    this.setState({
      load: 1
    });
    axios
      .post(BaseUrl + "/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        if (res.data.statusCode == 200) {
          AsyncStorage.setItem("User", res.data.body);
          navigation.navigate("Home");
        } else {
          Alert.alert("Uhoh! Wrong Credentials");
          navigation.navigate("SignIn");
        }
      })
      .catch(err => {
        Alert.alert("Thats strange. Something went wrong.");
        navigation.navigate("SignIn");
      });
  };
  render() {
    const { navigate } = this.props.navigation;
    const username = this.state.username;
    return this.state.load == 0 ? (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style={{ height: 75, width: 60, marginBottom: 20 }}
          source={require("./github-octocat.png")}
        />
        <Text>Hi {username}! Please enter your github password. </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 20,
            borderBottomWidth: 1
          }}
        >
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            autoCapitalize="none"
            style={styles.loginInput}
            placeholder="Password"
            placeholderTextColor="#8f98a9"
            onChangeText={this.onChangePassword}
            onSubmitEditing={this.onSubmit}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.login} onPress={this.onSubmit}>
            <Text style={styles.loginText}>Login!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    ) : (
      <View style={styles.container}>
        <Bubbles size={10} color="#fec93b" />
      </View>
    );
  }
}
