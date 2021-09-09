var LINEAHEAD = {shellmod:1,torpmod:1,ASWmod:.6,AAmod:1, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:1};
var DOUBLELINE = {shellmod:.8,torpmod:.8,ASWmod:.8,AAmod:1.2, shellacc:1.2,torpacc:.8,NBacc:.9, shellev:1,torpev:1,NBev:1,ASWev:1, id:2};
var DIAMOND = {shellmod:.7,torpmod:.7,ASWmod:1.2,AAmod:1.6, shellacc:1,torpacc:.4,NBacc:.7, shellev:1.1,torpev:1.1,NBev:1,ASWev:1, id:3};
var ECHELONOLD = {shellmod:.6,torpmod:.6,ASWmod:1,AAmod:1, shellacc:1.2,torpacc:.6,NBacc:.8, shellev:1.2,torpev:1.3,NBev:1.1,ASWev:1.3, id:4};
var ECHELON = {shellmod:.75,torpmod:.6,ASWmod:1.1,AAmod:1, shellacc:1.2,torpacc:.75,NBacc:.9, shellev:1.45,torpev:1.3,NBev:1.3,ASWev:1.3, id:4};
var LINEABREAST = {shellmod:.6,torpmod:.6,ASWmod:1.3,AAmod:1, shellacc:1.2,torpacc:.3,NBacc:.8, shellev:1.3,torpev:1.4,NBev:1.2,ASWev:1.1, id:5};
var VANGUARD1 = {shellmod:0.5,torpmod:1,ASWmod:1,AAmod:1.1, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:6};
var VANGUARD2 = {shellmod:1,torpmod:1,ASWmod:.6,AAmod:1.1, shellacc:1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:6};

// Acc Base source: https://twitter.com/Xe_UCH/status/1172380690207215616
// Based on past 6-5 data, acc mod for 3rd formation is likely 0.7
// Guess: shellmod = shellaccmod, torpmod = torpaccmod, ASWmod = ASWaccmod
var CTFCOMBINED1M = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:2,shellbonusE:10,accbase:78, shellacc:.8,torpacc:.7,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:11};
var CTFCOMBINED1E = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:10,shellbonusE:5,accbase:43, shellacc:.8,torpacc:.7,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:11};
var CTFCOMBINED2M = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:2,shellbonusE:10,accbase:78, shellacc:1,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:12};
var CTFCOMBINED2E = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:10,shellbonusE:5,accbase:43, shellacc:1,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:12};
var CTFCOMBINED3M = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:2,shellbonusE:10,accbase:78, shellacc:.7,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:13};
var CTFCOMBINED3E = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:10,shellbonusE:5,accbase:43, shellacc:.7,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:13};
var CTFCOMBINED4M = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:2,shellbonusE:10,accbase:78, shellacc:1.1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:14};
var CTFCOMBINED4E = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:10,shellbonusE:5,accbase:43, shellacc:1.1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:14};

var STFCOMBINED1M = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:10,shellbonusE:5,accbase:46, shellacc:.8,torpacc:.7,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:11};
var STFCOMBINED1E = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:-5,shellbonusE:-5,accbase:70, shellacc:.8,torpacc:.7,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:11};
var STFCOMBINED2M = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:10,shellbonusE:5,accbase:46, shellacc:1,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:12};
var STFCOMBINED2E = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:-5,shellbonusE:-5,accbase:70, shellacc:1,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:12};
var STFCOMBINED3M = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:10,shellbonusE:5,accbase:46, shellacc:.7,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:13};
var STFCOMBINED3E = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:-5,shellbonusE:-5,accbase:70, shellacc:.7,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:13};
var STFCOMBINED4M = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:10,shellbonusE:5,accbase:46, shellacc:1.1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:14};
var STFCOMBINED4E = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:-5,shellbonusE:-5,accbase:70, shellacc:1.1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:14};

var TTFCOMBINED1M = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:-5,shellbonusE:10,accbase:51, shellacc:.8,torpacc:.7,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:11};
var TTFCOMBINED1E = {shellmod:.8,torpmod:.7,ASWmod:1.3,AAmod:1.1, shellbonus:10,shellbonusE:5,accbase:45, shellacc:.8,torpacc:.7,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:11};
var TTFCOMBINED2M = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:-5,shellbonusE:10,accbase:51, shellacc:1,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:12};
var TTFCOMBINED2E = {shellmod:1,torpmod:.9,ASWmod:1.1,AAmod:1, shellbonus:10,shellbonusE:5,accbase:45, shellacc:1,torpacc:.9,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:12};
var TTFCOMBINED3M = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:-5,shellbonusE:10,accbase:51, shellacc:.7,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:13};
var TTFCOMBINED3E = {shellmod:.7,torpmod:.6,ASWmod:1,AAmod:1.5, shellbonus:10,shellbonusE:5,accbase:45, shellacc:.7,torpacc:.6,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:13};
var TTFCOMBINED4M = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:-5,shellbonusE:10,accbase:51, shellacc:1.1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:14};
var TTFCOMBINED4E = {shellmod:1.1,torpmod:1,ASWmod:.7,AAmod:1, shellbonus:10,shellbonusE:5,accbase:45, shellacc:1.1,torpacc:1,NBacc:1, shellev:1,torpev:1,NBev:1,ASWev:1, id:14};

var ALLFORMATIONS = {1:LINEAHEAD,2:DOUBLELINE,3:DIAMOND,4:ECHELON,5:LINEABREAST,6:VANGUARD1,
	'111':CTFCOMBINED1M,'111E':CTFCOMBINED1E,'112':CTFCOMBINED2M,'112E':CTFCOMBINED2E,'113':CTFCOMBINED3M,'113E':CTFCOMBINED3E,'114':CTFCOMBINED4M,'114E':CTFCOMBINED4E,
	'211':STFCOMBINED1M,'211E':STFCOMBINED1E,'212':STFCOMBINED2M,'212E':STFCOMBINED2E,'213':STFCOMBINED3M,'213E':STFCOMBINED3E,'214':STFCOMBINED4M,'214E':STFCOMBINED4E,
	'311':TTFCOMBINED1M,'311E':TTFCOMBINED1E,'312':TTFCOMBINED2M,'312E':TTFCOMBINED2E,'313':TTFCOMBINED3M,'313E':TTFCOMBINED3E,'314':TTFCOMBINED4M,'314E':TTFCOMBINED4E,
};

var AACIDATA = {
	1:{num:7,rate:.65,mod:1.75,equip:'HHR'},
	2:{num:6,rate:.58,mod:1.7,equip:'HR'},
	3:{num:4,rate:.5,mod:1.6,equip:'HH'},
	4:{num:6,rate:.52,mod:1.5,equip:'MSAR'},
	5:{num:4,rate:.55,mod:1.55,equip:'BBR'},
	6:{num:4,rate:.4,mod:1.5,equip:'MSA'},
	7:{num:3,rate:.45,mod:1.35,equip:'HAR'},
	8:{num:4,rate:.5,mod:1.45,equip:'BR'},
	9:{num:2,rate:.4,mod:1.3,equip:'HA'},
	10:{num:8,rate:.6,mod:1.65,equip:'HCR'},
	11:{num:6,rate:.55,mod:1.5,equip:'HC'},
	12:{num:3,rate:.45,mod:1.25,equip:'CGR'},
	// 13:{num:4,rate:.35,mod:1.35,equip:'BCR'},
	14:{num:4,rate:.63,mod:1.45,equip:'HGR'},
	15:{num:3,rate:.53,mod:1.3,equip:'HG'},
	16:{num:4,rate:.6,mod:1.4,equip:'HGR'},
	17:{num:2,rate:.55,mod:1.25,equip:'HG'},
	18:{num:2,rate:.6,mod:1.2,equip:'C'},
	19:{num:5,rate:.55,mod:1.45,equip:'HC'},
	20:{num:3,rate:.65,mod:1.25,equip:'C'},
	21:{num:5,rate:.6,mod:1.45,equip:'HR'},
	22:{num:2,rate:.6,mod:1.2,equip:'C'},
	23:{num:1,rate:.8,mod:1.05,equip:'G'},
	24:{num:3,rate:.55,mod:1.25,equip:'HG'},
	25:{num:7,rate:.6,mod:1.55,equip:'GRS'},
	26:{num:8,rate:.6,mod:1.4,equip:'HR'},
	28:{num:4,rate:.55,mod:1.4,equip:'GR'},
	29:{num:5,rate:.6,mod:1.55,equip:'HR'},
	30:{num:3,rate:.4,mod:1.3,equip:'HHH'},
	31:{num:2,rate:.5,mod:1.25,equip:'HH'},
	32:{num:3,rate:.5,mod:1.2,equip:'CM'},
	33:{num:3,rate:.4,mod:1.35,equip:'HG'},
	34:{num:7,rate:.6,mod:1.6,equip:'BB',rollIndiv:true},
	35:{num:6,rate:.5,mod:1.55,equip:'BH',rollIndiv:true},
	36:{num:6,rate:.5,mod:1.55,equip:'HHR',rollIndiv:true},
	37:{num:4,rate:.4,mod:1.45,equip:'HH',rollIndiv:true},
	39:{num:10,rate:.6,mod:1.7,equip:'BB',rollIndiv:true},
	40:{num:10,rate:.6,mod:1.7,equip:'BBR',rollIndiv:true},
	41:{num:9,rate:.6,mod:1.65,equip:'BB',rollIndiv:true},
};

var ARTILLERYSPOTDATA = {
	2: { dmgMod: 1.2, accMod: 1.1, chanceMod: 1.3, numHits: 2, name: 'DA' },
	3: { dmgMod: 1.1, accMod: 1.3, chanceMod: 1.2, name: 'Sec. CI' },
	4: { dmgMod: 1.2, accMod: 1.5, chanceMod: 1.3, name: 'Radar CI' },
	5: { dmgMod: 1.3, accMod: 1.3, chanceMod: 1.4, name: 'AP+Sec. CI' },
	6: { dmgMod: 1.5, accMod: 1.2, chanceMod: 1.5, name: 'AP CI' },
	71: { dmgMod: 1.25, accMod: 1.25, chanceMod: 1.25, id: 7, name: 'CVCI (FBA)' },   // acc data: https://twitter.com/kankenRJ/status/992626236391239680
	72: { dmgMod: 1.2, accMod: 1.2, chanceMod: 1.4, id: 7, name: 'CVCI (BBA)' },
	73: { dmgMod: 1.15, accMod: 1.15, chanceMod: 1.55, id: 7, name: 'CVCI (BA)' },
	200: { dmgMod: 1.35, accMod: 1.2, chanceMod: 1.2, name: 'Zuiun CI' },
	201: { dmgMod: 1.3, accMod: 1.2, chanceMod: 1.3, name: 'DB CI' },
}

var NBATTACKDATA = {
	1: { dmgMod: 1.2, accMod: 1.1, chanceMod: 0, numHits: 2, name: 'DA' },
	2: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.15, numHits: 2, torpedo: true, name: 'Mixed CI' },
	3: { dmgMod: 1.5, accMod: 1.65, chanceMod: 1.22, numHits: 2, torpedo: true, name: 'Torpedo CI' },
	4: { dmgMod: 1.75, accMod: 1.5, chanceMod: 1.3, name: 'Sec. Gun CI' },
	5: { dmgMod: 2, accMod: 2, chanceMod: 1.4, name: 'Main Gun CI' },
	31: { dmgMod: 1.75, accMod: 1.65, chanceMod: 1.05, id: 3, numHits: 2, torpedo: true, name: 'SSCI (TR)' },  // Chance Mod data: https://docs.google.com/spreadsheets/d/1XaP5z9_IOktGWL6mu_ZTZv5Z0TbvgRL_91fA_fsb0fc/edit#gid=0
	32: { dmgMod: 1.6, accMod: 1.65, chanceMod: 1.1, id: 3, numHits: 2, torpedo: true, name: 'SSCI (TT)' },
	61: { dmgMod: 1.25, accMod: 1.25, chanceMod: 1.05, id: 6, name: 'CVCI (1.25)' },
	62: { dmgMod: 1.2, accMod: 1.2, chanceMod: 1.15, id: 6, name: 'CVCI (1.2)' },
	63: { dmgMod: 1.18, accMod: 1.2, chanceMod: 1.25, id: 6, name: 'CVCI (1.18)' },
	64: { dmgMod: 1.2, accMod: 1.2, chanceMod: 1.15, id: 6, name: 'CVCI (1.2, suisei)' },
	7: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.15, improve: 11, improveChance: .65, torpedo: true, name: 'DDCI (GTR)' },  // data: https://twitter.com/dewydrops/status/1404966491695378433
	8: { dmgMod: 1.2, accMod: 1.65, chanceMod: 1.4, improve: 12, improveChance: .5, torpedo: true, name: 'DDCI (LTR)' },
	9: { dmgMod: 1.5, accMod: 1.65, chanceMod: 1.22, improve: 13, improveChance: .8, torpedo: true, name: 'DDCI (LTT)' },
	10: { dmgMod: 1.3, accMod: 1.65, chanceMod: 1.22, improve: 14, improveChance: .55, torpedo: true, name: 'DDCI (LTD)' },
	11: { dmgMod: 1.3, accMod: 1.5, chanceMod: 1.15, numHits: 2, torpedo: true, name: 'DDCI (GTR, double)' },
	12: { dmgMod: 1.2, accMod: 1.65, chanceMod: 1.4, numHits: 2, torpedo: true, name: 'DDCI (LTR, double)' },
	13: { dmgMod: 1.5, accMod: 1.65, chanceMod: 1.22, numHits: 2, torpedo: true, name: 'DDCI (LTT, double)' },
	14: { dmgMod: 1.3, accMod: 1.65, chanceMod: 1.22, numHits: 2, torpedo: true, name: 'DDCI (LTD, double)' },
}

var FLEETS1 = [];
var FLEETS2 = [];
var FLEETS1S = [null,null];
var LBAS = [null,null,null];
var FLEETLBRAID = null;
var ENGAGEMENT = 1;
var FIXENAGEMENT = false;
const CRITMOD = 1.5;
var SHELLDMGBASE = 220;
var NIGHTDMGBASE = 360;
var TORPDMGBASE = 180;
var AIRSTRIKEDMGBASE = 170;
var ASWDMGBASE = 170;
var SUPPORTDMGBASE = 170;
var FIXTORPEDOSUPPORT = false;
var SIMCONSTS = {
	shellEcMF: null,
	shellEcME: null,
	shellEcEF: null,
	shellEcEE: null,
	accEcMF: null,
	accEcME: null,
	accEcEF: null,
	accEcEE: null,
	kiraEvMod: null,
	supportShellN: null,
	supportShellB: null,
	vanguardEvDD1: 20,
	vanguardEvDD2: 40,
	vanguardEvOther1: 5,
	vanguardEvOther2: 20,
	nelsonTouchRate: 60,
	nagatoSpecialRate: 60,
	mutsuSpecialRate: 60,
	coloradoSpecialRate: 60,
	kongouSpecialRate: 60,
	airRaidCostW6: false,
	strikingForceRetreat: true,
	torpSquadronRetreat: true,
	enableEnemyAACI: true,
	enableEnemyAACILBAS: true,
}
function setConst(key, val) {
	if (val == null) SIMCONSTS[key] = null;
	else SIMCONSTS[key] = parseInt(val);
}

var BUCKETPERCENT = .5;
var BUCKETTIME = 99*3600;
var CARRYOVERHP = false;
var CARRYOVERMORALE = false;

var C = true;
var NEWFORMAT = true;
var DIDPROTECT = false;

var MECHANICS = {
	flagProtect: true,
	aswSynergy: true,
	artillerySpotting: true,
	OASW: true,
	APmod: true,
	AACI: true,
	fitGun: true,
	morale: true,
	fixFleetAA: true,
	newSupply: true,
	CVCI: true,
	destroyerNBCI: true,
	LBASBuff: true,
	zuiunCI: true,
	aaResist: true,
	visibleEquipBonus: true,
	newVanguardMod: true,
};

function getRepairCost(ship) {
	var base = (ship.maxHP - ship.HP)*SHIPDATA[ship.mid].fuel;
	return [Math.floor(base*.032),Math.floor(base*.06)];
}

function getRepairTime(ship) {
	var mod, base;
	if (ship.LVL <= 11) base = 10*ship.LVL;
	else base = 5*ship.LVL + 10*Math.floor(Math.sqrt(ship.LVL - 11)) + 50;
	switch (SHIPDATA[ship.mid].type) {
		case 'BB': case 'BBV': case 'CV': case 'CVB': case 'AR': mod = 2; break;
		case 'CA': case 'CAV': case 'FBB': case 'CVL': case 'AS': mod = 1.5; break;
		case 'SS': case 'DE': mod = .5; break;
		default: mod = 1; break;
	}
	return (ship.maxHP - ship.HP)*base*mod+30;
}

function formationCountered(form1,form2) {
	if (form1==2 && form2==5) return true;
	if (form1==4 && form2==1) return true;
	if (form1==5 && form2==4) return true;
	return false;
}

function shell(ship,target,APIhou,attackSpecial) {
	var da = false, cutin = false, cutinR = 0;
	var preMod = ship.getFormation().shellmod*ENGAGEMENT*ship.damageMod();
	var apMod = (MECHANICS.APmod)? ship.APmod(target) : 1;
	var postMod = 1;
	var overrideCritDmgBonus = null, critRateBonus = null;
	
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,target.fleet.formation.id)) accMod *= ship.getFormation().shellacc;
	
	var accMod2 = (MECHANICS.APmod)? ship.APacc(target) : 1;
	var evMod = target.getFormation().shellev;
	
	if (MECHANICS.artillerySpotting && ship.canAS() && ship.fleet.AS > 0 && !attackSpecial) {
		var ASchance = ship.ASchance(ship.fleet.AS);
		if (C) console.log('AS chance: '+ASchance);
		
		var AStypes = ship.AStype();
		for (var i=0; i<AStypes.length; i++) {
			if (da || cutin) break;
			let attackData = ARTILLERYSPOTDATA[AStypes[i]];
			if (attackData.id == 7 && target.isInstall) continue; //no CVCI on installation?
			if (Math.random() < ASchance/attackData.chanceMod) {
				if (attackData.numHits) da = attackData.numHits;
				else { cutin = attackData.id || AStypes[i]; cutinR = AStypes[i]; }
				postMod *= attackData.dmgMod;
				accMod2 *= attackData.accMod;
				break;
			}
		}
		if (cutin == 7) { //special CVCI crit bonus
			overrideCritDmgBonus = 1;
			critRateBonus = 0;
			overrideCritDmgBonus += .1  *(ship.ACCplane||0)/12.46; //base scaling on average proficiency
			critRateBonus += .09 * (ship.ACCplane||0)/12.46;
			if (ship.equips[0] && ([TORPBOMBER, DIVEBOMBER].indexOf(ship.equips[0].type) !== -1 || (cutinR == 71 && ship.equips[0].type == FIGHTER)) && ship.planecount[0]) {
				if (ship.equips[0].rank == 7) {
					overrideCritDmgBonus += .15; //base scaling on 8 - 5.6 mods of standard crit dmg bonus
					critRateBonus += .07 * ((ship.FBAplanenum || 0) >= 3 ? 2 : 1);
				}else if (ship.equips[0].rank == 6) {
					overrideCritDmgBonus += .1;
					critRateBonus += .06 * ((ship.FBAplanenum || 0) >= 3 ? 2 : 1);
				}
			}
		}
	}
	
	if (attackSpecial) {
		postMod *= getSpecialAttackMod(ship,attackSpecial);
		accMod2 *= getSpecialAttackAccMod(attackSpecial);
		cutin = attackSpecial;
	}

	//PT Imp bonus
	if (target.isPT) {
		postMod *= (ship.ptDmgMod||1);
		accMod2 *= (ship.ptAccMod||1) * .4;
	}
	
	var accflat = (ship.ACC)? ship.ACC : 0;
	if (ship.improves.ACCshell) accflat += ship.improves.ACCshell;
	
	var acc = hitRate(ship,(ship.fleet.baseaccshell||90),accflat,accMod); //use global hit acc
	if (MECHANICS.fitGun && ship.ACCfit) acc += ship.ACCfit*.01;
	if (MECHANICS.newVanguardMod && ship.fleet.formation.id == 6) acc += vanguardAccFlat(ship,target) * .01;
	acc *= accMod2;
	
	var evFlat = 0;
	if (target.fleet.formation.id == 6) {
		if (MECHANICS.newVanguardMod && target.fleet.ships.length == 6) evFlat += vanguardEvFlat(target);
		else {
			if (target.num/target.fleet.ships.length <= .8) {
				evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD1 : SIMCONSTS.vanguardEvOther1;
			} else {
				evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD2 : SIMCONSTS.vanguardEvOther2;
			}
		}
	}
	
	
	if (da) {
		var res1 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,1.3,ship.CVshelltype));
		var dmg1 = getScratchDamage(target.HP), realdmg1 = 0;
		if (res1) {
			dmg1 = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell),[preMod,ship.FPfit||0],{postMod:postMod,apMod:apMod,critMod:res1},SHELLDMGBASE);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		var res2 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,1.3,ship.CVshelltype));
		var dmg2 = getScratchDamage(target.HP), realdmg2 = 0;
		if (res2) {
			dmg2 = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell),[preMod,ship.FPfit||0],{postMod:postMod,apMod:apMod,critMod:res2},SHELLDMGBASE);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,target,realdmg1+realdmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIhou.api_at_eflag) {
				let off = (NEWFORMAT)? -1 : 0;
				APIhou.api_at_eflag.push(ship.side);
				APIhou.api_at_list.push(ship.apiID2+off);
				APIhou.api_df_list.push([target.apiID2+off,target.apiID2+off]);
			} else {
				APIhou.api_at_list.push(ship.apiID);
				APIhou.api_df_list.push([target.apiID,target.apiID]);
			}
			APIhou.api_damage.push([realdmg1+DIDPROTECT*.1,realdmg2+DIDPROTECT*.1]);
			APIhou.api_at_type.push(2);
			APIhou.api_cl_list.push([((res1>1)?2:1),((res2>1)?2:1)]);
			if (APIhou.api_si_list) {
				let si_list = [];
				for (let eq of ship.equips) {
					if (eq.btype == B_MAINGUN) si_list.push(eq.mid);
				}
				APIhou.api_si_list.push([si_list[0],si_list[1]]);
			}
		}
	} else {
		var res = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,1.3,ship.CVshelltype,critRateBonus), ship.CVshelltype? (overrideCritDmgBonus || ship.critdmgbonus || 1): 1);
		var dmg = (cutin)? getScratchDamage(target.HP) : 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.shellPower(target,ship.fleet.basepowshell),[preMod,ship.FPfit||0],{postMod:postMod,apMod:apMod,critMod:res},SHELLDMGBASE);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,target,realdmg);
	
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIhou.api_at_eflag) {
				let off = (NEWFORMAT)? -1 : 0;
				APIhou.api_at_eflag.push(ship.side);
				APIhou.api_at_list.push(ship.apiID2+off);
				APIhou.api_df_list.push([target.apiID2+off]);
			} else {
				APIhou.api_at_list.push(ship.apiID);
				APIhou.api_df_list.push([target.apiID]);
			}
			APIhou.api_damage.push([realdmg+DIDPROTECT*.1]);
			APIhou.api_at_type.push(cutin || 0);
			APIhou.api_cl_list.push([((res>1)?2:1)]);
			if (APIhou.api_si_list) {
				let si_list;
				if (cutinR < 70) {
					let btypeMap = { 1: [], 2: [], 3: [], 4: [], 5: [] };
					for (let eq of ship.equips) {
						if (btypeMap[eq.btype]) btypeMap[eq.btype].push(eq.mid);
					}
					switch (cutinR) {
						case 3:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_MAINGUN][0],btypeMap[B_SECGUN][0]];
							break;
						case 4:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_RADAR][0],btypeMap[B_MAINGUN][0]];
							break;
						case 5:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_MAINGUN][0],btypeMap[B_APSHELL][0]];
							break;
						case 6:
							si_list = [btypeMap[B_RECON][0],btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1]];
							break;
						default:
							if (btypeMap[B_MAINGUN].length) si_list = [btypeMap[B_MAINGUN][0]];
							else if (btypeMap[B_SECGUN].length) si_list = [btypeMap[B_SECGUN][0]];
							else si_list = [-1];
							break;
					}
				} else {
					let ptypeMap = { 6: [], 7: [], 8: [] };
					for (let eq of ship.equips) {
						if (ptypeMap[eq.type]) ptypeMap[eq.type].push(eq.mid);
					}
					switch (cutinR) {
						case 71:
							si_list = [ptypeMap[FIGHTER][0],ptypeMap[DIVEBOMBER][0],ptypeMap[TORPBOMBER][0]];
							break;
						case 72:
							si_list = [ptypeMap[DIVEBOMBER][0],ptypeMap[DIVEBOMBER][1],ptypeMap[TORPBOMBER][0]];
							break;
						case 73:
							si_list = [ptypeMap[DIVEBOMBER][0],ptypeMap[TORPBOMBER][0]];
							break;
						default:
							si_list = [-1];
							break;
					}
				}
				APIhou.api_si_list.push(si_list);
			}
		}
	}
	return (target.HP <= 0);
}

function NBattack(ship,target,NBonly,NBequips,APIyasen,attackSpecial) {
	var starshells = NBequips[0], searchlights = NBequips[1], nightscouts = NBequips[2];
	if (!ship.canNB()) return false;
	var da = false; //1 = combined damage, 2 = separate damages
	var cutin = false, cutinR = 0;
	
	var preMod = ship.damageMod();
	var postMod = 1;
	var bonus = 5*nightscouts[0];//add if have night scout
	
	var accBase = (69 + starshells[0]*5)*((nightscouts[0])? 1.1 : 1);
	var accMod = ship.getFormation().NBacc * ship.moraleMod();
	var accFlat = ship.ACC;
	if (ship.improves.ACCnb) accFlat += ship.improves.ACCnb;
	
	var evMod = target.getFormation().NBev;
	var evFlat = (target.type == 'CA' || target.type == 'CAV')? 5 : 0;
	if (target.type == 'DD' && target.hasLOSRadar && target.hasLookout) evFlat += 10; //data: https://twitter.com/Xe_UCH/status/1001252130194444289
	if (target.hasSearchlight) { evMod *= .2; evFlat *= .2; }
	
	if (!attackSpecial) {
		var NBchance = ship.NBchance(); 
		NBchance += starshells[0]*4 - starshells[1]*10 + searchlights[0]*7 - searchlights[1]*5;
		if (ship.HP/ship.maxHP <= .5) NBchance += 18;
		NBchance *= .01;
		if (C) console.log('base NB chance: '+NBchance);

		for (let NBtype of ship.NBtypes()) {
			if (da || cutin) break;
			let attackData = NBATTACKDATA[NBtype];
			if (target.isInstall && attackData.torpedo) continue;
			let chanceMod = attackData.chanceMod;
			let chance = (chanceMod == 0)? .99 : NBchance/chanceMod;
			if (Math.random() < chance) {
				if (ship.LVL >= 80 && attackData.improve && Math.random() < attackData.improveChance) {
					NBtype = attackData.improve;
					attackData = NBATTACKDATA[NBtype];
				}
				if (attackData.numHits) da = attackData.numHits;
				cutin = attackData.id || NBtype;
				cutinR = NBtype;
				let dmgMod = attackData.dmgMod;
 				if ([7,8,11,12].indexOf(NBtype) !== -1) { //D-gun bonus
					let count = 0, count2 = 0;
					for (let equip of ship.equips) {
						if (equip.mid == 267) { count++; }
						if (equip.mid == 366) { count++; count2++; }
					}
					if (count) dmgMod *= 1.25;
					if (count >= 2) dmgMod *= 1.125;
					if (count2) dmgMod *= 1.05;
				}
				preMod *= dmgMod;
				accMod *= attackData.accMod;
			}
		}
	}

	if (attackSpecial) {
		preMod *= getSpecialAttackMod(ship,attackSpecial);
		accMod *= getSpecialAttackAccMod(attackSpecial);
		cutin = attackSpecial;
	}
	
	//PT Imp bonus
	var accMod2 = 1;
	if (target.isPT) {
		postMod *= (ship.ptDmgMod||1) * .6;
		accMod2 *= (ship.ptAccMod||1) * .4;
	}
	
	var acc = hitRate(ship,accBase,accFlat,accMod);
	if (MECHANICS.fitGun && ship.ACCfitN) acc += ship.ACCfitN*.01;
	if (searchlights[0]) acc += .07;
	if (ship.ACCnbca) acc += ship.ACCnbca*.01;
	acc *= accMod2;
	
	var critrateMod = 1.5;
	if (nightscouts[0]) critrateMod += .07;
	
	if (ship.getFormation() == VANGUARD1) {
		preMod *= .5;
	}
	if (target.fleet.formation.id == 6) {
		if (MECHANICS.newVanguardMod && target.fleet.ships.length == 6) evFlat += vanguardEvFlat(target);
		else {
			if (target.num/target.fleet.ships.length <= .8) {
				evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD1 : SIMCONSTS.vanguardEvOther1;
			} else {
				evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD2 : SIMCONSTS.vanguardEvOther2;
			}
		}
	}
	
	
	if (da) {
		var res1 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critrateMod));
		var dmg1 = getScratchDamage(target.HP), realdmg1 = 0;
		if (res1) {
			dmg1 = damage(ship,target,ship.NBPower(target,bonus),[preMod,ship.FPfit||0],{postMod:postMod,critMod:res1},NIGHTDMGBASE);
			realdmg1 = takeDamage(target,dmg1);
		} else { realdmg1 = takeDamage(target,dmg1) };
		var res2 = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critrateMod));
		var dmg2 = getScratchDamage(target.HP), realdmg2 = 0;
		if (res2) {
			dmg2 = damage(ship,target,ship.NBPower(target,bonus),[preMod,ship.FPfit||0],{postMod:postMod,critMod:res2},NIGHTDMGBASE);
			realdmg2 = takeDamage(target,dmg2);
		} else { realdmg2 = takeDamage(target,dmg2); }
		ship.fleet.giveCredit(ship,target,realdmg1+realdmg2);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg1+', '+dmg2+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIyasen.api_at_eflag) {
				APIyasen.api_at_eflag.push(ship.side);
				APIyasen.api_at_list.push(ship.apiID2-1);
				APIyasen.api_df_list.push([target.apiID2-1,target.apiID2-1]);
			} else {
				APIyasen.api_at_list.push(ship.apiID);
				APIyasen.api_df_list.push([target.apiID,target.apiID]);
			}
			APIyasen.api_damage.push([realdmg1+DIDPROTECT*.1,realdmg2+DIDPROTECT*.1]);
			APIyasen.api_sp_list.push(cutin);
			APIyasen.api_cl_list.push([((res1>1)?2:1),((res2>1)?2:1)]);
			APIyasen.api_n_mother_list.push(0);
		}
	} else {
		var isNBAirAttack = ship.canNBAirAttack();
		var res = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,critrateMod,isNBAirAttack), isNBAirAttack? (ship.critdmgbonus || 1) : 1);
		var dmg = (cutin)? getScratchDamage(target.HP) : 0; var realdmg = 0;
		if (res) {
			dmg = damage(ship,target,ship.NBPower(target,bonus),[preMod,ship.FPfit||0],{postMod:postMod,critMod:res},NIGHTDMGBASE);
			realdmg = takeDamage(target,dmg);
		} else { realdmg = takeDamage(target,dmg); }
		ship.fleet.giveCredit(ship,target,realdmg);
		
		if (C) {
			console.log(ship.name+' shells '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			if (APIyasen.api_at_eflag) {
				APIyasen.api_at_eflag.push(ship.side);
				APIyasen.api_at_list.push(ship.apiID2-1);
				APIyasen.api_df_list.push([target.apiID2-1]);
			} else {
				APIyasen.api_at_list.push(ship.apiID);
				APIyasen.api_df_list.push([target.apiID]);
			}
			APIyasen.api_damage.push([realdmg+DIDPROTECT*.1]);
			APIyasen.api_sp_list.push(cutin || 0);
			APIyasen.api_cl_list.push([((res>1)?2:1)]);
			APIyasen.api_n_mother_list.push(+isNBAirAttack);
		}
	}
	if (C) {
		if (APIyasen.api_si_list) {
			let si_list;
			if (cutinR < 60) {
				let btypeMap = { 1: [], 2: [], 8: [], 4: [], 10: [], 11: [], 18: [] }, btypeAll = [];
				for (let eq of ship.equips) {
					if (btypeMap[eq.btype]) {
						btypeMap[eq.btype].push(eq.mid);
						btypeAll.push(eq.mid);
					}
				}
				switch (cutinR) {
					case 1:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1]];
						var ind = 0;
						if (!si_list[0]) si_list[0] = btypeMap[B_SECGUN][ind++];
						if (!si_list[1]) si_list[1] = btypeMap[B_SECGUN][ind++];
						break;
					case 2:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_TORPEDO][0]];
						break;
					case 3:
					case 32:
						si_list = [btypeMap[B_TORPEDO][0],btypeMap[B_TORPEDO][1]];
						break;
					case 4:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1],btypeMap[B_SECGUN][0]];
						break;
					case 5:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_MAINGUN][1],btypeMap[B_MAINGUN][2]];
						break;
					case 31:
						si_list = [btypeMap[B_TORPEDO][0],btypeMap[B_SUBRADAR][0]];
						break;
					case 7:
					case 11:
						si_list = [btypeMap[B_MAINGUN][0],btypeMap[B_TORPEDO][0],btypeMap[B_RADAR][0]];
						break;
					case 8:
					case 12:
						si_list = [btypeMap[B_PICKET][0],btypeMap[B_TORPEDO][0],btypeMap[B_RADAR][0]];
						break;
					case 9:
					case 13:
						si_list = [btypeMap[B_PICKET][0],btypeMap[B_TORPEDO][0],btypeMap[B_TORPEDO][1]];
						break;
					case 10:
					case 14:
						si_list = [btypeMap[B_PICKET][0],btypeMap[B_TORPEDO][0],btypeMap[B_DRUM][0]];
						break;
					default:
						if (btypeAll.length) si_list = [btypeAll[0]];
						else si_list = [-1];
						break;
				}
			} else {
				let btypeMap = { 14: [], 15: [], 16: [] }, btypeAll = [];
				for (let eq of ship.equips) {
					if (btypeMap[eq.btype]) {
						btypeMap[eq.btype].push(eq.mid);
						btypeAll.push(eq.mid);
					}
				}
				switch (cutinR) {
					case 61:
						si_list = [btypeMap[B_NIGHTFIGHTER][0],btypeMap[B_NIGHTFIGHTER][1],btypeMap[B_NIGHTBOMBER][0]];
						break;
					case 62:
						si_list = [btypeMap[B_NIGHTFIGHTER][0],btypeMap[B_NIGHTBOMBER][0]];
						break;
					case 63:
						si_list = [btypeAll[0],btypeAll[1],btypeAll[2]];
						break;
					case 64:
						si_list = [btypeMap[B_NIGHTFIGHTER][0]||btypeMap[B_NIGHTBOMBER][0],btypeAll.filter(mid => mid === 320)[0]];
					default:
						si_list = [-1];
						break;
				}
			}
			APIyasen.api_si_list.push(si_list);
		}
	}
	return (target.HP <= 0);
}

function ASW(ship,target,isnight,APIhou,isOASW) {
	var sonarAcc = 0;
	for (var i=0; i<ship.equips.length; i++) if (ship.equips[i].type == SONARS) sonarAcc += 2*ship.equips[i].ASW;
	sonarAcc += (ship.improves.ACCasw || 0);
	var accMod = ship.moraleMod();
	// Combined fleet ASW acc data: https://twitter.com/kankenRJ/status/813545025770401792
	if (ship.getFormation().id > 10) accMod *= ship.getFormation().ASWmod;
	else if (!formationCountered(ship.fleet.formation.id,target.fleet.formation.id)) accMod *= ship.getFormation().shellacc;
	var evMod = target.getFormation().ASWev;
	var evFlat = 0;
	if (target.fleet.formation.id == 6) {
		if (MECHANICS.newVanguardMod && target.fleet.ships.length == 6) evFlat += vanguardEvFlat(target);
		else {
			if (target.num/target.fleet.ships.length <= .8) {
				evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD1 : SIMCONSTS.vanguardEvOther1;
			} else {
				evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD2 : SIMCONSTS.vanguardEvOther2;
			}
		}
	}
	var acc = hitRate(ship,80,sonarAcc,accMod);
	var isPlaneASW = ship.planeasw && !isOASW && ship.mid !== 646;
	var res = rollHit(accuracyAndCrit(ship,target,acc,evMod,evFlat,1.3,isPlaneASW), isPlaneASW? (ship.critdmgbonus || 1) : 1);
	var dmg = 0, realdmg = 0;
	var preMod = (isnight)? 0 : ship.getFormation().ASWmod*ENGAGEMENT*ship.damageMod();
	if (res) {
		dmg = damage(ship,target,ship.ASWPower(),preMod,{critMod:res},ASWDMGBASE);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,target,realdmg);
	if (C) {
		console.log(ship.name+' ASWs '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
		if (APIhou.api_at_eflag) {
			let off = (NEWFORMAT)? -1 : 0;
			APIhou.api_at_eflag.push(ship.side);
			APIhou.api_at_list.push(ship.apiID2+off);
			APIhou.api_df_list.push([target.apiID2+off]);
		} else {
			APIhou.api_at_list.push(ship.apiID);
			APIhou.api_df_list.push([target.apiID]);
		}
		APIhou.api_damage.push([realdmg+DIDPROTECT*.1]);
		if(APIhou.api_at_type) APIhou.api_at_type.push(0);
		else APIhou.api_sp_list.push(0);
		if (APIhou.api_n_mother_list) APIhou.api_n_mother_list.push(0);
		APIhou.api_cl_list.push([((res>1)?2:1)]);
		if (APIhou.api_si_list) {
			let si = -1;
			for (let eq of ship.equips) {
				if (eq.type == DEPTHCHARGE) { si = eq.mid; break; }
			}
			APIhou.api_si_list.push([si]);
		}
	}
	return (target.HP <= 0);
}

function laser(ship,targets,APIhou) {
	var preMod = ship.getFormation().shellmod*ENGAGEMENT*ship.damageMod();
	var accMod = ship.moraleMod();
	if (!formationCountered(ship.fleet.formation.id,targets[0].fleet.formation.id)) accMod *= ship.getFormation().shellacc;
	var acc = hitRate(ship,90,0,accMod);
	var evMod = ship.getFormation().shellev;
	var targetids = [], damages = [], crits = [];
	for (var i=0; i<targets.length; i++) {
		var postMod = 1;//ship.APmod(targets[i]); //want this?
		var res = rollHit(accuracyAndCrit(ship,targets[i],acc,evMod,0,1.3));
		var dmg = 0, realdmg = 0;
		if (res) {
			dmg = damage(ship,targets[i],ship.shellPower(targets[i]),preMod,{postMod:postMod,critMod:res},SHELLDMGBASE);
			realdmg = takeDamage(targets[i],dmg);
		} else { realdmg = takeDamage(targets[i],dmg); }
		ship.fleet.giveCredit(ship,target,realdmg);
		if (C) {
			console.log(ship.name+' LASERS '+targets[i].name+' FOR '+dmg+' DAMAGE, '+targets[i].HP+'/'+targets[i].maxHP+' left');
			targetids.push((APIhou.api_at_eflag)? targets[i].apiID2 : targets[i].apiID);
			damages.push(realdmg);
			crits.push(((res>1)?2:1));
		}
	}
	if (C) {
		if (APIhou.api_at_eflag) {
			APIhou.api_at_eflag.push(ship.side);
			APIhou.api_at_list.push(ship.apiID2);
		} else {
			APIhou.api_at_list.push(ship.apiID);
		}
		APIhou.api_df_list.push(targetids);
		APIhou.api_damage.push(damages);
		APIhou.api_at_type.push(1);
		APIhou.api_cl_list.push(crits);
	}
}

function shellPhaseTarget(ship,alive,subsalive,isOASW) {
	var result = { type: 0, target: null, alive: null };
	if (subsalive.length && ship.canASW() && (!ship.isASWlast||!alive.length)) {
		result.type = 2;
		result.target = choiceWProtect(subsalive);
		result.alive = subsalive;
	} else if (alive.length && !isOASW) {
		if (ship.canlaser && Math.random() < .5) {
			var temptargets = [];
			for (var j=0; j<alive.length; j++) if (!alive[j].isescort) temptargets.push(alive[j]);
			if (temptargets.length <= 0) temptargets = alive;
			var targets = shuffle(temptargets.slice()).slice(0,1+Math.max(0,Math.floor((temptargets.length-1)*Math.random())));
			result.type = 3;
			result.target = targets;
			result.alive = alive;
		} else {
			var targets;
			if (ship.CVshelltype && !ship.canShellInstall()) {
				targets = [];
				for (var j=0; j<alive.length; j++) if (!alive[j].isInstall) targets.push(alive[j]);
			} else if (ship.isSub) {
				targets = [];
				for (var j=0; j<alive.length; j++) if (alive[j].isInstall) targets.push(alive[j]);
			} else targets = alive;
			if (targets.length) {
				result.type = 1;
				result.target = choiceWProtect(targets);
				result.alive = alive;
			}
		}
	}
	return result;
}

function shellPhaseAttack(ship,targetData,APIhou,isOASW,attackSpecial) {
	switch (targetData.type) {
		case 1: //shell
			if (shell(ship,targetData.target,APIhou,attackSpecial)) targetData.alive.splice(targetData.alive.indexOf(targetData.target),1);
			break;
		case 2: //ASW
			if (ASW(ship,targetData.target,false,APIhou,isOASW)) targetData.alive.splice(targetData.alive.indexOf(targetData.target),1);
			break;
		case 3: //laser
			var targets = targetData.target;
			laser(ship,targets,APIhou);
			for (var j=0; j<targets.length; j++) if (targets[j].HP <= 0) targetData.alive.splice(targetData.alive.indexOf(targets[j]),1);
			break;
	}
}

function canSpecialAttack(ship) {
	if (ship.fleet.didSpecial) return false;
	if (ship.fleet.combinedWith && ship.fleet.combinedWith.didSpecial) return false;
	if (ship.attackSpecial == 100) {
		if (ship.fleet.ships[0] != ship || ship.isescort) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 6) return false;
		if (ship.fleet.formation.id != 12 && ship.fleet.formation.id != 2) return false;
		if (ship.HP/ship.maxHP <= .5) return false;
		if (ship.fleet.ships[2].CVshelltype || ship.fleet.ships[4].CVshelltype) return false;
		return Math.random() < SIMCONSTS.nelsonTouchRate/100;
	} else if (ship.attackSpecial == 101 || ship.attackSpecial == 102) {
		if (ship.fleet.ships[0] != ship || ship.isescort) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 6) return false;
		if (ship.fleet.formation.id != 12 && ship.fleet.formation.id != 4) return false;
		if (ship.HP/ship.maxHP <= .5) return false;
		if (['BB','FBB','BBV'].indexOf(ship.fleet.ships[1].type) == -1) return false;
		if (ship.fleet.ships[1].HP/ship.fleet.ships[1].maxHP <= .25) return false;
		let rate = (ship.attackSpecial == 101)? SIMCONSTS.nagatoSpecialRate : SIMCONSTS.mutsuSpecialRate;
		return Math.random() < rate/100;
	} else if (ship.attackSpecial == 103) {
		if (ship.fleet.ships[0] != ship || ship.isescort) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 6) return false;
		if (ship.fleet.formation.id != 12 && ship.fleet.formation.id != 4) return false;
		for (let i=0; i<=2; i++) {
			let s = ship.fleet.ships[i];
			if (s.HP/s.maxHP <= .5) return false;
		}
		if (['BB','FBB','BBV'].indexOf(ship.fleet.ships[1].type) == -1) return false;
		if (['BB','FBB','BBV'].indexOf(ship.fleet.ships[2].type) == -1) return false;
		let rate = SIMCONSTS.coloradoSpecialRate;
		return Math.random() < rate/100;
	}
	return false;
}

function canSpecialAttackNB(ship) {
	if (ship.fleet.didSpecialNB[0] && ship.fleet.didSpecialNB[1]) return false;
	if (ship.attackSpecial == 104) {
		if (ship.fleet.ships[0] != ship) return false;
		if (ship.fleet.ships.filter(ship => ship.HP > 0 && !ship.retreated && !ship.isSub).length < 5) return false;
		if (ship.fleet.formation.id != 1 && ship.fleet.formation.id != 4 && ship.fleet.formation.id != 12 && ship.fleet.formation.id != 14) return false;
		for (let i=0; i<=1; i++) {
			let s = ship.fleet.ships[i];
			if (s.HP/s.maxHP <= .5) return false;
		}
		if (ship.mid == 591 && [592,151,439,364].indexOf(ship.fleet.ships[1].mid) == -1) return false;
		if (ship.mid == 592 && [591,152].indexOf(ship.fleet.ships[1].mid) == -1) return false;
		let rate = SIMCONSTS.kongouSpecialRate/100;
		if (ship.hasLOSRadar2) rate += (ship.mid == 591)? .3 : .1;
		if (ship.equiptypes[SEARCHLIGHTL]) rate += (ship.mid == 592)? .3 : .1;
		return Math.random() < rate;
	}
	return false;
}

function getSpecialAttackShips(ships,attackSpecial) {
	let attackers;
	if (attackSpecial == 101 || attackSpecial == 102) {
		attackers = [ships[0], ships[0], ships[1]];
	} else if (attackSpecial == 100) {
		attackers = [ships[0], ships[2], ships[4]];
	} else if (attackSpecial == 103) {
		attackers = [ships[0], ships[1], ships[2]];
	} else if (attackSpecial == 104) {
		attackers = [ships[0], ships[1]];
	}
	return attackers;
}

function getSpecialAttackMod(ship,attackSpecial) {
	let mod = 1;
	if (attackSpecial == 100) {
		mod = 2;
		if (ENGAGEMENT == 0.6) mod *= 1.25;
	} else if (attackSpecial == 101) {
		mod = (ship.isflagship)? 1.4 : 1.2;
		if (ship.fleet.ships[1].mid == 276) {
			mod *= ((ship.isflagship)? 1.15 : 1.35);
		} else if (ship.fleet.ships[1].mid == 573) {
			mod *= ((ship.isflagship)? 1.2 : 1.4);
		} else if (ship.fleet.ships[1].mid == 576) {
			mod *= ((ship.isflagship)? 1.1 : 1.25);
		}
		if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
		if (ship.hasLOSRadar) mod *= 1.15;
	} else if (attackSpecial == 102) {
		mod = (ship.isflagship)? 1.4 : 1.2;
		if (ship.fleet.ships[1].mid == 541) {
			mod *= ((ship.isflagship)? 1.2 : 1.4);
		}
		if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
		if (ship.hasLOSRadar) mod *= 1.15;
	} else if (attackSpecial == 103) {
		if (ship.isflagship) {
			mod = 1.3;
			if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
			if (ship.hasLOSRadar) mod *= 1.15;
		} else if (ship.num == 2) {
			mod = 1.15;
			if ([19,88,93].indexOf(ship.sclass) != -1) mod *= 1.1;
			if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
			if (ship.hasLOSRadar) mod *= 1.15;
		} else {
			mod = 1.15;
			let ship1 = ship.fleet.ships[1];
			if ([19,88,93].indexOf(ship.sclass) != -1) {
				mod *= 1.15;
				if ([19,88,93].indexOf(ship1.sclass) != -1) mod *= 1.1;
				if (ship1.equiptypesB[B_APSHELL] || ship1.hasLOSRadar){
					if (ship1.equiptypesB[B_APSHELL]) mod *= 1.35;
					if (ship1.hasLOSRadar) mod *= 1.15;
				}else{
					if (ship.equiptypesB[B_APSHELL]) mod *= 1.35;
					if (ship.hasLOSRadar) mod *= 1.15;
				}
			}else if (SHIPDATA[ship1.mid].SLOTS.length == 5 && ship1.equips.length == 5 && (ship1.equips[4].btype == B_APSHELL || (ship1.equips[4].btype == B_RADAR && ship1.equips[4].LOS >= 5)) && ship.equips.length > 0){
				if (ship1.equiptypesB[B_APSHELL]) mod *= 1.35;
				if (ship1.hasLOSRadar) mod *= 1.15;
				if (ship1.equips[4].btype == B_APSHELL) mod *= 1.35;
				if (ship1.equips[4].btype == B_RADAR && ship1.equips[4].LOS >= 5) mod *= 1.15;
			}
		}
	} else if (attackSpecial == 104) {
		mod = 1.9;
		if (ENGAGEMENT == 1.2) mod *= 1.25;
		else if (ENGAGEMENT == .6) mod *= .75;
	}
	return mod;
}

function getSpecialAttackAccMod(attackSpecial){
	switch(attackSpecial){
		case 100:
			return 1.05;
		case 101:
		case 102:
			return 1.2;
		case 103:
			return 1.2;
		case 104:
			return 1.3;
	}
	return 1;
}

function shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,APIhou,isOASW) {
	if (C && NEWFORMAT) {
		formatRemovePadding(APIhou);
		if (!APIhou.api_at_eflag) APIhou.api_at_eflag = [];
	}
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canStillShell()) {
			if (canSpecialAttack(order1[i])) {
				let ships = getSpecialAttackShips(order1[i].fleet.ships,order1[i].attackSpecial);
				let k = 0;
				for (; k<ships.length; k++) {
					if (alive2.length <= 0) break;
					var targetData = shellPhaseTarget(ships[k],alive2,[]);
					shellPhaseAttack(ships[k],targetData,APIhou,isOASW,order1[i].attackSpecial);
				}
				order1[i].fleet.didSpecial = 1;
				if (C) {
					apiAdjustHougekiSpecial(APIhou,k);
				}
			} else {
				var targetData = shellPhaseTarget(order1[i],alive2,subsalive2,isOASW);
				shellPhaseAttack(order1[i],targetData,APIhou,isOASW);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canStillShell()) {
			var targetData = shellPhaseTarget(order2[i],alive1,subsalive1,isOASW);
			shellPhaseAttack(order2[i],targetData,APIhou,isOASW);
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
}

function doShellC(ship,targets,APIhou,isOASW,attackSpecial) {
	var targetData, targetCFirst = targets.alive2C && Math.random() < .4; // Source: https://twitter.com/noratako5/status/835179687420682241
	if (targetCFirst) {
		targetData = shellPhaseTarget(ship,targets.alive2C,targets.subsalive2C,isOASW);
		if (!targetData.target) targetData = shellPhaseTarget(ship,targets.alive2,targets.subsalive2,isOASW);
	} else {
		targetData = shellPhaseTarget(ship,targets.alive2,targets.subsalive2,isOASW);
		if (!targetData.target && targets.alive2C) targetData = shellPhaseTarget(ship,targets.alive2C,targets.subsalive2C,isOASW);
	}
	shellPhaseAttack(ship,targetData,APIhou,isOASW,attackSpecial);
}

function shellPhaseC(order1,order2,targets,APIhou,isOASW) {
	if (C && NEWFORMAT) {
		formatRemovePadding(APIhou);
		if (!APIhou.api_at_eflag) APIhou.api_at_eflag = [];
	}
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canStillShell()) {
			if (canSpecialAttack(order1[i])) {
				let ships = getSpecialAttackShips(order1[i].fleet.ships,order1[i].attackSpecial);
				let k=0;
				for (; k<ships.length; k++) {
					if (targets.alive2.length + targets.alive2C.length <= 0) break;
					doShellC(ships[k],targets,APIhou,isOASW,order1[i].attackSpecial);
				}
				order1[i].fleet.didSpecial = 1;
				if (C) {
					apiAdjustHougekiSpecial(APIhou,k);
				}
			} else {
				doShellC(order1[i],targets,APIhou,isOASW);
			}
		}
		var num2 = targets.alive2.length+targets.subsalive2.length;
		if (targets.alive2C) num2 += targets.alive2C.length+targets.subsalive2C.length;
		if (num2 <= 0) break;
		if (i < order2.length && order2[i].canStillShell()) {
			var targetData, targetCFirst = targets.alive1C && Math.random() < .4; // Source: https://twitter.com/noratako5/status/835179687420682241
			if (targetCFirst) {
				targetData = shellPhaseTarget(order2[i],targets.alive1C,targets.subsalive1C,isOASW);
				if (!targetData.target) targetData = shellPhaseTarget(order2[i],targets.alive1,targets.subsalive1,isOASW);
			} else {
				targetData = shellPhaseTarget(order2[i],targets.alive1,targets.subsalive1,isOASW);
				if (!targetData.target && targets.alive1C) targetData = shellPhaseTarget(order2[i],targets.alive1C,targets.subsalive1C,isOASW);
			}
			shellPhaseAttack(order2[i],targetData,APIhou,isOASW);
		}
		var num1 = targets.alive1.length+targets.subsalive1.length;
		if (targets.alive1C) num1 += targets.alive1C.length+targets.subsalive1C.length;
		if (num1 <= 0) break;
	}
}

function nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,APIyasen) {
	var APIhou = (APIyasen)? APIyasen.api_hougeki : undefined;
	var star1 = false;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive1[i].hasStarShell && alive1[i].HP > 4 && Math.random() < .7) { star1 = true; if (C) APIyasen.api_flare_pos[0] = alive1[i].num+off; break; }
	}
	var star2 = false;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive2[i].hasStarShell && alive2[i].HP > 4 && Math.random() < .7) { star2 = true; if (C) APIyasen.api_flare_pos[1] = alive2[i].num+off; break; }
	}
	var light1 = false, lightship1 = 0, slrerolls1 = 0;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		if (alive1[i].hasSearchlight && alive1[i].HP > 1) { light1 = true; lightship1 = i; slrerolls1 = alive1[i].hasSearchlight; break; }
	}
	var light2 = false, lightship2 = 0, slrerolls2 = 0;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		if (alive2[i].hasSearchlight && alive2[i].HP > 1) { light2 = true; lightship2 = i; slrerolls2 = alive2[i].hasSearchlight; break; }
	}
	var scout1 = false;
	if (alive1[0] && alive1[0].fleet.AS != -2 && (NBonly || alive1[0].fleet.AS != 0)) {
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].retreated) continue;
			if (alive1[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive1[i].LVL)*Math.sqrt(3))/25) { scout1 = true; if (C) APIyasen.api_touch_plane[0] = 102; break; }
		}
	}
	var scout2 = false;
	if (alive2[0] && alive2[0].fleet.AS != -2 && (NBonly || alive2[0].fleet.AS != 0)) {
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].retreated) continue;
			if (alive2[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive2[i].LVL)*Math.sqrt(3))/25) { scout2 = true; if (C) APIyasen.api_touch_plane[1] = 102; break; }
		}
	}
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canNB()) {
			if (canSpecialAttackNB(order1[i])) {
				let ships = getSpecialAttackShips(order1[i].fleet.ships,order1[i].attackSpecial);
				let k=0;
				for (; k<ships.length; k++) {
					if (alive2.length <= 0) break;
					var target = choiceWProtect(alive2,slrerolls2,true);
					if (NBattack(ships[k],target,NBonly,[[star1,star2],[light1,light2],[scout1,scout2]],APIhou,order1[i].attackSpecial)) alive2.splice(alive2.indexOf(target),1);
				}
				if (order1[i].fleet.didSpecialNB[0]) order1[i].fleet.didSpecialNB[1] = 1;
				else order1[i].fleet.didSpecialNB[0] = 1;
				if (C) {
					apiAdjustHougekiSpecial(APIhou,k);
				}
			} else if (subsalive2.length && order1[i].canASW() && !order1[i].planeasw) {
				var target = choiceWProtect(subsalive2,0,true);
				if (ASW(order1[i],target,(!NBonly&&!order1[i].isescort),APIhou)) subsalive2.splice(subsalive2.indexOf(target),1);
			} else if (alive2.length) {
				var target = choiceWProtect(alive2,slrerolls2,true);
				if (NBattack(order1[i],target,NBonly,[[star1,star2],[light1,light2],[scout1,scout2]],APIhou)) alive2.splice(alive2.indexOf(target),1);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canNB() && (order2[i].nightattack != 3 || light1)) {
			if (subsalive1.length && order2[i].canASW() && !order2[i].planeasw) {
				var target = choiceWProtect(subsalive1,0,true);
				if (ASW(order2[i],target,(!NBonly&&!order2[i].isescort),APIhou)) subsalive1.splice(subsalive1.indexOf(target),1);
			} else if (alive1.length) {
				var target = choiceWProtect(alive1,slrerolls1,true);
				if (NBattack(order2[i],target,NBonly,[[star2,star1],[light2,light1],[scout2,scout1]],APIhou)) alive1.splice(alive1.indexOf(target),1);
			}
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
}

function apiAdjustHougekiSpecial(APIhou,numAttack) {
	let ind = APIhou.api_damage.length - numAttack;
	for (let i=1; i<numAttack; i++) {
		for (let key of ['api_damage','api_cl_list','api_df_list']) {
			APIhou[key][ind].push(APIhou[key][ind+i][0]);
		}
	}
	for (let i=1; i<numAttack; i++) {
		for (let key in APIhou) {
			APIhou[key].pop();
		}
	}
}

function torpedoPhase(alive1,subsalive1,alive2,subsalive2,opening,APIrai,combinedAll) {
	var shots = []; //set up shots
	var targets2 = [];
	for (var i=0; i<alive2.length; i++) { if (!alive2[i].isInstall) targets2.push(alive2[i]); }
	var targets1 = [];
	for (var i=0; i<alive1.length; i++) { if (!alive1[i].isInstall) targets1.push(alive1[i]); }
	
	if (C && NEWFORMAT) {
		for (let key in APIrai) APIrai[key].shift();
		for (let i=0; i<APIrai.api_frai.length; i++) APIrai.api_frai[i] = -1;
		for (let i=0; i<APIrai.api_erai.length; i++) APIrai.api_erai[i] = -1;
	}
	
	if (combinedAll) {
		var targetsM1 = [], targetsM2 = [], targetsE1 = [], targetsE2 = [];
		for (var i=0; i<targets1.length; i++) {
			if (targets1[i].isescort) targetsE1.push(targets1[i]);
			else targetsM1.push(targets1[i]);
		}
		for (var i=0; i<targets2.length; i++) {
			if (targets2[i].isescort) targetsE2.push(targets2[i]);
			else targetsM2.push(targets2[i]);
		}
	}
	
	// Closing torpedo target selection data: https://twitter.com/noratako5/status/835180133342334976
	// 1. Team selection: main 0.35 escort 0.65
	// 2. Only main can protect flagship
	// Opening torpedo target selection:
	// 1. No team selection
	// 2. Only main can protect flagship

	if (targets2.length) {  //any targets?
		for (var i=0; i<alive1.length+subsalive1.length; i++) {
			var ship = (i < alive1.length) ? alive1[i] : subsalive1[i-alive1.length];
			if (ship.fleet.combinedWith && !ship.isescort && (!ship.canOpTorpMain || !opening)) continue;
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				if (combinedAll) {
					if (!targetsE2.length) targets2 = targetsM2;
					else if (!targetsM2.length) targets2 = targetsE2;
					else targets2 = (Math.random() < (opening? targetsM2.length/targets2.length : .35))? targetsM2 : targetsE2;
				}
				var target = choiceWProtect(targets2);
				shots.push([ship,target]);
			}
		}
	}
	if (targets1.length) {
		for (var i=0; i<alive2.length+subsalive2.length; i++) {
			var ship = (i < alive2.length) ? alive2[i] : subsalive2[i-alive2.length];
			if (ship.fleet.combinedWith && !ship.isescort && (!ship.canOpTorpMain || !opening)) continue;
			if ((opening)? ship.canOpTorp() : ship.canTorp()) {
				if (combinedAll) {
					if (!targetsE1.length) targets1 = targetsM1;
					else if (!targetsM1.length) targets1 = targetsE1;
					else targets1 = (Math.random() < (opening? targetsM1.length/targets1.length : .35))? targetsM1 : targetsE1;
				}
				var target = choiceWProtect(targets1);
				shots.push([ship,target]);
			}
		}
	}
	var damageMods = {};
	for (var i=0; i<shots.length; i++) damageMods[shots[i][0].id] = shots[i][0].damageMod(true);
	for (var i=0; i<shots.length; i++) {  //do the shots
		var ship = shots[i][0]; var target = shots[i][1];
		
		var power = (combinedAll)? ship.TP+15 : (ship.isescort||target.isescort)? ship.TP : (ship.TP+5);
		power += (ship.improves.Ptorp || 0);
		power *= ship.getFormation().torpmod*ENGAGEMENT*(combinedAll? ship.damageMod(true) : damageMods[ship.id]);
		if (power > TORPDMGBASE) power = TORPDMGBASE + Math.sqrt(power-TORPDMGBASE);
		
		var accbase = 85;
		var accflat = (ship.ACC)? ship.ACC : 0;
		if (ship.improves.ACCtorp) accflat += Math.floor(ship.improves.ACCtorp);
		accflat += Math.floor(power/5);
		if (ship.TACC) accflat += ship.TACC;
		var ptMod = (target.isPT)? .4 : 1;
		var acc = hitRate(ship,accbase,accflat,ship.getFormation().torpacc*ship.moraleMod(true)*ptMod);
		
		var evFlat = (target.improves.EVtorp)? ship.improves.EVtorp : 0;
		if (target.fleet.formation.id == 6) {
			if (MECHANICS.newVanguardMod && target.fleet.ships.length == 6) evFlat += vanguardEvFlat(target, true);
			else {
				if (target.num/target.fleet.ships.length <= .8) {
					evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD1 : SIMCONSTS.vanguardEvOther1;
				} else {
					evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD2 : SIMCONSTS.vanguardEvOther2;
				}
			}
		}
		
		let postMod = 1;
		
		var res = rollHit(accuracyAndCrit(ship,target,acc,target.getFormation().torpev,evFlat,1.5));
		var realdmg = 0, dmg = 0;
		if (res) {
			dmg = damage(ship,target,power,1,{postMod:postMod,critMod:res},10000); //power already capped
			realdmg = takeDamage(target,dmg);
		}
		ship.fleet.giveCredit(ship,target,realdmg);
		if (C) {
			console.log(ship.name+' torpedoes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left');
			let shipidx = (APIrai.api_frai.length > 7)? ship.apiID2 : ship.num;
			let targetidx = (APIrai.api_frai.length > 7)? target.apiID2 : target.num;
			if (NEWFORMAT) {
				shipidx = ship.apiID2-1; targetidx = target.apiID2-1;
			}
			APIrai[(ship.side)?'api_erai':'api_frai'][shipidx] = targetidx;
			let apidam = (target.side)?'api_edam':'api_fdam';
			APIrai[apidam][targetidx] = APIrai[apidam][targetidx] + realdmg || realdmg;
			APIrai[(ship.side)?'api_eydam':'api_fydam'][shipidx] = realdmg;
			APIrai[(ship.side)?'api_ecl':'api_fcl'][shipidx] = (res>1)? 2 : (dmg)? 1 : 0;
		}
	}
	for (var i=0; i<alive1.length; i++) {   //remove dead things
		if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
	}
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
	}
}

function airstrike(ship,target,slot,contactMod,issupport,isjetphase) {
	if (!contactMod) contactMod = 1;
	var acc = .95 + (target.fleet.airstrikeaccMod || 0) / 100; // main +10, escort -20
	if (target.isPT) acc *= .8;
	if (issupport) acc = .85;  
	var res = rollHit(accuracyAndCrit(ship,target,acc,1.0,0,.2,!issupport),(!issupport)? (ship.critdmgbonus || 1) : 1);  // No evMod for airstrike
	var equip = ship.equips[slot];
	var dmg = 0, realdmg = 0;
	var planebase = (equip.isdivebomber)? (equip.DIVEBOMB || 0) : (target.isInstall)? 0 : (equip.TP || 0);
	if (!issupport) planebase += (equip.ASImprove || 0);
	if (C) console.log('	slot:'+slot+' planecount:'+ship.planecount[slot]+' planebase:'+planebase);
	if (res) {
		var preMod = (equip.isdivebomber)? 1 : ((Math.random() < .5)? .8 : 1.5);
		if (equip.isjet && !isjetphase) preMod *= 1/Math.sqrt(2);
		var postMod = 1;
		if (issupport){
			if (MECHANICS.LBASBuff) postMod *= 1.35;
			var dmgbase = 3 + Math.sqrt(ship.planecount[slot]) * planebase;
			dmg = damageSupport(ship,target,dmgbase,preMod,{postMod:postMod,critMod:res},SUPPORTDMGBASE);
		}else{
			postMod *= contactMod;
			var dmgbase = 25 + (target.fleet.airstrikeMod || 0) + Math.sqrt(ship.planecount[slot]) * planebase;   // main -10, escort -20
			dmg = damage(ship,target,dmgbase,preMod,{postMod:postMod,critMod:res},AIRSTRIKEDMGBASE,equip);
		}
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,target,realdmg);
	if(C) {
		console.log(ship.name+' airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function takeDamage(ship,damage) {
	if (damage < 0) damage = 0;
	if (ship.protection) {
		if (ship.HP == 1) damage = 0;
		else if (damage >= ship.HP) damage = Math.floor(ship.HP*.5+.3*Math.floor(Math.random()*ship.HP));  //overkill protection
	}
	ship.HP -= damage;
	if (ship.HP <= 0 && ship.repairs && ship.repairs.length) {
		var repair = ship.repairs.shift();
		if (repair == 42) {
			ship.HP = Math.floor(.2*ship.maxHP);
			ship.repairSpent = 1;
		}
		else if (repair == 43) { 
			ship.HP = ship.maxHP; 
			ship.fuelleft = ship.ammoleft = 10;
			ship.repairSpent = 2;
		}
		if (ship.side==0) ship.protection = true;
	}
	
	return damage;
}

function hitRate(ship,accBase,accFlat,accMod) {
	if (C) console.log('    accbase:'+accBase+' accflat:'+accFlat.toFixed(1)+' accmod:'+accMod.toFixed(2));
	return (accBase + 2*Math.sqrt(ship.LVL) + 1.5*Math.sqrt(ship.LUK) + accFlat)*accMod*.01;
}

function accuracyAndCrit(ship,target,hit,evMod,evFlat,critrateMod,isPlanes,critBonusFlat) {
	if (evMod===undefined) evMod = 1;
	
	var evade = Math.floor((target.EV+Math.sqrt(target.LUK*2)) * evMod); //formation
	var dodge = (evade>65)? Math.floor(55+2*Math.sqrt(evade-65)) : ((evade>40)? Math.floor(40+3*Math.sqrt(evade-40)) : evade);
	dodge*=.01;
	if (target.fuelleft < 7.5) dodge -= (7.5-target.fuelleft)/10;
	if (evFlat) dodge += evFlat*.01;
	if (target.evimprove) dodge += target.evimprove*.01;
	dodge *= target.evbonusSpecial || 1;

	if (!(ship instanceof LandBase) && !ship.fleet.supportType){
		var specialMod = 1; //e.g. equipment and historical bonus
		if (target.equipWeak && ship.equips) specialMod *= getSpecialEquipBonus(ship,target,undefined,true);
		specialMod *= ship.bonusSpecial || 1;
		hit *= specialMod;
	}
	hit = Math.floor(hit*100)*.01;

	if (C) console.log('	hit:'+hit.toFixed(2)+' dodge:'+dodge.toFixed(2));
	acc = Math.max(hit-dodge,.1);
	acc *= target.moraleModEv();
	acc = Math.min(.96,acc);
	if (isPlanes) acc += (ship.ACCplane||0)*.01;

	var crit = Math.floor(Math.sqrt(100*acc)*critrateMod)*.01;
	if (isPlanes) {
		if (critBonusFlat) crit += critBonusFlat || 0;
		else crit += (ship.critratebonus||0)*.01;
	}

	if (C) console.log('	accfinal:'+acc.toFixed(2)+', crit:'+crit.toFixed(2));
	return [acc,crit];
}

function rollHit(accCrit,critdmgbonus) {
	var r = Math.floor(Math.random()*100)/100;
	if (r <= accCrit[1]) return CRITMOD * (critdmgbonus || 1);
	if (r <= accCrit[0]) return 1; //normal hit
	return 0;  //miss
}

function damage(ship,target,base,preMod,postMod,cap,plane) {
	if (!cap) cap = 170;
	if (typeof preMod === 'undefined') preMod = 1;
	if (typeof postMod === 'undefined') postMod = 1;
	if (C) console.log('	ship:'+ship.id+' target:'+target.id+' base:'+base);

	var dmg = base;
	if (typeof preMod === 'object'){
		dmg *= preMod[0]; 
		dmg += preMod[1]; 
		if (C) console.log('	premod:'+preMod[0].toFixed(2)+' dmg after premod:'+dmg.toFixed(1));
	}else{
		dmg *= preMod;
		if (C) console.log('	premod:'+preMod.toFixed(2)+' dmg after premod:'+dmg.toFixed(1));
	}

	if (dmg > cap) {
		dmg = cap + Math.sqrt(dmg-cap);
		if (C) console.log('	cap:'+cap+' dmg after cap:'+dmg.toFixed(1));
	}

	dmg = dmgSpecialTarget(dmg,ship,target,plane);
	if (typeof postMod === 'object'){
		dmg *= (postMod.postMod || 1);
		if (C) console.log('	postmod:'+(postMod.postMod||1).toFixed(2)+' dmg after postmod:'+dmg.toFixed(1));
		if (postMod.apMod && postMod.apMod !== 1) {
			dmg = Math.floor(dmg*postMod.apMod);
			if (C) console.log('	apmod:'+postMod.apMod.toFixed(2)+' dmg after apmod:'+dmg);
		} 
		if (postMod.critMod && postMod.critMod !== 1) {
			dmg = Math.floor(dmg*postMod.critMod);
			if (C) console.log('	critmod:'+postMod.critMod.toFixed(2)+' dmg after critmod:'+dmg);
		}
	}else{
		dmg *= postMod;
		if (C) console.log('	postmod:'+postMod.toFixed(2)+' dmg after postmod:'+dmg.toFixed(1));
	}

	var specialMod = 1; //e.g. equipment and historical bonus
	if (target.equipWeak && ship.equips) specialMod *= getSpecialEquipBonus(ship,target,plane);
	specialMod *= ship.bonusSpecial || 1;
	specialMod *= target.debuff || 1;
	dmg *= specialMod;
	if (C && specialMod !== 1) console.log('	specialmod:'+specialMod.toFixed(2)+'	dmg after specialmod:'+dmg.toFixed(1));

	var ar = target.AR + (target.improves.AR || 0);
	dmg -= .7*ar+.6*Math.floor(Math.random()*ar);
	if (target.isSub) dmg += (ship.aswPenetrate || 0);
	if (C) console.log('	dmg after def:'+dmg.toFixed(1));
	
	if (ship.ammoleft < 5) dmg *= .2*ship.ammoleft;
	
	dmg = Math.floor(dmg);
	if (dmg <= 0) dmg = getScratchDamage(target.HP);
	if (C) console.log('	returned:'+dmg);
	return dmg;
}

function damageSupport(ship,target,base,preMod,postMod,cap){
	if (!cap) cap = 170;
	if (typeof preMod === 'undefined') preMod = 1;
	if (typeof postMod === 'undefined') postMod = 1;
	if (C) console.log('	ship:'+ship.id+' target:'+target.id+' base:'+base);

	var dmg = base;
	dmg *= preMod;
	if (C) console.log('	premod:'+preMod.toFixed(2)+' dmg after premod:'+dmg.toFixed(1));

	if (dmg > cap) {
		dmg = cap + Math.sqrt(dmg-cap);
		if (C) console.log('	cap:'+cap+' dmg after cap:'+dmg.toFixed(1));
	}

	dmg = Math.floor(dmg);
	if (typeof postMod === 'object'){
		dmg *= (postMod.postMod || 1);
		if (C) console.log('	postmod:'+(postMod.postMod||1).toFixed(2)+' dmg after postmod:'+dmg.toFixed(1));
		if (postMod.critMod && postMod.critMod !== 1) {
			dmg = Math.floor(dmg*postMod.critMod);
			if (C) console.log('	critmod:'+postMod.critMod.toFixed(2)+' dmg after critmod:'+dmg);
		}
	}else{
		dmg *= postMod;
		if (C) console.log('	postmod:'+postMod.toFixed(2)+' dmg after postmod:'+dmg.toFixed(1));
	}

	var ar = target.AR + (target.improves.AR || 0);
	dmg -= .7*ar+.6*Math.floor(Math.random()*ar);
	if (target.isSub) dmg += (ship.aswPenetrate || 0);
	if (C) console.log('	dmg after def:'+dmg.toFixed(1));
	
	if (ship.ammoleft < 5) dmg *= .2*ship.ammoleft;
	
	dmg = Math.floor(dmg);
	if (dmg <= 0) dmg = getScratchDamage(target.HP);
	if (C) console.log('	returned:'+dmg);
	return dmg;
}

function getScratchDamage(hp) {
	return Math.floor(hp*.06+.08*Math.floor(Math.random()*hp))
}

function softCap(num,cap) {
	return (num > cap)? cap+Math.sqrt(num-cap) : num;
}

function compareAP(fleet1,fleet2,isjetphase,includeEscort,includeScout,isSupport) {
	var ap1 = fleet1.fleetAirPower(isjetphase,includeScout,isSupport), ap2 = fleet2.fleetAirPower(isjetphase,includeScout);
	if (includeEscort) {
		if (fleet1.combinedWith) ap1 += fleet1.combinedWith.fleetAirPower(isjetphase,includeScout);
		if (fleet2.combinedWith) ap2 += fleet2.combinedWith.fleetAirPower(isjetphase,includeScout);
	}
	if (ap1 == 0 && ap2 == 0) { fleet1.AS = fleet2.AS = 0; }
	else if (ap1 >= ap2*3) { fleet1.AS = 2; fleet2.AS = -2; }
	else if (ap1 >= ap2*1.5) { fleet1.AS = 1; fleet2.AS = -1; }
	else if (ap2 >= ap1*3) { fleet1.AS = -2; fleet2.AS = 2; }
	else if (ap2 >= ap1*1.5) { fleet1.AS = -1; fleet2.AS = 1; }
	else { fleet1.AS = fleet2.AS = 0; }
	if (C) console.log('AS: '+ap1+' '+ap2+' '+fleet1.AS + ' '+fleet2.AS);
}

function choiceWProtect(targets,searchlightRerolls,isNightPhase) {
	DIDPROTECT = false; //disgusting hack, rework later?
	var target = targets[Math.floor(Math.random()*targets.length)];
	if (target.getFormation() == VANGUARD1) {
		target = targets[Math.floor(Math.random()*targets.length)];
	}
	if (MECHANICS.flagProtect && target.isflagship && !target.isInstall && (!target.isescort || isNightPhase)) {
		target = selectProtect(target,targets,isNightPhase);
	}
	if (!searchlightRerolls) return target;
	for (var i=0; i<searchlightRerolls; i++) {
		if (!target.hasSearchlight) {
			target = targets[Math.floor(Math.random()*targets.length)];
		}
		if (MECHANICS.flagProtect && target.isflagship && !target.isInstall && (!target.isescort || isNightPhase)) {
			target = selectProtect(target,targets,isNightPhase);
		}
	}
	return target;
}

function selectProtect(target,targets,isNightPhase) {
	var rate = [0,.45,.6,.75,.6,.6,.75][target.fleet.formation.id];
	if (!rate) rate = .6; // Combined fleet
	if (Math.random() > rate) return target;
	var defenders = [];
	for (var i=0; i<targets.length; i++) {
		if (targets[i].isInstall) continue;
		if (targets[i].HP/targets[i].maxHP <= .75) continue;
		if (targets[i].isflagship && (!targets[i].isescort || isNightPhase)) continue;
		defenders.push(targets[i]);
	}
	if (C) { console.log('***FLAGSHIP PROTECT '+rate+' '+defenders.length); console.log(defenders); }
	if (defenders.length <= 0) return target;
	DIDPROTECT = true;
	let defender = defenders[Math.floor(Math.random()*(defenders.length))];
	// if (defender.side == 1 && defender.fleet != target.fleet) DIDPROTECT = false; //no animation for enemy combined?
	return defender;
}

function AADefenceFighters(carriers,showplanes,APIkouku,isjetphase) {
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i], hasfighter = false;
		for (var j=0; j<ship.equips.length; j++) {
			if ((ship.equips[j].isfighter||ship.equips[j].isdivebomber||ship.equips[j].istorpbomber)&&(!isjetphase||ship.equips[j].isjet)) {
				var lostcount;
				if (ship.side==0) {
					var rmin, rplus;
					switch(ship.airState()) {
						case 2: rmin = .025; rplus = .0333; break;
						case 1: rmin = .075; rplus = .1; break;
						case 0: rmin = .125; rplus = .1666; break;
						case -1: rmin = .175; rplus = .2333; break;
						case -2: rmin = .25; rplus = .3333; break;
					}
					var randplus = Math.floor((Math.floor(1000*rplus)+1)*Math.random())/1000;
					lostcount = Math.floor(ship.planecount[j]*(rmin+randplus)*(ship.equips[j].isjet? 0.6: 1));
				} else {
					var rmax;
					switch(ship.fleet.AS) {
						case 2: rmax = 2; break;
						case 1: rmax = 5; break;
						case 0: rmax = 7; break;
						case -1: rmax = 9; break;
						case -2: rmax = 11; break;
					}
					var mod = Math.floor(Math.random()*rmax)*.35 + Math.floor(Math.random()*rmax)*.65;
					lostcount = Math.floor(ship.planecount[j]*mod/10);
				}
				if (C) {
					APIkouku.api_stage1[(ship.side)? 'api_e_count':'api_f_count'] += ship.planecount[j];
					APIkouku.api_stage1[(ship.side)? 'api_e_lostcount':'api_f_lostcount'] += lostcount;
					if (!ship.equips[j].lostnums) ship.equips[j].lostnums = [];
					ship.equips[j].lostnums.push(lostcount);
				}
				ship.planecount[j] -= lostcount;
				if (ship.planecount[j] < 0) ship.planecount[j] = 0;
				// if (!ship.equips[j].istorpbomber&&!ship.equips[j].isdivebomber) hasfighter = true;
				hasfighter = true;
			}
		}
		if (C && hasfighter && showplanes && ship.apiID2) APIkouku.api_plane_from[ship.side].push(ship.apiID2);
	}
}

function getAAShotProp(defender,slotsize,isbombing,resistMod) {
	var sAA = defender.weightedAntiAir();
	var mod = 1;
	if (MECHANICS.aaResist && resistMod) sAA = Math.floor(sAA*resistMod);
	if (defender.fleet.combinedWith){
		if (defender.isescort) mod *= .48;
		else if (isbombing && defender.side == 0) mod *= .72;
		else mod *= .8;
	}
	return Math.floor(slotsize*sAA*mod/400);
}

function getAAShotFlat(defender,isbombing,resistModShip,resistModFleet) {
	var mod = (defender.side==0)? .1 : 0.09375;
	var fAA = (MECHANICS.fixFleetAA)? defender.fleet.fleetAntiAir() : 0;
	var sAA = defender.weightedAntiAir();
	if (MECHANICS.aaResist) {
		if (resistModShip) sAA = Math.floor(sAA*resistModShip);
		if (resistModFleet) fAA = Math.floor(fAA*resistModFleet);
	}
	if (defender.fleet.combinedWith){
		if (defender.isescort) mod *= .48;
		else if (isbombing && defender.side == 0) mod *= .72;
		else mod *= .8;
	}
	return (sAA+fAA)*mod;
}

function getAACI(defenders,APIkouku) {
	var AACInum = 0, AACImod = 1;
	if (MECHANICS.AACI) {
		var AACIship, AACItype = 0;
		for (var i=0; i<defenders.length; i++) {
			if (defenders[i].AACItype.length) {
				var r = Math.random();
				for (var j=0; j<defenders[i].AACItype.length; j++) {
					var type = defenders[i].AACItype[j];
					let roll = (AACIDATA[type].rollIndiv)? Math.random() : r;
					if (type > AACItype && roll < AACIDATA[type].rate) {
						AACItype = type;
						AACIship = defenders[i];
						break;
					}
				}
			}
		}
		if (AACItype) {
			AACInum = AACIDATA[AACItype].num;
			AACImod = AACIDATA[AACItype].mod;
			if (C) {
				var apiAACI = APIkouku.api_stage2[(!AACIship.side)?'api_air_fire':'api_air_fire_e'] = {api_idx:AACIship.apiID2-1,api_kind:AACItype};
				apiAACI.api_use_items = [];
				if (AACItype == 34) {
					apiAACI.api_use_items = [308,308];
				} else if (AACItype == 35) {
					apiAACI.api_use_items = [308,313];
				} else if (AACItype == 36) {
					apiAACI.api_use_items = [313,313,307];
				} else if (AACItype == 37) {
					apiAACI.api_use_items = [313,313];
				} else if (AACItype == 39) {
					apiAACI.api_use_items = [363,362];
				} else if (AACItype == 40) {
					apiAACI.api_use_items = [362,362,307];
				} else if (AACItype == 41) {
					apiAACI.api_use_items = [362,362];
				} else if (AACItype == 32) {
					let mids = [];
					for (let equip of AACIship.equips) mids.push(equip.mid);
					for (let setup of [[191,300],[301,191],[301,301]]) {
						if (mids.indexOf(setup[0]) != -1 && mids.indexOf(setup[1]) != -1) {
							apiAACI.api_use_items = setup;
							break;
						}
					}
				} else {
					let equips = AACIship.equips.slice();
					for (let letter of AACIDATA[AACItype].equip) {
						let eqShow = null;
						for (let equip of equips) {
							if ((letter == 'B' && equip.atype == A_HAFD) 
								|| (letter == 'H' && (equip.atype == A_HAGUN || equip.atype == A_HAFD))
								|| (letter == 'C' && equip.isconcentrated)
								|| (letter == 'G' && equip.atype == A_AAGUN)
								|| (letter == 'R' && equip.atype == A_AIRRADAR)
								|| (letter == 'A' && equip.atype == A_AAFD)
								|| (letter == 'M' && equip.type == MAINGUNL)
								|| (letter == 'S' && equip.type == TYPE3SHELL)
								) {
								eqShow = equip;
								break;
							}
						}
						if (eqShow) {
							apiAACI.api_use_items.push(eqShow.mid);
							equips.splice(equips.indexOf(eqShow),1);
						}
					}
				}
			}
		}
	}
	return { num: AACInum, mod: AACImod };
}

function getContact(carriers) {
	if (!MECHANICS.artillerySpotting) return null;
	var losPower = 0;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if (e.LOS && [SEAPLANE, CARRIERSCOUT, CARRIERSCOUT2, FLYINGBOAT, LANDSCOUT].indexOf(e.type) !== -1) losPower += Math.floor(Math.sqrt(ship.planecount[j])*e.LOS);
		}
	}
	var chance, cmod;
	if (carriers[0].airState() == 2) { chance = (losPower+1)/25; cmod = 14; }
	else if (carriers[0].airState() == 1) { chance = (losPower+1)/40; cmod = 16; }
	else { chance = (losPower+1)/55; cmod = 18; }
	if (C) console.log('CONTACT CHANCE 1: '+chance);
	//phase 2
	if (Math.random() < chance) {
		var contacter = null;
		for (var j=0; j<carriers.length; j++) {
			var ship = carriers[j];
			for (var i=0; i<ship.equips.length; i++) {
				var equip = ship.equips[i];
				if (!EQTDATA[equip.type].canContact || !equip.LOS) continue;
				if (contacter && ((contacter.ACC||0) >= (equip.ACC||0))) continue;
				if (C) console.log('    CHANCE 2: '+(equip.LOS/cmod));
				if (Math.random() < equip.LOS/cmod) contacter = equip;
			}
		}
		if (contacter) {
			if (contacter.ACC >= 3) contactMod = 1.2;
			else if(contacter.ACC==2) contactMod = 1.17;
			else contactMod = 1.12;
			return {mod:contactMod, id:contacter.mid};
		}
	}
	return null;
}

function AADefenceBombersAndAirstrike(carriers,targets,defenders,APIkouku,issupport,isbombing,isjetphase,combinedAll) {
	var bombers = [], hasbomber = false;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		bombers.push([]);
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if ((e.istorpbomber || e.isdivebomber) && ship.planecount[j]>0 && (!isjetphase||e.isjet)) {
				bombers[i].push(j);
				hasbomber = true;
				var side = (ship.side == 2 || ship.side == 3)? 0 : ship.side;
				if (C && APIkouku.api_plane_from[side].indexOf(ship.apiID2)==-1) APIkouku.api_plane_from[side].push(ship.apiID2);
			}
		}
	}
	if (!hasbomber) return;
	
	//get AACI
	var AACInum = 0, AACImod = 1;
	if (SIMCONSTS.enableEnemyAACI) {
		let AACIResult = getAACI(defenders,APIkouku);
		AACInum = AACIResult.num;
		AACImod = AACIResult.mod;
	}
	
	//get contact
	var contactMod = 1;
	if (carriers[0].airState() != -2 && carriers[0].airState() != 0 && !issupport && !isjetphase) {   // Temporary measure as no jet scout currently
		var contactdata = getContact(carriers);
		if (contactdata) {
			contactMod = contactdata.mod;
			if (C) APIkouku.api_stage1.api_touch_plane[carriers[0].side] = contactdata.id;
		}
	}
	
	//get rocket barrage
	for (let target of targets) {
		let chance = target.rocketBarrageChance();
		if (chance && Math.random() < chance) target._rocketTriggered = true;
	}

	for (var i=0; i<bombers.length; i++) {
		var ship = carriers[i];
		// S2
		for (var j=0; j<bombers[i].length; j++) {
			var slot = bombers[i][j];
			var defender = defenders[Math.floor(Math.random()*defenders.length)];
			var supportMod = (issupport)? .8 : 1;
			var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,ship.planecount[slot],isbombing,ship.equips[slot].aaResistShip)*supportMod) : 0;
			var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender,isbombing,ship.equips[slot].aaResistShip,ship.equips[slot].aaResistFleet)*AACImod*supportMod) : 0;
			var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
			
			if (C) {
				APIkouku.api_stage2[(ship.side)?'api_e_count':'api_f_count'] += ship.planecount[slot];
				APIkouku.api_stage2[(ship.side)?'api_e_lostcount':'api_f_lostcount'] += shotProp+shotFlat+shotFix;
				if (!ship.equips[slot].lostnums) ship.equips[slot].lostnums = [];
				ship.equips[slot].lostnums.push(shotProp+shotFlat+shotFix);
			}
			ship.planecount[slot] = Math.max(0,ship.planecount[slot]-shotProp-shotFlat-shotFix);
			if (C) console.log(ship.name + ' ' + slot + '	anti air: '+defender.name+' '+defender.AA+' '+shotProp+' '+shotFlat+' '+shotFix+' '+ship.planecount[slot]);
		
			if (ship.planecount[slot]<=0) {
				ship.planecount[slot] = 0;
				ship.removeProficiencyBonus(slot);
			}
		}
		// S3
		for (var j=0; j<bombers[i].length; j++) {
			var slot = bombers[i][j];
			if (ship.planecount[slot]<=0) continue
			if (targets.length) {  //even if subs only, bombers still get shot down
				// Air Battle Target Selection:
				// 1. Flagship protection equally shared by all the 11 escorts
				// 2. Equal distribution of target chance
				var target = choiceWProtect(targets);
				if (target._rocketTriggered) continue;
				var dmg = airstrike(ship,target,slot,contactMod,issupport,isjetphase);
				if (C) {
					if (target.isescort) {
						APIkouku.api_stage3_combined[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3_combined[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3_combined[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3_combined[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					} else {
						if (!APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num]) APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] = 0;
						APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					}
				}
			}
		}
	}
	
	for (let target of targets) {
		target._rocketTriggered = false;
	}
}

function airPhase(alive1,subsalive1,alive2,subsalive2,APIkouku,isjetphase,isbombing,includeEscort) {
	var carriers1 = [], carriers2 = [];
	for (var i=0; i<alive1.length; i++) if ((includeEscort||!alive1[i].isescort) && (!isjetphase||alive1[i].hasjet)) carriers1.push(alive1[i]);
	for (var i=0; i<subsalive1.length; i++) if ((includeEscort||!subsalive1[i].isescort) && (!isjetphase||subsalive1[i].hasjet)) carriers1.push(subsalive1[i]);
	for (var i=0; i<alive2.length; i++) if ((!isjetphase||alive2[i].hasjet)) carriers2.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) if ((!isjetphase||subsalive2[i].hasjet)) carriers2.push(subsalive2[i]);
	
	if (carriers1.length||carriers2.length) {
		if (C) {
			APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
			APIkouku.api_stage2 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
			APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
			APIkouku.api_stage3_combined = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
		}
		
		//fighter defence
		AADefenceFighters(carriers1,alive2.length,APIkouku,isjetphase);
		AADefenceFighters(carriers2,alive1.length,APIkouku,isjetphase);
		
		//bomber defence
		if (!isbombing) AADefenceBombersAndAirstrike(carriers1,alive2,alive2.concat(subsalive2),APIkouku,false,isbombing,isjetphase,includeEscort);
		AADefenceBombersAndAirstrike(carriers2,alive1,alive1.concat(subsalive1),APIkouku,false,isbombing,isjetphase,includeEscort);
	}
	if (C) {
		for (var i=0; i<2; i++)
			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
		if (NEWFORMAT) {
			formatRemovePadding(APIkouku.api_stage3);
			formatRemovePadding(APIkouku.api_stage3_combined);
		}
	}
}

function supportPhase(shipsS,alive2,subsalive2,suptype,BAPI,isBoss,isNight) {
	if (C) {
		BAPI.data.api_support_flag = suptype;
		BAPI.data.api_support_info = { api_support_airatack:null, api_support_hourai:null };
		let apiSupport;
		if (suptype==2||suptype==3) {
			if (BAPI.data.api_ship_ke_combined)
				apiSupport = BAPI.data.api_support_info.api_support_hourai = { api_cl_list:[-1,0,0,0,0,0,0,0,0,0,0,0,0], api_damage:[-1,0,0,0,0,0,0,0,0,0,0,0,0], api_deck_id:(shipsS[0].fleet.deckId || 3)};
			else
				apiSupport = BAPI.data.api_support_info.api_support_hourai = { api_cl_list:[-1,0,0,0,0,0,0], api_damage:[-1,0,0,0,0,0,0], api_deck_id:(shipsS[0].fleet.deckId || 3)};
			if (NEWFORMAT) formatRemovePadding(BAPI.data.api_support_info.api_support_hourai);
		} else if (suptype==1) {
			apiSupport = BAPI.data.api_support_info.api_support_airatack = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
			BAPI.data.api_support_info.api_support_airatack.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
			BAPI.data.api_support_info.api_support_airatack.api_stage2 = {api_f_count:0,api_f_lostcount:0};
			BAPI.data.api_support_info.api_support_airatack.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
			BAPI.data.api_support_info.api_support_airatack.api_stage3_combined = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
		}
		apiSupport.api_ship_id = [];
		apiSupport.api_undressing_flag = [];
		for (let ship of shipsS) {
			apiSupport.api_ship_id.push(ship.mid); //actually roster ID
			apiSupport.api_undressing_flag.push(+(ship.HP/ship.maxHP <= .5));
		}
	}
	if (MECHANICS.LBASBuff && suptype == 1 && subsalive2.length) {
		for (let ship of shipsS) {
			if (ship.CVshelltype) {
				suptype = 4;
				break;
			}
		}
	}
	if (suptype != 4 && !alive2.length) return;
	if (suptype == 2 || suptype == 3) {
		var hou = (BAPI)? BAPI.data.api_support_info.api_support_hourai : undefined;
		var checkFormMod = FLEETS1[0] && FLEETS1[0].formation && (!FLEETS1[0].combinedWith || isNight) && !alive2[0].fleet.combinedWith;
		for (var i=0; i<shipsS.length; i++) {
			var ship = shipsS[i];
			var targets = alive2;
			// Support Hougeki:
			// 1. Team selection: Main 0.45 Escort 0.55
			// 2. Only main can protect flagship
			if (targets[0].fleet.combinedWith) {
				var targetsM = [], targetsE = [];
				for (var j=0; j<targets.length; j++) {
					if (targets[j].isescort) targetsE.push(targets[j]);
					else targetsM.push(targets[j]);
				}
				if (!targetsE.length) targets = targetsM;
				else if (!targetsM.length) targets = targetsE;
				else targets = (Math.random() < .45)? targetsM : targetsE;
			}
			var target = choiceWProtect(targets);
			var evFlat = 0;
			if (target.fleet.formation.id == 6) {
				if (MECHANICS.newVanguardMod && target.fleet.ships.length == 6) evFlat += vanguardEvFlat(target);
				else {
					if (target.num/target.fleet.ships.length <= .8) {
						evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD1 : SIMCONSTS.vanguardEvOther1;
					} else {
						evFlat += (target.type == 'DD')? SIMCONSTS.vanguardEvDD2 : SIMCONSTS.vanguardEvOther2;
					}
				}
			}
			var accCrit, torpDmg;
			if (suptype == 3) {
				if (!ship.canTorp()) continue;
				torpDmg = (FIXTORPEDOSUPPORT)? ship.TP : 0;  //is this the bug in the browser version?
				for (var j=0; j<ship.equips.length; j++) if (ship.equips[j].TP) torpDmg -= ship.equips[j].TP; //is this correct?
				torpDmg += 8;
				let accMod = ship.moraleMod(true);
				if (checkFormMod) accMod *= FLEETS1[0].formation.torpacc;
				accCrit = accuracyAndCrit(ship,target,hitRate(ship,54,ship.ACC+torpDmg*.35,accMod),target.getFormation().torpev,evFlat,1.2);
			} else {
				var baseacc;
				if (isBoss) baseacc = (SIMCONSTS.supportShellB != null)? SIMCONSTS.supportShellB : 64;
				else baseacc = (SIMCONSTS.supportShellN != null)? SIMCONSTS.supportShellN : 64;
				let accMod = ship.moraleMod();
				if (checkFormMod) accMod *= FLEETS1[0].formation.shellacc;
				accCrit = accuracyAndCrit(ship,target,hitRate(ship,baseacc,ship.ACC,accMod),target.getFormation().shellev,evFlat,1);
			}
			var res = rollHit(accCrit);
			var dmg = 0, realdmg = 0;
			if (res) {
				var preMod = ENGAGEMENT;
				var dmg;
				if (suptype == 3) {
					if (checkFormMod) preMod *= FLEETS1[0].formation.torpmod;
					dmg = damageSupport(ship,target,torpDmg*.55,preMod,{critMod:res},SUPPORTDMGBASE);
				}else {
					if (checkFormMod) preMod *= FLEETS1[0].formation.shellmod;
					dmg = damageSupport(ship,target,ship.shellPower(target,-1,true),preMod,{critMod:res},SUPPORTDMGBASE);
				}
				realdmg = takeDamage(target,dmg);
			} else { realdmg = 0; }
			if (C) {
				console.log(ship.name+' support attacks '+target.name+' for '+dmg+' damage');
				let off = (NEWFORMAT)? -1 : 0;
				hou.api_cl_list[target.apiID2+off] = Math.max(hou.api_cl_list[target.apiID2+off],((res>1)? 2 : (dmg)? 1 : 0));
				hou.api_damage[target.apiID2+off] += realdmg;
			}
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	} else if (suptype == 1 || suptype == 4) {
		for (var i=0; i<shipsS.length; i++) shipsS[i].id = 1;
		if (suptype == 4) {
			supportASW(shipsS,subsalive2,alive2.concat(subsalive2),(C)? BAPI.data.api_support_info.api_support_airatack : null,subsalive2[0].fleet.combinedWith);
		} else {
			var prevAS = alive2[0].fleet.AS;
			compareAP(shipsS[0].fleet,alive2[0].fleet,false,false,false,true);
			AADefenceFighters(shipsS,false,(C)? BAPI.data.api_support_info.api_support_airatack : null);
			AADefenceBombersAndAirstrike(shipsS,alive2,alive2.concat(subsalive2),(C)? BAPI.data.api_support_info.api_support_airatack : null,true,false,false,alive2[0].fleet.combinedWith);
			alive2[0].fleet.AS = prevAS;
		}
		if (C) {
			let airatack = BAPI.data.api_support_info.api_support_airatack;
			let shipA = (alive2.length)? alive2[0] : subsalive2[0];
			if (shipA.fleet.combinedWith) {
				for (let prop in airatack.api_stage3_combined) {
					for (let i=0; i<airatack.api_stage3_combined[prop].length; i++) {
						if (airatack.api_stage3_combined[prop][i] == -1) continue;
						airatack.api_stage3[prop].push(airatack.api_stage3_combined[prop][i]);
					}
				}
				delete airatack.api_stage3_combined;
			}
			if (NEWFORMAT) {
				formatRemovePadding(airatack.api_stage3);
				formatRemovePadding(airatack.api_stage3_combined);
			}
		}
	}
}

function supportASW(carriers,targets,defenders,APIkouku,combinedAll) {
	var bombers = [], hasbomber = false, ap1 = 0;
	for (var i=0; i<carriers.length; i++) {
		var ship = carriers[i];
		bombers.push([]);
		for (var j=0; j<ship.equips.length; j++) {
			var e = ship.equips[j];
			if (EQTDATA[e.type].isPlane && e.type != FIGHTER && ship.planecount[j]>0 && e.ASW && e.ASW >= 1) {
				bombers[i].push(j);
				ap1 += Math.floor((e.AA || 0) * Math.sqrt(ship.planecount[j]));
				hasbomber = true;
				var side = (ship.side == 2 || ship.side == 3)? 0 : ship.side;
				if (C && APIkouku.api_plane_from[side].indexOf(ship.apiID2)==-1) APIkouku.api_plane_from[side].push(ship.apiID2);
			}
		}
	}
	if (!hasbomber) return;

	var fleet1 = carriers[0].fleet, fleet2 = targets[0].fleet, ap2 = fleet2.fleetAirPower();
	if (ap1 >= ap2*3) fleet1.AS = 2
	else if (ap1 >= ap2*1.5) fleet1.AS = 1; 
	else if (ap2 >= ap1*3) fleet1.AS = -2;
	else if (ap2 >= ap1*1.5) fleet1.AS = -1;
	else fleet1.AS = 0;
	if (C) console.log('AS (ASW support): '+ap1+' '+ap2+' '+fleet1.AS);

	var AACInum = 0, AACImod = 1;
	
	for (var i=0; i<bombers.length; i++) {
		var ship = carriers[i];
		for (var j=0; j<bombers[i].length; j++) {
			var slot = bombers[i][j];
			// S1
			var rmin, rplus;
			switch(fleet1.AS) {
				case 2: rmin = .025; rplus = .0333; break;
				case 1: rmin = .075; rplus = .1; break;
				case 0: rmin = .125; rplus = .1666; break;
				case -1: rmin = .175; rplus = .2333; break;
				case -2: rmin = .25; rplus = .3333; break;
			}
			var randplus = Math.floor((Math.floor(1000*rplus)+1)*Math.random())/1000;
			var lostcount = Math.floor(ship.planecount[slot]*(rmin+randplus));
			ship.planecount[slot] = Math.max(0,ship.planecount[slot]-lostcount);

			// S2
			var defender = defenders[Math.floor(Math.random()*defenders.length)];
			var supportMod = .8;
			var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,ship.planecount[slot])*supportMod) : 0;
			var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender)*AACImod*supportMod) : 0;
			var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
			
			if (C) {
				APIkouku.api_stage2[(ship.side)?'api_e_count':'api_f_count'] += ship.planecount[slot];
				APIkouku.api_stage2[(ship.side)?'api_e_lostcount':'api_f_lostcount'] += shotProp+shotFlat+shotFix;
				if (!ship.equips[slot].lostnums) ship.equips[slot].lostnums = [];
				ship.equips[slot].lostnums.push(shotProp+shotFlat+shotFix);
			}
			ship.planecount[slot] = Math.max(0,ship.planecount[slot]-shotProp-shotFlat-shotFix);
			if (C) console.log('	anti air: '+defender.name+' '+defender.AA+' '+shotProp+' '+shotFlat+' '+shotFix+' '+ship.planecount[slot]);
		
			if (ship.planecount[slot]<=0) {
				ship.planecount[slot] = 0;
				continue;
			}
			
			if (targets.length) {
				// Air Battle Target Selection:
				// 1. Flagship protection equally shared by all the 11 escorts
				// 2. Equal distribution of target chance 
				var target = choiceWProtect(targets);
				var dmg = airstrikeSupportASW(ship,target,slot);
				
				if (C) {
					if (target.isescort) {
						APIkouku.api_stage3_combined[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3_combined[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3_combined[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3_combined[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					} else {
						if (!APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num]) APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] = 0;
						APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
						APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
						if (ship.equips[slot].istorpbomber) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
						else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
					}
				}
			}
		}
	}
}

function airstrikeSupportASW(ship,target,slot) {
	var acc = .42;
	var res = rollHit(accuracyAndCrit(ship,target,acc,1.0,0,1));
	var equip = ship.equips[slot];
	var dmg = 0, realdmg = 0;
	var planebase = equip.ASW;
	planebase = Math.floor(planebase*.6) || 0;
	if (C) console.log('		'+slot+' '+planebase);
	if (res) {
		var dmgbase = 3 + Math.sqrt(ship.planecount[slot]) * planebase;
		var preMod = 1;
		var postMod = 1.75;
		var r = Math.random();
		if (r < .4) postMod *= 1.2;
		else if (r < .5) postMod *= 1.5;
		else postMod *= 2;
		dmg = damageSupport(ship,target,dmgbase,preMod,{postMod:postMod,critMod:res},SUPPORTDMGBASE);
		realdmg = takeDamage(target,dmg);
	}
	ship.fleet.giveCredit(ship,target,realdmg);
	if(C) {
		console.log(ship.name+' airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function LBASPhase(lbas,alive2,subsalive2,isjetphase,APIkouku) {
	var carriers2 = [];
	for (var i=0; i<alive2.length; i++) if ((!isjetphase||alive2[i].hasjet)) carriers2.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) if ((!isjetphase||subsalive2[i].hasjet)) carriers2.push(subsalive2[i]);
	
	if (C) {
		var apiname = (isjetphase)? 'api_air_base_data' : 'api_squadron_plane';
		APIkouku[apiname] = [];
		for (var i=0; i<lbas.equips.length; i++) {
			var eq = lbas.equips[i];
			if (!eq.isdivebomber && !eq.istorpbomber && !eq.isfighter) continue;
			var d = {api_mst_id:0, api_count:0};
			d.api_mst_id = lbas.equips[i].mid;
			d.api_count = lbas.planecount[i];
			APIkouku[apiname].push(d);
			APIkouku.api_plane_from[0].push(i+7);
		}
		APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
		APIkouku.api_stage2 = {api_f_count:0,api_f_lostcount:0};
		APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
		APIkouku.api_stage3_combined = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0]};
	}
	
	//fighter defence
	AADefenceFighters([lbas],true,APIkouku,isjetphase);
	AADefenceFighters(carriers2,true,APIkouku,isjetphase);
	
	// contact
	var contactMod = 1;
	if (!isjetphase) {
		if (lbas.airState() != -2 && lbas.airState() != 0) {
			var contactdata = getContact([lbas]);
			if (contactdata) {
				contactMod = contactdata.mod;
				if (C) APIkouku.api_stage1.api_touch_plane[0] = contactdata.id;
			}
		}
		let contactModLB = 1;
		for (let eq of lbas.equips) {
			if (eq.type == LANDSCOUT) {
				if (eq.ACC >= 3) contactModLB = 1.15;
				else if (eq.ACC <= 2 && contactModLB < 1.125) contactModLB = 1.125;
			}
		}
		contactMod *= contactModLB;
	}

	//bomber defence
	var defenders = [];
	var AACImod = 1;
	var AACInum = 0;
	for (var i=0; i<alive2.length; i++) defenders.push(alive2[i]);
	for (var i=0; i<subsalive2.length; i++) defenders.push(subsalive2[i]);
	if (SIMCONSTS.enableEnemyAACILBAS) {
		let AACIResult = getAACI(defenders,APIkouku);
		AACInum = AACIResult.num;
		AACImod = AACIResult.mod;
	}
	for (var i=0; i<lbas.equips.length; i++) {
		var eq = lbas.equips[i];
		if (!eq.isdivebomber && !eq.istorpbomber) continue;
		var defender = defenders[Math.floor(Math.random()*defenders.length)];
		var shotProp = (Math.random() < .5)? Math.floor(getAAShotProp(defender,lbas.planecount[i],false,eq.aaResistShip)) : 0;
		var shotFlat = (Math.random() < .5)? Math.floor(getAAShotFlat(defender,false,eq.aaResistShip,eq.aaResistFleet)*AACImod) : 0;
		var shotFix = ((defender.side==0 || AACInum)? 1 : 0) + AACInum;
		
		if (C) {
			APIkouku.api_stage2.api_f_count += lbas.planecount[i];
			APIkouku.api_stage2.api_f_lostcount += shotProp+shotFlat+shotFix;
			console.log(lbas.planecount[i] + ' ' + defender.name + ' ' + shotProp + ' ' + shotFlat);
		}
		lbas.planecount[i] = Math.max(0,lbas.planecount[i]-shotProp-shotFlat-shotFix);
		if (lbas.planecount[i] <= 0) continue;
		
		let isASWPlane = MECHANICS.LBASBuff && eq.ASW >= 7;
		var targets = (isASWPlane)? subsalive2.concat(alive2) : alive2;
		if (targets.length) {
			if (targets[0].fleet.combinedWith) {
				var targetsM = [], targetsE = [];
				// LBAS target selection:
				// 1. Team selection: Main 0.45 Escort 0.55
				// 2. Only main can protect flagship
				for (var j=0; j<targets.length; j++) {
					if (targets[j].isescort) targetsE.push(targets[j]);
					else targetsM.push(targets[j]);
				}
				if (!targetsE.length) targets = targetsM;
				else if (!targetsM.length) targets = targetsE;
				else targets = (Math.random() < .45)? targetsM : targetsE;
			}
			if (isASWPlane) {
				let targetsSub = targets.filter(ship => ship.isSub);
				if (targetsSub.length) targets = targetsSub;
			}
			var target = choiceWProtect(targets);
			var dmg = airstrikeLBAS(lbas,target,i,contactMod,isjetphase);
			if (C) {
				var showtorpedo = lbas.equips[i].istorpbomber;
				if ([LANDBOMBER,HEAVYBOMBER].indexOf(lbas.equips[i].type) !== -1 && target.isInstall) showtorpedo = false;
				if (target.isSub) showtorpedo = false;
				if (target.isescort) {
					APIkouku.api_stage3_combined[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
					APIkouku.api_stage3_combined[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
					if (showtorpedo) APIkouku.api_stage3_combined[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
					else APIkouku.api_stage3_combined[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
				} else {
					APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
					APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
					if (showtorpedo) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
					else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
				}
			}
		}
	}
	if (!isjetphase && lbas.equips.some((eq, i) => eq.mid == 178 && lbas.planecount[i] >= 3)) {
		lbas.equips.forEach((eq, i) => {
			if (eq.mid != 178) {
				let r = Math.random();
				if (r < .6) lbas.planecount[i] += 1;
				else if (r < .9) lbas.planecount[i] += 2;
				else lbas.planecount[i] += 3;
				if (lbas.planecount[i] > lbas._currentSlots[i]) lbas.planecount[i] = lbas._currentSlots[i];
			} 
		})
	}
	
	if (C) {
		for (var i=0; i<2; i++)
			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
		if (NEWFORMAT) {
			formatRemovePadding(APIkouku.api_stage3);
			formatRemovePadding(APIkouku.api_stage3_combined);
		}
	}
}

function airstrikeLBAS(lbas,target,slot,contactMod,isjetphase) {
	if (!contactMod) contactMod = 1;
	var equip = lbas.equips[slot];
	var acc = .95;
	if (target.isPT) acc *= .8;
	var critdmgbonus = 1, critratebonus = 0, ACCplane = 0;
	if (equip.type != LANDBOMBER || MECHANICS.LBASBuff) {
		ACCplane = Math.sqrt(equip.exp*.1);
		var critval = 0;
		switch(equip.rank) {
			case 7: ACCplane += 9; critval = 10; break;
			case 6: ACCplane += 6; critval = 7; break;
			case 5: ACCplane += 4; critval = 5; break;
			case 4: ACCplane += 3; critval = 4; break;
			case 3: ACCplane += 2; critval = 3; break;
			case 2: ACCplane += 1; critival = 2; break;
			case 1: critival = 1; break;
			case 0: ACCplane = 0; break;
		}
		critdmgbonus += Math.floor(Math.sqrt(equip.exp)+critval)/100;
		critratebonus = critval*.6;
	}
	if (MECHANICS.LBASBuff) {
		ACCplane += 7*(equip.ACC || 0);
	}
	lbas.critratebonus = critratebonus; lbas.ACCplane = ACCplane;
	var res = rollHit(accuracyAndCrit(lbas,target,acc,1.0,0,.2,true),critdmgbonus);  // No evMod for airstrike
	lbas.critratebonus = 0; lbas.ACCplane = 0;
	var dmg = 0, realdmg = 0;
	var planebase;
	if (equip.type == LANDBOMBER || equip.type == HEAVYBOMBER) planebase = (target.isInstall)? equip.DIVEBOMB : equip.TP;
	else planebase = (equip.isdivebomber)? equip.DIVEBOMB : (target.isInstall)? 0 : equip.TP;
	if (target.isSub) planebase = equip.ASW;
	if (equip.mid == 224 && target.type == 'DD') planebase = 25;
	if (planebase) planebase += equip.ASImprove || 0;
	else planebase = 0;
	if (res) {
		var planecount = lbas.planecount[slot];
		if (!isjetphase && equip.type != HEAVYBOMBER) planecount *= 1.8;
		var dmgbase = 25 + planebase * Math.sqrt(planecount);
		var preMod = (equip.type == LANDBOMBER)? .8 : (equip.isjet && !isjetphase? 1 / Math.sqrt(2): 1);
		if (target.isSub) {
			preMod = (equip.ASW >= 10)? .7 + Math.random()*.3 : .35 + Math.random()*.45;
		}
		if (equip.mid == 405 && target.type == 'DD') preMod *= 1.08;
		else if (equip.mid == 406 && ['FBB','BB','BBV'].indexOf(target.type) !== -1) preMod *= 1.35;
		preMod *= (target.LBWeak || 1);
		var postMod = (equip.type == LANDBOMBER)? 1.8 : 1;
		postMod *= contactMod;
		if (target.fleet.combinedWith) postMod *= 1.1;
		dmg = damage(lbas,target,dmgbase,preMod,{postMod:postMod,critMod:res},AIRSTRIKEDMGBASE,equip);
		realdmg = takeDamage(target,dmg);
	}
	if(C) {
		console.log('LBAS airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
	}
	return realdmg;
}

function orderByRange(ships,order,includeSubs) {
	var ranges = []; //fleet 1
	for (var i=0; i<ships.length; i++) {
		if (!includeSubs && ships[i].isSub) continue;
		if (!ships[i].canShell()) continue;
		if (ships[i].retreated) continue;
		if (!ranges[ships[i].RNG]) ranges[ships[i].RNG] = [];
		ranges[ships[i].RNG].push(ships[i]);
	}
	for (var i=0; i<ranges.length; i++) if (ranges[i]) shuffle(ranges[i]);
	for (var i=ranges.length-1; i>=0; i--) {
		if (!ranges[i]) continue;
		for (var j=0; j<ranges[i].length; j++) order.push(ranges[i][j]);
	}
}

function sim(F1,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
	var ships1 = F1.ships, ships2 = F2.ships;
	var alive1 = [], alive2 = [], subsalive1 = [], subsalive2 = [];
	var hasInstall1 = false, hasInstall2 = false;
	var results = { jetCost: 0 };
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) continue;
		if (ships1[i].retreated) continue;
		if(ships1[i].isSub) subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
		ships1[i].HPprev = ships1[i].HP;
		if (!MECHANICS.morale) ships1[i].morale = 49;
		if (ships1[i].isInstall) hasInstall1 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) continue;
		if (ships2[i].retreated) continue;
		if(ships2[i].isSub) subsalive2.push(ships2[i]);
		else alive2.push(ships2[i]);
		ships2[i].HPprev = ships2[i].HP;
		if (ships2[i].isInstall) hasInstall2 = true;
	}
	
	if (!FIXENAGEMENT){
		let r = Math.random();
		if (r < .45) ENGAGEMENT = 1;
		else if (r < .6) ENGAGEMENT = 1.2;
		else if (r < .9 || F1.noRedT || F2.noRedT) ENGAGEMENT = .8;
		else ENGAGEMENT = .6;
	}
	
	F1.AS = F2.AS = 0;
	
	if (bombing) aironly = true;
	
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		dataroot.api_deck_id = 1;
		if (NEWFORMAT) {
			dataroot.api_f_maxhps = []; dataroot.api_f_nowhps = [];
			dataroot.api_e_maxhps = []; dataroot.api_e_nowhps = [];
			for (let ship of ships1) {
				dataroot.api_f_nowhps.push(ship.HP);
				dataroot.api_f_maxhps.push(ship.maxHP);
			}
		} else {
			dataroot.api_maxhps = [-1];
			dataroot.api_nowhps = [-1];
			for (var i=0; i<6; i++) {
				dataroot.api_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
				dataroot.api_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
			}
		}
		var retreatlist = [];
		for (var i=0; i<ships1.length; i++) if (ships1[i].retreated) retreatlist.push(i+1);
		if (retreatlist.length) dataroot.api_escape_idx = retreatlist;
		dataroot.api_ship_ke = [];
		dataroot.api_eSlot = [];
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke.push((i<ships2.length)? ships2[i].mid : -1);
			if (NEWFORMAT) {
				dataroot.api_e_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
				dataroot.api_e_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
			} else {
				dataroot.api_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
				dataroot.api_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
			}
			dataroot.api_eSlot.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot[i].push((i<ships2.length && j<ships2[i].equips.length)? ships2[i].equips[j].mid : -1);	
		}
		
		dataroot.api_search = [0,1];
		dataroot.api_search[0] = getDetection(ships1,ships2); //watch mode only
	}
	// if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true; //do retreated ships count?
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].enableSecondShelling) doShell2 = true;
	}
	
	// update morale (day battle)
	if (MECHANICS.morale && !noupdate && !NBonly) {
		updateMoraleStart(ships1);
	}

	//jet lbas
	if (LBASwaves && LBASwaves.length && !NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_air_base_injection = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		var uniqueLBs = [];
		for (var i=0; i<LBASwaves.length; i++) {
			if (uniqueLBs.indexOf(LBASwaves[i]) == -1) uniqueLBs.push(LBASwaves[i]);
		}
		var jetLBAS = LandBase.createJetLandBase(uniqueLBs);
		if (jetLBAS.equips.length) {
			compareAP(jetLBAS,F2,true,false,true);
			results.jetCost += calJetCost([jetLBAS],alive2);
			LBASPhase(jetLBAS,alive2,subsalive2,true,(C)?BAPI.data.api_air_base_injection:undefined);
			removeSunk(alive2); removeSunk(subsalive2);
			if (C) {
				BAPI.data.api_air_base_injection.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[jetLBAS.AS+2];
			}
			F2.AS = 0;
		} else {
			if (C) delete BAPI.data.api_air_base_injection;
		}
	}
	
	//jet airstrike
	if (!NBonly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		compareAP(F1,F2,true);
		results.jetCost += calJetCost(alive1,alive2);
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_injection_kouku:undefined,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) delete BAPI.data.api_injection_kouku;
			if (BAPI.data.api_injection_kouku) delete BAPI.data.api_injection_kouku.api_stage3_combined;
		}
	
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	//lbas
	if (LBASwaves && LBASwaves.length && !NBonly) {
		if (C) BAPI.data.api_air_base_attack = [];
		for (var i=0; i<LBASwaves.length; i++) LBASwaves[i]._currentSlots = LBASwaves[i].planecount.slice();
		for (var i=0; i<LBASwaves.length; i++) {
			if (LBASwaves[i].equips.length <= 0) continue;
			if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
				LBASwaves[i].planecount = LBASwaves[i]._currentSlots.slice();
				compareAP(LBASwaves[i],F2,false,false,true);
				var LBAPI = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
				LBASPhase(LBASwaves[i],alive2,subsalive2,false,(C)?LBAPI:undefined);
				removeSunk(alive2); removeSunk(subsalive2);
				if (C) {
					LBAPI.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[LBASwaves[i].AS+2];
					BAPI.data.api_air_base_attack.push(LBAPI);
				}
			}
		}
		F2.AS = 0;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		compareAP(F1,F2);
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_kouku:undefined,false,bombing);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
			if (BAPI.api_kouku) delete BAPI.data.api_kouku.api_stage3_combined;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		compareAP(F1,F2);
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_kouku2:undefined);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			delete BAPI.data.api_kouku.api_stage3_combined;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	//support phase
	if (Fsupport && (!NBonly || (MECHANICS.LBASBuff && Fsupport.supportType != 1)) && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2,subsalive2,Fsupport.supportType,BAPI,Fsupport.supportBoss,NBonly);
			removeSunk(alive2); removeSunk(subsalive2);
		}	
	}
	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].canOASW()) attackers1.push(alive1[i]);
		}
		orderByRange(attackers1,order1);
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].canOASW()) attackers2.push(alive2[i]);
		}
		orderByRange(attackers2,order2);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
			shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2,subsalive2,true,(C)? BAPI.data.api_opening_atack : undefined);
	}
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F2.clearFleetLoS();
	
	//shelling 1
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var order1 = [], order2 = [];
		orderByRange(ships1,order1,hasInstall2);
		orderByRange(ships2,order2,hasInstall1);
		
		if (C) BAPI.data.api_hougeki1 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki1:undefined);
	}
	
	//shelling 2
	if (!NBonly && !aironly && doShell2 && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			if (!hasInstall2 && ships1[i].isSub) continue;
			if (ships1[i].retreated) continue;
			if (ships1[i].canShell()) order1.push(ships1[i]);
		}
		for (var i=0; i<ships2.length; i++) {
			if (!hasInstall1 && ships2[i].isSub) continue;
			if (ships2[i].retreated) continue;
			if (ships2[i].canShell()) order2.push(ships2[i]);
		}
		
		if (C) BAPI.data.api_hougeki2 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki2:undefined);
	}
	
	// closing torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}
	
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2);
		results.mvpDay = F1.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
	}
	
	//friend fleet
	if ((doNB||NBonly) && friendFleet && alive2.length+subsalive2.length > 0) {
		friendFleetPhase(friendFleet,F2,alive2,subsalive2,BAPI);
		removeSunk(alive2); removeSunk(subsalive2);
	}
		
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		didNB = !NBonly;
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			order1.push(ships1[i]);
		}
		for (var i=0; i<ships2.length; i++) {
			order2.push(ships2[i]);
		}
		
		if (C) {
			if (!BAPI.yasen) BAPI.yasen = {};
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1],api_n_mother_list:[-1],api_si_list:[-1]};
			if (NEWFORMAT) {
				formatRemovePadding(BAPI.yasen.api_hougeki);
				BAPI.yasen.api_hougeki.api_at_eflag = [];
			}
			BAPI.yasen.api_flare_pos = [-1,-1];
			BAPI.yasen.api_touch_plane = [-1,-1];
			if (NBonly && BAPI.data.api_support_flag) {
				BAPI.yasen.api_n_support_flag = BAPI.data.api_support_flag;
				BAPI.yasen.api_n_support_info = BAPI.data.api_support_info;
				delete BAPI.data.api_support_flag;
				delete BAPI.data.api_support_info;
			}
		}

		// update morale (night battle)
		if (MECHANICS.morale && !noupdate) {
			updateMoraleStart(ships1,true);
		}
		
		nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);
	}
	
	if (!noupdate) {
		updateSupply(ships1,didNB,NBonly,bombing,noammo);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1) : getRank(ships1,ships2);
	
	results.redded = false;
	results.flagredded = (ships1[0].HP/ships1[0].maxHP <= .25);
	results.reddedIndiv = [false,false,false,false,false];
	results.flagsunk = (ships2[0].HP <= 0);
	results.undamaged = true;
	results.buckets = 0;
	results.repairCost1 = 0;
	results.repairCost2 = 0;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP/ships1[i].maxHP <= .25) {
			results.redded = true;
			results.reddedIndiv[i] = true;
			if (!noupdate && !ships1[i].isflagship) ships1[i].protection = false;
		}
		if (ships1[i].HP/ships1[i].maxHP <= .5) results.undamaged = false;
		if (ships1[i].HP/ships1[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1[i]) > BUCKETTIME) results.buckets++;
		if (ships1[i].repairSpent) {
			results.repairCost1 += ships1[i].repairSpent == 1;
			results.repairCost2 += ships1[i].repairSpent == 2;
			delete ships1[i].repairSpent;
		}
	}
	results.MVP = F1.getMVP();
	results.sinkFlagship = F1.getSinkFlagship();
	results.dmgTotals = F1.DMGTOTALS;
	if (didNB) results.didNB = true;
	
	//update morale (post battle)
	if (MECHANICS.morale && !noupdate) {
		updateMorale(ships1,results.rank,results.MVP);
	}
	
	return results;
}

function removeSunk(ships) {
	let c = ships.length;
	for (var i=0; i<ships.length; i++) {
		if (ships[i].HP <= 0) ships.splice(i--,1);
	}
	return c - ships.length;
}

function getRank(ships1,ships2,ships1C) {
	var rank = '';
	var dmg1 = 0, dmg2 = 0, sunk1 = 0, sunk2 = 0, dtotal1 = 0, dtotal2 = 0;
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) sunk2++;
		dmg2 += ships2[i].HPprev - Math.max(0,ships2[i].HP);
		dtotal2 += ships2[i].HPprev;
	}
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].retreated) continue;
		if (ships1[i].HP <= 0) sunk1++;
		dmg1 += ships1[i].HPprev - Math.max(0,ships1[i].HP);
		dtotal1 += ships1[i].HPprev;
	}
	if (ships1C) {
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].retreated) continue;
			if (ships1C[i].HP <= 0) sunk1++;
			dmg1 += ships1C[i].HPprev - Math.max(0,ships1C[i].HP);
			dtotal1 += ships1C[i].HPprev;
		}
	}
	dmg1 /= dtotal1; dmg2 /= dtotal2;
	if (!sunk1) {
		if (sunk2 == ships2.length) return 'S';
		if (sunk2 >= Math.floor(ships2.length*.7) && ships2.length>1) return 'A';
	}
	if (sunk1 < sunk2 && ships2[0].HP <= 0) return 'B';
	if (dmg2 > dmg1*2.5) return 'B';
	if (dmg2 > dmg1*.9) return 'C';
	if (sunk1 > 0 && sunk1 >= ships1.length-1) return 'E';
	return 'D';
}

function getRankRaid(ships1) {
	var dmg1 = 0, dtotal1 = 0;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].retreated) continue;
		if (ships1[i].HP <= 0) sunk1++;
		dmg1 += ships1[i].HPprev - Math.max(0,ships1[i].HP);
		dtotal1 += ships1[i].HPprev;
	}
	dmg1 /= dtotal1;
	if (dmg1 == 0) return 'S';
	if (dmg1 < .1) return 'A';
	if (dmg1 < .2) return 'B';
	if (dmg1 < .5) return 'C';
	if (dmg1 < .8) return 'D';
	return 'E';
}

function updateSupply(ships,didNB,NBonly,bombing,noammo,isECombined) {
	let costSpecial = null, shipsSpecial = null;
	if (ships[0].fleet.didSpecial == 1) {
		if (ships[0].attackSpecial == 101 || ships[0].attackSpecial == 102 || ships[0].attackSpecial == 103) costSpecial = 1.5;
		if (costSpecial) shipsSpecial = getSpecialAttackShips(ships,ships[0].attackSpecial);
		ships[0].fleet.didSpecial = 2;
	}
	if (ships[0].fleet.didSpecialNB[0] == 1) {
		if (ships[0].attackSpecial == 104) costSpecial = 1.2;
		if (costSpecial) shipsSpecial = getSpecialAttackShips(ships,ships[0].attackSpecial);
		ships[0].fleet.didSpecialNB[0] = 2;
	}
	if (ships[0].fleet.didSpecialNB[1] == 1) {
		if (ships[0].attackSpecial == 104) costSpecial = 1.2;
		if (costSpecial) shipsSpecial = getSpecialAttackShips(ships,ships[0].attackSpecial);
		ships[0].fleet.didSpecialNB[1] = 2;
	}
	let costFuel = 0, costAmmo = 0;
	if (MECHANICS.newSupply) {
		let allPT = true;
		for (let ship of ships) { if (!ship.isPT) { allPT = false; break; } }
		if (allPT) {
			costFuel = .04;
			costAmmo = .08;
		} else if (bombing) {
			if (SIMCONSTS.airRaidCostW6) {
				costFuel = .04;
				costAmmo = .08;
			} else {
				costFuel = .06;
				costAmmo = .04;
			}
		} else if (noammo) {
			costFuel = .08;
		} else if (NBonly) {
			costFuel = .1;
			costAmmo = .1;
		} else {
			costFuel = .2;
			costAmmo = .2;
		}
	} else {
		if (bombing) {
			costFuel = .08;
			costAmmo = .04;
		} else {
			costFuel = .2;
			if (!noammo) costAmmo = .2;
		}
	}
	for (var i=0; i<ships.length; i++) {
		if (ships[i].HP <= 0) continue;
		if (ships[i].retreated) continue;
		
		let fuelMax = ships[i].fuel || 100;
		let ammoMax = ships[i].ammo || 100;
		if (costFuel > 0) {
			ships[i].fuelleft -= 10*(Math.floor(fuelMax * costFuel) || 1) / fuelMax;
			if (ships[i].fuelleft < 0) ships[i].fuelleft = 0;
		}
		if (costAmmo > 0) {
			let subAmmo = Math.floor(ammoMax * costAmmo) || 1;
			if (didNB && !isECombined) subAmmo += Math.ceil(ammoMax * costAmmo/2);
			if (costSpecial && shipsSpecial.indexOf(ships[i]) != -1 && (!isECombined || !didNB)) subAmmo = Math.floor(subAmmo*costSpecial);
			ships[i].ammoleft -= 10*subAmmo/ammoMax;
			if (ships[i].ammoleft < 0) ships[i].ammoleft = 0;
		}
		
		if (C) console.log('FUEL LEFT: '+ships[i].fuelleft+' AMMO LEFT: '+ships[i].ammoleft);
	}
}

function underwaySupply(fleet) {
	let ships = fleet.ships, num = fleet.numUnderwaySupply || 0;
	if (fleet.combinedWith) {
		ships = ships.concat(fleet.combinedWith.ships);
		num += (fleet.combinedWith.numUnderwaySupply || 0);
	}
	if (num == 0) return;
	let amount;
	if (num == 1) amount = (fleet.combinedWith)? .15 : .25;
	else if (num == 2) amount = (fleet.combinedWith)? .275 : .36;
	else amount = (fleet.combinedWith)? .4 : .47;
	for (let ship of ships) {
		let fuel = 10*(Math.floor(ship.fuel * amount) || 1) / ship.fuel;
		let ammo = 10*(Math.floor(ship.ammo * amount) || 1) / ship.ammo;
		if (ship.fuelleft + fuel > 10) fuel = 10 - ship.fuelleft;
		if (ship.ammoleft + ammo > 10) ammo = 10 - ship.ammoleft;
		ship.fuelleft += fuel;
		ship.ammoleft += ammo;
		ship._fuelUnderway = fuel;
		ship._ammoUnderway = ammo;
	}
}

function updateMoraleStart(ships1,isNB){
	if (isNB){
		ships1.forEach((ship) => ship.morale -= 2);
	}else{
		ships1.forEach((ship) => ship.morale -= (ship.morale < 30? 9: 3));
	}
	ships1.forEach((ship) => {
		ship.morale = Math.min(Math.max(ship.morale, 0), 100);
		if (C) console.log(ship.name+' '+ship.morale);
	});
}


function updateMorale(ships1,rank,mvp) {
	moraleMap = {'S': 4, 'A': 3, 'B': 2, 'C': 1, 'D': 0, 'E': 0};
	ships1.forEach((ship) => {
		ship.morale += moraleMap[rank];
	})
	if (['D','E'].indexOf(rank) === -1) ships1[0].morale += 3;
	ships1[mvp].morale += 10;
	ships1.forEach((ship) => {
		ship.morale = Math.min(Math.max(ship.morale, 0), 100);
		if (C) console.log(ship.name+' '+ship.morale);
	});
}

function maelstromLoss(fleet, losses){
	if (losses === undefined || typeof losses !== 'object' || losses.length < 2) return;

	var ships = fleet.ships;
	if (fleet.combinedWith) ships = ships.concat(fleet.combinedWith.ships);

	var num = 0;
	num = ships.reduce((acc, ship) => {
		if (Object.keys(ship.equiptypesB).indexOf(B_RADAR.toString()) !== -1) return acc + 1;
		return acc;
	}, num);
	num = num > 6? 6: Math.floor(num);
	
	var mod = 1;
	switch(num){
		case 0: mod = 1; break;
		case 1: mod = 0.75; break;
		case 2: mod = 0.6; break;
		case 3: mod = 0.5; break;
		case 4: mod = 0.45; break;
		case 5: mod = 0.42; break;
		case 6: mod = 0.40; break;
	}

	ships.forEach((ship) => {
		ship.fuelleft -= mod * losses[0] * ship.fuelleft / 100;
		ship.ammoleft -= mod * losses[1] * ship.ammoleft / 100;
	});
}

function landBaseLoss(alllbas){
	simLBRaid(alllbas, FLEETLBRAID);
	alllbas.forEach((lb, j) => {
		if (lb.HPprev - lb.HP >= 50) {
			let lossnum = Math.ceil(Math.random()*4);
			if (C) console.log('LB ' + (j+1) + ' plane loss: '+lossnum);
			lb.planecount.forEach((num, i) => {
				if (lossnum <= 0) return;
				let loss = Math.min(lb.planecount[i] - 1, lossnum);
				lb.planecount[i] -= loss;
				lossnum -= loss;
			})
		}
		delete lb.HPprev;
	})
}

// function loadFleet(side,ships,formation,isescort) {
	// var link = (isescort)? FLEETS1[0] : null; //better way to do this...?
	// var f = new Fleet(side,link);
	// f.ships = [];
	// f.loadShips(ships);
	// f.formation = ALLFORMATIONS[formation];
	// if (side==0) FLEETS1.push(f);
	// else if (side==1) FLEETS2.push(f);
	// else if (side==2) FLEETS1S[0] = f;
	// else if (side==3) FLEETS1S[1] = f;
// }

function createDefaultShip(mid,overrideStats) {
	var dataOrig = SHIPDATA[mid], data = {};
	if (overrideStats) {
		for (var stat in dataOrig) {
			if (overrideStats[stat]) data[stat] = overrideStats[stat];
			else data[stat] = dataOrig[stat];
		}
	} else {
		data = dataOrig;
	}
	var ShipType = window[data.type];
	var ship = new ShipType(mid,data.name,(isPlayable(mid))?0:1,(isPlayable(mid))?99:1,data.HP,data.FP,data.TP,data.AA,data.AR,data.EV,data.ASW,data.LOS,data.LUK,data.RNG,data.SLOTS);
	if (ship.isSub) ship.LVL = 50;
	if (data.EQUIPS) ship.loadEquips(data.EQUIPS,[0,0,0,0],[0,0,0,0],true);
	if (SHIPDATA[mid].isInstall) ship.isInstall = true;
	return ship;
}

function getFCFShips(ships1,ships1C) {
	var retreater = null, escorter = null;
	for (var i=1; i<ships1.length; i++) {
		if (ships1[i].retreated) continue;
		if (ships1[i].HP/ships1[i].maxHP <= .25 && ships1[i].HP > 0) {
			if (!retreater) retreater = ships1[i];
		}
	}
	for (var i=1; i<ships1C.length; i++) {
		if (ships1C[i].retreated) continue;
		if (ships1C[i].HP/ships1C[i].maxHP <= .25 && ships1C[i].HP > 0) {
			if (!retreater) retreater = ships1C[i];
		} else if (ships1C[i].type == 'DD' && ships1C[i].HP/ships1C[i].maxHP > .75) {
			if (!escorter) escorter = ships1C[i];
		}
	}
	if (!retreater) escorter = null;
	if (!escorter) retreater = null;
	return [retreater, escorter];
}

function getFCFShip(ships1) {
	var retreater = null;
	for (var i=1; i<ships1.length; i++) {
		if (ships1[i].retreated) continue;
		if (ships1[i].HP/ships1[i].maxHP <= .25 && ships1[i].HP > 0) {
			if (!retreater) retreater = ships1[i];
		}
	}
	return retreater;
}

function canContinue(ships1,ships1C) {
	if (ships1[0].HP/ships1[0].maxHP <= .25) return false;
	var retreater = null, escorter = null;
	if (ships1C && ships1[0].hasCombinedFCF) { var d = getFCFShips(ships1,ships1C); retreater = d[0]; escorter = d[1]; }
	else if (!ships1C && (SIMCONSTS.strikingForceRetreat && ships1[0].hasStrikeFCF) || (SIMCONSTS.torpSquadronRetreat && ships1[0].hasTorpFCF && isTorpSquadron(ships1))) retreater = getFCFShip(ships1);
	if (DORETREAT) {
		for (var i=1; i<ships1.length; i++) {
			if (ships1[i].retreated) continue;
			if (ships1[i].HP/ships1[i].maxHP <= .25 && (!ships1[i].repairs||!ships1[i].repairs.length) && ships1[i] != retreater) return false;
		}
		if (ships1C) {
			for (var i=1; i<ships1C.length; i++) {
				if (ships1C[i].retreated) continue;
				if (ships1C[i].HP/ships1C[i].maxHP <= .25 && (!ships1C[i].repairs||!ships1C[i].repairs.length) && ships1C[i] != retreater) return false;
			}
		}
	}
	if (retreater) {
		retreater.retreated = true;
		retreater.fuelleft = 0;
	}
	if (escorter) {
		escorter.retreated = true;
		escorter.fuelleft = 0;
	}
	return true;
}

function simStats(numsims,foptions) {
	// if (FLEET1.ships.length <= 0) return 1;
	// if (FLEET2.ships.length <= 0) return 2;
	var totalResult = {
		totalnum: numsims,
		totalFuelS: 0,
		totalAmmoS: 0,
		totalBauxS: 0,
		totalSteelS: 0,
		totalFuelR: 0,
		totalSteelR: 0,
		totalBuckets: 0,
		totalRepairTime: 0,
		totalRepairCost1: 0,
		totalRepairCost2: 0,
		totalEmptiedPlanes: 0,
		totalEmptiedLBAS: 0,
		totalGaugeDamage: 0,
		nodes: []
	};
	for (var i=0; i<FLEETS2.length; i++) {
		totalResult.nodes.push({
			num: 0,
			didNB: 0, //used for rsammo calc
			redded: 0,
			redIndiv: [0,0,0,0,0,0],
			undamaged: 0,
			MVPs: [0,0,0,0,0,0],
			sinkFlagships: [0,0,0,0,0,0],
			dmgTotals: [0,0,0,0,0,0],
			ranks: {S:0,A:0,B:0,C:0,D:0,E:0},
			flagsunk: 0,
			airStates: [0,0,0,0,0],
			nbStates: [0,0,0],
		});
	}

	if (FLEETS2[FLEETS2.length-1].combinedWith) {
		totalResult.nodes[FLEETS2.length-1].survival2C = [0,0,0,0,0,0];
		totalResult.nodes[FLEETS2.length-1].survival2 = [0,0,0,0,0,0];
	} 
	
	FLEETS1S.forEach((fleet) => {
		if (fleet !== null && fleet.ships) fleet.ships.forEach((ship) => {
			ship.bonusSpecial = ship.bonusA || 1;
		});
	});

	for (var j=0; j<FLEETS2.length; j++) {
		let options = foptions[j];
		if (!options.eqbonus || options.eqbonus.length < 2) continue;
		let world = options.eqbonus[0];
		let node = options.eqbonus[1];
		if (world === '' || node === '') continue; 
		let ships = FLEETS2[j].ships;
		if (FLEETS2[j].combinedWith) ships = ships.concat(FLEETS2[j].combinedWith.ships);
		ships.forEach((ship) => {
			if (!ship.equipWeak) ship.equipWeak = [];
			ship.equipWeak = ship.equipWeak.concat(EQUIPBONUS[world][node]);
		})
	}
	
	//var BAPI = {data:{},yasen:{},mvp:[],rating:''};
	C = false;
	var formdef = FLEETS1[0].formation;
	var formdef2 = FLEETS2.map(f => f.formation);
	// get all sortie lbas
	var alllbas = [];
	for (var j=0; j<foptions.length; j++) {
		for (var k=0; k<foptions[j].lbas.length; k++) {
				if (alllbas.indexOf(foptions[j].lbas[k]) == -1) alllbas.push(LBAS[foptions[j].lbas[k] - 1]);
		}
	}
	for (var i=0; i<numsims; i++) {
		for (var j=0; j<FLEETS2.length; j++) {
			var options = foptions[j];
			for (let ship of FLEETS1[0].ships) {
				if (options.bonusA) ship.bonusSpecial = ship.bonusA || 1;
				else if (options.bonusB) ship.bonusSpecial = ship.bonusB || 1;
				else if (options.bonusC) ship.bonusSpecial = ship.bonusC || 1;
				ship.evbonusSpecial = options.evbonus || 1;
			}
			FLEETS1[0].DMGTOTALS = [0,0,0,0,0,0];
			FLEETS1[0].SINKFLAGSHIP = [false, false, false, false, false, false];
			if (options.formation != '0') FLEETS1[0].formation = ALLFORMATIONS[options.formation];
			else FLEETS1[0].formation = formdef;
			if (options.randform && !FLEETS2[j].combinedWith) {
				let tempform = randFormation(options.randform);
				if (tempform != '0') FLEETS2[j].formation = ALLFORMATIONS[tempform];
				else FLEETS2[j].formation = formdef2[j];
			}
			var supportNum = 0;
			let friendFleet = null;
			if (options.maelstrom) maelstromLoss(FLEETS1[0], options.maelstrom);
			if (options.lbraid && FLEETLBRAID) landBaseLoss(alllbas);
			if (j == FLEETS2.length - 1) {
				supportNum = 1;
				if (options.randfriend) {
					let temp = randFriendFleet(options.randfriend);
					let tempFriendFleet = FLEETS1S[temp];
					if (tempFriendFleet !== null) friendFleet = tempFriendFleet; 
					else friendFleet = FLEETS1S[2];
				}else{
					friendFleet = FLEETS1S[2];
				}
				underwaySupply(FLEETS1[0]);
			}
			var LBASwaves = [];
			for (var k=0; k<options.lbas.length; k++) LBASwaves.push(LBAS[options.lbas[k]-1]);
			if (options.engagemod) {
				ENGAGEMENT = options.engagemod;
				FIXENAGEMENT = true;
			}else FIXENAGEMENT = false;
			var res;
			if (FLEETS2[j].combinedWith) res = sim6vs12(FLEETS1[0],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			else res = sim(FLEETS1[0],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			totalResult.nodes[j].num++;
			if (res.redded) totalResult.nodes[j].redded++;
			for (var k=0; k<res.reddedIndiv.length; k++) if (res.reddedIndiv[k]) totalResult.nodes[j].redIndiv[k]++;
			if (res.undamaged) totalResult.nodes[j].undamaged++;
			if (res.flagsunk) totalResult.nodes[j].flagsunk++;
			totalResult.nodes[j].ranks[res.rank]++;
			totalResult.nodes[j].MVPs[res.MVP]++;
			if (res.sinkFlagship > -1) totalResult.nodes[j].sinkFlagships[res.sinkFlagship]++;
			for (let i = 0; i < res.dmgTotals.length; i++) totalResult.nodes[j].dmgTotals[i] += res.dmgTotals[i];
			totalResult.nodes[j].airStates[FLEETS1[0].AS+2]++;
			if (res.didNB){
				if (res.didNBescort) totalResult.nodes[j].nbStates[2]++;
				else totalResult.nodes[j].nbStates[1]++;
			}
			else totalResult.nodes[j].nbStates[0]++;
			if (totalResult.nodes[j].survival2C && res.survival2C) {
				for (let k = 0; k < res.survival2C.length; k++){
					if (res.survival2C[k]) totalResult.nodes[j].survival2C[k]++;
				}
			}
			if (totalResult.nodes[j].survival2 && res.survival2) {
				for (let k = 0; k < res.survival2.length; k++){
					if (res.survival2[k]) totalResult.nodes[j].survival2[k]++;
				}
			}
			if (res.jetCost) totalResult.totalSteelS += res.jetCost;
			if (res.repairCost1) totalResult.totalRepairCost1 += res.repairCost1;
			if (res.repairCost2) totalResult.totalRepairCost2 += res.repairCost2;
			if (!canContinue(FLEETS1[0].ships)) break;
		}
		let flagshipFinal = FLEETS2[FLEETS2.length-1].ships[0];
		totalResult.totalGaugeDamage += flagshipFinal.maxHP - Math.max(0,flagshipFinal.HP);
		for (var j=0; j<FLEETS1[0].ships.length; j++) { //get refuel and repair costs
			var ship = FLEETS1[0].ships[j];
			var useBucket = ship.HP/ship.maxHP <= BUCKETPERCENT || getRepairTime(ship) > BUCKETTIME;
			if (!CARRYOVERHP || useBucket) {
				var r = getRepairCost(ship);
				totalResult.totalFuelR += r[0];
				totalResult.totalSteelR += r[1];
				totalResult.totalRepairTime += getRepairTime(ship);
			}
			if (useBucket) totalResult.totalBuckets++;
			let fuelleft = ship.fuelleft - (ship._fuelUnderway || 0);
			let ammoleft = ship.ammoleft - (ship._ammoUnderway || 0);
			totalResult.totalFuelS += Math.floor(ship.fuel * (10-fuelleft)/10 * (ship.LVL > 99? .85: 1));
			totalResult.totalAmmoS += Math.floor(ship.ammo * (10-ammoleft)/10 * (ship.LVL > 99? .85: 1));
			for (var k=0; k<ship.PLANESLOTS.length; k++) {
				totalResult.totalBauxS += 5*(ship.PLANESLOTS[k]-ship.planecount[k]);
				if (ship.PLANESLOTS[k] && ship.planecount[k] <= 0) totalResult.totalEmptiedPlanes++;
			}
		}
		//support
		for (var s=0; s<=FLEETS1S.length; s++) {
			if (FLEETS1S[s]) {
				if (s < 2) {
					for (var j=0; j<FLEETS1S[s].ships.length; j++) {
						var shipS = FLEETS1S[s].ships[j];
						totalResult.totalFuelS += Math.floor(shipS.fuel * .5 * (shipS.LVL > 99? .85: 1));
						if (FLEETS1S[s].supportType == 1) totalResult.totalAmmoS += Math.floor(shipS.ammo * .4 * (shipS.LVL > 99? .85: 1));
						else totalResult.totalAmmoS += Math.floor(shipS.ammo * .8 * (shipS.LVL > 99? .85: 1));
						for (var k=0; k<shipS.PLANESLOTS.length; k++) totalResult.totalBauxS += 5*(shipS.PLANESLOTS[k]-shipS.planecount[k]);
					}
				}
				FLEETS1S[s].reset();
			}
		}
		// lbas
		for (var j=0; j<alllbas.length; j++) {
			var cost = alllbas[j].getCost();
			totalResult.totalFuelS += cost[0];
			totalResult.totalAmmoS += cost[1];
			totalResult.totalBauxS += cost[2];
			totalResult.totalEmptiedLBAS += cost[3];
			alllbas[j].reset();
		}
		
		if (CARRYOVERHP || CARRYOVERMORALE) {
			for (var j=0; j<FLEETS1.length; j++) {
				FLEETS1[j].reset(true);
				for (var k=0; k<FLEETS1[j].ships.length; k++) {
					var ship = FLEETS1[j].ships[k];
					var notHP = CARRYOVERHP && ship.HP/ship.maxHP > BUCKETPERCENT && getRepairTime(ship) <= BUCKETTIME;
					ship.reset(notHP, CARRYOVERMORALE);
					if (CARRYOVERMORALE) ship.morale = Math.max(49, ship.morale - 15);
				}
			}
		} else {
			for (var j=0; j<FLEETS1.length; j++) FLEETS1[j].reset();
		}
		for (var j=0; j<FLEETS2.length; j++) {
			FLEETS2[j].reset();
			if (FLEETS2[j].combinedWith) FLEETS2[j].combinedWith.reset();
		}
		if (FLEETLBRAID) FLEETLBRAID.reset();
	}
	
	updateResults(totalResult);
	
	console.log(totalResult);

	
	return 0;
}


// function simLBRaid(F1,F2,BAPI) {
// 	var ships1 = F1.ships, ships2 = F2.ships;
// 	if (C) {
// 		var dataroot = BAPI.data;
// 		dataroot.api_formation = [F1.formation.id,F2.formation.id,1];
// 		dataroot.api_deck_id = 1;
// 		dataroot.api_maxhps = [-1];
// 		dataroot.api_nowhps = [-1];
// 		for (var i=0; i<6; i++) {
// 			dataroot.api_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
// 			dataroot.api_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
// 		}
// 		dataroot.api_ship_ke = [];
// 		dataroot.api_eSlot = [];
// 		for (var i=0; i<6; i++) {
// 			dataroot.api_ship_ke.push((i<ships2.length)? ships2[i].mid : -1);
// 			dataroot.api_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
// 			dataroot.api_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
// 			dataroot.api_eSlot.push([]);
// 			for (var j=0; j<5; j++)
// 				dataroot.api_eSlot[i].push((i<ships2.length && j<ships2[i].equips.length)? ships2[i].equips[j].mid : -1);	
// 		}
// 	}
	
// 	if (C) {
// 		// var APIkouku = BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
// 		var APIkouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
// 		BAPI.data.api_air_base_attack = [APIkouku];
// 	}
	
// 	var ap1 = 0; for (let ship of ships1) if (ship.lbas) ap1 += ship.lbas.airPowerDefend();
// 	var ap2 = F2.fleetAirPower(false,true);
// 	if (ap1 == 0 && ap2 == 0) { F1.AS = F2.AS = 0; }
// 	else if (ap1 >= ap2*3) { F1.AS = 2; F2.AS = -2; }
// 	else if (ap1 >= ap2*1.5) { F1.AS = 1; F2.AS = -1; }
// 	else if (ap2 >= ap1*3) { F1.AS = -2; F2.AS = 2; }
// 	else if (ap2 >= ap1*1.5) { F1.AS = -1; F2.AS = 1; }
// 	else { F1.AS = F2.AS = 0; }
// 	// console.log(F1.AS + ' ' + F2.AS);
// 	// console.log(ap1 + ' ' + ap2);
	
// 	if (C) {
// 		APIkouku.api_stage1 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0,api_touch_plane:[-1,-1]};
// 		APIkouku.api_stage2 = {api_e_count:0,api_e_lostcount:0,api_f_count:0,api_f_lostcount:0};
// 		APIkouku.api_stage3 = {api_ebak_flag:[-1,0,0,0,0,0,0],api_edam:[-1,0,0,0,0,0,0],api_erai_flag:[-1,0,0,0,0,0,0],api_fbak_flag:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0],api_frai_flag:[-1,0,0,0,0,0,0],api_ecl_flag:[-1,0,0,0,0,0,0],api_fcl_flag:[-1,0,0,0,0,0,0]};
// 		APIkouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
// 	}
	
// 	//fighter defence
// 	var lbas1 = [];
// 	for (let i=0; i<ships1.length; i++) {
// 		if (ships1[i].lbas) {
// 			lbas1.push(ships1[i].lbas);
// 			ships1[i].lbas.apiID2 = i+1;
// 		}
// 	}
// 	for (let lbas of lbas1) lbas.AS = F1.AS;
// 	AADefenceFighters(lbas1,true,APIkouku);
// 	for (let ship of ships2) {
// 		let lbSlot = 0, hasfighter;
// 		for (let j=0; j<ship.equips.length; j++) {
// 			if (ship.equips[j].isfighter||ship.equips[j].isdivebomber||ship.equips[j].istorpbomber) {
// 				hasfighter = true;
// 				let interceptor = null;
// 				for (; lbSlot < 4; lbSlot++) {
// 					for (let k=0; k<lbas1.length; k++) {
// 						let equip = lbas1[k].equips[lbSlot];
// 						if (!equip) continue;
// 						if (lbas1[k].planecount[lbSlot]) {
// 							var currentACC = (interceptor)? interceptor.ACC || 0 : 0;
// 							var currentEV = (interceptor)? interceptor.EV || 0 : 0;
// 							if (equip.type == INTERCEPTOR && (equip.ACC > currentACC || (equip.ACC == currentACC && equip.EV > currentEV))) interceptor = equip;
// 						}
// 					}
// 					if (interceptor) break;
// 				}
// 				lbSlot++;
// 				let airStateMod = [1, 4, 6, 8, 10][F1.AS + 2] || 6;
// 				let antiBomber = 0, intercept = 0;
// 				if (interceptor) {
// 					antiBomber = interceptor.ACC || 0;
// 					intercept = interceptor.EV || 0;
// 				}
// 				let sRatio = 6.5*airStateMod + 3.5*(antiBomber + airStateMod*Math.min(1,intercept) + Math.random()*(airStateMod+antiBomber));
// 				let lostcount = Math.ceil(ship.planecount[j]*sRatio/100);
// 				if (C) {
// 					APIkouku.api_stage1[(ship.side)? 'api_e_count':'api_f_count'] += ship.planecount[j];
// 					APIkouku.api_stage1[(ship.side)? 'api_e_lostcount':'api_f_lostcount'] += lostcount;
// 					console.log('slot: '+lbSlot+' ratio: '+sRatio+' lost: '+lostcount+'/'+ship.planecount[j]);
// 					console.log(interceptor);
// 				}
// 				ship.planecount[j] -= lostcount;
// 				if (ship.planecount[j] < 0) ship.planecount[j] = 0;
// 			}
// 		}
// 		// if (C && hasfighter && ship.apiID2) APIkouku.api_plane_from[ship.side].push(ship.apiID2);
// 	}
	
// 	//airstrike
// 	var contactMod = 1;
// 	if (ships2[0].airState() != -2 && ships2[0].airState() != 0) {
// 		var contactdata = getContact(ships2);
// 		if (contactdata) {
// 			contactMod = contactdata.mod;
// 			if (C) APIkouku.api_stage1.api_touch_plane[1] = contactdata.id;
// 		}
// 	}
// 	for (let ship of ships2) {
// 		for (let slot=0; slot<ship.equips.length; slot++) {
// 			if (ship.planecount[slot] <= 0) continue;
// 			let equip = ship.equips[slot];
// 			if (!equip.isdivebomber && !equip.istorpbomber) continue;
// 			var target = ships1[Math.floor(Math.random()*ships1.length)];
// 			var dmg = airstrike(ship,target,slot,contactMod);
// 			if (target.HP <= 0) {
// 				dmg -= 1 - target.HP;
// 				target.HP = 1;
// 			}
// 			if (C) {
// 				APIkouku.api_stage3[(target.side)?'api_edam':'api_fdam'][target.num] += dmg;
// 				APIkouku.api_stage3[(target.side)?'api_ecl_flag':'api_fcl_flag'][target.num] = 0;
// 				if (ship.equips[slot].istorpbomber) APIkouku.api_stage3[(target.side)?'api_erai_flag':'api_frai_flag'][target.num] = 1;
// 				else APIkouku.api_stage3[(target.side)?'api_ebak_flag':'api_fbak_flag'][target.num] = 1;
// 			}
// 		}
// 	}
	
	
// 	if (C) {
// 		for (var i=0; i<2; i++)
// 			if (APIkouku && APIkouku.api_plane_from[i].length > 1)
// 				APIkouku.api_plane_from[i] = APIkouku.api_plane_from[i].slice(1);
		
// 		APIkouku.api_squadron_plane = [];
// 		for (let lbas of lbas1) {
// 			for (let i=0; i<lbas.equips.length; i++) {
// 				APIkouku.api_squadron_plane.push({ api_mst_id: lbas.equips[i].mid, api_count: lbas.planecount[i] });
// 			}
// 		}
// 	}
// }

function simLBRaid(lbas,F2) {
	// quick calculation of LB raid w/o defence
	lbas.forEach((lb) => lb.HPprev = lb.HP);

	// S1
	F2.AS = 2;
	AADefenceFighters(F2,false,{});
	
	// Contact
	var contactMod = 1;
	var contactdata = getContact(F2.ships);
	if (contactdata) contactMod = contactdata.mod;

	// S3 (assume no S2)
	for (let ship of F2.ships) {
		for (let slot=0; slot<ship.equips.length; slot++) {
			if (ship.planecount[slot] <= 0) continue;
			let equip = ship.equips[slot];
			if (!equip.isdivebomber && !equip.istorpbomber) continue;
			var target = lbas[Math.floor(Math.random()*lbas.length)];
			var acc = .95;
			var res = rollHit(accuracyAndCrit(ship,target,acc,1.0,0,.2,false), 1);
			var dmg = 0;
			var planebase = (equip.isdivebomber)? (equip.DIVEBOMB || 0) : (equip.TP || 0);
			if (C) console.log('	slot:'+slot+' planecount:'+ship.planecount[slot]+' planebase:'+planebase);
			var preMod = (equip.isdivebomber)? 1 : ((Math.random() < .5)? .8 : 1.4);
			var dmgbase = 25 + Math.sqrt(ship.planecount[slot]) * planebase;
			dmg = damage(ship,target,dmgbase,preMod,{postMod:contactMod,critMod:res},AIRSTRIKEDMGBASE,equip);
			takeDamage(target,dmg);
			if (C) console.log(ship.name+' airstrikes '+target.name+' for '+dmg+' damage, '+target.HP+'/'+target.maxHP+' left, CONTACT: '+contactMod);
		}
	}
}

function getNightEquips(alive1,alive2,APIyasen) {
	APIyasen.api_flare_pos = [-1,-1]; APIyasen.api_touch_plane = [-1,-1];
	var star1 = false;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive1[i].hasStarShell && alive1[i].HP > 4 && Math.random() < .7) { star1 = true; if (C) APIyasen.api_flare_pos[0] = alive1[i].num+off; break; }
	}
	var star2 = false;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		let off = (NEWFORMAT)? -1 : 0;
		if (alive2[i].hasStarShell && alive2[i].HP > 4 && Math.random() < .7) { star2 = true; if (C) APIyasen.api_flare_pos[1] = alive2[i].num+off; break; }
	}
	var light1 = false, lightship1 = 0, slrerolls1 = 0;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		if (alive1[i].hasSearchlight && alive1[i].HP > 1) { light1 = true; lightship1 = i; slrerolls1 = alive1[i].hasSearchlight; break; }
	}
	var light2 = false, lightship2 = 0, slrerolls2 = 0;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		if (alive2[i].hasSearchlight && alive2[i].HP > 1) { light2 = true; lightship2 = i; slrerolls2 = alive2[i].hasSearchlight; break; }
	}
	var scout1 = false;
	for (var i=0; i<alive1.length; i++) {
		if (alive1[i].retreated) continue;
		if (alive1[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive1[i].LVL)*Math.sqrt(3))/25) { scout1 = true; if (C) APIyasen.api_touch_plane[0] = 102; break; }
	}
	var scout2 = false;
	for (var i=0; i<alive2.length; i++) {
		if (alive2[i].retreated) continue;
		if (alive2[i].hasNightScout && Math.random() < Math.floor(Math.sqrt(alive2[i].LVL)*Math.sqrt(3))/25) { scout2 = true; if (C) APIyasen.api_touch_plane[1] = 102; break; }
	}
	return [[star1,star2],[light1,light2],[scout1,scout2],[slrerolls1,slrerolls2]];
}

function simNightFirstCombined(F1,F2,Fsupport,LBASwaves,BAPI) {
	var F2C = F2.combinedWith;
	var ships1 = F1.ships, ships2 = F2.ships, ships2C = F2C.ships;
	var alive1 = [], alive2 = [], alive2C = [], subsalive1 = [], subsalive2 = [], subsalive2C = [];
	var hasInstall1 = false, hasInstall2 = false, hasInstall2C = false;
	var results = { jetCost: 0 };
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP <= 0) continue;
		if (ships1[i].retreated) continue;
		if(ships1[i].isSub) subsalive1.push(ships1[i]);
		else alive1.push(ships1[i]);
		ships1[i].HPprev = ships1[i].HP;
		if (!MECHANICS.morale) ships1[i].morale = 49;
		if (ships1[i].isInstall) hasInstall1 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].HP <= 0) continue;
		if (ships2[i].retreated) continue;
		if(ships2[i].isSub) subsalive2.push(ships2[i]);
		else alive2.push(ships2[i]);
		ships2[i].HPprev = ships2[i].HP;
		if (!MECHANICS.morale) ships2[i].morale = 49;
		if (ships2[i].isInstall) hasInstall2 = true;
	}
	for (var i=0; i<ships2C.length; i++) {
		if (ships2C[i].HP <= 0) continue;
		if (ships2C[i].retreated) continue;
		if(ships2C[i].isSub) subsalive2C.push(ships2C[i]);
		else alive2C.push(ships2C[i]);
		ships2C[i].HPprev = ships2C[i].HP;
		if (!MECHANICS.morale) ships2C[i].morale = 49;
		if (ships2C[i].isInstall) hasInstall2C = true;
	}
	
	var r = Math.random();
	if (r < .45) ENGAGEMENT = 1;
	else if (r < .6) ENGAGEMENT = 1.2;
	else if (r < .9 || F1.noRedT || F2.noRedT || F2C.noRedT) ENGAGEMENT = .8;
	else ENGAGEMENT = .6;
	
	F1.AS = F2.AS = F2C.AS = 0;
	
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		dataroot.api_dock_id = 1;
		var retreatlist = [];
		for (var i=0; i<ships1.length; i++) if (ships1[i].retreated) retreatlist.push(i+1);
		if (retreatlist.length) dataroot.api_escape_idx = retreatlist;
		dataroot.api_f_maxhps = []; dataroot.api_f_nowhps = [];
		dataroot.api_e_maxhps = []; dataroot.api_e_nowhps = [];
		dataroot.api_e_maxhps_combined = []; dataroot.api_e_nowhps_combined = [];
		for (let ship of ships1) {
			dataroot.api_f_nowhps.push(ship.HP);
			dataroot.api_f_maxhps.push(ship.maxHP);
		}
		dataroot.api_ship_ke = [];
		dataroot.api_ship_ke_combined = [];
		dataroot.api_eSlot = [];
		dataroot.api_eSlot_combined = [];
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke.push((i<ships2.length)? ships2[i].mid : -1);
			dataroot.api_e_nowhps.push((i<ships2.length)? ships2[i].HP : -1);
			dataroot.api_e_maxhps.push((i<ships2.length)? ships2[i].maxHP : -1);
			dataroot.api_eSlot.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot[i].push((i<ships2.length && j<ships2[i].equips.length)? ships2[i].equips[j].mid : -1);
		}
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke_combined.push((i<ships2C.length)? ships2C[i].mid : -1);
			dataroot.api_e_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
			dataroot.api_e_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			dataroot.api_eSlot_combined.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot_combined[i].push((i<ships2C.length && j<ships2C[i].equips.length)? ships2C[i].equips[j].mid : -1);
		}
	}
	
	if (Fsupport && MECHANICS.LBASBuff && Fsupport.supportType != 1 && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2.concat(alive2C),subsalive2.concat(subsalive2C),Fsupport.supportType,BAPI,Fsupport.supportBoss,true);
			BAPI.data.api_n_support_flag = BAPI.data.api_support_flag;
			BAPI.data.api_n_support_info = BAPI.data.api_support_info;
			delete BAPI.data.api_support_flag; delete BAPI.data.api_support_info;
			removeSunk(alive2); removeSunk(subsalive2);
			removeSunk(alive2C); removeSunk(subsalive2C);
		}
	}
	
	var APIyasen = BAPI.data;
	var nightEquips = getNightEquips(alive1,alive2,APIyasen);
	
	if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		APIyasen.api_n_hougeki1 = {api_at_eflag:[],api_at_list:[],api_damage:[],api_df_list:[],api_sp_list:[],api_cl_list:[],api_n_mother_list:[],api_si_list:[]};
		var order1 = [], order2 = [];
		orderByRange(alive1.concat(subsalive1),order1,true,true);
		orderByRange(alive2C.concat(subsalive2C),order2,true,true);
		nightPhaseCombined(order1,order2,alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),nightEquips,APIyasen.api_n_hougeki1);
		removeSunk(alive1); removeSunk(subsalive1);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		APIyasen.api_n_hougeki2 = {api_at_eflag:[],api_at_list:[],api_damage:[],api_df_list:[],api_sp_list:[],api_cl_list:[],api_n_mother_list:[],api_si_list:[]};
		var order1 = [], order2 = [];
		orderByRange(alive1.concat(subsalive1),order1,true,true);
		orderByRange(alive2.concat(subsalive2),order2,true,true);
		nightPhaseCombined(order1,order2,alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),nightEquips,APIyasen.api_n_hougeki2);
		removeSunk(alive1); removeSunk(subsalive1);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	var count = 0, allsunk = true;
	for (var i=0; i<ships2.length; i++) if (ships2[i].HP > 0) { allsunk = false; break; }
	for (var i=0; i<ships2C.length; i++) {
		if (ships2C[i].HP/ships2C[i].maxHP > .5) count++;
	}
	var doDay = !allsunk && count <= 3;
	
	APIyasen.api_day_flag = 0;
	if (doDay && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		APIyasen.api_day_flag = 1;
		let BAPIDay = {data:{}};
		sim(F1,F2,Fsupport,LBASwaves,false,false,false,false,false,BAPIDay,true,null,true);
		for (let key in BAPIDay.data) {
			if (!APIyasen[key]) APIyasen[key] = BAPIDay.data[key];
		}
		BAPI.data.api_formation[2] = {1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT];
	}
	
	results.rankDay = results.rank = getRank(ships1,ships2.concat(ships2C));
	results.redded = false;
	results.flagredded = (ships1[0].HP/ships1[0].maxHP <= .25);
	results.reddedIndiv = [false,false,false,false,false];
	results.flagsunk = (ships2[0].HP <= 0);
	results.undamaged = true;
	results.buckets = 0;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP/ships1[i].maxHP <= .25) {
			results.redded = true;
			results.reddedIndiv[i] = true;
			if (!ships1[i].isflagship) ships1[i].protection = false;
		}
		if (ships1[i].HP/ships1[i].maxHP <= .5) results.undamaged = false;
		if (ships1[i].HP/ships1[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1[i]) > BUCKETTIME) results.buckets++;
	}
	results.mvpDay = results.MVP = F1.getMVP();
	results.sinkFlagship = F1.getSinkFlagship();
	results.dmgTotals = F1.DMGTOTALS;
	return results;
}

function nightPhaseCombined(order1,order2,alive1,subsalive1,alive2,subsalive2,nightEquips,APIhou) {
	let numRounds = Math.max(order1.length,order2.length);
	for (var i=0; i<numRounds; i++) {
		if (i < order1.length && order1[i].canNB()) {
			//does not pick fleet first, escorts can protect main flag
			if (subsalive2.length && order1[i].canASW() && !order1[i].planeasw) {
				var target = choiceWProtect(subsalive2);
				ASW(order1[i],target,false,APIhou);
				removeSunk(subsalive2);
			} else if (alive2.length) {
				var target = choiceWProtect(alive2,nightEquips[3][1]);
				NBattack(order1[i],target,false,nightEquips,APIhou);
				removeSunk(alive2);
			}
		}
		if (alive2.length+subsalive2.length <= 0) break;
		if (i < order2.length && order2[i].canNB()) {
			if (subsalive1.length && order2[i].canASW() && !order2[i].planeasw) {
				var target = choiceWProtect(subsalive1);
				ASW(order2[i],target,false,APIhou);
				removeSunk(subsalive1);
			} else if (alive1.length) {
				var target = choiceWProtect(alive1,nightEquips[3][0]);
				NBattack(order2[i],target,false,nightEquips,APIhou);
				removeSunk(alive1);
			}
		}
		if (alive1.length+subsalive1.length <= 0) break;
	}
}

function friendFleetPhase(fleet1,fleet2,alive2,subsalive2,BAPI) {
	if (!BAPI) BAPI = { yasen: {} };
	var APIyasen = BAPI.yasen;
	APIyasen.api_friendly_info = {
		api_production_type: 1,
		api_ship_id: [],
		api_ship_lv: [],
		api_nowhps: [],
		api_maxhps: [],
		api_Slot: [],
		api_voice_id: [],
		api_voice_p_no: [],
	};
	for (let ship of fleet1.ships) {
		APIyasen.api_friendly_info.api_ship_id.push(ship.mid);
		APIyasen.api_friendly_info.api_ship_lv.push(ship.LVL);
		APIyasen.api_friendly_info.api_nowhps.push(ship.HP);
		APIyasen.api_friendly_info.api_maxhps.push(ship.maxHP);
		let equips = [];
		for (let equip of ship.equips) equips.push(equip.mid);
		APIyasen.api_friendly_info.api_Slot.push(equips);
		if (ship.voiceFriend) {
			APIyasen.api_friendly_info.api_voice_id.push(ship.voiceFriend[0]);
			APIyasen.api_friendly_info.api_voice_p_no.push(ship.voiceFriend[1]);
		} else {
			APIyasen.api_friendly_info.api_voice_id.push(141);
			APIyasen.api_friendly_info.api_voice_p_no.push(0);
		}
	}
	
	APIyasen.api_friendly_battle = {};
	var nightEquips = getNightEquips(fleet1.ships,alive2,APIyasen.api_friendly_battle);
	
	let APIhou = APIyasen.api_friendly_battle.api_hougeki = {api_at_eflag:[],api_at_list:[],api_damage:[],api_df_list:[],api_sp_list:[],api_cl_list:[],api_n_mother_list:[],api_si_list:[]};
	
	let ind1 = 0; ind2 = 0;
	let ships1 = fleet1.ships, ships2 = (fleet2.combinedWith)? fleet2.combinedWith.ships.concat(fleet2.ships) : fleet2.ships;
	let alive1 = [], subsalive1 = [];
	for (let ship of ships1) {
		if (ship.isSub) subsalive1.push(ship);
		else alive1.push(ship);
	}
	for (let i=0; i<ships1.length; i++) {
		if (ind1 < ships1.length) {
			let attacker = ships1[ind1];
			if (attacker.canNB()) {
				if (alive2.length + subsalive2.length == 1) { //friend fleet can't sink all
					let ship = (alive2.length)? alive2[0] : subsalive2[0];
					ship.protection = true;
				}
				
				if (subsalive2.length && attacker.canASW() && !attacker.planeasw) {
					let target = choiceWProtect(subsalive2);
					ASW(attacker,target,false,APIhou);
					removeSunk(subsalive2);
				} else if (alive2.length) {
					let target = choiceWProtect(alive2,nightEquips[3][1]);
					NBattack(attacker,target,false,nightEquips,APIhou);
					removeSunk(alive2);
				}
			}
			ind1++;
		}
		if (ind1 >= ships1.length || alive2.length + subsalive2.length <= 0) break;
		
		for (; ind2<ships2.length; ind2++) { //enemy always skips to next capable
			if (ships2[ind2].canNB() && (ships2[ind2].nightattack != 3 || nightEquips[1][0])) { break; }
		}
		if (ind2 < ships2.length) {
			let attacker = ships2[ind2];
			if (subsalive1.length && attacker.canASW() && !attacker.planeasw) {
				let target = choiceWProtect(subsalive1);
				ASW(attacker,target,false,APIhou);
				removeSunk(subsalive1);
			} else if (alive1.length) {
				let target = choiceWProtect(alive1,nightEquips[3][0]);
				NBattack(attacker,target,false,nightEquips,APIhou);
				removeSunk(alive1);
			}
			ind2++;
		}
		
		if (alive1.length + subsalive1.length <= 0) break;
	}
	
	for (let ship of ships2) ship.protection = false;
}

function formatRemovePadding(obj) {
	for (let key in obj) {
		if (Array.isArray(obj[key])) obj[key].shift();
	}
}

function chLoadFriendFleet(friendData) {
	let fleet = new Fleet(0);
	let simShips = [];
	for (let ship of friendData.ships) {
		let sdata = SHIPDATA[ship.mid];
		let ShipType = window[sdata.type];
		let ev = sdata.EVbase + Math.floor((sdata.EV - sdata.EVbase)*ship.LVL/99);
		let asw = sdata.ASWbase + Math.floor((sdata.ASW - sdata.ASWbase)*ship.LVL/99);
		let los = sdata.LOSbase + Math.floor((sdata.LOS - sdata.LOSbase)*ship.LVL/99);
		let simShip = new ShipType(ship.mid,'',0,ship.LVL,sdata.HP,ship.FP,ship.TP,ship.AA,ship.AR,ev,asw,los,sdata.LUK,sdata.RNG,sdata.SLOTS);
		simShip.loadEquips(ship.equips,[],[],true);
		
		if (ship.damage) {
			let percent = ship.damage[0] + Math.random()*(ship.damage[1]-ship.damage[0]);
			simShip.HP = Math.floor(simShip.HP*percent);
		}
		simShips.push(simShip);
		
		// if (ship.mid == friendData.voice[0]) simShip.voiceFriend = [friendData.voice[1],1];
	}
	fleet.loadShips(simShips);
	fleet.formation = LINEAHEAD;
	return fleet;
}

//extra
var DetectionResult = {
	'Success': 1,
	'SuccessLost': 2,
	'FailureLost': 3,
	'Failure': 4,
	'Found': 5,
	'NotFound': 6
};
function getDetection(shipsF,shipsE) {
	let weights = [2,5,8,8,8,8], ind = 0;
	let weightedLOS = 0, numReconSlots = 0, numCarriers = 0, numShips = 0, reconSlots = [];
	for (let ship of shipsF) {
		if (ship.HP <= 0 || ship.retreated) continue;
		weightedLOS += ship.LOS/weights[ind++] || 0;
		for (let i=0; i<ship.equips.length; i++) {
			if (ship.planecount[i] <= 0) continue;
			let eq = ship.equips[i];
			if ([CARRIERSCOUT,CARRIERSCOUT2,SEAPLANE,SEAPLANEBOMBER,FLYINGBOAT].indexOf(eq.type) != -1) {
				numReconSlots += ship.planecount[i];
				if (eq.rank >= 7) numReconSlots += 30;
				else if (eq.rank >= 4) numReconSlots += 15;
				else if (eq.rank >= 2) numReconSlots += 5;
				reconSlots.push({ ship: ship, slot: i });
				if (!eq.lostnums) eq.lostnums = [];
				eq.lostnums.push(0);
			}
		}
		if (['CV','CVL','CVB'].indexOf(ship.type) != -1) numCarriers++;
		numShips++;
	}
	if (numCarriers) numReconSlots += 20 + 10*numCarriers;
	let numShipBonus = Math.max(0,numShips - 2);
	
	let numFighterSlots = 0, defence = 0;
	for (let ship of shipsE) {
		if (ship.HP <= 0 || ship.retreated) continue;
		for (let i=0; i<ship.equips.length; i++) {
			if (ship.equips[i].type == FIGHTER) numFighterSlots += ship.planecount[i];
		}
	}
	if (numFighterSlots) {
		if (numFighterSlots <= 30) defence = 1 + numFighterSlots/9;
		else if (numFighterSlots <= 120) defence = 2 + numFighterSlots/20;
		else defence = 6 + (numFighterSlots-120)/40;
	}
	
	let detectVal = weightedLOS + numShipBonus - 20 + Math.floor(Math.sqrt(10*numReconSlots));
	let shotdownVal = numReconSlots - Math.floor(defence*(1 + .1*Math.floor(Math.random()*5)));
	
	if (shotdownVal <= 0) {
		for (let recon of reconSlots) {
			let num = Math.min(recon.ship.planecount[recon.slot], Math.floor(Math.random()*3));
			recon.ship.planecount[recon.slot] -= num;
		}
	}
	
	let r = Math.floor(Math.random()*20);
	if (r <= detectVal) {
		if (numReconSlots <= 0) return DetectionResult.Found;
		return (shotdownVal <= 0)? DetectionResult.SuccessLost : DetectionResult.Success;
	}
	if (numReconSlots <= 0) return DetectionResult.NotFound;
	return (shotdownVal <= 0)? DetectionResult.Failure : DetectionResult.FailureLost;
}

function getSpecialEquipBonus(ship,target,plane,isAcc){
	var specialMod = 1;
	var bonuses = target.equipWeak;

	if (ship instanceof LandBase){
		if (!plane) return specialMod;
		bonuses.forEach((bonus) => {
			if (bonus.excludeLBAS) return;
			let flag = false;
			if (bonus.eqtypes) flag = bonus.eqtypes.indexOf(plane.type) !== -1;
			else if (bonus.eqids) flag = bonus.eqids.indexOf(plane.mid) !== -1;
			if (flag) {
				if (typeof bonus.mod === 'object') specialMod *= (bonus.mod[0] || 1);
				else specialMod *= (bonus.mod || 1);
			}
		});
		return specialMod;
	}

	bonuses.forEach((bonus) => {
		if (isAcc && bonus.noAccBonus) return;
		let count = 0;
		if (bonus.eqtypes) {
			if (bonus.distinct){
				let eqs = ship.equips.filter((eq,i) => bonus.eqtypes.indexOf(eq.type) !== -1 && (!EQTDATA[eq.type].isPlane || bonus.noPlaneCheck || ship.planecount[i] > 0));
				count = eqs.map((eq) => eq.type).filter((eqtype,i,a) => a.indexOf(eqtype) === i).length;
			}else{
				count = ship.equips.filter((eq,i) => bonus.eqtypes.indexOf(eq.type) !== -1 && (!EQTDATA[eq.type].isPlane || bonus.noPlaneCheck || ship.planecount[i] > 0)).length;
			}
		}
		else if (bonus.eqids) {
			if (bonus.distinct){
				let eqs = ship.equips.filter((eq,i) => bonus.eqids.indexOf(eq.mid) !== -1 && (!EQTDATA[eq.type].isPlane || bonus.noPlaneCheck || ship.planecount[i] > 0));
				count = eqs.map((eq) => eq.mid).filter((eqid,i,a) => a.indexOf(eqid) === i).length;
			}else{
				count = ship.equips.filter((eq,i) => bonus.eqids.indexOf(eq.mid) !== -1 && (!EQTDATA[eq.type].isPlane || bonus.noPlaneCheck || ship.planecount[i] > 0)).length;
			}
		}
		if (count > 0) {
			if (typeof bonus.mod === 'object'){
				count = count > bonus.mod.length? bonus.mod.length: count;
				specialMod *= (bonus.mod[count-1] || 1);
			}
			else specialMod *= (bonus.mod || 1);
		}
	})
	return specialMod;
}

function dmgSpecialTarget(dmg,ship,target,plane){
	if (target.installtype == 3){
		if (plane) {
			if (plane.isdivebomber && target.mid <= 1658) dmg *= 2.1;
		}else{
			dmg *= (ship.supplyPostMult||1);
		}
		if (ship instanceof LandBase && target.mid <= 1658) dmg += 100;
	}
	if (target.isPT) {
		if (plane) dmg *= Math.random() < 0.5? 0.5: 0.8;
		else dmg = 0.35 * dmg + 15;
	}

	if (plane) {
		if (plane.isdivebomber) dmg *= target.divebombWeak || 1;
		if (target.mid >= 1665 && target.mid <= 1667) dmg *= (1.6 + Math.random() * .6)		// guess
		else if (target.mid >= 1668 && target.mid <= 1672) dmg *= (1.5 + Math.random() * .5);   // Source: https://twitter.com/yukicacoon/status/1355546046026289154
	}else {
		if (target.isAnchorage) dmg *= ship.anchoragePostMult || 1;
		else if (target.isSummerBBHime) dmg *= ship.summerBBHimePostMult || 1;
		else if (target.isSummerCAHime) dmg *= ship.summerCAHimePostMult || 1;
		else if (target.isFrenchBBHime) dmg *= ship.FrenchBBHimePostMult || 1;
	}
	return Math.floor(dmg);
}

function vanguardEvFlat(ship, isTorpedo) {
	// Source: https://twitter.com/Xe_UCH/status/1298910160664924160
	// Update: https://twitter.com/Xe_UCH/status/1349290257825419268
	if (isTorpedo) {
		if (ship.num <= 2) return 15;
		if (ship.num == 3) {
			if (ship.type == 'DD') return 45;
			return 15;
		} 
		if (ship.num == 4) {
			if (ship.type == 'DD') return 55;
			return 45;
		}
		if (ship.num == 5){
			if (ship.type == 'DD') return 65;
			return 45; 
		}
		if (ship.num == 6) {
			if (ship.type == 'DD') return 75;
			return 55; 
		}
	}
	else
	// Source: https://twitter.com/Xe_UCH/status/1332267790686769159
	// Update: https://twitter.com/Xe_UCH/status/1349290257825419268
	{
		if (ship.num <= 2) return 7;
		if (ship.num <= 4) {
			if (ship.type == 'DD') return 20;
			return 7;
		}
		if (ship.num == 5){
			if (ship.type == 'DD') return 35;
			return 15;
		}
		if (ship.num == 6) {
			if (ship.type == 'DD') return 40;
			return 20;
		}
	}
	return 0;
}

function vanguardAccFlat(ship,target) {
	// Source: https://twitter.com/Xe_UCH/status/1332267790686769159
	var accFlat = 0;
	if (ship.getFormation() == VANGUARD1) {
		accFlat -= 20;
	}else{
		accFlat += 20;
	}
	if (ship.type == 'DD' && target.type == 'DD') accFlat += 12;
	if (ship.type != 'DD' && target.type != 'DD') accFlat -= 12;
	return accFlat;
}

function randFormation(obj) {
	var rand = Math.floor(Math.random() * 100);
	var acc = 0; 
	for (var key in obj) {
		acc += obj[key];
		if (rand < acc) return key;
	}
	return '0';
}

function randFriendFleet(obj) {
	var rand = Math.floor(Math.random() * 100);
	var acc = 0; 
	for (var key in obj) {
		acc += obj[key];
		if (rand < acc) return 1 + Number(key);
	}
	return 2;
}

function calJetCost(fleet1, fleet2) {
	var cost = 0;
	if (fleet1.length && fleet2.length) {
		fleet1.forEach((ship) => {
			ship.equips.forEach((eq, i) => {
				if (eq.isjet) cost += Math.round(ship.planecount[i] * LBASDATA[eq.mid].cost * .2);
			});
		})
	}
	return cost;
}

function isTorpSquadron(ships) {
	if (!ships.length) return false;
	var flag = true;
	ships.forEach((ship) => {
		if (ship.isflagship) {
			if (['DD','CL'].indexOf(ship.type) === -1) flag = false;
		}else{
			if (['DD','CLT'].indexOf(ship.type) === -1) flag = false;
		}
	})
	return flag;
}