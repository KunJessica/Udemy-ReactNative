import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Quote from './components/Quote';
import NewQuote from './components/NewQuote';
import BigButton from './components/BigButton';
import IconButton from './components/IconButton';

// SQLite ist dateibasiert
const database = SQLite.openDatabaseSync('quotes.db');

// 2) unsere UI-Komponente deklarieren (Bestandteil der Benutzeroberfläche) = Bereitstellung durch Funktion
// export default sorgt dafür, dass es im Projekt zur Verfügung steht und importiert werden kann
// Name der Funktion = Name der Komponente und Abspeicherung in gleichnamiger Datei
export default function App() {
  const [index, setIndex] = useState(0);
  const [showNewDialog, setNewDialog] = useState(false);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    initDB();
    loadQuotes();
  }, []); // --> leeres Array sorgt für einmalige Ausführung

  function initDB(){
    database.runSync('CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY NOT NULL, text TEXT, author TEXT);');
  }

  function addQuoteToList(text, author){
    setNewDialog(false);
      // Neues Zitat den bisherigen hinzufügen
      const newQuotes = 
      [
        ...quotes,        // Spread-Operator: um aus einem Array alle Elemente rausziehen 
        { text, author }, // text ~ text: text
      ];
      setQuotes(newQuotes);
      setIndex(newQuotes.length -1);
      saveQuotes(text, author, newQuotes);
  }

  function removeQuoteFromList(){
    const newQuotes = [...quotes];
    const id = quotes[index].id;

    newQuotes.splice(index, 1);
    setIndex(0);
    setQuotes(newQuotes);
    database.runAsync('DELETE FROM quotes WHERE id=?', id);
  }

  function deleteQuote(){
    Alert.alert(
      'Zitat löschen',
      'Soll das Zitat wirklich gelöscht werden?',
      [
        {text: 'Abbrechen', style: 'cancel'}, 
        {text: 'Bestätigen', style: 'destructive', onPress: removeQuoteFromList},
      ]
    )
  }

  async function saveQuotes(text, author, newQuotes){
    const result = await database.runAsync(
      'INSERT INTO quotes (text, author) VALUES (?,?)',
      text, author
    );

    //ID im neuen Zitat setzen
    newQuotes[newQuotes.length -1].id = result.lastInsertRowId;
    setQuotes(newQuotes);
  }

  async function loadQuotes(){
    const rows = await database.getAllAsync('SELECT * FROM quotes');
    setQuotes(rows);
  }

  let content = <Text style={styles.noQuotes}>Keine Zitate</Text>;

  if(quotes.length > 0){
    const quote = quotes[index]; 
    content = <Quote text={quote.text} author={quote.author}/>;
  }
   
  return (
    // JSX JavaScript and XML (Beschreibt Syntax aus Klammern um leichteren Einstieg zu ermöglichen)
   
  <View style={styles.container}>
    {quotes.length === 0 ? null : (
      <IconButton 
       onPress={deleteQuote} 
       icon="delete" 
       style={styles.delete} 
      />
    )}
    <IconButton 
      onPress={() => setNewDialog(true)} 
      icon="add-circle" 
      style={styles.new} 
    />
    <NewQuote 
      visible={showNewDialog} 
      onCancel={() => setNewDialog(false)} 
      onSave={addQuoteToList}
    />
    {content}
    {quotes.length < 2 ? null : (
    <BigButton 
      style={styles.next}
      title="Nächstes Zitat" 
      onPress={() => setIndex((index + 1) % quotes.length)} 
    />
    )}
  <StatusBar style="auto" />
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb6c1', 
    alignItems: 'center',     
    justifyContent: 'center',
  },
  buttonRow: {
  flexDirection: 'row',
  gap: 50, 
  marginTop: 70,
  },
  next: {
    position: 'absolute', 
    bottom: 60,
  },
  new:  {
    position: 'absolute', 
    top: 60,
    right: 30,
  },
  newZitatButton: {
    color: '#FFF',
    fontSize: 20,
  },
  delete: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
  noQuotes: {
    fontSize: 36,
    fontWeight: '300'
  }
});

// Props: dienen dazu, Eigenschaften an Komponenten zu übergeben
// bei Button z.B. title = Eigenschaft, die dazu dient die Beschriftung des Buttons zu setzen
// Komponenten werden konfigurierbar
// Grundsätzlich müssen eig. alle Probs mit geschweiften Klammern umgeben sein
// wenn es ein String ist, dann darf man die geschweiften Klammern weglassen