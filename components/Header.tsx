import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Header_logo from "../assets/svgs/header_component";
import { UserCircle, CaretLeft } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type Props = {
  goBack: boolean;
};

export function Header(props: Props) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {props.goBack ? (
        <View style={{ paddingRight: 8 }}>
          <TouchableOpacity onPress={router.back}>
            <CaretLeft size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ paddingRight: 8 }}>
          <CaretLeft size={32} color="#0D0F17" />
        </View>
      )}

      <View style={{ marginTop: 16 }}>
        <Header_logo />
      </View>
      <TouchableOpacity>
        <UserCircle size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 8,
  },
});
