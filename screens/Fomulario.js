import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Accessory, Button, Input, Header, ThemeProvider  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message"

export default function Formulario({ route, navigation }) {

    const [getNome, setNome] = useState();
    const [getCpf, setCpf] = useState();
    const [getTelefone, setTelefone] = useState();
    const [getId, setId] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (route.params) {
            const { nome } = route.params
            const { telefone } = route.params
            const { cpf } = route.params
            const { id } = route.params
            setNome(nome)
            setTelefone(telefone)
            setCpf(cpf)
            setId(id)
        }

        setLoading(false);
    }, []) 


    async function createUser(){
        setLoading(true);
        await axios.post('http://professornilson.com/testeservico/clientes', {
            nome: getNome,
            cpf: getCpf,
            telefone: getTelefone,
        })
            .then(function (response) {
                setNome('')
                setTelefone('')
                setCpf('')
                setLoading(false);
                showMessage({
                    message: "Operação realizada com sucesso!",
                    type: "success",
                });
            })
            .catch(function (error) {
                setLoading(false);
                showMessage({
                    message: "Operação não realizada!",
                    type: "info",
                });
                console.log(error);
            });
    }

    async function editUser(){
        setLoading(true);
        await axios.put('http://professornilson.com/testeservico/clientes/' + getId, {
            nome: getNome,
            cpf: getCpf,
            telefone: getTelefone,
        })
        .then(function (response) {
            setLoading(false);
            showMessage({
                message: "Operação realizada com sucesso!",
                type: "success",
            });         
        })
        .catch(function (error) {
            setLoading(false);
            showMessage({
                message: "Operação não realizada!",
                type: "info",
            });
            console.log(error);
        });
    }

     function deleteUser(){
        setLoading(true);
        axios.delete('http://professornilson.com/testeservico/clientes/'+ getId
        )
        .then(function (response) {
            setLoading(false);
            setNome('')
            setTelefone('')
            setCpf('')
            showMessage({
                message: "Registro excluído com sucesso!",
                type: "success",
            });
        })
        .catch(function (error) {
            setLoading(false);
            showMessage({
                message: "Algum erro aconteceu!",
                type: "info",
              });
            console.log(error);
        });
    }

    return (
        <ThemeProvider >
            <Header
                placement="left"
                centerComponent={{ text: 'Formulario', style: { color: '#fff' } }}
                leftComponent={
                    <Button
                        icon={
                            <Icon
                                name="arrow-left"
                                size={15}
                                color="yellow"
                            />
                        }
                        onPress={() => navigation.navigate('Listagem')}
                    />}
            />

            <FlashMessage position="top" /> 

            <Avatar
                size="large"
                rounded
                containerStyle={{ marginLeft: 160, marginTop: 60, marginBottom: 30 }}
                source={{
                    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
            >
            </Avatar>

            { loading &&
                <Button
                    title="Loading button"
                    loading
                />
            }

            <Input
                placeholder='Digite seu nome'
                onChangeText={text => setNome(text)}
                value={getNome}
                leftIcon={
                    <Icon
                        name='user'
                        size={28}
                        color='black'
                    />
                }
            />

            <Input
                placeholder='Digite seu CPF'
                onChangeText={text => setCpf(text)}
                value={getCpf}
                leftIcon={
                    <Icon
                        name='credit-card'
                        size={28}
                        color='black'
                    />
                }
            />

            <Input
                placeholder='Digite seu Telefone'
                onChangeText={text => setTelefone(text)}
                value={getTelefone}
                leftIcon={
                    <Icon
                        name='phone'
                        size={28}
                        color='black'
                    />
                }
            />

            { !getId &&
                <Button
                    title="Adicionar"
                    onPress={() => createUser()}
                />
            }

            { getId &&
                <Button
                    title="Editar"
                    onPress={() => editUser()}
                />
            }

            { getId &&
                <Button
                    title="Excluir"
                    type="outline"
                    onPress={() => deleteUser()}
                />
            }
        </ThemeProvider >
    );

}

