console.log("Maple Damage Calculator loaded");

function getNumber(id) {
  return Number(document.getElementById(id).value) || 0;
}

function getMapleWarriorBonus(baseStat) {
  const mapleWarriorPercent = getNumber("mapleWarrior");
  return Math.floor(baseStat * mapleWarriorPercent / 100);
}

function updateBuffStats() {
  const baseStr = getNumber("baseStr");
  const baseDex = getNumber("baseDex");
  const baseInt = getNumber("baseInt");
  const baseLuk = getNumber("baseLuk");

  document.getElementById("itemStr").textContent = `(+${getMapleWarriorBonus(baseStr)})`;
  document.getElementById("itemDex").textContent = `(+${getMapleWarriorBonus(baseDex)})`;
  document.getElementById("itemInt").textContent = `(+${getMapleWarriorBonus(baseInt)})`;
  document.getElementById("itemLuk").textContent = `(+${getMapleWarriorBonus(baseLuk)})`;
}

function calculateDamage() {
  const baseLuk = getNumber("baseLuk");
  const totalWeaponAttack = attackBuff;
  const attackBuff = getNumber("attackBuff");

  const mapleWarriorBonusLuk = getMapleWarriorBonus(baseLuk);

  const totalLuk = baseLuk + mapleWarriorBonusLuk;
  const totalWeaponAttack = weaponAttack + attackBuff;

  const minDamage = (totalLuk * 2.5) * totalWeaponAttack / 100;
  const maxDamage = (totalLuk * 5.0) * totalWeaponAttack / 100;
  const averageDamage = (minDamage + maxDamage) / 2;

  document.getElementById("minDamage").textContent = Math.floor(minDamage);
  document.getElementById("maxDamage").textContent = Math.floor(maxDamage);
  document.getElementById("averageDamage").textContent = Math.floor(averageDamage);

  updateBuffStats();
}

document.getElementById("baseStr").addEventListener("input", updateBuffStats);
document.getElementById("baseDex").addEventListener("input", updateBuffStats);
document.getElementById("baseInt").addEventListener("input", updateBuffStats);
document.getElementById("baseLuk").addEventListener("input", updateBuffStats);
document.getElementById("mapleWarrior").addEventListener("change", updateBuffStats);
document.getElementById("totalWeaponAttack").textContent = totalWeaponAttack;

updateBuffStats();
