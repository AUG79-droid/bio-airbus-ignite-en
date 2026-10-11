import { useEffect, useMemo, useState } from "react";
import { Lightbulb, Volume2, VolumeX, MessageCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useBioLab } from "@/contexts/BioLabContext";
import { GUIDE_AVATAR_IMAGE } from "@/data/guide-avatar-image";

type Guidance = { title: string; instruction: string; tip: string };

const canvasSteps: Guidance[] = [
  { title: "01 · Define the problem",
    instruction: "In your first canvas section, explain what technical problem you need to solve, where it occurs and what you want to improve. Do not propose a solution yet.",
    tip: "Ask yourself: what happens today, which component or process is affected, and how would you measure an improvement? Write your own answer." },
  { title: "02 · Understand nature",
    instruction: "Describe your chosen natural model. What function does it perform, and which structure or behaviour makes that possible? Naming the organism is not enough.",
    tip: "Look beyond its appearance. Identify the underlying mechanism and explain why it may be relevant to your challenge." },
  { title: "03 · Extract the principle",
    instruction: "Translate the natural strategy into a technical principle. Explain what causes the observed effect and which part might be investigated in an Airbus context.",
    tip: "If you remove the organism's name, can you still explain how the idea works? If not, define the functional principle more clearly." },
  { title: "04 · Design your concept",
    instruction: "This is the key part. Describe which component or process you would change, how you would apply the natural mechanism and which aerospace constraints you must respect.",
    tip: "Connect cause and effect: change this element using this mechanism to address this problem. Consider safety, manufacturing and maintenance." },
  { title: "05 · Expected benefit",
    instruction: "State which improvement you expect if your concept works. This is a hypothesis, not a demonstrated result.",
    tip: "Choose a measurable outcome, such as mass, energy use, pressure, time or detection rate. Compare it with a baseline and discuss potential trade-offs." },
  { title: "06 · First test",
    instruction: "Finish your canvas with a testable hypothesis: what would you compare, which variable would you measure and what result would make you revise your proposal?",
    tip: "A simulation, lab test or controlled comparison is a suitable first step. Define the data that could support or reject the idea." },
];

const screenSteps: Guidance[] = [
  { title: "Welcome to the lab",
    instruction: "Welcome to the Bio-Inspired Innovation Lab. Your mission is to turn an Airbus-context challenge into an idea inspired by a natural mechanism. Select Start to begin.",
    tip: "You are not copying animals or plants. Understand how a strategy works in nature and whether its principle might be useful in engineering." },
  { title: "Briefing · How to play",
    instruction: "This screen explains the complete route, including a worked example. Learn the difference between a challenge, a natural mechanism, a design hypothesis and a validation test.",
    tip: "An expected benefit is not a proven benefit. A proposal needs a relevant mechanism and evidence from a suitable test." },
  { title: "Step 1 · Teams",
    instruction: "Create or select your team, give it a name and continue. You can play as a single team, even if you are working alone.",
    tip: "Each team's work is saved locally in this browser. If there are multiple teams, each one prepares a separate proposal." },
  { title: "Step 2 · Airbus challenge",
    instruction: "Receive or choose your Airbus-context challenge. Read the problem carefully: it will guide every later decision.",
    tip: "Identify the specific function or difficulty to improve before thinking of a solution." },
  { title: "Step 3 · Nature",
    instruction: "Explore the natural-model cards. Read what each organism does and choose one whose mechanism might help with the challenge. Then continue to Connection.",
    tip: "Choose by function, not appearance. For defect detection, a sensing mechanism may be more appropriate than one that reduces friction." },
  { title: "Step 4 · Connection",
    instruction: "Review the Airbus challenge, natural model and functional principle together. If the technical connection is weak, return to Nature. If it makes sense, open the Canvas.",
    tip: "Visual similarity is not proof of viability. Explain how the natural mechanism addresses the engineering problem and how you could test it." },
  canvasSteps[0],
  { title: "Step 6 · Pitch",
    instruction: "You have completed the six canvas sections. Give your proposal a name and prepare a summary you can present in about 60 seconds. The Review button will then become available.",
    tip: "You can create an editable draft from the six answers your team wrote. Check that it clearly covers the problem, mechanism, proposed solution and initial test." },
  { title: "Step 7 · Review",
    instruction: "With one team, review the proposal and continue to the final result. With multiple teams, compare the proposals and vote. Then open Results.",
    tip: "The most popular concept is not necessarily technically viable. Assess the mechanism, constraints and proposed validation." },
  { title: "Results · Compare",
    instruction: "You have reached the final step. Open your team's comparison to see its six answers beside a reasoned reference example for the same challenge. Identify differences and review the four learning criteria.",
    tip: "The reference is not the only possible solution and is not an approved technology. Identify missing evidence and the test that could validate your idea." },
];

export default function BioLabGuide() {
  const { currentScreen, activeTeam, guideSubstep, teams } = useBioLab();
  const [minimized, setMinimized] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState("");

  const guide = useMemo(() => {
    if (currentScreen === 6) return canvasSteps[Math.min(Math.max(guideSubstep, 0), 5)];
    const base = screenSteps[Math.min(Math.max(currentScreen, 0), screenSteps.length - 1)];
    if (currentScreen === 4 && activeTeam?.challenge && activeTeam?.organism) {
      return {...base, tip: `You chose ${activeTeam.organism.name} for ${activeTeam.challenge.title}. Check that its natural function genuinely fits the challenge. Otherwise choose another model.`};
    }
    if (currentScreen === 7 && teams.length > 1) {
      return {...base, tip: `There are ${teams.length} teams. Each must provide a title and a pitch before the group can begin the review.`};
    }
    return base;
  }, [currentScreen, guideSubstep, activeTeam?.challenge, activeTeam?.organism, teams.length]);
  const message = showTip ? guide.tip : guide.instruction;

  useEffect(() => {
    setShowTip(false);
    setSpeechError("");
    setSpeaking(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, [currentScreen, guideSubstep]);
  useEffect(() => () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const stopAudio = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const speak = () => {
    setSpeechError("");
    if (speaking) {stopAudio();return;}
    if (!("speechSynthesis" in window)) {
      setSpeechError("Voice playback is unavailable in this browser. You can read the instructions here.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-GB";
    utterance.rate = .94;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices.find(v => v.lang.toLowerCase()==="en-gb") ??
      voices.find(v => v.lang.toLowerCase().startsWith("en")) ?? null;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {setSpeaking(false); setSpeechError("Voice playback failed. You can read the guidance above.");};
    window.speechSynthesis.speak(utterance);
  };

  const toggleTip = () => {stopAudio();setSpeechError("");setShowTip(previous=>!previous);};

  return (
    <aside className={`biolab-guide ${minimized?"is-minimized":""}`} aria-label="Interactive workshop guide">
      {minimized ? (
        <button type="button" className="biolab-guide-reopen" onClick={()=>setMinimized(false)} aria-label="Open workshop guide">
          <img src={GUIDE_AVATAR_IMAGE} alt=""/>
          <span><MessageCircle size={16} aria-hidden="true"/> Workshop guide</span>
          <ChevronUp size={18} aria-hidden="true"/>
        </button>
      ) : (
        <div className="biolab-guide-card">
          <div className="biolab-guide-top">
            <div><span className="biolab-guide-eyebrow">WORKSHOP ASSISTANT</span><h2>Workshop guide</h2></div>
            <button type="button" className="biolab-guide-minimize" onClick={()=>{stopAudio();setMinimized(true);}} title="Minimise guide" aria-label="Minimise guide"><ChevronDown size={19} aria-hidden="true"/></button>
          </div>
          <div className="biolab-guide-body">
            <img src={GUIDE_AVATAR_IMAGE} alt="Bio-Inspired Innovation Lab scientist avatar" className={`biolab-guide-avatar ${speaking?"is-speaking":""}`}/>
            <div className="biolab-guide-content">
              <p className="biolab-guide-stage">{showTip?"Tip for this stage":guide.title}</p>
              <p className="biolab-guide-message" aria-live="polite">{message}</p>
            </div>
          </div>
          {speechError&&<p role="status" className="biolab-guide-error">{speechError}</p>}
          <div className="biolab-guide-actions">
            <button type="button" onClick={speak} aria-label={speaking?"Stop narration":"Listen to stage instructions"}>{speaking?<VolumeX size={17} aria-hidden="true"/>:<Volume2 size={17} aria-hidden="true"/>}{speaking?"Stop":"Listen"}</button>
            <button type="button" onClick={toggleTip} aria-pressed={showTip}>{showTip?<MessageCircle size={17} aria-hidden="true"/>:<Lightbulb size={17} aria-hidden="true"/>}{showTip?"Instructions":"Tip"}</button>
          </div>
          <p className="biolab-guide-note">Guidance updates as you progress through the game.</p>
        </div>
      )}
    </aside>
  );
}
