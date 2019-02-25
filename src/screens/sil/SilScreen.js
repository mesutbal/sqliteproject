import React from 'react';
import { View, Alert } from 'react-native';
import BBTextInput from '../../components/BBTextInput';
import BBButon from '../../components/BBButon';

//SQLITE
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Uyelik.db'});


export default class SilScreen extends React.Component {

    state = {
        uye_id: 0
    }

    uyeSil(){
        var that = this;
        const { uye_id } = this.state;

        console.log(uye_id);

        db.transaction(trx => {
            trx.executeSql(
                "DELETE FROM table_uye where id=?",
                [uye_id],
                (tx,results) => {
                    console.log(tx);
                    console.log(results);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'React Native',
                            'Üye başarıyla silindi.', 
                            [
                                {
                                    text: 'Tamam',
                                    onPress: () => {
                                        that.props.navigation.navigate('Home');
                                    }
                                }
                            ])
                    } else {
                        Alert.alert('React Native','Üye silenemedi !');
                    }
                }
            )
        });
    }

    render() {
        return (
        <View style={{ flex:1 }}>
            <BBTextInput placeholder="Kullanıcı Id" onChangeText={uye_id => this.setState({ uye_id })} />
            <BBButon
                title="Üye Sil"
                itemClick={this.uyeSil.bind(this)}
            />
        </View>);
    }
}