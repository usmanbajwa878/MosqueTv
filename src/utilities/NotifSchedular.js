import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

export const scheduleNotif = (time, title, message) => {
  if (Platform.OS === 'ios') {
    // const getCorrectDate = () => {
    //     const date = new Date();
    //     date.setDate(date.getDate() + 1);
    //     date.setHours(23);
    //     date.setMinutes(54);
    //     return date;
    //   };


    PushNotificationIOS.addNotificationRequest({
    //   fireDate: new Date(Date.now() + 30 * 1000),
    id:'notificationWithSound',
      repeats: true,
      fireDate:new Date(Date.now() + (20 * 1000)),
      repeatsComponent: {
        hour: true,
        minute: true,
      },
      isCritical:true,
      title:title,
      body:message,
      
      
    });
  } else {
    PushNotification.scheduleLocalNotification({
      channelId: 'Reminder-Channel',
      title: title,
      message: message,
      allowWhileIdle: true,
      date: new Date(Date.now() + 30 * 1000),
      autoCancel: false,
      playSound: true,
    });
  }
};
