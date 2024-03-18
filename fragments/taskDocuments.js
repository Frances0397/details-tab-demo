import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import axios from 'axios';
import { Card, Icon } from "react-native-paper";

export default function TaskDocuments({ id }) {
    const [documents, setDocuments] = useState([]);
    const [docPreviews, setDocPreviews] = useState([]);

    //TEMP DOCUMENTS
    const dummyDocs = [
        { id: 1, name: 'documento', format: 'docx' },
        { id: 2, name: 'documento', format: 'docx' },
        { id: 3, name: 'documento', format: 'docx' },
        { id: 4, name: 'documento', format: 'docx' },
        { id: 5, name: 'documento', format: 'docx' },
        { id: 6, name: 'documento', format: 'docx' },
        { id: 7, name: 'documento', format: 'docx' },
        { id: 8, name: 'documento', format: 'docx' },
        { id: 9, name: 'documento', format: 'docx' },
        { id: 10, name: 'documento', format: 'docx' },
        { id: 11, name: 'documento', format: 'docx' },
        { id: 12, name: 'documento', format: 'docx' },
        { id: 13, name: 'documento', format: 'docx' },
        { id: 14, name: 'documento', format: 'docx' },
    ]

    const fetchDocuments = async () => {
        try {
            let res = await axios.get(`https://gtr-express.onrender.com/documents/${id}`);
            console.log(res.data[0]);

            let docPreviewObjs = [];
            for (let i = 0; i < res.data.length; i++) {
                let docPreviewObj = {};
                docPreviewObj.id = res.data[i].ID;
                docPreviewObj.name = res.data[i].name;
                docPreviewObj.format = res.data[i].format;
                docPreviewObjs.push(docPreviewObj);
            }

            console.log(docPreviewObjs);
            // setDocPreviews(docPreviewObjs)
            setDocPreviews(dummyDocs);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 800 }}>
                {docPreviews.map((item) => (
                    <Card key={item.id} onPress={(item) => alert(item.id)} style={{ marginLeft: 15, width: 150, marginVertical: 15 }}>
                        <Card.Title title={`${item.name}.${item.format}`} />
                        <Card.Content>
                            <Icon source="file-pdf-box" />
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({

});