console.log("Maple Damage Calculator loaded");

let currentSlot = null;

function getNumber(id) {
    const element = document.getElementById(id);
    if (!element) return 0;
    return Number(element.value) || 0;
}

function updateBuffStats() {
    const baseStr = getNumber("baseStr");
    const baseDex = getNumber("baseDex");
    const baseInt = getNumber("baseInt");
    const baseLuk = getNumber("baseLuk");

    const mwPercent = getNumber("mapleWarrior");

    document.getElementById("itemStr").textContent = "(+" + Math.floor(baseStr * mwPercent / 100) + ")";
    document.getElementById("itemDex").textContent = "(+" + Math.floor(baseDex * mwPercent / 100) + ")";
    document.getElementById("itemInt").textContent = "(+" + Math.floor(baseInt * mwPercent / 100) + ")";
    document.getElementById("itemLuk").textContent = "(+" + Math.floor(baseLuk * mwPercent / 100) + ")";

    const attackBuff = getNumber("attackBuff");
    document.getElementById("totalWeaponAttack").textContent = attackBuff;
}

function calculateDamage() {
    const baseLuk = getNumber("baseLuk");
    const mwPercent = getNumber("mapleWarrior");
    const mwLuk = Math.floor(baseLuk * mwPercent / 100);

    const totalLuk = baseLuk + mwLuk;
    const weaponAttack = getNumber("attackBuff");

    const minDamage = (totalLuk * 2.5) * weaponAttack / 100;
    const maxDamage = (totalLuk * 5.0) * weaponAttack / 100;
    const averageDamage = (minDamage + maxDamage) / 2;

    document.getElementById("minDamage").textContent = Math.floor(minDamage);
    document.getElementById("maxDamage").textContent = Math.floor(maxDamage);
    document.getElementById("averageDamage").textContent = Math.floor(averageDamage);

    updateBuffStats();
}

function openItemModal(button) {
    currentSlot = button;

    document.getElementById("modalTitle").textContent = button.textContent;
    document.getElementById("itemModal").classList.remove("hidden");
}

function closeItemModal() {
    document.getElementById("itemModal").classList.add("hidden");
}

function saveItem() {
    closeItemModal();
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".slot").forEach(function (button) {
        button.addEventListener("click", function () {
            openItemModal(button);
        });
    });

    ["baseStr", "baseDex", "baseInt", "baseLuk", "mapleWarrior", "attackBuff"].forEach(function (id) {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", updateBuffStats);
            element.addEventListener("change", updateBuffStats);
        }
    });

    updateBuffStats();
});
