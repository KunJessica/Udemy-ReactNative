import { Pressable, StyleSheet, Text } from 'react-native';


export default function BigButton({ onPress, title, style }){
    return(
    <Pressable 
      onPress={onPress} 
      style={[styles.button, style]}
    >
    <Text style={styles.title}>{title}</Text>
    </Pressable>
    );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#808080',
    borderColor: '#808080',
    borderRadius: 10
  },
  title: {
    color: '#FFF',
    fontSize: 20
  },
});
 