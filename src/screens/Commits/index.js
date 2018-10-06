import React from 'react';
import { View, Button, FlatList, AsyncStorage, Text, Image } from 'react-native';
import axios from 'axios';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor() {
        super();
        this.state = {
            commits: null
        }
    }
    componentWillMount = () => {
        var commits_url = this.props.navigation.state.params.commitsLink.replace('{/sha}', '');
        axios.get(commits_url, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json',
                'User-Agent': 'Saif'
            }
        })
            .then((commits) => {
                this.setState({
                    commits: commits.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
    logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('SignIn');
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.commits != null ?
                    <View style={{ marginTop: 20 }}>
                        <FlatList
                            data={this.state.commits}
                            renderItem={({ item }) =>
                                <View style={{ marginTop: 20 }}>
                                    <Image source={{ uri: item.author.avatar_url }} style={{ width: 50, height: 50 }} />
                                    <Text>Name:{item.commit.author.name}</Text>
                                    <Text>Mesage:{item.commit.message}</Text>
                                    <Text>-------------------------------------------</Text>
                                </View>
                            }
                        />
                        <Button title="Logout" onPress={this.logout} />
                    </View>
                    : null}
            </View>
        );
    }
}