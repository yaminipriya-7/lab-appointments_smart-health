import React, { useRef, useEffect, useState, useContext } from "react";
import {
  ImageBackground,  
  Text,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { VictoryPie } from "victory-native";
import BannerCard from "../../components/BannerCard";
import Header from "../../layout/header";
import PortfolioCard from "../../components/PortfolioCard";
import { Swipeable } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import BalanceChart from "../../components/chart/BalanceChart";
import TransferSheet from "../../components/BottomSheet/TransferSheet";
import ThemeBtn from "../../components/ThemeBtn";
import Swiper from "react-native-swiper";
import FeatherIcon from 'react-native-vector-icons/Feather';
import HeaderStyle4 from "../../components/Headers/HeaderStyle4";
import Button from '../../components/Button/Button';
import ButtonLight from '../../components/Button/ButtonLight';
import HeaderStyle3 from "../../components/Headers/HeaderStyle3";
import {AuthContext} from '../../context/AuthContext';
import DateSheet from "../../components/DateSheet/DateSheet";
import DateCalenderPicker from "../../components/DateSheet/DateCalenderPicker";
//import DatePicker from "../../components/DateSheet/DatePicker";
import SocialBtn from "../../components/Socials/SocialBtn";
import ButtonLg from "../../components/Button/ButtonLg";

const { width } = Dimensions.get('window');
const { width1 } = Dimensions.get('window');
const { width2 } = Dimensions.get('window');
const { width3 } = Dimensions.get('window');

const itemWidth = (SIZES.width / 1.5) + 50;

const DependentsData = [
  {
      name : "Online consultation",
      icon : IMAGES.appt22,
      link :'AppointmentsTab',
      bgclr:'#00539C',
  },
  {
    name : "Offline consultation",
    icon : IMAGES.appt11,
    link :'Components',
    bgclr:'#E16121'
  },
]

const DoctorsData = [
    {
        id : '1',
        coin : 'Dr Sasi Kumar',
        date : 'General Physician, Special Interest in Diabetology',
        amount : '2,000',
        exp: '12 Years Exp',
        status : 'I’m suffering from fever for 2 days and also I have sneezing , throat pain',
        image : IMAGES.doctorimage,
        
    },
]
const RescheduleApt = ({navigation}) => {
  const { colors } = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const handleDateAndSlot = (date, slot) => {
  console.log('Selected Date: ${date}, Selected Slot: ${slot}');
  const buttons = ['FAVOURITES', 'TOP GAINERS', 'TOP LOSERS'];
  const onCLick = i => this.scrollViewHome.scrollTo({ x: i * width });
  const refRBSheet = useRef();
  const navigation = useNavigation();
  // const {dependentsData,membersDetailsJson,fetchEcardUrl,checkPermission,ecardUrls} = useContext(AuthContext);
  // console.log(ecardUrls);
  }
  return (
    <>
      <SafeAreaView style={{flex:1}}>
        <View
            style={{
                flex:1,
                backgroundColor:colors.background,
            }}
        >
           
            <ScrollView
              contentContainerStyle={{paddingBottom:10}}
            >
              <Header 
                    title={'Reschedule Appointment'} 
                    leftIcon={'back'}
                />
                <View style={[styles.cardTab]} >
                    <View style={{...GlobalStyleSheet.container}}>
                        {/* <DatePicker /> */}
                        <DateSheet title="Date Picker" dayActive={'#1f2587'} drpActiveColor={'#484848'}  />
                         <View style={{ alignItems: 'center' }}>
                        <ButtonLg custStylebutt style={{backgroundColor:"#1f2587",paddingVertical:16,width:280,borderRadius:70,marginHorizontal:50,marginTop:70,}} title={'Confirm Appointment'} onPress={() => navigation.navigate('LabAppointmentsTab')}/>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
      </SafeAreaView>
    </>
  );
};



const ListItem = ({icon,coin,rate,amount,subTitle,sheet}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const renderLeftActions = (progress, dragX) => {
    
    return (
      <Animated.View style={[
          {
            flexDirection:'row',
            opacity: 1,
            left:-260,
            marginBottom:8,
            transform:[
                {
                  translateX:dragX,
                }
            ]
          },
        ]}>
        <LinearGradient
          start={{x: 0, y: 1}} end={{x: 1, y: 0.5}}
          colors={['#6F4FEF', '#4628FF']}
          style={{
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal:10,
            borderTopRightRadius:SIZES.radius,
            borderBottomRightRadius:SIZES.radius,
          }}
        >
          <TouchableOpacity
            onPress={()=> navigation.navigate('Deposit')}
            style={styles.swipeBtn}
          >
            <Text style={{...FONTS.font,color:COLORS.white,...FONTS.fontMedium}}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> navigation.navigate('Withdraw')}
            style={styles.swipeBtn}
          >
            <Text style={{...FONTS.font,color:COLORS.white,...FONTS.fontMedium}}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> sheet.current.open()}
            style={styles.swipeBtn}
          >
            <Text style={{...FONTS.font,color:COLORS.white,...FONTS.fontMedium}}>Transfer</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };


  return(
    <Swipeable renderLeftActions={renderLeftActions}>
      <View
        style={{...styles.listItem,borderColor:colors.borderColor,backgroundColor:colors.bgLight}}
      >
        <View
          style={{
            flexDirection:'row',
            alignItems:'center',
          }}
        >
          <Image 
              style={{
                height:35,
                width:35,
                marginRight:10,
                resizeMode:'contain',
              }}
              source={icon}/>
          <View>
            <Text style={{...FONTS.h6,color:colors.title,marginBottom:4}}>{coin}</Text>
            <Text style={{...FONTS.fontSm,color:colors.text}}>{subTitle}</Text>
          </View>
        </View>
        <View style={{alignItems:'flex-end'}}>
          <Text style={{...FONTS.h6,color:colors.title,marginBottom:2}}>{amount}</Text>
          <Text style={{...FONTS.fontSm,color:COLORS.success}}>{rate}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

function ButtonContainer({ buttons, onClick, scrollX }) {
  const [btnContainerWidth, setWidth] = useState(0);
  const btnWidth = btnContainerWidth / buttons.length;
  const translateX = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [0, btnWidth],
  });
  const translateXOpposit = scrollX.interpolate({
      inputRange: [0, width],
      outputRange: [0, -btnWidth],
  });
  const { colors } = useTheme();

  return (
      <View
          style={{...styles.btnContainer,backgroundColor:colors.bgLight}}
          onLayout={e => setWidth(e.nativeEvent.layout.width)}>
           
          {buttons.map((btn, i) => (
              <TouchableOpacity
                  key={btn}
                  style={styles.btn}
                  onPress={() => onClick(i)}>
                  <Text style={{...FONTS.font,...FONTS.fontMedium,color:colors.text}}>{btn}</Text>
              </TouchableOpacity>
          ))}
          <Animated.View
              style={[
                  styles.animatedBtnContainer,
                  { width: btnWidth, transform: [{ translateX }] },
              ]}>
              {buttons.map(btn => (
                  <Animated.View
                      key={btn}
                      style={[
                          styles.animatedBtn,
                          { width: btnWidth, transform: [{ translateX: translateXOpposit }] },
                      ]}>
                      <Text style={{...FONTS.font,...FONTS.fontMedium,color:COLORS.white}}>{btn}</Text>
                      <View
                        style={{
                          height:45,
                          width:btnWidth,
                          backgroundColor:COLORS.primary,
                          position:'absolute',
                          zIndex:-1,
                          bottom:0,
                        }}
                      />
                  </Animated.View>
              ))}
          </Animated.View>
      </View>
  );
}



const styles = StyleSheet.create({

  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
    borderRadius:30,
  },
  btn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  animatedBtnContainer: {
      height: 45,
      flexDirection: 'row',
      position: 'absolute',
      borderRadius:30,
      overflow: 'hidden',
  },
  animatedBtn: {
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
  },
  btnTextActive: {
      color: '#fff',
      fontWeight: 'bold',
  },
  card: {
      width: width,
  },
  inputBox:{
    borderRadius:SIZES.radius,
    width: SIZES.width - 110,
    height:45,
    borderWidth:2,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  inputBoxInner:{
      position:'absolute',
      zIndex:-1,
  },
  cardTab: {
    width: width,
  },
  listItem:{
    flexDirection:'row',
    marginHorizontal:15,
    paddingVertical:12,
    alignItems:'center',
    justifyContent:'space-between',
    borderWidth:1,
    borderRadius:SIZES.radiusLg,
    marginBottom:8,
    paddingHorizontal:14,
  },

  modalContainer:{
    backgroundColor:'rgba(0,0,0,.4)',
    flex:1,
    justifyContent:'center',
    padding:15,
  },

  swipeBtn:{
    backgroundColor:'rgba(255,255,255,.1)',
    height:40,
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:12,
    marginRight:5,
  },

  scrollView: {
    paddingLeft: (SIZES.width - itemWidth) / 2,
    paddingRight: ((SIZES.width - itemWidth) / 2) - 10,
    alignItems: 'center',
    paddingBottom:20,
    paddingTop:20,
  },
    doctdesc : {
        color: '#6F6F6F',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        fontWeight: '500',
        lineHeight:20
    },
    experience : {
        borderRadius: 3,
        // backgroundColor: '#EEF7FF',
        width: 82,
        height: 18,
        color: '#000',
        fontFamily: 'Montserrat-Bold',
        fontSize: 10,
        fontWeight: '600',
        marginVertical:5,
    },
    experience1 : {
        borderRadius: 3,
        width: 150,
        marginTop:-5,
        color: "#00539C",
        fontFamily: "Montserrat-SemiBold",
        fontSize: 10,
        fontWeight: "500",
    },
    doctName : {
        color: '#000',
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        fontWeight: '600',
    },
    listItem:{
        marginHorizontal:0,
        paddingHorizontal:10,
        marginBottom:8,
        // paddingHorizontal:12,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    address : {
        color: '#000',
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        fontWeight: '500',
        width:width-90
    },
})


export default RescheduleApt;