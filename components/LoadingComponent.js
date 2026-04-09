// ─── Imports ────────────────────────────────────────────────────────────────
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

// ─── Component ───────────────────────────────────────────────────────────────
// Reusable full-screen loading indicator shown while async data is being fetched.
// Displays a spinning circle (ActivityIndicator) and a "Loading..." label.
function Loading() {
    return (
        <View style={styles.loadingView}>
            {/* Spinning circle indicator in the brand purple color */}
            <ActivityIndicator size='large' color='5637DD' />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    // Centers the spinner and text both vertically and horizontally
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    // Bold brand-colored label beneath the spinner
    loadingText: {
        color: '#5637DD',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

// ─── Export ──────────────────────────────────────────────────────────────────
export default Loading;
