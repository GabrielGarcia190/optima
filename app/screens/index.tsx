import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacityBase,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { AppButton } from "../../components/AppButton";
import { useRouter } from "expo-router";
import {
  CalendarCheck,
  CalendarPlus,
  Plus,
  Scroll,
  User,
} from "phosphor-react-native";
import { database } from "../../firebase/config/firebaseConfig";

export default function AddScreen() {
  const router = useRouter();
  const [cliente, setCliente] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    setCreatedAt(new Date().toLocaleDateString());
  }, []);

  async function addDataToFirebase() {
    try {
      addDoc(collection(database, "ordem_Serviço"), {
        cliente: cliente,
        createdAt: createdAt,
        deliveryDate: deliveryDate,
        descricao: descricao,
      });
      alert("Dados adicionados com sucesso");
      setCliente("");
      setDeliveryDate("");
      setDescricao("");
    } catch (error) {
      console.log("Não foi possível adicionar os dados" + error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={true} />
      <View style={styles.addView}>
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Cadastrar Ordem
          </Text>
        </View>
        <View>
          <View style={{ marginLeft: 20 }}>
            <View
              style={{ flexDirection: "row", marginTop: 50, marginBottom: 10 }}
            >
              <User size={20} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                Cliente
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Insira o nome do cliente"
              value={cliente}
              onChangeText={(text) => setCliente(text)}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}
            >
              <CalendarPlus size={20} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                Data Criação
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Insira a data de criação"
              value={createdAt}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}
            >
              <CalendarCheck size={20} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                Escolha a data da entrega
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Insira a data de entrega"
              value={deliveryDate}
              onChangeText={(text) => setDeliveryDate(text)}
            />
          </View>
          <View style={{ marginLeft: 20 }}>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 10 }}
            >
              <Scroll size={20} color="#fff" />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                Descrição do Serviço
              </Text>
            </View>
            <TextInput
              multiline={true}
              numberOfLines={5}
              style={{
                backgroundColor: "#323D48",
                color: "#fff",
                width: "90%",
                paddingLeft: 9,
                borderRadius: 10,
              }}
              placeholder="Descrição do serviço"
              onChangeText={(text) => setDescricao(text)}
              value={descricao}
            />
          </View>
          <View style={{ width: "100%", alignItems: "center", marginTop: 200 }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: "90%",
                backgroundColor: "#4CAF50",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={addDataToFirebase}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                Concluir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F17",
    alignItems: "center",
  },
  addView: {
    width: "90%",
    height: "90%",
    backgroundColor: "#151B21",
    borderRadius: 10,
  },
  input: {
    width: "90%",
    backgroundColor: "#323D48",
    height: 40,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
  },
});
