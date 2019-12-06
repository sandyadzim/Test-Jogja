import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import MapView from 'react-native-maps'

class Mapp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:'',
            lat:'',
            long: '',
            latDelta: '',
            longDelta:'',   
            lokasi: [
                'Candi Prambanan ',
                'Candi Sambisari',
                'Candi Ijo',
                'Candi Kalasan',
                'Candi Ratu Baka',
                'Pantai Depok',
                'Pantai Parangtritis',
                'Pantai Baron',
                'Pantai Indrayanti',
                'Pantai Sundak',
                'Kawasan Wisata Kaliurang',
                'Benteng Vredeburg',
                'Kraton Jogja',
            ]    
        }
    }

    async componentWillMount(){
        const e = await this.props.navigation.getParam('title')
        const loc = this.state.lokasi
        
        if( await e == loc[0] ){
            this.setState({
                lat: -7.752098,
                long: 110.491404
            })
        }else if(e == loc[1]){
            this.setState({
                lat: -7.762486,
                long: 110.446941
            })
        }else if(e == loc[2]){
            this.setState({
                lat: -7.783950,
                long: 110.512300
            })
        }else if(e == loc[3]){
            this.setState({
                lat: -7.767140,
                long: 110.472320
            })
        }else if(e == loc[4]){
            this.setState({
                lat: -7.7704665,
                long: 110.4892921
            })
        }else if(e == loc[5]){
            this.setState({
                lat: -8.015688,
                long: 110.299927
            })
        }else if(e == loc[6]){
            this.setState({
                lat: -8.021805,
                long: 110.321277
            })
        }else if(e == loc[7]){
            this.setState({
                lat: -8.1290174,
                long: 110.5464918
            })
        }else if(e == loc[8]){
            this.setState({
                lat: -8.1507886,
                long: 110.610372
            })
        }else if(e == loc[9]){
            this.setState({
                lat: -8.1471482,
                long: 110.6056535
            })
        }else if(e == loc[10]){
            this.setState({
                lat: -7.5988019,
                long: 110.4241664
            })
        }else if(e == loc[11]){
            this.setState({
                lat: -7.8002713,
                long: 110.3641058
            })
        }else if(e == loc[12]){
            this.setState({
                lat: -7.8052845,
                long: 110.3620091
            })
        }
    }
    render() {
        const {lat,long} = this.state
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                <MapView.Marker
                    coordinate={{latitude: lat,
                    longitude: long}}
                    title={"title"}
                    description={"description"}
                />
            </MapView>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
        map: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }
})

export default Mapp;