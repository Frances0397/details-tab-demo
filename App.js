import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useState } from 'react';

// Drawer component TEMP
import { Drawer } from 'react-native-paper';

//header component TEMP
import { Appbar } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//GANTT component TEMP
import { Button } from 'react-native-paper';

//Details component TEMP
import { Tab, TabView } from '@rneui/themed';
import { AnimatedFAB } from 'react-native-paper';

//subtask components TEMP
import { DatePickerInput } from 'react-native-paper-dates';

//Document popup components
import { Dropdown } from 'react-native-element-dropdown';
import { Dialog, TextInput } from 'react-native-paper';
import { useEffect } from 'react';
import axios from 'axios';

//Inner components for sub tab
import TaskDetails from './fragments/taskDetails';
import TaskDocuments from './fragments/taskDocuments';

export default function App() {
  const [index, setIndex] = useState(0);
  const [id, setId] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [addDocVisible, setAddDocVisible] = useState(false);
  const [filename, setFilename] = useState("");
  const [filetype, setFiletype] = useState("");
  const [url, setUrl] = useState("");
  const [positions, setPositions] = useState([]);
  const [position, setPosition] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [refresh, setRefresh] = useState(false);

  //variabili dialog sottotask
  const [addSubtaskVisible, setAddSubtaskVisible] = useState(false);
  const [subtaskDescription, setSubDescription] = useState("");
  const [subTaskTypes, setSubTaskTypes] = useState([]);
  const [subTaskType, setSubTaskType] = useState({})
  const [resources, setResources] = useState([])
  const [resource, setResource] = useState({});
  const [resourceTypes, setResourceTypes] = useState([]);
  const [resourceType, setResourceType] = useState({});
  const [subStart, setSubStart] = useState(null);
  const [subEnd, setSubEnd] = useState(null);
  const [notes, setNotes] = useState("");
  const [estTime, setEstTime] = useState("");
  const [billTime, setBillTime] = useState("");


  useEffect(() => {
    fetchPositions();
    fetchDocCategory();
    fetchSubTaskTypes();
    fetchResources();
    fetchResourceTypes();
  }, []);

  const cleanFields = () => {
    //pulizia campi
    setSubDescription('');
    setSubStart('');
    setSubEnd('');
    setNotes('');
    setSubTaskType(null);
    setResourceType(null);
    setResource(null);
    setBillTime(0);
    setEstTime(0);
  }

  const fetchDocCategory = async () => {
    let res = await axios.get('https://gtr-express.onrender.com/categories');
    console.log(res.data);
    setCategories(res.data);
  }
  const fetchPositions = async () => {
    let res = await axios.get('https://gtr-express.onrender.com/positions');
    console.log(res.data);
    setPositions(res.data);
  }

  const fetchSubTaskTypes = async () => {
    let res = await axios.get('https://gtr-express.onrender.com/subtask_types');
    console.log(res.data);
    setSubTaskTypes(res.data);
  }

  const fetchResources = async () => {
    let res = await axios.get('https://gtr-express.onrender.com/resources');
    console.log(res.data);

    let resourcesArr = []
    for (let i = 0; i < res.data.length; i++) {
      let resourceObj = {}
      resourceObj.name = res.data[i].name;
      resourceObj.surname = res.data[i].surname;
      resourceObj.fullname = res.data[i].name + ' ' + res.data[i].surname;
      resourcesArr.push(resourceObj);
    }

    setResources(resourcesArr);
  }

  const fetchResourceTypes = async () => {
    let res = await axios.get('https://gtr-express.onrender.com/resource_types');
    console.log(res.data);
    setResourceTypes(res.data);
  }

  const saveDoc = () => {
    let docObj = {};

    let actualDate = new Date();

    docObj.URL = url;
    docObj.category = category;
    docObj.format = filetype;
    docObj.name = filename;
    docObj.task_id = id;
    docObj.position = position.position_id;
    docObj.upload_date = actualDate;

    console.log(docObj);
    postDoc(docObj);
    setRefresh(!refresh);
  }

  const saveSubTask = () => {
    let status = postSubTask();
    console.log(status);
    updateTask();
  }

  const postSubTask = async () => {
    let subTask = {};

    subTask.task_id = parseInt(id);
    subTask.description = subtaskDescription;
    subTask.notes = notes;
    subTask.start_date = subStart;
    subTask.release = subEnd;
    subTask.estimated_time = parseInt(estTime);
    subTask.billable_time = parseInt(billTime);
    subTask.resource = resource.name;
    subTask.resource_type = resourceType.type;
    subTask.type = parseInt(subTaskType.subtask_type_id);

    console.log(subTask);
    let res = await axios.post('https://gtr-express.onrender.com/subtask', subTask);
    console.log(res);
    return res.status;
  }

  const updateTask = async () => {
    //fetch del task allo stato attuale
    let response = await axios.get(`https://gtr-express.onrender.com/task/raw/${id}`);
    console.log(response.data[0]);

    //sommo ai tempi del task i tempi nuovi
    let updatedTask = {};

    updatedTask.estimated_time = response.data[0].estimated_time + parseInt(estTime);
    updatedTask.billable_time = response.data[0].billable_time + parseInt(billTime);

    console.log(resourceType);

    //aggiungo le persone nuove all'array delle persone - faccio la push del fullname nell'array
    if (resourceType.type == 'Tecnico') {
      let resourcesTemp = response.data[0].technical_resources;
      console.log(resourcesTemp)
      if (!resourcesTemp.includes(resource.fullname)) {
        resourcesTemp.push(resource.fullname);
        updatedTask.technical_resources = resourcesTemp.filter(str => str != '');
      }
    } else if (resourceType.type == 'Funzionale') {
      let resourcesTemp = response.data[0].functional_resources;
      console.log(resourcesTemp);
      if (!resourcesTemp.includes(resource.fullname)) {
        resourcesTemp.push(resource.fullname);
        updatedTask.functional_resources = resourcesTemp.filter(str => str != '');
      }
    }

    //faccio la put del task
    console.log(updatedTask);
    let update = await axios.put(`https://gtr-express.onrender.com/task/${id}`, updatedTask);
    console.log(update);
  }

  const fetchTask = async () => {

  }

  const postDoc = async (obj) => {
    try {
      let res = await axios.post('https://gtr-express.onrender.com/document', obj);
      console.log(res);
      if (res.status == 200) {
        alert("Documento aggiunto con successo");
        setCategory(null);
        setPosition(null);
        setFilename(null);
        setFiletype(null);
        setUrl(null);

        setAddDocVisible(false);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <SafeAreaProvider style={styles.safeareaproviderContainer}>
      <View style={styles.outerContainer}>
        <View style={styles.drawer}>
          <Drawer.Item
            style={{ backgroundColor: '#b5b5b5' }}
            icon="star"
            label="First Item"
          />
          <Drawer.Item
            style={{ backgroundColor: '#b5b5b5' }}
            icon="heart"
            label="Second Item"
          />
        </View>
        <View style={styles.container}>
          <Appbar.Header style={styles.header}>
            <Appbar.Content title="Title" titleStyle={{ color: '#fff' }} />
          </Appbar.Header>
          <ScrollView contentContainerStyle={styles.pageContainer}>
            <Card style={styles.ganttContainer}>
              <Text style={{ margin: 50 }}>Placeholder</Text>
              <Button onPress={() => { setId(56); setIndex(0) }}>56</Button>
              <Button onPress={() => { setId(38); setIndex(0) }}>38</Button>
            </Card>
            <View style={styles.bottomContainer}>
              <Card style={styles.detailsContainer} contentStyle={styles.detailsInnerContainer} >
                <Tab
                  value={index}
                  onChange={(e) => setIndex(e)}
                  indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                  }}
                  variant="default"
                >
                  <Tab.Item title="Sotto-task"></Tab.Item>
                  <Tab.Item title="Dettagli task"></Tab.Item>
                  <Tab.Item title="Documenti"></Tab.Item>
                </Tab>
                <TabView value={index} onChange={setIndex} animationType="timing" containerStyle={styles.tabView}>
                  <TabView.Item>
                    {index == 0 ? <Text>Placeholder</Text> : <></>}
                  </TabView.Item><TabView.Item style={{ margin: 10, marginHorizontal: 20, width: '100%' }}>
                    {index == 1 ? <TaskDetails id={id} editMode={editMode} /> : <></>}
                  </TabView.Item><TabView.Item>
                    {index == 2 ? <TaskDocuments id={id} refresh={refresh} /> : <></>}
                  </TabView.Item>
                </TabView>
                {index == 0 ? <FAB
                  icon="plus"
                  style={styles.editButton}
                  onPress={() => setAddSubtaskVisible(true)}
                /> : <></>}
                {index == 1 ? <FAB
                  icon={editMode ? "eye-outline" : "pencil-outline"}
                  style={styles.editButton}
                  onPress={() => setEditMode(!editMode)}
                /> : <></>}
                {index == 2 ? <FAB
                  icon="plus"
                  style={styles.editButton}
                  onPress={() => setAddDocVisible(true)}
                /> : <></>}
              </Card>
            </View>
          </ScrollView>
        </View>
      </View>
      <Dialog visible={addDocVisible} onDismiss={() => setAddDocVisible(false)} style={{
        width: 850,
        // width: '80%',
        // height: '100%',
        alignSelf: 'center',
        // top: '10%',
      }}
      >
        <Dialog.Title style={styles.titleText}>Nuovo Documento</Dialog.Title>
        <Dialog.Content style={{ maxHeight: 700, minHeight: 150, maxWidth: 650 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <TextInput
              label="Nome file*"
              value={filename}
              onChangeText={(filename) => setFilename(filename)}
              style={{
                marginVertical: '1%',
                borderRadius: 15,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                paddingHorizontal: 10,
                marginHorizontal: 15
              }}
            />
            <TextInput
              label="Estensione*"
              value={filetype}
              onChangeText={(ext) => setFiletype(ext)}
              style={{
                marginVertical: '1%',
                borderRadius: 15,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
              }}
            />
          </View>
          <TextInput mode='outlined' value={url} onChangeText={(url) => setUrl(url)} label="URL*" style={{ marginHorizontal: 15, marginBottom: 15 }} />
          <View style={{ flexDirection: 'row' }}>
            {/* <View style={{ width: '100%', minWidth: '80%' }}> */}
            <Dropdown
              itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
              selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
              selectedTextProps={{ numberOfLines: 1 }}
              itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
              style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200, marginHorizontal: 15 }]} data={positions} placeholder="Posizione" onChange={(item) => { setPosition(item); }}
              value={position} labelField='position_id' valueField='position_id' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
              containerStyle={[styles.dropdownList, { borderRadius: 15, left: 380 }]} />
            {/* </View> */}
            {/* <View style={{ width: '100%', minWidth: '80%' }}> */}
            <Dropdown
              itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail', }}
              selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
              selectedTextProps={{ numberOfLines: 1 }}
              itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
              style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200, }]} data={categories} placeholder="Categoria" onChange={(item) => { setCategory(item.category_id); }}
              value={position} labelField='category_description' valueField='category_id' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
              containerStyle={[styles.dropdownList, { borderRadius: 15, left: 595 }]} />
            {/* </View> */}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setAddDocVisible(false)} >Close</Button>
          <Button onPress={() => saveDoc()}>Save</Button>
        </Dialog.Actions>
      </Dialog>
      <Dialog visible={addSubtaskVisible}>
        <Dialog.Title style={styles.titleText}>Nuovo Sotto-Task</Dialog.Title>
        <Dialog.Content style={{ alignSelf: 'center', maxHeight: 700, minHeight: 300, width: '90%', height: '80%' }}>
          <TextInput
            // textColor={colors.text}
            label="Descrizione*"
            value={subtaskDescription}
            onChangeText={subtaskDescription => setSubDescription(subtaskDescription)}
            style={{
              // backgroundColor: colors.border,
              marginVertical: '1%',
              borderRadius: 15,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
          <View style={styles.horizontalContainer}>
            <Dropdown
              itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
              selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
              selectedTextProps={{ numberOfLines: 1 }}
              itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
              style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200, marginHorizontal: 15 }]} data={subTaskTypes} placeholder="Tipo sotto-task" onChange={(item) => { setSubTaskType(item); }}
              value={subTaskType} labelField='description' valueField='subtask_type_id' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
              containerStyle={[styles.dropdownList, { borderRadius: 15, left: 380 }]} />
            <Dropdown
              itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
              selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
              selectedTextProps={{ numberOfLines: 1 }}
              itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
              style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200, marginHorizontal: 15 }]} data={resources} placeholder="Risorsa" onChange={(item) => { setResource(item); }}
              value={resource} labelField='fullname' valueField='name' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
              containerStyle={[styles.dropdownList, { borderRadius: 15, left: 380 }]} />
            <Dropdown
              itemContainerStyle={{ borderRadius: 15, maxWidth: 200, overflow: 'hidden', flexWrap: 'nowrap', ellipsizeMode: 'tail' }}
              selectedTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail', overflow: 'hidden' }}
              selectedTextProps={{ numberOfLines: 1 }}
              itemTextStyle={{ maxWidth: 200, flexWrap: 'nowrap', ellipsizeMode: 'tail' }} //overflow: 'hidden',
              style={[styles.propertyDropdown, { width: '100%', flex: 1, maxWidth: 200, marginHorizontal: 15 }]} data={resourceTypes} placeholder="Tipo Risorsa" onChange={(item) => { setResourceType(item); }}
              value={resourceType} labelField='type' valueField='type' dropdownPosition='bottom' showsVerticalScrollIndicator={false}
              containerStyle={[styles.dropdownList, { borderRadius: 15, left: 380 }]} />
          </View>
          <View style={styles.horizontalContainer}>
            <DatePickerInput
              //  activeUnderlineColor={colors.text}
              //cursorColor={colors.text}
              //iconColor={colors.text}
              //activeOutlineColor={colors.text}
              //textColor={colors.text}
              style={{
                borderRadius: 15, borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                //backgroundColor: colors.border
              }}
              locale="it"
              label="Data inizio sub-task"
              value={subStart}
              // onChange={(start) => {setStart(start); console.log(start)}}
              onChange={(start) => setSubStart(start)}
              inputMode="start"
            />
            <DatePickerInput
              // activeUnderlineColor={colors.text}
              // cursorColor={colors.text}
              // iconColor={colors.text}
              // activeOutlineColor={colors.text}
              // textColor={colors.text}
              style={{
                borderRadius: 15, borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                // backgroundColor: colors.border
              }}
              locale="it"
              label="Data rilascio"
              value={subEnd}
              onChange={(end) => setSubEnd(end)}
              // onChange={(end) => onEndChange(end)}
              inputMode="start"
            />
          </View>
          <TextInput value={notes} onChangeText={(note) => setNotes(note)}
            multiline={true} numberOfLines={3} placeholder="Note" mode='outlined'
            style={[styles.textInputNote, {}]} t />
          <View style={styles.horizontalContainer}>
            <TextInput placeholder='Tempo stimato*'
              value={!estTime ? '' : estTime}
              onChangeText={(estimTime) => setEstTime(estimTime)}
              style={[styles.timeInput, {}]}
              inputMode='numeric' />
            <TextInput placeholder='Tempo consuntivabile'
              value={!billTime ? '' : billTime}
              onChangeText={(bill) => setBillTime(bill)}
              style={[styles.timeInput, {}]}
              inputMode='numeric' />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => { cleanFields(); setAddSubtaskVisible(false); }} >Close</Button>
          <Button onPress={() => saveSubTask()}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  drawer: {
    width: 230,
    backgroundColor: '#b5b5b5',
    // position: 'fixed',
    //height: '100%',
    minHeight: '100%',
  },
  outerContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  safeareaproviderContainer: {
    flex: 1
  },
  header: {
    backgroundColor: '#E7E0EC',
  },
  pageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minWidth: '100%'
    //flex: 1,
  },
  ganttContainer: {
    backgroundColor: '#dcdfe3',
    color: '#dcdfe3',
    minWidth: '97%',
    // minWidth: 770,
    minHeight: 330,
    marginHorizontal: 25,
    marginBottom: 15,
    marginTop: 20
  },
  bottomContainer: {
    flexDirection: 'row',
    minWidth: '100%'
  },
  detailsContainer: {
    backgroundColor: '#dcdfe3',
    color: '#dcdfe3',
    minWidth: '60%',
    maxWidth: '60%',
    // minWidth: 450,
    minHeight: 250,
    marginHorizontal: 25,
    flexDirection: 'column',
    flex: 1,
    flexGrow: 1
  },
  detailsInnerContainer: {
    flex: 1,
    // maxHeight: '200%'
  },
  tabView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dcdfe3',
    flexGrow: 1,
    borderRadius: 25,

  },
  editButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
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
});
