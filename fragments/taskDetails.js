import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Chip, FAB, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TaskDetails({ id, editMode }) {

    const [task, setTask] = useState({});

    useEffect(() => {
        //forse serve aggiungere una schermatina di caricamento e/o del delay perché la tab non appaia vuota
        fetchData();
    }, []);

    const fetchData = async () => {
        if (id != 0) {
            let response = await axios.get(`https://gtr-express.onrender.com/task/id/${id}`);
            console.log(response.data[0]);

            let obj = {};

            obj.ID = response.data[0].ID;
            obj.description = response.data[0].description;
            obj.type = response.data[0].text;
            obj.status = response.data[0].status;
            obj.commission = response.data[0].commission;
            obj.ticket = response.data[0].ticket
            obj.customer = response.data[0].customer;
            obj.change_request = response.data[0].change_request;
            obj.date_request = response.data[0].date_request;
            obj.date_analysis = response.data[0].date_analysis;
            obj.dev_start = response.data[0].dev_start;
            obj.planned_release = response.data[0].planned_release;
            obj.release = response.data[0].release;
            obj.estimated_time = response.data[0].estimated_time;
            obj.actual_time = response.data[0].actual_time;
            obj.billable_time = response.data[0].billable_time;
            obj.tags = response.data[0].tags;
            obj.notes = response.data[0].notes;

            console.log(obj.ID);
            setTask(obj);
        }
    }

    return (
        <ScrollView containerStyle={styles.detailsContainer}>
            <Text style={styles.taskTitle}>{task.ID} - {task.description}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Stato</Text>
                    {editMode ?
                        <View style={styles.inputContainer}>
                            <TextInput style={styles.inputProperty} underlineColor='transparent' activeUnderlineColor='transparent' mode='flat' placeholder={task.status == '' ? 'Stato' : task.status} />
                        </View>
                        : <Chip style={styles.propertyChip}>{task.status}</Chip>}
                </View>
                <View style={styles.taskProperty}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>Tipologia</Text>
                    <Chip style={styles.propertyChip}>{task.type}</Chip>
                    {/* <Text style={styles.property}>{task.type}</Text> */}
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Commessa</Text>
                    <Chip style={styles.propertyChip}>{task.commission}</Chip>
                </View>
                <View style={styles.taskProperty}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>Ticket</Text> {/*rendere dinamico il margine sx se il campo è vuoto*/}
                    <Chip style={styles.propertyChip}>{task.ticket}</Chip>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Cliente</Text>
                    <Chip style={styles.propertyChip}>{task.customer}</Chip>
                </View>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>CR</Text>
                    <Chip style={styles.propertyChip}>{task.change_request}</Chip>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Data Richiesta</Text>
                    <Chip style={styles.propertyChip}>{task.date_request}</Chip>
                </View>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Data Analisi</Text>
                    <Chip style={styles.propertyChip}>{task.date_analysis}</Chip>
                </View>
            </View>
            {/* <View style={{ flexDirection: 'row' }}> */}
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Inizio Sviluppi</Text>
                <Chip style={styles.propertyChip}>{task.dev_start}</Chip>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Rilascio Pianificato</Text>
                <Chip style={styles.propertyChip}>{task.planned_release}</Chip>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Rilascio Effettivo</Text>
                <Chip style={styles.propertyChip}>{task.release}</Chip>
            </View>
            {/* </View> */}
            {/* <View style={{ flexDirection: 'row' }}> */}
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tempo Stimato</Text>
                <Chip style={styles.propertyChip}>{task.estimated_time}</Chip>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tempo Effettivo</Text>
                <Chip style={styles.propertyChip}>{task.actual_time}</Chip>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tempo Consuntivabile</Text>
                <Chip style={styles.propertyChip}>{task.billable_time}</Chip>
            </View>
            {/* </View> */}
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tags</Text>
                <Chip style={styles.propertyChip}>TEMP</Chip>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Note</Text>
                <Text style={styles.taskNotex}>{task.notes}</Text>
            </View>
            <Text style={{ flexWrap: 'wrap', flexShrink: 1, flex: 1, maxWidth: '15%', marginRight: 10 }}>Placeholder Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit porta ex, at ultrices turpis lobortis nec. Aliquam non purus accumsan, molestie eros eget, malesuada libero. Vivamus id neque molestie ligula feugiat pulvinar. Vestibulum ut lacus a magna fringilla rutrum non a lectus. Sed iaculis sed ligula a fermentum. Nunc porttitor lacus pulvinar arcu tempus, in tristique nisi commodo. Suspendisse et iaculis justo, quis dictum augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus consectetur nunc ac arcu varius, vel iaculis turpis tristique. Proin gravida congue ex, id volutpat felis laoreet eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam ipsum dolor, faucibus nec ipsum iaculis, pellentesque egestas leo. Aenean id ex in urna imperdiet aliquam.</Text>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        margin: 10,
        padding: 10,
        showVerticalIndicator: false,
        flexShrink: 1,
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    taskProperty: {
        flexDirection: 'row',
        marginVertical: 5
    },
    propertyLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: '80%',
        marginRight: 30
    },
    property: {
        fontSize: 16,
    },
    inputProperty: {
        borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '80%',
        width: '90%'
    }, inputContainer: {
        borderRadius: 20,
        width: '80%',
    }
})