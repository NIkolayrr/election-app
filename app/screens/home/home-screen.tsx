import React, { useEffect, useState } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import * as Google from "expo-google-app-auth"
import { googleConfig } from "../../config/firebase"
import firebase from "firebase"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
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

export const HomeScreen = observer(function HomeScreen() {
  const navigation = useNavigation()
  const currentUser = firebase.auth().currentUser

  useEffect(() => {
    console.log(" current user", currentUser)
  }, [])

  const userInformation = (user: firebase.User) => {
    return (
      <View>
        <Image source={{ uri: user.photoURL }} style={AVATAR_IMAGE} />
        <Text>{user.displayName}</Text>
      </View>
    )
  }

  const logOut = () => {
    console.log("sign out")
    firebase.auth().signOut()
    navigation.navigate("welcome")
  }
  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text style={TEXT}>Home Screen</Text>
        {currentUser ? userInformation(currentUser) : null}
        <Button preset="primary" text="Sign Out" onPress={() => logOut()} />
      </Screen>
    </View>
  )
})
