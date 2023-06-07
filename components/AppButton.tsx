import { View, TouchableOpacity, StyleSheet } from "react-native";

type ButtonProps = {
    icon: React.ReactNode;
    onClick: () => void;
  }

export function AppButton(props: ButtonProps){
    return(
        <View>
        <TouchableOpacity style={styles.button} onPress={props.onClick}> 
         {props.icon}
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F93D47",
        width: 56,
        height: 56,
    },

})