import { useNavigation } from "@react-navigation/native"
import * as React from "react"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { color, spacing } from "../../theme"
// import Privacy from "../../../assets/icon/Privacy.svg"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function VoteButton() {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: color.primary,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: spacing[4],
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.navigate("vote")}>
          <Text>Гласувай</Text>
          {/* <Privacy width={120} height={40} /> */}
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  )
}
