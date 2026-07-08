console.log("Maple Damage Calculator loaded");

let currentSlotKey = null;

function emptyItem(name) {
    return {
        name: name,
        str: 0,
        dex: 0,
        int: 0,
        luk: 0,
        weaponAttack: 0,
        magicAttack: 0
    };
}

const equipment = {
    hat: emptyItem("Hat"),
    face: emptyItem("Face"),
    star: emptyItem("Star/Arrow"),
    ring3: emptyItem("Ring 3"),
    ring4: emptyItem("Ring 4"),
    eye: emptyItem("Eye"),
    earrings: emptyItem("Earrings"),
    cape: emptyItem("Cape"),
    top: emptyItem("Top"),
    pendant: emptyItem("Pendant"),
    weapon: emptyItem("Weapon"),
    shield: emptyItem("Shield"),
    gloves: emptyItem("Gloves"),
    bottom: emptyItem("Bottom"),
    ring1: emptyItem("Ring 1"),
    ring2: emptyItem("Ring 2"),
    shoes: emptyItem("Shoes")
};

function getNumber(id) {
    const element = document.getElementById(id);
    if (!element) return 0;
    return Number(element.value) || 0;
}

function updateTotals() {
    const baseStr = getNumber("baseStr");
    const baseDex = getNumber("baseDex");
    const baseInt = getNumber("baseInt");
    const baseLuk = getNumber("baseLuk");

    const mwPercent = getNumber("mapleWarrior");

    let itemStr = 0;
    let itemDex = 0;
    let itemInt = 0;
    let itemLuk = 0;
    let itemWeaponAttack = 0;

    Object.values(equipment).forEach(function (item) {
        itemStr += item.str;
        itemDex += item.dex;
        itemInt += item.int;
        itemLuk += item.luk;
        itemWeaponAttack += item.weaponAttack;
    });

    const mwStr = Math.floor(baseStr * mwPercent / 100);
    const mwDex = Math.floor(baseDex * mwPercent / 100);
    const mwInt = Math.floor(baseInt * mwPercent / 100);
    const mwLuk = Math.floor(baseLuk * mwPercent / 100);

    const attackBuff = getNumber("attackBuff");

    document.getElementById("itemStr").textContent = "(+" + (itemStr + mwStr) + ")";
    document.getElementById("itemDex").textContent = "(+" + (itemDex + mwDex) + ")";
    document.getElementById("itemInt").textContent = "(+" + (itemInt + mwInt) + ")";
    document.getElementById("itemLuk").textContent = "(+" + (itemLuk + mwLuk) + ")";

    const totalWeaponAttack = itemWeaponAttack + attackBuff;
    document.getElementById("totalWeaponAttack").textContent = totalWeaponAttack;

    return {
        totalStr: baseStr + itemStr + mwStr,
        totalDex: baseDex + itemDex + mwDex,
        totalInt: baseInt + itemInt + mwInt,
        totalLuk: baseLuk + itemLuk + mwLuk,
        totalWeaponAttack: totalWeaponAttack
    };
}

function updateSlotTooltip(slotKey) {
    const item = equipment[slotKey];
    const button = document.querySelector('[data-slot="' + slotKey + '"]');

    let tooltip = item.name;

    if (item.str > 0) tooltip += "\nSTR +" + item.str;
    if (item.dex > 0) tooltip += "\nDEX +" + item.dex;
    if (item.int > 0) tooltip += "\nINT +" + item.int;
    if (item.luk > 0) tooltip += "\nLUK +" + item.luk;
    if (item.weaponAttack > 0) tooltip += "\nWeapon Attack +" + item.weaponAttack;
    if (item.magicAttack > 0) tooltip += "\nMagic Attack +" + item.magicAttack;

    button.title = tooltip;
}

function updateSlotFilled(slotKey) {
    const item = equipment[slotKey];
    const button = document.querySelector('[data-slot="' + slotKey + '"]');

    const hasStats =
        item.str > 0 ||
        item.dex > 0 ||
        item.int > 0 ||
        item.luk > 0 ||
        item.weaponAttack > 0 ||
        item.magicAttack > 0;

    button.classList.toggle("filled", hasStats);
}

function openItemModal(slotKey) {
    currentSlotKey = slotKey;
    const item = equipment[slotKey];

    document.getElementById("modalTitle").textContent = item.name;

    document.getElementById("itemEditStr").value = item.str;
    document.getElementById("itemEditDex").value = item.dex;
    document.getElementById("itemEditInt").value = item.int;
    document.getElementById("itemEditLuk").value = item.luk;
    document.getElementById("itemEditWeaponAttack").value = item.weaponAttack;
    document.getElementById("itemEditMagicAttack").value = item.magicAttack;

    document.getElementById("itemModal").classList.remove("hidden");
}

function closeItemModal() {
    document.getElementById("itemModal").classList.add("hidden");
}

function saveItem() {
    const item = equipment[currentSlotKey];

    item.str = getNumber("itemEditStr");
    item.dex = getNumber("itemEditDex");
    item.int = getNumber("itemEditInt");
    item.luk = getNumber("itemEditLuk");
    item.weaponAttack = getNumber("itemEditWeaponAttack");
    item.magicAttack = getNumber("itemEditMagicAttack");

    updateSlotTooltip(currentSlotKey);
    updateSlotFilled(currentSlotKey);
    updateTotals();
    calculateDamage();

    closeItemModal();
}

function calculateDamage() {
    const totals = updateTotals();

    const sharpEyesEnabled = document.getElementById("sharpEyes").checked;

    // Claw normal range formula
    const mastery = 0.6; // 60% mastery for now
    const primaryStat = totals.totalLuk * 3.6;
    const secondaryStat = totals.totalStr + totals.totalDex;

    const minRange =
        (primaryStat * 0.9 * mastery + secondaryStat) *
        totals.totalWeaponAttack / 100;

    const maxRange =
        (primaryStat + secondaryStat) *
        totals.totalWeaponAttack / 100;

    // Triple Throw average skill damage
    const averageBaseHit = (minRange + maxRange) / 2;

    const tripleThrowMultiplier = 1.5; // 150%
    const criticalThrowBonus = 1.0;    // +100%
    const sharpEyesBonus = sharpEyesEnabled ? 1.4 : 0;

    const baseCritRate = 0.5; // 50%
    const sharpEyesCritRate = sharpEyesEnabled ? 0.15 : 0;
    const totalCritRate = baseCritRate + sharpEyesCritRate;

    const normalHit =
        averageBaseHit * tripleThrowMultiplier;

    const criticalHit =
        averageBaseHit *
        (tripleThrowMultiplier + criticalThrowBonus + sharpEyesBonus);

    const averageHit =
        (normalHit * (1 - totalCritRate)) +
        (criticalHit * totalCritRate);

    // Triple Throw = 3 hits
    const averageTripleThrowDamage = averageHit * 3;

    document.getElementById("minDamage").textContent = Math.floor(minRange);
    document.getElementById("maxDamage").textContent = Math.floor(maxRange);
    document.getElementById("averageDamage").textContent = Math.floor(averageTripleThrowDamage);
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".slot").forEach(function (button) {
        button.addEventListener("click", function () {
            openItemModal(button.dataset.slot);
        });
    });

    ["baseStr", "baseDex", "baseInt", "baseLuk", "mapleWarrior", "attackBuff"].forEach(function (id) {
        const element = document.getElementById(id);

        if (element) {
            element.addEventListener("input", function () {
                updateTotals();
                calculateDamage();
            });

            element.addEventListener("change", function () {
                updateTotals();
                calculateDamage();
            });
        }
    });

    Object.keys(equipment).forEach(function (slotKey) {
        updateSlotTooltip(slotKey);
        updateSlotFilled(slotKey);
    });

    updateTotals();
});
