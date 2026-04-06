import { ScrollView, Text } from "react-native";
import { Card, Button, Icon } from "react-native-elements";



const ContactScreen = () => {
    return ( <ScrollView>
        <Card wrapperStyle={{ margin: 20 }} >
            <CardTitle>Contact Information</CardTitle>
            <Card.Divider/>
            <Text>1 Nucamp Way</Text>
            <Text>Seattle, WA 98001</Text>
            <Text style={{ marginBottom: 10 }} >U.S.A.</Text>
            <Text>Phone: 1-206-555-1234</Text>
            <Text>Email: campsites@nucamp.com</Text>
        </Card>
     </ScrollView> 
    )           
};

export default ContactScreen;