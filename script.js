console.log("Maple Damage Calculator loaded");

function calculateDamage() {
  const baseLuk = Number(document.getElementById("baseLuk").value);
  const baseWeaponAttack = Number(document.getElementById("baseWeaponAttack").value);
  const attackBuff = Number(document.getElementById("attackBuff").value);

  const totalLuk = baseLuk;
  const totalWeaponAttack = baseWeaponAttack + attackBuff;

  const minDamage = (totalLuk * 2.5) * totalWeaponAttack / 100;
  const maxDamage = (totalLuk * 5.0) * totalWeaponAttack / 100;
  const averageDamage = (minDamage + maxDamage) / 2;

  document.getElementById("minDamage").textContent = Math.floor(minDamage);
  document.getElementById("maxDamage").textContent = Math.floor(maxDamage);
  document.getElementById("averageDamage").textContent = Math.floor(averageDamage);
}
