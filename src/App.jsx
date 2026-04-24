import { useState, useEffect } from "react";

/* ─── Sketchy SVG Icons ─── */
const SI = ({ children, size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <defs><filter id="sk"><feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="n" seed="2" /><feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G" /></filter></defs>
    <g filter="url(#sk)">{children}</g>
  </svg>
);

const Icons = {
  swords: (c) => <SI color={c}><path d="M3 21l5-5m0 0l2.5-8L18 3l-5 7.5L5 13l3 3z" /><path d="M14.5 9.5l-5 5" /><path d="M21 3l-5 7.5" strokeWidth="1.4" /><line x1="17" y1="11" x2="20" y2="14" strokeWidth="1.5" /><line x1="11" y1="17" x2="14" y2="20" strokeWidth="1.5" /></SI>,
  sparkle: (c) => <SI color={c}><path d="M12 2c0 4-2.5 6.5-6 7 3.5.5 6 3 6 7 0-4 2.5-6.5 6-7-3.5-.5-6-3-6-7z" strokeWidth="1.6" /><path d="M5 15c0 1.8-1.2 3-2.8 3.2 1.6.2 2.8 1.4 2.8 3.2 0-1.8 1.2-3 2.8-3.2C6.2 18 5 16.8 5 15z" strokeWidth="1.4" /></SI>,
  shield: (c) => <SI color={c}><path d="M12 3L4 7v4c0 5.5 3.4 9.3 8 11 4.6-1.7 8-5.5 8-11V7l-8-4z" strokeWidth="1.6" /><path d="M9 12l2 2 4-4" strokeWidth="2" /></SI>,
  wind: (c) => <SI color={c}><path d="M3 8h10a3 3 0 100-3" strokeWidth="1.8" /><path d="M4 14h12a3 3 0 110 3" strokeWidth="1.6" /><path d="M2 11h7" strokeWidth="1.5" /></SI>,
  handshake: (c) => <SI color={c}><path d="M7 11l3-3 4 1 3-3" strokeWidth="1.8" /><path d="M3 7l3 3" strokeWidth="1.6" /><path d="M21 7l-3 3" strokeWidth="1.6" /><path d="M10 14l-2 2" strokeWidth="1.6" /><path d="M13 12l-1 4" strokeWidth="1.4" /><path d="M17 11l-4 4" strokeWidth="1.5" /></SI>,
  hourglass: (c) => <SI color={c}><path d="M6 2h12M6 22h12" strokeWidth="2" /><path d="M7 2v4c0 2 2 4 5 5-3 1-5 3-5 5v4" strokeWidth="1.6" /><path d="M17 2v4c0 2-2 4-5 5 3 1 5 3 5 5v4" strokeWidth="1.6" /><circle cx="12" cy="16" r="1" fill={c} stroke="none" /></SI>,
  potion: (c) => <SI color={c}><path d="M9 2h6M10 2v5l-5 8c-.6 1-.2 3 2 3h10c2.2 0 2.6-2 2-3l-5-8V2" strokeWidth="1.6" /><path d="M8.5 15h7" strokeWidth="1.3" /><circle cx="12" cy="17" r="0.8" fill={c} stroke="none" /></SI>,
  run: (c) => <SI color={c}><circle cx="14" cy="4" r="2" strokeWidth="1.6" /><path d="M7 22l3-7 3 2v7" strokeWidth="1.7" /><path d="M10 15l-2-3 5-4 3 1 3-2" strokeWidth="1.7" /></SI>,
  hide: (c) => <SI color={c}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" strokeWidth="1.6" /><line x1="4" y1="4" x2="20" y2="20" strokeWidth="2.2" /></SI>,
  dagger: (c) => <SI color={c}><path d="M12 2l2 12-2 2-2-2 2-12z" strokeWidth="1.5" /><path d="M8 14h8" strokeWidth="1.8" /><path d="M12 16v6" strokeWidth="1.8" /><path d="M10 22h4" strokeWidth="1.8" /></SI>,
  lightning: (c) => <SI color={c}><path d="M13 2L4 14h7l-2 8 10-12h-7l2-8z" strokeWidth="1.6" fill={c} fillOpacity="0.08" /></SI>,
  hand: (c) => <SI color={c}><path d="M8 13V6c0-1 .7-2 1.8-2s1.7 1 1.7 2v5" strokeWidth="1.5" /><path d="M11.5 9V5c0-1 .7-2 1.8-2s1.7 1 1.7 2v6" strokeWidth="1.5" /><path d="M15 10V7c0-1 .7-2 1.8-2S18.5 6 18.5 7v7c0 4-2.5 7-6.5 7-3 0-5-1.5-6.5-4l-1.5-3c-.5-1 0-2 1-2.2 1-.2 1.8.3 2.2 1.2l.8 1.5" strokeWidth="1.5" /></SI>,
  speech: (c) => <SI color={c}><path d="M4 5h16a1 1 0 011 1v9a1 1 0 01-1 1H8l-4 4V6a1 1 0 011-1z" strokeWidth="1.6" /><path d="M8 10h1" strokeWidth="2.5" /><path d="M12 10h1" strokeWidth="2.5" /><path d="M16 10h1" strokeWidth="2.5" /></SI>,
  brain: (c) => <SI color={c}><path d="M12 2C8 2 5 5 5 8c0 2 1 3.5 2 4.5L12 22l5-9.5c1-1 2-2.5 2-4.5 0-3-3-6-7-6z" strokeWidth="1.5" /><path d="M8.5 7c1-1 2.5-1.5 3.5-1" strokeWidth="1.3" /><path d="M9 10c.8.8 2 1.2 3 1" strokeWidth="1.3" /><path d="M14 7.5c.6.5.8 1.3.5 2" strokeWidth="1.3" /></SI>,
  wand: (c) => <SI color={c}><path d="M15 4l5 5-12 12-5-5z" strokeWidth="1.5" /><path d="M3 21l2-2" strokeWidth="2" /><path d="M14 3l1-1 7 7-1 1" strokeWidth="1.4" /><path d="M9 5l1.5 1.5M5 9l1.5 1.5M7 5l1 1" strokeWidth="1.3" opacity="0.5" /></SI>,
  magehand: (c) => <SI color={c}><path d="M12 18c-3 0-5-2-5-5l1-5 2 1v3" strokeWidth="1.4" /><path d="M10 9V5.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V9" strokeWidth="1.4" /><path d="M13 8V5c0-.8.7-1.5 1.5-1.5S16 4.2 16 5v4" strokeWidth="1.4" /><path d="M16 9V6.5c0-.8.5-1.5 1.2-1.5s1.3.7 1.3 1.5V12c0 3.5-2.5 6-6.5 6" strokeWidth="1.4" /><path d="M8 17l-2 2m-1.5-1l3 3" strokeWidth="1.2" opacity="0.4" /><path d="M18 17l2 2m-3 0l3-3" strokeWidth="1.2" opacity="0.4" /></SI>,
  charm: (c) => <SI color={c}><circle cx="12" cy="12" r="9" strokeWidth="1.4" /><circle cx="9" cy="10" r="1.5" strokeWidth="1.3" /><circle cx="15" cy="10" r="1.5" strokeWidth="1.3" /><path d="M8 15c2 2 6 2 8 0" strokeWidth="1.5" /><path d="M3 5l2 2M19 5l-2 2" strokeWidth="1.3" opacity="0.5" /></SI>,
  shieldSpell: (c) => <SI color={c}><path d="M12 3L4 7v4c0 5.5 3.4 9.3 8 11 4.6-1.7 8-5.5 8-11V7l-8-4z" strokeWidth="1.5" /><path d="M8 10h8M8 13h8" strokeWidth="1.2" strokeDasharray="2 2" /></SI>,
  skull: (c) => <SI color={c}><circle cx="12" cy="10" r="7" strokeWidth="1.5" /><circle cx="9.5" cy="9.5" r="1.8" strokeWidth="1.3" /><circle cx="14.5" cy="9.5" r="1.8" strokeWidth="1.3" /><path d="M10 14l2-1 2 1" strokeWidth="1.4" /><path d="M9 17v4h2v-2h2v2h2v-4" strokeWidth="1.4" /></SI>,
  ghost: (c) => <SI color={c}><path d="M12 2C7 2 4 6 4 10v10l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V10c0-4-3-8-8-8z" strokeWidth="1.5" /><circle cx="9.5" cy="10" r="1.5" strokeWidth="1.3" /><circle cx="14.5" cy="10" r="1.5" strokeWidth="1.3" /></SI>,
  laugh: (c) => <SI color={c}><circle cx="12" cy="12" r="9" strokeWidth="1.5" /><path d="M8 9v1" strokeWidth="2.5" /><path d="M16 9v1" strokeWidth="2.5" /><path d="M8 14c1.5 2.5 4.5 3 6 2" strokeWidth="1.6" /><path d="M8 14h6" strokeWidth="1.3" /></SI>,
  mirror: (c) => <SI color={c}><rect x="3" y="2" width="18" height="14" rx="2" strokeWidth="1.5" /><path d="M7 6l4 3-4 3" strokeWidth="1.6" /><line x1="13" y1="6" x2="17" y2="6" strokeWidth="1.3" /><line x1="13" y1="9" x2="16" y2="9" strokeWidth="1.3" /><path d="M8 20h8M12 16v4" strokeWidth="1.6" /></SI>,
  bow: (c) => <SI color={c}><path d="M5 20C5 10 10 5 20 5" strokeWidth="1.8" fill="none" /><path d="M18 3l2 2-2 2" strokeWidth="1.5" /><line x1="5" y1="20" x2="17" y2="8" strokeWidth="1.3" /><path d="M3 18l4 4" strokeWidth="1.5" /></SI>,
  steadyaim: (c) => <SI color={c}><circle cx="12" cy="12" r="9" strokeWidth="1.4" /><circle cx="12" cy="12" r="5" strokeWidth="1.3" /><circle cx="12" cy="12" r="1.5" fill={c} stroke="none" /><line x1="12" y1="2" x2="12" y2="5" strokeWidth="1.3" /><line x1="12" y1="19" x2="12" y2="22" strokeWidth="1.3" /><line x1="2" y1="12" x2="5" y2="12" strokeWidth="1.3" /><line x1="19" y1="12" x2="22" y2="12" strokeWidth="1.3" /></SI>,
};

/* ─── Data ─── */
const MAX_HP = 28;

const CONDITIONS = [
  { id: "poisoned", label: "Poisoned", effect: "Disadvantage on attacks and ability checks." },
  { id: "prone", label: "Prone", effect: "Disadvantage on attacks. Standing costs half your movement." },
  { id: "restrained", label: "Restrained", effect: "Speed 0. Disadvantage on attacks and DEX saves. Attacks against you have advantage." },
  { id: "frightened", label: "Frightened", effect: "Disadvantage on attacks and checks while you can see the source. Can't move closer to it." },
  { id: "blinded", label: "Blinded", effect: "Auto-fail sight checks. Attacks have disadvantage. Attacks against you have advantage." },
  { id: "grappled", label: "Grappled", effect: "Speed 0. You can still attack normally." },
  { id: "stunned", label: "Stunned", effect: "Incapacitated. Can't move. Auto-fail STR/DEX saves. Attacks against you have advantage." },
  { id: "paralyzed", label: "Paralyzed", effect: "Incapacitated. Can't move or speak. Hits within 5ft are auto-crits." },
  { id: "invisible", label: "Invisible", effect: "Advantage on attacks. Attacks against you have disadvantage." },
];

const CONC_SPELLS = ["Tasha's Hideous Laughter", "Silent Image", "Invisibility"];

const SPELL_ICONS = { "Mind Sliver":"brain","Prestidigitation":"wand","Mage Hand":"magehand","Charm Person":"charm","Tasha's Hideous Laughter":"laugh","Shield":"shieldSpell","Silent Image":"mirror","Inflict Wounds":"skull","Invisibility":"ghost" };

const ACTIONS = {
  action: [
    { name: "Shortsword", meta: "+6 to hit · 1d6+3 piercing · Finesse, Light", desc: "Vex: on hit, you gain advantage on your next attack against this creature.", tags: ["damage", "sneak attack"], icon: "swords" },
    { name: "Dagger", meta: "+6 to hit · 1d4+3 piercing · Finesse, Light, Thrown 20/60 · Nick", desc: "Nick: this extra attack is part of your Attack action, not your bonus action, freeing your bonus action for Cunning Action every turn.", tags: ["damage", "sneak attack"], icon: "dagger" },
    { name: "Shortbow", meta: "+6 to hit · 1d6+3 piercing · Range 80/320 · Two-Handed", desc: "Your ranged option when melee isn't safe.", tags: ["damage", "sneak attack"], icon: "bow" },
    { name: "Cast a Spell", desc: "Use your action to cast a cantrip or a leveled spell.", tags: ["magic"], icon: "sparkle" },
    { name: "Dodge", desc: "All attacks against you have disadvantage until the start of your next turn.", tags: ["defense"], icon: "shield" },
    { name: "Disengage", desc: "Your movement doesn't provoke opportunity attacks this turn. Usually better as Cunning Action.", tags: ["movement"], icon: "wind" },
    { name: "Help", desc: "Give an ally advantage on their next attack roll or ability check.", tags: ["support"], icon: "handshake" },
    { name: "Ready", desc: "Prepare an action with a trigger condition. Uses your reaction when triggered.", tags: ["tactical"], icon: "hourglass" },
    { name: "Use an Object", desc: "Use a potion, specialty arrow, oil flask, or other item.", tags: ["utility"], icon: "potion" },
  ],
  bonusAction: [
    { name: "Cunning Action: Dash", desc: "Double your movement speed this turn. Great for closing distance or fleeing.", tags: ["movement"], icon: "run" },
    { name: "Cunning Action: Disengage", desc: "Move freely without provoking opportunity attacks. Your go-to after a melee hit-and-run.", tags: ["movement", "defense"], icon: "wind" },
    { name: "Cunning Action: Hide", desc: "Make a Stealth check to become hidden. Attacking while hidden gives advantage, which guarantees Sneak Attack.", tags: ["stealth", "sneak attack"], icon: "hide" },
    { name: "Steady Aim", desc: "Give yourself advantage on your next attack this turn. You must not have moved yet, and your speed becomes 0. Fallback when you can't Hide.", tags: ["damage", "sneak attack"], icon: "steadyaim" },
  ],
  reaction: [
    { name: "Uncanny Dodge", desc: "When an attack you can see hits you, halve the damage. Free — no resource cost, just your reaction.", tags: ["defense"], icon: "lightning" },
    { name: "Shield (spell)", meta: "+5 AC · Reaction · 1 round · Costs 1st-level slot", desc: "Gain +5 AC until the start of your next turn, including against the triggering attack. Your AC becomes 20.", tags: ["defense", "magic"], icon: "shieldSpell" },
    { name: "Opportunity Attack", desc: "Strike a target that leaves your reach. This can trigger Sneak Attack since it's a different turn than yours.", tags: ["damage", "sneak attack"], icon: "swords" },
    { name: "Readied Action", desc: "Execute the action you prepared earlier when your trigger condition is met.", tags: ["tactical"], icon: "hourglass" },
  ],
  freeActions: [
    { name: "Object Interaction", desc: "Draw or sheathe a weapon, open a door, pick something up. One per turn, no action cost.", icon: "hand" },
    { name: "Communicate", desc: "Speak a few words, shout a warning, or signal in Thieves' Cant. You speak Common, Elvish, Undercommon, and Common Sign Language.", icon: "speech" },
  ],
};

const SPELLS = {
  cantrips: [
    { name: "Mind Sliver", desc: "Target makes an INT save or takes 2d6 psychic damage and subtracts 1d4 from their next saving throw. Verbal only, 60 feet.", school: "Enchantment", meta: "INT save · DC 13" },
    { name: "Prestidigitation", desc: "Small sensory tricks — light a candle, clean your clothes, warm a drink, create a tiny trinket.", school: "Transmutation", meta: "10 feet · 1 hour" },
    { name: "Mage Hand", desc: "Conjure an invisible hand you control as a bonus action. Through Legerdemain, you can pickpocket, plant items, or use Thieves' Tools at 30 feet.", school: "Conjuration", meta: "30 feet · 1 minute" },
  ],
  level1: [
    { name: "Charm Person", desc: "Target regards you as a friendly acquaintance for 1 hour. They have advantage on the save if you're currently fighting them.", school: "Enchantment", meta: "WIS save · DC 13 · 30 feet" },
    { name: "Tasha's Hideous Laughter", desc: "Target falls Prone and becomes Incapacitated with laughter. They repeat the save at the end of each turn or when they take damage.", school: "Enchantment", concentration: true, meta: "WIS save · DC 13 · 30 feet" },
    { name: "Shield", desc: "React when you're hit — gain +5 AC until the start of your next turn, including against the triggering attack. Your AC goes from 15 to 20.", school: "Abjuration", reaction: true, meta: "Reaction · 1 round" },
    { name: "Silent Image", desc: "Create a 15-foot cube visual illusion — fake walls, phantom creatures, illusory cover. You can move it with your action.", school: "Illusion", concentration: true, meta: "60 feet · 10 minutes" },
    { name: "Inflict Wounds", desc: "Melee spell attack dealing 3d10 necrotic damage. Your hardest-hitting single-target option. Free once per long rest from Shadow Touched.", school: "Necromancy", shadowTouched: true, meta: "Spell attack +5 · Touch" },
  ],
  level2: [
    { name: "Invisibility", desc: "You or a creature you touch becomes invisible for up to 1 hour. Ends when the target attacks or casts a spell. Free once per long rest from Shadow Touched.", school: "Illusion", concentration: true, shadowTouched: true, meta: "Touch · 1 hour" },
  ],
};

const CUNNING_STRIKES = [
  { name: "Poison", cost: "1d6", save: "DC 14 CON", desc: "Apply a toxin on hit. The target becomes Poisoned for 1 minute, repeating the save at the end of each turn. Requires your Poisoner's Kit." },
  { name: "Trip", cost: "1d6", save: "DC 14 DEX", desc: "Sweep their legs. On a failed save, the target falls Prone — giving your melee allies advantage on their attacks." },
  { name: "Withdraw", cost: "1d6", save: "None", desc: "Slip away after striking. Move up to half your speed without provoking opportunity attacks. This works even if Steady Aim set your speed to 0." },
];

const SIT_OPTIONS = {
  enemyDistance: [{ label: "Melee", value: "melee" },{ label: "Close (10–30ft)", value: "close" },{ label: "Far (30ft+)", value: "far" }],
  allyNearEnemy: [{ label: "Yes", value: true },{ label: "No", value: false }],
  enemyCount: [{ label: "None", value: "none" },{ label: "One", value: "one" },{ label: "Several", value: "many" }],
  hidden: [{ label: "Yes", value: true },{ label: "No", value: false }],
  hasReaction: [{ label: "No", value: true },{ label: "Yes", value: false }],
};

/* ─── Planner ─── */
function generatePlan(sit, hp, tempHp, conds, conc) {
  const plan = { action: null, bonus: null, reaction: null, notes: [], priority: "", cunning: null };
  const hasSA = sit.allyNearEnemy || sit.hidden;
  const totalHp = hp + tempHp;
  const hpPct = hp / MAX_HP;
  const hpLevel = hpPct <= 0.25 ? "low" : hpPct <= 0.75 ? "mid" : "high";

  const isPoisoned = conds.includes("poisoned");
  const isProne = conds.includes("prone");
  const isRestrained = conds.includes("restrained");
  const isFrightened = conds.includes("frightened");
  const isBlinded = conds.includes("blinded");
  const isGrappled = conds.includes("grappled");
  const isStunned = conds.includes("stunned");
  const isParalyzed = conds.includes("paralyzed");
  const isInvisible = conds.includes("invisible");
  const hasDisadvantage = isPoisoned || isRestrained || isFrightened || isBlinded;
  const isIncapacitated = isStunned || isParalyzed;

  // Incapacitated — can't take actions
  if (isIncapacitated) {
    plan.priority = "SURVIVE";
    plan.notes.push(isParalyzed
      ? "You're Paralyzed — you can't take any actions, move, or speak. Hits within 5 feet auto-crit. Your allies need to help you."
      : "You're Stunned — you can't take any actions or move. Attacks against you have advantage. Hold on until this ends.");
    plan.reaction = "You can't use reactions while incapacitated.";
    return plan;
  }

  // Condition warnings
  if (isProne) plan.notes.push("You're Prone — standing up costs 15 feet of movement. Your melee attacks have disadvantage until you stand. Ranged attacks against you have disadvantage, but melee attacks have advantage.");
  if (isPoisoned) plan.notes.push("You're Poisoned — disadvantage on all attack rolls and ability checks. Consider retreating or curing it if possible.");
  if (isRestrained) plan.notes.push("You're Restrained — speed is 0, attacks have disadvantage, DEX saves have disadvantage, and attacks against you have advantage. Breaking free should be a priority.");
  if (isFrightened) plan.notes.push("You're Frightened — disadvantage on attacks and checks while the source is in sight, and you can't willingly move closer to it.");
  if (isBlinded) plan.notes.push("You're Blinded — attacks have disadvantage and attacks against you have advantage. You can't see, so you can't use Uncanny Dodge.");
  if (isGrappled) plan.notes.push("You're Grappled — speed is 0, but you can still attack normally. Use your action to escape (Athletics or Acrobatics) or just attack if the situation is right.");
  if (isInvisible) plan.notes.push("You're Invisible — your attacks have advantage (guaranteeing Sneak Attack), and attacks against you have disadvantage. Attacking or casting ends it.");
  if (conc) plan.notes.push(`You're concentrating on ${conc}. Taking damage means a CON save (DC = half damage taken, min 10). Avoid getting hit or be ready with Shield.`);

  // Derive effective hidden state
  const effectiveHidden = sit.hidden || isInvisible;
  const effectiveSA = sit.allyNearEnemy || effectiveHidden;

  if (hpLevel === "low") {
    plan.priority = "SURVIVE";
    plan.notes.push(`You're at ${hp}/${MAX_HP} HP${tempHp > 0 ? ` (+${tempHp} temp)` : ""} — survival comes first.`);
    if (sit.enemyCount === "none") {
      plan.action = "Use a healing potion or Dodge";
      plan.bonus = "Cunning Action: Hide";
      plan.notes.push("No one nearby — take the breathing room to heal up and get out of sight.");
    } else if (sit.enemyDistance === "melee") {
      if (isProne) { plan.notes.push("Stand up first (15ft), then decide whether to fight or flee."); }
      if (effectiveSA && !hasDisadvantage) {
        plan.action = "Shortsword (Vex) + Dagger (Nick) with Sneak Attack";
        plan.bonus = "Cunning Action: Disengage";
        plan.notes.push("Get your damage in, then Disengage to safety.");
        plan.cunning = "Withdraw lets you escape without using your bonus action — save it for Hide.";
      } else {
        plan.action = hasDisadvantage ? "Disengage (use action, you have disadvantage on attacks anyway)" : "Dodge";
        plan.bonus = "Cunning Action: Dash";
        plan.notes.push(hasDisadvantage ? "With disadvantage on attacks, your damage isn't worth the risk. Get out." : "No Sneak Attack — Dodge and Disengage to escape safely.");
      }
    } else {
      plan.action = "Dash";
      plan.bonus = "Cunning Action: Dash";
      plan.notes.push("Double Dash for 60 feet of distance.");
    }
    if (sit.hasReaction && !isBlinded) plan.reaction = conc ? "Shield (+5 AC → 20) to protect concentration, or Uncanny Dodge to halve a big hit." : "Shield if you have a slot, or Uncanny Dodge (free) to halve a hit.";
    else if (sit.hasReaction && isBlinded) plan.reaction = "Can't use Uncanny Dodge while Blinded (requires seeing the attacker). Shield still works.";
    return plan;
  }

  if (effectiveHidden && !hasDisadvantage) {
    plan.priority = "ALPHA STRIKE";
    plan.notes.push(isInvisible ? "You're Invisible — advantage on attacks and guaranteed Sneak Attack. Attacking will end the invisibility." : "You're hidden — advantage on your first attack, guaranteed Sneak Attack.");
    if (sit.enemyCount === "none") {
      plan.action = "Stay hidden. Ready an attack for when a target enters range.";
      plan.bonus = "Hold stealth";
      plan.notes.push("Perfect ambush position. Don't reveal yourself until you can make it count.");
    } else if (sit.enemyDistance === "melee") {
      plan.action = "Shortsword (Vex) with advantage, then Dagger (Nick) — Sneak Attack on the first hit";
      plan.bonus = "Cunning Action: Disengage, or Hide again if you have cover";
      plan.notes.push("Full combo from stealth. Vex gives advantage on the Nick follow-up too.");
      plan.cunning = "Trip knocks them Prone — great if melee allies haven't attacked yet.";
    } else if (sit.enemyDistance === "close") {
      plan.action = "Move in, then Shortsword (Vex) + Dagger (Nick) with Sneak Attack";
      plan.bonus = "Cunning Action: Disengage to retreat after striking";
    } else {
      plan.action = "Shortbow with advantage — Sneak Attack at range";
      plan.bonus = "Cunning Action: Hide again if you have cover, or Dash to reposition";
      plan.notes.push("Shortbow from stealth. Consider specialty arrows.");
    }
    if (sit.hasReaction) plan.reaction = "Uncanny Dodge if hit, or Opportunity Attack if your target runs.";
    return plan;
  }

  if (effectiveSA && !hasDisadvantage) {
    plan.priority = "DEAL DAMAGE";
    plan.notes.push("Sneak Attack is available.");
    if (sit.enemyCount === "none") {
      plan.action = "Move toward your target. Shortbow if within 80ft, otherwise Dash.";
      plan.bonus = "Cunning Action: Dash or Hide";
    } else if (sit.enemyDistance === "melee") {
      plan.action = "Shortsword (Vex) + Dagger (Nick) — Sneak Attack on the first hit";
      if (sit.enemyCount === "many") {
        plan.bonus = "Cunning Action: Disengage";
        plan.notes.push("Full combo, then Disengage to get clear of the surrounding targets.");
        plan.cunning = "Withdraw saves your bonus action for Hide next turn.";
      } else {
        plan.bonus = "Cunning Action: Hide (if cover nearby) or Disengage";
        plan.notes.push("Vex gives advantage on the Nick attack. Hide to set up advantage for next turn.");
        plan.cunning = "Trip for ally advantage, or Poison if their CON is weak.";
      }
    } else if (sit.enemyDistance === "close") {
      plan.action = "Move in, Shortsword (Vex) + Dagger (Nick) — Sneak Attack";
      plan.bonus = "Cunning Action: Disengage to pull back";
      plan.notes.push("Classic hit-and-run. Nick being free means you always have a bonus action to escape.");
    } else {
      plan.action = "Shortbow — Sneak Attack at range";
      plan.bonus = "Cunning Action: Dash or Hide";
    }
  } else if (hasDisadvantage) {
    plan.priority = "SURVIVE";
    plan.notes.push("You have disadvantage on attacks — focus on curing the condition or getting to safety.");
    if (isRestrained || isGrappled) {
      plan.action = "Try to escape (Acrobatics +3 or Athletics +0) — Acrobatics is your better bet";
      plan.bonus = "Cunning Action: Disengage or Hide after escaping";
      plan.notes.push("Escaping uses your action. If you break free, use Cunning Action to get distance.");
    } else {
      plan.action = isProne ? "Stand up (15ft movement), then Shortsword + Dagger if you can still reach a target" : "Attack if you have Sneak Attack (disadvantage cancels advantage), otherwise Dodge";
      plan.bonus = "Cunning Action: Disengage or Hide";
      plan.notes.push(effectiveSA ? "If an ally is adjacent to your target, you can still Sneak Attack — the disadvantage cancels with the advantage." : "Without advantage to cancel your disadvantage, damage is unreliable. Focus on positioning and curing the condition.");
    }
  } else {
    plan.priority = "ENABLE SNEAK ATTACK";
    plan.notes.push("No ally near target and not hidden — get Sneak Attack online.");
    if (sit.enemyCount === "none") {
      plan.action = "Move toward allies and your target";
      plan.bonus = "Cunning Action: Hide or Dash";
    } else if (sit.enemyDistance === "melee") {
      plan.action = "Shortsword (Vex) + Dagger (Nick) — Vex gives advantage on the Dagger, enabling Sneak Attack";
      plan.bonus = "Steady Aim if you haven't moved (guarantees advantage), or Cunning Action: Hide";
      plan.notes.push("Steady Aim gives advantage but locks you in place. Or lead with Shortsword — Vex advantage applies to the Nick follow-up.");
      if (sit.enemyCount === "many") plan.notes.push("Multiple targets nearby — consider Disengage over Steady Aim.");
      plan.cunning = "Withdraw lets you escape even with 0 speed from Steady Aim.";
    } else {
      plan.action = "Steady Aim + Shortbow (if stationary), or reposition toward an ally";
      plan.bonus = "Steady Aim if staying put, otherwise Cunning Action: Dash";
    }
  }

  if (hpLevel === "mid") plan.notes.push(`At ${hp}/${MAX_HP} HP — keep your reaction ready for Uncanny Dodge or Shield.`);
  if (conc && !plan.notes.some(n => n.includes("concentrating"))) plan.notes.push(`Careful with ${conc} concentration — taking damage forces a CON save.`);

  if (sit.hasReaction) {
    if (isBlinded) {
      plan.reaction = "Can't use Uncanny Dodge (need to see the attacker). Shield still works.";
    } else {
      plan.reaction = hpLevel === "mid"
        ? "Shield (+5 AC) if you expect multiple hits, or Uncanny Dodge (free) to halve a single big hit."
        : "Opportunity Attack if your target runs (can trigger Sneak Attack), or Uncanny Dodge/Shield for big incoming damage.";
    }
  } else {
    plan.reaction = "Already used this round. Be careful with positioning.";
  }
  return plan;
}

/* ─── Theme ─── */
const T = {
  bg:"#baac91",surface:"rgba(255,253,248,0.82)",card:"rgba(250,247,240,0.75)",border:"#C9BDAA",borderDark:"#9E9278",
  glass:{backdropFilter:"blur(16px) saturate(1.4)",WebkitBackdropFilter:"blur(16px) saturate(1.4)"},
  clay:"#6B5238",clayDark:"#4A3625",clayLight:"#8A6B4A",clayFaint:"#6B523815",
  sage:"#3D4E33",sageDark:"#2E3B25",sageFaint:"#3D4E3315",sageBorder:"#3D4E3335",
  indigo:"#4A4662",indigoFaint:"#4A466215",indigoBorder:"#4A466235",
  kiln:"#8C3E22",kilnFaint:"#8C3E2212",kilnBorder:"#8C3E2230",
  ochre:"#7A6220",ochreFaint:"#7A622012",ochreBorder:"#7A622030",
  text:"#2C2721",textMuted:"#504A42",textDim:"#6B6358",
  font:"'Cormorant Garamond','Georgia',serif",
  fontBody:"'DM Sans','Helvetica Neue',sans-serif",
  fontMono:"'DM Mono','Menlo',monospace",
};

/* ─── Components ─── */
const Badge = ({ p }) => {
  const m = {"SURVIVE":{bg:T.kilnFaint,b:T.kilnBorder,c:T.kiln},"ALPHA STRIKE":{bg:T.indigoFaint,b:T.indigoBorder,c:T.indigo},"DEAL DAMAGE":{bg:T.sageFaint,b:T.sageBorder,c:T.sage},"ENABLE SNEAK ATTACK":{bg:T.ochreFaint,b:T.ochreBorder,c:T.ochre}};
  const v = m[p]||m["DEAL DAMAGE"];
  return <span style={{display:"inline-block",padding:"5px 14px",borderRadius:4,background:v.bg,border:`1px solid ${v.b}`,color:v.c,fontSize:10,fontWeight:500,fontFamily:T.fontMono,letterSpacing:1.5,textTransform:"uppercase"}}>{p}</span>;
};
const Chip = ({label,selected,onClick}) => <button onClick={onClick} style={{padding:"4px 12px",borderRadius:14,border:"1px solid",borderColor:selected?T.clay:T.border,background:selected?T.clayFaint:"transparent",color:selected?T.clayDark:T.textMuted,fontFamily:T.fontMono,fontSize:11,fontWeight:selected?500:400,cursor:"pointer",transition:"all 0.15s",lineHeight:1.3}}>{label}</button>;
const CondChip = ({label,active,onClick}) => <button onClick={onClick} style={{padding:"4px 12px",borderRadius:14,border:"1px solid",borderColor:active?T.kiln:T.border,background:active?T.kilnFaint:"transparent",color:active?T.kiln:T.textDim,fontFamily:T.fontMono,fontSize:11,fontWeight:active?500:400,cursor:"pointer",transition:"all 0.15s"}}>{label}</button>;
const Ic = ({k,color}) => { const fn = Icons[k]; return fn ? fn(color) : null; };
const ACard = ({name,icon,desc,meta,hl}) => (
  <div style={{padding:"16px 18px",borderRadius:12,background:hl?T.sageFaint:T.surface,border:`1px solid ${hl?T.sageBorder:T.border}`}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:meta?2:5}}><Ic k={icon} color={hl?T.sage:T.clayLight} /><span style={{fontFamily:T.font,fontSize:16,fontWeight:600,color:hl?T.sageDark:T.text}}>{name}</span></div>
    {meta&&<div style={{fontFamily:T.fontMono,fontSize:11,color:T.textDim,paddingLeft:30,marginBottom:4}}>{meta}</div>}
    <div style={{fontFamily:T.fontBody,fontSize:13,color:T.textMuted,lineHeight:1.6,paddingLeft:30}}>{desc}</div>
  </div>
);
const SCard = ({spell:s}) => (
  <div style={{padding:"16px 18px",borderRadius:12,background:T.surface,border:`1px solid ${T.border}`}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:2}}>
      <Ic k={SPELL_ICONS[s.name]} color={T.indigo} />
      <span style={{fontFamily:T.font,fontSize:16,fontWeight:600,color:T.text,flex:1}}>{s.name}</span>
      <div style={{display:"flex",gap:5,alignItems:"center"}}>
        {s.reaction&&<span style={{fontSize:9,fontWeight:500,color:T.kiln,border:`1px solid ${T.kilnBorder}`,borderRadius:3,padding:"2px 7px",fontFamily:T.fontMono}}>REACTION</span>}
        {s.concentration&&<span style={{fontSize:9,fontWeight:500,color:T.ochre,border:`1px solid ${T.ochreBorder}`,borderRadius:3,padding:"2px 7px",fontFamily:T.fontMono}}>CONC</span>}
        {s.shadowTouched&&<span style={{fontSize:9,fontWeight:500,color:T.indigo,border:`1px solid ${T.indigoBorder}`,borderRadius:3,padding:"2px 7px",fontFamily:T.fontMono}}>1/LR FREE</span>}
      </div>
    </div>
    {s.meta&&<div style={{fontFamily:T.fontMono,fontSize:11,color:T.textDim,paddingLeft:30,marginBottom:4}}>{s.meta}</div>}
    <div style={{fontFamily:T.fontBody,fontSize:13,color:T.textMuted,lineHeight:1.6,paddingLeft:30}}>{s.desc}</div>
  </div>
);
const Tb = ({label,active,onClick,count}) => <button onClick={onClick} style={{padding:"8px 16px",border:"none",borderRadius:8,background:active?T.clayFaint:"transparent",color:active?T.clayDark:T.textDim,fontFamily:T.font,fontSize:15,fontWeight:active?600:400,cursor:"pointer",transition:"all 0.2s",letterSpacing:0.3}}>{label}{count!=null?<sup style={{fontFamily:T.fontMono,fontSize:9,marginLeft:2,opacity:0.55,fontWeight:400}}>{count}</sup>:""}</button>;
const Hint = ({children,bg=T.sageFaint,border=T.sageBorder}) => <div style={{marginTop:16,padding:"14px 16px",borderRadius:10,background:bg,border:`1px solid ${border}`,fontFamily:T.font,fontSize:14,fontStyle:"italic",color:T.textMuted,lineHeight:1.65}}>{children}</div>;

const numInput = {width:52,padding:"6px 8px",borderRadius:8,border:`1px solid ${T.border}`,background:T.surface,color:T.text,fontFamily:T.fontMono,fontSize:16,fontWeight:500,textAlign:"center",outline:"none"};


const AVATAR = "/avatar.png";

const FULL_PORTRAIT = "/portrait.jpg";

/* ─── Persistence ─── */
function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

/* ─── App ─── */
export default function App() {
  const [tab,setTab] = useState("planner");
  const [sit,setSit] = useState({enemyDistance:"melee",allyNearEnemy:true,enemyCount:"one",hidden:false,hasReaction:true});
  const [hp,setHp] = useState(()=>load("hp",28));
  const [tempHp,setTempHp] = useState(()=>load("tempHp",0));
  const [conds,setConds] = useState(()=>load("conds",[]));
  const [conc,setConc] = useState(()=>load("conc",""));
  const [plan,setPlan] = useState(null);
  const [slots,setSlots] = useState(()=>load("slots",{1:3,2:2}));
  const [st,setSt] = useState(()=>load("st",{inflict:false,invis:false}));
  const [anim,setAnim] = useState(false);
  const [rt,setRt] = useState("action");
  const [st2,setSt2] = useState("cantrips");
  const pC = {"Action":T.sage,"Bonus Action":T.indigo,"Reaction":T.kiln};

  useEffect(()=>{const l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap";l.rel="stylesheet";document.head.appendChild(l);},[]);

  const [hitDice,setHitDice] = useState(()=>load("hitDice",5));

  useEffect(()=>save("hp",hp),[hp]);
  useEffect(()=>save("tempHp",tempHp),[tempHp]);
  useEffect(()=>save("conds",conds),[conds]);
  useEffect(()=>save("conc",conc),[conc]);
  useEffect(()=>save("slots",slots),[slots]);
  useEffect(()=>save("st",st),[st]);
  useEffect(()=>save("hitDice",hitDice),[hitDice]);

  const doPlan=()=>{setAnim(true);setTimeout(()=>{setPlan(generatePlan(sit,hp,tempHp,conds,conc));setAnim(false);},300);};
  const useSlot=(lv)=>{if(slots[lv]>0)setSlots(s=>({...s,[lv]:s[lv]-1}));};
  const doShortRest=()=>{setTempHp(0);setConds([]);setConc("");};
  const doLongRest=()=>{setSlots({1:3,2:2});setSt({inflict:false,invis:false});setHp(MAX_HP);setTempHp(0);setConds([]);setConc("");setHitDice(d=>Math.min(5,d+2));};
  const spendHitDie=()=>{if(hitDice>0){const roll=Math.floor(Math.random()*8)+1;setHp(h=>Math.min(MAX_HP,h+roll));setHitDice(d=>d-1);}};
  const toggleCond=(id)=>setConds(c=>c.includes(id)?c.filter(x=>x!==id):[...c,id]);
  const hpPct = hp/MAX_HP;
  const hpColor = hpPct<=0.25?T.kiln:hpPct<=0.75?T.ochre:T.sage;

  const [scrollBlur, setScrollBlur] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const blurAmount = Math.min(12, Math.max(0, (scrollY - 100) / 20));
      setScrollBlur(blurAmount);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{minHeight:"100vh",color:T.text,fontFamily:T.fontBody,position:"relative",background:"#baac91"}}>
      {/* Full portrait background */}
      <div style={{position:"fixed",top:0,left:0,right:0,height:"100vh",zIndex:0,display:"flex",justifyContent:"center",overflow:"hidden"}}>
        <img src={FULL_PORTRAIT} alt="" style={{height:"100%",width:"auto",objectFit:"cover",objectPosition:"top center",filter:`blur(${scrollBlur}px)`,transition:"filter 0.15s ease-out",willChange:"filter"}} />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg, transparent 0%, transparent 30%, rgba(186,172,145,0.3) 50%, rgba(186,172,145,0.75) 70%, rgba(186,172,145,1) 90%)"}} />
      </div>

      <div style={{position:"relative",zIndex:1,maxWidth:620,margin:"0 auto",padding:"0 20px 56px"}}>

        {/* Header — overlaid on portrait */}
        <div style={{paddingTop:280,marginBottom:20,textAlign:"center"}}>
          <h1 style={{margin:0,fontFamily:T.font,fontSize:38,fontWeight:600,color:"#FFFAF2",letterSpacing:1.5,textShadow:"0 1px 3px rgba(30,25,20,0.5), 0 0 20px rgba(30,25,20,0.25)"}}>Wynnie</h1>
          <p style={{margin:"6px 0 0",fontSize:12,color:"rgba(255,250,240,0.85)",fontFamily:T.fontMono,letterSpacing:1.5,textTransform:"uppercase",textShadow:"0 1px 3px rgba(30,25,20,0.45)"}}>Half-Elf Rogue 5 · Arcane Trickster · AC 15</p>
          <div style={{width:40,height:1,background:"rgba(255,250,240,0.35)",margin:"16px auto 0"}}/>
        </div>

        {/* ── MAIN CARD: Tabs + Content ── */}
        <div style={{padding:"16px 20px 24px",borderRadius:14,background:T.surface,border:`1px solid ${T.border}`,...T.glass,marginBottom:24}}>

          {/* Tabs */}
          <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:20}}>
            <Tb label="Plan Turn" active={tab==="planner"} onClick={()=>setTab("planner")} />
            <Tb label="Actions" active={tab==="reference"} onClick={()=>setTab("reference")} />
            <Tb label="Spells" active={tab==="spells"} onClick={()=>setTab("spells")} />
          </div>

          {/* ── PLANNER ── */}
          {tab==="planner"&&(
            <div>
              <div style={{display:"grid",gap:20,marginBottom:28}}>
                {[
                  {key:"enemyDistance",label:"How far is your target?"},
                  {key:"allyNearEnemy",label:"Is there an ally within 5ft of your target?"},
                  {key:"enemyCount",label:"Are there targets near you?"},
                  {key:"hidden",label:"Are you hidden?"},
                  {key:"hasReaction",label:"Have you used a reaction this round yet?"},
                ].map(({key,label})=>(
                  <div key={key}>
                    <div style={{fontSize:13,fontWeight:500,color:T.text,fontFamily:T.fontBody,marginBottom:8}}>{label}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                      {SIT_OPTIONS[key].map(opt=><Chip key={String(opt.value)} label={opt.label} selected={sit[key]===opt.value} onClick={()=>setSit(s=>({...s,[key]:opt.value}))} />)}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={doPlan} style={{width:"100%",padding:"14px 24px",borderRadius:12,border:"1px solid #9AB88E",background:"#B8D4B0",color:"#2E3B25",fontFamily:T.font,fontSize:17,fontWeight:600,cursor:"pointer",letterSpacing:0.5}}>{anim?"Planning...":"Plan My Turn"}</button>

              {plan&&!anim&&(
                <div style={{marginTop:20,padding:20,borderRadius:12,background:"rgba(186,172,145,0.08)",border:`1px solid ${T.border}`,animation:"fadeIn 0.35s ease"}}>
                  <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
                  {[{l:"Action",v:plan.action},{l:"Bonus Action",v:plan.bonus},{l:"Reaction",v:plan.reaction}].map(({l,v})=>v&&(
                    <div key={l} style={{marginBottom:16}}>
                      <div style={{fontSize:10,fontWeight:500,letterSpacing:1.5,color:pC[l],textTransform:"uppercase",fontFamily:T.fontMono,marginBottom:4}}>{l}</div>
                      <div style={{fontFamily:T.font,fontSize:16,color:T.text,lineHeight:1.55}}>{v}</div>
                    </div>
                  ))}
                  <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${T.border}`}}>
                    <div style={{fontSize:10,fontWeight:500,letterSpacing:1.5,color:T.textDim,textTransform:"uppercase",fontFamily:T.fontMono,marginBottom:10}}>Why this plan</div>
                    {plan.notes.map((r,i)=><div key={i} style={{fontFamily:T.fontBody,fontSize:13,color:T.textMuted,lineHeight:1.7,marginBottom:8,paddingLeft:14,borderLeft:`2px solid ${T.border}`}}>{r}</div>)}
                    {plan.cunning&&<div style={{fontFamily:T.fontBody,fontSize:13,color:T.textMuted,lineHeight:1.7,marginBottom:8,paddingLeft:14,borderLeft:`2px solid ${T.border}`}}><strong style={{color:T.text,fontWeight:500}}>Cunning Strike:</strong> {plan.cunning}</div>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ACTIONS ── */}
          {tab==="reference"&&(
            <div>
              <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:16}}>
                {[{k:"action",l:"Actions",c:ACTIONS.action.length},{k:"bonusAction",l:"Bonus",c:ACTIONS.bonusAction.length},{k:"reaction",l:"Reactions",c:ACTIONS.reaction.length},{k:"free",l:"Free",c:ACTIONS.freeActions.length}].map(({k,l,c})=><Tb key={k} label={l} active={rt===k} onClick={()=>setRt(k)} count={c} />)}
              </div>
              <div style={{display:"grid",gap:8}}>
                {(rt==="free"?ACTIONS.freeActions:ACTIONS[rt])?.map((a,i)=><ACard key={i} name={a.name} icon={a.icon} meta={a.meta} desc={a.desc} hl={a.tags?.includes("sneak attack")} />)}
              </div>
              {rt==="action"&&(
                <>
                  <div style={{marginTop:20,marginBottom:8}}>
                    <div style={{fontSize:11,fontWeight:500,color:T.ochre,fontFamily:T.fontMono,letterSpacing:1,textTransform:"uppercase"}}>Cunning Strike</div>
                    <div style={{fontFamily:T.fontBody,fontSize:12,color:T.textDim,marginTop:2,marginBottom:10}}>Trade Sneak Attack dice for an effect. DC is 14. You choose before rolling damage.</div>
                  </div>
                  {CUNNING_STRIKES.map((cs,i)=>(
                    <div key={i} style={{padding:"12px 16px",borderRadius:10,background:"rgba(186,172,145,0.08)",border:`1px solid ${T.border}`,marginBottom:6}}>
                      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:3}}>
                        <span style={{fontFamily:T.font,fontSize:15,fontWeight:600,color:T.text}}>{cs.name}</span>
                        <span style={{fontSize:10,color:T.ochre,fontFamily:T.fontMono,background:T.ochreFaint,padding:"1px 6px",borderRadius:3}}>−{cs.cost}</span>
                        <span style={{fontSize:10,color:T.textDim,fontFamily:T.fontMono}}>{cs.save}</span>
                      </div>
                      <div style={{fontFamily:T.fontBody,fontSize:13,color:T.textMuted,lineHeight:1.55}}>{cs.desc}</div>
                    </div>
                  ))}
                </>
              )}
              {rt==="bonusAction"&&<Hint>Because Nick makes the Dagger attack part of your Attack action, your bonus action is almost always free for Cunning Action. This is the core of your action economy.</Hint>}
              {rt==="reaction"&&<Hint>You get one reaction per round. Shield costs a spell slot but protects against every attack until your next turn. Uncanny Dodge is free but only halves one hit. Choose based on how many attacks are coming.</Hint>}
            </div>
          )}

          {/* ── SPELLS ── */}
          {tab==="spells"&&(
            <div>
              <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:16}}>
                {[{k:"cantrips",l:"Cantrips",c:SPELLS.cantrips.length},{k:"level1",l:"1st Level",c:SPELLS.level1.length},{k:"level2",l:"2nd Level",c:SPELLS.level2.length}].map(({k,l,c})=><Tb key={k} label={l} active={st2===k} onClick={()=>setSt2(k)} count={c} />)}
              </div>
              {st2==="cantrips"&&(
                <div>
                  <div style={{display:"grid",gap:8}}>{SPELLS.cantrips.map((s,i)=><SCard key={i} spell={s} />)}</div>
                  <Hint bg={T.indigoFaint} border={T.indigoBorder}>Mind Sliver subtracts 1d4 from the target's next save — cast it the turn before Tasha's Hideous Laughter for a much harder WIS save to beat.</Hint>
                </div>
              )}
              {st2==="level1"&&(
                <div>
                  <div style={{fontSize:11,fontWeight:500,color:T.indigo,fontFamily:T.fontMono,letterSpacing:1,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{opacity:0.6}}>{slots[1]} of 3 slots remaining</span>
                  </div>
                  <div style={{display:"grid",gap:8}}>{SPELLS.level1.map((s,i)=><SCard key={i} spell={s} />)}</div>
                  <Hint bg={T.indigoFaint} border={T.indigoBorder}>Shield is your best defensive reaction — it bumps your AC to 20 until your next turn. Save at least one slot for it if you expect to take hits.</Hint>
                </div>
              )}
              {st2==="level2"&&(
                <div>
                  <div style={{fontSize:11,fontWeight:500,color:T.indigo,fontFamily:T.fontMono,letterSpacing:1,marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
                    <span style={{opacity:0.6}}>{slots[2]} of 2 slots remaining</span>
                  </div>
                  <div style={{display:"grid",gap:8}}>{SPELLS.level2.map((s,i)=><SCard key={i} spell={s} />)}</div>
                  <Hint bg={T.indigoFaint} border={T.indigoBorder}>Cast Invisibility before combat for a guaranteed alpha strike. Shadow Touched gives you one free cast per long rest — save your slots for Shield and Tasha's.</Hint>
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── HP & STATUS ── */}
        <div style={{padding:"16px 20px",borderRadius:12,background:T.surface,border:`1px solid ${T.border}`,...T.glass,marginTop:24,marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:11,color:T.textDim,fontFamily:T.fontMono,fontWeight:500,letterSpacing:1,textTransform:"uppercase"}}>HP</span>
              <input type="number" value={hp} onChange={e=>setHp(Math.max(0,Math.min(MAX_HP,+e.target.value||0)))} style={{...numInput,color:hpColor,borderColor:hpPct<=0.25?T.kilnBorder:T.border}} />
              <span style={{fontSize:14,color:T.textDim,fontFamily:T.fontMono}}>/ {MAX_HP}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:11,color:T.textDim,fontFamily:T.fontMono,fontWeight:500,letterSpacing:1,textTransform:"uppercase"}}>Temp</span>
              <input type="number" value={tempHp} onChange={e=>setTempHp(Math.max(0,+e.target.value||0))} style={{...numInput,width:44}} />
            </div>
            <div style={{flex:1,height:6,borderRadius:3,background:T.border,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${Math.min(100,(totalHp=>totalHp/MAX_HP*100)(hp+tempHp))}%`,borderRadius:3,background:hpColor,transition:"all 0.3s"}}/>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{fontSize:11,color:T.textDim,fontFamily:T.fontMono,fontWeight:500,letterSpacing:1,textTransform:"uppercase",minWidth:50}}>Conc.</span>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {CONC_SPELLS.map(s=>(
                <button key={s} onClick={()=>setConc(c=>c===s?"":s)} style={{
                  padding:"3px 10px",borderRadius:12,fontSize:11,fontFamily:T.fontMono,cursor:"pointer",border:`1px solid ${conc===s?T.ochreBorder:T.border}`,
                  background:conc===s?T.ochreFaint:"transparent",color:conc===s?T.ochre:T.textDim,fontWeight:conc===s?500:400,transition:"all 0.15s",
                }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
            <span style={{fontSize:11,color:T.textDim,fontFamily:T.fontMono,fontWeight:500,letterSpacing:1,textTransform:"uppercase",minWidth:50,paddingTop:4}}>Status</span>
            <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
              {CONDITIONS.map(c=><CondChip key={c.id} label={c.label} active={conds.includes(c.id)} onClick={()=>toggleCond(c.id)} />)}
            </div>
          </div>
        </div>

        {/* ── RESOURCES ── */}
        <div style={{display:"flex",flexDirection:"column",gap:10,padding:"14px 20px",borderRadius:12,background:T.surface,border:`1px solid ${T.border}`,...T.glass,marginBottom:12}}>
          {[{lv:1,max:3,label:"1st-level"},{lv:2,max:2,label:"2nd-level"}].map(({lv,max,label})=>(
            <div key={lv} style={{display:"flex",alignItems:"center",gap:14}}>
              <span style={{fontSize:11,color:T.textDim,fontFamily:T.fontMono,fontWeight:500,letterSpacing:1,textTransform:"uppercase",minWidth:80}}>{label}</span>
              <div style={{display:"flex",gap:8}}>
                {Array.from({length:max},(_,i)=><button key={i} onClick={()=>useSlot(lv)} style={{width:22,height:22,borderRadius:"50%",border:`1.5px solid ${i<slots[lv]?T.indigo:T.border}`,background:i<slots[lv]?T.indigoFaint:"transparent",cursor:i<slots[lv]?"pointer":"default",transition:"all 0.2s"}}/>)}
              </div>
            </div>
          ))}
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{fontSize:11,color:T.textDim,fontFamily:T.fontMono,fontWeight:500,letterSpacing:1,textTransform:"uppercase",minWidth:80}}>Shadow</span>
            <div style={{display:"flex",gap:8}}>
              {[{k:"inflict",l:"Inflict Wounds"},{k:"invis",l:"Invisibility"}].map(({k,l})=>(
                <button key={k} onClick={()=>!st[k]&&setSt(s=>({...s,[k]:true}))} style={{padding:"3px 10px",borderRadius:12,border:`1px solid ${st[k]?T.border:T.indigoBorder}`,background:st[k]?"transparent":T.indigoFaint,color:st[k]?T.textDim:T.indigo,fontSize:11,fontFamily:T.fontMono,cursor:st[k]?"default":"pointer",textDecoration:st[k]?"line-through":"none",opacity:st[k]?0.5:1}}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── REST ── */}
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 20px",borderRadius:12,background:T.surface,border:`1px solid ${T.border}`,...T.glass,marginBottom:24}}>
          <button onClick={doShortRest} style={{flex:1,padding:"10px 16px",borderRadius:10,border:"1px solid #9AB88E",background:"#B8D4B0",color:"#2E3B25",fontFamily:T.font,fontSize:15,fontWeight:600,cursor:"pointer",transition:"all 0.2s",letterSpacing:0.3}}>Short Rest</button>
          <button onClick={doLongRest} style={{flex:1,padding:"10px 16px",borderRadius:10,border:"1px solid #9AB88E",background:"#B8D4B0",color:"#2E3B25",fontFamily:T.font,fontSize:15,fontWeight:600,cursor:"pointer",transition:"all 0.2s",letterSpacing:0.3}}>Long Rest</button>
          <div style={{display:"flex",alignItems:"center",gap:8,marginLeft:8}}>
            <span style={{fontSize:11,color:T.textDim,fontFamily:T.fontMono,fontWeight:500,letterSpacing:0.5}}>Hit Dice</span>
            <div style={{display:"flex",gap:4}}>
              {Array.from({length:5},(_,i)=><button key={i} onClick={spendHitDie} style={{width:18,height:18,borderRadius:4,border:`1.5px solid ${i<hitDice?T.clay:T.border}`,background:i<hitDice?T.clayFaint:"transparent",cursor:i<hitDice?"pointer":"default",transition:"all 0.2s",fontSize:0}}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
