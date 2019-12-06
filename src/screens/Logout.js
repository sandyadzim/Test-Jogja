import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, Image, ImageBackground, SafeAreaView } from 'react-native';
import {Button, Header} from 'native-base';
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
            <Text style={styles.header2}>SETTINGS</Text>
        </Header>
        
        <View style={styles.container2}>
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
    fontFamily: 'Rakoon_PersonalUse',
    textAlign: 'center',
    marginTop:10,
    color:'#fff',
    // alignSelf:'center',
    fontSize:28,
    // fontWeight:'bold',
    textShadowColor: 'rgba(72,76,127, 100)',
    textShadowOffset: {width: -1, height: 5},
    textShadowRadius: 2,
  },
  imageHeader:{
    width:250,
    height:60
  },
  bar:{
    backgroundColor:'#305f72',
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
    backgroundColor:'#484c7f',
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
    width:200,
    height:200,
    borderRadius:200/2,
    alignSelf:'center',
    marginTop:50,
    marginBottom:10,
    // borderWidth:2,
    // borderColor:'#484c7f',
  },
  txtName:{
    fontSize:32,
    // fontWeight:'bold',
    textAlign:'center',
    fontFamily:'SonderSans-Black',
    // color:'#484c7f'
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
  iconCam:{
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 5
  }
})

// export default Settings;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);