import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, Chip, FAB, TextInput, List, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { DatePickerInput } from 'react-native-paper-dates';
import { Input } from '@rneui/themed';

export default function TaskDetails({ id, editMode }) {

    const [task, setTask] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState({});
    const [types, setTypes] = useState([]);
    const [type, setType] = useState({});
    const [commissions, setCommissions] = useState([]);
    const [commission, setCommission] = useState({});
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState({});
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({});
    const [tags, setTags] = useState([]);
    const [newTags, setNewTags] = useState([]);
    const [dateRequest, setDateRequest] = useState(undefined);
    const [dateAnalysis, setDateAnalysis] = useState(undefined);
    const [dateStart, setDateStart] = useState(undefined);
    const [datePlanned, setDatePlanned] = useState(undefined);
    const [dateEffective, setDateEffective] = useState(undefined);
    const [newTag, setNewTag] = useState('');


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
            console.log("test tags");
            console.log(obj.tags);
            setNewTags(obj.tags);
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
        setCommissions(res.data);
    }

    const fetchTickets = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/tickets');
        console.log(res.data);
        setTickets(res.data);
    }

    const fetchCustomers = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/customers');
        setCustomers(res.data);
    }

    const fetchTags = async () => {
        let res = await axios.get('https://gtr-express.onrender.com/tags');
        console.log(res.data);
        setTags(res.data);
        // setNewTags(res.data);
    }

    const checkTags = () => {
        var allTags = []
        tags.map((el) => {
            allTags.push(el.tag.trim())
        })
        allTags.map((val) => {
            console.log(val)
            newTags.map((tag, index) => {
                if (val == tag) {
                    console.log(tag)
                    return false
                } else {
                    console.log('Nuovo Tag!!')
                    return true
                }
            })
        })

    }

    const handleAddTag = () => {
        if (newTag.trim() !== '') {
            setNewTags([...newTags, newTag.trim()]);
            checkTags();
            setNewTag('');
            console.log(newTag);
            console.log("tag added?");
        }
        // console.log(tags)
    }

    const handleRemoveTag = (tag) => {
        const updatedTags = newTags.filter((t) => t !== tag);
        setNewTags(updatedTags);
    };

    const onSaveChanges = () => {
        alert(status.description);
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
                                style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200 }]} data={statuses} placeholder="Stato" onChange={(item) => { setValue(item.value); setStatus(item); }}
                                value={status} labelField='description' valueField='ID' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
                                containerStyle={[styles.dropdownList, { borderRadius: 15, left: 342 }]} />
                        </View>
                        : <Chip style={styles.propertyChip}>{task.status}</Chip>}
                </View>
                <View style={[styles.taskProperty, { left: 295, position: 'absolute' }]}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>Tipologia</Text>
                    {editMode ? <View style={{ width: '100%', minWidth: '80%' }}><Dropdown
                        itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
                        selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
                        selectedTextProps={{ numberOfLines: 1 }}
                        itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
                        style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200 }]} data={types} placeholder="Tipologia" onChange={(item) => { setValue(item.value); setType(item); }}
                        value={type} labelField='text' valueField='ID' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
                        containerStyle={[styles.dropdownList, { borderRadius: 15, left: 708 }]} /></View> : <Chip style={styles.propertyChip}>{task.type}</Chip>
                    }
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Commessa</Text>
                    {editMode ? <View style={{ width: '100%', minWidth: '80%' }}><Dropdown
                        itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
                        selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
                        selectedTextProps={{ numberOfLines: 1 }}
                        itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
                        style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200 }]} data={commissions} placeholder="Commessa" onChange={(item) => { setValue(item.value); setCommission(item) }}
                        value={commission} labelField='commission' valueField='commission' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
                        containerStyle={[styles.dropdownList, { borderRadius: 15, left: 386 }]} /></View> :
                        <Chip style={styles.propertyChip}>{task.commission}</Chip>}
                </View>
                <View style={[styles.taskProperty, { left: 295, position: 'absolute' }]}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>Ticket</Text> {/*rendere dinamico il margine sx se il campo è vuoto*/}
                    {editMode ? <View style={{ width: '100%', minWidth: '80%' }}><Dropdown
                        itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
                        selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
                        selectedTextProps={{ numberOfLines: 1 }}
                        itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
                        style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200 }]} data={tickets} placeholder="Ticket" onChange={(item) => { setValue(item.value); setTicket(item); }}
                        value={ticket} labelField='ticket' valueField='ticket' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
                        containerStyle={[styles.dropdownList, { borderRadius: 15, left: 680 }]} /></View> :
                        <Chip style={styles.propertyChip}>{task.ticket}</Chip>}
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.taskProperty}>
                    <Text style={styles.propertyLabel}>Cliente</Text>
                    {editMode ? <View style={{ width: '100%', minWidth: '80%' }}><Dropdown
                        itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
                        selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
                        selectedTextProps={{ numberOfLines: 1 }}
                        itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
                        style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200 }]} data={customers} placeholder="Cliente" onChange={(item) => { setValue(item.value); setCustomer(item); }}
                        value={customer} labelField='nome' valueField='nome' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
                        containerStyle={[styles.dropdownList, { borderRadius: 15, left: 356 }]} /></View> :
                        <Chip style={styles.propertyChip}>{task.customer}</Chip>}
                </View>
                <View style={[styles.taskProperty, { left: 295, position: 'absolute' }]}>
                    <Text style={[styles.propertyLabel, { marginLeft: 35 }]}>CR</Text>
                    {editMode ? <TextInput style={{ borderRadius: 15, height: '85%', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                        contentStyle={{ height: '80%' }} underlineColor='transparent' activeUnderlineColor='transparent'
                        onChangeText={() => { alert("CR") }}></TextInput>
                        : <Chip style={styles.propertyChip}>{task.change_request}</Chip>}
                </View>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Data Richiesta</Text>
                {editMode ? <DatePickerInput locale='it' label='Data Richiesta' value={dateRequest} onChange={(d) => setDateRequest(d)} inputMode='start'
                    underlineColor='transparent' activeUnderlineColor='transparent'
                    style={{ maxWidth: '65%', height: '80%', borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                    contentStyle={{ maxHeight: '80%' }} underlineStyle={{ color: 'transparent' }} />
                    : <Chip style={styles.propertyChip}>{task.date_request}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Data Analisi</Text>
                {editMode ? <DatePickerInput locale='it' label='Data Analisi' value={dateAnalysis} onChange={(d) => setDateAnalysis(d)} inputMode='start'
                    style={{ maxWidth: '65%', height: '80%', borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15 }} /> :
                    <Chip style={styles.propertyChip}>{task.date_analysis}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Inizio Sviluppi</Text>
                {editMode ? <DatePickerInput locale='it' label='Data Inizio Sviluppi' value={dateStart} onChange={(d) => setDateStart(d)} inputMode='start'
                    style={{ maxWidth: '65%', height: '80%', borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15 }} />
                    : <Chip style={styles.propertyChip}>{task.dev_start}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Rilascio Pianificato</Text>
                {editMode ? <DatePickerInput locale='it' label='Data Rilascio Pianificato' value={datePlanned} onChange={(d) => setDatePlanned(d)} inputMode='start'
                    style={{ maxWidth: '65%', height: '80%', borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15 }} />
                    : <Chip style={styles.propertyChip}>{task.planned_release}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Rilascio Effettivo</Text>
                {editMode ? <DatePickerInput locale='it' label='Data Rilascio Effettivo' value={dateEffective} onChange={(d) => setDateEffective(d)} inputMode='start'
                    style={{ maxWidth: '65%', height: '80%', borderRadius: 15, borderTopRightRadius: 15, borderTopLeftRadius: 15 }} />
                    : <Chip style={styles.propertyChip}>{task.release}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tempo Stimato</Text>
                {editMode ? <TextInput style={{ borderRadius: 15, height: '85%', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                    contentStyle={{ height: '80%' }} underlineColor='transparent' activeUnderlineColor='transparent'></TextInput>
                    : <Chip style={styles.propertyChip}>{task.estimated_time}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tempo Effettivo</Text>
                {editMode ? <TextInput style={{ borderRadius: 15, height: '85%', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                    contentStyle={{ height: '80%' }} underlineColor='transparent' activeUnderlineColor='transparent'></TextInput>
                    : <Chip style={styles.propertyChip}>{task.actual_time}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tempo Consuntivabile</Text>
                {editMode ? <TextInput style={{ borderRadius: 15, height: '85%', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}
                    contentStyle={{ height: '80%' }} underlineColor='transparent' activeUnderlineColor='transparent'></TextInput>
                    : <Chip style={styles.propertyChip}>{task.billable_time}</Chip>}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Tags</Text>
                {editMode ? <View style={{ maxWidth: '90%' }}><Input
                    placeholder="Aggiungi tags..."
                    value={newTag}
                    onChangeText={(text) => setNewTag(text)}
                    onSubmitEditing={handleAddTag}></Input></View> : <></>}
            </View>
            <View style={{ flexDirection: 'row' }}>
                {newTags.map((tag) => (
                    <Chip
                        key={tag}
                        title={tag}
                        type="flat"
                        onPress={() => handleRemoveTag(tag)}
                        icon='close'
                        disabled={!editMode}
                        textStyle={{ color: 'Black' }}
                        style={[{ color: '#fff', marginHorizontal: '0.3%', marginBottom: 15, maxWidth: 100 }, styles.propertyChip]}
                    >{tag}</Chip>))}
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Note</Text>
                {editMode ? <TextInput numberOfLines={2} mode='outlined' style={{ minWidth: '75%' }} />
                    : <Text style={styles.taskNotex}>{task.notes}</Text>}
            </View>
            {editMode ? <Button onPress={onSaveChanges} style={{ maxWidth: '85%' }}>Save</Button> : <></>}
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