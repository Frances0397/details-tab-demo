import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from 'axios';
import { Card, Icon, Dialog } from "react-native-paper";

export default function TaskDocuments({ id, refresh }) {
    const [documents, setDocuments] = useState([]);
    const [docPreviews, setDocPreviews] = useState([]);
    const [docId, setDocId] = useState("");
    const [docVisible, setDocVisible] = useState(false);
    const [currentDoc, setCurrentDoc] = useState({});

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
            let docObjs = []
            for (let i = 0; i < res.data.length; i++) {
                let docPreviewObj = {};
                docPreviewObj.id = res.data[i].ID;
                docPreviewObj.name = res.data[i].name;
                docPreviewObj.format = res.data[i].format;
                docPreviewObjs.push(docPreviewObj);

                let docObj = {};
                docObj.id = res.data[i].ID;
                docObj.name = res.data[i].name;
                docObj.format = res.data[i].format;
                docObj.url = res.data[i].URL;
                docObj.activity_modules = res.data[i].activity_modules;
                docObj.activity_tags = res.data[i].activity_tags;
                docObj.cat_description = res.data[i].cat_description;
                docObj.customer = res.data[i].customer;
                docObj.position = res.data[i].position;
                docObj.task_id = res.data[i].task_id;
                docObj.task_description = res.data[i].task_description;
                docObjs.upload_date = res.data[i].upload_date;
                docObjs.push(docObj);
            }

            console.log(docPreviewObjs);
            setDocPreviews(docPreviewObjs)
            // setDocPreviews(dummyDocs);
            console.log(docObjs);
            setDocuments(docObjs);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchDocuments();
    }, [refresh]);

    const openDocDialog = (documentId) => {
        console.log("open document ", documentId);
        let currentDocument = documents.find(item => item.id === documentId);
        console.log(currentDocument);
        setCurrentDoc(currentDocument);
        setDocVisible(true);
    }

    useEffect(() => {
        console.log("Current document");
        console.log(currentDoc);
    }, [currentDoc]);

    useEffect(() => {
        console.log("Current document id");
        console.log(docId);
    }, [docId]);

    const openDocumentDetails = async (documentId) => {
        console.log("HEREEE-----")
        console.log(documentId);
        await setDocId(documentId);
        openDocDialog(documentId);
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {docVisible ? <View>
                <Text style={styles.docTitle}>{currentDoc.name}.{currentDoc.format}</Text>
                <Pressable onPress={() => alert("Questo documento è segreto")}>
                    <Text style={styles.docUrl}>{currentDoc.url}</Text>
                </Pressable>
            </View> :
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 800 }}>
                    {docPreviews.map((item) => (
                        <Card key={item.id} onPress={() => { console.log(item.id); openDocumentDetails(item.id) }} style={{ marginLeft: 15, width: 150, marginVertical: 15 }}>
                            <Card.Title title={`${item.name}.${item.format}`} />
                            <Card.Content>
                                {item.format == 'pdf' ? <Icon source="file-pdf-box" /> : <></>}
                                {item.format == 'docx' ? <Icon source="file-document-outline" /> : <></>}
                                {item.format == 'xlsx' ? <Icon source="table-large" /> : <></>}
                                {item.format == 'pptx' ? <Icon source="presentation" /> : <></>}
                                {item.format == 'txt' ? <Icon source="text-long" /> : <></>}
                            </Card.Content>
                        </Card>
                    ))}
                </View>}

        </ScrollView >
    )

}

const styles = StyleSheet.create({
    docTitle: {
        fontFamily: 'Manrope',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    docUrl: {
        fontFamily: 'Manrope',
        color: 'blue',
        marginLeft: 20
    }
});