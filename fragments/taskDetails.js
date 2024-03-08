import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Chip, FAB, TextInput, List } from 'react-native-paper';
import { useState, useEffect } from 'react';
import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

export default function TaskDetails({ id, editMode }) {

    const [task, setTask] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState('');
    const [types, setTypes] = useState([]);
    const [type, setType] = useState('');
    const [commissions, setCommissions] = useState([]);
    const [commission, setCommission] = useState('');
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState('');
    const [tags, setTags] = useState([]);
    const [newTags, setNewTags] = useState([]);


    useEffect(() => {
        //forse serve aggiungere una schermatina di caricamento e/o del delay perché la tab non appaia vuota
        fetchData();

        //retrieve dei dati per le tendine di modifica
        fetchStatuses();
        fetchTypes();
        fetchCommissions();
        fetchTickets();
        fetchCustomers();
        fetchTags();
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

    const fetchStatuses = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/statuses');
        console.log(res.data);
        setStatuses(res.data);
    }

    const fetchTypes = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/types');
        console.log(res.data);
        setTypes(res.data);
    }

    const fetchCommissions = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/commissions');
        console.log(res.data);
        setTypes(res.data);
    }

    const fetchTickets = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/tickets');
        console.log(res.data);
        setTypes(res.data);
    }

    const fetchCustomers = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/customers');
        console.log(res.data);
        setTypes(res.data);
    }

    const fetchTags = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/tags');
        console.log(res.data);
        setTypes(res.data);
    }


    //DUMMY
    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    const [value, setValue] = useState(null);

    return (
        <ScrollView containerStyle={styles.detailsContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.taskTitle}>{task.ID} - {task.description}</Text>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Stato</Text>
                    {editMode ?
                        <View style={{ width: '100%', minWidth: '80%' }}>
                            <Dropdown
                                itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
                                selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
                                selectedTextProps={{ numberOfLines: 1 }}
                                itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
                                style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200 }]} data={statuses} placeholder="Stato" onChange={(item) => { setValue(item.value); }}
                                value={status} labelField='description' valueField='ID' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
                                containerStyle={[styles.dropdownList, { borderRadius: 15, left: 342 }]} />
                            {/* <SelectDropdown
                                style={styles.propertyDropdown}
                                defaultButtonText="Stato" data={data} rowTextForSelection={(item, index) => { return item.description }}
                                onSelect={(item) => setStatus(item)} buttonTextAfterSelection={(item) => { return item.description }} /> */}
                            {/* <List.Accordion
                                title="Uncontrolled Accordion"
                                style={styles.accordionSelector}>
                                <List.Item title="First item" />
                                <List.Item title="Second item" />
                            </List.Accordion> */}
                        </View>
                        : <Chip style={styles.propertyChip}>{task.status}</Chip>}
                </View>
                <View style={[styles.taskProperty, { left: 280, position: 'absolute' }]}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>Tipologia</Text>
                    {editMode ? <View style={{ width: '100%', minWidth: '80%' }}><Dropdown
                        itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
                        selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
                        selectedTextProps={{ numberOfLines: 1 }}
                        itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
                        style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200 }]} data={types} placeholder="Tipologia" onChange={(item) => { setValue(item.value); }}
                        value={type} labelField='text' valueField='ID' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
                        containerStyle={[styles.dropdownList, { borderRadius: 15, left: 692 }]} /></View> : <Chip style={styles.propertyChip}>{task.type}</Chip>
                    }
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Commessa</Text>
                    <Chip style={styles.propertyChip}>{task.commission}</Chip>
                </View>
                <View style={[styles.taskProperty, { left: 280, position: 'absolute' }]}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>Ticket</Text> {/*rendere dinamico il margine sx se il campo è vuoto*/}
                    <Chip style={styles.propertyChip}>{task.ticket}</Chip>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Cliente</Text>
                    <Chip style={styles.propertyChip}>{task.customer}</Chip>
                </View>
                <View style={[styles.taskProperty, { left: 280, position: 'absolute' }]}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>CR</Text>
                    <Chip style={styles.propertyChip}>{task.change_request}</Chip>
                </View>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Data Richiesta</Text>
                <Chip style={styles.propertyChip}>{task.date_request}</Chip>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Data Analisi</Text>
                <Chip style={styles.propertyChip}>{task.date_analysis}</Chip>
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
        marginVertical: 5,
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
    },
    inputContainer: {
        // borderRadius: 20,
        // width: '80%',
        backgroundColor: 'white',
        // height: '70%'
    },
    accordionSelector: {
        borderRadius: 15,
        // position: 'absolute',
        // left: '50%'
        width: '80%',
        height: '70%'
    },
    propertyDropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        //height: '70%',
        //backgroundColor: 'red'
    },
    dropdownList: {
        color: 'red'
    }
})