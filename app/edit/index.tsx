import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TextInput,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../../firebase/config/firebaseConfig";
import { Header } from "../../components/Header";
import {
  CalendarCheck,
  CalendarPlus,
  Scroll,
  Trash,
  User,
} from "phosphor-react-native";

export default function EditScreen() {
  const router = useRouter();
  const [cliente, setCliente] = useState<string>();
  const [createdAt, setCreatedAt] = useState<string>();
  const [deliveryDate, setDeliveryDate] = useState<string>();
  const [descricao, setDescricao] = useState<string>();
  const [docId, setDocId] = useState<string>();
  const params = useLocalSearchParams();
  const id = params.id;
  const ordem: DocumentData[] = [];
  const ordemId: Array<string> = [];

  async function buscarDados() {
    const q = query(
      collection(database, "ordem_Serviço"),
      where("id", "==", id)
    );
    try {
      const querySnapshot = await getDocs(q);
      const docs: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        ordem.push(doc.data());
        ordemId.push(doc.id);
      });
      setDocId(ordemId[0]);
      setCliente(ordem.map((item) => item.cliente)[0]);
      setCreatedAt(ordem.map((item) => item.createdAt)[0]);
      setDeliveryDate(ordem.map((item) => item.deliveryDate)[0]);
      setDescricao(ordem.map((item) => item.descricao)[0]);
    } catch (error) {
      alert("Erro ao buscar dados:" + error);
    }
  }

  async function editarDados() {
    const dbRef = doc(database, "ordem_Serviço", String(docId));
    try {
      await updateDoc(dbRef, {
        cliente: cliente,
        createdAt: createdAt,
        deliveryDate: deliveryDate,
        descricao: descricao,
      });
      buscarDados();
    } catch (error) {
      alert("Erro ao editar dados:" + error);
    }
  }

  async function deletarDados() {
    const dbRef = doc(database, "ordem_Serviço", String(docId));
    try {
      await deleteDoc(dbRef);
      alert("Dados deletados com sucesso!");
      router.push("/home");
    }
    catch (error) {
      alert("Erro ao deletar dados:" + error);
    }
  }


  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={true} />
      <View style={styles.editView}>
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Editar Serviço
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
          <View
            style={{
              width: "80%",
              alignItems: "center",
              marginLeft: 20,
              marginTop: 40,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                height: 50,
                width: "80%",
                margin: 10,
                backgroundColor: "#4CAF50",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={editarDados}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
                Concluir
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                width: "20%",
                marginRight: 5,
                backgroundColor: "#F93D47",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={deletarDados}
            >
              <Trash size={32} color="#fff" />
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
  editView: {
    width: "90%",
    height: "80%",
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
