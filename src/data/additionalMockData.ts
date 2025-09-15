// Additional mock data for interactive features

export const connectorsData = {
  sequence: ['En primer lugar', 'En segundo lugar', 'Posteriormente', 'Finalmente', 'Por último'],
  addition: ['Además', 'Asimismo', 'También', 'Igualmente', 'Del mismo modo'],
  contrast: ['Sin embargo', 'No obstante', 'Por el contrario', 'En cambio', 'A pesar de'],
  causeEffect: ['Por lo tanto', 'En consecuencia', 'Como resultado', 'Debido a', 'Por esta razón'],
  example: ['Por ejemplo', 'Es decir', 'En otras palabras', 'Específicamente', 'Tal como'],
  conclusion: ['En conclusión', 'Para finalizar', 'En resumen', 'En definitiva', 'Para concluir']
};

export const previousTextVersion = `El reciclaje es importante para nuestro planeta. Muchas personas no conocen los beneficios que trae esta actividad.

El reciclaje ayuda a reducir la contaminación ambiental. Cuando reciclamos papel, evitamos que se corten más árboles. El reciclaje de plásticos reduce la cantidad de desechos que terminan en los océanos.

El reciclaje genera beneficios económicos. Crear productos a partir de materiales reciclados consume menos energía. La industria del reciclaje crea empleos.

El reciclaje es una práctica que debemos incorporar en nuestra vida diaria.`;

export const petTextExample = `Mi mascota favorita es mi perro Max. Es un Golden Retriever de tres años que llegó a nuestra familia cuando era solo un cachorro. 

Max es muy cariñoso y juguetón. Le encanta correr en el parque y jugar con su pelota favorita. Además, es muy inteligente y ha aprendido muchos trucos como sentarse, dar la pata y traer objetos.

Una de las cosas que más me gusta de Max es su lealtad. Siempre está ahí cuando necesito compañía y parece entender mis emociones. Por esta razón, considero que los perros son las mejores mascotas que pueden tener las familias.`;

export const dailyChallengeData = {
  title: 'Conectores Maestros',
  question: 'El cambio climático es un problema grave. _______, también podemos encontrar soluciones efectivas.',
  options: [
    { text: 'Sin embargo', correct: true, explanation: '¡Correcto! "Sin embargo" establece un contraste apropiado.' },
    { text: 'Por lo tanto', correct: false, explanation: 'No es correcto. "Por lo tanto" indica consecuencia, no contraste.' },
    { text: 'En primer lugar', correct: false, explanation: 'No es correcto. "En primer lugar" indica secuencia, no contraste.' }
  ],
  points: 15
};

export const analysisCards = [
  {
    id: 1,
    type: 'positive',
    icon: '✅',
    title: 'Excelente uso de conectores',
    content: 'Has utilizado muy bien "En primer lugar" y "Por otro lado". Esto hace que tu texto fluya naturalmente.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 2,
    type: 'opportunity',
    icon: '🔄',
    title: 'Oportunidad de mejor cohesión',
    content: 'El segundo párrafo podría conectarse mejor con el primero. Considera usar una frase de transición.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 3,
    type: 'opportunity', 
    icon: '📝',
    title: 'Desarrolla más tu conclusión',
    content: 'Tu texto tiene buenos argumentos, pero necesita una conclusión más sólida que resuma tus puntos.',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 4,
    type: 'positive',
    icon: '🎯',
    title: 'Ideas claras y bien organizadas',
    content: 'Tu introducción presenta claramente el tema y cada párrafo desarrolla una idea específica. ¡Muy bien!',
    color: 'from-cyan-500 to-teal-500'
  }
];

export const textHighlights = [
  {
    text: 'Sin embargo, muchas personas no conocen realmente los beneficios que trae esta actividad.',
    suggestion: '¡Gran argumento! Podrías reforzarlo añadiendo un dato estadístico sobre el reciclaje aquí.',
    position: { start: 145, end: 230 }
  }
];