/**
 * Hold Steel! - Stages 1 to 10 Official Progression
 * Designed with pure standard (original) Move-To-Front mechanics.
 * Scaling from 3 steel plates up to 7 steel plates.
 */

export interface StageDef {
  stageNumber: number;
  name: string;
  bars: number;
  initialRack: number[];
  targetBlueprint: number[];
  parMoves: number;
  solution: number[];
  levelString: string;
  lockedIds?: number[];
  releaseSlots?: number[];
  timedLocks?: Record<number, number>;
  hint?: string;
}

export const STAGES_1_TO_10: StageDef[] = [
  // STAGE 1: 3 Bars - Par 1 (Tutorial introduction to Move-To-Front)
  {
    stageNumber: 1,
    name: "First Alignment",
    bars: 3,
    initialRack: [1, 2, 0], // Cobalt Alloy (#1), Emerald Chrome (#2), Crimson Steel (#0)
    targetBlueprint: [0, 1, 2], // Crimson Steel (#0), Cobalt Alloy (#1), Emerald Chrome (#2)
    parMoves: 1,
    solution: [0], // Click Crimson Steel (#0) to pull it to top
    levelString: "HS1|OBJ:PLAY|R:S1,S2,S0|T:0,1,2|P:1|A:0",
    hint: "Click Crimson Steel at the bottom to pull it to the top.",
  },

  // STAGE 2: 3 Bars - Par 2 (The MTF Inversion: Re-order bottom two)
  {
    stageNumber: 2,
    name: "The Pivot",
    bars: 3,
    initialRack: [1, 2, 0], // Cobalt Alloy (#1), Emerald Chrome (#2), Crimson Steel (#0)
    targetBlueprint: [0, 2, 1], // Crimson Steel (#0), Emerald Chrome (#2), Cobalt Alloy (#1)
    parMoves: 2,
    solution: [2, 0], // Click Emerald (2), then Crimson (0)
    levelString: "HS1|OBJ:PLAY|R:S1,S2,S0|T:0,2,1|P:2|A:2,0",
    hint: "To place Emerald above Cobalt, pull Emerald to the top first, then pull Crimson.",
  },

  // STAGE 3: 4 Bars - Par 2 (Introducing 4th bar: Brass Ingot)
  {
    stageNumber: 3,
    name: "Quad Alignment",
    bars: 4,
    initialRack: [2, 3, 1, 0], // Emerald, Brass, Cobalt, Crimson
    targetBlueprint: [3, 0, 2, 1], // Brass, Crimson, Emerald, Cobalt
    parMoves: 2,
    solution: [0, 3], // Click Crimson (0), then Brass (3)
    levelString: "HS1|OBJ:PLAY|R:S2,S3,S1,S0|T:3,0,2,1|P:2|A:0,3",
    hint: "Brass Ingot must end on top. Set Crimson in position before locking Brass.",
  },

  // STAGE 4: 4 Bars - Par 3 (Master 4-bar puzzle)
  {
    stageNumber: 4,
    name: "Counterweight",
    bars: 4,
    initialRack: [2, 3, 1, 0], // Emerald, Brass, Cobalt, Crimson
    targetBlueprint: [0, 2, 1, 3], // Crimson, Emerald, Cobalt, Brass
    parMoves: 3,
    solution: [1, 2, 0], // Click Cobalt (1), then Emerald (2), then Crimson (0)
    levelString: "HS1|OBJ:PLAY|R:S2,S3,S1,S0|T:0,2,1,3|P:3|A:1,2,0",
    hint: "A 3-step sequence. Cycle Cobalt and Emerald to position them above Brass.",
  },

  // STAGE 5: 5 Bars - Par 3 (Introducing 5th bar: Titanium Violet)
  {
    stageNumber: 5,
    name: "Penta Core",
    bars: 5,
    initialRack: [2, 4, 3, 1, 0], // Emerald, Titanium, Brass, Cobalt, Crimson
    targetBlueprint: [0, 3, 4, 2, 1], // Crimson, Brass, Titanium, Emerald, Cobalt
    parMoves: 3,
    solution: [4, 3, 0], // Click Titanium (4), then Brass (3), then Crimson (0)
    levelString: "HS1|OBJ:PLAY|R:S2,S4,S3,S1,S0|T:0,3,4,2,1|P:3|A:4,3,0",
    hint: "Titanium Violet has entered the stack. Chain your moves to dock the top 3.",
  },

  // STAGE 6: 5 Bars - Par 4 (Full 5-bar sequence)
  {
    stageNumber: 6,
    name: "Titanium Sequence",
    bars: 5,
    initialRack: [2, 4, 3, 1, 0], // Emerald, Titanium, Brass, Cobalt, Crimson
    targetBlueprint: [1, 3, 0, 4, 2], // Cobalt, Brass, Crimson, Titanium, Emerald
    parMoves: 4,
    solution: [4, 0, 3, 1], // Click Titanium (4), then Crimson (0), then Brass (3), then Cobalt (1)
    levelString: "HS1|OBJ:PLAY|R:S2,S4,S3,S1,S0|T:1,3,0,4,2|P:4|A:4,0,3,1",
    hint: "Requires 4 precise moves. Plan backward from the target blueprint order.",
  },

  // STAGE 7: 6 Bars - Par 4 (Introducing 6th bar: Tungsten Cyan)
  {
    stageNumber: 7,
    name: "Hexa Lattice",
    bars: 6,
    initialRack: [4, 3, 5, 1, 2, 0], // Titanium, Brass, Tungsten, Cobalt, Emerald, Crimson
    targetBlueprint: [0, 4, 5, 1, 3, 2], // Crimson, Titanium, Tungsten, Cobalt, Brass, Emerald
    parMoves: 4,
    solution: [1, 5, 4, 0], // Click Cobalt (1), then Tungsten (5), then Titanium (4), then Crimson (0)
    levelString: "HS1|OBJ:PLAY|R:S4,S3,S5,S1,S2,S0|T:0,4,5,1,3,2|P:4|A:1,5,4,0",
    hint: "Tungsten Cyan joins the stack. Shift lower alloys before locking the top.",
  },

  // STAGE 8: 6 Bars - Par 5 (Master 6-bar puzzle)
  {
    stageNumber: 8,
    name: "Tungsten Shift",
    bars: 6,
    initialRack: [4, 3, 5, 1, 2, 0], // Titanium, Brass, Tungsten, Cobalt, Emerald, Crimson
    targetBlueprint: [1, 3, 0, 5, 2, 4], // Cobalt, Brass, Crimson, Tungsten, Emerald, Titanium
    parMoves: 5,
    solution: [2, 5, 0, 3, 1], // Click Emerald (2), Tungsten (5), Crimson (0), Brass (3), Cobalt (1)
    levelString: "HS1|OBJ:PLAY|R:S4,S3,S5,S1,S2,S0|T:1,3,0,5,2,4|P:5|A:2,5,0,3,1",
    hint: "A deep 5-move inversion across 6 steel alloys.",
  },

  // STAGE 9: 7 Bars - Par 5 (Introducing 7th bar: Silver Platinum)
  {
    stageNumber: 9,
    name: "Platinum Ingot",
    bars: 7,
    initialRack: [1, 3, 4, 6, 5, 2, 0], // Cobalt, Brass, Titanium, Platinum, Tungsten, Emerald, Crimson
    targetBlueprint: [2, 1, 4, 0, 6, 3, 5], // Emerald, Cobalt, Titanium, Crimson, Platinum, Brass, Tungsten
    parMoves: 5,
    solution: [6, 0, 4, 1, 2], // Click Platinum (6), Crimson (0), Titanium (4), Cobalt (1), Emerald (2)
    levelString: "HS1|OBJ:PLAY|R:S1,S3,S4,S6,S5,S2,S0|T:2,1,4,0,6,3,5|P:5|A:6,0,4,1,2",
    hint: "Silver Platinum has entered the vault. Coordinate 7 alloys simultaneously.",
  },

  // STAGE 10: 7 Bars - Par 6 (The Grand Vault Boss)
  {
    stageNumber: 10,
    name: "The Grand Vault",
    bars: 7,
    initialRack: [1, 3, 4, 6, 5, 2, 0], // Cobalt, Brass, Titanium, Platinum, Tungsten, Emerald, Crimson
    targetBlueprint: [2, 6, 4, 5, 3, 0, 1], // Emerald, Platinum, Titanium, Tungsten, Brass, Crimson, Cobalt
    parMoves: 6,
    solution: [0, 3, 5, 4, 6, 2], // Click Crimson (0), Brass (3), Tungsten (5), Titanium (4), Platinum (6), Emerald (2)
    levelString: "HS1|OBJ:PLAY|R:S1,S3,S4,S6,S5,S2,S0|T:2,6,4,5,3,0,1|P:6|A:0,3,5,4,6,2",
    hint: "The ultimate 7-alloy puzzle. 6 exact clicks lock the entire master stack.",
  },
];

export const STAGES_11_TO_20: StageDef[] = [
  // STAGE 11: 4 Bars, 1 Locked - Par 2 (Introduction to Locked Steel)
  {
    stageNumber: 11,
    name: "Deadbolt",
    bars: 4,
    initialRack: [2, 0, 1, 3], // Emerald (Locked), Crimson, Cobalt, Brass
    targetBlueprint: [3, 1, 2, 0], // Brass, Cobalt, Emerald (Locked), Crimson
    parMoves: 2,
    solution: [1, 3],
    lockedIds: [2],
    levelString: "HS1|OBJ:PLAY|R:L2,S0,S1,S3|T:3,1,2,0|P:2|A:1,3",
    hint: "Emerald Chrome is locked and cannot be clicked. Pull lower plates above it to shift it down.",
  },

  // STAGE 12: 5 Bars, 1 Locked - Par 3
  {
    stageNumber: 12,
    name: "Gravity Latch",
    bars: 5,
    initialRack: [0, 1, 2, 3, 4], // Crimson, Cobalt (Locked), Emerald, Brass, Titanium
    targetBlueprint: [4, 2, 3, 0, 1], // Titanium, Emerald, Brass, Crimson, Cobalt (Locked)
    parMoves: 3,
    solution: [3, 2, 4],
    lockedIds: [1],
    levelString: "HS1|OBJ:PLAY|R:S0,L1,S2,S3,S4|T:4,2,3,0,1|P:3|A:3,2,4",
    hint: "Pull Brass, Emerald, and Titanium to push the locked Cobalt Alloy to the bottom.",
  },

  // STAGE 13: 5 Bars, 1 Locked - Par 4
  {
    stageNumber: 13,
    name: "Shear Pin",
    bars: 5,
    initialRack: [4, 3, 0, 2, 1], // Titanium, Brass (Locked), Crimson, Emerald, Cobalt
    targetBlueprint: [4, 1, 0, 2, 3], // Titanium, Cobalt, Crimson, Emerald, Brass (Locked)
    parMoves: 4,
    solution: [2, 0, 1, 4],
    lockedIds: [3],
    levelString: "HS1|OBJ:PLAY|R:S4,L3,S0,S2,S1|T:4,1,0,2,3|P:4|A:2,0,1,4",
    hint: "Cycle the lower three plates first, then return Titanium Violet to the top.",
  },

  // STAGE 14: 5 Bars, 1 Locked, Release Slot #4 (index 3) - Par 3
  {
    stageNumber: 14,
    name: "Release Keyway",
    bars: 5,
    initialRack: [0, 2, 1, 4, 3], // Crimson, Emerald (Locked), Cobalt, Titanium, Brass
    targetBlueprint: [2, 3, 4, 0, 1], // Emerald (Locked), Brass, Titanium, Crimson, Cobalt
    parMoves: 3,
    solution: [4, 3, 2],
    lockedIds: [2],
    releaseSlots: [3],
    levelString: "HS1|OBJ:PLAY|BOARD:release(slots:[3])|R:S0,L2,S1,S4,S3|T:2,3,4,0,1|P:3|A:4,3,2",
    hint: "Push locked Emerald Chrome down into Release Slot #4 to unlock it, then pull it to the top.",
  },

  // STAGE 15: 6 Bars, 2 Locked, Release Slot #5 (index 4) - Par 4
  {
    stageNumber: 15,
    name: "Twin Keyway",
    bars: 6,
    initialRack: [0, 1, 3, 4, 2, 5], // Crimson, Cobalt (Locked), Brass, Titanium (Locked), Emerald, Tungsten
    targetBlueprint: [0, 3, 4, 2, 1, 5], // Crimson, Brass, Titanium (Locked), Emerald, Cobalt (Locked), Tungsten
    parMoves: 4,
    solution: [2, 4, 3, 0],
    lockedIds: [1, 4],
    releaseSlots: [4],
    levelString: "HS1|OBJ:PLAY|BOARD:release(slots:[4])|R:S0,L1,S3,L4,S2,S5|T:0,3,4,2,1,5|P:4|A:2,4,3,0",
    hint: "Route locked Titanium Violet through Release Slot #5 before restoring Crimson to the top.",
  },

  // STAGE 16: 7 Bars, 2 Locked, Release Slot #5 (index 4) - Par 5
  {
    stageNumber: 16,
    name: "Bulkhead Bypass",
    bars: 7,
    initialRack: [1, 2, 0, 5, 3, 6, 4], // Cobalt, Emerald (Locked), Crimson, Tungsten (Locked), Brass, Platinum, Titanium
    targetBlueprint: [2, 1, 4, 6, 3, 0, 5], // Emerald (Locked), Cobalt, Titanium, Platinum, Brass, Crimson, Tungsten (Locked)
    parMoves: 5,
    solution: [3, 6, 4, 1, 2],
    lockedIds: [2, 5],
    releaseSlots: [4],
    levelString: "HS1|OBJ:PLAY|BOARD:release(slots:[4])|R:S1,L2,S0,L5,S3,S6,S4|T:2,1,4,6,3,0,5|P:5|A:3,6,4,1,2",
    hint: "Push locked Emerald Chrome onto Release Slot #5 on your 4th move so you can rescue it last.",
  },

  // STAGE 17: 6 Bars, 1 Timed Lock (c:2) - Par 4
  {
    stageNumber: 17,
    name: "Latch Timer",
    bars: 6,
    initialRack: [0, 3, 1, 4, 2, 5], // Crimson, Brass (Timed Lock 2), Cobalt, Titanium, Emerald, Tungsten
    targetBlueprint: [1, 3, 5, 4, 0, 2], // Cobalt, Brass (Timed Lock 2), Tungsten, Titanium, Crimson, Emerald
    parMoves: 4,
    solution: [4, 5, 3, 1],
    timedLocks: { 3: 2 },
    levelString: "HS1|OBJ:PLAY|R:S0,L3(c:2,m:2),S1,S4,S2,S5|T:1,3,5,4,0,2|P:4|A:4,5,3,1",
    hint: "Brass Ingot unlocks after 2 other moves. Don't shift it after it unlocks, or it will re-lock!",
  },

  // STAGE 18: 8 Bars (Molten Gold #7), 1 Timed Lock (c:3) - Par 5
  {
    stageNumber: 18,
    name: "Molten Core",
    bars: 8,
    initialRack: [0, 4, 2, 6, 1, 7, 3, 5], // Crimson, Titanium (Timed Lock 3), Emerald, Platinum, Cobalt, Molten Gold, Brass, Tungsten
    targetBlueprint: [2, 4, 7, 3, 1, 0, 6, 5], // Emerald, Titanium (Timed Lock 3), Molten Gold, Brass, Cobalt, Crimson, Platinum, Tungsten
    parMoves: 5,
    solution: [1, 3, 7, 4, 2],
    timedLocks: { 4: 3 },
    levelString: "HS1|OBJ:PLAY|R:S0,L4(c:3,m:3),S2,S6,S1,S7,S3,S5|T:2,4,7,3,1,0,6,5|P:5|A:1,3,7,4,2",
    hint: "Molten Gold (#7) joins the 8-plate rack. Make 3 moves to unlock Titanium Violet, then pull it.",
  },

  // STAGE 19: 8 Bars, 1 Locked + Release Slot #6 + 1 Timed Lock (c:2) - Par 6
  {
    stageNumber: 19,
    name: "Goldsmith's Lock",
    bars: 8,
    initialRack: [1, 2, 4, 5, 0, 7, 3, 6], // Cobalt, Emerald (Locked), Titanium, Tungsten (Timed Lock 2), Crimson, Molten Gold, Brass, Platinum
    targetBlueprint: [2, 0, 5, 3, 1, 7, 4, 6], // Emerald (Locked), Crimson, Tungsten (Timed Lock 2), Brass, Cobalt, Molten Gold, Titanium, Platinum
    parMoves: 6,
    solution: [7, 1, 3, 5, 0, 2],
    lockedIds: [2],
    releaseSlots: [5],
    timedLocks: { 5: 2 },
    levelString: "HS1|OBJ:PLAY|BOARD:release(slots:[5])|R:S1,L2,S4,L5(c:2,m:2),S0,S7,S3,S6|T:2,0,5,3,1,7,4,6|P:6|A:7,1,3,5,0,2",
    hint: "Coordinate both locks: time Tungsten's 2-move latch and land Emerald on Release Slot #6.",
  },

  // STAGE 20: 8 Bars, 2 Locked + Release Slot #6 + 1 Timed Lock (c:3) - Par 6
  {
    stageNumber: 20,
    name: "Triple Deadbolt",
    bars: 8,
    initialRack: [1, 4, 0, 6, 3, 7, 2, 5], // Cobalt (Locked), Titanium (Timed Lock 3), Crimson, Platinum (Locked), Brass, Molten Gold, Emerald, Tungsten
    targetBlueprint: [1, 6, 4, 5, 0, 7, 3, 2], // Cobalt (Locked), Platinum (Locked), Titanium (Timed Lock 3), Tungsten, Crimson, Molten Gold, Brass, Emerald
    parMoves: 6,
    solution: [7, 0, 5, 4, 6, 1],
    lockedIds: [1, 6],
    releaseSlots: [5],
    timedLocks: { 4: 3 },
    levelString: "HS1|OBJ:PLAY|BOARD:release(slots:[5])|R:L1,L4(c:3,m:3),S0,L6,S3,S7,S2,S5|T:1,6,4,5,0,7,3,2|P:6|A:7,0,5,4,6,1",
    hint: "Master both Release Slot #6 and Titanium's 3-move Timed Lock to rescue all three locked plates.",
  },
];

/**
 * Retrieve stage definition for any level number.
 * For stages 1-20, returns curated progression.
 * For stages > 20, generates deterministic fallback.
 */
export function getStage(levelNumber: number): StageDef {
  if (levelNumber >= 1 && levelNumber <= STAGES_1_TO_10.length) {
    return STAGES_1_TO_10[levelNumber - 1];
  }
  if (levelNumber >= 11 && levelNumber <= 10 + STAGES_11_TO_20.length) {
    return STAGES_11_TO_20[levelNumber - 11];
  }

  // Fallback procedural level for numbers beyond 20
  const barCount = Math.min(8, 4 + Math.floor((levelNumber - 1) / 5));
  const pool = Array.from({ length: barCount }, (_, i) => i);
  const target = [...pool].sort((a, b) => {
    const hashA = (a * 17 + levelNumber * 31) % 19;
    const hashB = (b * 17 + levelNumber * 31) % 19;
    return hashA - hashB;
  });
  const rack = [...target].reverse();
  if (rack.length >= 2) {
    const tmp = rack[0];
    rack[0] = rack[1];
    rack[1] = tmp;
  }
  const par = Math.min(barCount - 1, 3 + (levelNumber % 3));

  return {
    stageNumber: levelNumber,
    name: `Stage ${levelNumber}`,
    bars: barCount,
    initialRack: rack,
    targetBlueprint: target,
    parMoves: par,
    solution: [],
    levelString: `HS1|OBJ:PLAY|R:${rack.map((id) => `S${id}`).join(",")}|T:${target.join(",")}|P:${par}|A:`,
  };
}

