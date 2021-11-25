import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLORS} from '../../constants/AppConstants';
import {facilityData} from '../../Data/facilitiesData';
import {useSelector, useDispatch} from 'react-redux';
import {
  callNumber,
  getIcon,
  getMapOptions,
  getTimeDifference,
  shareHandler,
} from '../../utilities/methods';
import {Popup, showLocation} from 'react-native-map-link';
import {
  actionAddMosque,
  actionAddtoFavourite,
} from '../../store/actions/mosqueActions';
import {useTranslation} from 'react-i18next';

const SCREEN_WIDTH = Dimensions.get('window').width;

const MosqueDetails = props => {
  console.log('INSIDE MOSQUE DETAILS', props);
  const dispatch = useDispatch();
  const [showMap, setShowMap] = React.useState(false);

  const handleAddtoFavourite = item => {
    item.selected = true;
    dispatch(actionAddtoFavourite(item));
  };

  const {t} = useTranslation();

  return (
    <SafeAreaView style={{marginTop: 20, marginBottom: 20, height: '90%',width:'100%'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 3,
          }}>
          <TouchableOpacity
            onPress={() => handleAddtoFavourite(props.item)}
            style={{
              backgroundColor: 'white',
              height: 40,
              width: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.APP_COLOR,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 25, height: 25, alignSelf: 'center'}}
              source={require('../../Assets/Images/Icons/bookmark.png')}
            />
          </TouchableOpacity>

          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              fontWeight: '800',
              color: COLORS.BLACK,
            }}>
            {props.item.name}
          </Text>
          <TouchableOpacity
            onPress={() => props.onClose()}
            style={{
              backgroundColor: 'white',
              height: 40,
              width: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: COLORS.APP_COLOR,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: 30, height: 30, alignSelf: 'center'}}
              source={require('../../Assets/Images/Icons/closeIcon.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            backgroundColor: COLORS.APP_DIM,
            width: SCREEN_WIDTH - 20,
            borderRadius: 10,
            border: 'none',
            
          }}>
          <ImageBackground
            style={{
              height: 250,
              overflow: 'hidden',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
            source={require('../../Assets/Images/Icons/mosque.jpg')}></ImageBackground>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 30,
              height: 50,
              marginHorizontal: 30,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 30, fontWeight: '400'}}>
              {`${props.item.location} ${props.item.country}`}
            </Text>
          </View>
          <View
            style={{
              borderTopWidth: 0.2,
              marginTop: 4,
              marginHorizontal: 10,
              borderBottomWidth: 0.2,
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '400'}}>
                  {t('Ishraq')}
                </Text>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  {props.item.timings[6].time}
                </Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '400'}}>
                  {t('Jumma')}
                </Text>
                <Text style={{fontSize: 20, fontWeight: '700'}}>
                  {props.item.timings[5].time}
                </Text>
              </View>
            </View>
            <ScrollView style={{flex:1}} horizontal={true} showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  // alignItems: 'center',
                  marginTop: 15,
                }}>
                {props.item.timings.map(
                  (item, index) =>
                    index < 5 && (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft:50
                        }}>
                        <Text style={{fontSize: 20, fontWeight: '400'}}>
                          {item.name}
                        </Text>
                        <Text style={{fontSize: 20, fontWeight: '700'}}>{`${
                          item.time.split(':')[0]
                        }:${item.time.split(':')[1]} ${
                          item.time.split(' ')[1]
                        }`}</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                          }}>{` + ${getTimeDifference(item.time)}`}</Text>
                      </View>
                    ),
                )}
                {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '400'}}>Fajr</Text>
              <Text style={{fontSize: 18, fontWeight: '700'}}>07:05</Text>
              <Text style={{fontSize: 14, fontWeight: '400'}}>+30</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '400'}}>Duhr</Text>
              <Text style={{fontSize: 18, fontWeight: '700'}}>12:09</Text>
              <Text style={{fontSize: 14, fontWeight: '400'}}>+10</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '400'}}>Asr</Text>
              <Text style={{fontSize: 18, fontWeight: '700'}}>14:32</Text>
              <Text style={{fontSize: 14, fontWeight: '400'}}>+10</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '400'}}>Mughrib</Text>
              <Text style={{fontSize: 18, fontWeight: '700'}}>17:03</Text>
              <Text style={{fontSize: 14, fontWeight: '400'}}>+5</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '400'}}>Isha</Text>
              <Text style={{fontSize: 18, fontWeight: '700'}}>18:23</Text>
              <Text style={{fontSize: 14, fontWeight: '400'}}>+10</Text>
            </View> */}
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginTop: 10,
              marginBottom: 30,
            }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {props.item.facilites.map(item => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Image
                    style={{width: 40, height: 40}}
                    source={getIcon(item)}
                  />
                  <Text>{item}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MosqueDetails;
