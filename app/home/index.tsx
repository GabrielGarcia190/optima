import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header";
import { AppButton } from "../../components/AppButton";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import {
  CalendarCheck,
  CalendarPlus,
  FlagCheckered,
  List,
  Plus,
  Scroll,
  User,
} from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { database } from "../../firebase/config/firebaseConfig";
import { ListItem } from "react-native-elements";

interface ordem_Serviço {
  cliente: string;
  creteadAt: string;
  deliveryDate: string;
  descricao: string;
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState([]);
  const [ordem_Serviço, setOrdem_Serviço] = useState([]);
  const [selectedItem, setSelectedItem] = useState<number>(-1);

  let monitor = 0;

  const consultarDadosFirestore = async () => {
    setLoading(true);
    const q = query(collection(database, "ordem_Serviço"));

    try {
      const listaDados: any = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        listaDados.push(doc.data());
      });
      setDados(listaDados);
      setLoading(false);
    } catch (error) {
      alert("Erro ao consultar dados");
      setLoading(false);
      console.error("Erro ao consultar dados:", error);
    }
  };

  function gotoAddScreen() {
    monitor = 1;
    router.push("screens");
  }

  useFocusEffect(
    React.useCallback(() => {
      consultarDadosFirestore();
    }, [])
  );

  function handleItemClick(index: number) {
    setSelectedItem(index);
    console.log(index);
    console.log(selectedItem);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header goBack={false} />
      <View style={{ height: "85%" }}>
        {loading ? (
          <View style={{ marginTop: 350 }}>
            <ActivityIndicator size={50} color="#3F64EF" />
          </View>
        ) : (
          <ScrollView style={styles.scroll}>
            {dados.map(
              (dados, index) =>
                dados["cliente"] && (
                  <ListItem
                    containerStyle={styles.listItem}
                    key={index}
                    onPress={() => handleItemClick(index)}
                  >
                    {selectedItem === index ? (
                      <><ListItem.Content>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: "50%",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <FlagCheckered size={32} color="#F93D47" />
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 15,
                              marginLeft: 5,
                            }}
                          >
                            Nº da ordem:
                          </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 15,
                              marginRight: 10,
                            }}
                          >
                            {index}
                          </Text>
                        </View>
                      </View>
                     
                    </ListItem.Content>
                    <ListItem.Content>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: "50%",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <User size={32} color="#F93D47" />
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 15,
                              marginLeft: 5,
                            }}
                          >
                            Cliente:
                          </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 15,
                              marginRight: 10,
                            }}
                          >
                            {dados["cliente"]}
                          </Text>
                        </View>
                      </View>
                    </ListItem.Content>
                    <ListItem.Content>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: "50%",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CalendarPlus  size={32} color="#F93D47" />
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 15,
                              marginLeft: 5,
                            }}
                          >
                            Data de criação:
                          </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 15,
                              marginRight: 10,
                            }}
                          >
                            {dados["createdAt"]}
                          </Text>
                        </View>
                      </View>
                    </ListItem.Content>
                    <ListItem.Content>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            width: "50%",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CalendarCheck  size={32} color="#F93D47" />
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 15,
                              marginLeft: 5,
                            }}
                          >
                            Entrega:
                          </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 15,
                              marginRight: 10,
                            }}
                          >
                            {dados["deliveryDate"]}
                          </Text>
                        </View>
                      </View>
                    </ListItem.Content>
                    <ListItem.Content>
                      <View style={{ flexDirection: "row" , alignItems:'flex-start', alignContent:'flex-start'}}>
                        <View
                          style={{
                            width: "50%",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Scroll   size={32} color="#F93D47" />
                          <Text
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              fontSize: 15,
                              marginLeft: 5,
                            }}
                          >
                            Descrição:
                          </Text>
                        </View>
                        <View style={{ width: "50%", alignItems: "flex-end" }}>
                          <Text
                            style={{
                              color: "white",
                              fontSize: 15,
                              marginRight: 10,
                            }}
                          >
                            {dados["descricao"]}
                          </Text>
                        </View>
                      </View>
                    </ListItem.Content></>
                    ) : (
                      <>
                        <ListItem.Content>
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <FlagCheckered size={32} color="#fff" />
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: 15,
                                  marginLeft: 5,
                                }}
                              >
                                Nº da ordem:
                              </Text>
                            </View>
                            <View
                              style={{ width: "50%", alignItems: "flex-end" }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 15,
                                  marginRight: 10,
                                }}
                              >
                                {index}
                              </Text>
                            </View>
                          </View>
                        </ListItem.Content>
                        <ListItem.Content>
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <User size={32} color="#fff" />
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: 15,
                                  marginLeft: 5,
                                }}
                              >
                                Cliente:
                              </Text>
                            </View>
                            <View
                              style={{ width: "50%", alignItems: "flex-end" }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 15,
                                  marginRight: 10,
                                }}
                              >
                                {dados["cliente"]}
                              </Text>
                            </View>
                          </View>
                        </ListItem.Content>
                        <ListItem.Content>
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <CalendarPlus size={32} color="#fff" />
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: 15,
                                  marginLeft: 5,
                                }}
                              >
                                Data de criação:
                              </Text>
                            </View>
                            <View
                              style={{ width: "50%", alignItems: "flex-end" }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 15,
                                  marginRight: 10,
                                }}
                              >
                                {dados["createdAt"]}
                              </Text>
                            </View>
                          </View>
                        </ListItem.Content>
                        <ListItem.Content>
                          <View style={{ flexDirection: "row" }}>
                            <View
                              style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <CalendarCheck size={32} color="#fff" />
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: 15,
                                  marginLeft: 5,
                                }}
                              >
                                Entrega:
                              </Text>
                            </View>
                            <View
                              style={{ width: "50%", alignItems: "flex-end" }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 15,
                                  marginRight: 10,
                                }}
                              >
                                {dados["deliveryDate"]}
                              </Text>
                            </View>
                          </View>
                        </ListItem.Content>
                        <ListItem.Content>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "flex-start",
                              alignContent: "flex-start",
                            }}
                          >
                            <View
                              style={{
                                width: "50%",
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Scroll size={32} color="#fff" />
                              <Text
                                style={{
                                  color: "white",
                                  fontWeight: "bold",
                                  fontSize: 15,
                                  marginLeft: 5,
                                }}
                              >
                                Descrição:
                              </Text>
                            </View>
                            <View
                              style={{ width: "50%", alignItems: "flex-end" }}
                            >
                              <Text
                                style={{
                                  color: "white",
                                  fontSize: 15,
                                  marginRight: 10,
                                }}
                              >
                                {dados["descricao"]}
                              </Text>
                            </View>
                          </View>
                        </ListItem.Content>
                      </>
                    )}
                  </ListItem>
                )
            )}
          </ScrollView>
        )}
      </View>
      <View style={styles.footer}>
        <AppButton
          icon={<Plus size={32} color="#fff" />}
          onClick={gotoAddScreen}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F17",
  },
  scroll: {
    backgroundColor: "#0D0F17",
  },
  footer: {
    margin: 10,
    height: "100%",
    alignItems: "flex-end",
  },
  listItem: {
    backgroundColor: "#151B21",
    marginBottom: 20,
    color: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 5,
    flexDirection: "column",
  },
});
