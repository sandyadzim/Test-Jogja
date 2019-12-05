import React, {Component} from 'react'
import {View, AsyncStorage, StyleSheet, Image, SafeAreaView} from 'react-native'
import {Text, Spinner}from 'native-base'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import * as actionHome from '../redux/actions/actionHome'



class Loading extends Component{
  componentDidMount(){
    setTimeout( async () => {
      const token = await AsyncStorage.getItem('token')
      if (token == null) {
        this.props.navigation.navigate('Login')
      } else {
        await this.props.handleGetHome()
        this.props.navigation.navigate('Home')
      }
    }, 3000);   
  }

    render(){
        return(
            <SafeAreaView style={styles.container}>
              <LinearGradient colors={['#f18c8e','#305f72']} style={styles.gradient}>
              <Image source={require('../img/jogja.png')} style={styles.logo} />
              <Spinner color='#f18c8e' />
              </LinearGradient>                
            </SafeAreaView>
        )
    }
}
  
  const mapStateToProps = state => {
    return {
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      handleGetHome: () => dispatch(actionHome.handleGetHome())
    }
  }
  
  const styles = StyleSheet.create({
    logo:{
      width: 300,
      height:300,
      alignSelf:'center',
      
    },
    container:{
      flex:1
    },
    gradient:{
      flex:1,
      justifyContent:'center'
    }
  })
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Loading);