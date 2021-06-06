import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
Image} from 'react-native';

    import firebase from 'firestore';
 

    export default class HomeScreen extends React.Component{
        constructor(){
            super();

        }
        render(){
            return (
                <View>
                   
                    <Image
                     style={{ height: 50, width: 50 }}
                        source={{
                       uri: './Cycling_Image.jpg'
                     }} />  
                   
                    <TouchableOpacity onPress ={()=>{
                        this.props.navigation.navigate('TrackingScreen')
                    }}>
                        <Text fontFamily = 'Helvetica' fontSize = '30' color = 'black'>
                            Cycle Tracking
                        </Text>
                    </TouchableOpacity>
                    <View>
                       
                            <Image
                            style={{height:50, width:50}}
                            source = {{
                                uri: './Service_Image.jpg'
                            }}/>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('ServiceScreen')
                        }}>
                            <Text fontFamily = 'Helvetica' fontSize = '30' color = 'black'>
                                Service Information
                            </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
            )
        }
    }