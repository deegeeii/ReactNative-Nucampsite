// ─── Imports ────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    Switch,
    Button,
    Platform,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';

// ─── Screen Component ─────────────────────────────────────────────────────────
// ReservationScreen lets the user pick a number of campers, a hike-in option,
// and a date, then shows an Alert dialog summarising the search inputs.
const ReservationScreen = () => {

    // ── Local state ──
    const [campers, setCampers] = useState(1);               // number of campers (1–6)
    const [hikeIn, setHikeIn] = useState(false);             // whether hiking in
    const [date, setDate] = useState(new Date());            // desired reservation date
    const [showCalendar, setShowCalendar] = useState(false); // toggles date picker visibility

    // ─── Event Handlers ──────────────────────────────────────────────────────

    // Updates the date state when the user picks a new date; on iOS the picker
    // stays visible, on Android it closes automatically after selection.
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };

    // Resets all form fields back to their initial values
    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    const presentLocalNotification = async (reservationDate) => {
        const sendNotification = () => {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true,
                    shouldPlaySound: true,
                    shouldSetBadge: true
                })
            });

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Campsite Reservation Search',
                    body: `Search for ${reservationDate} requested`
                },
                trigger: null
            });
        };

        let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    };

    // Shows an Alert dialog echoing the current form values back to the user.
    // Both Cancel and OK buttons reset the form on press.
    const handleReservation = () => {
        Alert.alert(
            'Begin Search?',
            `Number of Campers: ${campers}\nHike-In? ${hikeIn ? 'Yes' : 'No'}\nDate: ${date.toLocaleDateString('en-US')}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        presentLocalNotification(
                            date.toLocaleDateString('en-US')
                        );
                        resetForm();
                    } 
                }
            ],
            { cancelable: false }
        );
    };

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <ScrollView>
            {/* Animatable.View wraps all form rows with a zoomIn entrance animation */}
            <Animatable.View
                animation='zoomIn'
                duration={2000}
                delay={1000}
            >
                {/* ── Number of campers picker ── */}
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Campers:</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={campers}
                        onValueChange={(itemValue) => setCampers(itemValue)}
                    >
                        <Picker.Item label='1' value={1} />
                        <Picker.Item label='2' value={2} />
                        <Picker.Item label='3' value={3} />
                        <Picker.Item label='4' value={4} />
                        <Picker.Item label='5' value={5} />
                        <Picker.Item label='6' value={6} />
                    </Picker>
                </View>

                {/* ── Hike-in toggle ── */}
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Hike In?</Text>
                    <Switch
                        style={styles.formItem}
                        value={hikeIn}
                        trackColor={{ true: '#5637DD', false: null }}
                        onValueChange={(value) => setHikeIn(value)}
                    />
                </View>

                {/* ── Date picker trigger button ── */}
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date:</Text>
                    <Button
                        onPress={() => setShowCalendar(!showCalendar)}
                        title={date.toLocaleDateString('en-US')}
                        color='#5637DD'
                        accessibilityLabel='Tap me to select a reservation date'
                    />
                </View>

                {/* ── Inline calendar — only rendered when showCalendar is true ── */}
                {showCalendar && (
                    <DateTimePicker
                        style={styles.formItem}
                        value={date}
                        mode='date'
                        display='default'
                        onChange={onDateChange}
                    />
                )}

                {/* ── Submit button — triggers the Alert dialog ── */}
                <View style={styles.formRow}>
                    <Button
                        onPress={() => handleReservation()}
                        title='Search Availability'
                        color='#5637DD'
                        accessibilityLabel='Tap me to search for available campsites to reserve'
                    />
                </View>

            </Animatable.View>
        </ScrollView>
    );
};

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    // Each form row lays out a label and its control side-by-side
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    // Label takes up 2/3 of the row width
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    // Control (Picker, Switch, Button) takes up 1/3 of the row width
    formItem: {
        flex: 1
    }
});

// ─── Export ──────────────────────────────────────────────────────────────────
export default ReservationScreen;
