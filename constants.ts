import { absoluteUrl, returnUrl } from "./lib/utils";

export const POINTS_TO_REFILL = 10;

export const quests = [
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
  {
    title: "Earn 1000 XP",
    value: 1000,
  },
];

export const orders = {
  amount: 299,
  currency: "TWD",
  orderId: Date.now().toString(),
  packages: [
    {
      id: "Lingo Pro",
      amount: 299,
      products: [
        {
          name: "es",
          quantity: 1,
          price: 299,
        },
      ],
    },
  ],
  redirectUrls: {
    confirmUrl: returnUrl,
    cancelUrl: returnUrl,
  },
};
export const dataToInsert = {
  languages: [
    {
      title: "Spanish",
      imageSrc: "/es.svg",
    },
    {
      title: "Japanese",
      imageSrc: "/jp.svg",
    },
    {
      title: "French",
      imageSrc: "/fr.svg",
    },
    {
      title: "Croatian",
      imageSrc: "/hr.svg",
    },
    {
      title: "Italian",
      imageSrc: "/it.svg",
    },
  ],
  units: [
    {
      id: 1,
      courseId: 1, // Spanish
      title: "Unit 1",
      description: "Learn the basics of Spanish",
      order: 1,
    },
  ],
  lessons: [
    {
      id: 1,
      unitId: 1, // Unit 1 (Learn the basics...)
      order: 1,
      title: "Nouns",
    },
    {
      id: 2,
      unitId: 1, // Unit 1 (Learn the basics...)
      order: 2,
      title: "Verbs",
    },
  ],
  challenges: [
    {
      id: 1,
      lessonId: 1, // Nouns
      type: "SELECT",
      order: 1,
      question: 'Which one of these is the "the man"?',
    },
    {
      id: 2,
      lessonId: 1, // Nouns
      type: "ASSIST",
      order: 2,
      question: '"the man"',
    },
    {
      id: 3,
      lessonId: 1, // Nouns
      type: "SELECT",
      order: 3,
      question: 'Which one of these is the "the robot"?',
    },
    {
      id: 4,
      lessonId: 2, // Verbs
      type: "SELECT",
      order: 1,
      question: 'Which one of these is the "the man"?',
    },
    {
      id: 5,
      lessonId: 2, // Verbs
      type: "ASSIST",
      order: 2,
      question: '"the robot"',
    },
    {
      id: 6,
      lessonId: 2, // Verbs
      type: "SELECT",
      order: 3,
      question: 'Which one of these is the "the woman"?',
    },
  ],
  challengeOptions: [
    {
      challengeId: 1, // Which one of these is "the man"?
      imageSrc: "/man.svg",
      correct: true,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 1,
      imageSrc: "/woman.svg",
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 1,
      imageSrc: "/robot.svg",
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 2, // "the man"?
      correct: true,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 2,
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 2,
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 3, // Which one of these is the "the robot"?
      imageSrc: "/man.svg",
      correct: false,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 3,
      imageSrc: "/woman.svg",
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 3,
      imageSrc: "/robot.svg",
      correct: true,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 4, // Which one of these is "the man"?
      imageSrc: "/man.svg",
      correct: true,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 4,
      imageSrc: "/woman.svg",
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 4,
      imageSrc: "/robot.svg",
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 5, // "the robot"?
      correct: false,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 5,
      correct: false,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 5,
      correct: true,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
    {
      challengeId: 6, // Which one of these is the "the woman"?
      imageSrc: "/man.svg",
      correct: false,
      text: "el hombre",
      audioSrc: "/es_man.mp3",
    },
    {
      challengeId: 6,
      imageSrc: "/woman.svg",
      correct: true,
      text: "la mujer",
      audioSrc: "/es_woman.mp3",
    },
    {
      challengeId: 6,
      imageSrc: "/robot.svg",
      correct: false,
      text: "el robot",
      audioSrc: "/es_robot.mp3",
    },
  ],
};
