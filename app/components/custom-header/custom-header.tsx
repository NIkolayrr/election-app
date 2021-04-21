import React from "react"
import { Dimensions, Image, ImageStyle, PlatformColor, Text, View, ViewStyle } from "react-native"
import { Button } from "../button/button"
import firebase from "firebase"
import { color, spacing } from "../../theme"
import { useNavigation } from "@react-navigation/native"

const USER_INFORMATION: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: Dimensions.get("screen").width - 80,
}

const AVATAR_IMAGE: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: color.primary,
  alignSelf: "center",
  marginRight: spacing[4],
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
      <View
        style={{
          flexGrow: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={{ uri: props.user.photoURL }} style={AVATAR_IMAGE} />
        <Text style={{ color: color.palette.orangeDarker }}>{props.user.displayName}</Text>
      </View>
      <Button preset="primary" text="Sign Out" onPress={() => logOut()} />
    </View>
  )
}
