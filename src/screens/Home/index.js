import React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  KeyboardAvoidingView,
  Image,
  AsyncStorage,
  BackHandler,
  TouchableOpacity,
  Alert
} from "react-native";
import axios from "axios";
import { Bubbles } from "react-native-loader";
import styles from "./styles";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      RepoSearch: "",
      load: 0
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
  onChange = value => {
    this.setState({
      RepoSearch: value
    });
  };
  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };
  onSubmit = () => {
    this.setState({
      load: 1
    });
    var RepoSearch = this.state.RepoSearch;
    if (this.state.RepoSearch == "") {
      RepoSearch = "facebook/react-native";
    }
    axios
      .get(`https://api.github.com/repos/${RepoSearch}`, {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
          "User-Agent": "Saif"
        }
      })
      .then(res => {
        const { navigate } = this.props.navigation;
        navigate("Commits", { commitsLink: res.data.commits_url });
      })
      .catch(err => {
        Alert.alert("Sorry! Some Error at the host");
      });
  };
  render() {
    return this.state.load == 0 ? (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image
          style={styles.logoImage}
          source={require("../../../assets/icon1.png")}
        />
        <Text>Enter the repository you would like to see</Text>
        <View style={styles.inputContainer}>
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.repoInput}
            placeholder="facebook/react-native"
            onChangeText={this.onChange}
            placeholderTextColor="#8f98a9"
          />
        </View>
        <TouchableOpacity style={styles.login} onPress={this.onSubmit}>
          <Text style={styles.loginText}>></Text>
        </TouchableOpacity>
        <Button title="Logout" style={styles.logout} onPress={this.logout} />
      </KeyboardAvoidingView>
    ) : (
      <View style={styles.container}>
        <Bubbles size={10} color="#fec93b" />
      </View>
    );
  }
}
