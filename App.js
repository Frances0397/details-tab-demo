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

  useEffect(() => {
    fetchPositions();
    fetchDocCategory();
  }, []);

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
              <Button onPress={() => { setId(34); setIndex(0) }}>34</Button>
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
                  onPress={() => console.log('Pressed')}
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
    </SafeAreaProvider>
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
