import { ActivityIndicator, StyleSheet, View, FlatList, Text } from 'react-native';
import FriendListItem from '../components/FriendListItem';
import { useState, useEffect, use } from 'react';

export default function HomeScreen({navigation}){
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    async function fetchData(){
        setLoading(true);
            try{
                const response = await fetch('https://randomuser.me/api?results=20');
                const json = await response.json();
                
                setData(json.results);
            }catch(error){
                alert('Fehler beim Laden');
            }
            setLoading(false);
        }

    useEffect(() => {
        fetchData(); // Simulation von 3 Sekunden warten
    }, []); // wird genau einmal aufgerufen


    if(isLoading){
        return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="darkorange"/>
        </View>
    );
    }
 

    return (
        <View style={styles.container}>
        <FlatList 
            data={data} 
            renderItem={({ item }) => (
                <FriendListItem 
                    friend={item} 
                    onPress={() => 
                        navigation.navigate('Friend', {friend: item})
                    } 
                />
            )}
            keyExtractor={(item) => item.email} //eindeutiger Schlüssel
            ItemSeparatorComponent={<View style={styles.listSeparator}/>}
            ListEmptyComponent={<Text style={styles.listEmpty}>Keine Daten geladen</Text>}
            refreshing={isLoading}
            onRefresh={fetchData}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    listSeparator: {
        height: StyleSheet.hairlineWidth, 
        backgroundColor: 'lightsalmon'
    },
    listEmpty: {
        fontSize: 32,
        paddingTop: 100,
        textAlign: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    });