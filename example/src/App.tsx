import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  TouchableHighlight,
  View,
} from 'react-native';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import languages from './locales/languages';

const ListItem = ({
  item,
  isSelected,
  onPress,
}: {
  item: any;
  isSelected: boolean;
  onPress: (key: string) => void;
}) => {
  return (
    <TouchableHighlight style={styles.button} onPress={() => onPress(item.key)}>
      <Text
        style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
        {item.label}
      </Text>
    </TouchableHighlight>
  );
};

const App = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#000000'} barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {t('main.app_langauge')}: {t('main.language_name')}
        </Text>
      </View>
      <FlatList
        data={languages}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
          <ListItem
            item={item}
            isSelected={item.key === t('main.language_key')}
            onPress={language => i18next.changeLanguage(language)}
          />
        )}
        keyExtractor={(item, index) =>
          item && item.key ? item.key.toString() : index.toString()
        }
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleContainer: {
    borderWidth: 3,
    borderColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 30,
  },
  title: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: 'green',
  },
});

export default App;
