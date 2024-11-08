import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../layout/header";
import { longPressHandlerName } from "react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler";
import { useNavigation, useTheme } from "@react-navigation/native";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "../../Utils/theme";
import { GlobalStyleSheet } from "../../Utils/styleSheet";
import { VictoryPie } from "victory-native";
import BannerCard from "../../components/BannerCard";
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

const RatingBlock = ({ name, rating, avatarUri, style }) => (
  <View style={styles.ratingBlock}>
    <Image
      resizeMode="cover"
      source={{ uri: avatarUri }}
      style={styles.avatar}
    />
    <View style={styles.ratingTextContainer}>
      <Text style={[styles.ratingName, style]}>{name}</Text>
      <View style={styles.ratingValueContainer}>
        <Image
          resizeMode="cover"
          source={require("../../assets/images/star.png")}
          style={[styles.starIcon, style]}
        />
        <Text style={[styles.ratingValue, style]}>{rating}</Text>
        <Text style={[styles.ratingLabel, style]}>ratings</Text>
      </View>
    </View>
  </View>
);

function LabDetails({ navigation }) {
  const ratingData = [
    {
      name: "Priya Anand",
      rating: "4.5",
      avatarUri:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/244d5967b828c8c3c5394a9e418039807298d7f90c70c664cab0340098fda6c8?apiKey=0b564a62511943359ecb594cb33e8b00&",
      key: 1,
      data: "lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",
    },
    {
      name: "Anand Kumar",
      rating: "4.5",
      avatarUri:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c08bac44f374f2a55de7be2d1a9e4257f3dd1e065740a61e60c8c5a0cc143648?apiKey=0b564a62511943359ecb594cb33e8b00&",
      key: 2,
      data: "lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, zIndex: -2 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
          <Header title={"Laboratory details"} leftIcon={"back"} titleLeft />
          <View style={styles.container}>
            {/* Header and additional components here */}
            <View>
              <Image
                resizeMode="cover"
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/5fec7f682057cc1d00db21d1b25140b4050eeeba2a2e831766cc149188c8eceb?apiKey=0b564a62511943359ecb594cb33e8b00&" }}
                style={[styles.laboratoryBanner, { zIndex: 2 }]}
              />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <View>
                <Text style={styles.lifeCard}>Life Care Diagnostics</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ marginTop: 15 }} source={require('../../assets/images/clinic.jpg')}></Image>
                        <Text style={{ marginTop: 15, marginBottom: 10, color:"#333" }}>Little Mount, Saidapet Chennai</Text>
                     </View>
                    <View style={{ flexDirection: "row" }}>
                        <Image style={{ marginTop: 20 }} source={require('../../assets/images/direction.jpg')}></Image>
                        <Text style={{ marginTop: 15, marginBottom: 10, color:"#333" }}>Directions</Text>
                    </View>
                  </View>
                <View>
                  <Text
                    style={{
                      color: "black",
                      padding: 10,
                      color: "#1F2587",
                      //color: "#333333",
                      fontFamily: "Montserrat-Bold",
                      fontSize: 16,
                      fontWeight: "600",
                      paddingVertical: 10,
                      width: "80%",
                    }}
                  >
                    Description
                  </Text>
                  <Text
                    style={{
                      ...styles.boldText,
                      //color: "black",
                      fontFamily: "Montserrat-Regular",
                      padding: 10,
                    }}
                  >
                    lorem ipsum is a placeholder text commonly used to
                    demonstrate the visual form of a document
                  </Text>
                </View>
                <View>
                  <Image
                    resizeMode="cover"
                    source={require("../../assets/images/Map.jpg")}
                    style={{
                      height: 180,
                      width: 323,
                      marginLeft: 10,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  />
                  <TouchableOpacity onPress={() => navigation.navigate('Location')} >
                    <Text
                      style={{
                        ...styles.cardheading,
                        color: "#fff",
                        height: 60,
                        marginLeft: 10,
                        backgroundColor: "#1F2587",
                        width: "95%",
                        textAlign: "center",
                        borderBottomRightRadius: 10,
                        borderBottomLeftRadius: 10,
                        paddingHorizontal: 25,
                      }}
                    >
                      Tap on the map for the Directions
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/* Additional components here */}
              <View style={styles.reviewsContainer}>
                <View style={styles.reviewsHeader}>
                  <Text
                    style={{
                      color: "#333333",
                      fontFamily: "Montserrat-Bold",
                      fontSize: 16,
                      fontWeight: "600",
                      paddingVertical: 10,
                      width: "80%",
                      // lineHeight:18,
                      // height:45
                    }}
                  >
                    Reviews
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      /* Handle onPress action */
                    }}
                  >
                    <Text
                      style={{
                        color: "#0000FF",
                        marginLeft: 10,
                        paddingTop: 10,
                        borderBottomWidth: 1,
                        borderColor: "#0000FF",
                      }}
                    >
                      See all
                    </Text>
                  </TouchableOpacity>
                </View>

                {ratingData.map((item) => (
                  <View>
                    <RatingBlock
                      key={item.key}
                      name={item.name}
                      rating={item.rating}
                      avatarUri={item.avatarUri}
                      style={{ color: "#000000" }}
                    />
                    <Text
                      style={{
                        ...styles.boldText,
                        //color: "black",
                        fontFamily: "Montserrat-Regular",
                      }}
                    >
                      {item.data}
                    </Text>
                    {item.key !== ratingData.length && (
                      <View style={styles.separator} />
                    )}
                  </View>
                ))}
              </View>
              {/* Additional components here */}
             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RescheduleApt')}>
                <Text style={styles.buttonText}>Continue</Text>
                <Image
                  resizeMode="cover"
                  source={require("../../assets/images/right-arrow2.png")}
                  style={{ height: 10, width: 30, marginTop: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    maxWidth: 480,
    width: "100%",
    //padding: 20,
    //paddingHorizontal: 10,
    flexDirection: "column",
    margin: "auto",
    alignItems: "stretch",
    gap: 8,
  },
  laboratoryDetailsSection: {
    flexDirection: "row",
    alignItems: "center",
    //paddingHorizontal: 10,
    paddingVertical: 16,
  },
  laboratoryIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  laboratoryTextContainer: {
    flex: 1,
  },
  laboratoryBanner: {
    width: "100%",
    height: 200,
    marginVertical: 16,
  },
  reviewsContainer: {
    borderWidth: 1,
    margin: 10,
    borderColor: "#cccccc",
    padding: 16,
    borderRadius: 4,
    marginBottom: 20,
  },

  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    color: "black",
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#cccccc", // Adjust color as needed
    marginVertical: 8, // Adjust vertical spacing as needed
  },
  ratingBlock: {
    flexDirection: "row",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  ratingTextContainer: {
    justifyContent: "space-between",
  },
  ratingName: {
    fontWeight: "bold",
  },
  ratingValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingValue: {
    marginLeft: 4,
    fontWeight: "bold",
  },
  ratingLabel: {
    marginLeft: 4,
  },

  ////////
  lifeCard: {
    color: "#333333",
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Montserrat-SemiBold",
    paddingTop: 0,
    marginLeft: -10,

  },
  boldText: {
    //fontWeight: "500",
    //fontFamily: "Montserrat-Bold",
    fontSize: 13,
    color: "#000",
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
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Montserrat, sans-serif",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 50,
    backgroundColor: "#1F2587",
    alignSelf: "center",
    marginTop: 12,
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginBottom: 30,
  },
});

export default LabDetails;