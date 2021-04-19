import * as React from "react"
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { color, spacing } from "../../theme"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function VoteButton() {
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
        <Text>Гласувай</Text>
      </View>
    </SafeAreaView>
  )
}
