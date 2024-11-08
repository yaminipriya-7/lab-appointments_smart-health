import React, { useRef, useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  SafeAreaView,
  PermissionsAndroid,
  Linking,
  api,
  TouchableHighlight,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import PortfolioCard from "../../components/PortfolioCard";
import { Swipeable } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import TransferSheet from "../../components/BottomSheet/TransferSheet";
import FeatherIcon from "react-native-vector-icons/Feather";
import { AuthContext } from "../../context/AuthContext";
import { ListStyle1 } from "../../components/list/ListStyle1";
import DropShadow from "react-native-drop-shadow";
import SocialBtn from "../../components/Socials/SocialBtn";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ripple from "react-native-material-ripple";
import Geolocation from "react-native-geolocation-service";
import Pose1 from "../../components/svgImages/Pose1";
import Button from "../../components/Button/Button";
import HeaderStyle1 from "../../components/Headers/HeaderStyle1";
import { SvgXml } from "react-native-svg";
import IncomingCallNotification from "../../components/Modal/IncomingCallNotification";
import UsePushNotification from "../../Screens/VideoCall/UsePushNotification";

const { width } = Dimensions.get("window");

const itemWidth = SIZES.width / 1.5 + 50;
let eachcardWidth = width / 3;

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    console.log("granted", granted);
    if (granted === "granted") {
      console.log("You can use Geolocation");
      return true;
    } else {
      console.log("You cannot use Geolocation");
      return false;
    }
  } catch (err) {
    return false;
  }
};

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const buttons = ["FAVOURITES", "TOP GAINERS", "TOP LOSERS"];
  const onCLick = (i) => this.scrollViewHome.scrollTo({ x: i * width });
  const [clickedCard, setClickedCard] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [newMessage, setNewMessage] = useState({});
  const [cnt, setCnt] = useState(0);

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = UsePushNotification();

  function consultHandler() {
    navigation.navigate("Video");
    // navigation.navigate("Consultation");
  }
  // console.log(eachcardWidth+"-------------------");
  // const [location, setLocation] = useState(false);
  // useEffect(() => {
  //   getLocation();
  // }, []);
  // const getLocation = () => {
  //   const result = requestLocationPermission();
  //   result.then(res => {
  //     console.log('res is:', res);
  //     if (res) {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           setLocation(position);
  //           let locationName = getlocationName(position.coords.latitude,position.coords.longitude);
  //         },
  //         error => {
  //           setLocation(false);
  //         },
  //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //       );
  //     }
  //   });
  // };

  // const getlocationName = async (lat,long) => {
  //   const apiKey = 'AIzaSyDlq3BHc6dhl6D_eCZmX3pjw4y4YhLucRU'
  //   const response = await api.get(https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey});
  // };

  const refRBSheet = useRef();
  const {
    userInfo,
    splashLoading,
    dependentsData,
    membersDetailsJson,
    claimDetailsData1,
  } = useContext(AuthContext);
  let addressname =
    membersDetailsJson.city != null
      ? membersDetailsJson.city
      : "" + ", " + membersDetailsJson.state != null
      ? membersDetailsJson.state
      : "";
  // console.log(addressname);
  console.log(newMessage);
  function clickCard(linkData) {
    console.log(linkData);
    navigation.navigate(linkData);
  }
  function BookApt() {
    navigation.navigate("OnlineConsultation");
  }
  const DATA = [
    {
      image: IMAGES.corporate1,
      title: "Corporate Plan",
      desc: "Valid till 31st March 2024",
    },
    {
      image: IMAGES.corporate1,
      title: "Corporate Plan",
      desc: "Valid till 31st March 2024",
    },
  ];

  const scrollValue = useRef(new Animated.Value(0)).current;
  // addressname = "sdfsd"
  console.disableYellowBox = true;
  const CardData = [
    {
      id: "1",
      icon: ICONS.myappt,
      title: "My Doctors",
      amount: "₹ " + membersDetailsJson.sumInsured + " \n",
      rate: "+4.95%",
      linkData: "MyDoctors",
    },
    {
      id: "2",
      icon: ICONS.mydoctor,
      title: "My Appointments",
      linkData: "MyAppointments",
    },
    {
      id: "3",
      icon: ICONS.myreport,
      title: "My Reports",
      amount: "₹ " + membersDetailsJson.sumInsured + " \n",
      rate: "+4.95%",
      linkData: "",
    },
  ];
  const serviceArray = [
    {
      id: "1",
      icon: IMAGES.service1,
      title: "Find a Doctor",
      amount: "₹ " + membersDetailsJson.sumInsured + " \n",
      rate: "+4.95%",
      linkData: "Appointment",
    },
    {
      id: "2",
      icon: IMAGES.service2,
      title: "Book Labtest",
      amount: "₹ " + membersDetailsJson.sumInsured + " \n",
      rate: "+4.95%",
      linkData: "Appointment",
    },
    {
      id: "3",
      icon: IMAGES.service3,
      title: "Health tracker",
      linkData: "",
    },
    {
      id: "4",
      icon: IMAGES.service4,
      title: "Activity tracker",
      amount: "₹ " + membersDetailsJson.sumInsured + " \n",
      rate: "+4.95%",
      linkData: "ActivityTrackingFeature",
    },
  ];

  const handleState = (messageObj) => {
    setNewMessage(messageObj);
  };

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit(setNewMessage);
        listenToBackgroundNotifications(setNewMessage);
        listenToForegroundNotifications(setNewMessage);
        onNotificationOpenedAppFromBackground(setNewMessage);
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();

    // claimDetailsData();
    // fetchEcardUrl('8','51016160000514Z');
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
            <Image
              style={{
                height: 188,
                width: "100%",
                resizeMode: "cover",
                tintColor: "#1F2587",
                position: "absolute",
                zIndex: -1,
              }}
              source={IMAGES.curvedbg}
            />
            <HeaderStyle1
              search={false}
              title={
                typeof membersDetailsJson.firstName != "undefined"
                  ? "Hi " + membersDetailsJson.firstName.split(" ")[0]
                  : ""
              }
              color="#fff"
              navigattion={navigation}
              style={{
                backgroundColor: "#1F2587",
                marginVertical: 60,
                shadowColor: "#1F2587",
              }}
            />
            <View>
              {/* <Pose1 /> */}
              <View
                style={{
                  ...styles.container,
                  position: "absolute",
                  top: -20,
                  zIndex: 99,
                  marginBottom: 30,
                }}
              >
                <ScrollView
                  horizontal
                  pagingEnabled
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
                    { useNativeDriver: false }
                  )}
                >
                  {DATA.map((data, index) => (
                    <View
                      style={{
                        ...styles.slideItem,
                        ...GlobalStyleSheet.card,
                        shadowColor: "#000",
                        borderRadius: 10,
                        paddingHorizontal: 0,
                        elevation: 5,
                      }}
                      key={index}
                    >
                      <View style={GlobalStyleSheet.row}>
                        <View
                          style={{
                            ...GlobalStyleSheet.col50,
                            paddingHorizontal: 20,
                          }}
                        >
                          <Text style={styles.slideTitle}>{data.title}</Text>
                          <Text style={styles.slideDesc}>{data.desc}</Text>
                        </View>
                        <View style={GlobalStyleSheet.col50}>
                          <Image
                            style={{
                              height: 46,
                              width: "100%",
                              resizeMode: "contain",
                            }}
                            source={data.image}
                          />
                        </View>
                        <View
                          style={{
                            ...GlobalStyleSheet.col100,
                            marginTop: 30,
                            marginBottom: -15,
                          }}
                        >
                          <Image
                            style={{
                              height: 61,
                              width: "100%",
                              resizeMode: "cover",
                            }}
                            source={IMAGES.cardbg1}
                          />
                          <TouchableOpacity style={{ position: "absolute" }}>
                            <Text
                              style={{
                                fontFamily: "Montserrat-SemiBold",
                                color: "#1F2587",
                                fontSize: 12,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                              }}
                            >
                              Know your Benefits {">"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.indicatorConatiner} pointerEvents="auto">
                  {DATA.map((x, i) => (
                    <Indicator i={i} key={i} scrollValue={scrollValue} />
                  ))}
                </View>
              </View>
              <View style={{ paddingTop: 180, paddingHorizontal: 10 }}>
                <Text
                  style={[
                    styles.cardheading,
                    { paddingLeft: 15, color: "#1F2587" },
                  ]}
                >
                  Our Services
                </Text>
                <ScrollView
                  horizontal
                  // pagingEnabled
                  decelerationRate="fast"
                  showsHorizontalScrollIndicator={false}
                  // style={{height:120,marginTop:40}}
                  // onScroll={Animated.event(
                  //     [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
                  //     { useNativeDriver: false },
                  // )}
                >
                  {serviceArray.map((data, index11) => (
                    <TouchableOpacity
                      onPress={() =>
                        data.linkData != ""
                          ? navigation.navigate(data.linkData)
                          : ""
                      }
                      key={index11}
                    >
                      <Image
                        style={{
                          height: 150,
                          width: 128,
                          resizeMode: "contain",
                          // position:'absolute'
                        }}
                        source={data.icon}
                      />
                      <Text
                        style={{
                          color: "#333333",
                          textAlign: "center",
                          fontFamily: "Montserrat-Bold",
                          fontWeight: "600",
                          fontSize: 10,
                        }}
                      >
                        {data.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderColor: colors.borderColor,
                      backgroundColor: "#fff",
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                      borderRadius: SIZES.radiusLg,
                      marginBottom: 15,
                      ...GlobalStyleSheet.card,
                      backgroundColor: "#fff",
                      elevation: 4,
                      shadowColor: "#000",
                      marginTop: 30,
                      paddingVertical: 10,
                      overflow: "hidden",
                    },
                  ]}
                >
                  <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <Text
                      style={[
                        styles.cardheading,
                        { paddingTop: 0, width: "50%" },
                      ]}
                    >
                      Book Annual Health Checkups
                    </Text>
                    <View style={styles.column}>
                      <View style={styles.row}>
                        <View style={styles.bullet}>
                          <Text style={styles.bulletStyle}>
                            {"\u2022" + " "}
                          </Text>
                        </View>
                        <View style={styles.bulletText}>
                          <Text>
                            <Text style={styles.boldText}>Diabetes</Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.bullet}>
                          <Text style={styles.bulletStyle}>
                            {"\u2022" + " "}
                          </Text>
                        </View>
                        <View style={styles.bulletText}>
                          <Text>
                            <Text style={styles.boldText}>Thyroid</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.column}>
                      <View style={styles.row}>
                        <View style={styles.bullet}>
                          <Text style={styles.bulletStyle}>
                            {"\u2022" + " "}
                          </Text>
                        </View>
                        <View style={styles.bulletText}>
                          <Text>
                            <Text style={styles.boldText}>Heart</Text>
                          </Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <View style={styles.bullet}>
                          <Text style={styles.bulletStyle}>
                            {"\u2022" + " "}
                          </Text>
                        </View>
                        <View style={styles.bulletText}>
                          <Text>
                            <Text style={styles.boldText}>Kidney</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[GlobalStyleSheet.col44, { marginBottom: 10 }]}
                    >
                      <Button
                        btnRounded
                        title={"Book Now"}
                        color={"#1F2587"}
                        onPress={BookApt}
                      />
                    </View>
                  </View>
                  <Image
                    style={{
                      height: 180,
                      width: 180,
                      resizeMode: "contain",
                      position: "absolute",
                      zIndex: -1,
                      right: 0,
                      bottom: -10,
                    }}
                    source={IMAGES.annualhealth}
                  />
                </View>
                <Text style={[styles.cardheading, { paddingLeft: 15 }]}>
                  Quick Access
                </Text>
              </View>
              <View style={[GlobalStyleSheet.row, { marginHorizontal: 10 }]}>
                {CardData.map((data, index22) => {
                  let insertNewCard;
                  return (
                    // <View>
                    <TouchableOpacity
                      onPress={() =>
                        data.linkData != ""
                          ? navigation.navigate(data.linkData)
                          : ""
                      }
                      style={[
                        {
                          marginHorizontal: 5,
                          marginBottom: 15,
                          backgroundColor: "#EAF9F9",
                          shadowColor: "#000",
                          elevation: 4,
                          borderRadius: 10,
                        },
                      ]}
                      key={index22}
                    >
                      {/* <View> */}
                      <PortfolioCard
                        icon={data.icon}
                        rate={data.rate}
                        title={data.title}
                        card={true}
                        xmlimg
                        xmlstyle={true}
                        // onPress={setClickedCard(false)}
                      />
                      {/* </View> */}
                      {/* <View>
                            <Text style={{...FONTS.linkname,textAlign:"center",color:"#404040",paddingBottom:10,width:eachcardWidth-30}}>{data.title}</Text>
                        </View> */}
                    </TouchableOpacity>
                    // </View>
                  );
                })}
              </View>

              <Ripple
                style={[
                  {
                    // flexDirection:'row',
                    // alignItems:'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    ...GlobalStyleSheet.card,
                    backgroundColor: "transparent",
                    elevation: 3,
                    height: 150,
                    position: "relative",
                    overflow: "hidden",
                    shadowColor: "#000",
                  },
                ]}
              >
                <Image
                  style={{
                    height: "100%",
                    width: SIZES.width - 10,
                    resizeMode: "cover",
                    position: "absolute",
                    zIndex: -1,
                    height: 150,
                    borderRadius: 15,
                    left: 0,
                    // right:0,
                    // bottom:-10,
                  }}
                  source={IMAGES.pslbg}
                />
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text
                    style={[
                      styles.cardheading,
                      { paddingTop: 0, color: "#1F2587" },
                    ]}
                  >
                    Lab Test
                  </Text>
                  <Text
                    style={[
                      styles.cardheading,
                      { paddingTop: 0, color: "#333333", fontSize: 10 },
                    ]}
                  >
                    Get your full body checkup!
                  </Text>
                  <Text
                    style={[
                      styles.cardheading,
                      { paddingTop: 0, color: "#333333", fontSize: 10 },
                    ]}
                  >
                    @ 20% discount
                  </Text>

                  <View
                    style={[
                      GlobalStyleSheet.col50,
                      {
                        justifyContent: "flex-start",
                        position: "absolute",
                        left: 0,
                        bottom: 0,
                      },
                    ]}
                  >
                    <Button title={"Book Now"} color={"#1F2587"} />
                  </View>
                  <Image
                    style={{
                      height: 126,
                      width: 126,
                      resizeMode: "contain",
                      position: "absolute",
                      zIndex: -1,
                      borderRadius: 15,
                      right: 0,
                      // right:0,
                      // bottom:-10,
                    }}
                    source={IMAGES.labimg}
                  />
                </View>
              </Ripple>
              <Ripple
                style={[
                  {
                    // flexDirection:'row',
                    // alignItems:'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    ...GlobalStyleSheet.card,
                    backgroundColor: "transparent",
                    elevation: 3,
                    height: 180,
                    position: "relative",
                    // overflow:'hidden',
                    shadowColor: "#000",
                    backgroundColor: "#fff",
                  },
                ]}
              >
                <View style={{ flex: 1, backgroundColor: "transparent" }}>
                  <Text
                    style={[
                      styles.cardheading,
                      { paddingTop: 0, color: "#1F2587", paddingBottom: 0 },
                    ]}
                  >
                    Monitor your Daily activity
                  </Text>
                  <Text
                    style={[
                      {
                        ...styles.cardheading,
                        color: "#00539C",
                        fontSize: 10,
                        fontFamily: "Montserrat-Regular",
                        width: "50%",
                      },
                    ]}
                  >
                    Track your daily activities with your Device
                  </Text>

                  <View style={[GlobalStyleSheet.col33, { marginLeft: -10 }]}>
                    <Button title={"Check Now"} color={"#1F2587"} />
                  </View>
                </View>
                <SvgXml
                  xml={ICONS.watch}
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    zIndex: 999,
                  }}
                />
                <SvgXml
                  xml={ICONS.toprtbg}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: -1,
                    borderTopRightRadius: 40,
                  }}
                />
                <SvgXml
                  xml={ICONS.bottomelft}
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    zIndex: -1,
                  }}
                />
              </Ripple>
              <View
                style={[
                  {
                    // flexDirection:'row',
                    // alignItems:'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    backgroundColor: "transparent",
                    elevation: 3,
                    height: 180,
                    position: "relative",
                    // overflow:'hidden',
                    shadowColor: "#000",
                    borderRadius: 10,
                    backgroundColor: "#fff",
                  },
                ]}
              >
                <View style={{ flex: 1, padding: 20 }}>
                  <Image
                    style={{
                      height: 170,
                      width: 250,
                      resizeMode: "contain",
                      tintColor: "#1F2587",
                      position: "absolute",
                      zIndex: -1,
                    }}
                    source={IMAGES.cbg4}
                  />

                  <Text
                    style={[
                      styles.cardheading,
                      { paddingTop: 0, color: "#1F2587", paddingBottom: 0 },
                    ]}
                  >
                    Consult Doctors
                  </Text>
                  <Text
                    style={[
                      {
                        ...styles.cardheading,
                        color: "#00539C",
                        fontSize: 10,
                        fontFamily: "Montserrat-Regular",
                        width: "50%",
                      },
                    ]}
                  >
                    Get Expert Advice from our specialist Doctors
                  </Text>

                  <View style={[GlobalStyleSheet.col33, { marginLeft: -10 }]}>
                    <Button
                      title={"Book Now"}
                      color={"#1F2587"}
                      onPress={BookApt}
                    />
                    {/* <Button btnRounded title={'Book Now'} color={'#1F2587'} onPress={BookApt}/> */}
                  </View>
                </View>

                {/* {/* <SvgXml xml={ICONS.doct2}  style={{position:"absolute",bottom:0,right:30,zIndex:99999,backgroundColor:'transparent'}}/> */}
                <SvgXml
                  xml={ICONS.cornerbg}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    zIndex: 999,
                  }}
                />
                <View
                  style={{
                    height: 42,
                    backgroundColor: "#1F2587",
                    width: "100%",
                    paddingHorizontal: 0,
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      ...styles.cardheading,
                      color: "#fff",
                      paddingHorizontal: 25,
                    }}
                  >
                    Smart Health
                  </Text>
                  <Image
                    style={{
                      height: 180,
                      width: 170,
                      resizeMode: "contain",
                      position: "absolute",
                      zIndex: 999,
                      right: 20,
                      bottom: -24,
                    }}
                    source={IMAGES.cdoct2}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        {Object.keys(newMessage).length != 0 ? (
          <IncomingCallNotification
            notification={newMessage}
            handleState={handleState}
            navigate={navigation}
            modalEnable={modalVisible}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

function Indicator({ i, scrollValue }) {
  const { colors } = useTheme();

  const translateX = scrollValue.interpolate({
    inputRange: [
      -SIZES.width + i * SIZES.width,
      i * SIZES.width,
      SIZES.width + i * SIZES.width,
    ],
    outputRange: [-20, 0, 20],
  });
  return (
    <View style={[styles.indicator, { backgroundColor: colors.borderColor }]}>
      <Animated.View
        style={[styles.activeIndicator, { transform: [{ translateX }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  svgStyle: {
    width: "150%",
    height: "100%",
    position: "relative",
  },
  cardheading: {
    color: "#333333",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: 10,
    width: "80%",
    // lineHeight:18,
    // height:45
  },
  buttonStyle: {
    backgroundColor: "#e16121",
    padding: 15,
    borderRadius: 30,
    fontWeight: "600",
    width: "35%",
    marginTop: 30,
    marginBottom: 20,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 10,
  },
  pressed: {
    opacity: 0.75,
  },
  headings: {
    color: "#FFF",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    fontWeight: "600",
  },
  text1: {
    color: "#2F2F2F",
    fontSize: 22,
    marginTop: 60,
    color: "#2F2F2F",
    fontFamily: "Montserrat-Bold",
    fontWeight: "600",
  },
  gradiantstyle: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: 5,
    paddingBottom: 80,
  },
  text2: {
    color: "#9F9F9F",
    fontFamily: "Montserrat-Bold",
    fontSize: 10,
    fontWeight: "600",
  },
  welcomeContainer: {
    paddingLeft: 20,
  },
  slideItem11: {
    // width: SIZES.width/6,
    // height: 98,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    // paddingHorizontal:1,
    marginHorizontal: 5,
    borderRadius: 4,
  },
  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: "row",
    width: "100%",
    borderRadius: 30,
  },
  fontstyles: {
    color: "#5C5C5C",
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    fontWeight: "800",
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedBtnContainer: {
    height: 45,
    flexDirection: "row",
    position: "absolute",
    borderRadius: 30,
    overflow: "hidden",
  },
  animatedBtn: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    width: width,
  },
  inputBox: {
    borderRadius: SIZES.radius,
    width: SIZES.width - 110,
    height: 45,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputBoxInner: {
    position: "absolute",
    zIndex: -1,
  },
  cardTab: {
    width: width,
  },
  listItem: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: SIZES.radiusLg,
    marginBottom: 8,
    paddingHorizontal: 14,
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "red",
  },
  modalContainer: {
    backgroundColor: "rgba(0,0,0,.4)",
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },

  swipeBtn: {
    backgroundColor: "rgba(255,255,255,.1)",
    height: 40,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    marginRight: 5,
  },

  scrollView: {
    paddingLeft: (SIZES.width - itemWidth) / 2,
    paddingRight: (SIZES.width - itemWidth) / 2 - 10,
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  column: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 1,
  },
  bullet: {
    width: 20,
    height: 30,
    fontSize: 20,
    fontWeight: "bold",
    position: "relative",
  },
  bulletStyle: {
    color: "#4CD7D0",
    fontSize: 30,
    position: "absolute",
    top: -12,
  },
  bulletText: {
    flex: 1,
    color: "#000",
  },
  boldText: {
    fontWeight: "600",
    color: "#484848",
    fontFamily: "Montserrat-Bold",
    fontSize: 10,
  },
  normalText: {},
  container: {
    flex: 1,
  },
  slideItem: {
    flexDirection: "row",
    width: SIZES.width - 15,
    // height: '100%',
    alignItems: "center",
    justifyContent: "center",
    // padding:20,
    // paddingVertical:90,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 7,
    // paddingVertical:40,
    // shadowColor:'#000',
  },
  indicatorConatiner: {
    alignSelf: "center",
    // position: 'absolute',
    // bottom: 10,
    flexDirection: "row",
    // marginVertical:5
    // paddingBottom:70
  },
  slideTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  slideDesc: {
    fontFamily: "Montserrat-Regular",
    fontSize: 10,
    fontWeight: "400",
    color: "#6666",
    textAlign: "left",
    // marginVertical:20,
  },
  indicator: {
    height: 5,
    width: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  activeIndicator: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1F2587",
    borderRadius: 10,
  },
});

export default HomeScreen;