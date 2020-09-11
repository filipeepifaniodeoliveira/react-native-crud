import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Accessory, Button, Input, Header, ThemeProvider  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Create ({ route, navigation }) {
    return (
        <ThemeProvider >
            <Header
                placement="left"
                centerComponent={{ text: 'Create', style: { color: '#fff' } }}
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

            <Avatar
                size="large"
                rounded
                containerStyle={{ marginLeft: 160, marginTop: 60, marginBottom: 30 }}
                source={{
                    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
            >
            </Avatar>

            <Input
                placeholder='Digite seu nome'
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
                leftIcon={
                    <Icon
                        name='phone'
                        size={28}
                        color='black'
                    />
                }
            />

            <Button
                title="Adicionar"
            />

        </ThemeProvider >
    );

}

