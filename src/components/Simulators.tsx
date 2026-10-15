import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  MapPin, 
  PhoneCall, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw, 
  Sliders, 
  Cpu, 
  ArrowRight,
  Battery,
  Wifi,
  Terminal,
  Volume2
} from 'lucide-react';

/* =========================================================================
   1. Child Safety SOS Tracker Simulator
   ========================================================================= */
export const SosTrackerSimulator: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'debouncing' | 'gps_lock' | 'sending_sms' | 'calling' | 'active'>('idle');
  const [logs, setLogs] = useState<string[]>([
    "ESP32-WROOM booted. FreeRTOS task running on Core 0.",
    "SIM800L initialized on UART2 [9600 baud]. Signal CSQ: 24/31.",
    "NEO-6M GPS listening on Serial1 [9600 baud]. Satellites visible: 8.",
    "System state: ARMED & READY. Press SOS button to trigger.",
  ]);
  const [latitude, setLatitude] = useState(26.1542);
  const [longitude, setLongitude] = useState(85.8918);
  const [batteryLevel] = useState(94);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'calling') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [status]);

  const triggerSOS = () => {
    if (status !== 'idle' && status !== 'active') return;

    setStatus('debouncing');
    setLogs((prev) => [
      ...prev,
      ">>> [INTERRUPT] GPIO4 hardware interrupt fired!",
      ">>> [DEBOUNCE] Delta: 512ms > 500ms threshold. Valid trigger accepted.",
    ]);

    setTimeout(() => {
      setStatus('gps_lock');
      // Generate slight jitter around real coordinates
      const newLat = Number((26.1542 + (Math.random() - 0.5) * 0.002).toFixed(6));
      const newLon = Number((85.8918 + (Math.random() - 0.5) * 0.002).toFixed(6));
      setLatitude(newLat);
      setLongitude(newLon);
      setLogs((prev) => [
        ...prev,
        `>>> [NEO-6M] Parsed $GPRMC valid sentence. HDOP: 1.1. Fix locked: ${newLat}, ${newLon}`,
      ]);

      setTimeout(() => {
        setStatus('sending_sms');
        setLogs((prev) => [
          ...prev,
          `>>> [SIM800L] AT+CMGF=1 -> OK`,
          `>>> [SIM800L] AT+CMGS="+919546452871" -> PROMPT '>'`,
          `>>> [SIM800L] Payload: "EMERGENCY: Child SOS triggered! https://maps.google.com/?q=${newLat},${newLon}"`,
          `>>> [SIM800L] Sent Ctrl+Z -> +CMGS: 42 OK (Delivery Confirmed)`,
        ]);

        setTimeout(() => {
          setStatus('calling');
          setLogs((prev) => [
            ...prev,
            `>>> [SIM800L] Initiating emergency cellular call: ATD+919546452871;`,
            `>>> [AUDIO] Two-way voice link connected. Mic AGC active.`,
          ]);
        }, 1200);
      }, 1100);
    }, 700);
  };

  const resetSystem = () => {
    setStatus('idle');
    setLogs([
      "ESP32-WROOM booted. FreeRTOS task running on Core 0.",
      "SIM800L initialized on UART2 [9600 baud]. Signal CSQ: 24/31.",
      "NEO-6M GPS listening on Serial1 [9600 baud]. Satellites visible: 8.",
      "System state: ARMED & READY. Press SOS button to trigger.",
    ]);
    setCallDuration(0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-400" />
          <span className="font-semibold text-sm tracking-wide text-white">ESP32 SOS Wearable Hardware Testbench</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span className="tabular-nums">{batteryLevel}% (3.92V)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-sky-400" />
            <span>GSM: 4/4 Bars</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Physical Wearable Control */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/70 border border-slate-800/80 rounded-lg text-center">
          <div className="text-xs text-slate-400 mb-4 tracking-wide font-medium">TACTILE EMERGENCY TRIGGER</div>

          <button
            onClick={triggerSOS}
            disabled={status !== 'idle'}
            className={`w-32 h-32 rounded-full font-bold text-lg tracking-wider shadow-lg flex flex-col items-center justify-center transition-all duration-200 active:scale-95 ${
              status === 'idle'
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/40 hover:shadow-red-600/50 cursor-pointer'
                : 'bg-red-950/80 text-red-300 border-2 border-red-500/50 cursor-not-allowed animate-pulse'
            }`}
          >
            <AlertCircle className="w-7 h-7 mb-1" />
            <span>SOS</span>
            <span className="text-[10px] font-normal tracking-normal opacity-80">HOLD 500ms</span>
          </button>

          <div className="mt-5 text-xs text-slate-400">
            {status === 'idle' && "Status: Standby · Deep Sleep Monitor Active"}
            {status === 'debouncing' && "Hardware Debounce Interrupt Validating..."}
            {status === 'gps_lock' && "Acquiring NEO-6M High-Precision GPS Lock..."}
            {status === 'sending_sms' && "Broadcasting Emergency SMS with Maps URL..."}
            {status === 'calling' && `Cellular Call In Progress (${callDuration}s)`}
          </div>

          {status !== 'idle' && (
            <button
              onClick={resetSystem}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State Machine</span>
            </button>
          )}
        </div>

        {/* Right: Telemetry & Simulated Recipient Device */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Dispatch Output Card */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>GUARDIAN CELLULAR RECEIVER</span>
              <span className="text-sky-400 font-mono">+91 9546452871</span>
            </div>

            {status === 'calling' || status === 'sending_sms' ? (
              <div className="space-y-3">
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded text-xs text-red-200">
                  <div className="font-semibold flex items-center gap-1.5 text-red-400 mb-1">
                    <AlertCircle className="w-4 h-4" />
                    EMERGENCY SMS RECEIVED
                  </div>
                  <p className="font-mono text-[11px] leading-relaxed">
                    Child SOS triggered! Coordinates: {latitude}, {longitude}
                  </p>
                  <a
                    href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sky-400 hover:underline mt-1 font-mono text-[11px]"
                  >
                    <MapPin className="w-3 h-3" />
                    Open Google Maps Location Pin
                  </a>
                </div>

                {status === 'calling' && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded text-xs text-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-emerald-400 animate-pulse" />
                      <div>
                        <div className="font-semibold text-emerald-300">Active Two-Way Cellular Voice Call</div>
                        <div className="font-mono text-[10px] text-emerald-400">Duration: {callDuration}s · Full Duplex PCM</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-900/60 text-emerald-300">LIVE</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500 font-mono">
                Awaiting SOS interrupt. Press red button to fire telemetry.
              </div>
            )}
          </div>

          {/* Firmware Serial Monitor */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
            <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>UART Serial Monitor (115200 baud)</span>
              </span>
              <span className="text-[10px] text-slate-500">FreeRTOS v10.2</span>
            </div>
            <div className="max-h-28 overflow-y-auto space-y-1 text-slate-300">
              {logs.slice(-5).map((log, idx) => (
                <div key={idx} className={log.startsWith(">>>") ? "text-amber-400" : "text-slate-400"}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. Smart Pet Feeder Simulator
   ========================================================================= */
export const SmartFeederSimulator: React.FC = () => {
  const [foodLevel, setFoodLevel] = useState<number>(75); // percentage
  const [isDispensing, setIsDispensing] = useState(false);
  const [servoAngle, setServoAngle] = useState(0);
  const [totalPortionsFed, setTotalPortionsFed] = useState(3);
  const [lastFedTime, setLastFedTime] = useState("08:30 AM");
  const [blynkLog, setBlynkLog] = useState<string>("Blynk IoT connected to NodeMCU (ESP8266). V1/V2 ready.");

  const dispenseFood = () => {
    if (isDispensing || foodLevel <= 5) return;
    setIsDispensing(true);
    setBlynkLog("V1 Triggered: Rotating servo from 0° -> 90° (Gate Open)...");

    // Servo rotation animation
    setServoAngle(90);

    setTimeout(() => {
      setBlynkLog("Portion dispensed (50g). Vibrating servo to prevent kibble jamming...");
      setServoAngle(75);

      setTimeout(() => {
        setServoAngle(0);
        setIsDispensing(false);
        setFoodLevel((prev) => Math.max(0, prev - 15));
        setTotalPortionsFed((prev) => prev + 1);
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setLastFedTime(timeStr);
        setBlynkLog(`Dispense complete. Updated V2 Telemetry: ${Math.max(0, foodLevel - 15)}% remaining.`);
      }, 700);
    }, 900);
  };

  const refillHopper = () => {
    setFoodLevel(100);
    setBlynkLog("Hopper refilled to 100%. Ultrasonic echo distance: 3.2cm.");
  };

  const distanceCm = ((22 * (100 - foodLevel)) / 100 + 2.5).toFixed(1);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-sky-400" />
          <span className="font-semibold text-sm tracking-wide text-white">NodeMCU ESP8266 & Blynk Cloud Console</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Blynk Cloud: Online</span>
          </span>
          <span>Wi-Fi RSSI: -54 dBm</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Ultrasonic Hopper Physical Cross-Section */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-3">
              <span>HOPPER VOLUME TELEMETRY</span>
              <span className="font-mono text-sky-400">{foodLevel}%</span>
            </div>

            {/* Ultrasonic sensor representation */}
            <div className="flex items-center justify-center gap-4 py-2 border-b border-slate-800 text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-1 text-slate-300">
                <Radio className="w-3.5 h-3.5 text-sky-400" />
                <span>HC-SR04 Transducer</span>
              </div>
              <span className="text-slate-500">Echo: {distanceCm} cm</span>
            </div>

            {/* Hopper visual container */}
            <div className="relative w-full h-44 bg-slate-900 rounded-lg border border-slate-800 mt-3 overflow-hidden flex flex-col justify-end p-2">
              {/* Ultrasonic ping waves */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-slate-600 text-[10px] font-mono flex flex-col items-center">
                <span>▼ 40kHz Ultrasonic Ping ▼</span>
              </div>

              {/* Food layer */}
              <div 
                className="w-full bg-amber-700/70 border-t-2 border-amber-500/80 rounded transition-all duration-500 flex items-center justify-center relative overflow-hidden"
                style={{ height: `${foodLevel}%` }}
              >
                <div className="text-[11px] font-mono font-medium text-amber-200">
                  {foodLevel > 15 ? `${foodLevel}% Dry Kibble` : foodLevel > 0 ? "Low Food!" : "Empty"}
                </div>
              </div>

              {/* Low food alert banner */}
              {foodLevel <= 20 && (
                <div className="absolute inset-x-2 top-10 bg-red-950/80 border border-red-700/80 p-2 rounded text-[11px] text-red-200 text-center font-medium">
                  Alert: Food level critically low ({foodLevel}%)
                </div>
              )}
            </div>

            {/* Micro Servo Gate Indicator */}
            <div className="mt-3 p-3 bg-slate-900/80 rounded border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">SG90 Servo Aperture:</span>
              </div>
              <span className="font-mono text-amber-400 tabular-nums font-semibold">{servoAngle}° ({servoAngle > 0 ? 'OPEN' : 'CLOSED'})</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={refillHopper}
              className="flex-1 py-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors font-medium text-center"
            >
              Refill Hopper
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={foodLevel}
              onChange={(e) => setFoodLevel(Number(e.target.value))}
              className="w-24 accent-sky-500 cursor-pointer"
              title="Manual ultrasonic slider"
            />
          </div>
        </div>

        {/* Right: Mobile App & Dispensing Controller */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>BLYNK MOBILE APPLICATION DASHBOARD</span>
              <span className="text-emerald-400 font-mono">ESP8266 VIRTUAL PINS</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <div className="text-[11px] text-slate-400">Total Portions Fed Today</div>
                <div className="text-xl font-bold font-mono text-white mt-1 tabular-nums">{totalPortionsFed} <span className="text-xs font-normal text-slate-400">({totalPortionsFed * 50}g)</span></div>
              </div>
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <div className="text-[11px] text-slate-400">Last Dispensed Time</div>
                <div className="text-xl font-bold font-mono text-white mt-1">{lastFedTime}</div>
              </div>
            </div>

            <button
              onClick={dispenseFood}
              disabled={isDispensing || foodLevel <= 0}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                isDispensing
                  ? 'bg-amber-600/50 text-amber-200 cursor-wait'
                  : foodLevel <= 0
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950 cursor-pointer'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{isDispensing ? 'Dispensing 50g Portion...' : 'Dispense Portion Now (V1 Command)'}</span>
            </button>
          </div>

          {/* Cloud Webhook Logs */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
            <div className="text-slate-400 mb-1 flex items-center justify-between">
              <span>Blynk Cloud Virtual Pin Stream</span>
              <span className="text-sky-400">REST API / WebSockets</span>
            </div>
            <div className="text-slate-300 bg-slate-900/60 p-2 rounded">
              {blynkLog}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. Line Follower Differential Steering Simulator
   ========================================================================= */
export const LineFollowerSimulator: React.FC = () => {
  const [trackScenario, setTrackScenario] = useState<'straight' | 'soft_left' | 'soft_right' | 'sharp_90_left' | 'sharp_90_right'>('straight');

  // Sensor array: [Far Left, Mid Left, Mid Right, Far Right]
  // 1 = High contrast (black line detected), 0 = White surface
  const getSensorStates = () => {
    switch (trackScenario) {
      case 'straight':
        return { s1: 0, s2: 1, s3: 1, s4: 0, heading: 0, desc: "On Center: Both center sensors on black line" };
      case 'soft_left':
        return { s1: 0, s2: 1, s3: 0, s4: 0, heading: -15, desc: "Drifting Left: Mid-left sensor on black line" };
      case 'soft_right':
        return { s1: 0, s2: 0, s3: 1, s4: 0, heading: 15, desc: "Drifting Right: Mid-right sensor on black line" };
      case 'sharp_90_left':
        return { s1: 1, s2: 1, s3: 0, s4: 0, heading: -45, desc: "Sharp 90° Turn Left: Far-left triggered, pivot brake" };
      case 'sharp_90_right':
        return { s1: 0, s2: 0, s3: 1, s4: 1, heading: 45, desc: "Sharp 90° Turn Right: Far-right triggered, pivot brake" };
    }
  };

  const current = getSensorStates();

  // Calculate PWM and Motor RPM outputs based on scenario
  const getMotorOutputs = () => {
    switch (trackScenario) {
      case 'straight':
        return { leftPwm: 180, rightPwm: 180, leftDir: 'FWD', rightDir: 'FWD', leftRpm: 210, rightRpm: 210 };
      case 'soft_left':
        return { leftPwm: 130, rightPwm: 220, leftDir: 'FWD', rightDir: 'FWD', leftRpm: 150, rightRpm: 260 };
      case 'soft_right':
        return { leftPwm: 220, rightPwm: 130, leftDir: 'FWD', rightDir: 'FWD', leftRpm: 260, rightRpm: 150 };
      case 'sharp_90_left':
        return { leftPwm: 220, rightPwm: 220, leftDir: 'REV', rightDir: 'FWD', leftRpm: -260, rightRpm: 260 };
      case 'sharp_90_right':
        return { leftPwm: 220, rightPwm: 220, leftDir: 'FWD', rightDir: 'REV', leftRpm: 260, rightRpm: -260 };
    }
  };

  const motors = getMotorOutputs();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-200">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400" />
          <span className="font-semibold text-sm tracking-wide text-white">Arduino Nano Differential Motor Control</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>L298N Dual H-Bridge</span>
          <span>·</span>
          <span>Dual 6V 300 RPM Motors</span>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="mb-5">
        <div className="text-xs font-medium text-slate-400 mb-2">SELECT TRACK PROFILE SIMULATION:</div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'straight', label: '01. Straight Track' },
            { id: 'soft_left', label: '02. Gentle Left Bend' },
            { id: 'soft_right', label: '03. Gentle Right Bend' },
            { id: 'sharp_90_left', label: '04. Sharp 90° Left Corner' },
            { id: 'sharp_90_right', label: '05. Sharp 90° Right Corner' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTrackScenario(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                trackScenario === tab.id
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: IR Sensor Array & Chassis Heading Graphic */}
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 mb-2">TCRT5000 INFRARED REFLECTANCE ARRAY (A0 - A3)</div>
            <div className="text-xs text-slate-300 mb-4 font-mono">{current.desc}</div>

            {/* 4 Sensor modules representation */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { name: 'FAR LEFT (A0)', val: current.s1 },
                { name: 'MID LEFT (A1)', val: current.s2 },
                { name: 'MID RIGHT (A2)', val: current.s3 },
                { name: 'FAR RIGHT (A3)', val: current.s4 },
              ].map((sensor, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded text-center border transition-all ${
                    sensor.val === 1
                      ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="text-[10px] font-mono leading-tight mb-1">{sensor.name}</div>
                  <div className="text-xs font-bold font-mono">
                    {sensor.val === 1 ? 'BLACK (1)' : 'WHITE (0)'}
                  </div>
                </div>
              ))}
            </div>

            {/* Chassis Orientation graphic */}
            <div className="p-4 bg-slate-900/60 rounded border border-slate-800 flex items-center justify-around">
              <div className="text-center">
                <div className="text-[10px] text-slate-400 font-mono mb-1">STEERING HEADING</div>
                <div className="text-lg font-bold font-mono text-white tabular-nums">
                  {current.heading > 0 ? `+${current.heading}° (Right)` : current.heading < 0 ? `${current.heading}° (Left)` : "0° (Center)"}
                </div>
              </div>
              <div 
                className="w-12 h-12 rounded-full border-2 border-amber-500 flex items-center justify-center transition-transform duration-300"
                style={{ transform: `rotate(${current.heading}deg)` }}
              >
                <ArrowRight className="w-5 h-5 text-amber-400 -rotate-90" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: L298N Dual H-Bridge & Motor Velocity Output */}
        <div className="lg:col-span-6 bg-slate-950 p-5 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
              <span>L298N DUAL H-BRIDGE OUTPUTS</span>
              <span className="text-amber-400">PWM RESOLUTION: 8-BIT</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Left Motor Card */}
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <div className="text-[11px] font-medium text-slate-400 mb-1">LEFT MOTOR (ENA / IN1 / IN2)</div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">{motors.leftRpm} <span className="text-xs font-normal text-slate-400">RPM</span></div>
                <div className="mt-2 text-[10px] font-mono text-slate-300 flex justify-between">
                  <span>PWM: {motors.leftPwm}/255</span>
                  <span className={motors.leftDir === 'REV' ? 'text-red-400 font-bold' : 'text-emerald-400'}>DIR: {motors.leftDir}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${(motors.leftPwm / 255) * 100}%` }}
                  />
                </div>
              </div>

              {/* Right Motor Card */}
              <div className="p-3 bg-slate-900 rounded border border-slate-800">
                <div className="text-[11px] font-medium text-slate-400 mb-1">RIGHT MOTOR (ENB / IN3 / IN4)</div>
                <div className="text-xl font-bold font-mono text-white tabular-nums">{motors.rightRpm} <span className="text-xs font-normal text-slate-400">RPM</span></div>
                <div className="mt-2 text-[10px] font-mono text-slate-300 flex justify-between">
                  <span>PWM: {motors.rightPwm}/255</span>
                  <span className={motors.rightDir === 'REV' ? 'text-red-400 font-bold' : 'text-emerald-400'}>DIR: {motors.rightDir}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${(motors.rightPwm / 255) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded border border-slate-800 text-[11px] font-mono text-slate-400 leading-relaxed">
              {trackScenario === 'straight' && "Full cruise speed: Symmetric PWM 180 applied to both traction wheels."}
              {trackScenario === 'soft_left' && "Proportional steering: Right motor accelerated to 220, left motor attenuated to 130."}
              {trackScenario === 'soft_right' && "Proportional steering: Left motor accelerated to 220, right motor attenuated to 130."}
              {trackScenario === 'sharp_90_left' && "Counter-phase pivot brake: Left motor set to REVERSE, spinning chassis on its axis."}
              {trackScenario === 'sharp_90_right' && "Counter-phase pivot brake: Right motor set to REVERSE, spinning chassis on its axis."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
