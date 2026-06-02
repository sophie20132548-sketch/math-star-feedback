import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";

// Mock data for two different practice result states.
// In a real product, this data would come from backend APIs.
const RESULTS = {
  strong: {
    level: "strong",
    correct: 3,
    total: 3,
    stars: 2,
    title: "Amazing!",
    childMessage: "You solved them all!",
    encouragement: "Your math brain is shining today.",
    parentInsight:
      "Your child showed strong understanding of addition within 10.",
    skill: "Addition within 10",
    nextSuggestion: "Try the next short round to keep the momentum.",
    questions: [
      { question: "2 + 3", answer: "5", result: "Correct" },
      { question: "4 + 1", answer: "5", result: "Correct" },
      { question: "6 + 2", answer: "8", result: "Correct" },
    ],
  },
  practice: {
    level: "practice",
    correct: 1,
    total: 3,
    stars: 1,
    title: "Nice effort!",
    childMessage: "You finished the challenge!",
    encouragement: "Let’s practice one more round together.",
    parentInsight:
      "Your child completed the round and may need more practice with addition within 10.",
    skill: "Addition within 10",
    nextSuggestion: "A short retry can help reinforce the same skill.",
    questions: [
      { question: "2 + 3", answer: "5", result: "Correct" },
      { question: "4 + 1", answer: "6", result: "Needs practice" },
      { question: "6 + 2", answer: "7", result: "Needs practice" },
    ],
  },
};

function AppButton({ label, onPress, type = "primary" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        type === "secondary" && styles.secondaryButton,
        pressed && styles.pressedButton,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          type === "secondary" && styles.secondaryButtonText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function App() {
  const [screen, setScreen] = useState("complete");
  const [resultType, setResultType] = useState("strong");

  const result = RESULTS[resultType];

  function resetRound() {
    setScreen("complete");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {screen === "complete" && (
          <View style={styles.card}>
            <Text style={styles.smallLabel}>Math Star Mission</Text>
            <Text style={styles.bigIcon}>🌟</Text>
            <Text style={styles.title}>You finished your math round!</Text>
            <Text style={styles.subtitle}>
              Great work completing 3 addition questions.
            </Text>

            <View style={styles.practiceBox}>
              <Text style={styles.practiceTitle}>Round completed</Text>
              <Text style={styles.practiceText}>3 questions finished</Text>
              <Text style={styles.practiceText}>
                Feedback will appear after the full round.
              </Text>
            </View>

            <AppButton
              label="See My Results"
              onPress={() => setScreen("feedback")}
            />
          </View>
        )}

        {screen === "feedback" && (
          <View style={styles.card}>
            <Text style={styles.smallLabel}>Round Feedback</Text>
            <Text style={styles.bigIcon}>
              {result.level === "strong" ? "🎉" : "💪"}
            </Text>
            <Text style={styles.title}>{result.title}</Text>
            <Text style={styles.subtitle}>{result.childMessage}</Text>

            <View style={styles.scoreBox}>
              <Text style={styles.scoreText}>
                {result.correct} / {result.total}
              </Text>
              <Text style={styles.scoreLabel}>questions correct</Text>
            </View>

            <View style={styles.rewardBox}>
              <Text style={styles.rewardText}>
                You earned {result.stars} {result.stars === 1 ? "star" : "stars"}!
              </Text>
              <Text style={styles.encouragement}>{result.encouragement}</Text>
            </View>

            <View style={styles.parentBox}>
              <Text style={styles.parentTitle}>For parents</Text>
              <Text style={styles.parentText}>{result.parentInsight}</Text>
              <Text style={styles.parentText}>
                Skill practiced: {result.skill}
              </Text>
            </View>

            <AppButton
              label="Try Another Round"
              onPress={resetRound}
            />
            <AppButton
              label="See Details"
              type="secondary"
              onPress={() => setScreen("details")}
            />
            <AppButton
              label="View Stars"
              type="secondary"
              onPress={() => setScreen("rewards")}
            />

            <Pressable
              style={styles.toggle}
              onPress={() =>
                setResultType(resultType === "strong" ? "practice" : "strong")
              }
            >
              <Text style={styles.toggleText}>
                Demo toggle: switch to{" "}
                {resultType === "strong" ? "needs encouragement" : "strong"}
              </Text>
            </Pressable>
          </View>
        )}

        {screen === "details" && (
          <View style={styles.card}>
            <Text style={styles.smallLabel}>This Round</Text>
            <Text style={styles.title}>Your Math Details</Text>
            <Text style={styles.subtitle}>
              Let’s look at what happened in this round.
            </Text>

            {result.questions.map((item, index) => (
              <View key={index} style={styles.questionRow}>
                <Text style={styles.questionText}>
                  {index + 1}. {item.question}
                </Text>
                <Text style={styles.answerText}>Answer: {item.answer}</Text>
                <Text
                  style={[
                    styles.resultText,
                    item.result === "Correct"
                      ? styles.correctText
                      : styles.practiceTextColor,
                  ]}
                >
                  {item.result}
                </Text>
              </View>
            ))}

            <View style={styles.parentBox}>
              <Text style={styles.parentTitle}>Parent value</Text>
              <Text style={styles.parentText}>{result.nextSuggestion}</Text>
            </View>

            <AppButton
              label="Back to Feedback"
              onPress={() => setScreen("feedback")}
            />
          </View>
        )}

        {screen === "rewards" && (
          <View style={styles.card}>
            <Text style={styles.smallLabel}>Reward Progress</Text>
            <Text style={styles.bigIcon}>⭐</Text>
            <Text style={styles.title}>Star Collection</Text>
            <Text style={styles.subtitle}>
              Stars celebrate effort and progress.
            </Text>

            <View style={styles.starRow}>
              {Array.from({ length: result.stars }).map((_, index) => (
                <Text key={index} style={styles.star}>
                  ⭐
                </Text>
              ))}
            </View>

            <View style={styles.parentBox}>
              <Text style={styles.parentTitle}>Why this matters</Text>
              <Text style={styles.parentText}>
                The reward helps the child feel completion and encourages the
                next learning action.
              </Text>
            </View>

            <AppButton
              label="Try Another Round"
              onPress={resetRound}
            />
            <AppButton
              label="Back to Feedback"
              type="secondary"
              onPress={() => setScreen("feedback")}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F3FF",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  smallLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B5DD3",
    marginBottom: 8,
    textAlign: "center",
  },
  bigIcon: {
    fontSize: 56,
    textAlign: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2E255F",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#5C557A",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 22,
  },
  practiceBox: {
    backgroundColor: "#FFF6D8",
    borderRadius: 20,
    padding: 18,
    marginBottom: 22,
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#5E4A00",
    marginBottom: 6,
  },
  practiceText: {
    fontSize: 16,
    color: "#6B5A25",
    lineHeight: 24,
  },
  scoreBox: {
    backgroundColor: "#EAF7FF",
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 42,
    fontWeight: "900",
    color: "#2076A8",
  },
  scoreLabel: {
    fontSize: 16,
    color: "#3E6380",
    marginTop: 4,
  },
  rewardBox: {
    backgroundColor: "#FFF0F5",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#B33A6A",
    textAlign: "center",
    marginBottom: 8,
  },
  encouragement: {
    fontSize: 17,
    color: "#73445A",
    textAlign: "center",
    lineHeight: 24,
  },
  parentBox: {
    backgroundColor: "#F0FFF4",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  parentTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#246B43",
    marginBottom: 8,
  },
  parentText: {
    fontSize: 16,
    color: "#315E44",
    lineHeight: 24,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#6B5DD3",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 12,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#6B5DD3",
  },
  pressedButton: {
    opacity: 0.75,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  secondaryButtonText: {
    color: "#6B5DD3",
  },
  toggle: {
    marginTop: 18,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#F2F2F8",
  },
  toggleText: {
    textAlign: "center",
    color: "#5C557A",
    fontSize: 14,
    fontWeight: "700",
  },
  questionRow: {
    backgroundColor: "#F7F7FF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2E255F",
    marginBottom: 6,
  },
  answerText: {
    fontSize: 16,
    color: "#5C557A",
    marginBottom: 4,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "800",
  },
  correctText: {
    color: "#248A4B",
  },
  practiceTextColor: {
    color: "#C06A1A",
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 24,
  },
  star: {
    fontSize: 54,
    marginHorizontal: 8,
  },
});