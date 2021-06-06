import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker'
import db from '../config.js'
import {RFValue} from 'react-native-responsive-fontsize';
import {Icon} from 'react-native-elements';



export default class SideBar extends React.Component {
    constructor(){
        super();
        this.state ={
            userID: firebase.auth().currentUser.email,
            image: '#',
            name: '',
            docID: ''
        }
    }
    uploadImage = async (uri, imageName) => {
        var response = await fetch(uri);
        var blob = await response.blob();
    
        var ref = firebase
          .storage()
          .ref()
          .child("user_profiles/" + imageName);
    
        return ref.put(blob).then((response) => {
          this.fetchImage(imageName);
        });
      };
      fetchImage = (imageName) => {
        var storageRef = firebase
          .storage()
          .ref()
          .child("user_profiles/" + imageName);
    
        // Get the download URL
        storageRef
          .getDownloadURL()
          .then((url) => {
            this.setState({ image: url });
          })
          .catch((error) => {
            this.setState({ image: "#" });
          });
      };

      getUserProfile() {
        db.collection("users")
          .where("emailID", "==", this.state.userID)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({
                name: doc.data().First_Name + " " + doc.data().Last_Name,
                docId: doc.id,
                image: doc.data().image,
              });
            });
          });
      }

            
    selectPicture = async () => {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if(!cancelled){
            this.setState({image: uri})
        }

        this.uploadImage(uri,this.state.userID)
    }

        componentDidMount() {
            this.fetchImage(this.state.userID);
            this.getUserProfile()
        }
    render(){
        return (
          

            <View style = {styles.container}>
              <View style = {{flex:0.3,justifyContent:'center',alignItems:'center',backgroundColor: "black"}}>
                <Avatar rounded source = {{uri: this.state.image}} size = "medium" onPress = {() =>{
                    this.selectPicture() }} showEditButton/>
                    <Text style = {{fontWeight:"300", fontSize:RFValue(20), color:"white"}}
                    >{this.state.name}</Text>
                    </View>
                <View style = {styles.DrawerItemsContainer}>
                    <DrawerItems {...this.props}/>


                </View>
                <View style = {styles.logOutContainer}>
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}>
                      <Icon name = "logout" type = "antDesign" iconStyle = {{paddingLeft:RFValue(10)}}/>
                        <Text style = {{fontSize:20, fontWeight: "bold", marginLeft:RFValue(30)}}>
                        Log Out
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style = {stlyes.logOutContainer}>
                    <TouchableOpacity onPress={() =>{
                        this.props.navigation.navigate('SettingScreen')}}>
                        <Icon name = "setting" type = "antDesign" iconStyle = {{paddingLeft:RFValue(10)}}/>
                        <Text style = {{fontSize:20, fontWeight: "bold", marginLeft:RFValue(30)}}>
                            Settings
                        </Text>
                        </TouchableOpacity>
                      

                </View>
                <View>
                <TouchableOpacity onPress={() =>{
                        this.props.navigation.navigate('ServiceScreen')}}>
                        <Icon name = "setting" type = "antDesign" iconStyle = {{paddingLeft:RFValue(10)}}/>
                        <Text style = {{fontSize:20, fontWeight: "bold", marginLeft:RFValue(30)}}>
                            Cycle Servicing
                        </Text>
                        </TouchableOpacity>

                </View>

            </View>
        )
    }}

var styles = StyleSheet.create({
    
container : { flex:1 }, drawerItemsContainer:{ flex:0.8 },
logOutContainer : { flex:0.2, justifyContent:'flex-end', paddingBottom:30 }, logOutButton : { height:30, width:'100%', justifyContent:'center', padding:10 }, logOutText:{ fontSize: 30, fontWeight:'bold' }
    
})