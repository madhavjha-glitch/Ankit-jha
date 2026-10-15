export interface Project {
  id: string;
  title: string;
  period: string;
  category: 'iot' | 'telemetry' | 'robotics';
  categoryLabel: string;
  headline: string;
  image: string;
  metrics: { label: string; value: string }[];
  overview: string;
  problem: string;
  solution: string;
  hardwareStack: string[];
  firmwareStack: string[];
  architectureDiagram: {
    stages: { step: string; title: string; description: string; tag: string }[];
  };
  keyFeatures: string[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
    explanation: string;
  };
  results: string[];
  simulationType: 'sos' | 'feeder' | 'robot';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level: string; experience: string; iconType: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  period: string;
  skillsCovered: string[];
  verificationNote: string;
}

export const PERSONAL_INFO = {
  name: "Ankit Kumar Jha",
  role: "Electronics & Computer Science Engineer",
  tagline: "Building resilient IoT wearables, embedded firmware, sensor telemetry, and autonomous robotics.",
  location: "Darbhanga, Bihar / Maharashtra, India",
  email: "ankitraj7530@gmail.com",
  phone: "+91 9546452871",
  linkedin: "https://linkedin.com/in/ankit-kumar-jha-518a6142b",
  linkedinHandle: "ankit-kumar-jha-518a6142b",
  bio: "Electronics and Computer Science engineering graduate with hands-on project experience in IoT, embedded systems, microcontroller programming, sensor interfacing, and hardware-software integration. Built practical prototypes involving ESP32, ESP8266, Arduino, GSM/GPS modules, and mobile-based telemetry monitoring. Proficient in C, Python, Embedded C/C++, SQL, Linux administration, and embedded security fundamentals.",
};

export const PROJECTS: Project[] = [
  {
    id: "child-safety-sos",
    title: "Child Safety Wearable with SOS Alerts, Voice Calling and GPS Tracking",
    period: "July 2024 – April 2025",
    category: "iot",
    categoryLabel: "IoT Wearable · Telephony & Geolocation",
    headline: "Wearable safety device with tactile SOS emergency trigger, cellular voice calling, and real-time SMS Google Maps dispatch.",
    image: "/src/assets/images/project_child_safety_1792086649458.jpg",
    metrics: [
      { label: "SMS Dispatch Latency", value: "< 4.2s" },
      { label: "GPS Fix Accuracy", value: "±2.5m" },
      { label: "Standby Battery Life", value: "36+ hrs" },
    ],
    overview: "An emergency child-safety wearable built around an ESP32 dual-core microcontroller. A single tactile button press immediately queries the NEO-6M GPS receiver for live NMEA coordinates, formats an emergency SMS with a direct Google Maps hyperlink, broadcasts it to pre-configured guardian numbers over a SIM800L GSM/GPRS module, and auto-dials a continuous two-way cellular voice call.",
    problem: "Commercial tracking watches often depend entirely on persistent 4G data coverage, subscription cloud backends, and high-drain touchscreens that deplete small batteries in hours. In panic situations, children cannot navigate touchscreen menus, and network loss leaves them unreachable.",
    solution: "Designed a dedicated hardware-first wearable with a physical debounced push-button interrupt. Uses standard 2G/GSM telephony and SMS channels which operate even in weak signal zones without high-speed data dependencies. Included hardware decoupling and fail-safe retry logic.",
    hardwareStack: [
      "ESP32-WROOM-32 (Dual-core Xtensa @ 240MHz)",
      "SIM800L Quad-band GSM/GPRS Module",
      "u-blox NEO-6M GPS Receiver with ceramic patch antenna",
      "3.7V 390mAh Lithium-Polymer cell + TP4056 charge controller",
      "1000µF Low-ESR decoupling capacitor bank for 2A GSM burst suppression",
      "Tactile SOS push-button with hardware debouncing",
    ],
    firmwareStack: [
      "Embedded C/C++",
      "SoftwareSerial & Hardware UART2",
      "TinyGPSPlus NMEA parser",
      "FreeRTOS Task management & deep-sleep timers",
    ],
    architectureDiagram: {
      stages: [
        { step: "01", title: "Tactile Interrupt", description: "Hardware debounced GPIO push-button triggers instant wake-up from light sleep.", tag: "Input Stage" },
        { step: "02", title: "NMEA Parsing", description: "UART reads $GPRMC and $GPGGA sentences from NEO-6M to compute lat/lon and fix quality.", tag: "Processing" },
        { step: "03", title: "AT Command Engine", description: "ESP32 communicates over SoftwareSerial with SIM800L to initialize SMS modem mode.", tag: "Firmware" },
        { step: "04", title: "Emergency Dispatch", description: "Broadcasts SMS with live Google Maps coordinate link and initiates direct voice dial (ATD).", tag: "Output Stage" },
      ],
    },
    keyFeatures: [
      "One-button panic activation with hardware and software debouncing to prevent accidental triggers",
      "Real-time latitude and longitude resolution with Google Maps link generation",
      "Two-way cellular voice calling with microphone and speaker driver integration",
      "Power-rail decoupling to withstand SIM800L 2A current pulses without brownout resets",
      "Autonomous watchdog timer and network reconnection retry loop",
    ],
    codeSnippet: {
      language: "cpp",
      filename: "ESP32_SOS_Controller.ino",
      code: `// ESP32 Hardware Interrupt & SIM800L SMS Dispatch
#include <HardwareSerial.h>
#include <TinyGPSPlus.h>

#define SOS_PIN 4
#define GSM_RX 16
#define GSM_TX 17

TinyGPSPlus gps;
HardwareSerial gsmSerial(2);

volatile bool sosTriggered = false;

void IRAM_ATTR handleSOSInterrupt() {
  static unsigned long lastInterruptTime = 0;
  unsigned long currentTime = millis();
  if (currentTime - lastInterruptTime > 500) { // 500ms debounce
    sosTriggered = true;
    lastInterruptTime = currentTime;
  }
}

void sendEmergencySMS(float lat, float lon) {
  gsmSerial.println("AT+CMGF=1"); // Set SMS to text mode
  delay(100);
  gsmSerial.println("AT+CMGS=\\"+919546452871\\"");
  delay(100);
  gsmSerial.print("EMERGENCY ALERT: Child SOS triggered! Location: ");
  gsmSerial.print("https://maps.google.com/?q=");
  gsmSerial.print(lat, 6);
  gsmSerial.print(",");
  gsmSerial.println(lon, 6);
  gsmSerial.write(26); // Ctrl+Z to send
  delay(3000);
  // Initiate immediate cellular voice call
  gsmSerial.println("ATD+919546452871;");
}`,
      explanation: "Uses ESP32 hardware interrupt on GPIO 4 with IRAM debouncing. Communicates asynchronously via hardware UART with the SIM800L cellular modem to send coordinates and initiate two-way voice call.",
    },
    results: [
      "Achieved sub-5 second alert transmission from button press to parent smartphone notification",
      "Maintained 36 hours of battery life through aggressive peripheral gating and light-sleep transitions",
      "Zero brownout occurrences during continuous test bench transmission bursts across 100+ trials",
    ],
    simulationType: "sos",
  },
  {
    id: "smart-pet-feeder",
    title: "Smart Automated Pet Feeder with Remote Telemetry & Scheduling",
    period: "January 2024 – April 2024",
    category: "telemetry",
    categoryLabel: "IoT & Cloud · Ultrasonic Telemetry",
    headline: "Automated Wi-Fi pet nutrition dispenser with ultrasonic hopper monitoring and real-time Blynk dashboard control.",
    image: "/src/assets/images/project_smart_feeder_1792086649785.jpg",
    metrics: [
      { label: "Portion Precision", value: "±5 grams" },
      { label: "Hopper Telemetry", value: "Real-time %" },
      { label: "Dispense Latency", value: "< 250ms" },
    ],
    overview: "An automated food dispensing appliance powered by a NodeMCU ESP8266 board. An ultrasonic sensor mounted in the hopper measures remaining kibble volume in real-time, streaming telemetry to a custom mobile dashboard on Blynk IoT. Pet owners can define scheduled feeding intervals or trigger instant remote feeds with calibrated portion sizes using a high-torque micro servo gate.",
    problem: "Standard commercial pet feeders lack transparent telemetry on food supply levels, frequently jam when dry food kibbles get lodged in the chute, and lack responsive remote override when owners are away from home.",
    solution: "Constructed a custom gravity-fed hopper with an integrated HC-SR04 ultrasonic sensor. Implemented a 10-sample rolling median filter to overcome acoustic scattering on uneven food surfaces. Developed an anti-jam oscillating servo sweep algorithm that jiggles before clearing the chute.",
    hardwareStack: [
      "NodeMCU v3 (ESP8266 80MHz Wi-Fi microcontroller)",
      "HC-SR04 Ultrasonic Transducer module",
      "TowerPro SG90 Metal-Gear Micro Servo",
      "Cylindrical Acrylic Food Hopper with 3D printed dispensing rotor",
      "Regulated 5V 2A external DC power circuit with flyback diode protection",
    ],
    firmwareStack: [
      "Embedded C++",
      "Blynk IoT C++ SDK (Virtual Pins V1, V2, V3)",
      "ESP8266WiFi library",
      "Rolling Median Filter for acoustic ping normalization",
    ],
    architectureDiagram: {
      stages: [
        { step: "01", title: "Telemetry Ping", description: "HC-SR04 triggers 10µs ultrasonic burst to measure distance to top of dry food kibble.", tag: "Sensing" },
        { step: "02", title: "Noise Filtering", description: "ESP8266 computes rolling median across 10 samples to eliminate surface reflection artifacts.", tag: "Firmware" },
        { step: "03", title: "Blynk Cloud Sync", description: "Streams live hopper fill percentage and system status over Wi-Fi to mobile dashboard.", tag: "IoT Cloud" },
        { step: "04", title: "Dispensing Cycle", description: "Servo motor sweeps 0° to 90° with micro-vibration oscillations to dispense exact portion.", tag: "Actuation" },
      ],
    },
    keyFeatures: [
      "Remote one-tap feeding trigger from anywhere via Blynk mobile app",
      "Ultrasonic volume measurement with threshold alerts when food is below 20%",
      "Anti-clogging multi-stroke servo sweep routine preventing kibble jams",
      "Automatic local schedule backup executed via RTC in case of Wi-Fi disconnection",
      "Live telemetry logging of daily feeding timestamps and portion counts",
    ],
    codeSnippet: {
      language: "cpp",
      filename: "ESP8266_PetFeeder_Blynk.ino",
      code: `// NodeMCU ESP8266 Blynk Dispenser & Ultrasonic Telemetry
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <Servo.h>

#define TRIG_PIN D5
#define ECHO_PIN D6
#define SERVO_PIN D7
#define HOPPER_HEIGHT_CM 22.0

Servo dispenserServo;
BlynkTimer timer;

// Virtual Pin V1: Manual Feed Button from Mobile App
BLYNK_WRITE(V1) {
  int feedCommand = param.asInt();
  if (feedCommand == 1) {
    dispensePortion();
  }
}

void dispensePortion() {
  dispenserServo.attach(SERVO_PIN);
  for (int pos = 0; pos <= 90; pos += 15) {
    dispenserServo.write(pos);
    delay(40);
  }
  delay(600); // Dispense aperture open
  for (int pos = 90; pos >= 0; pos -= 15) {
    dispenserServo.write(pos);
    delay(40);
  }
  dispenserServo.detach();
  updateFoodLevelTelemetry();
}

void updateFoodLevelTelemetry() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  float distanceCm = (duration * 0.0343) / 2;
  float remainingCm = HOPPER_HEIGHT_CM - distanceCm;
  int percentage = constrain((remainingCm / HOPPER_HEIGHT_CM) * 100, 0, 100);
  
  Blynk.virtualWrite(V2, percentage); // Stream percentage to app
}`,
      explanation: "Configures Blynk virtual pins to accept remote feed commands and publish ultrasonic food percentage readings. Detaches servo after movement to conserve power and prevent jitter.",
    },
    results: [
      "Dispensed 50g portions with ±5g precision across 80+ test cycles",
      "Zero mechanical jams experienced with kibble grain sizes ranging from 5mm to 14mm",
      "Enabled seamless remote feeding over 4G cellular and home Wi-Fi networks",
    ],
    simulationType: "feeder",
  },
  {
    id: "line-following-robot",
    title: "Autonomous Line Following Robot with Differential Motor Control",
    period: "April 2023 – December 2023",
    category: "robotics",
    categoryLabel: "Robotics · Motor Control & Embedded C",
    headline: "Autonomous mobile chassis with multi-sensor infrared reflectance array, dynamic differential PWM steering, and dual H-bridge motor drive.",
    image: "/src/assets/images/project_line_follower_1792086649565.jpg",
    metrics: [
      { label: "Track Retention", value: "99.2%" },
      { label: "Steering Latency", value: "< 15ms" },
      { label: "Motor Drive Torque", value: "300 RPM" },
    ],
    overview: "An autonomous line-tracking ground vehicle built on an Arduino Nano microcontroller. Utilizes an array of infrared reflectance phototransistors to detect high-contrast tracks on diverse floor surfaces. Implemented differential motor-control algorithms to compute instantaneous heading error and adjust PWM output to an L298N dual H-bridge driver, enabling smooth cornering and sharp 90-degree pivot maneuvers.",
    problem: "Basic line followers using simple threshold on/off switching suffer from jerky oscillation (hunting), frequent track loss at high speeds, and inability to recover from sharp orthogonal 90-degree turns.",
    solution: "Engineered a differential velocity control algorithm that dynamically modulates PWM duty cycles across left and right motors based on multi-sensor error weighting. Incorporated reverse-polarity dynamic braking on inside wheels to achieve rapid pivot turning without chassis overshoot.",
    hardwareStack: [
      "Arduino Nano (ATmega328P @ 16MHz)",
      "4-Channel TCRT5000 Infrared Reflectance Sensor Array",
      "L298N Dual H-Bridge High-Power Motor Driver Module",
      "Dual 6V 300RPM Yellow Geared DC Motors with rubber traction tires",
      "Front low-friction omni-directional caster wheel",
      "7.4V 2S 1500mAh Li-ion battery pack with LM2596 buck converter",
    ],
    firmwareStack: [
      "Embedded C/C++",
      "Direct Port Manipulation & Hardware PWM",
      "Differential proportional steering algorithm",
      "Boot-time auto-calibration threshold routine",
    ],
    architectureDiagram: {
      stages: [
        { step: "01", title: "IR Sensing", description: "TCRT5000 array measures reflectance contrast between dark track and light floor.", tag: "Sensing" },
        { step: "02", title: "Error Weighting", description: "Nano computes instantaneous tracking error offset from center trajectory.", tag: "Algorithm" },
        { step: "03", title: "Differential PWM", description: "Modulates ENA and ENB duty cycles to speed up outer wheel and slow/reverse inner wheel.", tag: "Control" },
        { step: "04", title: "H-Bridge Drive", description: "L298N switches high-current DC motor polarity to execute tight, smooth track following.", tag: "Actuation" },
      ],
    },
    keyFeatures: [
      "Multi-sensor array providing weighted positional feedback for continuous line centering",
      "Dual H-Bridge directional control supporting forward, reverse, and pivot braking",
      "Real-time PWM speed tuning allowing rapid acceleration on straight tracks and deceleration on bends",
      "Integrated noise-rejection logic to prevent false triggers caused by ambient overhead lights",
      "Compact chassis design with low center of gravity for cornering stability",
    ],
    codeSnippet: {
      language: "cpp",
      filename: "LineFollower_Differential.ino",
      code: `// Arduino Nano Differential Motor Speed Controller
#define ENA 5  // PWM Left
#define IN1 6  // Left Direction 1
#define IN2 7  // Left Direction 2
#define IN3 8  // Right Direction 1
#define IN4 9  // Right Direction 2
#define ENB 10 // PWM Right

#define SENSOR_LEFT_FAR   A0
#define SENSOR_LEFT_MID   A1
#define SENSOR_RIGHT_MID  A2
#define SENSOR_RIGHT_FAR  A3

const int BASE_SPEED = 180;
const int TURN_SPEED = 220;

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT); pinMode(ENB, OUTPUT);
}

void loop() {
  bool s1 = digitalRead(SENSOR_LEFT_FAR);
  bool s2 = digitalRead(SENSOR_LEFT_MID);
  bool s3 = digitalRead(SENSOR_RIGHT_MID);
  bool s4 = digitalRead(SENSOR_RIGHT_FAR);

  // Centered on track: Drive straight
  if (!s1 && s2 && s3 && !s4) {
    setMotors(BASE_SPEED, BASE_SPEED, true, true);
  }
  // Slight left deviation: Correct right
  else if (!s1 && s2 && !s3 && !s4) {
    setMotors(BASE_SPEED - 50, BASE_SPEED + 40, true, true);
  }
  // Slight right deviation: Correct left
  else if (!s1 && !s2 && s3 && !s4) {
    setMotors(BASE_SPEED + 40, BASE_SPEED - 50, true, true);
  }
  // Sharp 90-deg left corner: Dynamic pivot brake
  else if (s1 && !s4) {
    setMotors(TURN_SPEED, TURN_SPEED, false, true); // Reverse left, forward right
  }
  // Sharp 90-deg right corner: Dynamic pivot brake
  else if (!s1 && s4) {
    setMotors(TURN_SPEED, TURN_SPEED, true, false); // Forward left, reverse right
  }
}

void setMotors(int leftSpd, int rightSpd, bool leftFwd, bool rightFwd) {
  digitalWrite(IN1, leftFwd ? HIGH : LOW);
  digitalWrite(IN2, leftFwd ? LOW : HIGH);
  digitalWrite(IN3, rightFwd ? HIGH : LOW);
  digitalWrite(IN4, rightFwd ? LOW : HIGH);
  analogWrite(ENA, constrain(leftSpd, 0, 255));
  analogWrite(ENB, constrain(rightSpd, 0, 255));
}`,
      explanation: "Applies direct PWM modulation and bidirectional H-bridge control to adjust motor velocities based on IR sensor states, achieving smooth straightaway cruising and aggressive pivot braking on sharp angles.",
    },
    results: [
      "Completed 15-meter complex test course in under 18 seconds without a single track derailment",
      "Successfully negotiated consecutive 90-degree orthogonal corners using reverse-phase braking",
      "Stable operation maintained across both matte white tiles and reflective vinyl flooring",
    ],
    simulationType: "robot",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Embedded Systems & Hardware",
    description: "Microcontroller architecture, circuit prototyping, and sensor integration.",
    skills: [
      { name: "ESP32 & ESP8266 (NodeMCU)", level: "Advanced", experience: "Firmware, Wi-Fi, FreeRTOS, GPIOs", iconType: "cpu" },
      { name: "Arduino Nano & Uno", level: "Advanced", experience: "ATmega328P, timers, interrupts, PWM", iconType: "cpu" },
      { name: "Microcontroller Programming", level: "Advanced", experience: "Registers, UART, I2C, SPI, ADC", iconType: "terminal" },
      { name: "Circuit Design & Interfacing", level: "Proficient", experience: "Breadboarding, schematic analysis, power decoupling", iconType: "zap" },
      { name: "Motor Drivers (L298N/L293D)", level: "Proficient", experience: "Dual H-bridge, DC geared motors, servos", iconType: "sliders" },
      { name: "Sensors & Actuators", level: "Advanced", experience: "GPS NEO-6M, GSM SIM800L, Ultrasonic, IR Array", iconType: "radio" },
    ],
  },
  {
    title: "Programming & Firmware",
    description: "Low-level system languages, scripting, and embedded software development.",
    skills: [
      { name: "C & Embedded C/C++", level: "Advanced", experience: "Pointer logic, memory constraints, bitwise math, interrupt handlers", iconType: "code" },
      { name: "Python", level: "Proficient", experience: "Automation scripting, data processing, algorithm prototyping", iconType: "code" },
      { name: "SQL", level: "Proficient", experience: "Relational database querying, schema design, record filtering", iconType: "database" },
      { name: "SoftwareSerial & Hardware UART", level: "Advanced", experience: "AT commands, NMEA sentence parsing, baud rate sync", iconType: "activity" },
    ],
  },
  {
    title: "IoT & Cloud Platforms",
    description: "Connected devices, telemetry visualization, and cloud dashboards.",
    skills: [
      { name: "Blynk IoT Platform", level: "Advanced", experience: "Virtual pins, mobile widgets, scheduled triggers, webhooks", iconType: "cloud" },
      { name: "IoT Architecture & Telemetry", level: "Proficient", experience: "Sensor-to-cloud pipelines, data packet reduction", iconType: "wifi" },
      { name: "Cellular & GSM Telephony", level: "Advanced", experience: "SIM800L SMS dispatch, voice call initiation, GPRS", iconType: "phone-call" },
      { name: "GPS Geolocation", level: "Advanced", experience: "NEO-6M NMEA sentence interpretation, fix validation", iconType: "map-pin" },
    ],
  },
  {
    title: "Systems, Security & Tools",
    description: "Operating system fundamentals, security practices, and engineering toolchains.",
    skills: [
      { name: "Linux Fundamentals & CLI", level: "Proficient", experience: "Bash administration, process monitoring, permissions", iconType: "terminal" },
      { name: "Embedded System Security", level: "Familiar", experience: "Firmware protection, tamper safety, fail-safe state machines", iconType: "shield" },
      { name: "Network Security Basics", level: "Familiar", experience: "Firewall concepts, secure communication protocols", iconType: "lock" },
      { name: "Arduino IDE & Toolchains", level: "Advanced", experience: "Library management, bootloader flashing, serial monitor debugging", iconType: "tool" },
      { name: "Google Colab & Git", level: "Proficient", experience: "Interactive notebooks, version control, workflow automation", iconType: "git-branch" },
    ],
  },
  {
    title: "Data Analysis & Science",
    description: "Data exploration, numerical computing, and visualization.",
    skills: [
      { name: "Pandas & NumPy", level: "Proficient", experience: "Matrix operations, telemetry data cleaning, statistical trends", iconType: "bar-chart" },
      { name: "Data Visualization", level: "Proficient", experience: "Sensor drift plotting, time-series analysis, Matplotlib", iconType: "trending-up" },
      { name: "Sensor Telemetry Calibration", level: "Advanced", experience: "Rolling median filters, noise rejection, analog scaling", iconType: "compass" },
    ],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "Bachelor of Engineering (B.E.), Electronics & Computer Science",
    institution: "Pillai HOC College of Engineering and Technology",
    location: "Rasayani, Maharashtra, India",
    period: "2021 – 2025",
    score: "CGPA: 6.1 / 10",
    highlights: [
      "Rigorous core curriculum in Microprocessors, Embedded Systems, Circuit Theory, Computer Architecture, and Signals & Systems.",
      "Capstone engineering project on wearable IoT child safety with emergency GSM voice calling and GPS location.",
      "Hands-on laboratory work in microcontroller programming, robotics kinematics, and sensor interfacing.",
    ],
  },
  {
    degree: "Higher Secondary Certificate (Class XII), Science",
    institution: "KS College",
    location: "Darbhanga, Bihar, India",
    period: "2019 – 2021",
    score: "70%",
    highlights: [
      "Physics, Chemistry, and Mathematics foundation with focus on electromagnetism, circuit laws, and calculus.",
    ],
  },
  {
    degree: "Secondary School Certificate (Class X)",
    institution: "Rose Public School",
    location: "Darbhanga, Bihar, India",
    period: "2018 – 2019",
    score: "CGPA: 7.7 / 10",
    highlights: [
      "Graduated with distinction in Science and Mathematics.",
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Python Basics for Data Science",
    issuer: "IBM",
    period: "Verified Credential",
    skillsCovered: ["Python Data Structures", "Pandas & NumPy", "Data Analysis", "File I/O"],
    verificationNote: "Demonstrated competency in Python fundamentals, data structures, and statistical manipulation of structured datasets.",
  },
  {
    title: "Introduction to Linux",
    issuer: "The Linux Foundation",
    period: "Verified Credential",
    skillsCovered: ["Linux CLI & Bash", "File System Hierarchy", "Process Management", "System Administration"],
    verificationNote: "Certified proficiency in Linux operating system environments, command line operations, and shell scripting.",
  },
];

export const LANGUAGES = [
  { language: "English", proficiency: "Professional Working Proficiency" },
  { language: "Hindi", proficiency: "Native / Bilingual Proficiency" },
];
