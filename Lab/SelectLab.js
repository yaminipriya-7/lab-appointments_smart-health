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
  SafeAreaView,
  Pressable,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { VictoryPie } from "victory-native";
import BannerCard from "../../components/BannerCard";
import Header from "../../layout/header";
import PortfolioCard from "../../components/PortfolioCard";
import { FlatList, Swipeable, TextInput } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import RBSheet from "react-native-raw-bottom-sheet";
import BalanceChart from "../../components/chart/BalanceChart";
import TransferSheet from "../../components/BottomSheet/TransferSheet";
import ThemeBtn from "../../components/ThemeBtn";
import Swiper from "react-native-swiper";
import FeatherIcon from "react-native-vector-icons/Feather";
import HeaderStyle4 from "../../components/Headers/HeaderStyle4";
import Button from "../../components/Button/Button";
import ButtonLight from "../../components/Button/ButtonLight";
import HeaderStyle3 from "../../components/Headers/HeaderStyle3";
import { AuthContext } from "../../context/AuthContext";
// import TabButtonStyle1 from "../../../app_v1/components/Tabs/TabButtonStyle1";
import SocialBtn from "../../components/Socials/SocialBtn";
import Divider from "../../components/Dividers/Divider";
import ButtonOutline from "../../components/Button/ButtonOutline";
import CustomInput from "../../components/Input/CustomInput";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SvgXml } from "react-native-svg";
import { BASE_URL } from "../../config";
import moment from "moment";

const { width } = Dimensions.get("window");
const { width1 } = Dimensions.get("window");
const { width2 } = Dimensions.get("window");
const { width3 } = Dimensions.get("window");

const itemWidth = SIZES.width / 1.5 + 50;

const DependentsData = [
  {
    name: "Online consultation",
    icon: IMAGES.appt22,
    link: "",
    bgclr: "#00539C",
  },
  {
    name: "Offline consultation",
    icon: IMAGES.appt11,
    link: "",
    bgclr: "#E16121",
  },
];

let DoctorsData = [
  {
    id: "1",
    doctname: "Dr. Vijayakumar",
    expertise: "General Physician",
    date: "11 years Exp",
    amount: "2,000",
    exp: "12 Years Exp",
    status:
      "I’m suffering from fever for 2 days and also I have sneezing , throat pain",
    image: ICONS.doctx5,
  },
  {
    id: "2",
    doctname: "Dr. Swetha",
    expertise: "General Physician",
    date: "General Physician, Special Interest in Diabetology",
    amount: "2,000",
    exp: "5 Years Exp",
    status:
      "I’m suffering from fever for 2 days and also I have sneezing , throat pain",
    image: ICONS.doctx1,
  },
  {
    id: "3",
    doctname: "Dr. Hardin",
    expertise: "General Physician",
    date: "General Physician, Special Interest in Diabetology",
    amount: "2,000",
    exp: "12 Years Exp",
    status:
      "I’m suffering from fever for 2 days and also I have sneezing , throat pain",
    image: ICONS.doctx3,
  },
  {
    id: "4",
    doctname: "Dr. Hardin",
    expertise: "General Physician",
    date: "General Physician, Special Interest in Diabetology",
    amount: "2,000",
    exp: "12 Years Exp",
    status:
      "I’m suffering from fever for 2 days and also I have sneezing , throat pain",
    image: ICONS.doctx4,
  },
];
const SelectLab = ({ navigation }) => {
  const { colors } = useTheme();
  const buttons = ["New Request", "Upcoming", "Completed"];
  const refRBSheet = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const onCLick = (i) =>
    this.scrollViewHome.scrollTo({ x: i * SIZES.width - 60 });
  const scrollX2 = useRef(new Animated.Value(0)).current;
  const onCLick2 = (i) =>
    this.scrollViewHome2.scrollTo({ x: i * SIZES.width - 60 });
  const [unavailabelDates, setunavailabelDates] = useState([]);
  const [doctorsJson, setdoctorsJson] = useState([]);
  const [searValue, setSearValue] = useState("");
  const [count, setCount] = useState(1);
  let searchedValue = "";
  //DoctorsData = doctorsJson;
  // const {dependentsData,membersDetailsJson,fetchEcardUrl,checkPermission,ecardUrls} = useContext(AuthContext);

  const doctorsFetch = (svalue, initstep, listcount) => {
    setSearValue(svalue);
    // console.log(e);
    if (svalue.length > 3) {
      fetch(
        BASE_URL +
          "doctor/web/all?start=" +
          initstep +
          "&length=" +
          listcount +
          "&search[value]=" +
          svalue
      )
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson.data);
          setdoctorsJson(responseJson.data);
          // console.log(ntwHospitalJson.length)
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      doctorOnLoad();
    }
  };
  const doctorOnLoad = () => {
    fetch(BASE_URL + "doctor/all")
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log("hiiiiiiii")
        // console.log(responseJson);
        setdoctorsJson(responseJson);
        // console.log(ntwHospitalJson.length)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  function goToAppointment(jsonData) {
    // let doctorId = jsonData.doctorId;
    navigation.navigate("BookAppointment", jsonData);
  }
  function goToProfile(jsonData) {
    // console.log(jsonData.doctorId);
    let doctorId = jsonData.doctorId;
    navigation.navigate("DoctorProfile", doctorId);
  }

  const LocationView = ({ source, text }) => (
    <View style={styles.locationContainer}>
      <Image style={styles.locationIcon} source={IMAGES.mapmark} />
      <Text style={styles.locationText}>{text}</Text>
    </View>
  );

  const ChangeView = ({ text }) => (
    <Text style={styles.changeText}>{text}</Text>
  );

  const SearchBar = ({ iconSource, placeholder }) => (
    <View style={styles.searchBarContainer}>
      <FontAwesome
        style={{ opacity: 1, ...styles.searchIcon }}
        name={"search"}
        size={15}
        color={colors.text}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#484848"
        // onChangeText={txt => {
        //     onSearch(txt);
        //     setSearch(txt);
        // }}
        style={styles.searchPlaceholder}
        // style={styles.inputContainer}
      />
    </View>
  );

  useEffect(() => {
    doctorOnLoad();
  }, []);

  // console.log(ecardUrls);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
            <Header title={"Select Lab"} leftIcon={"back"} titleLeft />
            <View style={styles.mainContainer}>
              <View style={styles.headerContainer}>
                <LocationView text="Saidapet ,Chennai, India." />
                <ChangeView text="Change" />
              </View>
              <SearchBar placeholder="Search by lab, location, speciality" />
            </View>
            <View style={[{ paddingHorizontal: 20 }]}>
              <View
                style={{ marginVertical: 15, paddingHorizontal: 15 }}
              ></View>
              {DoctorsData.length == 0 ? (
                <View>
                  <Text
                    style={{
                      color: "#555",
                      textAlign: "center",
                      color: "red",
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: 12,
                      marginVertical: 50,
                    }}
                  >
                    Search Doctors by Name, address or speciality !!!
                  </Text>
                </View>
              ) : (
                DoctorsData.map((item, index) => {
                  return (
                    <View
                      style={{
                        ...styles.container,
                        ...GlobalStyleSheet.card,
                        shadowColor: "#000",
                        paddingTop: 0,
                        elevation: 3,
                      }}
                    >
                     
                      <View style={styles.innerContainer}>
                        <View>
                          <Text style={styles.headerText}>
                            Life Care Diagnostics
                          </Text>
                        </View>
                        <View style={styles.detailItemContainer}>
                          <Image
                            source={IMAGES.call}
                            style={{ ...styles.icon, tintColor: "#1F2587" }}
                          />
                          <View style={styles.detailTextContainer}>
                            <Text
                              style={{
                                color: "#484848",
                                fontSize: 10,
                                fontFamily: "Montserrat-SemiBold",
                              }}
                            >
                              8978787687687
                            </Text>
                          </View>
                        </View>
                        <View style={styles.detailItemContainer}>
                          <Image
                            source={IMAGES.mapmark}
                            style={{ ...styles.icon, tintColor: "#1F2587" }}
                          />
                          <View style={styles.detailTextContainer}>
                            <Text
                              style={{
                                color: "#484848",
                                fontSize: 10,
                                fontFamily: "Montserrat-SemiBold",
                              }}
                            >
                              Little Mount Saidapet, Chennai.
                            </Text>
                          </View>
                        </View>
                        <View style={styles.servicesContainer}>
                          <Text style={styles.servicesText}>
                            Health Checkup Packages
                          </Text>
                          <View style={styles.servicesList}>
                            <Text style={styles.serviceItem}>Scan</Text>
                            <Text style={styles.serviceDivider}>|</Text>
                            <Text style={styles.serviceItem}>Ultrasound</Text>
                            <Text style={styles.serviceDivider}>|</Text>
                            <Text style={styles.serviceItem}>Pathology</Text>
                          </View>
                        </View>
                        <View style={styles.ratingContainer}>
                          <View style={styles.ratingTextContainer}>
                            <Image
                              source={IMAGES.labimg}
                              style={styles.ratingIcon}
                            />
                            <Text style={styles.ratingText}>
                              <Image
                                source={IMAGES.star}
                                style={{ height: 12, width: 12, marginTop: -2 }}
                              />
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginHorizontal: 10,
                                  fontSize: 12,
                                }}
                              >
                                {" "}
                                4.5
                              </Text>{" "}
                              ratings
                            </Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.button}
                      onPress={() =>  navigation.navigate("LabDetails")}>
                        <Text style={styles.buttonText}>Book Appointment</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: "row",
    width: "100%",
    borderRadius: 30,
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
    // paddingLeft: (SIZES.width - itemWidth) / 2,
    // paddingRight: ((SIZES.width - itemWidth) / 2) - 10,
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  doctdesc: {
    color: "#6F6F6F",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  experience: {
    color: "#1F2587",
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    fontWeight: "600",
    marginVertical: 5,
  },
  consultationfee: {
    color: "#666666",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    fontWeight: "500",
    // marginVertical:0,
    marginHorizontal: 5,
  },
  rating: {
    color: "#000",
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 5,
  },
  experience1: {
    borderRadius: 3,
    width: 150,
    marginTop: -5,
    color: "#00539C",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 8,
    fontWeight: "500",
  },
  doctName: {
    color: "#333",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    fontWeight: "600",
  },
  expertise: {
    color: "#333",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    fontWeight: "500",
  },
  listItem: {
    marginHorizontal: 0,
    paddingHorizontal: 10,
    marginBottom: 8,
    // paddingHorizontal:12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  address: {
    color: "#000",
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    fontWeight: "500",
    width: width - 90,
  },
  tabBody: {
    // width: SIZES.width - 20,
    // marginHorizontal:-10
    margin: 20,
    // width: SIZES.width - 60,
  },
  mainContainer: {
    display: "flex",
    maxWidth: "100%",
    flexDirection: "column",
  },
  headerContainer: {
    backgroundColor: "#f8f8fb",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    paddingVertical: 9,
    flexDirection: "row",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    width: 16,
    height: 16, // Assuming square images for location icons
    marginRight: 12,
    tintColor: "#484848",
  },
  locationText: {
    color: "#484848",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 10,
  },
  changeText: {
    color: "#1F2587",
    textDecorationLine: "underline",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 10,
  },
  searchBarContainer: {
    borderRadius: 19,
    borderColor: "#B4B4B4",
    borderWidth: 1,
    backgroundColor: "#f4f4f9",
    alignSelf: "center",
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    // paddingVertical: 7,
    width: "90%",
  },
  searchIcon: {
    paddingVertical: 2,
    width: 24,
    height: 24,
    // marginVertical: 12,
  },
  searchPlaceholder: {
    color: "#484848",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 10,
    height: 35,
    width: "100%",
    // backgroundColor:'#000'
  },
  container: {
    borderRadius: 12,
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 390,
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 16,
  },
  innerContainer: {
    alignItems: "stretch",
    gap: 8,
  },
  //   headerContainer: {
  //     alignSelf: "start",
  //     marginTop: 4,
  //   },
  headerText: {
    color: "#1F2587",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
    paddingTop: 10,
  },
  detailItemContainer: {
    display: "flex",
    flexDirection: "row",
    // marginTop: 8,
    alignItems: "center",
  },
  detailTextContainer: {
    marginLeft: 4,
  },
  icon: {
    width: 14,
    height: 14,
  },
  servicesContainer: {
    marginTop: 8,
    alignItems: "flex-start",
  },
  servicesText: {
    borderRadius: 2,
    backgroundColor: "rgba(31, 37, 135, 0.10)",
    color: "#263238",
    justifyContent: "center",
    padding: 4,
    fontSize: 8,
    fontFamily: "Montserrat-SemiBold",
    width: 120,
  },
  servicesList: {
    display: "flex",
    flexDirection: "row",
    marginTop: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceItem: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 10,
    color: "#33333",
  },
  serviceDivider: {
    marginHorizontal: 6,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 10,
    color: "#33333",
  },
  ratingContainer: {
    flexDirection: "row",
    // marginTop: 8,
    alignItems: "center",
    position: "absolute",
    right: 0,
    backgroundColor: "#effffe",
    padding: 5,
    borderRadius: 10,
  },
  ratingIcon: {
    width: 86,
    height: 100,
    // marginTop: 28,
  },
  ratingTextContainer: {
    marginLeft: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "Montserrat, sans-serif",
    color: "#000",
  },
  ratingTextSub: {
    fontSize: 10,
    fontFamily: "Montserrat, sans-serif",
    color: "#333",
  },
  button: {
    borderRadius: 24,
    backgroundColor: "#1F2587",
    alignSelf: "center",
    marginTop: 12,
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 60,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
  },
});

export default SelectLab;