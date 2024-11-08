import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import CustomPicker from "./CustomPicker"; 


const FontFamily = {
  montserratSemiBold: "Montserrat-SemiBold",
  montserratMedium: "Montserrat-Medium",
  poppinsMedium: "Poppins-Medium",
};

const FontSize = {
  size_sm: 14,
};

const Color = {
  colorWhite: "#fff",
  colorMidnightblue_100: "#1f2587",
  colorDarkslategray_100: "#484848",
  colorDarkslategray_200: "#333",
  colorBlack: "#000",
};

const patients = [
  {
    name: "Vijay",
    relation: "Self",
    dob: "05/06/1987",
    age: 37,
    email: "Vijay@gmail.com",
    sex: "Male",
  },
  {
    name: "Sanjay",
    relation: "Brother",
    dob: "10/08/1990",
    age: 33,
    email: "Sanjay@gmail.com",
    sex: "Male",
  },
  {
    name: "Rajesh",
    relation: "Father",
    dob: "15/09/1965",
    age: 58,
    email: "Rajesh@gmail.com",
    sex: "Male",
  },
  {
    name: "Anjali",
    relation: "Sister",
    dob: "20/11/1995",
    age: 28,
    email: "Anjali@gmail.com",
    sex: "Female",
  },
  {
    name: "Priya",
    relation: "Mother",
    dob: "25/12/1968",
    age: 55,
    email: "Priya@gmail.com",
    sex: "Female",
  },
];

const Appointment = ({ navigation }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable 
        onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require("../../assets/images/heroiconsarrow.jpg")}
          />
        </Pressable>
        <Text style={styles.newAppointment}>New Appointment</Text> 
      </View>
      <View style={styles.choosePatientContainer}>
        <Text style={styles.choosePatient}>Choose Patient</Text>
        <Text style={styles.subText}>
          Who’re you booking an appointment for?
        </Text>
        <CustomPicker
          items={patients.map((patient) => ({
            label: patient.name,
            value: patient.name,
          }))}
          selectedValue={
            selectedPatient ? selectedPatient.name : "Select Patient"
          }
          onValueChange={(itemValue) =>
            setSelectedPatient(
              patients.find((patient) => patient.name === itemValue)
            )
          }
        />
      </View>
      {selectedPatient && (
        <View style={styles.patientDetailsContainer}>
          <Text style={styles.patientDetailsTitle}>Patient Details</Text>
          <View style={styles.patientDetailsBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Patient Name :</Text>
              <Text style={styles.detailValue}>{selectedPatient.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Relation :</Text>
              <Text style={styles.detailValue}>{selectedPatient.relation}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of Birth :</Text>
              <Text style={styles.detailValue}>{selectedPatient.dob}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Age :</Text>
              <Text style={styles.detailValue}>{selectedPatient.age} yrs</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email :</Text>
              <Text style={styles.detailValue}>{selectedPatient.email}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sex :</Text>
              <Text style={styles.detailValue}>{selectedPatient.sex}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
      <Pressable style={styles.continueButton}
       onPress={() => navigation.navigate("HealthCheckup")}>
          <Text style={styles.continueButton}>Continue</Text>
        </Pressable>
      </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorDarkslategray_100,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  newAppointment: {
    fontSize: 20,
    fontFamily: FontFamily.montserratSemiBold,
    marginLeft: 10,
    color: Color.colorBlack,
  },
  choosePatientContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  choosePatient: {
    fontSize: 20,
    color: Color.colorMidnightblue_100,
    fontFamily: FontFamily.montserratSemiBold,
  },
  subText: {
    fontSize: 12,
    color: Color.colorDarkslategray_100,
    fontFamily: FontFamily.montserratMedium,
    marginTop: 5,
  },
  patientDetailsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  patientDetailsTitle: {
    fontSize: 20,
    color: Color.colorMidnightblue_100,
    fontFamily: FontFamily.montserratSemiBold,
    textAlign: "center",
    marginBottom: 10,
  },
  patientDetailsBox: {
    borderWidth: 1,
    borderColor: Color.colorDarkslategray_100,
    borderRadius: 10,
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: Color.colorDarkslategray_200,
    fontFamily: FontFamily.montserratMedium,
  },
  detailValue: {
    fontSize: 14,
    color: Color.colorDarkslategray_200,
    fontFamily: FontFamily.montserratMedium,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 40, // Increase margin top to push the button down
  },
  continueButton: {
    backgroundColor: Color.colorMidnightblue_100,
    color: Color.colorWhite,
    fontSize: 14,
    fontFamily: FontFamily.montserratSemiBold,
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
});

export default Appointment;