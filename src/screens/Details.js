import React, { Component } from 'react';
import {View, StyleSheet, Image, ScrollView} from 'react-native'
import {Text, Header, Body, Left, Right, Card, Button} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

class Details extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
      }

    onHandleMap() {
        this.props.navigation.navigate('Mapp', {
            title: this.props.navigation.getParam('title'),
            prev: 'Details'
        })
    }
    render() {
        console.disableYellowBox = true
        return (
            <View>
                <ScrollView>
                <Header style={styles.header}>
                    <Left>
                        <Icon name='chevron-circle-left' style={styles.back} onPress={()=>this.props.navigation.navigate(this.props.navigation.getParam('prev'))} />
                    </Left>
                    <Body>
                        <Text style={styles.txtHeader}>Let's Trip</Text>
                    </Body>
                    <Right />
                </Header>
                <View>
                    <Image source={{uri : this.props.navigation.getParam('gambar')}} style={styles.image} />
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-between', marginLeft:5}}>
                    <Icon name='building' style={styles.building}>
                        <Text style={styles.title}>{this.props.navigation.getParam('title')}</Text>
                    </Icon>
                    <Icon name='star'  style={styles.star}>
                        <Text style={styles.rating}>5.0</Text>
                    </Icon>
                </View>
                <View style={{width:320, marginLeft:5}}>
                    <Text style={styles.alamat}>{this.props.navigation.getParam('alamat')}</Text>
                </View>
                <View>
                    <Card style={styles.card}>
                        <Text style={styles.desc}>{this.props.navigation.getParam('desc')}</Text>
                    </Card>
                </View>
                <View>
                    <Button block style={styles.button} onPress={() => this.onHandleMap()} >
                        <Text style={{fontFamily:'SonderSans-Black', fontSize:24, marginRight:10}}>See Location ?</Text>
                    </Button>
                </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height:220
    },
    header:{
        backgroundColor:'#f18c8e',
        height:45
    },
    back:{
        color: 'white',
        fontSize:32
    },
    txtHeader:{
        color:'white',
        fontSize:24,
        fontFamily:'Breeze Personal Use',
        alignSelf:'center'
    },
    title:{
        fontFamily:'SonderSans-Black',
        fontSize:24,
        color:'#305f72',
    },
    building:{
        marginTop:10,
        color:'#305f72',
        fontSize:24,
    },
    star:{
        fontSize:24,
        marginTop:8,
        marginRight:5,
        color:'#f18c8e'
    },
    rating:{
        fontStyle:'italic',
        color:'#f18c8e'
    },
    alamat:{
        fontStyle:'italic',
    },
    card:{
        borderRadius:15,
        width:350,
        alignSelf:'center'
    },
    desc:{
        borderWidth:5,
        borderColor:'#f18c8e',
        borderRadius:15,
        padding:10,
        textAlign:'justify'
    },
    button:{
        backgroundColor:'#305f72'
    }
})

export default Details;