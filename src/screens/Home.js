import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList} from 'react-native'
import {Text, Card} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import Slideshow from 'react-native-image-slider-show';
import LinearGradient from 'react-native-linear-gradient';
import * as actionHome from '../redux/actions/actionHome'
import { connect } from 'react-redux'


class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            position: 1,
            time: null,
            banners: [{
                title: 'Candi Prambanan',
                url: 'http://www.erporate.com/bootcamp/img/candi-sambisari.jpg'
                }, {
                title: 'Candi Ijo',
                url: 'http://www.erporate.com/bootcamp/img/candi_ijo_yogyakarta.jpg'
                }, {
                title: 'Pantai Parangtritis',
                url: 'http://www.erporate.com/bootcamp/img/parangtritis.jpg'
            }],
            favourite: [{
              title: 'Kraton Jogja',
              image: 'http://www.erporate.com/bootcamp/img/keraton-jogja.jpg'
            },{
              title: 'Pantai Baron',
              image: 'http://www.erporate.com/bootcamp/img/Pantai-Baron-gunung-kidul.jpg'
            },{
              title: 'Pantai Indrayanti',
              image: 'http://www.erporate.com/bootcamp/img/Keelokan-Pantai-Indrayanti-Gunung-Kidul-Jogja.jpg'
            }]
        }
      }

    componentDidMount(){
        this.setState({
            time: setInterval(() => {
                this.setState({
                    position: this.state.position === this.state.banners.length - 1 ? 0 : this.state.position + 1
                });
            }, 3000)
        })
    }
    onHandleDetail(item) {
      this.props.navigation.navigate('Details', {
        title: item.nama_pariwisata,
        alamat: item.alamat_pariwisata,
        desc: item.detail_pariwisata,
        gambar: item.gambar_pariwisata,
        prev: 'Home'
    })
    }
    render() {
        return (
            <View style={styles.container}>
            <ScrollView>
            <LinearGradient colors={['#f18c8e','#305f72']} style={styles.gradient}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={styles.title}>~Let's Holiday~</Text>
                  <Icon name='user-circle' style={styles.user} onPress={() => this.props.navigation.navigate('Logout')} />
                </View>
                <View style={styles.slide}>
                    <Slideshow
                        height={150}
                        overlay={true}
                        arrowSize={0}
                        indicatorSelectedColor="#4287f5"
                        titleStyle={{color : "white", fontFamily:'Breeze Personal Use'}}
                        dataSource={this.state.banners}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({ position })}
                    />
                </View>
                <View>
                  <Text style={styles.titleCard}>--------------</Text>
                <Text style={styles.titleCard}>Recommended</Text>
                  <FlatList 
                    data={this.state.favourite}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) =>
                    <Card style={styles.card}>
                        <TouchableOpacity>
                          <Image style={styles.fav} source={{uri : item.image}} />
                        </TouchableOpacity>
                        <Text style={styles.cardFav}>{item.title}</Text>
                    </Card>
                      
                  }
                  keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                <View>
                  <Text style={styles.titleCard2}>---------------</Text>
                  <Text style={styles.titleCard2}>All You Can Trip</Text>
                  <FlatList
                    data={this.props.homeLocal.pariwisata.data}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                    <Card style={styles.cardAll}>
                          <Image style={styles.all} source={{uri : item.gambar_pariwisata}} />
                        <View style={{width:180}}>
                          <Text style={styles.titleCardAll}>{item.nama_pariwisata}</Text>
                          <Icon name='map-marker' style={{color:'white', fontSize:24, marginTop:20}}>
                            <Text style={{color:'white', fontFamily:'SonderSans-Black'}}> Yogyakarta</Text>
                          </Icon>
                        </View>
                        {console.log(item)}
                        <TouchableOpacity style={styles.next} onPress={() => this.onHandleDetail(item)}>
                            <Icon name='arrow-circle-right' style={styles.nextIcon} />
                        </TouchableOpacity>
                    </Card>
                      
                  }
                  keyExtractor={(item, index) => index.toString()}
                  
                  />
                </View>
                <Text style={{fontFamily:'SonderSans-Black', color:'white', textAlign:'center'}}>Copyright@SKYLAN</Text>
                </LinearGradient>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        homeLocal: state.pariwisata
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      handleGetHome: () => dispatch(actionHome.handleGetHome())
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
  user:{
    color:'white',
    fontSize:32,
    marginRight:15,
    marginTop:5
  },
  title:{
    fontSize:20,
    fontFamily: 'Breeze Personal Use',
    textAlign:'center',
    marginTop:10,
    color:'white',
    marginLeft:80,
    width:200
  },
  form:{
    flex:2,
    marginTop:20,
    marginHorizontal: 20
  },
  slide:{
      marginHorizontal:3,
      marginTop:10,
      borderColor:'black',
      borderWidth:2,
      borderRadius:5
  },
  map:{
    ...StyleSheet.absoluteFillObject,
  },
  card:{
    borderRadius:15,
    marginLeft: 8,
    backgroundColor:'#305f72',
    borderColor:'white'
  },
  cardAll:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius:15,
    marginLeft: 20,
    marginRight:20,
    backgroundColor:'#305f72',
    borderColor:'white'
  },
  cardFav:{
    textAlign:'center', 
    fontFamily: 'Breeze Personal Use', 
    color:'white'
  },
  fav:{
    width:130, 
    height:150, 
    borderRadius:15,
    borderWidth:1,
    borderColor:'white'
  },
  all:{
    width:100,
    height:100,
    borderRadius:15,
    borderColor:'white',
    borderWidth:1
  },
  titleCard:{
    fontFamily:'Breeze Personal Use', 
    color: 'white', 
    fontSize:20, 
    // marginTop:5,
    textAlign:'center'
  },
  titleCard2:{
    fontFamily:'Breeze Personal Use', 
    color: 'white', 
    fontSize:20, 
    // marginTop:15,
    textAlign:'center'
  },
  titleCardAll:{
    fontFamily: 'Breeze Personal Use', 
    color:'white',
    marginTop:5
  },
  next:{
    backgroundColor:'#f18c8e',
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
  },
  nextIcon:{
    fontSize:32,
    marginTop:35,
    paddingLeft:3,
    color:'white',
    marginRight:3
  }
  })

// export default Home;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);