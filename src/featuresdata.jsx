import vrWorlds from './images/vr_worlds.png';
import gamified from './images/Gamified_Workout.png';
import zeroGravity from './images/zero_gravity.png';
import customChallenges from './images/Custom_Challenges.png';
import progressTracking from './images/progress_tracking.png';
import socialMultiplayer from './images/Social_and_Multiplayer.png';

const features = [
  {
    id: 1,
    title: "VR Worlds",
    description: "Explore immersive fitness experiences on Mars, the Moon, Saturn’s rings, or deep space. Feel like you’re actually there with realistic physics and planetary landscapes.",
    image: vrWorlds,
    imagename: "vr",
    gradientColors: ["#00FFFF", "#BF00FF", "#FF6EC7"]
  },
  {
    id: 2,
    title: "Gamified Workouts",
    description: "Earn points, level up, and unlock achievements. Compete with friends or other users in global leaderboards.",
    image: gamified,
    imagename: "gamified",
    gradientColors: ["#39FF14", "#00FFFF", "#BF00FF"]
  },
  {
    id: 3,
    title: "Zero-Gravity Training",
    description: "Enjoy low-impact exercises that reduce stress on joints while maximizing calorie burn. Perfect for beginners and pros alike.",
    image: zeroGravity,
    imagename: "gravity",
    gradientColors: ["#FF6EC7", "#0FF0FC", "#1B1F3B"]
  },
  {
    id: 4,
    title: "Custom Challenges",
    description: "Create your own workout routines or choose from themed missions: Meteor Dodge, Asteroid Sprint, Lunar Yoga.",
    image: customChallenges,
    imagename: "custom",
    gradientColors: ["#BF00FF", "#00FFFF", "#0FF0FC"]
  },
  {
    id: 5,
    title: "Progress Tracking",
    description: "Detailed analytics: calories burned, workout streaks, heart rate, and improvement charts. Stay motivated with visual stats.",
    image: progressTracking,
    imagename: "progress",
    gradientColors: ["#FF6EC7", "#BF00FF", "#00FFFF"]
  },
  {
    id: 6,
    title: "Social & Multiplayer",
    description: "Join friends in multiplayer fitness sessions or take part in intergalactic fitness events. Share achievements directly on social media.",
    image: socialMultiplayer,
    imagename: "social",
    gradientColors: ["#00FFFF", "#39FF14", "#BF00FF"]
  }
];

export default features;
