import React from 'react';
import { View } from 'react-native';
import BBButon from '../../components/BBButon';
import BBText from '../../components/BBText';

//SQLITE
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Uyelik.db'});

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);

        db.transaction(function(trn) {
            trn.executeSql(
                "SELECT name from sqlite_master WHERE type='table' and name='table_uye'",
                [],
                function(tr, res) {
                    
                    console.log(res.rows.length);

                    if (res.rows.length === 0) {
                        //trn.executeSql("DROP TABLE IF EXISTS table_uye",[]);
                        trn.executeSql(
                            "CREATE TABLE IF NOT EXISTS table_uye(id INTEGER PRIMARY KEY AUTOINCREMENT, adi VARCHAR(50), ceptelefonu VARCHAR(50), adres VARCHAR(50))",
                            []
                        );
                    }
                }
            );
        });
    }

    render() {
        return(
        <View style={{
            flex: 1,
            flexDirection: 'column'
        }}>
            <BBText text="İşlemler" />

            <BBButon title="Kayıt Ol" itemClick={() => {this.props.navigation.navigate('Kayit')}} />
            <BBButon title="Güncelle" />
            <BBButon title="Göster" />
            <BBButon title="Tümünü Listele"  itemClick={() => {this.props.navigation.navigate('Liste')}} />
            <BBButon title="Sil" itemClick={() => {this.props.navigation.navigate('Sil')}} />
        </View>);
    }
}