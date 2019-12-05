import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import { Icon, Button, Label, Item, Input } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import * as actionRegister from '../redux/actions/actionRegister';


class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name:'',
      email: '',
      password: '',
      submitDisabled : true,
      securePass: false,
      regEmail: false,
      regPass: false,
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

  register= async() =>{
    const name = String(this.state.name)
    const email = String(this.state.email).toLowerCase()      
    const password = String(this.state.password)
    await this.props.handleRegister(name, email, password)
      if(this.props.registerLocal.register.token){
        const data = this.props.registerLocal.register.token
        await AsyncStorage.setItem('token', data)
        alert('Create an Account Success!')
        this.props.navigation.navigate('Login')
        await this.setState({name: ''})
        await this.setState({email: ''})
        await this.setState({password: ''})
      }else{
        alert('Email sudah digunakan')
      }
      
    }
  

  render() {
    return (
      
        <View style={styles.container}>
          <LinearGradient colors={['#39375b','#e6b2c6']} style={styles.gradient} >
          
            <View style={styles.title}>
              <Image source={require('../img/jogja.png')} style={styles.logo} />
            </View>
            <Text style={{fontSize:24, fontFamily: 'Breeze Personal Use', textAlign: 'center', marginVertical:10, color:'white'}}>Sign Up</Text>
            
            <View style={styles.form}>
                <Label style={{fontFamily:'Breeze Personal Use', textAlign: 'left', color: 'white'}}>Name :</Label>
                <Item style={{backgroundColor:'#e6b2c6', borderBottomWidth:0, borderRadius: 5}}>
                    <Input
                        placeholder='Ex: Sandy Rahmansyah'
                        keyboardType='default'
                        value={this.state.name}
                        onChangeText={(text) => this.setState({ name: text})} />
                </Item>

                <Label style={{fontFamily:'Breeze Personal Use', textAlign: 'left', color: 'white',marginTop:15}}>Email :</Label>
                <Item style={{backgroundColor:'#e6b2c6', borderBottomWidth:0, borderRadius: 5}}>
                    <Input
                        placeholder='Ex: xxx@xxx.com'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onKeyPress={() => this.regexLogin('email')}
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text})} />
                </Item>

                <Label style={{fontFamily:'Breeze Personal Use', textAlign: 'left', color: 'white',marginTop:15}}>Password :</Label>
                <Item style={{backgroundColor:'#e6b2c6', borderBottomWidth:0, borderRadius: 5}}>
                    <Input
                        placeholder='********'
                        secureTextEntry={this.state.securePass}
                        keyboardType='default'
                        autoCapitalize='none'
                        onKeyPress={() => this.regexLogin('password')}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text})} />
                        <Button onPress={this.showHideIcon} transparent>
                            <Icon type="FontAwesome" name={this.state.securePass ? "eye-slash":"eye"} />
                        </Button>
                </Item>
                <Button block style ={{marginTop:15, backgroundColor:'#39375b', borderRadius: 5}} onPress= {() => this.register()}>
                    <Text style={{fontFamily:'SonderSans-Black', fontSize:18, color:'white'}}>Sign Up</Text>
                </Button>  
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={{marginTop:25, textAlign:'center', color:'white'}}>Have an account ?</Text>   
                </TouchableOpacity>                       
              </View>
  
          </LinearGradient>
        </View>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    registerLocal: state.register
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleRegister: (name, email, password) => dispatch(actionRegister.handleRegister(name, email, password))
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
  form:{
    flex:2,
    marginTop:20,
    marginHorizontal: 20
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);