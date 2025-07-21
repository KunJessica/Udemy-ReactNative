import { Text, View, StyleSheet } from 'react-native';

//bei mehreren exports in einer Datei müsste man beim import
// {} nehmen. 
export default function Quote({ author, text}){
 return(
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.author}>&mdash; {author}</Text>
    </View>
    );
}


// Zugriff auf StyleSheet gibt React Native vor
const styles = StyleSheet.create({
    container: {
        //borderWidth: 2,
        //paddingLeft: 10,
        //paddingRight: 10,
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 25,
        fontStyle: 'italic',
        marginBottom: 10,
        textAlign: 'center',
    },
    author: {
        fontSize: 16,
        textAlign: 'right',
    },
});
