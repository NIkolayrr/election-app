import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  Dimensions,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { WebView } from "react-native-webview"

const FULL: ViewStyle = { flex: 1, backgroundColor: "purple" }
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
  fontSize: 20,
}

const deviceWidth = Dimensions.get("screen").width

const webView = (url) => {
  return (
    <WebView
      originWhitelist={["*"]}
      source={{
        uri: url,
      }}
      sharedCookiesEnabled={true}
      style={{ marginTop: 20, width: deviceWidth }}
    />
  )
  // return <WebView source={{ uri: url }} style={{ marginTop: 20 }} />
}

export const DetailsScreen = observer(function DetailsScreen(props: any) {
  const navigation = useNavigation()
  const data = props.route.params.data
  console.log("the data", data.manifest)
  return (
    <View testID="DetailsScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Image
          source={{ uri: data.logo }}
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
        />
        <Text style={TEXT}>{data.name}</Text>
        <Text style={TEXT}>{data.slogan}</Text>
        <Text>Хора</Text>
        <Text>Манифест</Text>
        <View style={{ height: 400 }}>{webView(data.manifest)}</View>
      </Screen>
    </View>
  )
})
