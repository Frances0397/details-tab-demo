import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { useState, useEffect } from 'react';

export default function TaskDetails({ id }) {


    return (
        <ScrollView containerStyle={styles.detailsContainer}>
            <Text style={styles.taskTitle}>ID - Descrizione</Text>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
            </View>
            <View style={styles.taskProperty}>
                <Text style={styles.propertyLabel}>Placeholder</Text>
                <Text style={styles.property}>Placeholder</Text>
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
    }
})