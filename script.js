const weaponFormulas = {
  oneHandedSword: {
    name: "One Handed Sword",
    types: {
      normal: { label: "Normal", primaryStat: "STR", primaryMultiplier: 4.0, secondaryStats: ["DEX"] }
    }
  },

  oneHandedAxeBwWandStaff: {
    name: "One Handed Axe/BW/Wand/Staff",
    types: {
      swing: { label: "Swinging", primaryStat: "STR", primaryMultiplier: 4.4, secondaryStats: ["DEX"] },
      stab: { label: "Stabbing", primaryStat: "STR", primaryMultiplier: 3.2, secondaryStats: ["DEX"] }
    }
  },

  twoHandedSword: {
    name: "Two Handed Sword",
    types: {
      normal: { label: "Normal", primaryStat: "STR", primaryMultiplier: 4.6, secondaryStats: ["DEX"] }
    }
  },

  twoHandedAxeBw: {
    name: "Two Handed Axe/BW",
    types: {
      swing: { label: "Swinging", primaryStat: "STR", primaryMultiplier: 4.8, secondaryStats: ["DEX"] },
      stab: { label: "Stabbing", primaryStat: "STR", primaryMultiplier: 3.4, secondaryStats: ["DEX"] }
    }
  },

  spear: {
    name: "Spear",
    types: {
      swing: { label: "Swinging", primaryStat: "STR", primaryMultiplier: 3.0, secondaryStats: ["DEX"] },
      stab: { label: "Stabbing", primaryStat: "STR", primaryMultiplier: 5.0, secondaryStats: ["DEX"] }
    }
  },

  polearm: {
    name: "Polearm",
    types: {
      swing: { label: "Swinging", primaryStat: "STR", primaryMultiplier: 5.0, secondaryStats: ["DEX"] },
      stab: { label: "Stabbing", primaryStat: "STR", primaryMultiplier: 3.0, secondaryStats: ["DEX"] }
    }
  },

  daggerNonThief: {
    name: "Dagger (Non-Thieves)",
    types: {
      normal: { label: "Normal", primaryStat: "STR", primaryMultiplier: 4.0, secondaryStats: ["DEX"] }
    }
  },

  daggerThief: {
    name: "Dagger / Throwing Stars (Thieves)",
    types: {
      normal: { label: "Normal", primaryStat: "LUK", primaryMultiplier: 3.6, secondaryStats: ["STR", "DEX"] }
    }
  },

  bow: {
    name: "Bow",
    types: {
      normal: { label: "Normal", primaryStat: "DEX", primaryMultiplier: 3.4, secondaryStats: ["STR"] }
    }
  },

  crossbow: {
    name: "Crossbow",
    types: {
      normal: { label: "Normal", primaryStat: "DEX", primaryMultiplier: 3.6, secondaryStats: ["STR"] }
    }
  },

  knuckle: {
    name: "Knuckle",
    types: {
      normal: { label: "Normal", primaryStat: "STR", primaryMultiplier: 4.8, secondaryStats: ["DEX"] }
    }
  },

  gun: {
    name: "Gun",
    types: {
      normal: { label: "Normal", primaryStat: "DEX", primaryMultiplier: 3.6, secondaryStats: ["STR"] }
    }
  }
};
