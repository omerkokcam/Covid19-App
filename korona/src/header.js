import React, { Component } from 'react';
import { AppRegistry, View, Image, StyleSheet, Text } from 'react-native';




export default class Header extends Component {

    render() {
        const { headerText, header } = styles;

        return (
            <View style={header}>
                <Image
                    style={header}
                    source={{ uri: 'https://image.freepik.com/free-vector/virus-disinfection-concept_23-2148477224.jpg' }}
                />
                <Text style={headerText}>{this.props.headerText}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({


    header: {
        paddingTop: 0,
        height: 230,
        width: '100%',
        marginTop: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius:100,
    },
    headerText: {
        paddingTop: 0,
        // marginTop:-30,
        // marginLeft:-240,
        position: 'absolute',
        bottom: 5,
        left:30,

        fontSize: 20,
        textAlign: 'center',
        color: '#FFF',

    },

});



