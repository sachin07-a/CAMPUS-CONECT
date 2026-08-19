export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface NoteSummary {
  executiveSummary: string;
  keyTakeaways: string[];
  formulaeAndComplexity: { concept: string; details: string }[];
  examTips: string[];
}

export const AIStudyService = {
  /**
   * Generates a 3-minute executive summary of academic notes
   */
  async summarizeNote(title: string, subject: string, unit: number, topic: string): Promise<NoteSummary> {
    // Simulate smart AI response based on topic
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          executiveSummary: `This lecture module on "${topic}" under ${subject} (Unit ${unit}) establishes the core foundational principles, mathematical invariants, and practical software engineering implementations required for university term examinations.`,
          keyTakeaways: [
            `Comprehensive definition and structural invariants of ${topic}.`,
            `Step-by-step trace algorithms covering edge cases and boundary conditions.`,
            `Comparison against classical linear and non-linear memory layout alternatives.`,
            `Standard proofs frequently tested in university semester question papers.`
          ],
          formulaeAndComplexity: [
            { concept: "Time Complexity (Best / Avg / Worst)", details: "O(1) / O(log n) / O(n) depending on balancing and indexing" },
            { concept: "Space Complexity", details: "O(n) auxiliary memory for dynamic pointer structures" },
            { concept: "Recurrence Relation", details: "T(n) = 2T(n/2) + O(1) in balanced tree partition cases" }
          ],
          examTips: [
            "Draw clear step-by-step intermediate rotation / trace diagrams in 10-mark questions.",
            "Always state the time complexity and space overhead at the beginning of algorithm pseudocode.",
            "Remember to handle null pointer / empty structure base conditions in C++ implementations."
          ]
        });
      }, 700);
    });
  },

  /**
   * Generates a 5-question exam preparation quiz with instant feedback
   */
  async generateQuiz(subject: string, unit: number, topic: string): Promise<QuizQuestion[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            question: `In ${topic}, what is the maximum height of a balanced tree with 'n' internal nodes?`,
            options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"],
            correctIndex: 0,
            explanation: "Balanced binary search structures maintain height bounded by approximately 1.44 * log2(n) = O(log n)."
          },
          {
            id: 2,
            question: "Which rotation case is required when a node is inserted into the Right subtree of the Left child?",
            options: ["Single Left (LL)", "Double Left-Right (LR)", "Single Right (RR)", "Double Right-Left (RL)"],
            correctIndex: 1,
            explanation: "A 'zigzag' shape where child is Left and grandchild is Right requires an LR double rotation."
          },
          {
            id: 3,
            question: "What is the worst-case search time complexity in a standard unbalanced Binary Search Tree?",
            options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"],
            correctIndex: 1,
            explanation: "When elements are inserted in sorted order, an unbalanced BST degrades into a linked list of height n, giving O(n) search time."
          },
          {
            id: 4,
            question: "Which traversal of a Binary Search Tree produces values in strictly sorted ascending order?",
            options: ["Pre-order (Root-Left-Right)", "In-order (Left-Root-Right)", "Post-order (Left-Right-Root)", "Level-order (BFS)"],
            correctIndex: 1,
            explanation: "In-order traversal visits the left subtree, current root node, and then the right subtree, producing strictly non-decreasing keys."
          },
          {
            id: 5,
            question: "What is the balance factor threshold in an AVL tree before rebalancing is triggered?",
            options: ["0 only", "-1, 0, or +1", "Strictly +2 or -2", "Greater than 3"],
            correctIndex: 2,
            explanation: "An AVL node is considered balanced if |height(left) - height(right)| <= 1. A balance factor of +2 or -2 triggers rotation."
          }
        ]);
      }, 600);
    });
  },

  /**
   * Answers student doubts
   */
  async solveDoubt(question: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(
          `Here is the academic explanation for: "${question}"\n\n1. **Core Concept**: Focus on the algorithmic invariants and memory hierarchy.\n2. **Intuitive Rule**: Visualize the data structures pointer linkages or relational foreign key dependencies.\n3. **Exam Application**: Always mention asymptotic time and auxiliary memory complexity when writing your solution.`
        );
      }, 500);
    });
  }
};