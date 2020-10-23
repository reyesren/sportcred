import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { HelperText, TextInput, Text } from 'react-native-paper';

const EditableText = (props) => {
  const [text, setText] = React.useState(props.presetText);
  const [previousText, setPreviousText] = React.useState('');

  const [editing, setEditing] = React.useState(false);

  const onChangeText = text => setText(text);

  const hasErrors = () => {
    return false;
  };

  const buttonHandler = () => {
    if(!editing) setPreviousText(text);
    setEditing(!editing);
  }
  const cancelButtonHandler = () => {
    setEditing(false);
    setText(previousText);
  }

  const styles = StyleSheet.create({
    textContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    sectionContainer: {
      flexDirection: 'row',
      alignItems: 'stretch',
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: '#000',
      marginTop: 32,
      paddingHorizontal: 24,
      marginBottom: 10,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: '#000',
    },
    buttonContainer: {
      flex: 1,
    },
    textInputContainer: {
      flex: 4,
    },
  });

 return (
  <View style={{backgroundColor:'#fff'}}>
    <Text style={styles.sectionTitle}>{props.textTitle}</Text>
    {editing ?
      <View style={styles.sectionContainer}>
        <View style={styles.textInputContainer}>
          <TextInput label='' value={text} onChangeText={onChangeText} />
          {/* <HelperText type="error" visible={hasErrors()}>
            {props.helpText}
          </HelperText> */}
        </View>
        <View style={styles.buttonContainer}>
          <Button title='DONE' onPress={buttonHandler}/>
          <Button title='CANCEL' onPress={cancelButtonHandler}/>
        </View>
      </View>
    :
      <View style={styles.sectionContainer}>
        <View style={styles.textInputContainer}>
          <Text>{text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='EDIT' onPress={buttonHandler}/>
        </View>
      </View>}
  </View>
  );
};

export default EditableText;
