import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar, Header, Button, ThemeProvider  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Listagem({route, navigation}) {

    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getDados(){
            const result = await axios(
                'http://professornilson.com/testeservico/clientes',
              );
              setData(result.data);
              setLoading(false);
        }
        getDados();
    });


    return (
        <ThemeProvider >
            <Header
                placement="left"
                centerComponent={{ text: 'Listagem de Usuários do Magento 2', style: { color: '#fff' } }}
                rightComponent={
                <Button 
                    icon={
                        <Icon
                            name="plus"
                            size={15}
                            color="yellow"
                        />
                    }
                    onPress={() => navigation.navigate('Formulario')}
                />}
            />

            {loading &&
                <Button
                    title="Loading button"
                    loading
                />
            }

            <ScrollView >
                <View>
                    {
                        getData.map((l, i) => (
                            <ListItem key={i} bottomDivider 
                                onPress={() => navigation.navigate('Formulario',{
                                    nome: l.nome,
                                    telefone: l.telefone,
                                    cpf: l.cpf,
                                    id: l.id,
                                    alterar: true 
                                })}
                            >
                                <Avatar source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }} />
                                <ListItem.Content>
                                    <ListItem.Title>{l.nome}</ListItem.Title>
                                    <ListItem.Subtitle>{l.cpf}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))
                    }
                </View>
            </ScrollView>
        </ThemeProvider >
    );

}


const styles = StyleSheet.create({
    botao:{
      paddingTop:20,
      width:300
    },
})

