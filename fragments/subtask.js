import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { View } from 'react-native';

export default function Subtask({ id }) {
    const [task, setTask] = useState({});
    const [subtask, setSubtask] = useState({});

    useEffect(() => {
        fetchTask();
        fetchSubtask();
    }, []);

    const onDeleteSubtask = () => {
        //  deleteSubtask();
        performUpdate();
    }

    const performUpdate = async () => {

        console.log("-------------->------------> sucuni");
        console.log(task);
        console.log(subtask);

        let updatedTask = {}

        updatedTask.estimated_time = task.estimated_time - subtask.estimated_time;
        updatedTask.billable_time = task.billable_time - subtask.billable_time;

        console.log(subtask.resource_type);

        if (subtask.resource_type == 'Tecnico') {
            console.log("----------------------------------> here")
            updatedTask.technical_resources = task.technical_resources.filter(item => item !== subtask.resource);
        }
        else if (subtask.resource_type == 'Funzionale')
            updatedTask.functional_resources = task.functional_resources.filter(item => item !== subtask.resource);

        console.log(updatedTask);
        updateTask(updatedTask);
    }

    const deleteSubtask = async () => {
        let res = await axios.delete(`https://gtr-express.onrender.com/subtask/${id}/5`);
        console.log(res)
        console.log(res.status);
        if (res.status == 204) {
            alert("Cancellazione effettuta con successo");
        }
    }

    const fetchTask = async () => {
        let res = await axios.get(`https://gtr-express.onrender.com/task/raw/${id}`);
        console.log(res.data);
        setTask(res.data[0]);
    }

    const fetchSubtask = async () => {
        let res = await axios.get(`https://gtr-express.onrender.com/subtask/${id}/5`);
        console.log(res.data);
        setSubtask(res.data[0]);
    }

    const updateTask = async (updatedTask) => {
        let res = await axios.put(`https://gtr-express.onrender.com/task/${id}`, updatedTask);
        console.log(res)
        if (res.status == 200) {
            alert("Modifica effettuata con successo")
        }
    }

    return (
        <View style={{ margin: 15 }}>
            <Button onPress={onDeleteSubtask}>Delete first subtask</Button>
        </View>
    )
}