import { useState, useEffect, useCallback } from "react";

// ── Password Gate ─────────────────────────────────────────────────────────────
const CORRECT_PASSWORD = "Adilam568";
const AUTH_KEY = "mama_os_auth";

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (input === CORRECT_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{ minHeight:"100vh", background:"#f4f7f4", display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", fontFamily:"'Nunito',system-ui,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        ::placeholder { color: #9ab89a !important; }
      `}</style>
      <div style={{ animation:"fadeIn 0.5s ease", background:"#ffffff", borderRadius:24, padding:"40px 32px", width:"100%", maxWidth:380, textAlign:"center", boxShadow:"0 8px 40px rgba(122,170,122,0.15)", border:"1px solid #ddeedd" }}>
        <div style={{ fontSize:56, marginBottom:16 }}>🌿</div>
        <div style={{ fontFamily:"Nunito", fontSize:22, fontWeight:800, color:"#2d4a2d", marginBottom:6 }}>Mon Dashboard</div>
        <div style={{ fontFamily:"Nunito", fontSize:13, color:"#6a8a6a", marginBottom:32 }}>Entrez votre mot de passe pour continuer</div>
        <div style={{ animation: shake ? "shake 0.4s ease" : "none" }}>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && attempt()}
            placeholder="Mot de passe"
            autoFocus
            style={{ width:"100%", background:"#f4f7f4", border:`1.5px solid ${error?"#e07070":"#ddeedd"}`, color:"#2d4a2d", fontFamily:"Nunito", fontSize:16, padding:"14px 18px", borderRadius:14, outline:"none", marginBottom:12, textAlign:"center", letterSpacing:4, transition:"border 0.15s" }}
          />
          {error && <div style={{ fontFamily:"Nunito", fontSize:12, color:"#e07070", marginBottom:12, fontWeight:700 }}>Mot de passe incorrect ❌</div>}
          <button onClick={attempt} style={{ width:"100%", background:"#7aaa7a", color:"#fff", border:"none", borderRadius:14, padding:"14px", fontFamily:"Nunito", fontSize:15, fontWeight:800, cursor:"pointer", transition:"background 0.15s" }}
            onMouseEnter={e=>e.target.style.background="#4e8a4e"}
            onMouseLeave={e=>e.target.style.background="#7aaa7a"}>
            Entrer ✨
          </button>
        </div>
        <div style={{ fontFamily:"Nunito", fontSize:11, color:"#9ab89a", marginTop:24 }}>Votre espace personnel 🌱</div>
      </div>
    </div>
  );
}


const SK = "mama_os_v1";
const TODAY = new Date().toISOString().split("T")[0];

const C = {
  bg:        "#f4f7f4",
  surface:   "#ffffff",
  card:      "#ffffff",
  border:    "#ddeedd",
  borderHi:  "#a8cba8",
  sage:      "#7aaa7a",
  sageDark:  "#4e8a4e",
  sageLight: "#e8f4e8",
  mint:      "#b8e0c8",
  mintLight: "#e0f5ec",
  green:     "#4e8a4e",
  red:       "#e07070",
  gold:      "#c49a3c",
  purple:    "#9a7ab8",
  blue:      "#6a9ab8",
  text:      "#2d4a2d",
  textDim:   "#6a8a6a",
  textMut:   "#9ab89a",
  white:     "#ffffff",
};

const F  = "'Nunito','Quicksand',system-ui,sans-serif";
const FB = "'Nunito',system-ui,sans-serif";

function DEF() {
  return {
    prayers: { logs: {} },
    quran: { logs: {} },
    fitness: { logs: [], sleepLogs: [], targetSleep:"22:30", targetWake:"06:00" },
    diet: { logs: [], waterLogs: {} },
    weight: { entries: [], goal: "", start: "" },
    learning: { books: [], videos: [], monthlyGoal: 4 },
    routine: {
      morning: [
        {id:1,label:"Fajr 🕌",done:false},{id:2,label:"Se lever",done:false},
        {id:3,label:"Boire de l'eau 💧",done:false},{id:4,label:"Étirements 🧘",done:false},
        {id:5,label:"Petit-déjeuner sain 🥗",done:false},{id:6,label:"Lire / Écouter 📚",done:false},
      ],
      evening: [
        {id:7,label:"Dîner léger 🥗",done:false},{id:8,label:"30 min de marche 🚶",done:false},
        {id:9,label:"Pas d'écran après 21h 📵",done:false},{id:10,label:"Lire 20 min 📖",done:false},
        {id:11,label:"Isha 🕌",done:false},{id:12,label:"Dormir à l'heure 😴",done:false},
      ],
    },
    goals: [],
    finance: {
      income: "", budget: [],
      expenses: [], savingsGoals: [], debts: [],
    },
    wellbeing: { moods: {}, gratitude: {} },
    weeklyReviews: [],
    streakData: {},
  };
}

function load() {
  try {
    const r = localStorage.getItem(SK);
    if (!r) return DEF();
    const p = JSON.parse(r);
    const d = DEF();
    return {
      ...d, ...p,
      routine: { morning: p.routine?.morning||d.routine.morning, evening: p.routine?.evening||d.routine.evening },
      fitness: { ...d.fitness, ...p.fitness },
      finance: { ...d.finance, ...p.finance },
    };
  } catch { return DEF(); }
}
function persist(d) { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} }

// ── Prayer calc ───────────────────────────────────────────────────────────────
function calcPrayers(lat, lng) {
  const d = new Date();
  const rad = Math.PI/180;
  const n = Math.floor((d - new Date(d.getFullYear(),0,0))/86400000);
  const B = (360/365)*(n-81)*rad;
  const EoT = 9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B);
  const TC = 4*(lng-(Math.floor(lng/15)*15))+EoT;
  const LST_noon = 12 - TC/60;
  const decl = 23.45*Math.sin(B)*rad;
  const HA = h => Math.acos((Math.sin(h*rad)-Math.sin(lat*rad)*Math.sin(decl))/(Math.cos(lat*rad)*Math.cos(decl)))/rad/15;
  const fmt = t => { const h=Math.floor(t),m=Math.round((t-h)*60); return `${h.toString().padStart(2,"0")}:${m.toString().padStart(2,"0")}`; };
  return {
    Fajr:    fmt(LST_noon - HA(-18)),
    Sunrise: fmt(LST_noon - HA(-0.833)),
    Dhuhr:   fmt(LST_noon),
    Asr:     fmt(LST_noon + HA(Math.atan(1/(1+Math.tan(Math.abs(lat*rad-decl))))/rad)),
    Maghrib: fmt(LST_noon + HA(-0.833)),
    Isha:    fmt(LST_noon + HA(-17)),
  };
}

// ── Streak ────────────────────────────────────────────────────────────────────
function calcStreak(data) {
  if (!data) return 0;
  const dates = Object.keys(data).filter(d=>data[d]).sort((a,b)=>b.localeCompare(a));
  if (!dates.length) return 0;
  let s=0, cur=new Date(TODAY);
  for (const d of dates) {
    const diff = Math.round((cur-new Date(d))/86400000);
    if (diff<=1){s++;cur=new Date(d);}else break;
  }
  return s;
}

// ── Primitives ────────────────────────────────────────────────────────────────
function Card({children,style={},onClick}){
  return <div onClick={onClick} style={{background:C.card,borderRadius:16,border:`1px solid ${C.border}`,boxShadow:"0 2px 12px rgba(78,138,78,0.06)",padding:"18px 16px",...style}}>{children}</div>;
}
function SectionTitle({children,icon,style={}}){
  return <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,...style}}>
    <span style={{fontSize:20}}>{icon}</span>
    <span style={{fontFamily:FB,fontSize:18,fontWeight:800,color:C.text,letterSpacing:"-0.02em"}}>{children}</span>
  </div>;
}
function Label({children,style={}}){
  return <div style={{fontFamily:FB,fontSize:11,fontWeight:700,color:C.textDim,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:6,...style}}>{children}</div>;
}
function PBar({pct,color,h=8,radius=8}){
  return <div style={{height:h,background:C.sageLight,borderRadius:radius,overflow:"hidden"}}>
    <div style={{height:"100%",width:`${Math.min(100,Math.max(0,pct))}%`,background:color||C.sage,borderRadius:radius,transition:"width 0.5s ease"}}/>
  </div>;
}
function Chip({children,color,bg,style={}}){
  return <span style={{display:"inline-flex",alignItems:"center",padding:"4px 12px",borderRadius:20,background:bg||C.sageLight,color:color||C.sage,fontFamily:FB,fontSize:11,fontWeight:700,...style}}>{children}</span>;
}
function Btn({children,onClick,variant="primary",style={}}){
  const v={
    primary:{background:C.sage,color:"#fff",border:"none"},
    soft:{background:C.sageLight,color:C.sageDark,border:`1px solid ${C.mint}`},
    ghost:{background:"transparent",color:C.sageDark,border:`1px solid ${C.border}`},
    danger:{background:"#fef2f2",color:C.red,border:`1px solid #fecaca`},
  };
  return <button onClick={onClick} style={{fontFamily:FB,fontSize:13,fontWeight:700,borderRadius:12,padding:"10px 20px",cursor:"pointer",transition:"all 0.15s",display:"inline-flex",alignItems:"center",gap:6,...v[variant],...style}}>{children}</button>;
}
function Inp({value,onChange,placeholder,type="text",style={},onKeyDown}){
  const [f,setF]=useState(false);
  return <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} type={type} onKeyDown={onKeyDown}
    onFocus={()=>setF(true)} onBlur={()=>setF(false)}
    style={{fontFamily:FB,fontSize:14,padding:"11px 14px",borderRadius:12,border:`1.5px solid ${f?C.sage:C.border}`,background:C.surface,color:C.text,outline:"none",width:"100%",transition:"border 0.15s",...style}}/>;
}
function Sel({value,onChange,options,style={}}){
  return <select value={value} onChange={e=>onChange(e.target.value)} style={{fontFamily:FB,fontSize:14,padding:"11px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,outline:"none",width:"100%",...style}}>
    {options.map(o=><option key={o.v||o} value={o.v||o}>{o.l||o}</option>)}
  </select>;
}
function Check({done,onClick,size=22}){
  return <div onClick={onClick} style={{width:size,height:size,borderRadius:6,border:`2px solid ${done?C.sage:C.border}`,background:done?C.sage:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
    {done&&<svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
  </div>;
}

// ── Bottom Nav ────────────────────────────────────────────────────────────────
const TABS = [
  {id:"accueil",    icon:"🏠", label:"Accueil"},
  {id:"prieres",    icon:"🕌", label:"Prières"},
  {id:"fitness",    icon:"💪", label:"Fitness"},
  {id:"alimentation",icon:"🥗",label:"Repas"},
  {id:"poids",      icon:"⚖️", label:"Poids"},
  {id:"apprendre",  icon:"📚", label:"Apprendre"},
  {id:"routine",    icon:"✅", label:"Routine"},
  {id:"objectifs",  icon:"🎯", label:"Objectifs"},
  {id:"finances",   icon:"💰", label:"Finances"},
  {id:"bienetre",   icon:"🌸", label:"Bien-être"},
  {id:"semaine",    icon:"📝", label:"Semaine"},
];

function BottomNav({tab,setTab}){
  const visible = TABS.slice(0,5);
  const [showMore,setShowMore]=useState(false);
  return (
    <>
      {showMore&&(
        <div style={{position:"fixed",bottom:70,left:0,right:0,background:C.white,borderTop:`1px solid ${C.border}`,borderRadius:"20px 20px 0 0",padding:"16px 8px 8px",zIndex:200,boxShadow:"0 -8px 32px rgba(78,138,78,0.12)"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>
            {TABS.slice(5).map(t=>(
              <div key={t.id} onClick={()=>{setTab(t.id);setShowMore(false);}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 4px",borderRadius:12,background:tab===t.id?C.sageLight:"transparent",cursor:"pointer"}}>
                <span style={{fontSize:22,marginBottom:2}}>{t.icon}</span>
                <span style={{fontFamily:FB,fontSize:10,fontWeight:700,color:tab===t.id?C.sageDark:C.textDim}}>{t.label}</span>
              </div>
            ))}
          </div>
          <div onClick={()=>setShowMore(false)} style={{textAlign:"center",marginTop:8,fontFamily:FB,fontSize:12,color:C.textMut,cursor:"pointer"}}>Fermer ▼</div>
        </div>
      )}
      <nav style={{position:"fixed",bottom:0,left:0,right:0,background:C.white,borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-around",alignItems:"center",height:64,zIndex:100,boxShadow:"0 -4px 20px rgba(78,138,78,0.08)"}}>
        {visible.map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 12px",borderRadius:12,background:tab===t.id?C.sageLight:"transparent",cursor:"pointer",flex:1,transition:"all 0.15s"}}>
            <span style={{fontSize:20,marginBottom:1}}>{t.icon}</span>
            <span style={{fontFamily:FB,fontSize:9,fontWeight:700,color:tab===t.id?C.sageDark:C.textMut,whiteSpace:"nowrap"}}>{t.label}</span>
          </div>
        ))}
        <div onClick={()=>setShowMore(s=>!s)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 12px",cursor:"pointer",flex:1}}>
          <span style={{fontSize:20,marginBottom:1}}>⋯</span>
          <span style={{fontFamily:FB,fontSize:9,fontWeight:700,color:C.textMut}}>Plus</span>
        </div>
      </nav>
    </>
  );
}

// ── Accueil ───────────────────────────────────────────────────────────────────
function Accueil({data}){
  const prayers=["Fajr","Dhuhr","Asr","Maghrib","Isha"];
  const todayPrayers=data.prayers.logs[TODAY]||{};
  const prayersDone=prayers.filter(p=>todayPrayers[p]).length;
  const allRoutine=[...data.routine.morning,...data.routine.evening];
  const routineDone=allRoutine.filter(r=>r.done).length;
  const streak=calcStreak(data.streakData);
  const todayMoods=data.wellbeing.moods[TODAY];
  const lastWeight=data.weight.entries.length?data.weight.entries[data.weight.entries.length-1].weight:null;
  const goalWeight=data.weight.goal;
  const greeting=new Date().getHours()<12?"Bonjour":new Date().getHours()<18?"Bon après-midi":"Bonsoir";

  return (
    <div style={{padding:"20px 16px 80px"}}>
      {/* Header */}
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:FB,fontSize:13,color:C.textDim,marginBottom:4}}>{new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}</div>
        <div style={{fontFamily:FB,fontSize:24,fontWeight:800,color:C.text}}>{greeting} 🌿</div>
        <div style={{fontFamily:FB,fontSize:14,color:C.textDim,marginTop:4}}>Comment allez-vous aujourd'hui ?</div>
      </div>

      {/* Streak */}
      {streak>0&&<Card style={{background:`linear-gradient(135deg,${C.sage},${C.sageDark})`,marginBottom:14,border:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:32}}>🔥</span>
          <div><div style={{fontFamily:FB,fontSize:20,fontWeight:800,color:"#fff"}}>{streak} jours consécutifs</div><div style={{fontFamily:FB,fontSize:13,color:"rgba(255,255,255,0.8)"}}>Continuez comme ça !</div></div>
        </div>
      </Card>}

      {/* Quick stats */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
        <Card style={{padding:"14px"}}>
          <div style={{fontSize:24,marginBottom:4}}>🕌</div>
          <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.text}}>{prayersDone}/5</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>Prières aujourd'hui</div>
          <div style={{marginTop:8}}><PBar pct={prayersDone/5*100}/></div>
        </Card>
        <Card style={{padding:"14px"}}>
          <div style={{fontSize:24,marginBottom:4}}>✅</div>
          <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.text}}>{routineDone}/{allRoutine.length}</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>Routine du jour</div>
          <div style={{marginTop:8}}><PBar pct={allRoutine.length?routineDone/allRoutine.length*100:0}/></div>
        </Card>
        {lastWeight&&<Card style={{padding:"14px"}}>
          <div style={{fontSize:24,marginBottom:4}}>⚖️</div>
          <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.text}}>{lastWeight} kg</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>{goalWeight?`Objectif: ${goalWeight} kg`:"Dernier poids"}</div>
        </Card>}
        <Card style={{padding:"14px"}}>
          <div style={{fontSize:24,marginBottom:4}}>💧</div>
          <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.text}}>{(data.diet.waterLogs[TODAY]||0)}</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>Verres d'eau</div>
          <div style={{marginTop:8}}><PBar pct={(data.diet.waterLogs[TODAY]||0)/8*100} color={C.blue}/></div>
        </Card>
      </div>

      {/* Goals preview */}
      {data.goals.filter(g=>!g.done).length>0&&<Card style={{marginBottom:14}}>
        <Label>Objectifs actifs</Label>
        {data.goals.filter(g=>!g.done).slice(0,3).map(g=>(
          <div key={g.id} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontFamily:FB,fontSize:13,color:C.text}}>{g.text}</span>
              <span style={{fontFamily:FB,fontSize:12,fontWeight:700,color:C.sage}}>{g.progress||0}%</span>
            </div>
            <PBar pct={g.progress||0}/>
          </div>
        ))}
      </Card>}

      {/* Mood */}
      <Card>
        <Label>Comment vous sentez-vous ?</Label>
        <div style={{display:"flex",gap:8,justifyContent:"space-around"}}>
          {["😞","😐","🙂","😊","🤩"].map((e,i)=>(
            <div key={i} style={{fontSize:28,cursor:"pointer",opacity:todayMoods===i+1?1:0.4,transform:todayMoods===i+1?"scale(1.3)":"scale(1)",transition:"all 0.2s"}}>{e}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── Prières ───────────────────────────────────────────────────────────────────
function Prieres({data,setData}){
  const prayers=["Fajr","Dhuhr","Asr","Maghrib","Isha"];
  const todayLog=data.prayers.logs[TODAY]||{};
  const times=calcPrayers(33.5731,-7.5898); // Casablanca default

  const toggle=p=>{
    const updated={...todayLog,[p]:!todayLog[p]};
    setData(d=>({...d,prayers:{...d.prayers,logs:{...d.prayers.logs,[TODAY]:updated}}}));
  };

  const done=prayers.filter(p=>todayLog[p]).length;
  const prayerEmoji={Fajr:"🌙",Dhuhr:"☀️",Asr:"🌤️",Maghrib:"🌅",Isha:"⭐"};

  // Weekly
  const days=Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-i); return d.toISOString().split("T")[0]; }).reverse();

  // Quran log
  const todayQuran=data.quran.logs[TODAY]||"";
  const setQuran=v=>setData(d=>({...d,quran:{...d.quran,logs:{...d.quran.logs,[TODAY]:v}}}));

  const streak=calcStreak(Object.fromEntries(Object.entries(data.prayers.logs).map(([d,v])=>[d,prayers.every(p=>v[p])])));

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="🕌">Prières du jour</SectionTitle>

      {streak>0&&<div style={{background:`linear-gradient(135deg,${C.sage},${C.sageDark})`,borderRadius:16,padding:"14px 18px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:24}}>🔥</span>
        <div style={{fontFamily:FB,fontSize:15,fontWeight:700,color:"#fff"}}>{streak} jours complets</div>
      </div>}

      <Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <span style={{fontFamily:FB,fontSize:15,fontWeight:700,color:C.text}}>{done}/5 prières</span>
          <Chip>{done===5?"✨ Toutes faites!":done===0?"Commencez la journée":""}</Chip>
        </div>
        <PBar pct={done/5*100} h={10}/>
      </Card>

      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
        {prayers.map(p=>(
          <Card key={p} onClick={()=>toggle(p)} style={{padding:"14px 16px",display:"flex",alignItems:"center",gap:14,background:todayLog[p]?C.sageLight:C.white,borderColor:todayLog[p]?C.sage:C.border,transition:"all 0.2s",cursor:"pointer"}}>
            <span style={{fontSize:24}}>{prayerEmoji[p]}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:FB,fontSize:16,fontWeight:700,color:todayLog[p]?C.sageDark:C.text}}>{p}</div>
              <div style={{fontFamily:FB,fontSize:12,color:C.textDim}}>{times[p]}</div>
            </div>
            <Check done={!!todayLog[p]} onClick={()=>toggle(p)} size={26}/>
          </Card>
        ))}
      </div>

      {/* Quran */}
      <Card style={{marginBottom:16}}>
        <Label>📖 Coran — aujourd'hui</Label>
        <Inp value={todayQuran} onChange={setQuran} placeholder="Pages ou sourates lues…"/>
      </Card>

      {/* Weekly overview */}
      <Card>
        <Label>Cette semaine</Label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
          {days.map(day=>{
            const log=data.prayers.logs[day]||{};
            const cnt=prayers.filter(p=>log[p]).length;
            const dayName=new Date(day).toLocaleDateString("fr-FR",{weekday:"short"}).slice(0,3);
            const isToday=day===TODAY;
            return <div key={day} style={{textAlign:"center"}}>
              <div style={{fontFamily:FB,fontSize:9,color:C.textMut,marginBottom:4}}>{dayName}</div>
              <div style={{width:32,height:32,borderRadius:8,background:cnt===5?C.sage:cnt>0?C.mint:C.sageLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",border:isToday?`2px solid ${C.sageDark}`:"none"}}>
                <span style={{fontFamily:FB,fontSize:10,fontWeight:700,color:cnt===5?"#fff":C.sageDark}}>{cnt}</span>
              </div>
            </div>;
          })}
        </div>
      </Card>
    </div>
  );
}

// ── Fitness ───────────────────────────────────────────────────────────────────
function Fitness({data,setData}){
  const [form,setForm]=useState({date:TODAY,type:"Marche",duration:"",notes:""});
  const [sf,setSf]=useState({date:TODAY,bed:"",wake:"",quality:"Bien"});
  const types=["Marche","Gym","Yoga","Natation","Vélo","Danse","Autre"];

  const logWorkout=()=>{
    setData(d=>({...d,fitness:{...d.fitness,logs:[{...form,id:Date.now()},...d.fitness.logs]}}));
    setForm({date:TODAY,type:"Marche",duration:"",notes:""});
  };
  const logSleep=()=>{
    if(!sf.bed||!sf.wake) return;
    setData(d=>({...d,fitness:{...d.fitness,sleepLogs:[{...sf,id:Date.now()},...(d.fitness.sleepLogs||[])]}}));
    setSf({date:TODAY,bed:"",wake:"",quality:"Bien"});
  };
  const delW=id=>setData(d=>({...d,fitness:{...d.fitness,logs:d.fitness.logs.filter(l=>l.id!==id)}}));
  const delS=id=>setData(d=>({...d,fitness:{...d.fitness,sleepLogs:(d.fitness.sleepLogs||[]).filter(l=>l.id!==id)}}));

  const streak=(()=>{
    const dates=[...new Set(data.fitness.logs.map(l=>l.date))].sort((a,b)=>b.localeCompare(a));
    let s=0,p=null;
    for(const dd of dates){if(!p){s=1;p=dd;continue;} const diff=Math.round((new Date(p)-new Date(dd))/86400000); if(diff===1){s++;p=dd;}else break;}
    return s;
  })();

  const sleepHrs=l=>{ if(!l.bed||!l.wake) return null; let h=(new Date(`2000-01-01T${l.wake}`)-new Date(`2000-01-01T${l.bed}`))/3600000; if(h<0)h+=24; return h.toFixed(1); };
  const QC={Mauvaise:C.red,Moyenne:C.gold,Bien:C.sage,Excellente:C.sageDark};
  const typeEmoji={Marche:"🚶",Gym:"🏋️",Yoga:"🧘",Natation:"🏊",Vélo:"🚴",Danse:"💃",Autre:"⚡"};

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="💪">Fitness & Sommeil</SectionTitle>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <Card style={{padding:"14px",textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:4}}>🔥</div>
          <div style={{fontFamily:FB,fontSize:24,fontWeight:800,color:C.text}}>{streak}</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>jours consécutifs</div>
        </Card>
        <Card style={{padding:"14px",textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:4}}>🏅</div>
          <div style={{fontFamily:FB,fontSize:24,fontWeight:800,color:C.text}}>{data.fitness.logs.length}</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>séances totales</div>
        </Card>
      </div>

      {/* Log workout */}
      <Card style={{marginBottom:16}}>
        <Label>➕ Ajouter une séance</Label>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Sel value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={types}/>
          <Inp value={form.duration} onChange={v=>setForm(f=>({...f,duration:v}))} placeholder="Durée (ex: 45 min)"/>
          <Inp value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} placeholder="Notes…"/>
          <Btn onClick={logWorkout}>Enregistrer 💪</Btn>
        </div>
      </Card>

      {/* Recent workouts */}
      {data.fitness.logs.slice(0,5).map(l=>(
        <Card key={l.id} style={{marginBottom:10,padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:24}}>{typeEmoji[l.type]||"⚡"}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:FB,fontSize:14,fontWeight:700,color:C.text}}>{l.type}{l.duration?` · ${l.duration}`:""}</div>
              <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>{l.date}{l.notes?` · ${l.notes}`:""}</div>
            </div>
            <span onClick={()=>delW(l.id)} style={{cursor:"pointer",fontSize:16,color:C.textMut}}>✕</span>
          </div>
        </Card>
      ))}

      {/* Sleep targets */}
      <Card style={{marginTop:16,marginBottom:16}}>
        <Label>😴 Objectifs de sommeil</Label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <div style={{fontFamily:FB,fontSize:11,color:C.textDim,marginBottom:4}}>Coucher cible</div>
            <input type="time" value={data.fitness.targetSleep} onChange={e=>setData(d=>({...d,fitness:{...d.fitness,targetSleep:e.target.value}}))} style={{fontFamily:FB,fontSize:16,fontWeight:700,padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,outline:"none",width:"100%"}}/>
          </div>
          <div>
            <div style={{fontFamily:FB,fontSize:11,color:C.textDim,marginBottom:4}}>Réveil cible</div>
            <input type="time" value={data.fitness.targetWake} onChange={e=>setData(d=>({...d,fitness:{...d.fitness,targetWake:e.target.value}}))} style={{fontFamily:FB,fontSize:16,fontWeight:700,padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,outline:"none",width:"100%"}}/>
          </div>
        </div>
      </Card>

      {/* Log sleep */}
      <Card style={{marginBottom:16}}>
        <Label>🌙 Enregistrer le sommeil</Label>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div><div style={{fontFamily:FB,fontSize:11,color:C.textDim,marginBottom:4}}>Coucher</div><input type="time" value={sf.bed} onChange={e=>setSf(f=>({...f,bed:e.target.value}))} style={{fontFamily:FB,fontSize:14,padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,outline:"none",width:"100%"}}/></div>
            <div><div style={{fontFamily:FB,fontSize:11,color:C.textDim,marginBottom:4}}>Réveil</div><input type="time" value={sf.wake} onChange={e=>setSf(f=>({...f,wake:e.target.value}))} style={{fontFamily:FB,fontSize:14,padding:"10px 12px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,outline:"none",width:"100%"}}/></div>
          </div>
          <Sel value={sf.quality} onChange={v=>setSf(f=>({...f,quality:v}))} options={["Mauvaise","Moyenne","Bien","Excellente"]}/>
          <Btn onClick={logSleep}>Enregistrer 😴</Btn>
        </div>
      </Card>

      {(data.fitness.sleepLogs||[]).slice(0,5).map(l=>(
        <Card key={l.id} style={{marginBottom:10,padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:24}}>🌙</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:FB,fontSize:14,fontWeight:700,color:C.text}}>{sleepHrs(l)}h de sommeil</div>
              <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>{l.date} · {l.bed} → {l.wake}</div>
            </div>
            <Chip color={QC[l.quality]} bg={`${QC[l.quality]}22`}>{l.quality}</Chip>
            <span onClick={()=>delS(l.id)} style={{cursor:"pointer",fontSize:16,color:C.textMut}}>✕</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── Alimentation ──────────────────────────────────────────────────────────────
function Alimentation({data,setData}){
  const [meal,setMeal]=useState({type:"Petit-déjeuner",desc:"",calories:""});
  const todayMeals=(data.diet.logs||[]).filter(l=>l.date===TODAY);
  const water=data.diet.waterLogs[TODAY]||0;
  const addWater=()=>setData(d=>({...d,diet:{...d.diet,waterLogs:{...d.diet.waterLogs,[TODAY]:(d.diet.waterLogs[TODAY]||0)+1}}}));
  const removeWater=()=>setData(d=>({...d,diet:{...d.diet,waterLogs:{...d.diet.waterLogs,[TODAY]:Math.max(0,(d.diet.waterLogs[TODAY]||0)-1)}}}));
  const logMeal=()=>{ if(!meal.desc) return; setData(d=>({...d,diet:{...d.diet,logs:[{...meal,date:TODAY,id:Date.now()},...(d.diet.logs||[])]}})); setMeal({type:"Petit-déjeuner",desc:"",calories:""}); };
  const delMeal=id=>setData(d=>({...d,diet:{...d.diet,logs:d.diet.logs.filter(l=>l.id!==id)}}));
  const mealEmoji={"Petit-déjeuner":"🌅","Déjeuner":"☀️","Dîner":"🌙","Collation":"🍎"};
  const totalCals=todayMeals.reduce((s,m)=>s+(parseInt(m.calories)||0),0);

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="🥗">Alimentation</SectionTitle>

      {/* Water */}
      <Card style={{marginBottom:16}}>
        <Label>💧 Eau — objectif 8 verres</Label>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",flex:1}}>
            {Array.from({length:8}).map((_,i)=>(
              <span key={i} style={{fontSize:24,opacity:i<water?1:0.25,transition:"opacity 0.2s"}}>💧</span>
            ))}
          </div>
          <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.blue,marginLeft:12}}>{water}/8</div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <Btn onClick={addWater} style={{flex:1,justifyContent:"center"}}>+ Verre</Btn>
          <Btn onClick={removeWater} variant="ghost" style={{flex:1,justifyContent:"center"}}>- Retirer</Btn>
        </div>
      </Card>

      {/* Add meal */}
      <Card style={{marginBottom:16}}>
        <Label>➕ Ajouter un repas</Label>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Sel value={meal.type} onChange={v=>setMeal(m=>({...m,type:v}))} options={["Petit-déjeuner","Déjeuner","Dîner","Collation"]}/>
          <Inp value={meal.desc} onChange={v=>setMeal(m=>({...m,desc:v}))} placeholder="Ce que vous avez mangé…"/>
          <Inp value={meal.calories} onChange={v=>setMeal(m=>({...m,calories:v}))} placeholder="Calories (optionnel)" type="number"/>
          <Btn onClick={logMeal}>Enregistrer 🥗</Btn>
        </div>
      </Card>

      {/* Calories */}
      {totalCals>0&&<Card style={{marginBottom:16,background:C.mintLight}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontFamily:FB,fontSize:13,color:C.textDim}}>Calories aujourd'hui</div><div style={{fontFamily:FB,fontSize:28,fontWeight:800,color:C.text}}>{totalCals} kcal</div></div>
          <span style={{fontSize:40}}>🔥</span>
        </div>
      </Card>}

      {/* Today meals */}
      {todayMeals.length>0&&<><Label style={{marginBottom:10}}>Aujourd'hui</Label>{todayMeals.map(m=>(
        <Card key={m.id} style={{marginBottom:10,padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:22}}>{mealEmoji[m.type]||"🍽️"}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:FB,fontSize:12,fontWeight:700,color:C.textDim}}>{m.type}</div>
              <div style={{fontFamily:FB,fontSize:14,color:C.text}}>{m.desc}</div>
              {m.calories&&<div style={{fontFamily:FB,fontSize:11,color:C.textMut}}>{m.calories} kcal</div>}
            </div>
            <span onClick={()=>delMeal(m.id)} style={{cursor:"pointer",fontSize:16,color:C.textMut}}>✕</span>
          </div>
        </Card>
      ))}</>}
    </div>
  );
}

// ── Poids ─────────────────────────────────────────────────────────────────────
function Poids({data,setData}){
  const [weight,setWeight]=useState("");
  const entries=data.weight.entries||[];
  const logWeight=()=>{ if(!weight) return; setData(d=>({...d,weight:{...d.weight,entries:[...d.weight.entries,{date:TODAY,weight:parseFloat(weight),id:Date.now()}]}})); setWeight(""); };
  const delEntry=id=>setData(d=>({...d,weight:{...d.weight,entries:d.weight.entries.filter(e=>e.id!==id)}}));
  const latest=entries.length?entries[entries.length-1].weight:null;
  const start=data.weight.start?parseFloat(data.weight.start):null;
  const goal=data.weight.goal?parseFloat(data.weight.goal):null;
  const lost=start&&latest?parseFloat((start-latest).toFixed(1)):null;
  const toGo=goal&&latest?parseFloat((latest-goal).toFixed(1)):null;
  const pct=start&&goal&&latest?Math.min(100,Math.max(0,((start-latest)/(start-goal))*100)):0;

  // Simple chart
  const last8=entries.slice(-8);
  const vals=last8.map(e=>e.weight);
  const minV=vals.length?Math.min(...vals)-1:60;
  const maxV=vals.length?Math.max(...vals)+1:80;
  const rng=maxV-minV||1;
  const W=320,H=100,PAD=16;
  const cw=W-PAD*2,ch=H-PAD*2;

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="⚖️">Suivi du poids</SectionTitle>

      {/* Setup */}
      <Card style={{marginBottom:16}}>
        <Label>Paramètres</Label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <div style={{fontFamily:FB,fontSize:11,color:C.textDim,marginBottom:4}}>Poids de départ (kg)</div>
            <Inp value={data.weight.start||""} onChange={v=>setData(d=>({...d,weight:{...d.weight,start:v}}))} placeholder="ex: 75" type="number"/>
          </div>
          <div>
            <div style={{fontFamily:FB,fontSize:11,color:C.textDim,marginBottom:4}}>Objectif (kg)</div>
            <Inp value={data.weight.goal||""} onChange={v=>setData(d=>({...d,weight:{...d.weight,goal:v}}))} placeholder="ex: 65" type="number"/>
          </div>
        </div>
      </Card>

      {/* Stats */}
      {latest&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:16}}>
        <Card style={{padding:"14px",textAlign:"center"}}>
          <div style={{fontFamily:FB,fontSize:20,fontWeight:800,color:C.text}}>{latest}</div>
          <div style={{fontFamily:FB,fontSize:10,color:C.textDim}}>kg actuel</div>
        </Card>
        {lost!==null&&<Card style={{padding:"14px",textAlign:"center",background:lost>0?C.sageLight:C.card}}>
          <div style={{fontFamily:FB,fontSize:20,fontWeight:800,color:lost>0?C.sageDark:C.red}}>{lost>0?"-":"+"}{ Math.abs(lost)}</div>
          <div style={{fontFamily:FB,fontSize:10,color:C.textDim}}>kg perdus</div>
        </Card>}
        {toGo!==null&&<Card style={{padding:"14px",textAlign:"center"}}>
          <div style={{fontFamily:FB,fontSize:20,fontWeight:800,color:C.gold}}>{toGo>0?toGo:0}</div>
          <div style={{fontFamily:FB,fontSize:10,color:C.textDim}}>kg restants</div>
        </Card>}
      </div>}

      {/* Progress */}
      {start&&goal&&<Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontFamily:FB,fontSize:13,color:C.text}}>Progression vers l'objectif</span>
          <span style={{fontFamily:FB,fontSize:13,fontWeight:700,color:C.sage}}>{Math.round(pct)}%</span>
        </div>
        <PBar pct={pct} h={12}/>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          <span style={{fontFamily:FB,fontSize:11,color:C.textMut}}>{start} kg</span>
          <span style={{fontFamily:FB,fontSize:11,color:C.textMut}}>{goal} kg 🎯</span>
        </div>
      </Card>}

      {/* Chart */}
      {last8.length>=2&&<Card style={{marginBottom:16}}>
        <Label>Évolution</Label>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:"block",overflow:"visible"}}>
          {last8.map((e,i)=>{
            const x=PAD+i*(cw/(last8.length-1));
            const y=PAD+ch-(((e.weight-minV)/rng)*ch);
            return <g key={e.id}>
              {i>0&&<line x1={PAD+(i-1)*(cw/(last8.length-1))} y1={PAD+ch-(((last8[i-1].weight-minV)/rng)*ch)} x2={x} y2={y} stroke={C.sage} strokeWidth="2.5" strokeLinecap="round"/>}
              <circle cx={x} cy={y} r="5" fill={C.sage} stroke="#fff" strokeWidth="2"/>
              <text x={x} y={y-10} textAnchor="middle" fontFamily={FB} fontSize="10" fill={C.sageDark} fontWeight="700">{e.weight}</text>
            </g>;
          })}
        </svg>
      </Card>}

      {/* Log */}
      <Card style={{marginBottom:16}}>
        <Label>Peser aujourd'hui</Label>
        <div style={{display:"flex",gap:10}}>
          <Inp value={weight} onChange={setWeight} placeholder="ex: 72.5" type="number" style={{flex:1}}/>
          <Btn onClick={logWeight} style={{flexShrink:0}}>+ Ajouter</Btn>
        </div>
      </Card>

      {entries.slice().reverse().slice(0,6).map(e=>(
        <Card key={e.id} style={{marginBottom:8,padding:"12px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:FB,fontSize:13,color:C.textDim}}>{e.date}</span>
            <span style={{fontFamily:FB,fontSize:18,fontWeight:700,color:C.text}}>{e.weight} kg</span>
            <span onClick={()=>delEntry(e.id)} style={{cursor:"pointer",fontSize:14,color:C.textMut}}>✕</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ── Apprendre ─────────────────────────────────────────────────────────────────
function Apprendre({data,setData}){
  const [bookForm,setBookForm]=useState({title:"",author:"",pages:"",current:"",category:"Développement personnel"});
  const [videoForm,setVideoForm]=useState({title:"",source:"YouTube",category:"Histoire",notes:""});
  const [activeTab,setActiveTab]=useState("livres");
  const cats=["Développement personnel","Histoire","Science","Spiritualité","Santé","Langue","Autre"];
  const addBook=()=>{ if(!bookForm.title) return; setData(d=>({...d,learning:{...d.learning,books:[{...bookForm,id:Date.now(),started:TODAY,done:false},...d.learning.books]}})); setBookForm({title:"",author:"",pages:"",current:"",category:"Développement personnel"}); };
  const addVideo=()=>{ if(!videoForm.title) return; setData(d=>({...d,learning:{...d.learning,videos:[{...videoForm,id:Date.now(),date:TODAY},...d.learning.videos]}})); setVideoForm({title:"",source:"YouTube",category:"Histoire",notes:""}); };
  const toggleBook=id=>setData(d=>({...d,learning:{...d.learning,books:d.learning.books.map(b=>b.id===id?{...b,done:!b.done}:b)}}));
  const delBook=id=>setData(d=>({...d,learning:{...d.learning,books:d.learning.books.filter(b=>b.id!==id)}}));
  const delVideo=id=>setData(d=>({...d,learning:{...d.learning,videos:d.learning.videos.filter(v=>v.id!==id)}}));
  const updatePages=(id,v)=>setData(d=>({...d,learning:{...d.learning,books:d.learning.books.map(b=>b.id===id?{...b,current:v}:b)}}));
  const booksRead=data.learning.books.filter(b=>b.done).length;

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="📚">Apprendre</SectionTitle>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
        <Card style={{padding:"14px",textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:4}}>📖</div>
          <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.text}}>{booksRead}/{data.learning.monthlyGoal}</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>Livres ce mois</div>
          <div style={{marginTop:8}}><PBar pct={booksRead/data.learning.monthlyGoal*100}/></div>
        </Card>
        <Card style={{padding:"14px",textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:4}}>🎬</div>
          <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.text}}>{data.learning.videos.length}</div>
          <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>Vidéos regardées</div>
        </Card>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["livres","videos"].map(t=><button key={t} onClick={()=>setActiveTab(t)} style={{flex:1,fontFamily:FB,fontSize:13,fontWeight:700,padding:"10px",borderRadius:12,border:"none",cursor:"pointer",background:activeTab===t?C.sage:C.sageLight,color:activeTab===t?"#fff":C.sageDark,transition:"all 0.15s"}}>{t==="livres"?"📖 Livres":"🎬 Vidéos"}</button>)}
      </div>

      {activeTab==="livres"&&<>
        <Card style={{marginBottom:14}}>
          <Label>➕ Ajouter un livre</Label>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <Inp value={bookForm.title} onChange={v=>setBookForm(f=>({...f,title:v}))} placeholder="Titre du livre"/>
            <Inp value={bookForm.author} onChange={v=>setBookForm(f=>({...f,author:v}))} placeholder="Auteur"/>
            <Sel value={bookForm.category} onChange={v=>setBookForm(f=>({...f,category:v}))} options={cats}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Inp value={bookForm.pages} onChange={v=>setBookForm(f=>({...f,pages:v}))} placeholder="Total pages" type="number"/>
              <Inp value={bookForm.current} onChange={v=>setBookForm(f=>({...f,current:v}))} placeholder="Page actuelle" type="number"/>
            </div>
            <Btn onClick={addBook}>Ajouter 📖</Btn>
          </div>
        </Card>
        {data.learning.books.map(b=>{
          const pct=b.pages&&b.current?Math.round(parseInt(b.current)/parseInt(b.pages)*100):0;
          return <Card key={b.id} style={{marginBottom:10,background:b.done?C.sageLight:C.white}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:b.pages?10:0}}>
              <Check done={b.done} onClick={()=>toggleBook(b.id)}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:FB,fontSize:14,fontWeight:700,color:b.done?C.sageDark:C.text,textDecoration:b.done?"line-through":"none"}}>{b.title}</div>
                {b.author&&<div style={{fontFamily:FB,fontSize:12,color:C.textDim}}>{b.author}</div>}
                <Chip style={{marginTop:4,fontSize:10}}>{b.category}</Chip>
              </div>
              <span onClick={()=>delBook(b.id)} style={{cursor:"pointer",fontSize:14,color:C.textMut}}>✕</span>
            </div>
            {b.pages&&!b.done&&<div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <Inp value={b.current||""} onChange={v=>updatePages(b.id,v)} placeholder="Page actuelle" type="number" style={{width:120,padding:"6px 10px",fontSize:12}}/>
                <span style={{fontFamily:FB,fontSize:12,color:C.sage,fontWeight:700,alignSelf:"center"}}>{pct}%</span>
              </div>
              <PBar pct={pct} h={6}/>
            </div>}
          </Card>;
        })}
      </>}

      {activeTab==="videos"&&<>
        <Card style={{marginBottom:14}}>
          <Label>➕ Ajouter une vidéo</Label>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <Inp value={videoForm.title} onChange={v=>setVideoForm(f=>({...f,title:v}))} placeholder="Titre de la vidéo"/>
            <Sel value={videoForm.source} onChange={v=>setVideoForm(f=>({...f,source:v}))} options={["YouTube","Netflix","Documentaire","Podcast","Autre"]}/>
            <Sel value={videoForm.category} onChange={v=>setVideoForm(f=>({...f,category:v}))} options={cats}/>
            <Inp value={videoForm.notes} onChange={v=>setVideoForm(f=>({...f,notes:v}))} placeholder="Notes, ce que vous avez appris…"/>
            <Btn onClick={addVideo}>Ajouter 🎬</Btn>
          </div>
        </Card>
        {data.learning.videos.map(v=>(
          <Card key={v.id} style={{marginBottom:10}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
              <span style={{fontSize:22}}>🎬</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:FB,fontSize:14,fontWeight:700,color:C.text}}>{v.title}</div>
                <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>{v.source} · {v.date}</div>
                <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}><Chip style={{fontSize:10}}>{v.category}</Chip></div>
                {v.notes&&<div style={{fontFamily:FB,fontSize:12,color:C.textDim,marginTop:6,fontStyle:"italic"}}>"{v.notes}"</div>}
              </div>
              <span onClick={()=>delVideo(v.id)} style={{cursor:"pointer",fontSize:14,color:C.textMut}}>✕</span>
            </div>
          </Card>
        ))}
      </>}
    </div>
  );
}

// ── Routine ───────────────────────────────────────────────────────────────────
function Routine({data,setData}){
  const toggle=(block,id)=>setData(d=>({...d,routine:{...d.routine,[block]:d.routine[block].map(r=>r.id===id?{...r,done:!r.done}:r)}}));
  const allItems=[...data.routine.morning,...data.routine.evening];
  const done=allItems.filter(r=>r.done).length;
  const allDone=done===allItems.length&&allItems.length>0;

  useEffect(()=>{ if(allDone) setData(d=>({...d,streakData:{...d.streakData,[TODAY]:true}})); },[allDone]);

  const reset=()=>setData(d=>({...d,routine:{morning:d.routine.morning.map(r=>({...r,done:false})),evening:d.routine.evening.map(r=>({...r,done:false}))}}));
  const streak=calcStreak(data.streakData);

  const Block=({title,block,emoji})=>{
    const items=data.routine[block];
    const bd=items.filter(r=>r.done).length;
    return <div style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontFamily:FB,fontSize:15,fontWeight:700,color:C.text}}>{emoji} {title}</span>
        <span style={{fontFamily:FB,fontSize:12,color:C.sage,fontWeight:700}}>{bd}/{items.length}</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {items.map(r=>(
          <div key={r.id} onClick={()=>toggle(block,r.id)} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:14,background:r.done?C.sageLight:C.white,border:`1.5px solid ${r.done?C.sage:C.border}`,cursor:"pointer",transition:"all 0.2s"}}>
            <Check done={r.done} onClick={()=>{}}/>
            <span style={{fontFamily:FB,fontSize:14,fontWeight:r.done?600:500,color:r.done?C.sageDark:C.text,textDecoration:r.done?"line-through":"none",flex:1}}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>;
  };

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <SectionTitle icon="✅" style={{marginBottom:0}}>Routine du jour</SectionTitle>
        <Btn onClick={reset} variant="ghost" style={{fontSize:11,padding:"7px 14px"}}>Réinitialiser</Btn>
      </div>

      {streak>0&&<Card style={{background:`linear-gradient(135deg,${C.sage},${C.sageDark})`,marginBottom:16,border:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:28}}>🔥</span>
          <div><div style={{fontFamily:FB,fontSize:16,fontWeight:800,color:"#fff"}}>{streak} jours consécutifs !</div><div style={{fontFamily:FB,fontSize:12,color:"rgba(255,255,255,0.8)"}}>Vous êtes incroyable 🌟</div></div>
        </div>
      </Card>}

      <Card style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontFamily:FB,fontSize:13,color:C.text}}>Progression du jour</span>
          <span style={{fontFamily:FB,fontSize:13,fontWeight:700,color:C.sage}}>{done}/{allItems.length}</span>
        </div>
        <PBar pct={allItems.length?done/allItems.length*100:0} h={12}/>
        {allDone&&<div style={{textAlign:"center",marginTop:12,fontFamily:FB,fontSize:15,color:C.sageDark,fontWeight:700}}>✨ Routine complète ! Bravo !</div>}
      </Card>

      <Block title="Matin" block="morning" emoji="🌅"/>
      <Block title="Soir" block="evening" emoji="🌙"/>
    </div>
  );
}

// ── Objectifs ─────────────────────────────────────────────────────────────────
function Objectifs({data,setData}){
  const [text,setText]=useState(""); const [cat,setCat]=useState("Santé");
  const cats=["Santé","Spiritualité","Apprentissage","Famille","Finance","Personnel"];
  const catEmoji={Santé:"🏃",Spiritualité:"🕌",Apprentissage:"📚",Famille:"👨‍👩‍👧",Finance:"💰",Personnel:"⭐"};
  const catColor={Santé:C.sage,Spiritualité:C.purple,Apprentissage:C.blue,Famille:C.gold,Finance:C.green,Personnel:C.mint};
  const add=()=>{ if(!text.trim()) return; setData(d=>({...d,goals:[...d.goals,{id:Date.now(),text:text.trim(),category:cat,progress:0,done:false}]})); setText(""); };
  const setP=(id,v)=>setData(d=>({...d,goals:d.goals.map(g=>g.id===id?{...g,progress:v}:g)}));
  const toggle=id=>setData(d=>({...d,goals:d.goals.map(g=>g.id===id?{...g,done:!g.done}:g)}));
  const del=id=>setData(d=>({...d,goals:d.goals.filter(g=>g.id!==id)}));

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="🎯">Objectifs & Projets</SectionTitle>

      <Card style={{marginBottom:16}}>
        <Label>➕ Nouvel objectif</Label>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Inp value={text} onChange={setText} placeholder="Mon objectif…" onKeyDown={e=>e.key==="Enter"&&add()}/>
          <Sel value={cat} onChange={setCat} options={cats}/>
          <Btn onClick={add}>Ajouter l'objectif 🎯</Btn>
        </div>
      </Card>

      <Label style={{marginBottom:12}}>En cours — {data.goals.filter(g=>!g.done).length}</Label>
      {data.goals.filter(g=>!g.done).map(g=>(
        <Card key={g.id} style={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:12}}>
            <span style={{fontSize:22}}>{catEmoji[g.category]||"⭐"}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:FB,fontSize:15,fontWeight:700,color:C.text,marginBottom:4}}>{g.text}</div>
              <Chip color={catColor[g.category]} bg={`${catColor[g.category]}22`}>{g.category}</Chip>
            </div>
            <span onClick={()=>del(g.id)} style={{cursor:"pointer",fontSize:16,color:C.textMut}}>✕</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
            <PBar pct={g.progress||0} h={10} color={catColor[g.category]}/>
            <span style={{fontFamily:FB,fontSize:13,fontWeight:700,color:catColor[g.category]||C.sage,width:36,textAlign:"right"}}>{g.progress||0}%</span>
          </div>
          <input type="range" min={0} max={100} value={g.progress||0} onChange={e=>setP(g.id,+e.target.value)} style={{width:"100%",accentColor:catColor[g.category]||C.sage,cursor:"pointer"}}/>
          <div style={{marginTop:10}}>
            <Btn onClick={()=>toggle(g.id)} variant="soft" style={{fontSize:12,padding:"8px 16px"}}>✓ Marquer terminé</Btn>
          </div>
        </Card>
      ))}

      {data.goals.filter(g=>g.done).length>0&&<>
        <Label style={{margin:"16px 0 10px"}}>Accomplis 🎉 — {data.goals.filter(g=>g.done).length}</Label>
        {data.goals.filter(g=>g.done).map(g=>(
          <Card key={g.id} style={{marginBottom:8,opacity:0.6,padding:"12px 16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <Check done onClick={()=>toggle(g.id)}/>
              <span style={{fontFamily:FB,fontSize:13,color:C.textDim,textDecoration:"line-through",flex:1}}>{g.text}</span>
              <span onClick={()=>del(g.id)} style={{cursor:"pointer",fontSize:14,color:C.textMut}}>✕</span>
            </div>
          </Card>
        ))}
      </>}
    </div>
  );
}

// ── Finances ──────────────────────────────────────────────────────────────────
const EXP_CATS=["Nourriture","Transport","Shopping","Santé","Loisirs","Famille","Factures","Autre"];
const CAT_EMOJI={Nourriture:"🛒",Transport:"🚗",Shopping:"👜",Santé:"💊",Loisirs:"🎭",Famille:"👨‍👩‍👧",Factures:"🏠",Autre:"💸"};

function Finances({data,setData}){
  const [expForm,setExpForm]=useState({amount:"",cat:"Nourriture",note:""});
  const [savForm,setSavForm]=useState({name:"",target:"",current:"",emoji:"🎯"});
  const [debtForm,setDebtForm]=useState({name:"",total:"",paid:"",note:""});
  const [view,setView]=useState("resume");

  const fin=data.finance;
  const setIncome=v=>setData(d=>({...d,finance:{...d.finance,income:v}}));
  const addExp=()=>{ if(!expForm.amount) return; setData(d=>({...d,finance:{...d.finance,expenses:[{...expForm,date:TODAY,id:Date.now(),amount:parseFloat(expForm.amount)},...(d.finance.expenses||[])]}})); setExpForm({amount:"",cat:"Nourriture",note:""}); };
  const delExp=id=>setData(d=>({...d,finance:{...d.finance,expenses:d.finance.expenses.filter(e=>e.id!==id)}}));
  const addSav=()=>{ if(!savForm.name||!savForm.target) return; setData(d=>({...d,finance:{...d.finance,savingsGoals:[...( d.finance.savingsGoals||[]),{...savForm,id:Date.now(),target:parseFloat(savForm.target),current:parseFloat(savForm.current)||0}]}})); setSavForm({name:"",target:"",current:"",emoji:"🎯"}); };
  const delSav=id=>setData(d=>({...d,finance:{...d.finance,savingsGoals:d.finance.savingsGoals.filter(s=>s.id!==id)}}));
  const updateSav=(id,v)=>setData(d=>({...d,finance:{...d.finance,savingsGoals:d.finance.savingsGoals.map(s=>s.id===id?{...s,current:parseFloat(v)||0}:s)}}));
  const addDebt=()=>{ if(!debtForm.name||!debtForm.total) return; setData(d=>({...d,finance:{...d.finance,debts:[...(d.finance.debts||[]),{...debtForm,id:Date.now(),total:parseFloat(debtForm.total),paid:parseFloat(debtForm.paid)||0}]}})); setDebtForm({name:"",total:"",paid:"",note:""}); };
  const delDebt=id=>setData(d=>({...d,finance:{...d.finance,debts:d.finance.debts.filter(d=>d.id!==id)}}));
  const updateDebt=(id,v)=>setData(d=>({...d,finance:{...d.finance,debts:d.finance.debts.map(dd=>dd.id===id?{...dd,paid:parseFloat(v)||0}:dd)}}));

  const todayExp=(fin.expenses||[]).filter(e=>e.date===TODAY);
  const monthExp=(fin.expenses||[]).filter(e=>e.date?.slice(0,7)===TODAY.slice(0,7));
  const totalMonth=monthExp.reduce((s,e)=>s+e.amount,0);
  const income=parseFloat(fin.income)||0;
  const remaining=income-totalMonth;
  const totalDebts=(fin.debts||[]).reduce((s,d)=>s+(d.total-d.paid),0);
  const bycat=EXP_CATS.map(c=>({ cat:c, total:monthExp.filter(e=>e.cat===c).reduce((s,e)=>s+e.amount,0) })).filter(c=>c.total>0).sort((a,b)=>b.total-a.total);

  const VIEWS=["resume","dépenses","épargne","dettes"];

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="💰">Finances</SectionTitle>

      {/* Sub tabs */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:16}}>
        {VIEWS.map(v=><button key={v} onClick={()=>setView(v)} style={{fontFamily:FB,fontSize:11,fontWeight:700,padding:"9px 4px",borderRadius:10,border:"none",cursor:"pointer",background:view===v?C.sage:C.sageLight,color:view===v?"#fff":C.sageDark,transition:"all 0.15s",textTransform:"capitalize"}}>{v}</button>)}
      </div>

      {view==="resume"&&<>
        <Card style={{marginBottom:14}}>
          <Label>Revenu mensuel (DH)</Label>
          <Inp value={fin.income||""} onChange={setIncome} placeholder="ex: 8000" type="number"/>
        </Card>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <Card style={{padding:"14px",background:C.mintLight}}>
            <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>Dépensé ce mois</div>
            <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.red}}>{totalMonth.toFixed(0)} DH</div>
          </Card>
          <Card style={{padding:"14px",background:remaining>=0?C.sageLight:"#fef2f2"}}>
            <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>Restant</div>
            <div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:remaining>=0?C.sageDark:C.red}}>{remaining.toFixed(0)} DH</div>
          </Card>
        </div>
        {income>0&&<Card style={{marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontFamily:FB,fontSize:13,color:C.text}}>Budget utilisé</span>
            <span style={{fontFamily:FB,fontSize:13,fontWeight:700,color:totalMonth/income>0.8?C.red:C.sage}}>{Math.round(totalMonth/income*100)}%</span>
          </div>
          <PBar pct={Math.min(100,totalMonth/income*100)} color={totalMonth/income>0.8?C.red:C.sage} h={10}/>
          {totalMonth/income>0.8&&<div style={{fontFamily:FB,fontSize:12,color:C.red,marginTop:6}}>⚠️ Attention, budget presque atteint !</div>}
        </Card>}
        {bycat.length>0&&<Card style={{marginBottom:14}}>
          <Label>Par catégorie ce mois</Label>
          {bycat.map(c=><div key={c.cat} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontFamily:FB,fontSize:13,color:C.text}}>{CAT_EMOJI[c.cat]} {c.cat}</span>
              <span style={{fontFamily:FB,fontSize:13,fontWeight:700,color:C.text}}>{c.total.toFixed(0)} DH</span>
            </div>
            <PBar pct={totalMonth?c.total/totalMonth*100:0} h={6}/>
          </div>)}
        </Card>}
        {totalDebts>0&&<Card style={{background:"#fef9ec"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontFamily:FB,fontSize:12,color:C.textDim}}>Total dettes restantes</div><div style={{fontFamily:FB,fontSize:22,fontWeight:800,color:C.gold}}>{totalDebts.toFixed(0)} DH</div></div>
            <span style={{fontSize:32}}>📋</span>
          </div>
        </Card>}
      </>}

      {view==="dépenses"&&<>
        <Card style={{marginBottom:14}}>
          <Label>➕ Nouvelle dépense</Label>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <Inp value={expForm.amount} onChange={v=>setExpForm(f=>({...f,amount:v}))} placeholder="Montant (DH)" type="number"/>
            <Sel value={expForm.cat} onChange={v=>setExpForm(f=>({...f,cat:v}))} options={EXP_CATS}/>
            <Inp value={expForm.note} onChange={v=>setExpForm(f=>({...f,note:v}))} placeholder="Note (optionnel)"/>
            <Btn onClick={addExp}>Ajouter la dépense</Btn>
          </div>
        </Card>
        <Label style={{marginBottom:10}}>Aujourd'hui</Label>
        {todayExp.length===0&&<div style={{fontFamily:FB,fontSize:13,color:C.textMut,textAlign:"center",padding:"20px"}}>Aucune dépense aujourd'hui 🎉</div>}
        {todayExp.map(e=><Card key={e.id} style={{marginBottom:8,padding:"12px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:22}}>{CAT_EMOJI[e.cat]||"💸"}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:FB,fontSize:14,fontWeight:700,color:C.text}}>{e.amount} DH</div>
              <div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>{e.cat}{e.note?` · ${e.note}`:""}</div>
            </div>
            <span onClick={()=>delExp(e.id)} style={{cursor:"pointer",fontSize:14,color:C.textMut}}>✕</span>
          </div>
        </Card>)}
      </>}

      {view==="épargne"&&<>
        <Card style={{marginBottom:14}}>
          <Label>➕ Objectif d'épargne</Label>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div style={{display:"flex",gap:10}}>
              <Inp value={savForm.emoji} onChange={v=>setSavForm(f=>({...f,emoji:v}))} style={{width:56,textAlign:"center",fontSize:22}}/>
              <Inp value={savForm.name} onChange={v=>setSavForm(f=>({...f,name:v}))} placeholder="Ex: Voyage, Sac, Voiture…" style={{flex:1}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Inp value={savForm.target} onChange={v=>setSavForm(f=>({...f,target:v}))} placeholder="Objectif (DH)" type="number"/>
              <Inp value={savForm.current} onChange={v=>setSavForm(f=>({...f,current:v}))} placeholder="Déjà épargné" type="number"/>
            </div>
            <Btn onClick={addSav}>Créer l'objectif 💰</Btn>
          </div>
        </Card>
        {(fin.savingsGoals||[]).map(s=>{
          const pct=Math.min(100,Math.round(s.current/s.target*100));
          return <Card key={s.id} style={{marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontSize:28}}>{s.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:FB,fontSize:15,fontWeight:700,color:C.text}}>{s.name}</div>
                <div style={{fontFamily:FB,fontSize:12,color:C.textDim}}>{s.current} / {s.target} DH</div>
              </div>
              <span onClick={()=>delSav(s.id)} style={{cursor:"pointer",fontSize:14,color:C.textMut}}>✕</span>
            </div>
            <PBar pct={pct} h={10}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:6,marginBottom:8}}>
              <span style={{fontFamily:FB,fontSize:11,color:C.textMut}}>0 DH</span>
              <span style={{fontFamily:FB,fontSize:12,fontWeight:700,color:C.sage}}>{pct}% atteint</span>
              <span style={{fontFamily:FB,fontSize:11,color:C.textMut}}>{s.target} DH 🎯</span>
            </div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <Inp value={s.current} onChange={v=>updateSav(s.id,v)} placeholder="Montant épargné" type="number" style={{flex:1,padding:"8px 12px",fontSize:13}}/>
              <span style={{fontFamily:FB,fontSize:12,color:C.textDim}}>DH</span>
            </div>
          </Card>;
        })}
        {(fin.savingsGoals||[]).length===0&&<div style={{fontFamily:FB,fontSize:13,color:C.textMut,textAlign:"center",padding:"20px"}}>Ajoutez votre premier objectif d'épargne 🌟</div>}
      </>}

      {view==="dettes"&&<>
        <Card style={{marginBottom:14}}>
          <Label>➕ Ajouter une dette</Label>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <Inp value={debtForm.name} onChange={v=>setDebtForm(f=>({...f,name:v}))} placeholder="À qui / pour quoi"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <Inp value={debtForm.total} onChange={v=>setDebtForm(f=>({...f,total:v}))} placeholder="Montant total" type="number"/>
              <Inp value={debtForm.paid} onChange={v=>setDebtForm(f=>({...f,paid:v}))} placeholder="Déjà remboursé" type="number"/>
            </div>
            <Inp value={debtForm.note} onChange={v=>setDebtForm(f=>({...f,note:v}))} placeholder="Note…"/>
            <Btn onClick={addDebt}>Ajouter la dette</Btn>
          </div>
        </Card>
        {(fin.debts||[]).map(d=>{
          const remaining=d.total-d.paid;
          const pct=Math.min(100,Math.round(d.paid/d.total*100));
          return <Card key={d.id} style={{marginBottom:12,borderColor:remaining<=0?C.sage:C.border}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
              <span style={{fontSize:24}}>{remaining<=0?"✅":"📋"}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:FB,fontSize:15,fontWeight:700,color:C.text}}>{d.name}</div>
                {d.note&&<div style={{fontFamily:FB,fontSize:11,color:C.textDim}}>{d.note}</div>}
                <div style={{fontFamily:FB,fontSize:13,color:remaining<=0?C.sage:C.red,fontWeight:700,marginTop:2}}>{remaining<=0?"✓ Remboursé":`Reste: ${remaining.toFixed(0)} DH`}</div>
              </div>
              <span onClick={()=>delDebt(d.id)} style={{cursor:"pointer",fontSize:14,color:C.textMut}}>✕</span>
            </div>
            <PBar pct={pct} color={remaining<=0?C.sage:C.gold} h={8}/>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:4,marginBottom:8}}>
              <span style={{fontFamily:FB,fontSize:11,color:C.textMut}}>Remboursé: {d.paid} DH</span>
              <span style={{fontFamily:FB,fontSize:11,color:C.textMut}}>Total: {d.total} DH</span>
            </div>
            {remaining>0&&<div style={{display:"flex",gap:8,alignItems:"center"}}>
              <Inp value={d.paid} onChange={v=>updateDebt(d.id,v)} placeholder="Montant remboursé" type="number" style={{flex:1,padding:"8px 12px",fontSize:13}}/>
              <span style={{fontFamily:FB,fontSize:12,color:C.textDim}}>DH</span>
            </div>}
          </Card>;
        })}
        {(fin.debts||[]).length===0&&<div style={{fontFamily:FB,fontSize:13,color:C.textMut,textAlign:"center",padding:"20px"}}>Aucune dette enregistrée 🎉</div>}
      </>}
    </div>
  );
}

// ── Bien-être ─────────────────────────────────────────────────────────────────
function Bienetre({data,setData}){
  const moods=["😞","😐","🙂","😊","🤩"];
  const moodLabels=["Difficile","Neutre","Bien","Heureux","Excellent"];
  const today=data.wellbeing.moods[TODAY];
  const todayGrat=data.wellbeing.gratitude[TODAY]||"";
  const setMood=v=>setData(d=>({...d,wellbeing:{...d.wellbeing,moods:{...d.wellbeing.moods,[TODAY]:v}}}));
  const setGrat=v=>setData(d=>({...d,wellbeing:{...d.wellbeing,gratitude:{...d.wellbeing.gratitude,[TODAY]:v}}}));
  const days=Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()-i); return d.toISOString().split("T")[0]; }).reverse();

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="🌸">Bien-être</SectionTitle>

      <Card style={{marginBottom:16}}>
        <Label>Comment vous sentez-vous aujourd'hui ?</Label>
        <div style={{display:"flex",justifyContent:"space-around",marginBottom:12}}>
          {moods.map((e,i)=>(
            <div key={i} onClick={()=>setMood(i+1)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
              <span style={{fontSize:36,transition:"transform 0.2s",transform:today===i+1?"scale(1.3)":"scale(1)",opacity:today&&today!==i+1?0.4:1}}>{e}</span>
              <span style={{fontFamily:FB,fontSize:9,color:today===i+1?C.sageDark:C.textMut,fontWeight:today===i+1?700:400}}>{moodLabels[i]}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{marginBottom:16}}>
        <Label>🙏 Gratitude du jour</Label>
        <textarea value={todayGrat} onChange={e=>setGrat(e.target.value)} placeholder="Aujourd'hui, je suis reconnaissante pour…" rows={3}
          style={{width:"100%",fontFamily:FB,fontSize:14,padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,outline:"none",resize:"none",lineHeight:1.6}}/>
      </Card>

      <Card>
        <Label>Humeur cette semaine</Label>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
          {days.map(day=>{
            const m=data.wellbeing.moods[day];
            const dayName=new Date(day).toLocaleDateString("fr-FR",{weekday:"short"}).slice(0,3);
            const isToday=day===TODAY;
            return <div key={day} style={{textAlign:"center"}}>
              <div style={{fontFamily:FB,fontSize:9,color:C.textMut,marginBottom:4}}>{dayName}</div>
              <div style={{width:36,height:36,borderRadius:10,background:C.sageLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",border:isToday?`2px solid ${C.sage}`:"none"}}>
                <span style={{fontSize:18}}>{m?moods[m-1]:"·"}</span>
              </div>
            </div>;
          })}
        </div>
      </Card>
    </div>
  );
}

// ── Semaine ───────────────────────────────────────────────────────────────────
function Semaine({data,setData}){
  const getWeek=()=>{ const d=new Date(); const diff=d.getDate()-d.getDay()+(d.getDay()===0?-6:1); return new Date(d.setDate(diff)).toISOString().split("T")[0]; };
  const wk=getWeek();
  const existing=data.weeklyReviews.find(r=>r.week===wk)||{week:wk};
  const [form,setForm]=useState(existing);
  useEffect(()=>{ const e=data.weeklyReviews.find(r=>r.week===wk)||{week:wk}; setForm(e); },[wk]);
  const save=()=>setData(d=>({...d,weeklyReviews:[...d.weeklyReviews.filter(r=>r.week!==wk),{...form,week:wk,savedAt:new Date().toISOString()}]}));

  const qs=[
    {id:"wins",label:"🌟 Mes victoires cette semaine",placeholder:"Ce qui s'est bien passé…"},
    {id:"hard",label:"💪 Ce qui a été difficile",placeholder:"Les obstacles rencontrés…"},
    {id:"health",label:"🏃 Santé & bien-être",placeholder:"Gym, alimentation, sommeil…"},
    {id:"spirit",label:"🕌 Vie spirituelle",placeholder:"Prières, Coran, réflexions…"},
    {id:"learn",label:"📚 Ce que j'ai appris",placeholder:"Livres, vidéos, découvertes…"},
    {id:"next",label:"🎯 Mes priorités pour la semaine prochaine",placeholder:"1.\n2.\n3."},
    {id:"score",label:"⭐ Note de la semaine (1-10)",placeholder:"7"},
  ];

  const past=data.weeklyReviews.filter(r=>r.week!==wk).sort((a,b)=>b.week.localeCompare(a.week));

  return (
    <div style={{padding:"20px 16px 80px"}}>
      <SectionTitle icon="📝">Bilan de la semaine</SectionTitle>
      <div style={{fontFamily:FB,fontSize:13,color:C.textDim,marginBottom:16}}>Semaine du {new Date(wk).toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"})}</div>

      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:16}}>
        {qs.map(q=>(
          <Card key={q.id}>
            <Label>{q.label}</Label>
            <textarea value={form[q.id]||""} onChange={e=>setForm(f=>({...f,[q.id]:e.target.value}))} placeholder={q.placeholder} rows={q.id==="next"?4:2}
              style={{width:"100%",fontFamily:FB,fontSize:13,padding:"10px 12px",borderRadius:10,border:`1.5px solid ${C.border}`,background:C.surface,color:C.text,outline:"none",resize:"none",lineHeight:1.6}}/>
          </Card>
        ))}
      </div>

      <Btn onClick={save} style={{width:"100%",justifyContent:"center",marginBottom:20}}>💾 Enregistrer le bilan</Btn>

      {past.length>0&&<>
        <Label style={{marginBottom:10}}>Bilans précédents</Label>
        {past.slice(0,4).map(r=>(
          <Card key={r.week} style={{marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:r.next?8:0}}>
              <span style={{fontFamily:FB,fontSize:13,fontWeight:700,color:C.text}}>Sem. du {new Date(r.week).toLocaleDateString("fr-FR",{day:"numeric",month:"short"})}</span>
              {r.score&&<Chip color={parseInt(r.score)>=7?C.sage:parseInt(r.score)>=5?C.gold:C.red} bg={`${parseInt(r.score)>=7?C.sage:parseInt(r.score)>=5?C.gold:C.red}22`}>{r.score}/10</Chip>}
            </div>
            {r.next&&<div style={{fontFamily:FB,fontSize:12,color:C.textDim,whiteSpace:"pre-line",lineHeight:1.5}}>{r.next}</div>}
          </Card>
        ))}
      </>}
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
function Dashboard(){
  const [data,setRaw]=useState(load);
  const [tab,setTab]=useState("accueil");

  const setData=useCallback(upd=>{
    setRaw(prev=>{ const next=typeof upd==="function"?upd(prev):upd; persist(next); return next; });
  },[]);

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:F,maxWidth:480,margin:"0 auto",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:${C.mint};border-radius:3px;}
        select option{background:#fff;}
        textarea{font-family:'Nunito',system-ui,sans-serif!important;}
        input[type=range]{accent-color:${C.sage};cursor:pointer;width:100%;}
        input[type=time]::-webkit-calendar-picker-indicator{filter:invert(.3);cursor:pointer;}
        button:active{transform:scale(0.97);}
        ::placeholder{color:${C.textMut}!important;}
        body{background:${C.bg};}
      `}</style>

      {tab==="accueil"      &&<Accueil data={data}/>}
      {tab==="prieres"      &&<Prieres data={data} setData={setData}/>}
      {tab==="fitness"      &&<Fitness data={data} setData={setData}/>}
      {tab==="alimentation" &&<Alimentation data={data} setData={setData}/>}
      {tab==="poids"        &&<Poids data={data} setData={setData}/>}
      {tab==="apprendre"    &&<Apprendre data={data} setData={setData}/>}
      {tab==="routine"      &&<Routine data={data} setData={setData}/>}
      {tab==="objectifs"    &&<Objectifs data={data} setData={setData}/>}
      {tab==="finances"     &&<Finances data={data} setData={setData}/>}
      {tab==="bienetre"     &&<Bienetre data={data} setData={setData}/>}
      {tab==="semaine"      &&<Semaine data={data} setData={setData}/>}

      <BottomNav tab={tab} setTab={setTab}/>
    </div>
  );
}

export default function App(){
  const [unlocked, setUnlocked] = useState(!!sessionStorage.getItem("mama_os_auth"));
  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  return <Dashboard />;
}
