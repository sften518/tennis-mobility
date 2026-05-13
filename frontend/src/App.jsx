import { useState, useEffect } from "react";

const API = "https://tennis-mobility-production.up.railway.app/api/progress";
const USER_ID = "user_1"; // シンプルな固定ID。将来ログイン機能を追加する場合はここを変える

const schedule = {
  MON: {
    label: "MON",
    theme: "Thoracic & Scapular Control",
    focus: "Serve · Overhead · Forehand rotation",
    time: "~20 min",
    color: "#C8F5E0",
    dark: "#0D7A4E",
    sections: [
      {
        name: "T-SPINE ACTIVE CONTROL",
        duration: "7 min",
        items: [
          { name: "T-Spine Open the Book", sets: "3×8 ea", cue: "Pause 2s at end range. Drive rotation from mid-back, not lumbar.", tennis: true, tennisNote: "Mirrors serve wind-up & backhand pull" },
          { name: "Deep Squat w/ Rotation", sets: "3×6 ea", cue: "Actively reach the rotating arm to ceiling. Hold 2s.", tennis: true, tennisNote: "Low-ball forehand + torso dissociation" },
          { name: "T-Spine Windmills", sets: "2×8 ea", cue: "Stack hips. Control the descent — no flopping.", tennis: false },
        ],
      },
      {
        name: "SCAPULAR CONTROL",
        duration: "7 min",
        items: [
          { name: "Blackburn I, Y, T, W", sets: "2×8 ea position", cue: "Initiate from scapula, not traps. Full retraction & depression at top.", tennis: true, tennisNote: "Rotator cuff stability for serves & volleys" },
          { name: "Foam Roller Reach Through", sets: "3×8 ea", cue: "Active protraction at end range. Feel the serratus engage.", tennis: true, tennisNote: "Scapular upward rotation = overhead range" },
          { name: "PVC/Band Dislocates", sets: "3×10", cue: "Slow & controlled. Narrow grip only as far as you can maintain tension.", tennis: true, tennisNote: "Shoulder active ROM for serve motion" },
        ],
      },
      {
        name: "ACTIVE INTEGRATION",
        duration: "6 min",
        items: [
          { name: "Plank Reach & Rotate", sets: "3×8 ea", cue: "Rotate thorax, not hips. Lock the pillar.", tennis: true, tennisNote: "Trunk dissociation under load" },
          { name: "Bird Dogs", sets: "2×10 ea", cue: "3s hold at full extension. Contralateral arm–leg = tennis kinetic chain.", tennis: true, tennisNote: "Arm–leg coordination = groundstroke pattern" },
        ],
      },
    ],
  },
  TUE: {
    label: "TUE",
    theme: "Hip Active Range & Control",
    focus: "Footwork · Low balls · Split step loading",
    time: "~20 min",
    color: "#FFF0D4",
    dark: "#B35C00",
    sections: [
      {
        name: "HIP CARs & END-RANGE LOADING",
        duration: "8 min",
        items: [
          { name: "Hip CARs", sets: "3×5 ea", cue: "Full circumduction under tension. Brace core — isolate the joint.", tennis: true, tennisNote: "Maintains full hip ROM for wide balls" },
          { name: "Hip Airplane", sets: "3×6 ea", cue: "Controlled descent to end range. 2s hold. Drive back with glute, not momentum.", tennis: true, tennisNote: "Single-leg stability = consistent groundstroke base" },
          { name: "90/90 Internal Rotation", sets: "3×6 ea", cue: "Active floor press with back shin. No collapse. Build load at IR end range.", tennis: true, tennisNote: "IR restriction kills hip drive in forehand" },
        ],
      },
      {
        name: "HIP STRENGTH IN RANGE",
        duration: "7 min",
        items: [
          { name: "Cossack Squats", sets: "3×6 ea", cue: "Pause at bottom. Active dorsiflexion on straight leg. Control return.", tennis: true, tennisNote: "Lateral lunge = wide forehand recovery" },
          { name: "Mini Band Fire Hydrants", sets: "2×8 ea", cue: "Slow arc. Resist internal rotation at top. Feel glute med fully engage.", tennis: false },
          { name: "Kneeling Lateral Leg Lifts", sets: "2×8 ea", cue: "Keep pelvis level. Lift from hip abductors, not waist hike.", tennis: false },
        ],
      },
      {
        name: "ACTIVE INTEGRATION",
        duration: "5 min",
        items: [
          { name: "Single Leg RDLs", sets: "3×6 ea", cue: "Hinge to hamstring tension. Pause. Drive through heel — own the position.", tennis: true, tennisNote: "Hip hinge under load = approach shot balance" },
          { name: "Seated Leg Lifts Over KB", sets: "2×6 ea", cue: "Lift from hip flexor. Hold 3s. Avoid leaning back to compensate.", tennis: false },
        ],
      },
    ],
  },
  WED: {
    label: "WED",
    theme: "Ankle Mobility & Posterior Chain",
    focus: "Split step · Direction change · Court coverage",
    time: "~20 min",
    color: "#E8F0FF",
    dark: "#2B4CC8",
    sections: [
      {
        name: "ANKLE ACTIVE CONTROL",
        duration: "8 min",
        items: [
          { name: "Single-Leg Calf Raises (slow)", sets: "3×10 ea", cue: "3s up, 3s down. Full plantarflexion at top. Full dorsiflexion at bottom.", tennis: true, tennisNote: "Absorbs split-step landing force" },
          { name: "Split Stance Soleus Raises", sets: "3×10 ea", cue: "Knee tracks over 3rd toe. Load into dorsiflexion end range — don't bounce.", tennis: true, tennisNote: "Soleus = primary Achilles load. Critical for tennis players." },
          { name: "Tib Raises", sets: "3×15", cue: "Full dorsiflexion — pause at top. Control eccentric phase.", tennis: true, tennisNote: "Anterior compartment control for quick stops" },
        ],
      },
      {
        name: "POSTERIOR CHAIN ACTIVE RANGE",
        duration: "7 min",
        items: [
          { name: "PVC 3-Point Hinge", sets: "3×10", cue: "PVC contacts head, thoracic, sacrum throughout. Own the neutral spine.", tennis: true, tennisNote: "Athletic ready position = this hinge pattern" },
          { name: "Inch Worms", sets: "3×5", cue: "Walk out to full plank. Pause. Actively press floor away. Walk back slow.", tennis: false },
          { name: "Single-Leg Step Downs", sets: "2×6 ea", cue: "Tap the heel, don't load. Control knee tracking. Eccentric focus.", tennis: true, tennisNote: "Deceleration control = injury prevention" },
        ],
      },
      {
        name: "ACTIVE INTEGRATION",
        duration: "5 min",
        items: [
          { name: "Front Foot Elevated Split Squats", sets: "3×8 ea", cue: "Knee forward over toe — load ankle end range intentionally. Slow down phase.", tennis: true, tennisNote: "Open-stance forehand = this dorsiflexion demand" },
          { name: "Deep Squat Plate Rocks", sets: "2×6 ea", cue: "Rock weight onto toes — drive ankle mobility actively. Stay in squat.", tennis: false },
        ],
      },
    ],
  },
  THU: {
    label: "THU",
    theme: "Thoracic Rotation & Posterior Chain",
    focus: "Backhand · Slice · Two-handed drive",
    time: "~20 min",
    color: "#FFE8E8",
    dark: "#A0182A",
    sections: [
      {
        name: "T-SPINE LOADED ROTATION",
        duration: "7 min",
        items: [
          { name: "Elbow to Elbow", sets: "3×8 ea", cue: "Driving elbow reaches floor at end range. No lumbar compensation.", tennis: true, tennisNote: "Backhand pull-through motion" },
          { name: "Spiderman w/ Rotation", sets: "3×8 ea", cue: "Press hips to floor, then rotate thorax maximally. Pause 2s at top.", tennis: false },
          { name: "Scorpions", sets: "2×12 total", cue: "Reach foot actively across body. Control — don't drop. Feel thoracic load.", tennis: false },
        ],
      },
      {
        name: "POSTERIOR CHAIN STRENGTH IN RANGE",
        duration: "8 min",
        items: [
          { name: "Good Mornings", sets: "3×10", cue: "Hinge to hamstring tension, pause. Drive hips forward — glute-initiated.", tennis: false },
          { name: "½ Kneeling Hamstring Extension on Wall", sets: "3×8 ea", cue: "Active knee extension against wall. Load the hamstring at end range.", tennis: true, tennisNote: "Hamstring flexibility under active control" },
          { name: "Hip Bridges w/ Pause", sets: "3×10", cue: "Full hip extension at top — 3s hold. Drive knees out. No ribflare.", tennis: false },
        ],
      },
      {
        name: "ACTIVE INTEGRATION",
        duration: "5 min",
        items: [
          { name: "Side Plank w/ Hip Abduction", sets: "2×8 ea", cue: "Lift top leg to end range. Hold 2s. Control descent. Hips stacked.", tennis: true, tennisNote: "Lateral stability = backhand groundstroke base" },
          { name: "Deadbugs", sets: "2×10 ea", cue: "Lower back pressed to floor throughout. Slow arm–leg extension. Full reach.", tennis: true, tennisNote: "Anti-extension core = racket acceleration control" },
        ],
      },
    ],
  },
  FRI: {
    label: "FRI",
    theme: "Full-Body Integration & Neural Prep",
    focus: "Whole-system readiness for weekend play",
    time: "~20 min",
    color: "#EDF5F0",
    dark: "#1A5C3A",
    sections: [
      {
        name: "JOINT CARs CIRCUIT",
        duration: "6 min",
        items: [
          { name: "Hip CARs", sets: "2×4 ea", cue: "Full circumduction. Maximum tension throughout. Brace core hard.", tennis: true, tennisNote: "Reassess hip range after the week" },
          { name: "Shoulder CARs", sets: "2×4 ea", cue: "Full circumduction. Pack the shoulder. No compensation at trunk.", tennis: true, tennisNote: "Serving shoulder ROM check" },
          { name: "T-Spine Rotations on Wall", sets: "2×5 ea", cue: "Hips locked against wall. Rotate only above. Active reach at end range.", tennis: true, tennisNote: "Isolates thoracic — no lumbar cheating" },
        ],
      },
      {
        name: "TENNIS PATTERN LOADING",
        duration: "8 min",
        items: [
          { name: "✦ Rotational Med Ball Wall Slams", sets: "3×6 ea", cue: "Load hips, rotate thorax, accelerate arm. Catch & control eccentrically.", tennis: true, tennisNote: "Full kinetic chain activation — serve & groundstroke" },
          { name: "✦ Split-Step → Lateral Bound", sets: "3×5 ea", cue: "Land soft, absorb, explode laterally. Stick landing 2s. Reset.", tennis: true, tennisNote: "Trains the reactive mobility pattern specific to court movement" },
          { name: "Hip Airplane", sets: "2×5 ea", cue: "Full end-range hold 3s. This is strength — not a balance drill.", tennis: true, tennisNote: "Final glute/hip check for the week" },
        ],
      },
      {
        name: "ACTIVE INTEGRATION",
        duration: "6 min",
        items: [
          { name: "Cossack Squats", sets: "2×6 ea", cue: "Full depth, controlled. Pause at bottom. Own it.", tennis: true, tennisNote: "Wide footwork range of motion" },
          { name: "PVC/Band Overhead Squats", sets: "2×8", cue: "Overhead position demands everything: ankles, hips, thorax, shoulders.", tennis: true, tennisNote: "Integrated overhead mobility — serve position test" },
          { name: "Plank Reach & Rotate", sets: "2×6 ea", cue: "Lock hips. Reach and rotate thorax only. Slow and deliberate.", tennis: false },
        ],
      },
    ],
  },
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI"];
const DAY_MAP = { 1: "MON", 2: "TUE", 3: "WED", 4: "THU", 5: "FRI" };
function getTodayKey() {
  return DAY_MAP[new Date().getDay()] || null;
}

export default function TennisMobility() {
  const todayKey = getTodayKey();
  const [activeDay, setActiveDay] = useState(todayKey || "MON");
  const [checked, setChecked] = useState({});
  const [week, setWeek] = useState(1);
  const [history, setHistory] = useState([]);
  const [celebrating, setCelebrating] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // ── Load from MySQL API on mount ──
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/${USER_ID}`);
        const data = await res.json();
        setChecked(data.checked || {});
        setWeek(data.week || 1);
        setHistory(data.history || []);
      } catch (e) {
        console.error("Load error:", e);
      }
      setLoaded(true);
    }
    load();
  }, []);

  // ── Save to MySQL API whenever checked changes ──
  useEffect(() => {
    if (!loaded) return;
    async function save() {
      try {
        await fetch(`${API}/${USER_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ week, checked }),
        });
      } catch (e) {
        console.error("Save error:", e);
      }
    }
    save();
  }, [checked, loaded]);

  const toggle = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }));

  // ── Check if all 5 days complete → celebrate & reset ──
  useEffect(() => {
    if (!loaded) return;
    const allComplete = DAYS.every((d) => {
      const s = schedule[d];
      const items = s.sections.flatMap((sec, si) => sec.items.map((_, ii) => `${d}-${si}-${ii}`));
      return items.every((k) => checked[k]);
    });
    if (allComplete && Object.keys(checked).length > 0) {
      setCelebrating(true);
      setTimeout(async () => {
        try {
          const res = await fetch(`${API}/${USER_ID}/complete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ week }),
          });
          const data = await res.json();
          // Reload fresh state from server
          const fresh = await fetch(`${API}/${USER_ID}`);
          const freshData = await fresh.json();
          setChecked(freshData.checked || {});
          setWeek(freshData.week || data.nextWeek);
          setHistory(freshData.history || []);
        } catch (e) {
          console.error("Complete error:", e);
        }
        setActiveDay(todayKey || "MON");
        setCelebrating(false);
      }, 2800);
    }
  }, [checked, loaded]);

  const day = schedule[activeDay];
  const accentOf = (dark) =>
    dark === "#0D7A4E" ? "#3EC98A" :
    dark === "#B35C00" ? "#F5A840" :
    dark === "#2B4CC8" ? "#7B9EFF" :
    dark === "#A0182A" ? "#F07080" : "#5FCF90";
  const accent = accentOf(day.dark);

  const allItems = day.sections.flatMap((s, si) => s.items.map((_, ii) => `${activeDay}-${si}-${ii}`));
  const doneCount = allItems.filter((k) => checked[k]).length;
  const pct = allItems.length ? Math.round((doneCount / allItems.length) * 100) : 0;

  const totalAllItems = DAYS.flatMap((d) =>
    schedule[d].sections.flatMap((s, si) => s.items.map((_, ii) => `${d}-${si}-${ii}`))
  );
  const totalDone = totalAllItems.filter((k) => checked[k]).length;
  const weekPct = Math.round((totalDone / totalAllItems.length) * 100);

  if (!loaded) return (
    <div style={{ background: "#0C0C0C", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#333", fontFamily: "monospace", letterSpacing: 2, fontSize: 11 }}>
      LOADING...
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Mono', 'Courier New', monospace", background: "#0C0C0C", minHeight: "100vh", color: "#E8E8E0", maxWidth: 680, margin: "0 auto", padding: "0 0 40px", position: "relative" }}>

      {/* Celebration overlay */}
      {celebrating && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 100, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ fontSize: 52 }}>🎾</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>Week {week} Complete</div>
          <div style={{ fontSize: 12, color: "#555", letterSpacing: 2 }}>SAVING & RESETTING FOR WEEK {week + 1}...</div>
          <div style={{ marginTop: 12, width: 160, height: 2, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: "100%", height: "100%", background: "#3EC98A", animation: "grow 2.6s linear forwards" }} />
          </div>
          <style>{`@keyframes grow { from { width: 0% } to { width: 100% } }`}</style>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: "24px 20px 18px", borderBottom: "1px solid #1a1a1a" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: "#444", marginBottom: 5 }}>TENNIS MOBILITY PROGRAM</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#E8E8E0", letterSpacing: -0.5 }}>Active Range · Neural Control</div>
            <div style={{ fontSize: 10, color: "#383838", marginTop: 3, letterSpacing: 1 }}>CONTROLLED END-RANGE LOADING · 20 MIN/DAY</div>
          </div>
          <div style={{ flexShrink: 0, background: "#111", border: "1px solid #222", borderRadius: 10, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, marginBottom: 2 }}>WEEK</div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#E8E8E0", lineHeight: 1 }}>{week}</div>
          </div>
        </div>

        {todayKey && (
          <div style={{ marginTop: 14, padding: "8px 12px", background: "#111", borderRadius: 8, border: `1px solid ${accentOf(schedule[todayKey].dark)}22`, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: accentOf(schedule[todayKey].dark), flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: "#555", letterSpacing: 1 }}>TODAY —</span>
            <span style={{ fontSize: 11, color: accentOf(schedule[todayKey].dark), fontWeight: 700, letterSpacing: 0.5 }}>{schedule[todayKey].theme}</span>
            {activeDay !== todayKey && (
              <button onClick={() => setActiveDay(todayKey)} style={{ marginLeft: "auto", fontSize: 9, color: "#555", background: "transparent", border: "1px solid #2a2a2a", borderRadius: 4, padding: "2px 8px", cursor: "pointer", letterSpacing: 1 }}>GO →</button>
            )}
          </div>
        )}
        {!todayKey && (
          <div style={{ marginTop: 14, padding: "8px 12px", background: "#111", borderRadius: 8, fontSize: 11, color: "#444", letterSpacing: 1 }}>
            REST DAY — See you Monday 🎾
          </div>
        )}

        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 9, color: "#383838", letterSpacing: 1, minWidth: 60 }}>WEEK {weekPct}%</div>
          <div style={{ flex: 1, height: 2, background: "#151515", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${weekPct}%`, height: "100%", background: "#2a2a2a", borderRadius: 2, transition: "width 0.3s ease" }} />
          </div>
          <div style={{ fontSize: 9, color: "#2a2a2a", letterSpacing: 1 }}>{totalDone}/{totalAllItems.length}</div>
        </div>
      </div>

      {/* Day Tabs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderBottom: "1px solid #1a1a1a" }}>
        {DAYS.map((d) => {
          const isActive = activeDay === d;
          const isToday = d === todayKey;
          const s = schedule[d];
          const items = s.sections.flatMap((sec, si) => sec.items.map((_, ii) => `${d}-${si}-${ii}`));
          const done = items.filter((k) => checked[k]).length;
          const p = items.length ? Math.round((done / items.length) * 100) : 0;
          const dayDone = p === 100;
          return (
            <button key={d} onClick={() => setActiveDay(d)} style={{ background: isActive ? s.dark : "transparent", border: "none", borderRight: "1px solid #151515", padding: "13px 0 11px", cursor: "pointer", color: isActive ? "#fff" : dayDone ? accentOf(s.dark) : "#444", transition: "all 0.15s", position: "relative" }}>
              {isToday && !isActive && (<div style={{ position: "absolute", top: 5, right: "50%", transform: "translateX(8px)", width: 4, height: 4, borderRadius: "50%", background: accentOf(s.dark) }} />)}
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{d}</div>
              <div style={{ fontSize: 9, marginTop: 3, color: isActive ? "rgba(255,255,255,0.6)" : dayDone ? accentOf(s.dark) : "#2a2a2a", letterSpacing: 0.5 }}>{dayDone ? "✓" : p > 0 ? `${p}%` : "·"}</div>
            </button>
          );
        })}
      </div>

      {/* Day Hero */}
      <div style={{ background: day.dark, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{day.time} · {day.label}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>{day.theme}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 3, letterSpacing: 0.3 }}>{day.focus}</div>
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: "#fff", borderRadius: 2, transition: "width 0.3s ease" }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", minWidth: 36 }}>{pct}%</div>
        </div>
      </div>

      {/* Exercises */}
      <div style={{ padding: "0 16px" }}>
        {day.sections.map((section, si) => (
          <div key={si} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${day.dark}33` }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: accent }}>{section.name}</span>
              <span style={{ fontSize: 10, color: "#333", letterSpacing: 1 }}>{section.duration}</span>
            </div>
            {section.items.map((item, ii) => {
              const key = `${activeDay}-${si}-${ii}`;
              const done = !!checked[key];
              return (
                <div key={ii} onClick={() => toggle(key)} style={{ display: "grid", gridTemplateColumns: "20px 1fr", gap: 12, padding: "11px 10px", marginBottom: 4, borderRadius: 8, cursor: "pointer", background: done ? "#111" : "transparent", border: "1px solid", borderColor: done ? "#1e1e1e" : "transparent", transition: "all 0.15s" }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, marginTop: 2, flexShrink: 0, border: `1.5px solid ${done ? accent : "#2a2a2a"}`, background: done ? accent : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                    {done && <span style={{ color: "#000", fontSize: 10, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: done ? "#333" : "#D0D0C8", textDecoration: done ? "line-through" : "none", letterSpacing: -0.2 }}>{item.name}</span>
                      <span style={{ fontSize: 10, color: accent, fontWeight: 700, opacity: done ? 0.3 : 1 }}>{item.sets}</span>
                      {item.tennis && (<span style={{ fontSize: 9, background: "#161616", color: accent, padding: "2px 6px", borderRadius: 4, border: `1px solid ${accent}25`, opacity: done ? 0.3 : 1 }}>TENNIS</span>)}
                    </div>
                    <div style={{ fontSize: 11, color: "#444", marginTop: 4, lineHeight: 1.5, fontStyle: "italic" }}>{item.cue}</div>
                    {item.tennis && item.tennisNote && !done && (<div style={{ fontSize: 10, color: accent, opacity: 0.5, marginTop: 3 }}>↳ {item.tennisNote}</div>)}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div style={{ margin: "28px 16px 0", padding: "16px", background: "#0e0e0e", borderRadius: 10, border: "1px solid #1a1a1a" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#383838", marginBottom: 12 }}>COMPLETED WEEKS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {history.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: "#3EC98A" }}>✓</span>
                  <span style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>Week {h.week}</span>
                </div>
                <span style={{ fontSize: 10, color: "#333", letterSpacing: 0.5 }}>{h.completedDate}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid #1a1a1a", fontSize: 10, color: "#2a2a2a", letterSpacing: 1 }}>
            {history.length} WEEK{history.length > 1 ? "S" : ""} COMPLETED
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ margin: "16px 16px 0", padding: "14px 16px", background: "#0a0a0a", borderRadius: 8, borderLeft: `2px solid ${day.dark}`, fontSize: 11, color: "#333", lineHeight: 1.6 }}>
        <span style={{ color: "#555", display: "block", marginBottom: 4, fontWeight: 700, letterSpacing: 1 }}>MOBILITY PRINCIPLE</span>
        Every rep should feel like effort at end range. If you can do it mindlessly, you're not working the mobility — you're just moving through it.
      </div>
    </div>
  );
}
