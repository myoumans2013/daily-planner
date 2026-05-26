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
    {
      id: 1,
      title: "Finish React Native screen",
      completed: false,
      priority: "High",
    },
    {
      id: 2,
      title: "Apply to 5 jobs",
      completed: false,
      priority: "Medium",
    },
    {
      id: 3,
      title: "Drink water",
      completed: true,
      priority: "Low",
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

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
      priority: priority,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "#DC2626";
    if (priority === "Medium") return "#F59E0B";
    return "#16A34A";
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

      <View style={styles.priorityRow}>
        {["Low", "Medium", "High"].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.priorityButton,
              priority === level && styles.selectedPriority,
            ]}
            onPress={() => setPriority(level)}
          >
            <Text
              style={[
                styles.priorityButtonText,
                priority === level && styles.selectedPriorityText,
              ]}
            >
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
            <View>
              <Text
                style={[
                  styles.taskText,
                  task.completed && styles.completedTask,
                ]}
              >
                {task.completed ? "☑" : "☐"} {task.title}
              </Text>

              <Text
                style={[
                  styles.priorityText,
                  { color: getPriorityColor(task.priority) },
                ]}
              >
                {task.priority} Priority
              </Text>
            </View>

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
  priorityRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  priorityButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  selectedPriority: {
    backgroundColor: "#111827",
  },
  priorityButtonText: {
    color: "#111827",
    fontWeight: "600",
  },
  selectedPriorityText: {
    color: "#FFFFFF",
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
  priorityText: {
    fontSize: 13,
    marginTop: 4,
  },
  deleteText: {
    color: "#DC2626",
    fontWeight: "600",
  },
});
