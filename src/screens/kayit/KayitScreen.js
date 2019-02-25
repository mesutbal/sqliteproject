import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import BBTextInput from '../../components/BBTextInput';
import BBButon from '../../components/BBButon';

//SQLITE
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Uyelik.db'});

export default class KayitScreen extends React.Component {
    state = {
        Adi: '',
        CepTelefonu: '',
        Adresi: ''
    }

    uyekaydet = () => {

        var that = this;

        const { Adi, CepTelefonu, Adresi } = this.state;
        db.transaction(function(trn) {
            trn.executeSql(
                "INSERT INTO table_uye(adi,ceptelefonu,adres) values(?,?,?)",
                [Adi, CepTelefonu, Adresi],
                (tx, results) => {
                    console.log(results);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'React Native',
                            'Üye başarıyla kaydedildi.', 
                            [
                                {
                                    text: 'Tamam',
                                    onPress: () => {
                                        that.props.navigation.navigate('Home');
                                    }
                                }
                            ])
                    } else {
                        Alert.alert('React Native','Üye kaydedilemedi !');
                    }
                }
            );
        });
    }

    render() {
        return (
        <View style={{ flex: 1 }}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }}>
                    <BBTextInput 
                        placeholder="Adı"
                        onChangeText={ Adi => this.setState({ Adi })}
                    />
                    <BBTextInput 
                        placeholder="Cep Telefonu"
                        onChangeText={ CepTelefonu => this.setState({ CepTelefonu })}
                    />
                    <BBTextInput 
                        placeholder="Adres"
                        onChangeText={ Adresi => this.setState({ Adresi })}
                    />
                    <BBButon
                        title="Kaydet"
                        itemClick={this.uyekaydet.bind(this)}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>);
    }
}