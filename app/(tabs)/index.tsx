import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish React Native screen", completed: false },
    { id: 2, title: "Apply to 5 jobs", completed: true },
    { id: 3, title: "Drink water", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = completedTasks / tasks.length;

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
    <View style={styles.header}>
      <Text style={styles.greeting}>Good morning, Michael</Text>
      <Text style={styles.date}>Wednesday, May 20</Text>
      <View style={styles.progressCard}>
        <Text style={styles.sectionTitle}>Today&apos;s Tasks</Text>
        {tasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => toggleTask(task.id)}
          >
            <View style={styles.taskRow}>
              <Text
                style={[
                  styles.taskText,
                  task.completed && styles.completedTask,
                ]}
              >
                {task.completed ? "☑" : "☐"} {task.title}
              </Text>

              <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.cardTitle}>Today&apos;s Progress</Text>
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
        <Text style={styles.addButtonText}>Add Text</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
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
    marginTop: 24,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 24,
    marginBottom: 12,
  },

  taskCard: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },

  taskText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
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
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteText: {
    color: "#DC2626",
    fontWeight: "600",
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
});
