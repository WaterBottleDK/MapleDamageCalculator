console.log("Maple Damage Calculator loaded");

// ===============================
// Update Maple Warrior Bonus
// ===============================

function updateBuffStats() {

    const baseStr = Number(document.getElementById("baseStr").value) || 0;
    const baseDex = Number(document.getElementById("baseDex").value) || 0;
    const baseInt = Number(document.getElementById("baseInt").value) || 0;
    const baseLuk = Number(document.getElementById("baseLuk").value) || 0;

    const mwPercent = Number(document.getElementById("mapleWarrior").value);

    const mwStr = Math.floor(baseStr * mwPercent / 100);
    const mwDex = Math.floor(baseDex * mwPercent / 100);
    const mwInt = Math.floor(baseInt * mwPercent / 100);
    const mwLuk = Math.floor(baseLuk * mwPercent / 100);

    document.getElementById("itemStr").textContent = "(+" + mwStr + ")";
    document.getElementById("itemDex").textContent = "(+" + mwDex + ")";
    document.getElementById("itemInt").textContent = "(+" + mwInt + ")";
    document.getElementById("itemLuk").textContent = "(+" + mwLuk + ")";

    // Weapon Attack (currently only from Attack Buff)
    const attackBuff = Number(document.getElementById("attackBuff").value) || 0;

    document.getElementById("totalWeaponAttack").textContent = attackBuff;
}

// ===============================
// Calculate Triple Throw Damage
// ===============================

function calculateDamage() {

    const baseLuk = Number(document.getElementById("baseLuk").value) || 0;

    const mwPercent = Number(document.getElementById("mapleWarrior").value);

    const mwLuk = Math.floor(baseLuk * mwPercent / 100);

    const totalLuk = baseLuk + mwLuk;

    const weaponAttack = Number(document.getElementById("attackBuff").value) || 0;

    const minDamage = (totalLuk * 2.5) * weaponAttack / 100;
    const maxDamage = (totalLuk * 5.0) * weaponAttack / 100;
    const averageDamage = (minDamage + maxDamage) / 2;
    const attackDelay = Number(document.getElementById("attackSpeed").value);

    document.getElementById("minDamage").textContent = Math.floor(minDamage);
    document.getElementById("maxDamage").textContent = Math.floor(maxDamage);
    document.getElementById("averageDamage").textContent = Math.floor(averageDamage);

    updateBuffStats();
}

// ===============================
// Event Listeners
// ===============================

document.getElementById("baseStr").addEventListener("input", updateBuffStats);
document.getElementById("baseDex").addEventListener("input", updateBuffStats);
document.getElementById("baseInt").addEventListener("input", updateBuffStats);
document.getElementById("baseLuk").addEventListener("input", updateBuffStats);

document.getElementById("mapleWarrior").addEventListener("change", updateBuffStats);
document.getElementById("attackBuff").addEventListener("input", updateBuffStats);


// Run once when page loads
updateBuffStats();
let currentSlot = null;

const equipmentButtons = document.querySelectorAll(".slot");

equipmentButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentSlot = button;
        document.getElementById("modalTitle").textContent = button.textContent;
        document.getElementById("itemModal").classList.remove("hidden");
    });
});

function closeItemModal() {
    document.getElementById("itemModal").classList.add("hidden");
}

function saveItem() {
    closeItemModal();
}
