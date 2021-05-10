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
  color: color.palette.white,
  fontFamily: typography.secondary,
  fontSize: 20,
}

export const VoteScreen = observer(function VoteScreen() {
  const navigation = useNavigation()

  return (
    <View testID="VoteScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Text style={TEXT}>Гласувай!</Text>
      </Screen>
    </View>
  )
})
