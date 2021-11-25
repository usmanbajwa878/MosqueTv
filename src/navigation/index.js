import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import { MosqueScreen } from '../screens/MosqueScreen';
import SearchScreen from '../screens/SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LanguagePicker from '../screens/LanguagePicker';



const FirstStack = createStackNavigator();

export const FirstScreenStack = props =>{
  return  (
    <FirstStack.Navigator screenOptions={{headerShown:false}} initialRouteName="LanguageScreen">
      <FirstStack.Screen 
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerMode:'none',
        headerShown:false
      }}
      />
          <FirstStack.Screen 
      name="LanguageScreen"
      component={LanguagePicker}
      options={{
        headerMode:'none',
        headerShown:false
      }}
      />
    </FirstStack.Navigator>
  )
}




const AppNavigator = props => {

    const isSelected = useSelector(state => state.mosque.userSelected);
  console.log("IS SELECTED",isSelected)
  return (
    <NavigationContainer>
    {isSelected && <MosqueScreen />}
    {!isSelected && <FirstScreenStack />}
  </NavigationContainer>
  );
};

export default AppNavigator;

