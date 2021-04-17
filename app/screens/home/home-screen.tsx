import React, { useEffect, useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import * as Google from "expo-google-app-auth"
import { googleConfig } from "../../config/firebase"
import firebase from "firebase"
import { ScrollView } from "react-native-gesture-handler"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  backgroundColor: "purple",
}
const TEXT: TextStyle = {
  color: color.palette.orange,
  fontFamily: typography.primary,
  fontSize: 20,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

const AVATAR_IMAGE: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: color.primary,
  alignSelf: "center",
}

const USER_INFORMATION: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
}

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const currentUser = firebase.auth().currentUser
  const [parties, setParties] = useState(undefined)

  useEffect(() => {
    const partiesRef = firebase.database().ref("parties")
    partiesRef.on("value", (snapshot) => {
      const partiesData = snapshot.val()
      setParties(partiesData)
    })
  }, [])

  const userInformation = (user: firebase.User) => {
    return (
      <View style={USER_INFORMATION}>
        <Image source={{ uri: user.photoURL }} style={AVATAR_IMAGE} />
        <View style={{ marginHorizontal: 10 }}>
          <Text>{user.displayName}</Text>
          <Text>{user.email}</Text>
        </View>
        <Button preset="primary" text="Sign Out" onPress={() => logOut()} />
      </View>
    )
  }

  const loadParties = (data) => {
    return (
      <ScrollView>
        {Object.keys(data).map((el: any, index) => {
          return (
            <View key={index}>
              <Text>{el}</Text>
              <Text>{data[el].slogan}</Text>
              <Image source={{ uri: data[el].logo }} style={{ width: 50, minHeight: 20 }} />
            </View>
          )
        })}
      </ScrollView>
    )
  }

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("welcome")
      })
  }

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text style={TEXT}>Home Screen</Text>
        {currentUser ? userInformation(currentUser) : null}
        {parties ? loadParties(parties) : null}
      </Screen>
    </View>
  )
})
