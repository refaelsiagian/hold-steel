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

/**
 * Retrieve stage definition for any level number.
 * For stages 1-10, returns curated progression.
 * For stages > 10, generates deterministic fallback.
 */
export function getStage(levelNumber: number): StageDef {
  if (levelNumber >= 1 && levelNumber <= STAGES_1_TO_10.length) {
    return STAGES_1_TO_10[levelNumber - 1];
  }

  // Fallback procedural level for numbers beyond 10
  const barCount = Math.min(7, 4 + Math.floor((levelNumber - 1) / 5));
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

