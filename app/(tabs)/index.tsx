import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.header}>
      <Text style={styles.greeting}>Good morning, Michael</Text>
      <Text style={styles.date}>Wednesday, May 20</Text>
      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Today&apos;s Progress</Text>
        <Text style={styles.progressText}>2 of 4 tasks completed</Text>
        <View style={styles.progressBarBackground}>
          <View style={styles.progressBarFill} />
        </View>
      </View>
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
    width: "50%",
    backgroundColor: "#2563EB",
    borderRadius: 10,
  },
});
