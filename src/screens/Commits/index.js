import React from "react";
import {
  View,
  Button,
  FlatList,
  AsyncStorage,
  Text,
  Image
} from "react-native";
import { Bubbles } from "react-native-loader";
import styles from "./styles";
import axios from "axios";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      commits: [],
      page: 1,
      loading: false,
      refresh: false
    };
  }
  componentWillMount = () => {
    this.getCommits();
  };
  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };
  getCommits = () => {
    if (this.state.page == 1) {
      this.setState({
        loading: true
      });
    } else {
      this.setState({
        refresh: true
      });
    }
    var { page } = this.state;
    var commits_url = this.props.navigation.state.params.commitsLink.replace(
      "{/sha}",
      ""
    );
    axios
      .get(commits_url + `?per_page=10&page=${page}`, {
        headers: {
          Accept: "application/vnd.github.mercy-preview+json",
          "User-Agent": "Saif"
        }
      })
      .then(commits => {
        this.setState({
          commits: this.state.commits.concat(commits.data),
          page: page + 1,
          loading: false,
          refresh: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Bubbles size={10} color="#fec93b" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.state.commits.length != 0 ? (
          <View style={styles.commitContainer}>
            <FlatList
              data={this.state.commits}
              renderItem={({ item }) => (
                <View style={styles.commit}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: item.author.avatar_url }}
                  />
                  <Text>
                    Name:
                    {item.commit.author.name}
                  </Text>
                  <Text>
                    Mesage:
                    {item.commit.message}
                  </Text>
                  <Text>-------------------------------------------</Text>
                </View>
              )}
              onEndReached={this.getCommits}
              onEndReachedThreshold={1}
            />
          </View>
        ) : null}
        {this.state.refresh ? (
          <View style={styles.loading}>
            <Bubbles size={10} color="#fec93b" />
          </View>
        ) : null}
        <Button style={styles.logout} title="Logout" onPress={this.logout} />
      </View>
    );
  }
}
