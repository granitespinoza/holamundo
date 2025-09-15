import { Student, Teacher, Task, TextSubmission, Badge, Exercise, ClassroomTask } from '@/types';

// Mock Teacher Data
export const mockTeacher: Teacher = {
  id: 'teacher-1',
  name: 'Bertha Layo',
  email: 'teacher01@gmail.com',
  role: 'teacher',
  avatar: '👩‍🏫',
  students: [] // Will be populated with mockStudents
};

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Joaquín Quispe',
    email: 'student01@gmail.com',
    role: 'student',
    avatar: '👨‍🎓',
    progress: {
      planning: 80,
      cohesion: 55,
      connectors: 60,
      revision: 70
    },
    tasks: []
  },
  {
    id: 'student-2',
    name: 'Camila Flores',
    email: 'camila.flores@gmail.com',
    role: 'student',
    avatar: '👩‍🎓',
    progress: {
      planning: 90,
      cohesion: 75,
      connectors: 85,
      revision: 80
    },
    tasks: []
  },
  {
    id: 'student-3',
    name: 'Mateo Rojas',
    email: 'mateo.rojas@gmail.com',
    role: 'student',
    avatar: '👨‍🎓',
    progress: {
      planning: 65,
      cohesion: 45,
      connectors: 50,
      revision: 55
    },
    tasks: []
  }
];

// Mock Task Data
export const mockTask: Task = {
  id: 'task-1',
  title: 'Escribir un texto argumentativo sobre la importancia del reciclaje',
  description: 'Redacta un texto argumentativo de 300-400 palabras sobre por qué es importante reciclar. Incluye una introducción con tu tesis, dos párrafos de desarrollo con argumentos sólidos y una conclusión que refuerce tu posición.',
  type: 'argumentative',
  dueDate: '2024-12-15',
  createdBy: 'teacher-1',
  assignedTo: ['student-1', 'student-2', 'student-3'],
  status: 'assigned'
};

// Mock Text Submission - Joaquín's Draft
export const mockSubmission: TextSubmission = {
  id: 'submission-1',
  taskId: 'task-1',
  studentId: 'student-1',
  content: `El reciclaje es muy importante para nuestro planeta. Además, es una práctica que todos deberíamos adoptar en nuestro día a día. Sin embargo, muchas personas no conocen realmente los beneficios que trae esta actividad.

En primer lugar, el reciclaje ayuda a reducir la contaminación ambiental. Por ejemplo, cuando reciclamos papel, evitamos que se corten más árboles. También, el reciclaje de plásticos reduce la cantidad de desechos que terminan en los océanos. Por lo tanto, cada vez que reciclamos estamos protegiendo la naturaleza.

En segundo lugar, el reciclaje genera beneficios económicos. Además, crear productos a partir de materiales reciclados consume menos energía que producirlos desde cero. Asimismo, la industria del reciclaje crea empleos y oportunidades de negocio. En consecuencia, el reciclaje no solo ayuda al medio ambiente sino también a la economía.

En conclusión, el reciclaje es una práctica fundamental que debemos incorporar en nuestra vida diaria. Por esta razón, es importante que tanto gobiernos como ciudadanos trabajen juntos para promover el reciclaje y crear un futuro más sostenible.`,
  version: 1,
  createdAt: '2024-12-01T10:30:00',
  status: 'draft',
  analysis: {
    coherence: {
      score: 75,
      issues: ['La transición entre el segundo y tercer párrafo podría ser más fluida'],
      suggestions: ['Considera usar una frase de transición que conecte los beneficios ambientales con los económicos']
    },
    cohesion: {
      score: 60,
      issues: ['Algunas ideas se repiten', 'La estructura podría ser más clara'],
      suggestions: ['Revisa las repeticiones de "además" y "también"', 'Organiza mejor las ideas en cada párrafo']
    },
    connectors: {
      score: 70,
      issues: ['Uso repetitivo de algunos conectores'],
      suggestions: ['Varía el uso de conectores para evitar repetición'],
      detected: [
        { text: 'Además', position: 0, type: 'correct' },
        { text: 'Sin embargo', position: 1, type: 'correct' },
        { text: 'En primer lugar', position: 2, type: 'correct' },
        { text: 'Por ejemplo', position: 3, type: 'correct' },
        { text: 'También', position: 4, type: 'correct' },
        { text: 'Por lo tanto', position: 5, type: 'correct' },
        { text: 'En segundo lugar', position: 6, type: 'correct' },
        { text: 'Además', position: 7, type: 'misused', suggestion: 'Usa "Igualmente" o "Del mismo modo" para evitar repetición' },
        { text: 'Asimismo', position: 8, type: 'correct' },
        { text: 'En consecuencia', position: 9, type: 'correct' },
        { text: 'En conclusión', position: 10, type: 'correct' },
        { text: 'Por esta razón', position: 11, type: 'correct' }
      ],
      missing: ['No obstante', 'Cabe destacar que', 'Es más']
    },
    repetitions: [
      { word: 'reciclaje', count: 8, positions: [3, 15, 45, 67, 89, 112, 134, 156], severity: 'medium' },
      { word: 'además', count: 2, positions: [12, 98], severity: 'low' },
      { word: 'importante', count: 3, positions: [8, 23, 167], severity: 'low' }
    ],
    suggestions: [
      'Considera usar sinónimos para "reciclaje" como "reutilización" o "aprovechamiento de materiales"',
      'La estructura argumentativa es sólida, pero podrías añadir datos estadísticos para fortalecer tus argumentos',
      'Excelente uso de conectores de secuencia y causa-efecto'
    ]
  }
};

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: 'badge-1',
    name: 'Primer Texto',
    description: 'Completa tu primer texto',
    icon: '📝',
    earnedAt: '2024-11-15T09:00:00'
  },
  {
    id: 'badge-2',
    name: 'Maestro de Conectores',
    description: 'Usa correctamente 10 conectores diferentes',
    icon: '🔗'
  },
  {
    id: 'badge-3',
    name: 'Revisor Experto',
    description: 'Revisa y mejora un texto 3 veces',
    icon: '🔍',
    earnedAt: '2024-11-20T14:30:00'
  }
];

// Mock Exercises
export const mockExercises: Exercise[] = [
  {
    id: 'exercise-1',
    title: 'Conectores de Causa y Efecto',
    type: 'connectors',
    difficulty: 'easy',
    points: 10,
    completed: true,
    completedAt: '2024-11-18T11:00:00'
  },
  {
    id: 'exercise-2',
    title: 'Estructura del Párrafo Argumentativo',
    type: 'structure',
    difficulty: 'medium',
    points: 20
  },
  {
    id: 'exercise-3',
    title: 'Identificar Incoherencias',
    type: 'coherence',
    difficulty: 'hard',
    points: 30
  }
];

// Login credentials for testing
export const mockCredentials = {
  student: {
    email: 'student01@gmail.com',
    password: '123456'
  },
  teacher: {
    email: 'teacher01@gmail.com',
    password: '112233'
  }
};

// Mock Google Classroom Tasks
export const mockClassroomTasks: ClassroomTask[] = [
  {
    id: 'classroom-1',
    title: 'Ensayo sobre el cambio climático',
    description: 'Redacta un ensayo argumentativo de 500 palabras sobre las causas y consecuencias del cambio climático.',
    courseName: 'Lengua y Literatura',
    courseId: 'lang-lit-001',
    dueDate: '2024-12-10T23:59:00',
    priority: 'high',
    status: 'pending',
    isOverdue: false,
    classroomUrl: 'https://classroom.google.com/c/assignment1',
    type: 'assignment'
  },
  {
    id: 'classroom-2',
    title: 'Análisis de "Cien años de soledad"',
    description: 'Analiza los elementos del realismo mágico en la obra de Gabriel García Márquez.',
    courseName: 'Literatura Universal',
    courseId: 'lit-univ-002',
    dueDate: '2024-12-08T23:59:00',
    priority: 'high',
    status: 'pending',
    isOverdue: true,
    classroomUrl: 'https://classroom.google.com/c/assignment2',
    type: 'assignment'
  },
  {
    id: 'classroom-3',
    title: 'Presentación sobre la Revolución Francesa',
    description: 'Crea una presentación de 10 diapositivas sobre los principales eventos de la Revolución Francesa.',
    courseName: 'Historia Mundial',
    courseId: 'hist-mund-003',
    dueDate: '2024-12-15T14:30:00',
    priority: 'medium',
    status: 'in-progress',
    isOverdue: false,
    classroomUrl: 'https://classroom.google.com/c/assignment3',
    type: 'project'
  },
  {
    id: 'classroom-4',
    title: 'Quiz de Ecuaciones Cuadráticas',
    description: 'Evaluación sobre la resolución de ecuaciones de segundo grado.',
    courseName: 'Matemáticas Avanzadas',
    courseId: 'math-adv-004',
    dueDate: '2024-12-12T09:00:00',
    priority: 'medium',
    status: 'pending',
    isOverdue: false,
    classroomUrl: 'https://classroom.google.com/c/quiz1',
    type: 'quiz'
  },
  {
    id: 'classroom-5',
    title: 'Lectura: "El Principito"',
    description: 'Leer los capítulos 1-10 de "El Principito" y preparar reflexiones.',
    courseName: 'Lengua y Literatura',
    courseId: 'lang-lit-001',
    dueDate: '2024-12-14T23:59:00',
    priority: 'low',
    status: 'pending',
    isOverdue: false,
    classroomUrl: 'https://classroom.google.com/c/reading1',
    type: 'reading'
  },
  {
    id: 'classroom-6',
    title: 'Informe de laboratorio - Reacciones químicas',
    description: 'Completar el informe sobre el experimento de reacciones químicas realizado en clase.',
    courseName: 'Química General',
    courseId: 'chem-gen-005',
    dueDate: '2024-12-13T17:00:00',
    priority: 'high',
    status: 'in-progress',
    isOverdue: false,
    classroomUrl: 'https://classroom.google.com/c/lab-report1',
    type: 'assignment'
  }
];

// Populate relationships
mockTeacher.students = mockStudents;
mockStudents.forEach(student => {
  student.tasks = [{
    ...mockTask,
    submissions: student.id === 'student-1' ? [mockSubmission] : []
  }];
});