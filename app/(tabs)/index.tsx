import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish React Native screen", completed: false },
    { id: 2, title: "Apply to 5 jobs", completed: false },
    { id: 3, title: "Drink water", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length === 0 ? 0 : completedTasks / tasks.length;

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, Michael</Text>
        <Text style={styles.date}>Wednesday, May 20</Text>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Today's Progress</Text>

        <Text style={styles.progressText}>
          {completedTasks} of {tasks.length} tasks completed
        </Text>

        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter a new task..."
        value={newTask}
        onChangeText={setNewTask}
      />

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Today's Tasks</Text>

      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          style={styles.taskCard}
          onPress={() => toggleTask(task.id)}
        >
          <View style={styles.taskRow}>
            <Text
              style={[styles.taskText, task.completed && styles.completedTask]}
            >
              {task.completed ? "☑" : "☐"} {task.title}
            </Text>

            <TouchableOpacity onPress={() => deleteTask(task.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 20,
    paddingTop: 60,
  },

  header: {
    marginBottom: 20,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  date: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 4,
  },

  progressCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  progressText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 12,
  },

  progressBarBackground: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 10,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 24,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },

  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  taskText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  completedTask: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },

  deleteText: {
    color: "#DC2626",
    fontWeight: "600",
  },
});
