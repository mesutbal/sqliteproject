import React from 'react';
import { View, ListView, Text } from 'react-native';

//SQLITE
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Uyelik.db'});

export default class ListeScreen extends React.Component {

    state = {
        uyeler: [],
        ds: null
    }

    componentWillMount() {

        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });

        this.setState({ ds: ds.cloneWithRows([])});

        db.transaction(trn => {
            trn.executeSql(
                'select * from table_uye',
                [],
                (tx, results) => {
                    var tmpDizi = [];
                    for(let i=0; i<results.rows.length; ++i) {
                        tmpDizi.push(results.rows.item(i));
                    }
                    this.setState({
                        uyeler: tmpDizi,
                        ds: ds.cloneWithRows(tmpDizi)
                    });
                }
            );
        });
    }

    separator = () => {
        return (<View style={{ height:0.5, width:'100%', backgroundColor:'#000'}} />);
    }

    render() {
        return ( 
        <View style={{ flex:1 }}>
            <ListView 
                dataSource={this.state.ds}
                renderSeparator={this.separator}
                renderRow={data => (
                    <View style={{ padding: 20 }}>
                        <Text>Id : {data.id} </Text>
                        <Text>Adi : {data.adi}</Text>
                        <Text>Cep Telefonu : {data.ceptelefonu}</Text>
                        <Text>Adres : {data.adres}</Text>
                    </View>
                )}
            />
        </View>);
    }
}