import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
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

//Inner components for sub tab
import TaskDetails from './fragments/taskDetails';

export default function App() {
  const [index, setIndex] = useState(0);
  const [id, setId] = useState(0);

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
                  </TabView.Item><TabView.Item style={{ margin: 10, marginHorizontal: 20, flexShrink: 0 }}>
                    {index == 1 ? <TaskDetails id={id} /> : <></>}
                  </TabView.Item><TabView.Item>
                    {index == 2 ? <Text>Placeholder 3</Text> : <></>}
                  </TabView.Item>
                </TabView>
              </Card>
            </View>
          </ScrollView>
        </View>
      </View>
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

  }
});
