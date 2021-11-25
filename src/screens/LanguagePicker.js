import i18next from 'i18next';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, ScrollView, Image,SafeAreaView,TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {LanguageData} from '../Data/languageData'
import {actionChangeLanguage} from '../store/actions/timeActions';
import {COLORS} from '../constants/AppConstants';

const LanguagePicker = props => {
  const {t, i18n} = useTranslation();
  const [listData, setListData] = useState(LanguageData);
  const dispatch = useDispatch();

  const handleSelected = item => {
    const previousList = [...listData];
    const index = previousList.findIndex(
      listItem => listItem.title === item.title,
    );
    previousList.map(itemList => (itemList.selected = false));
    previousList[index].selected = true;
    i18n.changeLanguage(item.value);
    dispatch(actionChangeLanguage(item.value));
    setListData(previousList);
  };
  const handleNavigation = () =>{
      props.navigation.push('SearchScreen')
  }

  return (
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{flex:1}}>

  
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: 150, height: 150, alignSelf: 'center'}}
        source={require('../Assets/Images/Icons/appIcon.png')}
      />

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center',color:COLORS.BLACK}}>
          {t('Select_language')}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 10,
            color:COLORS.BLACK
          }}>
          {t('Select_language_text')}
        </Text>
      </View>
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        {listData.map((item,index) => (
          <TouchableOpacity
          key={index}
            onPress={() => handleSelected(item)}
            style={styles.itemContainer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                resizeMode="contain"
                style={{width: 30, height: 30, alignSelf: 'center'}}
                source={item.image}
              />
              <Text style={{marginLeft: 10, alignSelf: 'center',color:COLORS.BLACK}}>
                {item.title}
              </Text>
            </View>
            <View style={{width: 20, height: 20, alignSelf: 'center'}}>
              {item.selected && (
                <Image
                  resizeMode="contain"
                  style={{height: 25, width: 25}}
                  source={require('../Assets/Images/Icons/checkMark.png')}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
            onPress={()=>handleNavigation()}
              style={{
                height: 50,
                borderWidth: 1,
                backgroundColor: COLORS.APP_DIM,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                borderColor: COLORS.APP_DIM,
                marginVertical:20
              
              }}>
              <Text
                style={{fontSize: 20, fontWeight: '700', color: COLORS.WHITE}}>
                {t('Done')}
              </Text>
            </TouchableOpacity>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
   flex:1
  },
  itemContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: 'grey',
    borderBottomColor: 'grey',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default LanguagePicker;
