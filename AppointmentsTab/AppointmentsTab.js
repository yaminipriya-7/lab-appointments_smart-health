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
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { VictoryPie } from "victory-native";
import BannerCard from "../../components/BannerCard";
import Header from "../../layout/header";
import PortfolioCard from "../../components/PortfolioCard";
import { FlatList, Swipeable } from "react-native-gesture-handler";
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
import TabButtonStyle1 from "../../components/Tabs/TabButtonStyle1";
import SocialBtn from "../../components/Socials/SocialBtn";
import Divider from "../../components/Dividers/Divider";
import ButtonOutline from "../../components/Button/ButtonOutline";
import { SvgXml } from "react-native-svg";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from "../../config";
import SplashScreen from "../SplashScreen";
import moment from 'moment';

const { width } = Dimensions.get('window');
const itemWidth = (SIZES.width / 1.5) + 50;
function goToAppointment() {
    navigation.navigate('BookAppointment')
}
function goToProfile() {
    navigation.navigate('DoctorProfile')
}
const DependentsData = [
  {
      name : "Online consultation",
      icon : IMAGES.appt22,
      link :'',
      bgclr:'#00539C',
  },
  {
    name : "Offline consultation",
    icon : IMAGES.appt11,
    link :'',
    bgclr:'#E16121'
  },
]
// const DoctorsData = [
//     {
//         id : '1',
//         doctname : 'Dr. Vijayakumar',
//         expertise:"General Physician",
//         date : '11 years Exp',
//         amount : '2,000',
//         exp: '12 Years Exp',
//         status : 'I’m suffering from fever for 2 days and also I have sneezing , throat pain',
//         image : ICONS.doctx5,
        
//     },
//     {
//         id : '2',
//         doctname : 'Dr. Swetha',
//         expertise:"General Physician",
//         date : 'General Physician, Special Interest in Diabetology',
//         amount : '2,000',
//         exp: '5 Years Exp',
//         status : 'I’m suffering from fever for 2 days and also I have sneezing , throat pain',
//         image : ICONS.doctx1,
//     },
//     {
//         id : '3',
//         doctname : 'Dr. Hardin',
//         expertise:"General Physician",
//         date : 'General Physician, Special Interest in Diabetology',
//         amount : '2,000',
//         exp: '12 Years Exp',
//         status : 'I’m suffering from fever for 2 days and also I have sneezing , throat pain',
//         image : ICONS.doctx3,
//     },
//     {
//         id : '4',
//         doctname : 'Dr. Hardin',
//         expertise:"General Physician",
//         date : 'General Physician, Special Interest in Diabetology',
//         amount : '2,000',
//         exp: '12 Years Exp',
//         status : 'I’m suffering from fever for 2 days and also I have sneezing , throat pain',
//         image : ICONS.doctx4,
//     },
    
// ]
const AppointmentsTab = ({navigation}) => {
  const { colors } = useTheme();
  const buttons = ['Requested', 'Upcoming', 'Completed'];
  const apiEndPoints = ['upcoming', 'confirmed', 'completed', 'cancelled'];
  const refRBSheet = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [clickedButton, setclickedButton] = useState('Requested');
  const [enableButton, setenableButton] = useState(true);
  const [btnIndex, setBtnIndex] = useState(0);
  const [DoctorsData, setDoctorsData] = useState([]);
  const {authHeaderDetails} = useContext(AuthContext);
  const [splashLoading, setSplashLoading] = useState(true);

//   const onCLick = (i)}=> {
  const onCLick = (i,btn) => {
    this.scrollViewHome.scrollTo({ x: i * SIZES.width});
    setclickedButton(btn);  
    console.log(btn);
    fetchAppointments(i);
    setBtnIndex(i);
}
// function goToVideoCall() {
const goToVideoCall = (item) => {
    navigation.navigate('Video',{apptItem:item});
}

const formatTime = (duration) => {
    var hours = Math.floor(duration / 3600);
    var minutes = Math.floor((duration % 3600) / 60);
    var seconds = duration % 60;
  
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };

const fetchAppointments = async (index) => {
    const requestOptions = { 
        method: 'GET', 
        headers: { 'Content-Type': 'application/json','Authorization':authHeaderDetails["_j"]}, 
    }; 

    try { 
        setSplashLoading(true);
        await fetch(BASE_URL+'/doctorAppointment/web/all/'+apiEndPoints[index]+'?draw=5&start=0&length=100&search[value]=', requestOptions) 
            .then(response => { 
                response.json() 
                .then(responceData => { 
                    // console.log(responceData.data);
                    var CurrentDate = moment().format('DD/MM/YYYY');
                    console.log(CurrentDate);
                    var responceDataNewField = responceData.data;
                    var updatedJsonData = [];
                    for(apt=0;apt<responceDataNewField.length;apt++) {
                        let objectData = responceDataNewField[apt];
                       
                        var hms = responceDataNewField[apt].startTime;
                        // hms = hms.replace(/AM/g, "").trim('');
                        // hms = hms.replace(/PM/g, "").trim('');
                        // your input string
                        if (hms.indexOf('-') !== -1) {
                            //split and get
                            var hms = hms.split('-')[1];

                        } else {
                            var hms = hms;
                            // var targetDate =  moment(responceDataNewField[apt].appointmentDate,'DD/MM/YYYY').format('YYYY-MM-DD')+" "+hms;
                        }
                                         

                        hms = moment(hms,"H:mm");
                        hms = hms.format("HH:mm:ss");
                        var targetDate =  moment(responceDataNewField[apt].appointmentDate,'DD/MM/YYYY').format('YYYY-MM-DD')+" "+hms;
                        console.log(targetDate)
                        targetDate = moment(targetDate).diff(moment(), 'seconds');
                        var hours  = Math.floor(targetDate / 3600);
                        var minutes =Math.floor((targetDate % 3600) / 60);
                        var seconds = targetDate % 60;

                        var totalMinutes =  parseInt((hours*60)+minutes+(seconds/60)); 
                        console.log(totalMinutes)

                       
                        if(CurrentDate === responceDataNewField[apt].appointmentDate) {
                            if(totalMinutes > 0 && totalMinutes <= 5) {
                                objectData['TodayApt'] = true;
                            } else {
                                objectData['TodayApt'] = false;
                            }
                            updatedJsonData = [...updatedJsonData,responceDataNewField[apt]]
                        } else {
                            objectData['TodayApt'] = false;
                            updatedJsonData = [...updatedJsonData,responceDataNewField[apt]]
                        }
                    }
                    console.log(updatedJsonData);
                    setDoctorsData(updatedJsonData);
                    setSplashLoading(false);
                }); 
            }) 
    } 
    catch (error) { 
        console.error(error); 
    } 
}
useEffect(() => {
    fetchAppointments(btnIndex);
  }, []);
// const {dependentsData,membersDetailsJson,fetchEcardUrl,checkPermission,ecardUrls} = useContext(AuthContext);

  // console.log(ecardUrls);
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
                    title={'Doctor Appointments'} 
                    leftIcon={'back'}
                />
               <View style={[{}]}>
                    <View style={{paddingBottom:15}}>
                        <TabButtonStyle1 buttons={buttons} onClick={onCLick} clickBtn={clickedButton} scrollX={scrollX}/>
                    </View>
                    <ScrollView
                        ref={e => (this.scrollViewHome = e)}
                        horizontal
                        // pagingEnabled
                        scrollEnabled={false}
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                        >
                        {/* tab 1 */}
                        <View style={[styles.tabBody]} >
                            { DoctorsData.length != 0 ?
                                 DoctorsData.map((item,index) => {
                                    return(
                                        <View style={{overflow:"hidden"}}>
                                            <View style={[GlobalStyleSheet.card,{backgroundColor:colors.bgLight,elevation:1,padding:0,borderLeftWidth:7},(clickedButton == "Requested") ? {borderColor:"#1F2587"} : (clickedButton == "Upcoming") ? {borderColor:"#28A745"} : {borderColor:"#fff"}]}>
                                                <View style={[GlobalStyleSheet.row]}>
                                                    <View style={[GlobalStyleSheet.col33]}>
                                                        <View style={{marginTop:10}}>
                                                            <Text style={{
                                                                        height:96,
                                                                        width:90,
                                                                        backgroundColor:"#61FFF6",
                                                                        opacity:0.1,
                                                                        borderRadius:10, 
                                                                        margin:10                                         
                                                                    }}>&nbsp;</Text>
                                                                <SvgXml 
                                                                    xml={ICONS.doctx1}  
                                                                    style={[{
                                                                        position:"absolute",
                                                                        height:108,
                                                                        width:86,
                                                                        zIndex:1,
                                                                        top:-5,
                                                                        left:20,
                                                                        marginTop:0
                                                                    }
                                                                ]}
                                                                />
                                                            </View>
                                                            <View style={{flexDirection:"row",padding:10}}>
                                                                <FontAwesome name='star' size={15} color={'#FFC200'}/>
                                                                <Text style={{...styles.rating}}>4.5 ratings</Text>
                                                            </View>
                                                    </View>
                                                    <View style={[GlobalStyleSheet.col66]}>
                                                        <Text style={{...styles.doctName}}>{item.doctorName}</Text>
                                                        <SocialBtn
                                                                icon={<FeatherIcon name='video' size={16} color={'#1F2587'}/>}
                                                                color={'#1F2587'}
                                                                text={'Online'}
                                                                textFcolor={'#1F2587'}
                                                                style={{backgroundColor:"#effffe",width:90,height:30,borderRadius:10,marginRight:10,position:'absolute',right:0}}
                                                                />
                                                        <Text style={{...styles.expertise}}>General Physician</Text>
                                                        <Text style={{...styles.experience}}>12 Years Exp</Text>
                                                        <View style={{flexDirection:"row",marginVertical:5}}>
                                                            <FeatherIcon name='file-text' size={18} color={'#666666'}/>
                                                            <Text style={{...styles.consultationfee}}>Consultation Fee ₹ 300</Text>
                                                        </View>
                                                        <View style={{flexDirection:"row"}}>
                                                            <FeatherIcon name='clock' size={18} color={'#666666'}/>
                                                            <Text style={{...styles.consultationfee}}>{item.startTime}</Text>
                                                        </View>  
                                                        {( clickedButton === "Requested") &&
                                                            <View style={[{width:'100%'}]}>
                                                                <ButtonOutline btnRounded fontTextSize={12} color={'#fff'} title={'Cancel Appointment'} style={{borderWidth:2,backgroundColor:'#1F2587',width:'auto',paddingVertical:5,marginVertical:10}}/>
                                                            </View>
                                                        }
                                                        {( clickedButton === "Upcoming") &&
                                                            <View style={[{width:'100%'}]}>
                                                                <ButtonOutline 
                                                                    btnRounded 
                                                                    fontTextSize={12} 
                                                                    color={'#fff'} 
                                                                    title={'Start Meeting'} 
                                                                    style={{borderWidth:2,backgroundColor:'#1F2587',width:'auto',paddingVertical:5,marginVertical:10}} 
                                                                    // onPress={!item.TodayApt ? '' : goToVideoCall(item)} disabled={!item.TodayApt}
                                                                    onPress={() => {
                                                                        item.TodayApt ? navigation.navigate('Video',{aptID:item.doctorAppointmentId}) : ''
                                                                      }}
                                                                      disabled={!item.TodayApt}
                                                                    />
                                                            </View>
                                                        } 
                                                    </View>
                                                </View>
                                                {/* <View style={[{flexDirection:"row",alignItems:"flex-start"}]}>
                                                    <Text style={{height:"100%",width:"100%",backgroundColor:"#1F2587",opacity:0.1,position:"absolute"}}>&nbsp;</Text>
                                                    <View style={[{alignItems:"center",width:'40%'}]}>
                                                        <ButtonOutline btnRounded fontTextSize={12}  underlinebtn color={'#1F2587'} title={'View profile'} onPress={goToProfile} style={{width:'auto',paddingVertical:5,fontSize:10,fontWeight:600,borderColor:"transparent",marginVertical:10}}/>
                                                    </View>
                                                   
                                                </View>        */}
                                            </View>
                                        </View>
                                        )
                                    })
                                    :
                                    <View>
                                        <Text style={{color:'#1F2587',fontFamily:'Montserrat-SemiBold',textAlign:'center',marginVertical:50}}>No appointments available</Text>
                                    </View>
                            }
                           
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            {
                splashLoading &&
                <View style={{height:'100%',position:'absolute',top:0,left:0,zIndex:999,width:'100%'}}>
                    <SplashScreen />
                </View>
            }
        </View>
      </SafeAreaView>
    </>
  );
};

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
    // paddingLeft: (SIZES.width - itemWidth) / 2,
    // paddingRight: ((SIZES.width - itemWidth) / 2) - 10,
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
        fontSize: 8,
        fontWeight: "500",
    },
    doctdesc : {
        color: '#6F6F6F',
        fontFamily: 'Montserrat-Bold',
        fontSize: 14,
        fontWeight: '500',
        lineHeight:20
    },
    experience : {
        color: '#1F2587',
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        fontWeight: '600',
        marginVertical:5,
    },
    consultationfee : {
        color: '#666666',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        fontWeight: '500',
        // marginVertical:0,
        marginHorizontal:5
    },
    rating : {
        color: '#000',
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        fontWeight: '600',
        marginHorizontal:5
    },
    experience1 : {
        borderRadius: 3,
        width: 150,
        marginTop:-5,
        color: "#00539C",
        fontFamily: "Montserrat-SemiBold",
        fontSize: 8,
        fontWeight: "500",
    },
    doctName : {
        color: '#333',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        fontWeight: '600',
    },
    expertise : {
        color: '#333',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        fontWeight: '500',
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
    tabBody: {
        width: SIZES.width,
        paddingHorizontal:10,
        marginLeft:0
    },
})


export default AppointmentsTab;
