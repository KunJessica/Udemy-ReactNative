import { Image, StyleSheet, Text, Pressable, View } from 'react-native';
// Standardlayout bei einer View = flexDirection 'column'

export default function FriendListItem({friend, onPress}){

    return(
        <Pressable style={styles.container} onPress={onPress}>
            <Image style={styles.image} source={{uri: friend.picture.thumbnail}}/>
            <View style={styles.info}>
                <Text style={styles.name}>{friend.name.first} {friend.name.last} </Text>
                <Text style={styles.email}>{friend.email}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        gap: 10,
        height: 70,
        padding: 10,
        alignItems: 'center',
    },
    info: {
        justifyContent: 'space-evenly',
    },
    image: {
        width: 50, 
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 20,
    },
    email: {
        fontSize: 16,
        fontWeight: '100',
    },
});