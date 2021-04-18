import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  ImageBackground,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import * as Google from "expo-google-app-auth"
import { googleConfig } from "../../config/firebase"
import firebase from "firebase"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"

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
  padding: spacing[2],
}

const LOGO: ImageStyle = {
  flex: 1,
  maxWidth: 50,
  minWidth: 50,
  justifyContent: "flex-start",
}

const PARTIE_CONTAINER: ViewStyle = {
  borderWidth: 2,
  borderColor: "red",
  marginVertical: 10,
  display: "flex",
  flexDirection: "row",
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
          <Text style={{ color: color.palette.orangeDarker }}>{user.displayName}</Text>
          <Text style={{ color: color.palette.orangeDarker }}>{user.email}</Text>
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
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("details", { data: data[el] })}
            >
              <View style={PARTIE_CONTAINER}>
                <Image source={{ uri: data[el].logo }} resizeMode="contain" style={LOGO} />
                <View>
                  <Text>{data[el].name}</Text>
                  <Text>{data[el].slogan}</Text>
                </View>
              </View>
            </TouchableOpacity>
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
      {currentUser ? userInformation(currentUser) : null}
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        {parties ? loadParties(parties) : null}
      </Screen>
    </View>
  )
})
