import firebase from 'react-native-firebase';

export function subscribeChannel(channelName) {
    const channel = new firebase.notifications.Android.Channel(
        channelName,
        channelName,
        firebase.notifications.Android.Importance.Max
    ).setDescription('Subscribe notification channel');
    firebase.notifications().android.createChannel(channel);
    firebase.messaging().subscribeToTopic(channelName);
    return channel;
}

export function unSubscribeChannel(channelName) {
    firebase.notifications().android.deleteChannel(channelName);
    firebase.messaging().unsubscribeFromTopic(channelName);
}