import React,{useState,useEffect,useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground, 
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import {COLORS} from '../constants/AppConstants';
import {HomeData} from '../Data/mosqueData';
import { useDispatch, useSelector } from 'react-redux';
import { convertFrom12To24Format, convertFrom24To12Format, getDayAndDate, getHijri, getTimeDifference,getCurrentPrayer, getTimeDifferencePrayer } from '../utilities/methods';
import moment from 'moment';
import { actionRefreshSelectedMosque } from '../store/actions/mosqueActions';
import Loader from '../components/Loader/Loader';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const MosqueScreen = () => {
  const dispatch = useDispatch()
  const selectedItem = useSelector(state => state.mosque.selectedMosque);
  const timeFormat = useSelector(state=>state.time.timeFormat);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(0);
  const [nextPrayer,setNextPrayer] = useState();
  const [loading,setLoading] = useState(false);

  const interval = React.useRef();

  useEffect(() => {
    let data = getCurrentPrayer(selectedItem.timings);
    setNextPrayer(data)
    setHours(data.diff.hourDiff-1);
    setMinutes(data.diff.minuteDiff-1);
    setSeconds(60);

  }, []);

  const handleRefreshData =async () =>{

    const data={
      mosqueId:selectedItem.mosqueId
    }
    setLoading(true);
    await dispatch(actionRefreshSelectedMosque(data));
    setLoading(false)
  }


  useEffect(() => {
    interval.current = setInterval(
      () => setSeconds(prevTimer => prevTimer - 1),
      1000,
    );
  }, []);

  if (seconds === 0) {
    // clearInterval(interval.current)
    if (minutes === 0) {
      if (hours === 0) {
        let data = getCurrentPrayer(selectedItem.timings,nextPrayer);
        console.log("currentPrayer",data)
        setNextPrayer(data)
        setHours(data.diff.hourDiff-1);
        setMinutes(data.diff.minuteDiff-1);
        setSeconds(60);
    
      //  clearInterval(interval.current);
      } else {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    } else {
      setMinutes(minutes -1);
      setSeconds(59);
    }
  }

  return (
    <View style={styles.container}>
    
      <ImageBackground
        source={require('../Assets/Images/Intro/background.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.name}>{selectedItem.name}</Text>
        </View>
        <TouchableOpacity onPress={()=>handleRefreshData()} style={{height:40,width:40,borderRadius:20,backgroundColor:COLORS.WHITE,position:'absolute',top:5,right:20,justifyContent:'center',alignItems:'center'}}>
        <Image resizeMode="contain" style={{width:30,height:30}} source={require('../Assets/Images/Icons/refresh.png')}/>
      </TouchableOpacity>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: COLORS.WHITE,
                padding: 10,
              }}>
              {selectedItem.timings[5].name}
            </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.WHITE}}>
              {moment(selectedItem.timings[5].time, "HH:mm:ss a").format("h:mm a") }
            </Text>
          </View>
          <View style={styles.centerContainer}>
            <View style={styles.timeContainer}>
              <Text
                style={{fontSize: 50, fontWeight: 'bold', color: COLORS.WHITE}}>
                {`${hours}:${minutes}`}
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: COLORS.WHITE,
                  }}>
                  {`:${seconds}`}
                </Text>
              </Text>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: COLORS.WHITE}}>
               { `${nextPrayer?.name} in ${nextPrayer?.diff.hourDiff - 1} Hours`}
              </Text>
            </View>
            <View style={styles.currentDate}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: COLORS.APP_COLOR,
                }}>
                  {getHijri()}
              </Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: COLORS.WHITE,
                padding: 10,
              }}>
              {selectedItem.timings[6].name}
            </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.WHITE}}>
              {timeFormat === 24 ? convertFrom12To24Format(moment(selectedItem.timings[5].time, "HH:mm:ss a").format("h:mm a")):convertFrom24To12Format(moment(selectedItem.timings[6].time, "HH:mm:ss a").format("h:mm a"))}
            </Text>
          </View>
        </View>
        <View style={styles.prayerContainer}>
          {selectedItem.timings.map((item,index) => index <5 && (
            <View style={nextPrayer?.name === item.name ? {...styles.itemContainer,backgroundColor:COLORS.APP_COLOR}: styles.itemContainer}>
              <Text style={nextPrayer?.name === item?.name ?{color:COLORS.WHITE,fontSize:20,fontWeight:'600'} :{fontSize:20,fontWeight:'600',color:COLORS.BLACK}}>{item.name}</Text>
              <Text style={nextPrayer?.name === item?.name ?{color:COLORS.WHITE,fontSize:20,fontWeight:'700'} :{fontSize:20,fontWeight:'700',color:COLORS.BLACK}}>{moment(item.time, "HH:mm:ss a").format("h:mm a") }</Text>
              <Text style={nextPrayer?.name === item?.name ?{color:COLORS.WHITE,fontSize:20,fontWeight:'500'} :{fontSize:20,fontWeight:'500',color:COLORS.BLACK}}>+0</Text>
            </View>
          
          )
)}
        </View>
        <View style={styles.footer}>
            <View style={{marginLeft:10,flexDirection:'row',height:50,}}>
                <View style={{backgroundColor:COLORS.WHITE,width:40,height:40}}>
                <Image style={{width:40,height:40}} resizeMode="contain" source={require('../Assets/Images/Intro/qrcode.png')} />
                </View>
                
                <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:COLORS.BLACK,flexDirection:'row',height:25,alignItems:'center',width:200,margin:5,borderRadius:5}}>
                        <Image style={{width:20,height:20,margin:2}}  source={require('../Assets/Images/Icons/apple.png')} />
                        <Text style={{fontSize:12,color:COLORS.WHITE}}>Download from AppStore</Text>
                    </View>
                    <View style={{backgroundColor:COLORS.WHITE,flexDirection:'row',height:25,alignItems:'center',width:200,margin:5,borderRadius:5}}>
                        <Image style={{width:20,height:20,margin:2}}  source={require('../Assets/Images/Icons/play.png')} />
                        <Text style={{fontSize:12,color:COLORS.APP_COLOR}}>Download from PlayStore</Text>
                    </View>
                </View>

            </View>
            <View style={{height:50,marginRight:10}}>
                <Image style={{width:100,height:50}} resizeMode="contain"  source={require('../Assets/Images/Icons/tvicon.png')}/>
            </View>
        </View>
        {
          loading &&<Loader showLoader={loading} />
        }
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: SCREEN_HEIGHT / 3,
    marginHorizontal:40,
   
    // backgroundColor:'white'
  },
  textContainer: {
    width: '20%',
    alignItems: 'center',
  },
  centerContainer: {
    width: '40%',
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.TRANSPARENT,
  },
  timeContainer: {
    height: '80%',
    backgroundColor: COLORS.APP_COLOR,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.APP_COLOR,
    borderWidth: 1,
  },
  currentDate: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.WHITE,
  },
  itemContainer: {
    backgroundColor: 'red',
   
  },
  prayerContainer:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-around',
      marginTop:20

  },
  itemContainer:{
      backgroundColor:COLORS.LIGHT_WHITE,
      alignItems:'center',
      height:100,
      borderRadius:20,
      width:100,
      justifyContent:'center'
  },
  footer:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:10,
      height:50,
      marginTop:20
  }
});
