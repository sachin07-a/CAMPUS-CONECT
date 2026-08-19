import { AcademicBranch, Subject, Unit } from "../types";

export const BRANCHES: AcademicBranch[] = [
  {
    id: "cse",
    code: "CSE",
    name: "Computer Science & Engineering",
    department: "Department of Computer Science & Engineering",
    icon: "Code2",
    description: "Core algorithms, systems programming, artificial intelligence, and software engineering."
  },
  {
    id: "aiml",
    code: "AI & ML",
    name: "Artificial Intelligence & Machine Learning",
    department: "Department of Artificial Intelligence",
    icon: "Cpu",
    description: "Deep learning, natural language processing, computer vision, and neural architectures."
  },
  {
    id: "ise",
    code: "ISE",
    name: "Information Science & Engineering",
    department: "Department of Information Science",
    icon: "Layers",
    description: "Distributed systems, cloud computing, big data analytics, and enterprise software."
  },
  {
    id: "ece",
    code: "ECE",
    name: "Electronics & Communication Engineering",
    department: "Department of Electronics & Communication",
    icon: "Radio",
    description: "VLSI, embedded systems, signal processing, IoT, and wireless communication."
  },
  {
    id: "eee",
    code: "EEE",
    name: "Electrical & Electronics Engineering",
    department: "Department of Electrical Engineering",
    icon: "Zap",
    description: "Power electronics, smart grids, control systems, and renewable energy."
  },
  {
    id: "mech",
    code: "MECH",
    name: "Mechanical Engineering",
    department: "Department of Mechanical Engineering",
    icon: "Cog",
    description: "Thermodynamics, robotics, fluid dynamics, CAD/CAM, and automotive engineering."
  },
  {
    id: "civil",
    code: "CIVIL",
    name: "Civil Engineering",
    department: "Department of Civil Engineering",
    icon: "Building2",
    description: "Structural engineering, geotechnical analysis, surveying, and urban planning."
  }
];

export const SUBJECTS: Subject[] = [
  // CSE Sem 3
  {
    id: "cs301",
    code: "CS301",
    name: "Data Structures & Algorithms",
    branchId: "cse",
    semester: 3,
    unitsCount: 5,
    description: "Linear & non-linear data structures, asymptotic analysis, trees, graphs, and hashing.",
    icon: "Binary"
  },
  {
    id: "cs302",
    code: "CS302",
    name: "Database Management Systems",
    branchId: "cse",
    semester: 3,
    unitsCount: 5,
    description: "Relational model, SQL, normalization, concurrency control, and indexing.",
    icon: "Database"
  },
  {
    id: "cs303",
    code: "CS303",
    name: "Operating Systems",
    branchId: "cse",
    semester: 3,
    unitsCount: 5,
    description: "Process management, CPU scheduling, deadlocks, memory virtualization, and file systems.",
    icon: "Terminal"
  },
  {
    id: "cs304",
    code: "CS304",
    name: "Computer Organization & Architecture",
    branchId: "cse",
    semester: 3,
    unitsCount: 5,
    description: "Pipelining, memory hierarchy, instruction sets, caches, and superscalar processors.",
    icon: "Cpu"
  },
  {
    id: "cs305",
    code: "CS305",
    name: "Discrete Mathematics & Graph Theory",
    branchId: "cse",
    semester: 3,
    unitsCount: 5,
    description: "Set theory, combinatorics, recurrence relations, trees, and graph connectivity.",
    icon: "Sigma"
  },

  // CSE Sem 4
  {
    id: "cs401",
    code: "CS401",
    name: "Design & Analysis of Algorithms",
    branchId: "cse",
    semester: 4,
    unitsCount: 5,
    description: "Divide & conquer, greedy, dynamic programming, backtracking, NP-completeness.",
    icon: "GitBranch"
  },
  {
    id: "cs402",
    code: "CS402",
    name: "Computer Networks",
    branchId: "cse",
    semester: 4,
    unitsCount: 5,
    description: "OSI & TCP/IP stack, routing protocols, congestion control, and socket programming.",
    icon: "Network"
  },
  {
    id: "cs403",
    code: "CS403",
    name: "Software Engineering & Agile",
    branchId: "cse",
    semester: 4,
    unitsCount: 5,
    description: "SDLC, Scrum, UML design, unit testing, CI/CD, and software metrics.",
    icon: "Kanban"
  },

  // AIML Sem 3
  {
    id: "ai301",
    code: "AI301",
    name: "Foundations of Artificial Intelligence",
    branchId: "aiml",
    semester: 3,
    unitsCount: 5,
    description: "State space search, heuristics, adversarial game trees, knowledge representation.",
    icon: "Sparkles"
  },
  {
    id: "ai302",
    code: "AI302",
    name: "Linear Algebra & Probability for ML",
    branchId: "aiml",
    semester: 3,
    unitsCount: 5,
    description: "Vector spaces, SVD, eigenvalues, Bayesian inference, and probability distributions.",
    icon: "Divide"
  },

  // ECE Sem 3
  {
    id: "ec301",
    code: "EC301",
    name: "Digital Electronics & Logic Design",
    branchId: "ece",
    semester: 3,
    unitsCount: 5,
    description: "Boolean algebra, K-maps, sequential circuits, finite state machines, Verilog HDL.",
    icon: "Radio"
  },
  {
    id: "ec302",
    code: "EC302",
    name: "Signals & Systems",
    branchId: "ece",
    semester: 3,
    unitsCount: 5,
    description: "Continuous & discrete time signals, Fourier transform, Laplace, Z-transform, and LTI systems.",
    icon: "Activity"
  }
];

export const UNITS_DATA: Unit[] = [
  // CS301 Data Structures
  {
    id: "u_cs301_1",
    subjectId: "cs301",
    unitNumber: 1,
    title: "Introduction to Arrays, Stacks & Queues",
    topics: ["Asymptotic Notation (Big-O, Omega, Theta)", "Stack ADT & Applications (Infix to Postfix)", "Circular Queue & Priority Queue Implementation"]
  },
  {
    id: "u_cs301_2",
    subjectId: "cs301",
    unitNumber: 2,
    title: "Linked Lists & Dynamic Memory",
    topics: ["Singly Linked List with Pointer Manipulation", "Doubly & Circular Linked Lists", "Polynomial Addition using Linked Lists", "Skip Lists & Memory Allocation"]
  },
  {
    id: "u_cs301_3",
    subjectId: "cs301",
    unitNumber: 3,
    title: "Trees & Binary Search Trees",
    topics: ["Binary Tree Traversals (Recursive & Iterative)", "AVL Trees & Rotations", "Red-Black Tree Properties", "B-Trees & B+ Trees in Databases"]
  },
  {
    id: "u_cs301_4",
    subjectId: "cs301",
    unitNumber: 4,
    title: "Graphs & Graph Algorithms",
    topics: ["Graph Representations (Matrix & Adjacency List)", "Breadth First Search (BFS) & Depth First Search (DFS)", "Dijkstra's Shortest Path Algorithm", "Minimum Spanning Trees (Prim's & Kruskal's)"]
  },
  {
    id: "u_cs301_5",
    subjectId: "cs301",
    unitNumber: 5,
    title: "Hashing & Sorting Techniques",
    topics: ["Hash Tables & Collision Resolution (Chaining, Open Addressing)", "Quick Sort & Merge Sort Analysis", "Heap Sort & Radix Sort", "Tries & String Searching"]
  },

  // CS302 DBMS
  {
    id: "u_cs302_1",
    subjectId: "cs302",
    unitNumber: 1,
    title: "Introduction & Relational Model",
    topics: ["Three-Schema Database Architecture", "Entity-Relationship (ER) & Extended ER Modeling", "Relational Algebra Operations & Query Processing"]
  },
  {
    id: "u_cs302_2",
    subjectId: "cs302",
    unitNumber: 2,
    title: "SQL & Advanced Querying",
    topics: ["Complex Joins, Subqueries & Aggregations", "Stored Procedures, Triggers & Views", "Embedded SQL & Dynamic SQL"]
  },
  {
    id: "u_cs302_3",
    subjectId: "cs302",
    unitNumber: 3,
    title: "Relational Database Normalization",
    topics: ["Functional Dependencies & Closure Sets", "First, Second & Third Normal Forms (1NF, 2NF, 3NF)", "Boyce-Codd Normal Form (BCNF)", "Lossless Join Decomposition & Dependency Preservation"]
  },
  {
    id: "u_cs302_4",
    subjectId: "cs302",
    unitNumber: 4,
    title: "Transaction Processing & Concurrency",
    topics: ["ACID Properties & Transaction States", "Serializability & Conflict Equivalence", "Two-Phase Locking (2PL) Protocol", "Deadlock Detection & Prevention Strategies"]
  },
  {
    id: "u_cs302_5",
    subjectId: "cs302",
    unitNumber: 5,
    title: "Storage, Indexing & NoSQL Overview",
    topics: ["RAID Storage Levels", "B+ Tree Indexing & Hash Indexing", "Introduction to MongoDB & Document Stores"]
  },

  // CS303 Operating Systems
  {
    id: "u_cs303_1",
    subjectId: "cs303",
    unitNumber: 1,
    title: "OS Structures & System Calls",
    topics: ["Kernel Architectures (Monolithic vs Microkernel)", "System Calls & Dual-Mode Operations", "Boot Process & Interrupt Handling"]
  },
  {
    id: "u_cs303_2",
    subjectId: "cs303",
    unitNumber: 2,
    title: "Process & Thread Management",
    topics: ["Process Control Block (PCB) & Context Switching", "CPU Scheduling (FCFS, SJF, Round Robin, Multi-Level)", "Threads & POSIX Pthreads Library"]
  },
  {
    id: "u_cs303_3",
    subjectId: "cs303",
    unitNumber: 3,
    title: "Process Synchronization & Deadlocks",
    topics: ["Critical Section Problem & Peterson's Solution", "Semaphores, Mutex Locks & Monitors", "Classical Sync Problems (Dining Philosophers, Producer-Consumer)", "Banker's Algorithm for Deadlock Avoidance"]
  },
  {
    id: "u_cs303_4",
    subjectId: "cs303",
    unitNumber: 4,
    title: "Memory Management & Virtual Memory",
    topics: ["Paging & Segmentation Architectures", "Translation Lookaside Buffer (TLB)", "Page Replacement Algorithms (FIFO, LRU, Optimal)", "Thrashing & Working Set Model"]
  },
  {
    id: "u_cs303_5",
    subjectId: "cs303",
    unitNumber: 5,
    title: "Storage & File Systems",
    topics: ["File Allocation Methods (Contiguous, Linked, Indexed)", "Disk Scheduling Algorithms (SCAN, C-SCAN, LOOK)", "Linux Virtual File System (VFS)"]
  }
];
