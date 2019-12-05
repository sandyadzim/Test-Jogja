import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { Icon, Button, Spinner, Text, Form, Item, Input, Title, Label} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as actionLogin from '../redux/actions/actionLogin';


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      submitDisabled : true,
      securePass: true,
      regEmail: false,
      regPass: false,
      signIn: false
    }
  }

  onHandleEmail = (text) => {
    this.setState({email: text})
  }
  onHandledPassword = (text) => {
    this.setState({password: text})
  }
  renderBottomComponent = () => {
    if(this.state.signIn){
        return (
            <Spinner color='#df7599' size='small' />
        )
    }
  }

  showHideIcon = () => {
    this.setState({
      securePass: !this.state.securePass
    });
  }

  regexLogin(inputForm) {
    if (inputForm == 'email') {
        let correct = this.state.email.match(/(^[a-zA-Z]+|^[0-9]+|^[a-zA-Z0-9\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]+)/g)
        if (correct != null) {
            this.state.regEmail = true
        } else {
            this.state.regEmail = false
        }
    } else if (inputForm == 'password') {
        if (this.state.password !== '') {
            this.state.regPass = true
        } else {
            this.state.regPass = false
        }
    }
    
    if (this.state.regEmail == true && this.state.regPass == true) {
        this.setState({submitDisabled: false})
    } else {
        this.setState({submitDisabled: true})
    }
  }

  login= async() =>{
    this.setState({ signIn: true })
    const email = String(this.state.email).toLowerCase()
    const password = String(this.state.password)
    await this.props.handleLogin(email,password)
    const users = this.props.loginLocal.login
      if(users.token){
        await AsyncStorage.multiSet([
          ['token', users.token],
          ['id', `${users.id}`],
          ['name', users.name]
        ])
        this.setState({ signIn: false })
        this.props.navigation.navigate('Home')
      }else{
        this.setState({ signIn: false})
        alert('Invalid Email or Password')
        await this.setState({email: ''})
        await this.setState({password: ''})
      }      
    }
 

  render() {
    console.disableYellowBox = true
    return (
      
        <View style={styles.container}>
          <LinearGradient colors={['#39375b','#e6b2c6']} style={styles.gradient} >
            <View style={styles.title}>
                <Image source={require('../img/jogja.png')} style={styles.logo} />
            </View>
            <Text style={{fontSize:24, fontFamily: 'Breeze Personal Use', textAlign: 'center', marginVertical:10, color:'white'}}>Sign In</Text>
            <Text style={{fontSize:18, fontFamily: 'Breeze Personal Use', textAlign: 'center', color:'white'}}>Sign In With Your Account</Text>
            <View style={styles.form}>
                <Label style={{fontFamily:'Breeze Personal Use', textAlign: 'left', color: 'white'}}>Email :</Label>
                <Item style={{backgroundColor:'#e6b2c6', borderBottomWidth:0, borderRadius: 5}}>
                    <Input
                        placeholder='example: xxx@xxx.com'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onKeyPress={() => this.regexLogin('email')}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text})} />
                </Item>
                <Label style={{fontFamily:'Breeze Personal Use', textAlign: 'left', color: 'white', marginTop:15}}>Password :</Label>
                <Item style={{backgroundColor:'#e6b2c6', borderBottomWidth:0, borderRadius: 5}}>
                    <Input 
                        placeholder='*******'
                        secureTextEntry={this.state.securePass}
                        keyboardType='default'
                        autoCapitalize='none'
                        onKeyPress={() => this.regexLogin('password')}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <Button onPress={this.showHideIcon} transparent>
                        <Icon type='FontAwesome' name={this.state.securePass ? 'eye-slash': 'eye'} style={{color:'white'}} />
                    </Button>                    
                </Item>
                <Button block style ={{marginTop:15, backgroundColor:'#39375b', borderRadius: 5}} onPress= {() => this.login()}>
                    <Text style={{fontFamily:'SonderSans-Black', fontSize:18}}>Sign In</Text>
                </Button>
                <Text style={{marginTop:25, textAlign:'center', color:'white'}}>Don't have an account yet ?</Text>
                <Button transparent block onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{fontFamily:'SonderSans-Black', fontSize:18, color:'#39375b'}}>Sign Up</Text>
                </Button>
            </View>
          </LinearGradient>
        </View>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    loginLocal: state.login
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (email,password) => dispatch(actionLogin.handleLogin(email,password))
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  gradient:{
    flex:1
  },
  logo:{
    width:220,
    height:200,
    marginTop:20
  },
  title:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  titleLogin:{
    fontSize:48,
    marginTop:20,
  },
  titleTxt:{
    marginTop:30,
    fontSize:18,
  },
  form:{
    flex:2,
    marginTop:20,
    marginHorizontal: 20
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);