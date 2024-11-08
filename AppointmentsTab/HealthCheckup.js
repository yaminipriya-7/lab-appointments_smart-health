import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyleSheet } from '../../Utils/styleSheet';
import Unorderedlist from 'react-native-unordered-list';
import Header from '../../layout/header';

const healthCheckupPackages = [
  {
    key: '1',
    title: 'Package 1',
    description: 'Parents Health checkup Home Collection Package',
    tests: [
      'Complete Blood Count: Hemoglobin ESR, PCV, MCHC, MCV, MCH, Total WBC (TLC). Differential Count (DLC). Per Pheral Smear, Platelet Count',
      'Lipid Profile: Total Cholesterol. LDL, HDL, Triglycerides screening, ratio of Cholesterol/HDL',
      'Thyroid Function Test: T3, T4 & TSH.',
      'Kidney Profile: Serum Creatinine, Serum Urea, and Uric acid Routine.',
      'Blood Sugar Level (Fasting and Post Prandial)',
    ],
  },
  {
    key: '2',
    title: 'Package 2',
    description: 'Parents Health checkup Lab Collection Package',
    tests: [
      'Complete Blood Count: Hemoglobin ESR, PCV, MCHC, MCV, MCH, Total WBC (TLC). Differential Count (DLC). Per Pheral Smear, Platelet Count',
      'Lipid Profile: Total Cholesterol. LDL, HDL, Triglycerides screening, ratio of Cholesterol/HDL',
      'Thyroid Function Test: T3, T4 & TSH.',
      'Kidney Profile: Serum Creatinine, Serum Urea, and Uric acid Routine.',
      'Blood Sugar Level (Fasting and Post Prandial)',
    ],
  },
];

const PackageDetails = ({ title, description, tests }) => (
  <View style={{ ...styles.packageContainer, ...GlobalStyleSheet.card, shadowColor: '#000', borderRadius: 10, paddingHorizontal: 20, elevation: 5, marginHorizontal: 30, borderTopWidth: 8, borderTopColor: "#1AA259" }}>
    <View style={styles.packageTitleContainer}>
      <Text style={styles.packageTitleText}>{title}</Text>
    </View>
    <View style={{ ...styles.packageDescription, ...GlobalStyleSheet.card, shadowColor: '#1F2587', borderRadius: 3, paddingHorizontal: 10, elevation: 10, marginHorizontal: 20, backgroundColor: '#fff', paddingVertical: 5 }}>
      <Text style={styles.descriptionText}>{description}</Text>
    </View>
    <View style={styles.testsContainer}>
      <Text style={styles.testsContainerTitle}>This Package includes the below tests:</Text>
      {tests.map((test, index) => (
        <Unorderedlist color='#1F2587' style={{ fontSize: 25, marginTop: -5 }} key={index}>
          <Text style={styles.testDescription}>{test}</Text>
        </Unorderedlist>
      ))}
    </View>
  </View>
);

const HealthCheckup = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Header 
            title={'Package'} 
            leftIcon={'back'}
            titleLeft
          />
          <View style={styles.packageListContainer}>
            {healthCheckupPackages.map(packageItem => (
              <TouchableOpacity
                key={packageItem.key}
                style={styles.packageDescription}
                onPress={() => navigation.navigate('SelectLab')}
              >
                <PackageDetails
                  title={packageItem.title}
                  description={packageItem.description}
                  tests={packageItem.tests}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    maxWidth: 480,
    width: "100%",
    paddingBottom: 80,
    flexDirection: "column",
    alignItems: "stretch",
    margin: "0 auto",
  },
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  packageListContainer: {
    marginTop: 25,
  },
  packageContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    boxShadow: "0px 0px 4px 0px #1F2587 inset",
    paddingVertical: 24,
    paddingHorizontal: 14,
    marginBottom: 24,
  },
  packageTitleText: {
    color: '#484848',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  descriptionText: {
    color: '#1F2587',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  packageTitleContainer: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  packageDescription: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,
    marginVertical: 16,
    textAlign: "center",
  },
  testsContainer: {
    marginTop: 12,
  },
  testDescription: {
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    color: '#333333',
    marginLeft: 5,
    marginBottom: 10,
  },
  testsContainerTitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    marginTop: 8,
    color: '#333333',
  },
});

export default HealthCheckup;