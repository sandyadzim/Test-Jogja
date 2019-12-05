import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity, Image} from 'react-native'
import {Text} from 'native-base'
import Slideshow from 'react-native-image-slider-show';
import LinearGradient from 'react-native-linear-gradient';
import {FlatGrid} from 'react-native-super-grid';
import * as actionHome from '../redux/actions/actionHome'
import { connect } from 'react-redux'
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'

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

    componentWillMount(){
        AsyncStorage.getItem('token')
        this.props.handleGetHome()
    }
    render() {
        const a = this.props.homeLocal.pariwisata
        console.log(a)

        return (
            <View style={styles.container}>
            <ScrollView>
            <LinearGradient colors={['#f18c8e','#305f72']} style={styles.gradient}>
                <Text style={styles.title}>~Make Your Holiday More Special~</Text>
                <View style={styles.slide}>
                    <Slideshow
                        height={200}
                        overlay={true}
                        arrowSize={0}
                        indicatorSelectedColor="#4287f5"
                        titleStyle={{color : "white"}}
                        dataSource={this.state.banners}
                        position={this.state.position}
                        onPositionChanged={position => this.setState({ position })}
                    />
                </View>
                <View style={{flex:1, marginHorizontal:5, borderRadius:5}}>
                <FlatGrid
                        itemDimension={120}
                        style={styles.grid}
                        scrollEnabled
                        items={this.props.homeLocal.pariwisata.data}
                        renderItem={({ item, index }) => (
                            <View>
                                <TouchableOpacity>
                                    <View style={styles.viewGrid}>
                                        <Text style={styles.txtGrid}>{item.nama_pariwisata}</Text>
                                        <Image source={{uri : item.gambar_pariwisata}} style={{width:150, height:150}} />
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                            
                        )}
                        />
                </View>
                <View>
                      {/* <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                          latitude: 33.78825,
                          longitude: -122.4324,
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.0121
                        }}
                      >
                      </MapView> */}
                </View>
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
    title:{
      fontSize:20,
      fontFamily: 'Breeze Personal Use',
      textAlign:'center',
      marginTop:10
    },
    form:{
      flex:2,
      marginTop:20,
      marginHorizontal: 20
    },
    slide:{
        marginHorizontal:3,
        marginVertical:10,
        borderColor:'black',
        borderWidth:2,
        borderRadius:5
    },
    map:{
      ...StyleSheet.absoluteFillObject,
    }
  })

// export default Home;
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home);