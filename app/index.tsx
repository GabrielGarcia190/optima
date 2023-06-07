import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Logo from "../assets/svgs/logo_optima";
import { GoogleLogo, GithubLogo, FacebookLogo } from "phosphor-react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View style={style.container}>
      <View style={{ alignItems: "center", marginTop: 100 }}>
        <Text style={{ color: "white", fontFamily: "Montserrat_100Thin" }}>
          Bem vindo ao
        </Text>
        <Text style={style.title}>Optima</Text>
        <Logo size={40} />
      </View>
      <View style={style.loginButtons}>
        <TouchableOpacity onPress={() => router.push('home')}>
          <GoogleLogo size={32} color="#F93D47" />
        </TouchableOpacity>
        <TouchableOpacity>
          <GithubLogo size={32} color="#F93D47" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FacebookLogo size={32} color="#F93D47" />
        </TouchableOpacity>
      </View>
      <Text style={style.textLogin}>Faça Login para</Text>
      <Text style={style.textLogin}>continuar</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D0F17",
  },
  title: {
    lineHeight: 40,
    color: "white",
    fontSize: 40,
    fontFamily: "Montserrat_100Thin",
  },
  loginButtons: {
    marginTop: 170,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
  },
  textLogin: {
    fontSize: 12,
    color: "white",
    fontFamily: "Montserrat_100Thin",
  },
});
