import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native';
import {Button, Header, Left, Right} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import {connect} from 'react-redux'

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar:'',
      idUser:'',
      name:''
    };
  }

  async componentDidMount(){
    const name = await AsyncStorage.getItem('name')
    this.setState({name})
    console.log(name)
  }
  signOut = () => {
      AsyncStorage
      .clear()
      .then(() => {
          this.props.navigation.navigate('Login');
      })
      .catch(e => {
          console.log(e);
          alert('Error: Cannot Sign Out');
      })
  }

  render() {
    return (

      <SafeAreaView style={styles.container}>
        <Header style={styles.bar}>
            <Left>
              <Icon name='chevron-circle-left' style={styles.back} onPress={()=>this.props.navigation.navigate(this.props.navigation.getParam('prev'))} />
            </Left>
            <Text style={styles.header2}>Profile</Text>
            <Right />
        </Header>
        
        <View style={styles.container2}>
          <View>
            <Image
                style={styles.image}
                source={require('../img/jogja.png')}
              />
          </View>
          <View>
            <Text style={styles.txtName}>{this.state.name}</Text>
            <Text style={styles.txtEmail}>User</Text>
          </View>
          <Button onPress={() => this.signOut()} style={styles.btnLogout} block>
            <View style={styles.logRow}>              
              <Text style={styles.txtOut}>Sign Out</Text>
              <Icon name='sign-out' style={styles.iconOut} />
            </View>            
          </Button>
        </View>

      </SafeAreaView>

    );
  }
}

const mapStateToProps = state => {
  return {
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

const styles = StyleSheet.create({
  header2:{
    fontFamily: 'Breeze Personal Use',
    textAlign: 'center',
    marginTop:10,
    color:'#fff',
    fontSize:28,
    marginLeft:85,
    textShadowColor: 'rgba(72,76,127, 100)',
    textShadowOffset: {width: -1, height: 5},
    textShadowRadius: 2,
  },
  imageHeader:{
    width:250,
    height:60
  },
  bar:{
    backgroundColor:'#f18c8e',
  },
  container:{
    flex:1
  },
  container2:{
    flex:1,
  },
  container3:{
    flex:1,
    backgroundColor:'#765ead'
  },
  btnLogout:{
    width:200,
    marginTop:20,
    backgroundColor:'#305f72',
    borderRadius:10,
    alignSelf:'center',
  },
  txtOut:{
    color:'#fff',
    fontSize:21,
    fontFamily:'SonderSans-Black',
    paddingRight:20,
    marginTop:7
  },
  image:{
    width:220,
    height:200,
    alignSelf:'center',
    marginTop:50,
    marginBottom:10,
  },
  txtName:{
    fontSize:32,
    textAlign:'center',
    fontFamily:'SonderSans-Black',
    color:'#f18c8e'
  },
  txtEmail:{
    fontSize:24,
    fontStyle:'italic',
    textAlign:'center'
  },
  logRow:{
    flexDirection:'row'
  },
  iconOut:{
    fontSize:32,
    color:'white'
  },
  back:{
    color: 'white',
    fontSize:32
},
})

// export default Settings;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);