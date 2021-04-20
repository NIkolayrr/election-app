import React from "react"
import { Image, ImageStyle, Text, View, ViewStyle } from "react-native"
import { Button } from "../button/button"
import firebase from "firebase"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const USER_INFORMATION: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const AVATAR_IMAGE: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: color.primary,
  alignSelf: "center",
}

export function CustomHeader(props: { user: firebase.User }) {
  const navigation = useNavigation()

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("welcome")
      })
  }
  return (
    <View style={USER_INFORMATION}>
      <Image source={{ uri: props.user.photoURL }} style={AVATAR_IMAGE} />
      <View>
        <Text style={{ color: color.palette.orangeDarker }}>{props.user.displayName}</Text>
        <Text style={{ color: color.palette.orangeDarker }}>{props.user.email}</Text>
      </View>
      <Button preset="primary" text="Sign Out" onPress={() => logOut()} />
    </View>
  )
}
