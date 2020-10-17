
//-------
function Fleet(id,isescortfor) {
	this.id = id;
	this.side = id;
	this.ships = [];
	if (isescortfor) {
		this.isescort = true;
		this.combinedWith = isescortfor;
		isescortfor.combinedWith = this;
	}
	
	this.formation = false;
	this.AP = 0;  //air (fighter) power
	this.AS = 0;  //air superiority
    this.DMGTOTALS = [0,0,0,0,0,0];
    this.SINKFLAGSHIP = [false, false, false, false, false, false];
}
Fleet.prototype.loadShips = function(ships) {
	this.AP = 0; this.noRedT = false;
	for(var i=0; i<ships.length; i++) {
		this.ships.push(ships[i]);
		ships[i].id = i+10*this.id;
		ships[i].apiID = (i+1)+6*this.id;
		ships[i].apiID2 = (i+1)+6*(this.isescort||0);
		ships[i].num = i+1;
		ships[i].fleet = this;
		for (var j=0; j<ships[i].equips.length; j++) {
			if (ships[i].equips[j].noRedT) { this.noRedT = true; break; }
			if (ships[i].equips[j].type == OILDRUM) this.numUnderwaySupply = this.numUnderwaySupply + 1 || 1;
		}
		if (this.isescort) ships[i].isescort = true;
	}
	this.ships[0].isflagship = true;
}
Fleet.prototype.fleetAirPower = function(jetonly,includeScout) {  //get air power
	this.AP = 0;
	for (var i=0; i<this.ships.length; i++) {
		if (this.ships[i].HP <= 0 || this.ships[i].retreated) continue;
		this.AP += this.ships[i].airPower(jetonly,includeScout);
	}
	return this.AP;
}
Fleet.prototype.fleetAntiAir = function(alreadyCombined) {
	if (this._baseFAA === undefined) {
		this._baseFAA = 0;
		for (var i=0; i<this.ships.length; i++) {
			if (this.ships[i].HP <= 0) { continue; }
			if (this.ships[i].retreated) continue;
			for (var j=0; j<this.ships[i].equips.length; j++) {
				var equip = this.ships[i].equips[j];
				var mod = 0;
				switch(equip.atype) {
					case A_HAGUN:
					case A_HAFD:
					case A_AAFD:
						mod = .35; break;
					case A_AIRRADAR:
						mod = .4; break;
					case A_TYPE3SHELL:
						mod = .6; break;
					case A_XLGUN:
						mod = .25; break;
					default:
						mod = .2; break;
				}
				if (equip.AA) this._baseFAA += Math.floor(equip.AA * mod);
			}
			if (this.ships[i].improves.AAfleet) this._baseFAA += this.ships[i].improves.AAfleet;
		}
		if (this.side == 0) this._baseFAA /= 1.3; //player side fleetAA is lower?
	}
	var FAA = this._baseFAA*2*this.formation.AAmod;
	if (alreadyCombined) return FAA;
	if (this.combinedWith) {
		FAA += this.combinedWith.fleetAntiAir(true);
		FAA *= ((this.isescort)? .48 : (this.side == 0)? .72 : .8);
	}
	// console.log('FLEET ANTI-AIR: '+FAA);
	return FAA;
}
Fleet.prototype.clearFleetAntiAir = function() {
	this._baseFAA = undefined;
}
Fleet.prototype.fleetLoS = function() {
	if (this._fLoS === undefined) {
		this._fLoS = 0;
		for (var i=0; i<this.ships.length; i++) {
			if (this.ships[i].HP <= 0) continue;
			if (this.ships[i].retreated) continue;
			this._fLoS += this.ships[i].LOS;
			for (var j=0; j<this.ships[i].equips.length; j++) {
				var equip = this.ships[i].equips[j];
				if (equip.LOS) {
					this._fLoS -= equip.LOS;
					if (equip.btype == B_RECON) this._fLoS += equip.LOS*Math.floor(Math.sqrt(this.ships[i].planecount[j]));
				}
			}
		}
	}
	return this._fLoS;
}
Fleet.prototype.clearFleetLoS = function() {
	this._fLoS = undefined;
}
Fleet.prototype.supportChance = function(isboss) {
	var c = (isboss)? .85 : .5;
	if (this.ships[0].morale > 49) c += .15;
	for (var i=1; i<this.ships.length; i++) if (this.ships[i].morale > 49) c += .05;
	return c;
}
Fleet.prototype.reset = function(notShips) {
	if (!notShips) {
		for (var i=0; i<this.ships.length; i++) this.ships[i].reset();
	}
	this.AS = 0;
    this.DMGTOTALS = [0,0,0,0,0,0];
    this.SINKFLAGSHIP = [false, false, false, false, false, false];
	this._baseFAA = undefined;
    this._fLoS = undefined;
    delete this.didSpecial;
}
Fleet.prototype.giveCredit = function(ship,target,damage) {
    var i = this.ships.indexOf(ship);
    this.DMGTOTALS[i] += damage;
    if (target.HP <= 0 && target.isflagship && !target.isescort && this.SINKFLAGSHIP.findIndex(f => f) == -1) this.SINKFLAGSHIP[i] = true;
}
Fleet.prototype.getMVP = function() {
	var m = this.DMGTOTALS[0], ship = this.ships[0];
	for(var i=1; i<this.DMGTOTALS.length; i++) {
		if(this.DMGTOTALS[i] > m) { m = this.DMGTOTALS[i]; ship = this.ships[i]; }
	}
	return ship.id;
}
Fleet.prototype.getSinkFlagship = function () {
    return this.SINKFLAGSHIP.findIndex(f => f);
}
Fleet.prototype.setFormation = function(formNum,combineType) {
	if (formNum > 10 && this.combinedWith) {
		if (this.isescort) {
			this.combinedWith.formation = ALLFORMATIONS[''+combineType+formNum];
			this.formation = ALLFORMATIONS[''+combineType+formNum+'E'];
		} else {
			this.formation = ALLFORMATIONS[''+combineType+formNum];
			this.combinedWith.formation = ALLFORMATIONS[''+combineType+formNum+'E'];
		}
	} else {
		this.formation = ALLFORMATIONS[formNum];
	}
}
//----------

function Ship(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	this.id = 0;
	this.mid = id;
	if (!(typeof SHIPDATA == 'undefined')) {
		for (var key in SHIPDATA[id]) {  //load extra data
			if (['image','EQUIPS','SLOTS'].indexOf(key) == -1) this[key] = SHIPDATA[id][key];
		}
	}
	this.side = side;
	this.LVL = LVL;
	this.HP = HP;
	this.FP = FP;
	this.TP = TP;
	this.AA = AA;
	this.AR = AR;
	this.EV = EV;
	this.ASW = ASW;
	this.LOS = LOS;
	this.LUK = LUK;
	this.RNG = RNG;
	this.ACC = 0;
	this.maxHP = HP;
	// this.equipstats = {FP:0,TP:0,AA:0,AR:0,ACC:0,EV:0,ASW:0,LOS:0,RNG:0,DIVEBOMB:0};
	this.equiptypes = {};
	this.equiptypesB = {};
	this.equips = [];
	this.improves = {};
	this.fleet = false;
	this.isflagship = false;
	if (!planeslots) planeslots = [0,0,0,0];
	this.PLANESLOTS = planeslots;
	this.planecount = planeslots.slice();
	this.AACItype = [];
	this.fuelleft = 10;
	this.fuelDefault = 10;
	this.ammoleft = 10;
	this.ammoDefault = 10;
	this.protection = (side==0 && isPlayable(this.mid));
	this.LOSeq = 0;
	this.APtype = false;
	this.morale = 49;
	this.moraleDefault = 49;
	
	this._nbtypes = false;
	this._astype = false;
	this._aswpower = false;
	
	if (this.installtype) {
		this.isInstall = true;
	}
}
Ship.prototype.loadEquips = function(equips,levels,profs,addstats) {
	if (!equips || this.equips.length > 0) return;  //don't load if already have equips, do removeEquips() first
	var atypes = {};
	var planeexp = 0, planecount = 0;
	var installeqs = {DH1:0,DH2:0,DH3:0,TDH:0,TDH11:0,WG:0,AP:0,T3:0,SB:0,DB:0,DH1stars:0,DH3stars:0};
	var fitcounts = {}; 
	var FPfitcounts = {};
	var tpEquip = 0;
	var aswPenetrate = 0;
	for (var i=0; i<equips.length; i++){
		if (!equips[i]) continue;
		var eq = new Equip(equips[i],levels[i],profs[i]);
		
		if (eq.RNG && eq.RNG > this.RNG) this.RNG = eq.RNG;
		if (eq.ACC) this.ACC += eq.ACC;
		this.equiptypes[eq.type] = this.equiptypes[eq.type] + 1 || 1;
		if (eq.btype) {
			if (!this.equiptypesB[eq.btype]) this.equiptypesB[eq.btype]=1;
			else this.equiptypesB[eq.btype]++;
		}
		if (eq.atype) {
			if (!atypes[eq.atype]) atypes[eq.atype]=1;
			else atypes[eq.atype]++;
			if (eq.atype == A_HAFD) {  //HAFD also counts as HAGUN
				atypes[A_HAGUN] = (!atypes[A_HAGUN])? 1 : atypes[A_HAGUN]+1;
			}
		}
		if (eq.type == TYPE3SHELL) this.hasT3Shell = true;
		if (eq.type == MIDGETSUB && (eq.mid < 500 || eq.mid == 541)) this.hasMidgetSub = true;
		if (eq.type == STARSHELL) this.hasStarShell = true;
		if (eq.type == SEARCHLIGHTS) this.hasSearchlight = 1;
		if (eq.type == SEARCHLIGHTL) this.hasSearchlight = 2;
		if (eq.isnightscout) this.hasNightScout = true;
		if (eq.type == PICKET) this.hasLookout = true;
		if (eq.type == DIVEBOMBER || eq.type == JETBOMBER) this.hasDivebomber = true;
		if (eq.type == FCF) this.hasFCF = equips[i];
		if (eq.type == SUBRADAR) this.hasSubRadar = true;
		if (eq.specialCutIn) this.numSpecialTorp = this.numSpecialTorp+1 || 1;
		if (eq.type == REPAIR) {
			if (this.repairs) this.repairs.push(equips[i]);
			else this.repairs = [equips[i]];
		}
		if (eq.isjet) this.hasjet = true;
		if (eq.btype == B_RADAR && eq.LOS >= 5) this.hasLOSRadar = true;
		if (eq.btype == B_RADAR && eq.LOS >= 8) this.hasLOSRadar2 = true;
		
		if (eq.CANBbonus && this.type=='CA'||this.type=='CAV') {
			if (!this.ACCnbca || this.ACCnbca > eq.CANBbonus) this.ACCnbca = eq.CANBbonus; //10 overrides 15
		}
		
		if (this.fitclass && eq.fitclass) {
			if (!fitcounts[eq.fitclass]) fitcounts[eq.fitclass] = 1;
			else fitcounts[eq.fitclass]++;
		}
		
		if (this.fitclass == 100 && eq.FPfitclass) {
			if (!FPfitcounts[eq.FPfitclass]) FPfitcounts[eq.FPfitclass] = 1;
			else FPfitcounts[eq.FPfitclass]++;
		}

		//add improvement stats
		for (var key in eq.improves) {
			if (this.improves[key]) this.improves[key] += eq.improves[key];
			else this.improves[key] = eq.improves[key];
        }
		
		//installation equips
		if (eq.btype == B_LC1) { installeqs.DH1++; installeqs.DH1stars+=(eq.level||0); }
		else if(eq.btype == B_LC2) { installeqs.DH2++; this.hasDH2 = true; installeqs.DH1stars+=(eq.level||0); }
		else if(eq.btype == B_LC3) { installeqs.DH3++; this.hasDH3 = true; installeqs.DH3stars+=(eq.level||0); }
		else if(eq.type == APSHELL) installeqs.AP++;
		else if(eq.type == TYPE3SHELL) installeqs.T3++;
		else if(eq.type == SEAPLANEBOMBER) installeqs.SB++;
		else if(eq.type == SEAPLANEFIGHTER) installeqs.SB++;
		else if (eq.type == DIVEBOMBER || eq.type == JETBOMBER) installeqs.DB++;
		if (eq.mid == 230) installeqs.TDH11++;
		if (eq.mid == 193) installeqs.TDH++;
		if (eq.mid == 346) installeqs.mortar = installeqs.mortar + 1 || 1;
		if (eq.mid == 347) installeqs.mortarC = installeqs.mortarC + 1 || 1;
		if (eq.mid == 348) installeqs.rocket4 = installeqs.rocket4 + 1 || 1;
		if (eq.mid == 349) installeqs.rocket4C = installeqs.rocket4C + 1 || 1;
		if (eq.mid == 355) installeqs.m4a1 = installeqs.m4a1 + 1 || 1;
		if (eq.mid == 126) this.numWG = this.numWG + 1 || 1;
		
		if (eq.LOS) this.LOSeq += eq.LOS;
		if (eq.TP) tpEquip += eq.TP;
		
		if (eq.btype == B_DEPTHCHARGE2 && eq.ASW) {
			aswPenetrate += Math.max(0, Math.sqrt(eq.ASW - 2) + +(this.type == 'DE'));
		}

		if (eq.type == ENGINE) {
			if (!this.evimprove) this.evimprove = eq.level || 0;
			else this.evimprove += eq.level || 0;
		}
		
		this.equips.push(eq);
    }
    
    this.setProficiencyBonus();

	this.AACItype = this.getAACItype(atypes);
	if (addstats) {
		for (var i=0; i<equips.length; i++){
			var eq = this.equips[i];
			if (eq.FP) this.FP += eq.FP;
			if (eq.TP) this.TP += eq.TP;
			if (eq.AA) this.AA += eq.AA;
			if (eq.AR) this.AR += eq.AR;
			if (eq.EV) this.EV += eq.EV;
			if (eq.ASW) this.ASW += eq.ASW;
			if (eq.LOS) this.LOS += eq.LOS;
			if (eq.LUK) this.LUK += eq.LUK;
		}
	}
	
	if (this.equiptypesB[B_APSHELL]&&this.equiptypesB[B_MAINGUN]) {
		if (this.equiptypesB[B_RADAR]&&this.equiptypesB[B_SECGUN]) this.APtype = 4;
		else if (this.equiptypesB[B_SECGUN]) this.APtype = 3;
		else if (this.equiptypesB[B_RADAR]) this.APtype = 2;
		else this.APtype = 1;
	}
	
	for (var eqfitclass in fitcounts) { //BB fit
		if (eqfitclass > 100) continue;
		if (!this.ACCfit) this.ACCfit = 0;
		this.ACCfit += FITDATA[this.fitclass][eqfitclass]*Math.sqrt(fitcounts[eqfitclass]);
		if (!this.ACCfitN) this.ACCfitN = 0;
		this.ACCfitN += FITDATAN[this.fitclass][eqfitclass]*Math.sqrt(fitcounts[eqfitclass]);
	}

	if (this.fitclass==100) { //CL fit
		this.FPfit = 0;
		if (FPfitcounts[101]) this.FPfit += Math.sqrt(FPfitcounts[101]);   // single gun fit
		if (FPfitcounts[102]) this.FPfit += 2*Math.sqrt(FPfitcounts[102]);	// dual gun fit

		this.ACCfit = 0; 
		if ([4,16,20].indexOf(this.sclass) != -1 && (fitcounts[101] || fitcounts[102])) this.ACCfit += 4 - 2*((fitcounts[101] || 0) + (fitcounts[102] || 0));  // 5500T class fit
		if (this.sclass == 41 && fitcounts[102]) this.ACCfit += 8 - 2*(fitcounts[102] || 0);  // Agano class fit
		if (fitcounts[103]) this.ACCfit -= 3*fitcounts[103];   // 20.3cm dual gun fit
		if (fitcounts[104]) this.ACCfit -= 10*fitcounts[104];   // 8inch triple gun fit
		this.ACCfitN = this.ACCfit;
	}

	if (this.fitclass==200 && this.equiptypes[MAINGUNM]) { //AV fit
		this.ACCfit = 0;
		if (fitcounts[101] || fitcounts[102]){
			let lightgun = (fitcounts[101] || 0) + (fitcounts[102] || 0);
			if (this.equiptypes[MAINGUNM] <= lightgun) this.ACCfit = -6*lightgun;  // only 14/15.2cm
			else this.ACCfit = -6*lightgun - 10*(this.equiptypes[MAINGUNM] - lightgun);  // both 14/15.2cm and other median gun
		}else{
			this.ACCfit = -8 - 10*this.equiptypes[MAINGUNM];   // no 14/15.2cm
		}
		this.ACCfitN = this.ACCfit;
	}

	if (this.sclass==64){   // Italy CA
		let italygun = this.equips.filter(eq => eq.mid == 162).length;
		this.FPfit = (Math.sqrt(italygun) || 0);
	}

	if (this.sclass==81){   // Tashkent
		let tashgun = this.equips.filter(eq => eq.mid == 282).length;
		this.ACCfit = (5*Math.sqrt(tashgun) || 0);
		this.ACCfitN = this.ACCfit;
	}

	if (this.mid == 541 || this.mid == 573){   // Nagato class Kai 2
		if (this.equips.filter(eq => eq.mid == 318).length >= 1){
			this.ACCfit += 2;
			this.ACCfitN += 2;
			if (this.equips.filter(eq => eq.mid == 290).length >= 1){
				this.ACCfit += 1;
				this.ACCfitN += 1;
			}
		}
	}

	if (this.mid == 553 || this.mid == 554){   // Ise class Kai 2
		if (this.equips.filter(eq => eq.mid == 290).length >= 1){
			this.ACCfit += 3;
			this.ACCfitN += 3;
			if (this.equips.filter(eq => eq.mid == 318).length >= 1 && this.mid == 554){
				this.ACCfit += 1;
				this.ACCfitN += 1;
			}
		}else if (this.equips.filter(eq => eq.mid == 318).length >= 1){
			this.ACCfit += 3;
			this.ACCfitN += 3;
		}
	}
	
	var installbonus1 = 1 + (installeqs.DH1stars / (installeqs.DH1+installeqs.DH2))/50;
	var installbonus3 = 1 + (installeqs.DH3stars / installeqs.DH3)/30;
	
	this.installFlat = 0;
	if (installeqs.TDH11) this.installFlat += 25;
	if (installeqs.m4a1) {
		this.installFlat += 25;
		this.installFlat *= 1.4;
	}
    if (this.numWG) this.installFlat += WGpower(this.numWG);
    if (installeqs.mortarC >= 4) this.installFlat += 180;
    else if (installeqs.mortarC >= 3) this.installFlat += 150;
	else if (installeqs.mortarC >= 2) this.installFlat += 110;
	else if (installeqs.mortarC) this.installFlat += 60;
	if (installeqs.mortar >= 4) this.installFlat += 90;
	else if (installeqs.mortar == 3) this.installFlat += 75;
	else if (installeqs.mortar == 2) this.installFlat += 55;
	else if (installeqs.mortar) this.installFlat += 30;
	if (installeqs.rocket4 >= 4) this.installFlat += 195;
	else if (installeqs.rocket4 == 3) this.installFlat += 160;
	else if (installeqs.rocket4 == 2) this.installFlat += 115;
	else if (installeqs.rocket4) this.installFlat += 55;
    if (installeqs.rocket4C >= 2) this.installFlat += 170;
    else if (installeqs.rocket4C) this.installFlat += 80;
	let numMortar = (installeqs.mortar || 0) + (installeqs.mortarC || 0);
	let numRocket4 = (installeqs.rocket4 || 0) + (installeqs.rocket4C || 0);
	
	this.softSkinMult = 1;
	if (this.hasT3Shell) this.softSkinMult *= 2.5;
	if (MECHANICS.installRevamp) {
		if (this.numWG) this.softSkinMult *= 1.3;
		if (this.numWG >= 2) this.softSkinMult *= 1.4;
		if (numMortar) this.softSkinMult *= 1.2;
		if (numMortar >= 2) this.softSkinMult *= 1.3;
		if (numRocket4) this.softSkinMult *= 1.25;
		if (numRocket4 >= 2) this.softSkinMult *= 1.5;
		if (installeqs.DH1 || installeqs.DH2 || installeqs.TDH || installeqs.TDH11) this.softSkinMult *= 1.4;
		if (installeqs.TDH) this.softSkinMult *= 1.15;
		if (installeqs.TDH11) this.softSkinMult *= 1.8;
		if (installeqs.m4a1) this.softSkinMult *= 1.4 * 1.1;
		if (installeqs.DH2 > 0) this.softSkinMult *= 1.5;
		if (installeqs.DH2 >= 2) this.softSkinMult *= 1.3;
		if (installbonus1 > 1) this.softSkinMult *= installbonus1;
		if (installeqs.DH3) this.softSkinMult *= 1.5 * installbonus3;
		if (installeqs.DH3 >= 2) this.softSkinMult *= 1.2;
		if (installeqs.SB) this.softSkinMult *= 1.2;
	} else {
		if (installeqs.TDH11) this.softSkinMult *= 1.39;
	}
	
	this.pillboxMult = (this.type=='DD'||this.type=='CL')? 1.4 : 1;
	if (this.numWG >= 2) this.pillboxMult*=2.72;
	else if (this.numWG == 1) this.pillboxMult*=1.6;
	if (numMortar) this.pillboxMult *= 1.3;
	if (numMortar >= 2) this.pillboxMult *= 1.5;
	if (numRocket4) this.pillboxMult *= 1.5;
	if (numRocket4 >= 2) this.pillboxMult *= 1.8;
	if (MECHANICS.installRevamp) {
		if (installeqs.DH1 || installeqs.DH2 || installeqs.TDH || installeqs.TDH11) this.pillboxMult *= 1.8;
		if (installeqs.TDH) this.pillboxMult *= 1.15;
		if (installeqs.TDH11) this.pillboxMult *= 1.8;
		if (installeqs.m4a1) this.pillboxMult *= 1.4 * 2;
		if (installeqs.DH2 > 0) this.pillboxMult *= 1.5;
		if (installeqs.DH2 >= 2) this.pillboxMult *= 1.4;
		if (installbonus1 > 1) this.pillboxMult *= installbonus1;
		if (installeqs.DH3) this.pillboxMult *= 2.4 * installbonus3;
		if (installeqs.DH3 >= 2) this.pillboxMult *= 1.35;
		if (installeqs.DB >= 2) this.pillboxMult *= 2;
	} else {
		if (installeqs.DH2 >= 2) this.pillboxMult*=3*installbonus1;
		else if (installeqs.TDH11) this.pillboxMult*=2.2*installbonus1;
		else if (installeqs.DH2 == 1) this.pillboxMult*=2.15*installbonus1;
		else if (installeqs.TDH) this.pillboxMult*=2.05*installbonus1;
		else if (installeqs.DH1) this.pillboxMult*=1.8*installbonus1;
		if (installeqs.DH3 >= 2) this.pillboxMult*=3.2*installbonus3;
		else if (installeqs.DH3) this.pillboxMult*=2.4*installbonus3;
	}
	if (installeqs.AP) this.pillboxMult*=1.85;
	if (installeqs.SB) this.pillboxMult*=1.5;
	if (installeqs.DB) this.pillboxMult*=1.5;
	
	this.isoMult = 1;
	if (this.numWG >= 2) this.isoMult*=2.1;
	else if (this.numWG == 1) this.isoMult*=1.4;
	if (numMortar) this.isoMult *= 1.2;
	if (numMortar >= 2) this.isoMult *= 1.4;
	if (numRocket4) this.isoMult *= 1.3;
	if (numRocket4 >= 2) this.isoMult *= 1.65;
	if (MECHANICS.installRevamp) {
		if (installeqs.DH1 || installeqs.DH2 || installeqs.TDH || installeqs.TDH11) this.isoMult *= 1.8;
		if (installeqs.TDH) this.isoMult *= 1.15;
		if (installeqs.TDH11) this.isoMult *= 1.8;
		if (installeqs.m4a1) this.isoMult *= 1.4 * 1.8;
		if (installeqs.DH2 > 0) this.isoMult *= 1.2;
		if (installeqs.DH2 >= 2) this.isoMult *= 1.4;
		if (installbonus1 > 1) this.isoMult *= installbonus1;
		if (installeqs.DH3) this.isoMult *= 2.4 * installbonus3;
		if (installeqs.DH3 >= 2) this.isoMult *= 1.35;
		if (installeqs.DB >= 2) this.isoMult *= 1.75;
	} else {
		if (installeqs.DH2 >= 2) this.isoMult*=3*installbonus1;
		else if (installeqs.TDH11) this.isoMult*=2.2*installbonus1;
		else if (installeqs.DH2 == 1) this.isoMult*=2.15*installbonus1;
		else if (installeqs.DH1) this.isoMult*=1.8*installbonus1;
		if (installeqs.DH3) this.isoMult*=2.4*installbonus3;
	}
	if (installeqs.T3) this.isoMult*=1.75;
	if (installeqs.DB) this.isoMult *= 1.4;
	
	this.harbourSummerMult = 1;
	if (MECHANICS.installRevamp) {
		if (this.numWG) this.harbourSummerMult*=1.4;
		if (this.numWG >= 2) this.harbourSummerMult*=1.2;
		if (numRocket4) this.harbourSummerMult *= 1.25;
		if (numRocket4) this.harbourSummerMult *= 1.4;
		if (numMortar) this.harbourSummerMult *= 1.1;
		if (numMortar >= 2) this.harbourSummerMult *= 1.15;
		if (installeqs.DH1 || installeqs.DH2 || installeqs.TDH || installeqs.TDH11) this.harbourSummerMult *= 1.7;
		if (installeqs.TDH) this.harbourSummerMult *= 1.2;
		if (installeqs.TDH11) this.harbourSummerMult *= 1.8;
		if (installeqs.m4a1) this.harbourSummerMult *= 1.4 * 2;
		if (installeqs.DH2) this.harbourSummerMult *= 1.6;
		if (installeqs.DH2 >= 2) this.harbourSummerMult *= 1.5;
		if (installbonus1 > 1) this.harbourSummerMult *= installbonus1;
		if (installeqs.DH3) this.harbourSummerMult *= 2.8 * installbonus3;
		if (installeqs.DH3 >= 2) this.harbourSummerMult *= 1.5;
		if (installeqs.T3) this.harbourSummerMult *= 1.75;
		if (installeqs.AP) this.harbourSummerMult *= 1.3;
		if (installeqs.DB) this.harbourSummerMult *= 1.3;
		if (installeqs.SB) this.harbourSummerMult *= 1.3;
	} else {
		this.harbourSummerMult = this.isoMult;
	}
	
	this.northernMult = 1;
	if (this.numWG >= 2) this.northernMult*=2.1;
	else if (this.numWG == 1) this.northernMult*=1.4;
	if (installeqs.TDH) this.northernMult*=1.8;
	if (installeqs.TDH11) this.northernMult*=2.2;
	if (installeqs.T3) this.northernMult*=1.75;
	
	this.supplyPostMult = 1;
	if (MECHANICS.installRevamp) {
		if (this.numWG == 1) this.supplyPostMult*=1.25;
		if (this.numWG >= 2) this.supplyPostMult*=1.3;
		if (numRocket4) this.supplyPostMult *= 1.2;
		if (numRocket4 >= 2) this.supplyPostMult *= 1.4;
		if (numMortar) this.supplyPostMult *= 1.15;
		if (numMortar >= 2) this.supplyPostMult *= 1.2;
		if (installeqs.DH1 || installeqs.DH2 || installeqs.TDH || installeqs.TDH11) this.supplyPostMult *= 1.7 * installbonus1;
		if (installeqs.TDH) this.supplyPostMult *= 1.2;
		if (installeqs.DH2) this.supplyPostMult *= 1.3 * installbonus1;
		if (installeqs.DH2 >= 2) this.supplyPostMult *= 1.6;
		if (installeqs.m4a1) this.supplyPostMult *= 1.2;
		if (installeqs.DH3) this.supplyPostMult *= 1.7 * installbonus3;
		if (installeqs.DH3 >= 2) this.supplyPostMult *= 1.5;
	} else {
		if (this.numWG >= 2) this.supplyPostMult*=1.625;
		else if (this.numWG == 1) this.supplyPostMult*=1.25;
		if (installeqs.TDH11) this.supplyPostMult*=3.5*installbonus1;
		else if (installeqs.DH2 >= 2) this.supplyPostMult*=2.08*installbonus1;
		else if (installeqs.DH2 == 1) this.supplyPostMult*=1.3*installbonus1;
		if (installeqs.DH3 >= 2) this.supplyPostMult*=2.5*installbonus3;
		else if (installeqs.DH3 == 1) this.supplyPostMult*=1.7*installbonus3;
	}
	
	this.anchoragePostMult = 1;
	if (numMortar) this.anchoragePostMult *= 1.15;
	if (numRocket4) this.anchoragePostMult *= 1.2;
	if (this.numWG) this.anchoragePostMult *= 1.25;
	if (this.numWG >= 2) this.anchoragePostMult *= 1.3;
	if (installeqs.DH1 || installeqs.DH2 || installeqs.TDH || installeqs.TDH11) this.anchoragePostMult *= 1.45 * installbonus1;
	if (installeqs.DH2 > 0) this.anchoragePostMult *= 1.15;
	if (installeqs.DH3) this.anchoragePostMult *= 2.4 * installbonus3;
	if (installeqs.m4a1) this.anchoragePostMult *= 1.75;
	if (installeqs.T3) this.anchoragePostMult *= 1.35;
	if (installeqs.DB) this.anchoragePostMult *= 1.4;
	if (installeqs.DB >= 2) this.anchoragePostMult *= 1.5;
	
    [this.ptDmgMod, this.ptAccMod] = this.ptMod();
	
	if (this.repairs) this.repairsOrig = this.repairs.slice();
	
	if (MECHANICS.divebomberInstall && this.hasDivebomber) {
		for (let eq of this.equips) {
			if (eq.canShellInstall) {
				this.hasDivebomber = false;
				break;
			}
		}
	}
	
	this.hasTorpStat = this.TP - tpEquip > 0 && SHIPDATA[this.mid].TP > 0;
	
	if (aswPenetrate > 0) this.aswPenetrate = aswPenetrate;

	if (this.evimprove) this.evimprove = 1.5 * Math.sqrt(this.evimprove);

	if (MECHANICS.equipBonus && this.mid <= 1500){
		this.FP += this.equipmentBonusStats('houg');
		this.TP += this.equipmentBonusStats('raig');
		this.AR += this.equipmentBonusStats('souk');
        this.EV += this.equipmentBonusStats('houk');
        this.ASWBonus = this.equipmentBonusStats('tais');
	}
}
Ship.prototype.getFormation = function() {
	if (!this.fleet || !this.fleet.formation) return null;
	if (this.fleet.formation.id != 6) return this.fleet.formation;
	let threshold = Math.floor(this.fleet.ships.length/2);
	return (this.num <= threshold)? VANGUARD1 : VANGUARD2;
}

Ship.prototype.canShell = function() { return (this.HP > 0); }
Ship.prototype.canStillShell = function() { return this.canShell(); }
Ship.prototype.canNB = function() { return (this.HP/this.maxHP > .25 && !this.retreated); }
Ship.prototype.canTorp = function() { return this.hasTorpStat && (this.HP/this.maxHP > .5); }
Ship.prototype.canOpTorp = function() { return this.hasMidgetSub; }
Ship.prototype.canASW = function() { return false; }
Ship.prototype.OASWstat = 100;
Ship.prototype.canOASW = function() { return this.canASW() && (this.alwaysOASW || (this.ASW + (this.ASWBonus || 0) >= this.OASWstat && this.equiptypesB[B_SONAR] && isPlayable(this.mid))); }
Ship.prototype.canAS = function() { 
	if (this.HP/this.maxHP <= .25) return false;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].btype == B_RECON && this.planecount[i]) return true;
	}
	return false;
}
Ship.prototype.canNBAirAttack = function() { return false; }

Ship.prototype.NBtypes = function() {
	if (this._nbtypes) return this._nbtypes;
	this._nbtypes = [];
	var mguns = (this.equiptypesB[B_MAINGUN])? this.equiptypesB[B_MAINGUN] : 0;
	var sguns = (this.equiptypesB[B_SECGUN])? this.equiptypesB[B_SECGUN] : 0;
	var torps = (this.equiptypesB[B_TORPEDO])? this.equiptypesB[B_TORPEDO] : 0;
	
	if (MECHANICS.CVCI && this.canNBAirAttack()) {
		let hasFuze = this.equips.some(eq => eq.mid == 320);
		if (this.equiptypesB[B_NIGHTFIGHTER] >= 2 && this.equiptypesB[B_NIGHTBOMBER]) {
			this._nbtypes.push(61);
		}
		if ((this.equiptypesB[B_NIGHTFIGHTER] && hasFuze) || (this.equiptypesB[B_NIGHTBOMBER] && hasFuze) || (this.equiptypesB[B_NIGHTFIGHTER] && this.equiptypesB[B_NIGHTBOMBER])) {
			this._nbtypes.push(62);
		}
		if (this.equiptypesB[B_NIGHTFIGHTER]) {
			if ((this.equiptypesB[B_NIGHTFIGHTER] || 0) + (this.equiptypesB[B_NIGHTBOMBER] || 0) + (this.equiptypesB[B_NIGHTBOMBER2] || 0) >= 3) {
				this._nbtypes.push(63);
			}
		}
	}
	if (MECHANICS.destroyerNBCI && this.type == 'DD') {
		if (mguns && torps && this.hasLOSRadar) this._nbtypes.push(7);
		if (this.hasLookout && torps && this.hasLOSRadar) this._nbtypes.push(8);
	}
	if (this.hasSubRadar && this.numSpecialTorp) torps++;
	
	if (torps >= 2) this._nbtypes.push(3);  //torp cut-in
	else if (mguns >= 3) this._nbtypes.push(5); //triple gun cut-in
	else if (mguns >= 2 && sguns) this._nbtypes.push(4);  //gun cut-in
	else if (torps && mguns) this._nbtypes.push(2);  //mix cut-in
	else if (mguns+sguns >= 2) this._nbtypes.push(1);  //double attack
	return this._nbtypes;
}

Ship.prototype.NBchance = function() {
	if (this._nbchance === undefined) {
		this._nbchance = (this.isflagship)? 15 : 0;
		if (this.hasLookout) this._nbchance += 5;
		if (this.LUK >= 50) this._nbchance += Math.floor(65+Math.sqrt(this.LUK-50)+Math.sqrt(this.LVL)*.8);
		else this._nbchance += Math.floor(this.LUK+15+Math.sqrt(this.LVL)*.75);
	}
	return this._nbchance;
}

Ship.prototype.AStype = function() {
	if (this._astype) return this._astype;
	this._astype = [];
	
	if (MECHANICS.zuiunCI && this.canZuiunCI && this.equiptypesB[B_MAINGUN]) {
		let numZuiun = 0, num634 = 0;
		for (let equip of this.equips) {
			if (equip.type == SEAPLANEBOMBER && equip.nameJP.indexOf('瑞雲') != -1) numZuiun++;
			if (equip.type == DIVEBOMBER && equip.nameJP.indexOf('六三四空') != -1) num634++;
		}
		if (num634 >= 2) this._astype.push(201);
		if (numZuiun >= 2) this._astype.push(200);
    }
	
	if (MECHANICS.CVCI && this.CVshelltype && (this.mid < 1500 || this.canCVCI)) {
        let d = this.equips.filter((eq, i) => eq.type == DIVEBOMBER && this.planecount[i] > 0).length || 0;
        let t = this.equips.filter((eq, i) => eq.type == TORPBOMBER && this.planecount[i] > 0).length || 0;
        let f = this.equips.filter((eq, i) => eq.type == FIGHTER && this.planecount[i] > 0).length || 0;
		if (d >= 1 && t >= 1 && f >= 1) this._astype.push(71);
		if (d >= 2 && t >= 1) this._astype.push(72);
		if (d >= 1 && t >= 1) this._astype.push(73);
	}
	
	var mguns = this.equiptypesB[B_MAINGUN] || 0, sguns = this.equiptypesB[B_SECGUN] || 0, radars = this.equiptypesB[B_RADAR] || 0, apshells = this.equiptypesB[B_APSHELL] || 0;
	var recons = this.equiptypesB[B_RECON] || 0;
	if (recons <= 0 || mguns <= 0) return this._astype;
	
	if (mguns >= 2 && apshells) this._astype.push(6);
	if (sguns && apshells) this._astype.push(5);
	if (sguns && radars) this._astype.push(4);
	if (sguns) this._astype.push(3);
	if (mguns >= 2) this._astype.push(2); //double attack
	
	return this._astype;
}

Ship.prototype.ASchance = function(ASstate) {
	if (ASstate < 1 || !this.canAS() || !this.AStype().length) return 0;
	var fleetLOS = Math.floor(Math.sqrt(this.fleet.fleetLoS())+this.fleet.fleetLoS()*.1);
	var luckLOS = Math.floor(Math.sqrt(this.LUK)+10);
	var ASchance;
	if (ASstate == 2) ASchance = Math.floor(luckLOS + 10 + .7*(this.LOSeq*1.6 + fleetLOS));
	else ASchance = Math.floor(luckLOS + .6*(this.LOSeq*1.2 + fleetLOS));
	if (this.isflagship) ASchance += 15;
	ASchance *= .01;
	return ASchance;
}

Ship.prototype.APmod = function(target) {
	if (!target.APweak) return 1;
	switch(this.APtype) {
		case 1: return 1.08;
		case 2: return 1.1;
		case 3: case 4: return 1.15;
		default: return 1;
	}
}

Ship.prototype.APacc = function(target) {
	if (!target.APweak) return 1;
	switch(this.APtype) {
		case 1: return 1.1;
		case 2: return 1.25;
		case 3: return 1.2
		case 4: return 1.3;
		default: return 1;
	}
}

function WGpower(num) {
	switch (num) {
		case 1: return 75;
		case 2: return 110;
		case 3: return 140;
		case 4: return 160;
		default: return 0;
	}
}

Ship.prototype.shellPower = function(target,base,isSupport) {
	var bonus = (this.improves.Pshell) && (!isSupport)? Math.floor(this.improves.Pshell) : 0;
	//var shellbonus = (this.fleet && this.fleet.formation.shellbonus!==undefined)? this.fleet.formation.shellbonus : 5;
    var shellbonus = (base != null)? base+5 : 5;
	if (target && target.isInstall) {
		bonus += this.installFlat;
		let fp = (this.isSub)? this.FP + 30 : this.FP;
		switch (target.installtype) {
			case 2: //artillery imp
				if (this.pillboxMult) return fp*this.pillboxMult + shellbonus + bonus;
				break;
			case 4: //isolated island
				if (this.isoMult) return fp*this.isoMult + shellbonus + bonus;
				break;
			case 5: //northernmost
				if (this.northernMult) return fp*this.northernMult + shellbonus + bonus;
				break;
			case 6:
				if (this.harbourSummerMult) return fp*this.harbourSummerMult + shellbonus + bonus;
				break;
			case 3: //supply depot
			default: //regular soft
				if (this.softSkinMult) return fp*this.softSkinMult + shellbonus + bonus;
				break;
		}
	}
	return this.FP + shellbonus + bonus;
}

Ship.prototype.NBPower = function(target) {
	var bonus = (this.improves.Pnb)? Math.floor(this.improves.Pnb) : 0;
	if (target && target.isInstall) {
		bonus += this.installFlat;
		let fp = (this.isSub)? this.FP + 30 : this.FP;
		switch (target.installtype) {
			case 2:
				if (this.pillboxMult) return fp*this.pillboxMult + bonus;
				break;
			case 4:
				if (this.isoMult) return fp*this.isoMult + bonus;
				break;
			case 5: //northernmost
				if (this.northernMult) return fp*this.northernMult + this.TP + bonus;
				break;
			case 6:
				if (this.harbourSummerMult) return fp*this.harbourSummerMult + bonus;
				break;
			default:
				if (this.softSkinMult) return fp*this.softSkinMult + bonus;
				break;
		}
		return this.FP + bonus;
	}
	return this.FP + this.TP + bonus;
}

Ship.prototype.ASWPower = function() {
	if (this._aswpower) return this._aswpower;
	var equipASW = 0, hassonar = false, hasdc = false, hasdc2 = false;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].ASW) equipASW += this.equips[i].ASW;
		if (this.equips[i].btype == B_SONAR) hassonar = true;
		if (this.equips[i].btype == B_DEPTHCHARGE) hasdc = true;
		if (this.equips[i].btype == B_DEPTHCHARGE2) hasdc2 = true;
	}
	var bonus = (this.improves.Pasw)? Math.floor(this.improves.Pasw) : 0;
	var mod2 = 1, synergyMod = 1;
	if (MECHANICS.aswSynergy) {
		if (hassonar && hasdc2) mod2 += .15;
		if (hasdc && hasdc2) mod2 += .1;
		synergyMod = (hassonar && hasdc)? 1.15 : 1;
	}
	this._aswpower = (2*Math.sqrt(this.ASW-equipASW)+1.5*equipASW+((this.planeasw)? 8 : 13)+bonus) * synergyMod * mod2;
	return this._aswpower;
}

Ship.prototype.damageMod = function(isTorp) {
	if (isTorp) {
		if (this.HP/this.maxHP <= .25) return 0;
		if (this.HP/this.maxHP <= .5) return .8;
		return 1;
	}
	if (this.HP/this.maxHP <= .25) return .4;
	if (this.HP/this.maxHP <= .5) return .7;
	return 1;
}
Ship.prototype.weightedAntiAir = function() {
	if (this._wAA === undefined) {
		this._wAA = this.AA;
		for (var i=0; i<this.equips.length; i++) if (this.equips[i].AA) this._wAA -= this.equips[i].AA; //get base AA
		if (this.side==1) this._wAA = 2*Math.sqrt(this._wAA);
		for (var i=0; i<this.equips.length; i++) {
			var mod = 0;
			switch (this.equips[i].atype) {
				case A_HAGUN:
				case A_HAFD:
				case A_AAFD:
					mod = 4; break;
				case A_AAGUN:
					mod = 6; break;
				case A_AIRRADAR:
					mod = 3; break;
				default:
					continue;
			}
			this._wAA += this.equips[i].AA * mod;
		}
		this._wAA += (this.improves.AAself)? 2*this.improves.AAself : 0;
		if (this.fleet.combinedWith) {
			if (this.isescort) this._wAA*=.48;
            else if (this.side==0) this._wAA*=.72;
            else this._wAA*=.8;
		}
	}
	return this._wAA;
}

Ship.prototype.getAACItype = function(atypes) {
	var types = [];
	
	var concentrated = 0, hasID = {};
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isconcentrated) { concentrated++; }
		hasID[this.equips[i].mid] = hasID[this.equips[i].mid] + 1 || 1;
	}
	
	if (this.hasBuiltInFD) {  //Akizuki-class
		if (atypes[A_HAGUN] >= 2 && atypes[A_AIRRADAR]) types.push(1);
		if (atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(2);
		if (atypes[A_HAGUN] >= 2) types.push(3);
	}
	if (this.mid == 428 && concentrated && (atypes[A_HAGUN]||atypes[A_HAFD])) {   //428 = Maya Kai Ni
		if (atypes[A_AIRRADAR]) types.push(10);
		types.push(11);
	}
	if (this.mid == 141 && atypes[A_HAGUN] && atypes[A_AAGUN]) { //Isuzu Kai Ni
		if (atypes[A_AIRRADAR]) types.push(14);
		types.push(15);
	}
	if (this.mid == 470 && atypes[A_HAGUN] && atypes[A_AAGUN]) { //Kasumi Kai 2 B
		if (atypes[A_AIRRADAR]) types.push(16);
		types.push(17);
	}
	if (this.mid == 622 && atypes[A_HAGUN] && atypes[A_AAGUN] && atypes[A_AIRRADAR]) { //Yuubari Kai Ni
		types.push(16);
	}
	if (this.mid == 487 && concentrated && atypes[A_HAGUN] > (atypes[A_HAFD] || 0)) types.push(19); //Kinu Kai Ni (1)
	if (this.mid == 488 && atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(21); //Yura Kai Ni
	if ([77,82,87,88,553].indexOf(this.mid) != -1 && hasID[274] && atypes[A_AIRRADAR] && atypes[A_TYPE3SHELL]) types.push(25); //Ise-class

	if((this.sclass == 91) && hasID[308] || hasID[313]) { //Fletcher class
		if (hasID[308] >= 2) types.push(34);
		if (hasID[313] >= 1 && hasID[308] >= 1) types.push(35);
		if (hasID[313] >= 2) types.push(37);
		if (hasID[313] >= 2 && hasID[307]) types.push(36);
	}
	
	if (this.mid == 597 || this.mid == 696) { //Atlanta
		if (hasID[363] && (hasID[363] || 0) + (hasID[362] || 0) >= 2) types.push(39);
		if (hasID[307] && (hasID[363] || 0) + (hasID[362] || 0) >= 2) types.push(40);
		if ((hasID[363] || 0) + (hasID[362] || 0) >= 2) types.push(41);
	}
	
	var add6 = false;
	if (this.type=='BB'||this.type=='BBV'||this.type=='FBB') {  //is BB
		if (atypes[A_GUN] && atypes[A_TYPE3SHELL] && atypes[A_AAFD]) {
			if (atypes[A_AIRRADAR]) types.push(4);
			add6 = true;
		}
	}
	if (atypes[A_HAFD] >= 2 && atypes[A_AIRRADAR]) types.push(5);
	if (add6) types.push(6);
	if (atypes[A_HAFD] && atypes[A_AIRRADAR]) types.push(8); //changed 8 > 7 some time between 2018-04-21 - 2019-04-24, too minor for mechanic toggle
	if (atypes[A_HAGUN] && atypes[A_AAFD] && atypes[A_AIRRADAR]) types.push(7);
	
	if (this.mid == 546 && hasID[275] && atypes[A_AIRRADAR]) types.push(26); //Musashi Kai Ni
	if ([82,88,553,148,546].indexOf(this.mid) != -1 && hasID[274] && atypes[A_AIRRADAR]) types.push(28); //Ise-class + Musashi Kai
	if ((this.mid == 557 || this.mid == 558) && atypes[A_HAGUN] && atypes[A_AIRRADAR]) types.push(29); //Isokaze+Hamakaze B Kai
	
	if (atypes[A_HAGUN] && atypes[A_AAFD]) types.push(9);
	
	if(this.mid == 579 && atypes[A_HAGUN] && atypes[A_AAGUN]) types.push(33); //Gotland Kai
	
	if (concentrated && atypes[A_AAGUN] >= 2 && atypes[A_AIRRADAR]) types.push(12);
	// if (concentrated && atypes[A_HAFD] && atypes[A_AIRRADAR]) return 13;
	
	if (this.mid == 418 && concentrated) types.push(18); //Satsuki Kai Ni
	if (this.mid == 487 && concentrated) types.push(20); //Kinu Kai Ni (2)
	if (this.mid == 548 && concentrated) types.push(22); //Fumizuki Kai Ni
	if ((this.mid == 539 || this.mid == 530) && atypes[A_AAGUN] > concentrated) types.push(23); //UIT-25, I-504
	if (this.mid == 477) { //Tenryuu Kai Ni
		if (atypes[A_HAGUN] >= 3) types.push(30);
		if (atypes[A_HAGUN] >= 2) types.push(31);
	}
	if (this.mid == 478 && atypes[A_HAGUN] && atypes[A_AAGUN] > concentrated) types.push(24); //Tatsuta Kai Ni
	if ([149,150,151,152,439,364,515,393,519,394].indexOf(this.mid) != -1 && ((hasID[191] && hasID[300]) || (hasID[301] && hasID[191]) || (hasID[301] >= 2))) types.push(32); //royal navy + Kongou-class
	
	return types;
}

Ship.prototype.moraleMod = function(isTorp) {
	if (isTorp) {
		if (this.morale >= 53) return 1.3;
		if (this.morale >= 33) return 1;
		if (this.morale >= 23) return .7;
		return .35;
	}
	if (this.morale >= 53) return 1.2;
	if (this.morale >= 33) return 1;
	if (this.morale >= 23) return .8;
	return .5;
}

Ship.prototype.moraleModEv = function() {
	if (this.morale >= 53) return .7;
	if (this.morale >= 33) return 1;
	if (this.morale >= 23) return 1.2;
	return 1.4;
}

Ship.prototype.reset = function(notHP,notMorale) {
	if (!notHP) this.HP = (this.HPDefault != null)? this.HPDefault : this.maxHP;
    this.planecount = this.PLANESLOTS.slice();
	this.fuelleft = this.fuelDefault;
	this.ammoleft = this.ammoDefault;
	if (!notMorale) this.morale = this.moraleDefault;
	if (this.repairsOrig) this.repairs = this.repairsOrig.slice();
	if (this.side==0 && isPlayable(this.mid)) this.protection = true;
	if (this.retreated) this.retreated = false;
	delete this._fuelUnderway;
    delete this._ammoUnderway;
    this.setProficiencyBonus(true);
	// this._wAA = undefined;
}

Ship.prototype.airState = function() { return this.fleet.AS; }
Ship.prototype.airPower = function(jetonly,includeScout) {
	var ap = 0;
	for (var i=0; i<this.equips.length; i++) {
		if (this.planecount[i] <= 0) continue;
		if ((this.equips[i].isfighter && (!jetonly||this.equips[i].isjet)) || (includeScout && EQTDATA[this.equips[i].type].isPlane)) {
			ap += Math.floor(((this.equips[i].AA||0) + (this.equips[i].AAImprove||0)) * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
	}
	return Math.floor(ap);
}
Ship.prototype.numBombers = function () {
	var planes = [];
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].isdivebomber || this.equips[i].istorpbomber || this.equips[i].isfighter) {
			if (this.equips[i].b_image) planes.push(this.equips[i].b_image);
			else planes.push((this.fleet.id==0)? 1 : 2);
		}
	}
	return planes;
}
Ship.prototype.rocketBarrageChance = function() { return 0; }

Ship.prototype.setProficiencyBonus = function(resetFlag) {
    var planecount = 0; 
    var planeexp = 0;
    if (resetFlag){
        if (this.critratebonus) this.critratebonus = 0;
        if (this.critdmgbonus) this.critdmgbonus = 1;
        if (this.ACCplane) this.ACCplane = 0;
    }

    this.equips.forEach((eq, i) => {
		if (eq.APbonus) {
			if (!this.APbonus) this.APbonus = 0;
			this.APbonus += eq.APbonus;
		}
		if (eq.isdivebomber||eq.istorpbomber) {
			if (eq.exp > 0) {
				if (!this.critratebonus) this.critratebonus = 0;
				if (!this.critdmgbonus) this.critdmgbonus = 1;
				var mod = 0;
				if (eq.rank == 7) mod = 10;
				else if (eq.rank == 6) mod = 7;
				else if (eq.rank == 5) mod = 5;
				else if (eq.rank == 4) mod = 4;
				else if (eq.rank == 3) mod = 3;
				else if (eq.rank == 2) mod = 2;
				else if (eq.rank == 1) mod = 1;
				this.critratebonus += mod*.6; //x.75????
                this.critdmgbonus += Math.floor(Math.sqrt(eq.exp) + mod)/((i==0)? 100:200);
                planeexp += eq.exp;
            }
            planecount++;
		}
    })

    if (planecount > 0) {
		var avgexp = planeexp/planecount;
		if (avgexp >= 10) this.ACCplane = Math.sqrt(avgexp*.1);
		if (avgexp >= 100) this.ACCplane += 9;
		else if (avgexp >= 80) this.ACCplane += 6;
		else if (avgexp >= 70) this.ACCplane += 4;
		else if (avgexp >= 55) this.ACCplane += 3;
		else if (avgexp >= 40) this.ACCplane += 2;
		else if (avgexp >= 25) this.ACCplane += 1;
	}
}

Ship.prototype.removeProficiencyBonus = function(i) {
	if (i >= this.equips.length) return
	var eq = this.equips[i];

	if (eq.APbonus && this.APbonus) {
		this.APbonus -= eq.APbonus;
	}

	if ((eq.isdivebomber||eq.istorpbomber) && this.critratebonus && this.critdmgbonus && eq.exp > 0) {
		var mod = 0;
		if (eq.rank == 7) mod = 10;
		else if (eq.rank == 6) mod = 7;
		else if (eq.rank == 5) mod = 5;
		else if (eq.rank == 4) mod = 4;
		else if (eq.rank == 3) mod = 3;
		else if (eq.rank == 2) mod = 2;
		else if (eq.rank == 1) mod = 1;
		this.critratebonus -= mod*.6; //x.75????
		this.critdmgbonus -= Math.floor(Math.sqrt(eq.exp) + mod)/((i==0)? 100:200);
	}
}

Ship.prototype.equipmentBonusStats = function(apiName){
    const bonusDefs = Equip.explicitStatsBonusGears();
    this.equips.forEach(equip => Equip.accumulateShipBonusGear(bonusDefs, equip));
    return Equip.equipmentTotalStatsOnShipBonus(bonusDefs, this, apiName);
};

Ship.prototype.findOrigin = function(){
    var id = this.mid;
    while (SHIPDATA[id].prev > 0){
        id = SHIPDATA[id].prev;
    }
    return id;
};

Ship.prototype.findRemodelLvl = function(){
    var i = 0;
    var id = this.mid;
    while (SHIPDATA[id].prev > 0){
        id = SHIPDATA[id].prev;
        i++;
    }
    return i;
};

Ship.prototype.ptMod = function() {
    var dmgMod = 1; 
    var accMod = 1;
    
    let num1 = (this.equiptypes[MAINGUNS] || 0) + (this.equiptypes[MAINGUNSAA] || 0);
    let num2 = (this.equiptypes[SECGUN] || 0) + (this.equiptypes[SECGUNAA] || 0);
    let num3 = this.equiptypes[AAGUN] || 0;
    let num4 = this.equiptypes[PICKET] || 0;
    let num5 = (this.equiptypes[SEAPLANEBOMBER] || 0) + (this.equiptypes[SEAPLANEFIGHTER] || 0);
    let num6 = this.equiptypes[DIVEBOMBER] || 0;

    if (num1 >= 1) dmgMod *= 1.5;
    if (num1 >= 2) dmgMod *= 1.4;
    if (num2 >= 1) dmgMod *= 1.3;
    if (num3 >= 1) dmgMod *= 1.2;
    if (num3 >= 2) dmgMod *= 1.2;
    if (num4 >= 1) dmgMod *= 1.1;
    if (num5 >= 1) dmgMod *= 1.2;
    if (num6 >= 1) dmgMod *= 1.4;
    if (num6 >= 2) dmgMod *= 1.3;

    let cond1 = ((num1 >= 1) + (num2 + num3 >= 1) + (num4 >= 1)) >= 2;
    let cond2 = (num5 + num6) >= 1;

    if (cond1 || cond2){
        if (this.type == 'DD' || this.type == 'DE') accMod *= 1.6
        if (this.type == 'CL' || this.type == 'CLT' || this.type == 'CT') accMod *= 1.2;
        if (num1 >= 1) accMod *= 1.3;
        if (num1 >= 2) accMod *= 1.2;
        if ((num2 >= 1 && num3 >= 1) || num3 >= 2) accMod *= 1.96;
        else if (num2 >= 1 || num3 >= 1) accMod *= 1.4;
        if (num4 >= 1) {
            if (num1 >= 1 || num3 >= 1) accMod *= 1.8;
            else if (num2 >= 1) accMod *= 2.1;
            else accMod *= 1.5;
        }
        if (num5 >= 1) accMod *= 1.8;
        else if (num6 >= 1) accMod *= 1.5;
    }

    return [dmgMod, accMod];
}

//------------------

function DD(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
DD.prototype = Object.create(Ship.prototype);
DD.prototype.canASW = function() { return true; }

function CL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
}
CL.prototype = Object.create(Ship.prototype);
CL.prototype.canASW = function() { return true; }

function CLT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
}
CLT.prototype = Object.create(Ship.prototype);
CLT.prototype.canASW = function() { return true; }

function CA(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CA.prototype = Object.create(Ship.prototype);
CA.prototype.APweak = true;

function BB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
BB.prototype = Object.create(Ship.prototype);
BB.prototype.enableSecondShelling = true;
BB.prototype.APweak = true;

function FBB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	BB.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
FBB.prototype = Object.create(BB.prototype);


function CAV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.planeasw = true;
}
CAV.prototype = Object.create(Ship.prototype);
CAV.prototype.APweak = true;
CAV.prototype.canASW = function() {
	for (var i=0; i<this.equips.length; i++) {
		if (this.planecount[i] <= 0) continue;
		if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true;
	}
	return false;
}
CAV.prototype.rocketBarrageChance = function() {
	let num = 0;
	for (let equip of this.equips) {
		if (equip.canBarrage) num++;
	}
	if (num <= 0) return 0;
	let base = 48, numBonus = 40 + 30*num, classBonus = 70*(this.sclass == 2);
	return (this.weightedAntiAir() + .9*this.LUK)/(400 - (base + numBonus + classBonus));
}

function BBV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.planeasw = true;
}
BBV.prototype = Object.create(Ship.prototype);
BBV.prototype.APweak = true;
BBV.prototype.enableSecondShelling = true;
BBV.prototype.canASW = CAV.prototype.canASW;
BBV.prototype.canOASW = function() {
	if (this.mid == 554) {
		if (this.equips.find(eq => eq.mid == 326 || eq.mid == 327)) return true;
		if (this.equips.filter(eq => eq.mid == 69 || eq.mid == 324 || eq.mid == 325).length >= 2) return true;
	}
	return Ship.prototype.canOASW.call(this);
}
BBV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;

function BBVT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	BBV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
BBVT.prototype = Object.create(BBV.prototype);

function CV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CV.prototype = Object.create(Ship.prototype);
CV.prototype.canNB = function() { return (((this.nightattack && this.HP/this.maxHP > .25) || this.canNBAirAttack()) && !this.retreated); }
CV.prototype.canAS = function() {
	if (this.HP/this.maxHP <= .25) return false;
	let diveFlag = false, torpFlag = false;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].type == DIVEBOMBER && this.planecount[i]) diveFlag = true;
		if(this.equips[i].type == TORPBOMBER && this.planecount[i]) torpFlag = true;
	}
	return diveFlag && torpFlag;
}
CV.prototype.APweak = true;
CV.prototype.canShell = function() {
	if (this.HP <= 0) return false;
	for (var i=0; i<this.equips.length; i++) {
		var equip = this.equips[i];
		if ((equip.isdivebomber || equip.istorpbomber) && this.planecount[i] > 0) return true;
	}
	return false;
}
CV.prototype.canStillShell = function () {
	return (this.HP > this.maxHP*.5 && this.canShell());
}
CV.prototype.CVshelltype = true;
CV.prototype.shellPower = function(target,base,isSupport) {
	var dp = 0, tp = 0;
	let installOnly = MECHANICS.divebomberInstall && target && target.isInstall;
	for (var i=0; i<this.equips.length; i++) {
		if(this.equips[i].DIVEBOMB && (!installOnly || this.equips[i].canShellInstall)) dp += this.equips[i].DIVEBOMB;
		if(this.equips[i].TP) tp += this.equips[i].TP;
	}
	var bonus = (base||0) + 5;
	if (target && target.isInstall) tp = 0;
	var improvebonus = (this.improves.Pshell && !isSupport)? Math.floor(this.improves.Pshell) : 0;
	let fp = this.FP + bonus + improvebonus;
	if (installOnly) {
		switch (target.installtype) {
			case 2: //artillery imp
				fp = fp*this.pillboxMult + this.installFlat;
				break;
			case 4: //isolated island
				fp = fp*this.isoMult + this.installFlat;
				break;
			case 5: //northernmost
				fp = fp*this.northernMult + this.installFlat;
				break;
			case 6:
				fp = fp*this.harbourSummerMult + this.installFlat;
				break;
			case 3: //supply depot
			default: //regular soft
				fp = fp*this.softSkinMult + this.installFlat;
				break;
		}
	}
	return 25 + 1.5*(15 + fp + tp + Math.floor(1.3*dp));
}
CV.prototype.NBPower = function(target) {
	if (this.canNBAirAttack()) {
		let power = this.FP - this.equipmentBonusStats('houg');
		for (let i=0; i<this.equips.length; i++) {
			let equip = this.equips[i];
            power -= (equip.FP || 0);
            if (this.planecount[i] <= 0) continue;
			if (equip.btype != B_NIGHTFIGHTER && equip.btype != B_NIGHTBOMBER && equip.btype != B_NIGHTBOMBER2) continue;
			let mod = .3*((equip.FP || 0) + (equip.TP || 0) + (equip.ASW || 0) + (equip.DIVEBOMB || 0));
			power += (equip.FP || 0) + (equip.DIVEBOMB || 0) + Math.sqrt(equip.level || 0);
			if (!(target && target.isInstall)) power +=  (equip.TP || 0);
			if (equip.btype != B_NIGHTBOMBER2) {
				power += this.planecount[i]*3;
				mod *= 1.5;
			}
			power += mod*Math.sqrt(this.planecount[i]);
		}
		return power;
	}
	return Ship.prototype.NBPower.call(this,target);
}
CV.prototype.canNBAirAttack = function() {
	return (this.equiptypesB[B_NIGHTCREW] || this.hasBuiltInNightCrew) && this.HP/this.maxHP > .5;
}
CV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;
CV.prototype.canASW = function() {
    if (this.mid !== 646) return false;
	if (this.HP/this.maxHP <= .5) return false;
	for (var i=0; i<this.equips.length; i++) { if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true; }
	return false;
}
CV.prototype.canOASW = function() {
    if (this.mid !== 646) return false;
    return this.equips.some((eq) => eq.ASW >= 1 && [DIVEBOMBER, TORPBOMBER, AUTOGYRO, ASWPLANE].indexOf(eq.type) !== -1);
}

function CVL(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.planeasw = true;
}
CVL.prototype = Object.create(CV.prototype);
CVL.prototype.canASW = function() {
	if (this.HP/this.maxHP <= .5) return false;
	for (var i=0; i<this.equips.length; i++) { if (this.equips[i].isdivebomber || this.equips[i].istorpbomber) return true; }
	return false;
}
CVL.prototype.canOASW = function() {
    if ([380, 381, 529, 536].indexOf(this.mid) !== -1) return this.equips.some((eq) => eq.ASW >= 1 && [DIVEBOMBER, TORPBOMBER, AUTOGYRO, ASWPLANE].indexOf(eq.type) !== -1);
    
    let found = this.equips.some((eq) => eq.ASW >= 7 && [TORPBOMBER, AUTOGYRO, ASWPLANE].indexOf(eq.type) !== -1);
    if (!found) return this.ASW + (this.ASWBonus || 0) >= this.OASWstat && this.equiptypesB[B_SONAR] && isPlayable(this.mid);
    let threshold = (this.equiptypesB[B_SONAR])? 50 : 65;
    return this.ASW + (this.ASWBonus || 0) >= threshold;
}
CVL.prototype.APweak = false;

function CVB(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	CV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
CVB.prototype = Object.create(CV.prototype);
CVB.prototype.canStillShell = function() {
	return (this.HP > this.maxHP*.25 && this.canShell());
}


function SS(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
SS.prototype = Object.create(Ship.prototype);
SS.prototype.isSub = true;
SS.prototype.canShell = function() { return this.HP > 0 && (this.numWG || this.hasDH3); }
SS.prototype.canOpTorp = function() { return (this.HP > 0 && (this.LVL >= 10 || this.hasMidgetSub)); }

function SSV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	SS.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
}
SSV.prototype = Object.create(SS.prototype);

function AV(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 200;
};
AV.prototype = Object.create(Ship.prototype);
AV.prototype.canASW = CAV.prototype.canASW;
AV.prototype.rocketBarrageChance = CAV.prototype.rocketBarrageChance;

function AO(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AO.prototype = Object.create(Ship.prototype);
AO.prototype.loadEquips = function(equips,levels,profs,addstats) {
	Ship.prototype.loadEquips.call(this,equips,levels,profs,addstats);
	for (var i=0; i<equips.length; i++) {
		if (!equips[i]) continue;
		var d = EQTDATA[EQDATA[equips[i]].type];
		if (d && (d.istorpbomber||d.isdivebomber)) {
			this.planeasw = true;
			if (d.istorpbomber) {
				this.CVshelltype = true;
				this.shellPower = CV.prototype.shellPower;
				this.canShell = CV.prototype.canShell;
				this.canStillShell = CV.prototype.canStillShell;
				this.numBombers = CV.prototype.numBombers;
				break;
			}
		}
	}
}

function Installation(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	this.isInstall = true;
	BBV.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
Installation.prototype = Object.create(BBV.prototype);
//want CVshelltype=true? impossible to know ingame
Installation.prototype.shellPower = CV.prototype.shellPower;
Installation.prototype.canShell = CV.prototype.canShell;
Installation.prototype.canStillShell = CV.prototype.canStillShell;

function AS(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AS.prototype = Object.create(Ship.prototype);

function AR(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
AR.prototype = Object.create(Ship.prototype);

function CT(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
	this.fitclass = 100;
};
CT.prototype = Object.create(Ship.prototype);
CT.prototype.canASW = function() { return true; }

function LHA(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
LHA.prototype = Object.create(Ship.prototype);

function DE(id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots) {
	Ship.call(this,id,name,side,LVL,HP,FP,TP,AA,AR,EV,ASW,LOS,LUK,RNG,planeslots);
};
DE.prototype = Object.create(Ship.prototype);
DE.prototype.canASW = function() { return true; }
DE.prototype.canOASW = function() {
    if (this.ASW + (this.ASWBonus || 0) >= 60 && this.equiptypesB[B_SONAR]) return true;
    if (this.equips.reduce((acc, eq) => acc + (eq.ASW || 0), 0) >= 4) return this.ASW + (this.ASWBonus || 0) >= 75;
}



function LandBase(equips,levels,profs) {
	this.side = 0;
	this.HP = 200;
	this.AR = 0;
	this.PLANESLOTS = [18,18,18,18];
	this.planecount = this.PLANESLOTS.slice();
	this.equips = [];
	for (var i=0; i<equips.length; i++) {
		this.equips.push(new Equip(equips[i],levels[i],profs[i],true));
		this.equips[i].rankInit = profs[i];
	}
	this.AS = 0;
}
LandBase.prototype.airState = function() { return this.AS; }
LandBase.prototype.airPower = function(jetonly) {
	var ap = 0, landscoutmod = 1;
	for (var i=0; i<this.equips.length; i++) {
		if (this.equips[i].type == LANDSCOUT) {
			if (this.equips[i].ACC >= 3) landscoutmod = 1.18;
			else if (this.equips[i].ACC <= 2 && landscoutmod < 1.15) landscoutmod = 1.15;
		}
		if (EQTDATA[this.equips[i].type].isPlane && (!jetonly||this.equips[i].isjet)) {
			var base = (this.equips[i].AA||0) + (this.equips[i].AAImprove||0);
			if (this.equips[i].type == LANDBOMBER || this.equips[i].type == INTERCEPTOR) base += (this.equips[i].EV||0)*1.5;
			ap += Math.floor(base * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
	}
	return Math.floor(ap * landscoutmod);
}
LandBase.prototype.fleetAirPower = LandBase.prototype.airPower;
LandBase.prototype.airPowerDefend = function() {
	var ap = 0, mod = 1;
	for (var i=0; i<this.equips.length; i++) {
		if (EQTDATA[this.equips[i].type].isPlane) {
			var base = (this.equips[i].AA||0) + (this.equips[i].AAImprove||0);
			if (this.equips[i].type == LANDBOMBER || this.equips[i].type == INTERCEPTOR) base += (this.equips[i].EV||0) + (this.equips[i].ACC||0)*2;
			ap += Math.floor(base * Math.sqrt(this.planecount[i]) + (this.equips[i].APbonus||0));
		}
		var newmod = 1;
		if (this.equips[i].type == SEAPLANE) {
			if (this.equips[i].LOS >= 9) newmod = 1.16;
			else if (this.equips[i].LOS == 8) newmod = 1.13;
			else newmod = 1.1;
		} else if (this.equips[i].type == CARRIERSCOUT || this.equips[i].type == CARRIERSCOUT2) {
			if (this.equips[i].LOS >= 9) newmod = 1.3;
			else newmod = 1.2;
		} else if (this.equips[i].type == LANDSCOUT) {
			if (this.equips[i].ACC >= 3) newmod = 1.24;
			else if (this.equips[i].ACC <= 2) newmod = 1.18;
		}
		if (newmod > mod) mod = newmod;
	}
	return Math.floor(ap*mod);
}
LandBase.prototype.reset = function() {
	this.planecount = this.PLANESLOTS.slice();
}
LandBase.prototype.getCost = function() {
	var cost = [0,0,0,0]; //fuel, ammo, baux, emptied slots
	for (var i=0; i<this.equips.length; i++) {
		var eq = this.equips[i];
		//sortie cost
		switch(eq.type) {
			case LANDBOMBER:
			case INTERCEPTOR:
				cost[0] += Math.floor(1.5*this.PLANESLOTS[i]);
				cost[1] += Math.floor(2*this.PLANESLOTS[i]/3);
				break;
			case SEAPLANE:
			case CARRIERSCOUT:
            case CARRIERSCOUT2:
			case FLYINGBOAT:
			case LANDSCOUT:
				cost[0] += Math.floor(this.PLANESLOTS[i]);
				cost[1] += Math.floor(.75*this.PLANESLOTS[i]);
				break;
			default:
				cost[0] += Math.floor(this.PLANESLOTS[i]);
				cost[1] += Math.floor(.66*this.PLANESLOTS[i]);
		}
		//resupply cost
		cost[0] += (this.PLANESLOTS[i] - this.planecount[i])*3;
        cost[2] += (this.PLANESLOTS[i] - this.planecount[i])*5;
        cost[3] += this.planecount[i] <= 0; 
	}
	return cost;
}
LandBase.createJetLandBase = function(landbases) {
	var equips = [], planecounts = [];
	for (var i=0; i<landbases.length; i++) {
		for (var j=0; j<landbases[i].equips.length; j++) {
			if (landbases[i].equips[j].isjet) { equips.push(landbases[i].equips[j]); planecounts.push(landbases[i].planecount[j]); }
		}
	}
	var jetLBAS = new LandBase([],[],[],);
	jetLBAS.equips = equips;
	jetLBAS.planecount = planecounts;
	jetLBAS.PLANESLOTS = planecounts.slice();
	return jetLBAS;
}

var PLANEDEFAULT = new Ship(0,'PLANEDEFAULT',0, 1,1, 0,0,0,0, 0, 0,0,3, 1);
PLANEDEFAULT.CVshelltype = true;

function Equip(equipid,level,rank,forLBAS) {
	for(var key in EQDATA[equipid]) this[key] = EQDATA[equipid][key];
	this.mid = equipid;
	this.improves = {};
	if (level) this.setImprovement(level);
	if (rank) this.setProficiency(rank,forLBAS);
	
	var eq = EQDATA[equipid];
	if (EQTDATA[eq.type].isfighter && eq.AA) this.isfighter = true;
	if (EQTDATA[eq.type].isdivebomber) this.isdivebomber = true;
	if (EQTDATA[eq.type].istorpbomber) this.istorpbomber = true;
	
	if (eq.btype == null && EQTDATA[eq.type].btype) {
		this.btype = EQTDATA[eq.type].btype;
		if (this.btype == B_RADAR && this.AA >= 2) this.atype = A_AIRRADAR;
	}
	if (eq.atype == null && EQTDATA[eq.type].atype) {
		this.atype = EQTDATA[eq.type].atype;
		if (this.atype == A_HAGUN && this.AA >= 8) this.atype = A_HAFD;
		if (this.atype == A_AAGUN && this.AA >= 9) this.isconcentrated = true;
	}
}
Equip.prototype.setImprovement = function(level) {
	this.level = level;
	switch (this.type) {
		case FIGHTER:
		case SEAPLANEFIGHTER:
		case INTERCEPTOR:
			this.AAImprove = .2*level;
			break;
		case DIVEBOMBER:
            if (this.AA && this.AA >=4) this.AAImprove = .25*level;
            else this.ASImprove = .2*level;
			break;
		case LANDBOMBER:
			this.AAImprove = .5*Math.sqrt(level);
			this.ASImprove = .7*Math.sqrt(level);
			break;
		case TORPBOMBER:
            this.ASImprove = .2*level;
            this.improves.Pshell = .2*level;
            break;
		case SEAPLANEBOMBER:
			this.ASImprove = .2*level;
			break;
	}
	
	var improve = (this.improve)? this.improve : EQTDATA[this.type].improve;
	if (!improve) return;
	for (var key in improve) {
		this.improves[key] = improve[key]*Math.sqrt(level);
	}
	
	var special = null;
	if (this.type == RADARS || this.type == RADARL) {
		if (this.atype) special = IMPROVESPECIAL['AIRRADAR'];
		else special = IMPROVESPECIAL['SURFACERADAR'];
	}
	if ((this.type == MAINGUNSAA || this.type == SECGUNAA) && this.AA >= 8) special = IMPROVESPECIAL['HAFDGUN'];
	if (special) {
		for (var key in special) this.improves[key] = special[key]*Math.sqrt(level);
	}
}
Equip.prototype.setProficiency = function(rank,forLBAS) {
	if (!EQTDATA[this.type].isPlane) return;
	if (rank > 1000) {
		rank -= 1000;
		this.exp = rank;
		if (this.exp >= 100) this.rank = 7;
		else if (this.exp >= 80) this.rank = 6;
		else if (this.exp >= 70) this.rank = 5;
		else if (this.exp >= 55) this.rank = 4;
		else if (this.exp >= 40) this.rank = 3;
		else if (this.exp >= 25) this.rank = 2;
		else if (this.exp >= 10) this.rank = 1;
		else this.rank = 0;
	} else {
		this.rank = rank;
		this.exp = [0,10,25,40,55,70,80,120][rank];
	}
	this.APbonus = Math.sqrt(this.exp*.1);
	switch (this.type) {
		case FIGHTER:
		case SEAPLANEFIGHTER:
		case INTERCEPTOR:
			this.APbonus += [0,0,2,5,9,14,14,22][this.rank]; break;
		case SEAPLANEBOMBER:
			this.APbonus += [0,0,1,1,1,3,3,6][this.rank]; break;
		case TORPBOMBER:
		case DIVEBOMBER:
		case JETBOMBER:
			break;
		default:
			if (!forLBAS) this.APbonus = 0;
			break;
	}
	if (this.APbonus) this.isfighter = true;
}

Equip.explicitStatsBonusGears = function(){
    return {
        "synergyGears": {
            surfaceRadar: 0,
            surfaceRadarIds: [28, 29, 31, 32, 88, 89, 124, 141, 142, 240, 278, 279, 307, 315],
            airRadar: 0,
            airRadarIds: [27, 30, 32, 89, 106, 124, 142, 278, 279, 307, 315],
            tripleTorpedo: 0,
            tripleTorpedoIds: [13, 125, 285],
            tripleTorpedoLateModel: 0,
            tripleTorpedoLateModelIds: [285],
            tripleTorpedoOxygenLateModel: 0,
            tripleTorpedoOxygenLateModelIds: [125, 285],
            quadrupleTorpedoOxygenLateModel: 0,
            quadrupleTorpedoOxygenLateModelIds: [15, 286],
            submarineTorpedoLateModel: 0,
            submarineTorpedoLateModelIds: [213, 214, 383],
            kamikazeTwinTorpedo: 0,
            kamikazeTwinTorpedoIds: [174],
            tripleLargeGunMountK2: 0,
            tripleLargeGunMountK2Nonexist: 1,
            tripleLargeGunMountK2Ids: [290],
            twin203MediumGunMountNo2: 0,
            twin203MediumGunMountNo2Nonexist: 1,
            twin203MediumGunMountNo2Ids: [90],
            rotorcraft: 0,
            rotorcraftIds: [69, 324, 325, 326, 327],
            helicopter: 0,
            helicopterIds: [326, 327],
        },
        // Ryuusei
        "18": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": {
                    remodel: 1,
                    multiple: { "houg": 1 },
                },
                // Akagi Class Kai+
                "14": "3",
                // Taihou Class Kai
                "43": "3",
            },
            byShip: [
                {
                    // extra +1 ev for Akagi Kai Ni, Kaga K2, K2Go
                    ids: [594, 646, 698],
                    multiple: { "houk": 1 },
                },
                {
                    // extra +1 fp, +1 ev for Akagi Kai Ni E, Kaga K2E
                    ids: [599, 610],
                    multiple: { "houg": 1, "houk": 1 },
                },
            ],
        },
        // Ryuusei Kai
        "52": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": {
                    remodel: 1,
                    multiple: { "houg": 1 },
                },
                // Akagi Class Kai+
                "14": "3",
                // Taihou Class Kai
                "43": "3",
            },
            byShip: [
                {
                    // extra +1 ev for Akagi Kai Ni, Kaga K2, K2Go
                    ids: [594, 646, 698],
                    multiple: { "houk": 1 },
                },
                {
                    // extra +1 fp, +1 ev for Akagi Kai Ni E, Kaga K2E
                    ids: [599, 610],
                    multiple: { "houg": 1, "houk": 1 },
                },
            ],
        },
        // Ryuusei Kai (CarDiv 1)
        "342": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": {
                    remodel: 1,
                    multiple: { "houg": 1 },
                },
                // Akagi Class Kai+
                "14": "3",
                // Shoukaku Class Kai Ni+
                "43": {
                    remodel: 2,
                    multiple: { "houg": 1 },
                },
            },
            byShip: [
                {
                    // extra +1 fp, +1 aa, +1 ev for Akagi Kai Ni, Kaga K2, K2Go
                    ids: [594, 646, 698],
                    multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                },
                {
                    // extra +2 fp, +2 aa, +2 ev for Akagi Kai Ni E, Kaga K2E
                    ids: [599, 610],
                    multiple: { "houg": 2, "tyku": 2, "houk": 2 },
                },
            ],
        },
        // Ryuusei Kai (CarDiv 1 / Skilled)
        "343": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": {
                    remodel: 1,
                    multiple: { "houg": 2 },
                },
                // Akagi Class Kai+
                "14": "3",
                // Shoukaku Class Kai Ni+
                "43": {
                    remodel: 2,
                    multiple: { "houg": 1 },
                },
            },
            byShip: [
                {
                    // extra +1 fp, +2 aa, +1 ev for Akagi Kai Ni, Kaga K2, K2Go
                    ids: [594, 646, 698],
                    multiple: { "houg": 1, "tyku": 2, "houk": 1 },
                },
                {
                    // extra +3 fp, +3 aa, +3 ev for Akagi Kai Ni E, Kaga K2E
                    ids: [599, 610],
                    multiple: { "houg": 3, "tyku": 3, "houk": 3 },
                },
            ],
        },
        // Type 97 Torpedo Bomber (931 Air Group)
        "82": {
            count: 0,
            byClass: {
                // Taiyou Class
                // Kasugamaru ctype is 75, but she is Taiyou remodel group 0
                "76": {
                    multiple: { "tais": 1, "houk": 1 },
                },
            },
        },
        // Type 97 Torpedo Bomber (931 Air Group / Skilled)
        "302": {
            count: 0,
            byClass: {
                // Taiyou Class
                "76": {
                    multiple: { "tais": 1, "houk": 1 },
                },
            },
        },
        // Type 97 Torpedo Bomber (Tomonaga Squadron)
        "93": {
            count: 0,
            byClass: {
                // Souryuu Kai Ni
                "17": {
                    remodel: 2,
                    single: { "houg": 1 },
                },
                // Hiryuu Kai Ni
                "25": {
                    remodel: 2,
                    single: { "houg": 3 },
                },
                // Ryuujou Kai Ni
                "32": {
                    remodel: 2,
                    single: { "houg": 1 },
                },
            },
        },
        // Tenzan Model 12 (Tomonaga Squadron)
        "94": {
            count: 0,
            byClass: {
                // Souryuu Kai Ni
                "17": {
                    remodel: 2,
                    single: { "houg": 3 },
                },
                // Hiryuu Kai Ni
                "25": {
                    remodel: 2,
                    single: { "houg": 7 },
                },
                // Ryuujou Kai Ni
                "32": {
                    remodel: 2,
                    single: { "houg": 1 },
                },
            },
        },
        // Type 97 Torpedo Bomber (Murata Squadron)
        "143": {
            count: 0,
            byClass: {
                // Kaga Class
                "3": {
                    single: { "houg": 2 },
                },
                // Akagi Class
                "14": {
                    single: { "houg": 3 },
                },
                // Ryuujou Class
                "32": {
                    single: { "houg": 1 },
                },
                // Shoukaku Class
                "33": {
                    single: { "houg": 1 },
                },
            },
            byShip: [
                // extra +1 fp for Shoukaku all remodels
                {
                    origins: [110],
                    single: { "houg": 1 },
                },
            ],
        },
        // Tenzan Model 12 (Murata Squadron)
        "144": {
            count: 0,
            byClass: {
                // Kaga Class
                "3": {
                    single: { "houg": 2 },
                },
                // Akagi Class
                "14": {
                    single: { "houg": 3 },
                },
                // Ryuujou Class
                "32": {
                    single: { "houg": 1 },
                },
                // Shoukaku Class
                "33": [
                    // Base and Kai
                    {
                        single: { "houg": 1 },
                    },
                    // Kai Ni+
                    {
                        remodel: 2,
                        single: { "houg": 1 },
                    },
                ],
            },
            byShip: [
                // extra +1 fp for Shoukaku base and Kai
                {
                    ids: [110, 288],
                    single: { "houg": 1 },
                },
                // extra +2 fp for Shoukaku K2 and K2A
                {
                    ids: [461, 466],
                    single: { "houg": 2 },
                },
            ],
        },
        // Prototype Type 97 Torpedo Bomber Kai Type 3 Model E (w/ Type 6 Airborne Radar Kai)
        "344": {
            count: 0,
            byShip: [
                {
                    // Ryuuhou Kai
                    // Note: Taigei ctype is 50, but her remodel group index is 0 in Ryuuhou
                    ids: [318],
                    single: { "houg": 4, "tais": 1 },
                },
                {
                    // Zuihou Kai Ni+
                    ids: [555, 560],
                    single: { "houg": 2, "tais": 2 },
                },
                {
                    // Shouhou Kai
                    ids: [282],
                    single: { "houg": 2, "tais": 1 },
                },
                {
                    // Akagi Kai Ni E, Kaga Kai Ni E
                    ids: [599, 610],
                    single: { "houg": 3 },
                },
            ],
        },
        // Prototype Type 97 Torpedo Bomber Kai (Skilled) Type 3 Model E (w/ Type 6 Airborne Radar Kai)
        "345": {
            count: 0,
            byShip: [
                {
                    // Ryuuhou Kai
                    ids: [318],
                    single: { "houg": 5, "tais": 1, "houk": 1 },
                },
                {
                    // Zuihou Kai Ni+
                    ids: [555, 560],
                    single: { "houg": 3, "tais": 2, "houk": 2 },
                },
                {
                    // Shouhou Kai
                    ids: [282],
                    single: { "houg": 3, "tais": 1, "houk": 1 },
                },
                {
                    // Akagi Kai Ni E, Kaga Kai Ni E
                    ids: [599, 610],
                    single: { "houg": 3, "houk": 1 },
                },
            ],
        },
        // TBM-3W+3S
        "389": {
            count: 0,
            byClass: {
                // Lexington Class
                "69": {
                    multiple: { "houg": 2, "tais": 3, "houk": 1 },
                },
                // Casablanca Class
                "83": "69",
                // Essex Class
                "84": "69",
                // Yorktown Class
                "105": "69",
            },
            byShip: [
                {
                    // Akagi Kai Ni, K2E
                    ids: [594, 599],
                    multiple: { "houg": 2, "houk": 2 },
                },
                {
                    // Kaga Kai Ni, K2E
                    ids: [698, 610],
                    multiple: { "houg": 3, "houk": 2 },
                },
                {
                    // Kaga Kai Ni Go
                    ids: [646],
                    multiple: { "houg": 4, "tais": 4, "houk": 3 },
                    synergy: [
                        {
                            flags: [ "rotorcraft" ],
                            single: { "houg": 3, "tais": 6 },
                        },
                        {
                            flags: [ "helicopter" ],
                            single: { "houg": 5, "tais": 4 },
                        },
                    ],
                },
            ],
        },
        // Tenzan Model 12A Kai (with Type 6 Airborne Radar)
        "373": {
            count: 0,
            byClass: {
                // Shouhou Class
                "11": [
                    // Base
                    {
                        multiple: { "tais": 1 },
                    },
                    // Kai
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "raig": 1 },
                    },
                    // Kai Ni
                    {
                        remodel: 2,
                        multiple: { "tais": 1, "houk": 1 },
                    },
                ],
                // Chitose Class
                "15": [
                    // CVL base
                    {
                        remodel: 3,
                        multiple: { "houg": 1 },
                    },
                    // CVL Kai
                    {
                        remodel: 4,
                        multiple: { "raig": 1 },
                    },
                    // CVL Kai Ni
                    {
                        remodel: 5,
                        multiple: { "houk": 1 },
                    },
                ],
                // Hiyou Class
                "24": {
                    multiple: { "houg": 1, "raig": 1, "houk": 1 },
                },
                // Shoukaku Class
                "33": {
                    multiple: { "houg": 1, "raig": 2, "houk": 2 },
                },
                // Taihou Class
                "43": {
                    multiple: { "houg": 1, "raig": 2, "houk": 2 },
                },
                // Taigei Class
                "50": [
                    // Ryuuhou
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "raig": 1, "tais": 1 },
                    },
                    // Ryuuhou Kai
                    {
                        remodel: 2,
                        multiple: { "tais": 1, "houk": 1 },
                    },
                ],
            },
            byShip: [
                {
                    // Shoukaku, extra +1 fp
                    ids: [110, 288, 461, 466],
                    multiple: { "houg": 1 },
                },
                {
                    // Zuikaku, extra +1 ev
                    ids: [111, 112, 462, 467],
                    multiple: { "houk": 1 },
                },
                {
                    // Suzuya/Kumano CVL
                    ids: [508, 509],
                    multiple: { "houg": 1, "raig": 2, "houk": 2 },
                },
            ],
        },
        // Tenzan Model 12A Kai (Skilled / with Type 6 Airborne Radar)
        "374": {
            count: 0,
            byClass: {
                // Shouhou Class
                "11": [
                    // Base
                    {
                        multiple: { "houg": 1, "tais": 1 },
                    },
                    // Kai
                    {
                        remodel: 1,
                        multiple: { "raig": 1, "tais": 1, "houk": 1 },
                    },
                    // Kai Ni
                    {
                        remodel: 2,
                        multiple: { "tais": 1, "houk": 1 },
                    },
                ],
                // Chitose Class
                "15": [
                    // CVL base
                    {
                        remodel: 3,
                        multiple: { "houg": 1, "raig": 1  },
                    },
                    // CVL Kai
                    {
                        remodel: 4,
                        multiple: { "tais": 1 },
                    },
                    // CVL Kai Ni
                    {
                        remodel: 5,
                        multiple: { "houk": 1 },
                    },
                ],
                // Hiyou Class
                "24": {
                    multiple: { "houg": 1, "raig": 2, "houk": 2 },
                },
                // Shoukaku Class
                "33": {
                    multiple: { "houg": 2, "raig": 3, "houk": 3 },
                },
                // Taihou Class
                "43": {
                    multiple: { "houg": 2, "raig": 3, "houk": 2 },
                },
                // Taigei Class
                "50": [
                    // Ryuuhou
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "raig": 1, "tais": 2, "houk": 1 },
                    },
                    // Ryuuhou Kai
                    {
                        remodel: 2,
                        multiple: { "tais": 1, "houk": 1 },
                    },
                ],
            },
            byShip: [
                {
                    // Shoukaku, extra +1 fp
                    ids: [110, 288, 461, 466],
                    multiple: { "houg": 1 },
                },
                {
                    // Zuikaku, extra +1 ev
                    ids: [111, 112, 462, 467],
                    multiple: { "houk": 1 },
                },
                {
                    // Suzuya/Kumano CVL
                    ids: [508, 509],
                    multiple: { "houg": 1, "raig": 2, "tais": 2, "houk": 3 },
                },
            ],
        },
        // Tenzan Model 12A
        "372": {
            count: 0,
            byClass: {
                // Shouhou Class
                "11": [
                    // Base
                    {
                        multiple: { "tais": 1 },
                    },
                    // Kai Ni
                    {
                        remodel: 2,
                        multiple: { "raig": 1 },
                    },
                ],
                // Chitose Class
                "15": [
                    // CVL
                    {
                        remodel: 3,
                        multiple: { "houg": 1 },
                    },
                ],
                // Hiyou Class
                "24": {
                    multiple: { "houg": 1 },
                },
                // Shoukaku Class
                "33": {
                    multiple: { "houg": 1, "raig": 1 },
                },
                // Taihou Class
                "43": "33",
                // Taigei Class
                "50": [
                    // Ryuuhou
                    {
                        remodel: 1,
                        multiple: { "tais": 1 },
                    },
                    // Ryuuhou Kai
                    {
                        remodel: 2,
                        multiple: { "raig": 1 },
                    },
                ],
            },
            byShip: [
                {
                    // Suzuya/Kumano CVL
                    ids: [508, 509],
                    multiple: { "houg": 1 },
                },
            ],
        },
        // Ju 87C Kai Ni (w/ KMX)
        "305": {
            count: 0,
            byClass: {
                // Graf Zeppelin Class
                "63": {
                    multiple: { "houg": 1, "houk": 1 },
                },
                // Aquila Class
                "68": "63",
                // Taiyou Class
                "76": {
                    multiple: { "tais": 1, "houk": 1 },
                },
            },
            byShip: [
                // extra +2 asw, +1 ev for Shinyou
                {
                    ids: [534, 381, 536],
                    multiple: { "tais": 2, "houk": 1 },
                },
            ],
        },
        // Ju 87C Kai Ni (w/ KMX / Skilled)
        "306": {
            count: 0,
            byClass: {
                // Graf Zeppelin Class
                "63": {
                    multiple: { "houg": 1, "houk": 1 },
                },
                // Aquila Class
                "68": "63",
                // Taiyou Class
                "76": {
                    multiple: { "tais": 1, "houk": 1 },
                },
            },
            byShip: [
                // extra +2 asw, +1 ev for Shinyou
                {
                    ids: [534, 381, 536],
                    multiple: { "tais": 2, "houk": 1 },
                },
            ],
        },
        // Suisei
        "24": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 2 },
                },
            },
        },
        // Suisei Model 12A
        "57": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 2 },
                },
            },
        },
        // Suisei (601 Air Group)
        "111": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 2 },
                },
            },
        },
        // Type 99 Dive Bomber (Egusa Squadron)
        "99": {
            count: 0,
            byClass: {
                // Souryuu Kai Ni
                "17": {
                    remodel: 2,
                    single: { "houg": 4 },
                },
                // Hiryuu Kai Ni
                "25": {
                    remodel: 2,
                    single: { "houg": 1 },
                },
            },
        },
        // Suisei (Egusa Squadron)
        "100": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 4 },
                },
                // Souryuu Kai Ni
                "17": {
                    remodel: 2,
                    multiple: { "houg": 6 },
                },
                // Hiryuu Kai Ni
                "25": {
                    remodel: 2,
                    multiple: { "houg": 3 },
                },
            },
        },
        // Suisei Model 22 (634 Air Group)
        "291": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 6, "houk": 1 },
                },
                // Souryuu Kai Ni range +2
                "17": {
                    remodel: 2,
                    single: { "leng": 1 },
                },
                // Hiryuu Kai Ni range +2
                "25": "17",
            },
        },
        // Suisei Model 22 (634 Air Group / Skilled)
        "292": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 8, "tyku": 1, "houk": 2 },
                },
                // Souryuu Kai Ni range +2
                "17": {
                    remodel: 2,
                    single: { "leng": 1 },
                },
                // Hiryuu Kai Ni range +2
                "25": "17",
            },
        },
        // Suisei Model 12 (634 Air Group w/Type 3 Cluster Bombs)
        "319": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 7, "tyku": 3, "houk": 2 },
                },
            },
        },
        // Suisei Model 12 (w/Type 31 Photoelectric Fuze Bombs)
        "320": {
            count: 0,
            byShip: [
                {
                    // Ise Kai Ni +2 fp
                    ids: [553],
                    multiple: { "houg": 2 },
                },
                {
                    // Hiryuu/Souryuu K2 +3 fp
                    ids: [196, 197],
                    multiple: { "houg": 3 },
                },
                {
                    // Suzuya/Kumano CVL, Hyuuga Kai Ni +4 fp
                    ids: [508, 509, 554],
                    multiple: { "houg": 4 },
                },
            ],
        },
        // Type 96 Fighter
        "19": {
            count: 0,
            byClass: {
                // Taiyou Class
                "76": {
                    multiple: { "houg": 2, "tais": 3 },
                },
                // Kasugamaru Class
                "75": "76",
                // Houshou Class
                "27": {
                    multiple: { "houg": 2, "tyku": 2, "tais": 2, "houk": 2 },
                },
            },
            byShip: {
                // All CVL +1 aa, +1 ev
                stypes: [7],
                multiple: { "tyku": 1, "houk": 1 },
            },
        },
        // Type 96 Fighter Kai
        "228": {
            count: 0,
            byClass: {
                // Taiyou Class
                "76": {
                    multiple: { "houg": 2, "tyku": 1, "tais": 5, "houk": 1 },
                },
                // Kasugamaru Class
                "75": "76",
                // Houshou Class
                "27": {
                    multiple: { "houg": 3, "tyku": 3, "tais": 4, "houk": 4 },
                },
            },
            byShip: {
                // All CVL +1 aa, +1 ev, +2 asw
                stypes: [7],
                multiple: { "tyku": 1, "tais": 2, "houk": 1 },
            },
        },
        // Reppuu Kai (Prototype Carrier-based Model)
        "335": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": [
                    {
                        remodel: 1,
                        multiple: { "tyku": 1, "houk": 1 },
                    },
                    {
                        remodel: 2,
                        multiple: { "tyku": 1 },
                    },
                ],
                // Akagi Class Kai+
                "14": "3",
            },
        },
        // Reppuu Kai Ni
        "336": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": [
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                    },
                    {
                        remodel: 2,
                        multiple: { "tyku": 1 },
                    },
                ],
                // Akagi Class Kai+
                "14": "3",
            },
        },
        // Reppuu Kai Ni (CarDiv 1 / Skilled)
        "337": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": [
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                    },
                    {
                        remodel: 2,
                        multiple: { "houg": 1, "tyku": 1 },
                    },
                ],
                // Akagi Class Kai+
                "14": "3",
            },
        },
        // Reppuu Kai Ni Model E
        "338": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": [
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "tyku": 1, "houk": 2 },
                    },
                    {
                        remodel: 2,
                        multiple: { "tyku": 1, "houk": 1 },
                    },
                ],
                // Akagi Class Kai+
                "14": "3",
            },
            byShip: {
                // Akagi K2E, Kaga K2E +4 fp, +3 aa, +4 ev totally
                // Kaga Kai Ni Go's bonus the same with Kai Ni's
                ids: [599, 610],
                multiple: { "houg": 3, "tyku": 1, "houk": 1 },
            },
        },
        // Reppuu Kai Ni Model E (CarDiv 1 / Skilled)
        "339": {
            count: 0,
            byClass: {
                // Kaga Class Kai+
                "3": [
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "tyku": 2, "houk": 2 },
                    },
                    {
                        remodel: 2,
                        multiple: { "tyku": 1, "houk": 2 },
                    },
                ],
                // Akagi Class Kai+
                "14": "3",
            },
            byShip: {
                // Akagi K2E, Kaga K2E +6 fp, +4 aa, +5 ev totally
                // Kaga Kai Ni Go's bonus the same with Kai Ni's
                ids: [599, 610],
                multiple: { "houg": 5, "tyku": 1, "houk": 1 },
            },
        },
        // Re.2001 OR Kai
        "184": {
            count: 0,
            byClass: {
                // Aquila Class
                "68": {
                    multiple: { "houg": 1, "tyku": 2, "houk": 3 },
                },
            },
        },
        // Re.2005 Kai
        "189": {
            count: 0,
            byClass: {
                // Aquila Class
                "68": {
                    multiple: { "tyku": 1, "houk": 2 },
                },
                // Graf
                "63": "68",
            },
        },
        // Re.2001 G Kai
        "188": {
            count: 0,
            byClass: {
                // Aquila Class
                "68": {
                    multiple: { "houg": 3, "tyku": 1, "houk": 1 },
                },
            },
        },
        // Re.2001 CB Kai
        "316": {
            count: 0,
            byClass: {
                // Aquila Class
                "68": {
                    multiple: { "houg": 4, "tyku": 1, "houk": 1 },
                },
            },
        },
        // XF5U
        "375": {
            count: 0,
            byClass: {
                // Lexington Class
                "69": {
                    multiple: { "houg": 3, "tyku": 3, "tais": 3, "houk": 3 },
                },
                // Casablanca Class
                "83": "69",
                // Essex Class
                "84": "69",
                // Yorktown Class
                "105": "69",
                // Kaga Class
                "3": {
                    multiple: { "houg": 1, "tyku": 1, "tais": 1, "houk": 1 },
                },
            },
        },
        // All carrier-based improved recon planes on all ships can equip, current implemented:
        // Saiun, Type 2 Reconnaissance Aircraft, Prototype Keiun (Carrier-based Reconnaissance Model)
        "t2_9": {
            count: 0,
            starsDist: [],
            byShip: [
                {
                    // stars+2, +1 los
                    minStars: 2,
                    single: { "houg": 0, "saku": 1 },
                },
                {
                    // stars+4 extra +1 fp, accumulative +1 fp, +1 los
                    minStars: 4,
                    single: { "houg": 1 },
                },
                {
                    // stars+6 extra +1 los, accumulative +1 fp, +2 los
                    minStars: 6,
                    single: { "saku": 1 },
                },
                {
                    // stars+10 accumulative +2 fp, +3 los
                    minStars: 10,
                    single: { "houg": 1, "saku": 1 },
                },
            ],
        },
        // Type 2 Reconnaissance Aircraft
        // https://wikiwiki.jp/kancolle/%E4%BA%8C%E5%BC%8F%E8%89%A6%E4%B8%8A%E5%81%B5%E5%AF%9F%E6%A9%9F
        "61": {
            count: 0,
            starsDist: [],
            byClass: {
                // Ise Class Kai Ni, range +1 too, can be extreme long
                "2": {
                    remodel: 2,
                    single: { "houg": 3, "souk": 1, "houk": 2, "houm": 5, "leng": 1 },
                },
                "17": [
                    {
                        // Souryuu stars+1
                        minStars: 1,
                        single: { "houg": 3, "saku": 3 },
                    },
                    {
                        // Souryuu stars+8 totally +5 fp, +6 los
                        minStars: 8,
                        single: { "houg": 1, "saku": 1 },
                    },
                    {
                        // Souryuu Kai Ni acc+5, range +1
                        remodel: 2,
                        single: { "houm": 5, "leng": 1 },
                    },
                ],
                "25": [
                    {
                        // Hiryuu K2 stars+1
                        minStars: 1,
                        single: { "houg": 2, "saku": 2 },
                    },
                    {
                        // Hiryuu Kai Ni acc+5, range +1
                        remodel: 2,
                        single: { "houm": 5, "leng": 1 },
                    },
                ],
            },
            byShip: [
                {
                    // Hyuuga Kai Ni, extra +2 ar, +1 ev
                    ids: [554],
                    single: { "souk": 2, "houk": 1 },
                },
                {
                    // Suzuya/Kumano Kou K2, Zuihou K2B stars+1
                    ids: [508, 509, 560],
                    minStars: 1,
                    single: { "houg": 1, "saku": 1 },
                },
            ],
        },
        // Zuiun (634 Air Group)
        "79": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 3 },
                },
                // Fusou Class Kai Ni
                "26": {
                    remodel: 2,
                    multiple: { "houg": 2 },
                },
            },
            byShip: {
                // Ise Class Kai
                ids: [82, 88],
                multiple: { "houg": 2 },
            },
        },
        // Zuiun Model 12 (634 Air Group)
        "81": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 3 },
                },
                // Fusou Class Kai Ni
                "26": {
                    remodel: 2,
                    multiple: { "houg": 2 },
                },
            },
            byShip: {
                // Ise Class Kai
                ids: [82, 88],
                multiple: { "houg": 2 },
            },
        },
        // Zuiun (634 Air Group / Skilled)
        "237": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 4, "houk": 2 },
                },
                // Fusou Class Kai Ni
                "26": {
                    remodel: 2,
                    multiple: { "houg": 2 },
                },
            },
            byShip: {
                // Ise Class Kai
                ids: [82, 88],
                multiple: { "houg": 3, "houk": 1 },
            },
        },
        // Zuiun Kai Ni (634 Air Group)
        "322": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 5, "tyku": 2, "tais": 1, "houk": 2 },
                },
            },
        },
        // Zuiun Kai Ni (634 Air Group / Skilled)
        "323": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 6, "tyku": 3, "tais": 2, "houk": 3 },
                },
            },
        },
        // Laté 298B
        "194": {
            count: 0,
            byClass: {
                // Commandant Teste Class
                "70": {
                    multiple: { "houg": 3, "houk": 2, "saku": 2 },
                },
                // Richelieu Kai
                "79": {
                    remodel: 1,
                    multiple: { "houg": 1, "houk": 2, "saku": 2 },
                },
                // Mizuho Class
                "62": {
                    multiple: { "houk": 1, "saku": 2 },
                },
                // Kamoi Class
                "72": "62",
            },
        },
        // Swordfish (Seaplane Model)
        "367": {
            count: 0,
            byClass: {
                // Commandant Teste Class
                "70": {
                    multiple: { "houg": 1, "tais": 1, "houk": 1, "saku": 1 },
                },
                // Gotland Class
                "89": {
                    multiple: { "houg": 2, "tais": 1, "houk": 1, "saku": 1 },
                },
                // Mizuho Class
                "62": {
                    multiple: { "houg": 1, "houk": 1, "saku": 1 },
                },
                // Kamoi Class
                "72": "62",
                /* Queen Elizabeth Class, Ark Royal Class, J Class and Nelson Class (but they can not equip)
                "67": {
                    multiple: { "houg": 2, "houk": 2, "saku": 2 },
                },
                "78": "67",
                "82": "67",
                "88": "67", */
            },
        },
        // Swordfish Mk.III Kai (Seaplane Model)
        "368": {
            count: 0,
            byClass: {
                // Commandant Teste Class
                "70": {
                    multiple: { "houg": 2, "tais": 3, "houk": 1, "saku": 2 },
                },
                // Gotland Class
                "89": [
                    {
                        multiple: { "houg": 4, "tais": 3, "houk": 2, "saku": 3 },
                    },
                    {
                        // Gotland andra FP +2, TP +2, EV +1, LoS +1
                        remodel: 2,
                        single: { "houg": 2, "raig": 2, "houk": 1, "saku": 1 },
                    },
                ],
                // Mizuho Class
                "62": {
                    multiple: { "houg": 1, "tais": 2, "houk": 1, "saku": 2 },
                },
                // Kamoi Class
                "72": "62",
                /* Queen Elizabeth Class, Ark Royal Class, J Class and Nelson Class (but they can not equip)
                "67": {
                    multiple: { "houg": 2, "tais": 2, "houk": 2, "saku": 2 },
                },
                "78": "67",
                "82": "67",
                "88": "67", */
            },
        },
        // Swordfish Mk.III Kai (Seaplane Model/Skilled)
        "369": {
            count: 0,
            byClass: {
                // Commandant Teste Class
                "70": {
                    multiple: { "houg": 3, "tais": 3, "houk": 2, "saku": 3 },
                },
                // Gotland Class
                "89": [
                    {
                        multiple: { "houg": 5, "tais": 4, "houk": 4, "saku": 3 },
                    },
                    {
                        // Gotland andra FP +3, TP +3, EV +2, LoS +2
                        remodel: 2,
                        single: { "houg": 3, "raig": 3, "houk": 2, "saku": 2 },
                    },
                ],
                // Mizuho Class
                "62": {
                    multiple: { "houg": 2, "tais": 2, "houk": 1, "saku": 2 },
                },
                // Kamoi Class
                "72": "62",
                /* Queen Elizabeth Class, Ark Royal Class, J Class and Nelson Class (but they can not equip)
                "67": {
                    multiple: { "houg": 2, "tais": 2, "houk": 2, "saku": 2 },
                },
                "78": "67",
                "82": "67",
                "88": "67", */
            },
        },
        // S9 Osprey
        "304": {
            count: 0,
            byClass: {
                // Kuma Class
                "4": {
                    multiple: { "houg": 1, "tais": 1, "houk": 1 },
                },
                // Sendai Class
                "16": "4",
                // Nagara Class
                "20": "4",
                // Agano Class
                "41": "4",
                // Gotland Class
                "89": {
                    multiple: { "houg": 1, "tais": 2, "houk": 2 },
                },
            },
        },
        // Swordfish Mk.II Kai (Recon Seaplane Model)
        "370": {
            count: 0,
            byClass: {
                // Gotland Class
                "89": [
                    {
                        multiple: { "houg": 1, "tais": 3, "houk": 1, "saku": 2 },
                    },
                ],
                // Commandant Teste Class
                "70": {
                    multiple: { "houg": 1, "tais": 3, "houk": 1, "saku": 1 },
                },
                // Mizuho Class
                "62": {
                    multiple: { "houg": 1, "tais": 2, "houk": 1, "saku": 1 },
                },
                // Kamoi Class
                "72": "62",
                // Queen Elizabeth Class
                "67": [
                    {
                        multiple: { "houg": 2, "tais": 3, "houk": 2, "saku": 2 },
                    },
                    // Warspite only
                    {
                        single: { "houg": 4, "houk": 1, "saku": 1 },
                    },
                ],
                // Nelson Class
                "88": {
                    multiple: { "houg": 2, "tais": 3, "houk": 2, "saku": 2 },
                },
                /*  Ark Royal Class and J Class, but they can not equip
                "78": 88,
                "82": 88, */
            },
        },
        // Fairey Seafox Kai
        "371": {
            count: 0,
            byClass: {
                // Gotland Class
                "89": [
                    {
                        multiple: { "houg": 4, "tais": 2, "houk": 3, "saku": 6 },
                    },
                    {
                        // Gotland andra FP +2, EV +2, LoS +3
                        remodel: 2,
                        single: { "houg": 2, "houk": 2, "saku": 3 },
                    },
                ],
                // Commandant Teste Class
                "70": {
                    multiple: { "houg": 2, "tais": 1, "houk": 2, "saku": 4 },
                },
                // Richelieu Class
                "79": {
                    multiple: { "houg": 2, "houk": 1, "saku": 3 },
                },
                // Queen Elizabeth Class
                "67": {
                    multiple: { "houg": 3, "tais": 1, "houk": 2, "saku": 3 },
                },
                /*  Ark Royal Class and J Class, but they can not equip
                "78": 67,
                "82": 67, */
                // Nelson Class
                "88": [
                    {
                        multiple: { "houg": 3, "tais": 1, "houk": 2, "saku": 3 },
                    },
                    {
                        single: { "houg": 3, "houk": 2, "saku": 2 },
                    },
                ],
            },
        },
        // OS2U
        "171": {
            count: 0,
            starsDist: [],
            byClass: {
                // Following Americans: Northampton Class
                "95": [
                    {
                        minStars: 5,
                        single: { "houk": 1 },
                    },
                    {
                        minStars: 10,
                        single: { "houg": 1 },
                    },
                ],
                // Iowa Class
                "65": "95",
                // Colorado Class
                "93": "95",
                // Atlanta Class
                "99": "95",
                // South Dakota Class
                "102": "95",
                // St. Louis Class
                "106": "95",
            },
        },
        // Ka Type Observation Autogyro
        "69": {
            count: 0,
            byShip: [
                {
                    // Ise Kai Ni
                    ids: [553],
                    multiple: { "houg": 1, "tais": 1 },
                },
                {
                    // Hyuuga Kai Ni, Kaga Kai Ni Go
                    ids: [554, 646],
                    multiple: { "houg": 1, "tais": 2 },
                },
            ],
        },
        // O Type Observation Autogyro Kai
        "324": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 1, "tais": 2, "houk": 1 },
                },
            },
            byShip: [
                {
                    // Hyuuga Kai Ni, Kaga Kai Ni Go
                    ids: [554, 646],
                    multiple: { "houg": 2, "tais": 3, "houk": 1 },
                },
            ],
        },
        // O Type Observation Autogyro Kai Ni
        "325": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 1, "tais": 2, "houk": 1 },
                },
            },
            byShip: [
                {
                    // Hyuuga Kai Ni, Kaga Kai Ni Go
                    ids: [554, 646],
                    multiple: { "houg": 2, "tais": 3, "houk": 1 },
                },
            ],
        },
        // S-51J
        "326": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 1, "tais": 3, "houk": 1 },
                },
            },
            byShip: [
                {
                    // Hyuuga Kai Ni
                    ids: [554],
                    multiple: { "houg": 3, "tais": 4, "houk": 2 },
                },
                {
                    // Kaga Kai Ni Go
                    ids: [646],
                    multiple: { "houg": 3, "tais": 5, "houk": 3 },
                },
            ],
        },
        // S-51J Kai
        "327": {
            count: 0,
            byClass: {
                // Ise Class Kai Ni
                "2": {
                    remodel: 2,
                    multiple: { "houg": 2, "tais": 4, "houk": 1 },
                },
            },
            byShip: [
                {
                    // Hyuuga Kai Ni
                    ids: [554],
                    multiple: { "houg": 4, "tais": 5, "houk": 2 },
                },
                {
                    // Kaga Kai Ni Go
                    ids: [646],
                    multiple: { "houg": 5, "tais": 6, "houk": 4 },
                },
            ],
        },
        // 35.6cm Twin Gun Mount (Dazzle Camouflage)
        "104": {
            count: 0,
            byShip: [
                {
                    // all Kongou Class Kai Ni
                    ids: [149, 150, 151, 152],
                    multiple: { "houg": 1 },
                },
                {
                    // for Kongou K2 and Haruna K2
                    ids: [149, 151],
                    multiple: { "houg": 1 },
                },
                {
                    // extra +1 aa, +2 ev for Haruna K2
                    ids: [151],
                    multiple: { "tyku": 1, "houk": 2 },
                },
            ],
        },
        // 35.6cm Triple Gun Mount Kai (Dazzle Camouflage)
        "289": {
            count: 0,
            byShip: [
                {
                    // all Kongou Class Kai Ni
                    ids: [149, 150, 151, 152],
                    multiple: { "houg": 1 },
                },
                {
                    // for Kongou K2 and Haruna K2
                    ids: [149, 151],
                    multiple: { "houg": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 2 },
                    },
                },
                {
                    // extra +1 aa for Kongou K2
                    ids: [149],
                    multiple: { "tyku": 1 },
                },
                {
                    // extra +2 aa, +2 ev for Haruna K2
                    ids: [151],
                    multiple: { "tyku": 2, "houk": 2 },
                },
            ],
        },
        // 35.6cm Twin Gun Mount Kai
        "328": {
            count: 0,
            byClass: {
                "6": [
                    // Kongou Class
                    {
                        multiple: { "houg": 1, "houk": 1 },
                    },
                    // extra +1 fp for Kongou Class Kai+
                    {
                        remodel: 1,
                        multiple: { "houg": 1 },
                    },
                    // extra +1 fp, +1 tp for Kongou Class Kai Ni C
                    {
                        remodel: 3,
                        multiple: { "houg": 1, "raig": 1 },
                    },
                ],
                // Ise Class
                "2": {
                    multiple: { "houg": 1 },
                },
                // Fusou Class
                "26": "2",
            },
        },
        // 35.6cm Twin Gun Mount Kai Ni
        "329": {
            count: 0,
            byClass: {
                "6": [
                    // Kongou Class
                    {
                        multiple: { "houg": 1, "houk": 1 },
                    },
                    // extra +1 fp for Kongou Class Kai+
                    {
                        remodel: 1,
                        multiple: { "houg": 1 },
                    },
                    // extra +1 fp, +1 aa for Kongou Class Kai Ni+
                    {
                        remodel: 2,
                        multiple: { "houg": 1, "tyku": 1 },
                    },
                    // extra +1 fp, +2 tp for Kongou Class Kai Ni C
                    {
                        remodel: 3,
                        multiple: { "houg": 1, "raig": 2 },
                    },
                ],
                // Ise Class
                "2": {
                    multiple: { "houg": 1 },
                },
                // Fusou Class
                "26": "2",
            },
        },
        // 41cm Triple Gun Mount Kai Ni
        // https://wikiwiki.jp/kancolle/41cm%E4%B8%89%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C
        "290": {
            count: 0,
            byClass: {
                "2": [
                    // Ise Class Kai+
                    {
                        remodel: 1,
                        multiple: { "houg": 2, "tyku": 2, "houk": 1 },
                        synergy: {
                            flags: [ "airRadar" ],
                            single: { "tyku": 2, "houk": 3 },
                        },
                    },
                    // extra +1 fp, +3 acc for Ise Class Kai Ni
                    {
                        remodel: 2,
                        multiple: { "houg": 1, "houm": 3 },
                    },
                ],
                // Fusou Class Kai Ni
                "26": {
                    remodel: 2,
                    multiple: { "houg": 1 },
                },
            },
            byShip: {
                // extra +1 ev for Hyuuga Kai Ni
                ids: [554],
                multiple: { "houk": 1 },
            },
        },
        // 41cm Twin Gun Mount Kai Ni
        // https://wikiwiki.jp/kancolle/41cm%E9%80%A3%E8%A3%85%E7%A0%B2%E6%94%B9%E4%BA%8C
        "318": {
            count: 0,
            byClass: {
                // Ise Class Kai+
                "2": {
                    remodel: 1,
                    multiple: { "houg": 2, "tyku": 2, "houk": 2 },
                    synergy: {
                        // `distinct` means only 1 set takes effect at the same time,
                        // not stackable with 41cm Triple K2's air radar synergy
                        // see https://twitter.com/KennethWWKK/status/1098960971865894913
                        flags: [ "tripleLargeGunMountK2Nonexist", "airRadar" ],
                        distinct: { "tyku": 2, "houk": 3, "houm": 1 },
                    },
                },
                // Nagato Class Kai Ni
                "19": {
                    remodel: 2,
                    multiple: { "houg": 3, "tyku": 2, "houk": 1, "houm": 2 },
                    synergy: {
                        flags: [ "tripleLargeGunMountK2" ],
                        single: { "houg": 2, "souk": 1, "houk": 2, "houm": 1 },
                    },
                },
                // Fusou Class Kai Ni
                "26": {
                    remodel: 2,
                    multiple: { "houg": 1 },
                },
            },
            byShip: [
                {
                    // extra +3 acc for Ise Kai Ni
                    ids: [553],
                    multiple: { "houm": 3 },
                    // extra +1 ar, +2 ev when synergy with `41cm Triple Gun Mount Kai Ni`
                    synergy: {
                        flags: [ "tripleLargeGunMountK2" ],
                        single: { "souk": 1, "houk": 2 },
                    },
                },
                {
                    // extra +1 fp, +3 acc for Hyuuga Kai Ni
                    ids: [554],
                    multiple: { "houg": 1, "houm": 3 },
                    // extra +1 fp, +1 ar, +2 ev when synergy with `41cm Triple Gun Mount Kai Ni`
                    synergy: {
                        flags: [ "tripleLargeGunMountK2" ],
                        single: { "houg": 1, "souk": 1, "houk": 2 },
                    },
                },
            ],
        },
        // 16inch Mk.I Triple Gun Mount
        "298": {
            count: 0,
            byClass: {
                // Nelson Class
                "88": {
                    multiple: { "houg": 2, "souk": 1 },
                },
                // Queen Elizabeth Class
                "67": {
                    multiple: { "houg": 2, "souk": 1, "houk": -2 },
                },
                // Kongou Class Kai Ni only (K2C incapable)
                "6": {
                    remodel: 2,
                    remodelCap: 2,
                    multiple: { "houg": 1, "souk": 1, "houk": -3 },
                },
            },
        },
        // 16inch Mk.I Triple Gun Mount + AFCT Kai
        "299": {
            count: 0,
            byClass: {
                // Nelson Class
                "88": {
                    multiple: { "houg": 2, "souk": 1 },
                },
                // Queen Elizabeth Class
                "67": {
                    multiple: { "houg": 2, "souk": 1, "houk": -2 },
                },
                // Kongou Class Kai Ni only (K2C incapable)
                "6": {
                    remodel: 2,
                    remodelCap: 2,
                    multiple: { "houg": 1, "souk": 1, "houk": -3 },
                },
            },
        },
        // 16inch Mk.I Triple Gun Mount Kai + FCR Type 284
        "300": {
            count: 0,
            byClass: {
                // Nelson Class
                "88": {
                    multiple: { "houg": 2, "souk": 1 },
                },
                // Queen Elizabeth Class
                "67": {
                    multiple: { "houg": 2, "souk": 1, "houk": -2 },
                },
                // Kongou Class Kai Ni only (K2C incapable)
                "6": {
                    remodel: 2,
                    remodelCap: 2,
                    multiple: { "houg": 1, "souk": 1, "houk": -3 },
                },
            },
        },
        // 16inch Mk.I Twin Gun Mount
        "330": {
            count: 0,
            byClass: {
                // Colorado Class
                "93": {
                    multiple: { "houg": 1 },
                },
                // Nelson Kai
                "88": {
                    remodel: 1,
                    multiple: { "houg": 2 },
                },
                // Nagato Class
                "19": [
                    {
                        multiple: { "houg": 1 },
                    },
                    // Kai Ni
                    {
                        remodel: 2,
                        multiple: { "houg": 1 },
                    },
                ],
            },
        },
        // 16inch Mk.V Twin Gun Mount
        "331": {
            count: 0,
            byClass: {
                // Colorado Class
                "93": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "houk": 1 },
                    },
                ],
                // Nelson Kai
                "88": {
                    remodel: 1,
                    multiple: { "houg": 2 },
                },
                // Nagato Class
                "19": [
                    {
                        multiple: { "houg": 1 },
                    },
                    // Kai Ni
                    {
                        remodel: 2,
                        multiple: { "houg": 1 },
                    },
                ],
            },
        },
        // 16inch Mk.VIII Twin Gun Mount Kai
        "332": {
            count: 0,
            byClass: {
                // Colorado Class
                "93": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        remodel: 1,
                        multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                    },
                ],
                // Nelson Kai
                "88": {
                    remodel: 1,
                    multiple: { "houg": 2 },
                },
                // Nagato Class
                "19": [
                    {
                        multiple: { "houg": 1 },
                    },
                    // Kai Ni
                    {
                        remodel: 2,
                        multiple: { "houg": 1 },
                    },
                ],
            },
        },
        // 16inch Triple Gun Mount Mk.6
        "381": {
            count: 0,
            starsDist: [],
            byClass: {
                // Following American can equip Large Main Gun:
                // Iowa
                "65": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houg": 1 },
                    },
                ],
                // Colorado
                "93": "65",
                // South Dakota
                "102": [
                    {
                        multiple: { "houg": 2 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houg": 1 },
                    },
                ],
            },
        },
        // 16inch Triple Gun Mount Mk.6 mod.2
        "385": {
            count: 0,
            starsDist: [],
            byClass: {
                // Following American can equip Large Main Gun:
                // Iowa
                "65": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 10,
                        multiple: { "souk": 1 },
                    },
                ],
                // Colorado
                "93": [
                    {
                        multiple: { "houg": 2 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 10,
                        multiple: { "souk": 1 },
                    },
                ],
                // South Dakota
                "102": [
                    {
                        multiple: { "houg": 2, "souk": 1 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 10,
                        multiple: { "souk": 1 },
                    },
                ],
            },
            byShip: {
                // Any FBB
                stypes: [8],
                multiple: { "houg": 1 },
            },
        },
        // 16inch Triple Gun Mount Mk.6 + GFCS
        "390": {
            count: 0,
            starsDist: [],
            byClass: {
                // Following American can equip Large Main Gun:
                // Iowa
                "65": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 3,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houk": 1 },
                    },
                    {
                        minStars: 10,
                        multiple: { "souk": 1 },
                    },
                ],
                // Colorado
                "93": [
                    {
                        multiple: { "houg": 2 },
                    },
                    {
                        minStars: 3,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houk": 1 },
                    },
                    {
                        minStars: 10,
                        multiple: { "souk": 1 },
                    },
                ],
                // South Dakota
                "102": [
                    {
                        multiple: { "houg": 2, "souk": 1 },
                    },
                    {
                        minStars: 3,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 6,
                        multiple: { "houk": 1 },
                    },
                    {
                        minStars: 10,
                        multiple: { "souk": 1 },
                    },
                ],
            },
            byShip: {
                // Any FBB
                stypes: [8],
                multiple: { "houg": 1 },
            },
        },
        // 16inch Triple Rapid Fire Gun Mount Mk.16
        "386": {
            count: 0,
            starsDist: [],
            byClass: {
                // Following American can equip Medium Main Gun:
                // Colorado
                "93": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 2,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 7,
                        multiple: { "houg": 1 },
                    },
                ],
                // Northampton
                "95": "93",
                // Atlanta
                "99": "93",
                // St. Louis
                "106": "93",
            },
        },
        // 16inch Triple Rapid Fire Gun Mount Mk.16 mod.2
        "387": {
            count: 0,
            starsDist: [],
            byClass: {
                // Following American can equip Medium Main Gun:
                // Colorado
                "93": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 2,
                        multiple: { "houg": 1 },
                    },
                    {
                        minStars: 7,
                        multiple: { "houg": 1 },
                    },
                ],
                // Northampton
                "95": "93",
                // Atlanta
                "99": "93",
                // St. Louis
                "106": "93",
            },
        },
        // 14cm Twin Gun Mount
        "119": {
            count: 0,
            byClass: {
                // Yuubari Class
                "34": {
                    multiple: { "houg": 1 },
                },
                // Katori Class
                "56": "34",
                // Nisshin Class
                "90": {
                    multiple: { "houg": 2, "raig": 1 },
                },
            },
        },
        // 14cm Twin Gun Mount Kai
        "310": {
            count: 0,
            starsDist: [],
            byClass: {
                // Yuubari Class
                "34": [
                    {
                        multiple: { "houg": 2, "tyku": 1, "houk": 1 },
                    },
                    // Yuubari Kai Ni+
                    {
                        remodel: 2,
                        multiple: { "houg": 2, "tais": 1, "houk": 1 },
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 3, "raig": 2, "houk": 2 },
                        },
                    },
                    // Yuubari Kai Ni+ with stars >= 7
                    {
                        remodel: 2,
                        minStars: 7,
                        multiple: { "houg": 1, "raig": 1 },
                    },
                ],
                // Katori Class
                "56": {
                    multiple: { "houg": 2, "houk": 1 },
                },
                // Nisshin Class
                "90": {
                    multiple: { "houg": 3, "raig": 2, "tyku": 1, "houk": 1 },
                },
            },
        },
        // 20.3cm (No.2) Twin Gun Mount
        "90": {
            count: 0,
            byClass: {
                // Furutaka Class
                "7": {
                    multiple: { "houg": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 3, "raig": 2, "houk": 2 },
                    },
                },
                // Aoba Class
                "13": "7",
                // Takao Class
                "8": {
                    multiple: { "houg": 1 },
                },
                // Mogami Class
                "9": "8",
                // Myoukou Class
                "29": "8",
                // Tone Class
                "31": "8",
            },
            byShip: [
                {
                    // Aoba all remodels extra Air Radar synergy
                    origins: [61],
                    synergy: {
                        flags: [ "airRadar" ],
                        single: { "tyku": 5, "houk": 2 },
                    },
                },
                {
                    // Aoba Kai, extra +1 fp, +1 aa
                    ids: [264],
                    multiple: { "houg": 1, "tyku": 1 },
                },
                {
                    // Kinugasa Kai Ni
                    ids: [142],
                    multiple: { "houg": 2, "houk": 1 },
                },
                {
                    // Kinukasa Kai, Furutaka Kai Ni, Kako Kai Ni
                    ids: [295, 416, 417],
                    multiple: { "houg": 1 },
                },
            ],
        },
        // 20.3cm (No.3) Twin Gun Mount
        "50": {
            count: 0,
            byClass: {
                // Furutaka Class
                "7": {
                    multiple: { "houg": 1 },
                    synergy: {
                        // not stackable with No.2 gun's surface radar synergy
                        flags: [ "twin203MediumGunMountNo2Nonexist", "surfaceRadar" ],
                        distinct: { "houg": 1, "raig": 1, "houk": 1 },
                    },
                },
                // Aoba Class
                "13": "7",
                // Takao Class
                "8": {
                    multiple: { "houg": 2, "houk": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 3, "raig": 2, "houk": 2 },
                    },
                },
                // Myoukou Class
                "29": "8",
                // Mogami Class
                "9": [
                    {
                        multiple: { "houg": 2, "houk": 1 },
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 3, "raig": 2, "houk": 2 },
                        },
                    },
                    {
                        multiple: { "houg": 1 },
                        minCount: 2,
                    },
                ],
                // Tone Class
                "31": "9",
            },
        },
        // 152mm/55 Triple Rapid Fire Gun Mount
        "340": {
            count: 0,
            byClass: {
                // Duca degli Abruzzi Class
                "92": {
                    multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                },
            },
        },
        // 152mm/55 Triple Rapid Fire Gun Mount Kai
        "341": {
            count: 0,
            byClass: {
                // Duca degli Abruzzi Class
                "92": {
                    multiple: { "houg": 2, "tyku": 1, "houk": 1 },
                },
            },
        },
        // Searchlight
        "74": {
            count: 0,
            byShip: [
                {
                    // All remodels of: Akatsuki, Choukai, Kirishima, Hiei
                    origins: [34, 69, 85, 86],
                    single: { "houg": 4, "houk": -1 },
                },
                {
                    // Jintsuu
                    origins: [55],
                    single: { "houg": 8, "raig": 6, "houk": -1 },
                },
                {
                    // Akigumo
                    origins: [132],
                    multiple: { "houg": 2 },
                },
                {
                    // Yukikaze
                    origins: [20],
                    multiple: { "houg": 1, "tyku": 1 },
                },
            ],
        },
        // Type 96 150cm Searchlight
        "140": {
            count: 0,
            byShip: [
                {
                    // All remodels of: Kirishima, Hiei
                    origins: [85, 86],
                    single: { "houg": 6, "houk": -2 },
                },
                {
                    // Hiei Kai Ni C
                    ids: [592],
                    single: { "houg": 3, "raig": 3 },
                    synergy: {
                        flags: [ "kamikazeTwinTorpedo" ],
                        single: { "raig": 5 },
                    },
                },
                {
                    // Yamato, Musashi
                    origins: [131, 143],
                    single: { "houg": 4, "houk": -1 },
                },
            ],
        },
        // Bofors 15.2cm Twin Gun Mount Model 1930
        "303": {
            count: 0,
            byClass: {
                // Kuma Class
                "4": {
                    multiple: { "houg": 1, "tyku": 1 },
                },
                // Sendai Class
                "16": "4",
                // Nagara Class
                "20": "4",
                // Agano Class
                "41": "4",
                // Gotland Class
                "89": {
                    multiple: { "houg": 1, "tyku": 2, "houk": 1 },
                },
            },
        },
        // 8inch Triple Gun Mount Mk.9
        "356": {
            count: 0,
            byClass: {
                // Mogami Class
                "9": {
                    multiple: { "houg": 1 },
                },
                // Northampton Class
                "95": {
                    multiple: { "houg": 2 },
                },
            },
        },
        // 8inch Triple Gun Mount Mk.9 mod.2
        "357": {
            count: 0,
            byClass: {
                // Mogami Class
                "9": {
                    multiple: { "houg": 1 },
                },
                // Northampton Class
                "95": {
                    multiple: { "houg": 2 },
                },
            },
        },
        // 5inch Single High-angle Gun Mount Battery
        "358": {
            count: 0,
            byClass: {
                // Northampton Class
                "95": {
                    multiple: { "houg": 2, "tyku": 3, "houk": 3 },
                },
                // Following British and Americans: Queen Elizabeth Class
                "67": {
                    multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                },
                // Ark Royal Class
                "78": "67",
                // Nelson Class
                "88": "67",
                // Iowa Class
                "65": "67",
                // Lexington Class
                "69": "67",
                // Casablanca Class
                "83": "67",
                // Essex Class
                "84": "67",
                // Colorado Class
                "93": "67",
                // South Dakota Class
                "102": "67",
                // Yorktown Class
                "105": "67",
                // St. Louis Class
                "106": "67",
            },
        },
        // 6inch Twin Rapid Fire Gun Mount Mk.XXI
        "359": {
            count: 0,
            byClass: {
                // Perth Class
                "96": {
                    multiple: { "houg": 2, "tyku": 2, "houk": 1 },
                },
                // Yuubari Class
                "34": [
                    {
                        multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                    },
                    // Yuubari Kai Ni+
                    {
                        remodel: 2,
                        multiple: { "houg": 1, "tyku": 1 },
                    },
                ],
            },
        },
        // Bofors 15cm Twin Rapid Fire Gun Mount Mk.9 Model 1938
        "360": {
            count: 0,
            byClass: {
                // Agano Class
                "41": {
                    multiple: { "houg": 1, "tyku": 1 },
                },
                // Gotland Class
                "89": {
                    multiple: { "houg": 2, "tyku": 1, "houk": 1 },
                },
                // De Ryuter Class
                "98": {
                    multiple: { "houg": 2, "tyku": 2, "houk": 1 },
                },
            },
        },
        // Bofors 15cm Twin Rapid Fire Gun Mount Mk.9 Kai + Single Rapid Fire Gun Mount Mk.10 Kai Model 1938
        "361": {
            count: 0,
            byClass: {
                // Agano Class
                "41": {
                    multiple: { "houg": 1, "tyku": 1 },
                },
                // Gotland Class
                "89": {
                    multiple: { "houg": 2, "tyku": 1, "houk": 1 },
                },
                // De Ryuter Class
                "98": {
                    multiple: { "houg": 2, "tyku": 2, "houk": 1 },
                },
            },
        },
        // 5inch Twin Dual-purpose Gun Mount (Concentrated Deployment)
        "362": {
            count: 0,
            byClass: {
                // Atlanta Class
                "99": {
                    multiple: { "houg": 1, "tyku": 3, "houk": 2 },
                },
                // Colorado Class
                "93": {
                    multiple: { "tyku": 1, "houk": 1 },
                },
                // Northampton Class
                "95": "93",
                // St. Louis Class
                "106": "93",
                // Agano Class
                "41": {
                    multiple: { "tyku": -1, "houk": -2 },
                },
                // Ooyodo Class
                "52": "41",
                // De Ryuter Class
                "98": "41",
                // Katori Class
                "56": {
                    multiple: { "houg": -2, "tyku": -1, "houk": -4 },
                },
                // Gotland Class
                "89": "56",
                // Kuma Class
                "4": {
                    multiple: { "houg": -3, "tyku": -2, "houk": -6 },
                },
                // Nagara Class
                "20": "4",
                // Sendai Class
                "16": "4",
                // Tenryuu Class
                "21": {
                    multiple: { "houg": -3, "tyku": -3, "houk": -8 },
                },
                // Yuubari Class
                "34" : "21"
            },
        },
        // GFCS Mk.37 + 5inch Twin Dual-purpose Gun Mount (Concentrated Deployment)
        "363": {
            count: 0,
            byClass: {
                // Atlanta Class
                "99": {
                    multiple: { "houg": 1, "tyku": 3, "houk": 2 },
                },
                // Colorado Class
                "93": {
                    multiple: { "tyku": 1, "houk": 1 },
                },
                // Northampton Class
                "95": "93",
                // St. Louis Class
                "106": "93",
                // Agano Class
                "41": {
                    multiple: { "tyku": -1, "houk": -2 },
                },
                // Ooyodo Class
                "52": "41",
                // De Ryuter Class
                "98": "41",
                // Katori Class
                "56": {
                    multiple: { "houg": -2, "tyku": -1, "houk": -4 },
                },
                // Gotland Class
                "89": "56",
                // Kuma Class
                "4": {
                    multiple: { "houg": -3, "tyku": -2, "houk": -6 },
                },
                // Nagara Class
                "20": "4",
                // Sendai Class
                "16": "4",
                // Tenryuu Class
                "21": {
                    multiple: { "houg": -3, "tyku": -3, "houk": -8 },
                },
                // Yuubari Class
                "34" : "21"
            },
        },
        // SK Radar
        "278": {
            count: 0,
            byClass: {
                // Following American: Northampton Class
                "95": {
                    single: { "tyku": 1, "houk": 3, "saku": 1 },
                },
                // Iowa Class
                "65": "95",
                // Colorado Class
                "93": "95",
                // Atlanta Class
                "99": "95",
                // South Dakota Class
                "102": "95",
                // Yorktown Class
                "105": "95",
                // St. Louis Class
                "106": "95",
                // Following British: Queen Elizabeth Class
                "67": {
                    single: { "tyku": 1, "houk": 2 },
                },
                // Nelson Class
                "88": "67",
                // Perth Class
                "96": {
                    single: { "tyku": 1, "houk": 1 },
                },
            },
        },
        // SK + SG Radar
        "279": {
            count: 0,
            byClass: {
                // Following American: Northampton Class
                "95": {
                    single: { "houg": 2, "tyku": 2, "houk": 3, "saku": 2 },
                },
                // Iowa Class
                "65": "95",
                // Colorado Class
                "93": "95",
                // Atlanta Class
                "99": "95",
                // South Dakota Class
                "102": "95",
                // Yorktown Class
                "105": "95",
                // St. Louis Class
                "106": "95",
                // Following British: Queen Elizabeth Class
                "67": {
                    single: { "houg": 1, "tyku": 1, "houk": 2, "saku": 1 },
                },
                // Nelson Class
                "88": "67",
                // Perth Class
                "96": {
                    single: { "houg": 1, "tyku": 1, "houk": 1 },
                },
            },
        },
        // 61cm Quadruple (Oxygen) Torpedo Mount
        "15": {
            count: 0,
            byClass: {
                // Kagerou Class K2
                "30": {
                    remodel: 2,
                    excludes: [556, 557, 558, 559],
                    multiple: { "raig": 2 },
                    countCap: 2,
                },
            },
        },
        // 61cm Quintuple (Oxygen) Torpedo Mount
        "58": {
            count: 0,
            byClass: {
                // CLT types in Kuma Class
                "4": {
                    stypes: [4],
                    multiple: { "raig": 1 },
                },
                // Shimakaze Class
                "22": {
                    multiple: { "raig": 1 },
                },
                // Akizuki Class
                "54": "22",
            },
        },
        // 53cm Twin Torpedo Mount
        "174": {
            count: 0,
            byClass: {
                // Kamikaze Class
                "66": {
                    multiple: { "raig": 1, "houk": 2 },
                },
                // Kongou Class Kai Ni C
                "6": {
                    remodel: 3,
                    multiple: { "raig": 6, "houk": 3 },
                },
                // Yuubari Kai Ni+
                "34": {
                    remodel: 2,
                    multiple: { "houg": 2, "raig": 4, "houk": 4 },
                },
            },
        },
        // 53cm Bow (Oxygen) Torpedo Mount
        "67": {
            count: 0,
            byShip: {
                // -5 tp on other ship types except SS, SSV
                excludeStypes: [13, 14],
                multiple: { "raig": -5 },
            },
        },
        // Prototype 61cm Sextuple (Oxygen) Torpedo Mount
        "179": {
            count: 0,
            byClass: {
                // Akizuki Class
                "54": {
                    multiple: { "raig": 1 },
                    countCap: 2,
                },
            },
        },
        // 533mm Quintuple Torpedo Mount (Initial Model)
        "314": {
            count: 0,
            byClass: {
                // John C. Butler Class
                "87": {
                    multiple: { "houg": 1, "raig": 3 },
                },
                // Fletcher Class
                "91": "87",
            },
        },
        // 533mm Quintuple Torpedo Mount (Late Model)
        "376": {
            count: 0,
            byClass: {
                // Following Americans: John C. Butler Class
                "87": {
                    multiple: { "houg": 2, "raig": 4 },
                },
                // Fletcher Class
                "91": "87",
                // Atlanta Class
                "99": "87",
                // Jervis Class
                "82": {
                    multiple: { "houg": 1, "raig": 2 },
                },
                // Perth Class
                "96": {
                    multiple: { "houg": 1, "raig": 1 },
                },
            },
        },
        // 61cm Triple (Oxygen) Torpedo Mount Late Model
        "285": {
            count: 0,
            starsDist: [],
            byClass: {
                // Ayanami Class K2: Ayanami K2, Ushio K2
                "1": [
                    {
                        remodel: 2,
                        multiple: { "raig": 2, "houk": 1 },
                        countCap: 2,
                    },
                    {
                        // +1 fp if stars +max
                        minStars: 10,
                        remodel: 2,
                        multiple: { "houg": 1 },
                        countCap: 2,
                    },
                ],
                // Akatsuki Class K2: Akatsuki K2, Hibiki K2 (Bep)
                "5": "1",
                // Hatsuharu Class K2: Hatsuharu K2, Hatsushimo K2
                "10": "1",
                // Fubuki Class K2: Fubuki K2, Murakumo K2
                "12": "1",
            },
        },
        // 61cm Quadruple (Oxygen) Torpedo Mount Late Model
        "286": {
            count: 0,
            starsDist: [],
            byClass: {
                // Asashio Class K2
                "18": [
                    {
                        remodel: 2,
                        multiple: { "raig": 2, "houk": 1 },
                        countCap: 2,
                    },
                    {
                        // +1 fp if stars +max
                        minStars: 10,
                        remodel: 2,
                        multiple: { "houg": 1 },
                        countCap: 2,
                    },
                ],
                // Shiratsuyu Class K2
                "23": "18",
                // Yuugumo Class K2
                "38": "18",
                // Kagerou Class K2
                //  except Isokaze / Hamakaze B Kai, Urakaze / Tanikaze D Kai
                "30": [
                    {
                        remodel: 2,
                        excludes: [556, 557, 558, 559],
                        multiple: { "raig": 2, "houk": 1 },
                        countCap: 2,
                    },
                    {
                        // +1 tp if stars >= +5
                        minStars: 5,
                        remodel: 2,
                        excludes: [556, 557, 558, 559],
                        multiple: { "raig": 1 },
                        countCap: 2,
                    },
                    {
                        // +1 fp if stars +max
                        minStars: 10,
                        remodel: 2,
                        excludes: [556, 557, 558, 559],
                        multiple: { "houg": 1 },
                        countCap: 2,
                    },
                ],
            },
        },
        // 533mm Triple Torpedo Mount
        "283": {
            count: 0,
            byClass: {
                // Tashkent Class
                "81": {
                    multiple: { "houg": 1, "raig": 3, "souk": 1 },
                },
            },
            byShip: {
                // Hibiki K2 (Bep)
                ids: [147],
                multiple: { "houg": 1, "raig": 3, "souk": 1 },
            },
        },
        // Late Model 53cm Bow Torpedo Mount (8 tubes)
        "383": {
            count: 0,
            byClass: {
                // I-58 Class
                "36": {
                    multiple: { "raig": 1 },
                },
                // I-400 Class
                "44": {
                    multiple: { "raig": 2 },
                },
                // I-47 Class
                "103": {
                    multiple: { "raig": 3 },
                },
            },
            byShip: {
                // I-47 Kai
                ids: [607],
                multiple: { "raig": 1 },
            },
        },
        // Late Model Submarine Radar & Passive Radiolocator
        "384": {
            count: 0,
            byClass: {
                // I-58 Class
                "36": {
                    multiple: { "houk": 2 },
                },
                // I-400 Class
                "44": {
                    multiple: { "houk": 3 },
                },
                // I-47 Class
                "103": {
                    multiple: { "houk": 3 },
                },
            },
            byShip: [
                {
                    // I-47 Kai
                    ids: [607],
                    multiple: { "houk": 1 },
                },
                {
                    // Any ship who can equip it will get synergy +3 tp, +2 ev
                    stypes: [13, 14],
                    synergy: {
                        flags: [ "submarineTorpedoLateModel" ],
                        single: { "raig": 3, "houk": 2 },
                    },
                },
            ],
        },
        // Type D Kai Kouhyouteki
        "364": {
            count: 0,
            byShip: [
                {
                    // Yuubari K2T
                    ids: [623],
                    multiple: { "houg": 1, "raig": 4, "houk": -2 },
                },
                {
                    // Kitakami K2
                    ids: [119],
                    multiple: { "raig": 2, "houk": -2 },
                },
                {
                    // Ooi K2, Nisshin A
                    ids: [118, 586],
                    multiple: { "raig": 1, "houk": -2 },
                },
                {
                    // All other ships who can equip it
                    stypes: [4, 13, 14, 16],
                    excludes: [118, 119, 586, 623],
                    multiple: { "houg": -1, "houk": -7 },
                },
            ],
        },
        // 12cm Single Gun Mount Kai Ni
        "293": {
            count: 0,
            byClass: {
                // Mutsuki Class
                "28": {
                    multiple: { "houg": 2, "tyku": 1, "houk": 3 },
                    synergy: [
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 2, "raig": 1, "houk": 3 },
                        },
                        {
                            flags: [ "kamikazeTwinTorpedo" ],
                            byCount: {
                                gear: "kamikazeTwinTorpedo",
                                "1": { "houg": 2, "raig": 4 },
                                "2": { "houg": 3, "raig": 7 },
                                "3": { "houg": 3, "raig": 7 },
                            },
                        },
                    ],
                },
                // Kamikaze Class
                "66": "28",
                // Shimushu Class
                "74": {
                    multiple: { "houg": 1, "tyku": 1, "houk": 2 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "tais": 1, "houk": 3 },
                    },
                },
                // Etorofu Class
                "77": "74",
            },
        },
        // 12.7cm Single High-angle Gun Mount (Late Model)
        "229": {
            count: 0,
            starsDist: [],
            byClass: {
                // Mutsuki Class
                "28": {
                    minStars: 7,
                    multiple: { "houg": 1, "tyku": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 3 },
                    },
                },
                // Kamikaze Class
                "66": "28",
                // Shimushu Class
                "74": {
                    minStars: 7,
                    multiple: { "houg": 1, "tyku": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 1, "houk": 4 },
                    },
                },
                // Etorofu Class
                "77": "74",
                // Hiburi Class
                "85": "74",
                // Yuubari Kai Ni+
                "34": {
                    remodel: 2,
                    multiple: { "houg": 1, "tyku": 1 },
                    synergy: [
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "houk": 1 },
                        },
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 2, "houk": 2 },
                        },
                    ],
                },
            },
            byShip: [
                {
                    // Kinu Kai Ni
                    ids: [487],
                    minStars: 7,
                    multiple: { "houg": 2, "tyku": 2 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 3, "houk": 2 },
                    },
                },
                {
                    // Yura Kai Ni
                    ids: [488],
                    minStars: 7,
                    multiple: { "houg": 2, "tyku": 3 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 3, "houk": 2 },
                    },
                },
            ],
        },
        // 12.7cm Single High-angle Gun Mount Kai Ni
        "379": {
            count: 0,
            byClass: {
                // Mutsuki Class
                "28": {
                    multiple: { "houg": 1, "tyku": 2 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 3 },
                    },
                },
                // Kamikaze Class
                "66": "28",
                // Tenyuu Class
                "21": {
                    multiple: { "houg": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 3 },
                    },
                },
                // Yuubari Class
                "34": {
                    multiple: { "houg": 1, "tais": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 3 },
                    },
                },
                // Matsu Class
                "101": [
                    {
                        single: { "houg": 2, "tyku": 2 },
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 4, "houk": 3 },
                        },
                    },
                    // Make another object in order to compatible with mstship's `.single || .multiple` handling
                    {
                        multiple: { "houg": 1, "tyku": 2 },
                    },
                ]
            },
            byShip: [
                {
                    // All DE
                    stypes: [1],
                    multiple: { "houg": 1, "tyku": 2 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 1, "houk": 4 },
                    },
                },
                {
                    // All AV/CT
                    stypes: [16, 21],
                    multiple: { "houg": 1, "tyku": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 1, "houk": 2 },
                    },
                },
                {
                    // Synergy only for all CL/CLT
                    stypes: [3, 4],
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 1, "houk": 2 },
                    },
                },
                {
                    // All remodels of: Isuzu, Yura, Naka, Kinu
                    origins: [22, 23, 56, 113],
                    multiple: { "houg": 2, "tais": 1 },
                },
                {
                    // All remodels of: Ooi, Kitakami
                    origins: [24, 25],
                    multiple: { "houg": 2, "tais": 2 },
                },
                {
                    // Yura base, Isuzu base,Kai, Naka base,Kai, Kinu base,Kai extra +2 aa
                    ids: [23,     22, 219,        56, 224,       113, 289],
                    multiple: { "tyku": 2 },
                },
                {
                    // Yura Kai, Isuzu K2, Naka K2, Kinu K2 extra +3 aa
                    ids: [220,   141,      160,     487],
                    multiple: { "tyku": 3 },
                },
                {
                    // Yura Kai Ni extra +4 aa and synergy
                    ids: [488],
                    multiple: { "tyku": 4 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 2 },
                    },
                },
                {
                    // Ooi K2,Kitakami K2, Isuzu K2, Naka K2, Kinu K2 extra synergy
                    ids: [118, 119,        141,      160,     487],
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 1, "houk": 1 },
                    },
                },
                {
                    // Yura K2, Isuzu K2, Naka K2, Kinu K2 extra +1 asw
                    ids: [488,  141,      160,     487],
                    multiple: { "tais": 1 },
                },
                {
                    // Tenryuu K2, Tatsuta K2, Yuubari K2D extra +2 asw
                    ids: [477,     478,        624],
                    multiple: { "tais": 2 },
                },
                {
                    // Tenryuu K2, Tatsuta K2, Yuubari K2,K2D extra +2 aa
                    ids: [477,     478,        622, 624],
                    multiple: { "tyku": 2 },
                },
            ],
        },
        // 12.7cm Twin High-angle Gun Mount Kai Ni
        "380": {
            count: 0,
            byClass: {
                // Tenyuu Class
                "21": {
                    multiple: { "houg": 1 },
                },
                // Yuubari Class
                "34": {
                    multiple: { "houg": 1, "tais": 1 },
                },
                // Matsu Class
                "101": [
                    {
                        single: { "houg": 2, "tyku": 2 },
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 4, "houk": 3 },
                        },
                    },
                    // Make another object in order to compatible with mstship's `.single || .multiple` handling
                    {
                        multiple: { "houg": 1, "tyku": 2 },
                    },
                ],
            },
            byShip: [
                {
                    // All AV/CT
                    stypes: [16, 21],
                    multiple: { "houg": 1, "tyku": 2 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 1 },
                    },
                },
                {
                    // Synergy only for all CL/CLT
                    stypes: [3, 4],
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 2, "houk": 1 },
                    },
                },
                {
                    // All remodels of: Isuzu, Yura, Naka, Kinu
                    origins: [22, 23, 56, 113],
                    multiple: { "houg": 2, "tais": 1 },
                },
                {
                    // All remodels of: Ooi, Kitakami
                    origins: [24, 25],
                    multiple: { "houg": 3, "tyku": 2 },
                },
                {
                    // Yura base, Isuzu base,Kai, Naka base,Kai, Kinu base,Kai extra +2 aa
                    ids: [23,     22, 219,        56, 224,       113, 289],
                    multiple: { "tyku": 2 },
                },
                {
                    // Yura Kai, Isuzu K2, Naka K2, Kinu K2 extra +3 aa
                    ids: [220,   141,      160,     487],
                    multiple: { "tyku": 3 },
                },
                {
                    // Yura Kai Ni extra +4 aa
                    ids: [488],
                    multiple: { "tyku": 4 },
                },
                {
                    // Ooi K2,Kitakami K2, Isuzu K2, Naka K2, Kinu K2, Yura K2 extra synergy
                    ids: [118, 119,        141,      160,     487,     488],
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 1, "houk": 2 },
                    },
                },
                {
                    // Yura K2, Isuzu K2, Naka K2, Kinu K2 extra +1 asw
                    ids: [488,  141,      160,     487],
                    multiple: { "tais": 1 },
                },
                {
                    // Tenryuu K2, Tatsuta K2, Yuubari K2D extra +2 asw
                    ids: [477,     478,        624],
                    multiple: { "tais": 2 },
                },
                {
                    // Tenryuu K2, Tatsuta K2, Yuubari K2,K2D extra +2 aa
                    ids: [477,     478,        622, 624],
                    multiple: { "tyku": 2 },
                },
            ],
        },
        // 12cm Single High-angle Gun Mount Model E
        "382": {
            count: 0,
            byClass: {
                // Mutsuki Class
                "28": {
                    multiple: { "tyku": 2, "houk": 1 },
                    synergy: [
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "houk": 2 },
                        },
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 2, "houk": 2 },
                        },
                    ],
                },
                // Kamikaze Class
                "66": "28",
                // Matsu Class
                "101": "28",
            },
            byShip: [
                {
                    // All DE
                    stypes: [1],
                    multiple: { "tais": 1, "tyku": 2, "houk": 2 },
                    synergy: [
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 2, "houk": 3 },
                        },
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 2, "houk": 3 },
                        },
                    ],
                },
                {
                    // All remodels of: Yura, Naka, Kinu
                    origins: [23, 56, 113],
                    multiple: { "tyku": 1 },
                },
                {
                    // Yura Kai, Naka Kai, Kinu Kai
                    ids: [220, 224, 289],
                    multiple: { "houk": 1 },
                },
                {
                    // Yura Kai Ni, Naka Kai Ni, Kinu Kai Ni
                    ids: [488, 160, 487],
                    multiple: { "houk": 1 },
                    synergy: [
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "houk": 1 },
                        },
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 2, "houk": 2 },
                        },
                    ],
                },
            ],
        },
        // 130mm B-13 Twin Gun Mount
        "282": {
            count: 0,
            byClass: {
                // Tashkent Class
                "81": {
                    multiple: { "houg": 2, "souk": 1 },
                },
                // Yuubari Class
                "34": "81",
            },
            byShip: {
                // Hibiki K2 (Bep)
                ids: [147],
                multiple: { "houg": 2, "souk": 1 },
            },
        },
        // 12.7cm Twin Gun Mount Model A
        "297": {
            count: 0,
            byClass: {
                // Fubuki Class
                "12": {
                    multiple: { "houk": 2 },
                },
                // Ayanami Class
                "1": {
                    multiple: { "houk": 1 },
                },
                // Akatsuki Class
                "5": "1",
            },
        },
        // 12.7cm Twin Gun Mount Model A Kai Ni
        "294": {
            count: 0,
            byClass: {
                // Ayanami Class
                "1": {
                    multiple: { "houg": 1 },
                    synergy: [
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 3, "raig": 1, "houk": 2 },
                        },
                        {
                            flags: [ "tripleTorpedo" ],
                            byCount: {
                                gear: "tripleTorpedo",
                                "1": { "houg": 1, "raig": 3 },
                                "2": { "houg": 2, "raig": 5 },
                                "3": { "houg": 2, "raig": 5 },
                            },
                        },
                        {
                            flags: [ "tripleTorpedoLateModel" ],
                            single: { "raig": 1 },
                        },
                    ],
                },
                // Akatsuki Class
                "5": "1",
                // Fubuki Class
                "12": "1",
            },
        },
        // 12.7cm Twin Gun Mount Model B Kai Ni
        "63": {
            count: 0,
            byClass: {
                // Ayanami Class
                "1": {
                    multiple: { "tyku": 1 },
                },
                // Akatsuki Class
                "5": "1",
                // Hatsuharu Class
                "10": "1",
            },
            byShip: [
                {
                    // Yuudachi K2
                    ids: [144],
                    multiple: { "houg": 1, "raig": 1, "tyku": 1, "houk": 2 },
                },
                {
                    // Shigure K2, Shikinami K2
                    ids: [145, 627],
                    multiple: { "houg": 1 },
                },
                {
                    // Shiratsuyu Kai+, Murasame K2
                    ids: [242, 497, 498],
                    multiple: { "houk": 1 },
                },
                {
                    // Kawakaze K2
                    ids: [469],
                    multiple: { "houk": 2 },
                },
            ],
        },
        // 12.7cm Twin Gun Mount Model C Kai Ni
        "266": {
            count: 0,
            byClass: {
                // Asashio Class
                "18": {
                    multiple: { "houg": 1 },
                    synergy: {
                        flags: [ "surfaceRadar" ],
                        single: { "houg": 1, "raig": 3, "houk": 1 },
                    },
                },
                // Shiratsuyu Class
                "23": "18",
                // Kagerou Class
                "30": [
                    {
                        multiple: { "houg": 1 },
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 2, "raig": 3, "houk": 1 },
                        },
                    },
                    {
                        remodel: 2,
                        excludes: [556, 557, 558, 559],
                        // Kagerou Class K2 total +2 fp til 2 guns
                        multiple: { "houg": 1 },
                        countCap: 2,
                    },
                    {
                        remodel: 2,
                        excludes: [556, 557, 558, 559],
                        // Kagerou Class K2 total +5 instead of +4 if guns = 2
                        // https://wikiwiki.jp/kancolle/%E9%99%BD%E7%82%8E%E6%94%B9%E4%BA%8C
                        single: { "houg": 1 },
                        minCount: 2,
                    },
                ],
            },
            byShip: {
                // Yukikaze Kai, Shigure K2, Isokaze B Kai, extra +1 ev
                ids: [145, 228, 557],
                multiple: { "houk": 1 },
            },
        },
        // 12.7cm Twin Gun Mount Model D Kai Ni
        // https://wikiwiki.jp/kancolle/12.7cm%E9%80%A3%E8%A3%85%E7%A0%B2D%E5%9E%8B%E6%94%B9%E4%BA%8C
        "267": {
            count: 0,
            byClass: {
                // Shimakaze Class
                "22": [
                    {
                        multiple: { "houg": 2, "houk": 1 },
                    },
                    {
                        // Shimakaze Kai, total +3 fp, +3 tp, +3 ev
                        remodel: 1,
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "raig": 3, "houk": 2 },
                        },
                    },
                ],
                // Yuugumo Class
                "38": [
                    {
                        multiple: { "houg": 2, "houk": 1 },
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 2, "raig": 3, "houk": 1 },
                        },
                    },
                    {
                        // Yuugumo Class K2, total +3 for each gun
                        remodel: 2,
                        multiple: { "houg": 1 },
                        // total +6 fp, +4 tp, +4 ev
                        synergy: {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "raig": 1, "houk": 2 },
                        },
                    },
                ],
                // Kagerou Class
                "30": [
                    {
                        multiple: { "houg": 1, "houk": 1 },
                    },
                    {
                        // Kagerou Class K2, total +2 for 1st gun
                        remodel: 2,
                        excludes: [556, 557, 558, 559],
                        single: { "houg": 1 },
                    },
                ],
            },
        },
        // 12.7cm Twin Gun Mount Model D Kai 3
        "366": {
            count: 0,
            byClass: {
                // Shimakaze Class
                "22": [
                    {
                        multiple: { "houg": 2, "houk": 1 },
                    },
                    {
                        // Shimakaze Kai
                        remodel: 1,
                        synergy: [
                            {
                                flags: [ "surfaceRadar" ],
                                single: { "houg": 2, "raig": 4, "houk": 2 },
                            },
                            {
                                flags: [ "airRadar" ],
                                single: { "houg": 1, "tyku": 5, "houk": 2 },
                            },
                        ],
                    },
                    {
                        // Shimakaze Kai, one-time +3 AA
                        remodel: 1,
                        single: { "tyku": 3 },
                    },
                    {
                        // Shimakaze Kai, one-time +5 AA for 2 guns
                        remodel: 1,
                        single: { "tyku": 2 },
                        minCount: 2,
                    },
                ],
                // Yuugumo Class
                "38": [
                    {
                        multiple: { "houg": 2, "houk": 1 },
                    },
                    {
                        // Yuugumo Class K2
                        remodel: 2,
                        multiple: { "houg": 1 },
                        synergy: [
                            {
                                flags: [ "surfaceRadar" ],
                                single: { "houg": 2, "raig": 4, "houk": 2 },
                            },
                            {
                                flags: [ "airRadar" ],
                                single: { "houg": 1, "tyku": 5, "houk": 2 },
                            },
                        ],
                    },
                    {
                        // Yuugumo Class K2, one-time +3 AA
                        remodel: 2,
                        single: { "tyku": 3 },
                    },
                    {
                        // Yuugumo Class K2, one-time +5 AA for 2 guns
                        remodel: 2,
                        single: { "tyku": 2 },
                        minCount: 2,
                    },
                ],
                // Kagerou Class
                "30": [
                    {
                        multiple: { "houg": 1, "houk": 1 },
                    },
                    {
                        // Kagerou Class K2, +1 FP, +2 AA for one or two gun(s)
                        remodel: 2,
                        excludes: [556, 557, 558, 559],
                        multiple: { "houg": 1, "tyku": 2 },
                        countCap: 2,
                    },
                ],
            },
        },
        // 12.7cm Twin Gun Mount Model A Kai 3 + AAFD
        "295": {
            count: 0,
            byClass: {
                // Ayanami Class
                "1": {
                    multiple: { "houg": 2, "tyku": 2 },
                    synergy: [
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 6 },
                        },
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 3, "raig": 1, "houk": 2 },
                        },
                        {
                            flags: [ "tripleTorpedo" ],
                            byCount: {
                                gear: "tripleTorpedo",
                                "1": { "houg": 1, "raig": 3 },
                                "2": { "houg": 2, "raig": 5 },
                                "3": { "houg": 2, "raig": 5 },
                            },
                        },
                        {
                            flags: [ "tripleTorpedoLateModel" ],
                            single: { "raig": 1 },
                        },
                    ],
                },
                // Akatsuki Class
                "5": "1",
                // Fubuki Class
                "12": "1",
            },
        },
        // 12.7cm Twin Gun Mount Model B Kai 4 + AAFD
        "296": {
            count: 0,
            byClass: {
                // Ayanami Class
                "1": {
                    multiple: { "houg": 1 },
                    synergy: [
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 5 },
                        },
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "raig": 2, "houk": 2 },
                        },
                        {
                            flags: [ "tripleTorpedoOxygenLateModel" ],
                            single: { "houg": 1, "raig": 3 },
                        },
                    ],
                },
                // Akatsuki Class
                "5": "1",
                // Shiratsuyu Class
                "23": {
                    multiple: { "houg": 1, "houk": 1 },
                    synergy: [
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 6 },
                        },
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "raig": 3, "houk": 2 },
                        },
                        {
                            flags: [ "quadrupleTorpedoOxygenLateModel" ],
                            single: { "houg": 1, "raig": 3 },
                        },
                    ],
                },
                // Hatsuharu Class
                "10": {
                    multiple: { "houg": 1, "houk": 1 },
                    synergy: [
                        {
                            flags: [ "airRadar" ],
                            single: { "tyku": 5 },
                        },
                        {
                            flags: [ "surfaceRadar" ],
                            single: { "houg": 1, "raig": 2, "houk": 2 },
                        },
                        {
                            flags: [ "tripleTorpedoOxygenLateModel" ],
                            single: { "houg": 1, "raig": 3 },
                        },
                    ],
                },
            },
            byShip: [
                {
                    // Shiratsuyu K2
                    ids: [497],
                    multiple: { "houg": 1, "houk": 2 },
                },
                {
                    // Yuudachi K2
                    ids: [144],
                    multiple: { "houg": 1, "raig": 1, "houk": 1 },
                },
                {
                    // Shigure K2
                    ids: [145],
                    multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                },
                {
                    // Murasame K2
                    ids: [498],
                    multiple: { "tyku": 1, "houk": 2 },
                },
                {
                    // Kawakaze/Umikaze K2
                    ids: [469, 587],
                    multiple: { "houk": 2 },
                },
                {
                    // Shikinami K2
                    ids: [627],
                    multiple: { "houg": 2, "raig": 1},
                },
            ],
        },
        // 5inch Single Gun Mount Mk.30 Kai
        "313": {
            count: 0,
            byClass: {
                // John C. Butler Class
                "87": {
                    multiple: { "houg": 2, "tyku": 2, "souk": 1, "houk": 1 },
                },
                // Fletcher Class
                "91": "87",
            },
        },
        // 5inch Single Gun Mount Mk.30 Kai + GFCS Mk.37
        "308": {
            count: 0,
            byClass: {
                // John C. Butler Class, totally +2 fp from DD stype
                "87": {
                    multiple: { "houg": 1, "tyku": 1, "houk": 1 },
                },
                // Fletcher Class
                "91": "87",
                // St. Louis Class
                "106": "87",
            },
            byShip: [
                {
                    // All DE
                    stypes: [1],
                    multiple: { "tyku": 1, "houk": 1 },
                },
                {
                    // All DD
                    stypes: [2],
                    multiple: { "houg": 1 },
                },
            ],
        },
        // GFCS Mk.37
        "307": {
            count: 0,
            byClass: {
                // Following Americans: Iowa Class
                "65": {
                    single: { "houg": 1, "tyku": 1, "houk": 1 },
                },
                // Lexington Class
                "69": "65",
                // Casablanca Class
                "83": "65",
                // Essex Class
                "84": "65",
                // John C. Butler Class
                "87": "65",
                // Fletcher Class
                "91": "65",
                // Colorado Class
                "93": "65",
                // Northampton Class
                "95": "65",
                // Atlanta Class
                "99": "65",
                // South Dakota Class
                "102": "65",
                // Yorktown Class
                "105": "65",
                // St. Louis Class
                "106": "65",
            },
        },
        // SG Radar (Initial Model)
        "315": {
            count: 0,
            byClass: {
                // Following Americans: Iowa Class
                "65": {
                    single: { "houg": 2, "houk": 3, "saku": 4 },
                },
                // Lexington Class
                "69": "65",
                // Casablanca Class
                "83": "65",
                // Essex Class
                "84": "65",
                // Colorado Class
                "93": "65",
                // Northampton Class
                "95": "65",
                // Atlanta Class
                "99": "65",
                // South Dakota Class
                "102": "65",
                // Yorktown Class
                "105": "65",
                // St. Louis Class
                "106": "65",
                // John C. Butler Class, range from medium to long
                "87": {
                    single: { "houg": 3, "houk": 3, "saku": 4, "leng": 1 },
                },
                // Fletcher Class
                "91": "87",
            },
        },
        // Type 13 Air Radar Kai
        "106": {
            count: 0,
            byShip: [
                {
                    // Ushio K2, Shigure K2, Hatsushimo K2,   Haruna K2, Nagato K2
                    ids: [407,   145,        419,             151,       541],
                    multiple: { "houg": 1, "tyku": 2, "houk": 3, "souk": 1 },
                },
                {
                    /*
                    // Isokaze,          Hamakaze,      Asashimo, Kasumi,            Yukikaze, Suzutsuki, Yahagi
                    ids: [167, 320, 557, 170, 312, 558, 425, 344, 49, 253, 464, 470, 20, 228,  532, 537,  139, 307],
                    */
                    // All remodels of: Isokaze, Hamakaze, Asashimo, Kasumi, Yukikaze, Suzutsuki, Yahagi
                    origins: [167, 170, 425, 49, 20, 532, 139],
                    multiple: { "tyku": 2, "houk": 2, "souk": 1 },
                },
                {
                    /*
                    // Hibiki,          Ooyodo,   Kashima
                    ids: [35, 235, 147, 183, 321, 465, 356],
                    */
                    // All remodels of: Hibiki, Ooyodo, Kashima
                    origins: [35, 183, 465],
                    multiple: { "tyku": 1, "houk": 3, "souk": 1 },
                },
            ],
        },
        // Type 1 Armor-Piercing Shell Kai
        "365": {
            count: 0,
            byClass: {
                // Ise Class Kai+
                "2": {
                    remodel: 1,
                    multiple: { "houg": 1 },
                },
                // Kongou Class Kai+
                "6": [
                    {
                        remodel: 1,
                        multiple: { "houg": 1 },
                    },
                    {
                        // Extra +2 fp for Kongou Class Kai Ni C
                        remodel: 3,
                        multiple: { "houg": 2 },
                    },
                ],
                // Nagato Class
                "19": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        remodel: 2,
                        multiple: { "houg": 1 },
                    },
                ],
                // Fusou Class
                "26": {
                    multiple: { "houg": 1 },
                },
                // Yamato Class
                "37": [
                    {
                        multiple: { "houg": 1 },
                    },
                    {
                        remodel: 1,
                        multiple: { "houg": 1 },
                    },
                ],
            },
        },
        // Type 3 Shell
        "35": {
            count: 0,
            byClass: {
                "6":
                    {
                        // Kongou Class Kai Ni C
                        remodel: 3,
                        multiple: { "houg": 1, "tyku": 1 },
                    },
            },
            byShip: [
                {
                    // Kongou K2 +1 fp, +1 aa
                    ids: [149],
                    single: { "houg": 1, "tyku": 1 },
                },
                {
                    // Hiei K2 +1 aa
                    ids: [150],
                    single: { "tyku": 1 },
                },
                {
                    // Haruna K2 +1 aa, +1 ev
                    ids: [151],
                    single: { "tyku": 1, "houk": 1 },
                },
                {
                    // Kirishima K2 +1 fp
                    ids: [152],
                    single: { "houg": 1 },
                },
            ],
        },
        // Type 3 Shell Kai
        "317": {
            count: 0,
            byClass: {
                "6": [
                    {
                        // Kongou Class +1 fp, +1 aa
                        single: { "houg": 1, "tyku": 1 },
                    },
                    {
                        // Kongou Class K2C totally +3 fp, +3 aa
                        single: { "houg": 2, "tyku": 2 },
                    },
                ],
                // Nagato Class Kai Ni +1 fp, +2 aa
                "19": {
                    remodel: 2,
                    single: { "houg": 1, "tyku": 2 },
                },
            },
            byShip: [
                {
                    // Kongou K2 totally +3 fp, +3 aa
                    ids: [149],
                    single: { "houg": 2, "tyku": 2 },
                },
                {
                    // Hiei K2 totally +2 fp, +2 aa
                    ids: [150],
                    single: { "houg": 1, "tyku": 1 },
                },
                {
                    // Haruna K2 totally +2 fp, +2 aa, +1 ev
                    ids: [151],
                    single: { "houg": 1, "tyku": 1, "houk": 1 },
                },
                {
                    // Kirishima K2 totally +3 fp, +2 aa
                    ids: [152],
                    single: { "houg": 2, "tyku": 1 },
                },
                {
                    // Mutsu Kai Ni totally +2 fp, +2 aa, +1 ev
                    ids: [573],
                    single: { "houg": 1, "houk": 1 },
                },
            ],
        },
        // 20-tube 7inch UP Rocket Launchers
        "301": {
            count: 0,
            byClass: {
                // Queen Elizabeth Class
                "67": {
                    multiple: { "souk": 1, "tyku": 2, "houk": 1 },
                },
                // Ark Royal Class
                "78": "67",
                // Jervis Class
                "82": "67",
                // Nelson Class
                "88": "67",
            },
        },
        // Type 3 Active Sonar
        "47": {
            count: 0,
            byShip: [
                {
                    /*
                    // Kamikaze,    Harukaze, Shigure,      Yamakaze, Maikaze,  Asashimo
                    ids: [471, 476, 473, 363, 43, 243, 145, 457, 369, 122, 294, 425, 344],
                    */
                    // All remodels of: Kamikaze, Harukaze, Shigure, Yamakaze, Maikaze, Asashimo
                    origins: [471, 473, 43, 457, 122, 425],
                    multiple: { "houg": 1, "houk": 2, "tais": 3 },
                },
                {
                    /*
                    // Ushio,           Ikazuchi,Yamagumo, Isokaze,       Hamakaze,      Kishinami
                    ids: [16, 233, 407, 36, 236, 414, 328, 167, 320, 557, 170, 312, 558, 527, 686],
                    */
                    // All remodels of: Ushio, Ikazuchi, Yamagumo, Isokaze, Hamakaze, Kishinami
                    origins: [16, 36, 414, 167, 170, 527],
                    multiple: { "houk": 2, "tais": 2 },
                },
            ],
        },
        // Type 4 Passive Sonar
        "149": {
            count: 0,
            byShip: [
                {
                    // Yuubari K2/T, Isuzu K2, Naka K2, Yura K2
                    ids: [622, 623,  141,      160,     488],
                    single: { "houk": 3, "tais": 1 },
                },
                {
                    // Yuubari K2D
                    ids: [624],
                    single: { "houk": 5, "tais": 3 },
                },
            ],
            byClass: {
                // Akizuki Class
                "54": {
                    single: { "houk": 2, "tais": 1 },
                },
            },
        },
        // Type 3 Depth Charge Projector (Concentrated Deployment)
        "287": {
            count: 0,
            byShip: [
                {
                    // Yuubari K2D, Isuzu K2, Naka K2, Yura K2
                    ids: [624,      141,      160,     488],
                    multiple: { "houk": 1, "tais": 1 },
                },
            ],
        },
        // Prototype 15cm 9-tube ASW Rocket Launcher
        "288": {
            count: 0,
            byShip: [
                {
                    // Isuzu K2, Naka K2, Yura K2
                    ids: [141,   160,     488],
                    multiple: { "houk": 1, "tais": 2 },
                },
                {
                    // Yuubari K2D
                    ids: [624],
                    multiple: { "houk": 2, "tais": 3 },
                },
            ],
        },
        // RUR-4A Weapon Alpha Kai
        "377": {
            count: 0,
            byClass: {
                // Following Americans: John C. Butler Class
                "87": {
                    single: { "houk": 1, "tais": 2 },
                },
                // Fletcher Class
                "91": "87",
                // Atlanta Class
                "99": "87",
                // St. Louis Class
                "106": "87",
                // Jervis Class
                "82": {
                    single: { "houk": 1, "tais": 1 },
                },
                // Perth Class
                "96": "87"
            },
            byShip: [
                {
                    // Fletcher Mk.II, extra +1 ASW, +1 EV
                    ids: [629],
                    single: { "houk": 2, "tais": 1 },
                },
            ],
        },
        // Lightweight ASW Torpedo (Initial Test Model)
        "378": {
            count: 0,
            byClass: {
                // Following Americans: John C. Butler Class
                "87": {
                    single: { "houk": 1, "tais": 3 },
                },
                // Fletcher Class
                "91": "87",
                // Atlanta Class
                "99": "87",
                // St. Louis Class
                "106": "87",
                // Jervis Class
                "82": {
                    single: { "houk": 1, "tais": 2 },
                },
                // Perth Class
                "96": {
                    single: { "houk": 1, "tais": 1 },
                },
            },
            byShip: [
                {
                    // Fletcher Mk.II, extra +1 ASW, +1 EV
                    ids: [629],
                    single: { "houk": 1, "tais": 1 },
                },
            ],
        },
        // Arctic Camouflage
        "268": {
            count: 0,
            byShip: {
                // Tama K / K2, Kiso K / K2
                ids: [146, 216, 217, 547],
                single: { "souk": 2, "houk": 7 },
            },
        },
        // New Kanhon Design Anti-torpedo Bulge (Large)
        "204": {
            count: 0,
            starsDist: [],
            byClass: {
                // Kongou Class Kai Ni C
                "6": [
                    {
                        remodel: 3,
                        single: { "raig": 1, "souk": 1 },
                    },
                    {
                        remodel: 3,
                        minStars: 7,
                        single: { "souk": 1 },
                    },
                    {
                        remodel: 3,
                        minStars: 10,
                        single: { "raig": 1 },
                    },
                ],
            },
        },
        // New Model High Temperature High Pressure Boiler
        "87": {
            count: 0,
            starsDist: [],
            byClass: {
                // Kongou Class Kai Ni C
                "6": [
                    {
                        remodel: 3,
                        single: { "raig": 1, "houk": 1 },
                    },
                    {
                        remodel: 3,
                        minStars: 6,
                        single: { "houk": 1 },
                    },
                    {
                        remodel: 3,
                        minStars: 8,
                        single: { "raig": 1 },
                    },
                    {
                        remodel: 3,
                        minStars: 10,
                        single: { "houg": 1 },
                    },
                ],
            },
        },
        // Skilled Lookouts
        "129": {
            count: 0,
            byClass: {
                // All IJN DD fp +1, tp +2, asw +2, ev +2, los +1
                // Ayanami Class
                "1": {
                    multiple: { "houg": 1, "raig": 2, "tais": 2, "houk": 2, "saku": 1 },
                },
                // Akatsuki Class
                "5": "1",
                // Hatsuharu Class
                "10": "1",
                // Fubuki Class
                "12": "1",
                // Asashio Class
                "18": "1",
                // Shimakaze Class
                "22": "1",
                // Shiratsuyu Class
                "23": "1",
                // Mutsuki Class
                "28": "1",
                // Kagerou Class
                "30": "1",
                // Yuugumo Class
                "38": "1",
                // Akizuki Class
                "54": "1",
                // Kamikaze Class
                "66": "1",
                // Matsu Class
                "101": "1",
                // All IJN CL fp +1, tp +2, ev +2, los +3
                // Kuma Class
                "4": {
                    multiple: { "houg": 1, "raig": 2, "houk": 2, "saku": 3 },
                },
                // Sendai Class
                "16": "4",
                // Nagara Class
                "20": "4",
                // Tenryuu Class
                "21": "4",
                // Yuubari Class
                "34": "4",
                // Agano Class
                "41": "4",
                // Ooyodo Class
                "52": "4",
                // Katori Class
                "56": "4",
                // All IJN CA fp +1, ev +2, los +3
                // Furutaka Class
                "7": {
                    multiple: { "houg": 1, "raig": 2, "houk": 2, "saku": 3 },
                },
                // Takao Class
                "8": "7",
                // Mogami Class
                "9": "7",
                // Aoba Class
                "13": "7",
                // Myoukou Class
                "29": "7",
                // Tone Class
                "31": "7"
            },
        },
        // All Radars
        "t3_11": {
            count: 0,
            byShip: [
                {
                    // Okinami K2 with Air Radar fp +1, aa +2, ev +3
                    // btw1, main.js also counted Surface Radar for her at the same time, but no bouns assigned at all.
                    // btw2, main.js's function `get_type3_nums` refers `api_type[2]` in fact, not our 't3'(`api_type[3]`), so it uses `12 || 13` for all radars.
                    ids: [569],
                    synergy: {
                        flags: [ "airRadar" ],
                        single: { "houg": 1, "tyku": 2, "houk": 3 },
                    },
                },
            ],
        },
    };
};

Equip.accumulateShipBonusGear = function(bonusGears, equip){
    const synergyGears = bonusGears.synergyGears;
    if(synergyGears) {
        if(synergyGears.tripleTorpedoIds.includes(equip.mid)) synergyGears.tripleTorpedo += 1;
        if(synergyGears.tripleTorpedoLateModelIds.includes(equip.mid)) synergyGears.tripleTorpedoLateModel += 1;
        if(synergyGears.tripleTorpedoOxygenLateModelIds.includes(equip.mid)) synergyGears.tripleTorpedoOxygenLateModel += 1;
        if(synergyGears.quadrupleTorpedoOxygenLateModelIds.includes(equip.mid)) synergyGears.quadrupleTorpedoOxygenLateModel += 1;
        if(synergyGears.submarineTorpedoLateModelIds.includes(equip.mid)) synergyGears.submarineTorpedoLateModel += 1;
        if(synergyGears.kamikazeTwinTorpedoIds.includes(equip.mid)) synergyGears.kamikazeTwinTorpedo += 1;
        if(synergyGears.tripleLargeGunMountK2Ids.includes(equip.mid)) {
            synergyGears.tripleLargeGunMountK2 += 1;
            synergyGears.tripleLargeGunMountK2Nonexist = 0;
        }
        if(synergyGears.twin203MediumGunMountNo2Ids.includes(equip.mid)) {
            synergyGears.twin203MediumGunMountNo2 += 1;
            synergyGears.twin203MediumGunMountNo2Nonexist = 0;
        }
        if(equip.type === AUTOGYRO) synergyGears.rotorcraft += 1;
        if(synergyGears.helicopterIds.includes(equip.mid)) synergyGears.helicopter += 1;
        if(equip.btype == B_RADAR && equip.LOS >= 5) synergyGears.surfaceRadar += 1;
        if(equip.atype == A_AIRRADAR) synergyGears.airRadar += 1;
    }
    const addupStarsDistribution = (bonusDefs) => {
        if(Array.isArray(bonusDefs.starsDist)) {
            bonusDefs.starsDist[equip.level || 0] = 1 + (bonusDefs.starsDist[equip.level || 0] || 0);
        }
    };
    const bonusDefs = bonusGears[equip.mid];
    if(bonusDefs) {
        if(bonusDefs.count >= 0) bonusDefs.count += 1;
        addupStarsDistribution(bonusDefs);
    }
    const type2Key = "t2_" + equip.type;
    const type3Key = "t3_" + EQTDATA[equip.type].image;
    if(bonusGears[type2Key]) {
        const bonusDefs = bonusGears[type2Key];
        if(bonusDefs.count >= 0) bonusDefs.count += 1;
        addupStarsDistribution(bonusDefs);
    }
    if(bonusGears[type3Key]) {
        const bonusDefs = bonusGears[type3Key];
        if(bonusDefs.count >= 0) bonusDefs.count += 1;
        addupStarsDistribution(bonusDefs);
    }
};

Equip.equipmentTotalStatsOnShipBonus = function(bonusGears, ship, apiName){
    var total = 0;
    const shipMasterId = ship.mid;
    const shipOriginId = ship.findOrigin() || 0;
    const shipClassId = ship.sclass;
    const shipTypeId = SHIPTDATA[ship.type] || 0;
    const synergyGears = bonusGears.synergyGears || {};
    const addBonusToTotalIfNecessary = (bonusDef, gearInfo) => {
        // Conditional filters, combinations are logic AND, all filters existed have to be passed
        if(Array.isArray(bonusDef.ids) && !bonusDef.ids.includes(shipMasterId)) { return; }
        if(Array.isArray(bonusDef.excludes) && bonusDef.excludes.includes(shipMasterId)) { return; }
        if(Array.isArray(bonusDef.origins) && !bonusDef.origins.includes(shipOriginId)) { return; }
        if(Array.isArray(bonusDef.excludeOrigins) && bonusDef.excludeOrigins.includes(shipOriginId)) { return; }
        if(Array.isArray(bonusDef.classes) && !bonusDef.classes.includes(shipClassId)) { return; }
        if(Array.isArray(bonusDef.excludeClasses) && bonusDef.excludeClasses.includes(shipClassId)) { return; }
        if(Array.isArray(bonusDef.stypes) && !bonusDef.stypes.includes(shipTypeId)) { return; }
        if(Array.isArray(bonusDef.excludeStypes) && bonusDef.excludeStypes.includes(shipTypeId)) { return; }
        if(bonusDef.remodel || bonusDef.remodelCap) {
            if(ship.findRemodelLvl() < bonusDef.remodel) { return; }
            if(ship.findRemodelLvl() > bonusDef.remodelCap) { return; }
        }
        let gearCount = gearInfo.count;
        if(bonusDef.minStars && gearInfo.starsDist) {
            gearCount = gearInfo.starsDist.slice(bonusDef.minStars).reduce((acc, v) => acc + v, 0);
            if(!gearCount) { return; }
        }
        if(bonusDef.minCount && gearCount < bonusDef.minCount) { return; }
        // Additive bonus actions
        if(bonusDef.single) { total += bonusDef.single[apiName] || 0; }
        if(bonusDef.multiple) {
            total += (bonusDef.multiple[apiName] || 0) *
                (bonusDef.countCap ? Math.min(bonusDef.countCap, gearCount) : gearCount);
        }
        if(bonusDef.synergy) {
            const addBonusFromSynergyGears = (synergy) => {
                // All flags are true (logic AND, no logic OR/NOT yet)
                if(synergy.flags.every(flag => synergyGears[flag] > 0)) {
                    if(synergy.single) { total += synergy.single[apiName] || 0; }
                    if(synergy.distinct) {
                        const flagsKey = synergy.flags.join("_") + "Applied";
                        synergyGears[flagsKey] = (synergyGears[flagsKey] || 0) + 1;
                        if(synergyGears[flagsKey] < 2) { total += synergy.distinct[apiName] || 0; }
                    }
                    if(synergy.byCount) {
                        const gearName = synergy.byCount.gear;
                        const countAmount = gearName === "this" ? gearCount : synergyGears[gearName] || 0;
                        total += (synergy.byCount[countAmount] || {})[apiName] || 0;
                    }
                }
            };
            if(Array.isArray(bonusDef.synergy)) {
                bonusDef.synergy.forEach(addBonusFromSynergyGears);
            } else {
                addBonusFromSynergyGears(bonusDef.synergy);
            }
        }
        // Try not to use any callback in order to let bonus table suit for a JSON
        //if(bonusDef.callback) { total += bonusDef.callback(apiName, gearInfo, synergyGears); }
    };
    Object.keys(bonusGears).forEach(gearId => {
        const gearInfo = bonusGears[gearId];
        if(gearInfo.count > 0) {
            if(gearInfo.byClass) {
                let byClass = gearInfo.byClass[shipClassId];
                if(byClass) {
                    // Refer to another ship class if bonuses supposed to be the same
                    if(typeof byClass !== "object") {
                        byClass = gearInfo.byClass[byClass] || {};
                    }
                    if(Array.isArray(byClass)) {
                        byClass.forEach(c => addBonusToTotalIfNecessary(c, gearInfo));
                    } else {
                        addBonusToTotalIfNecessary(byClass, gearInfo);
                    }
                }
            }
            if(gearInfo.byShip) {
                const byShip = gearInfo.byShip;
                if(Array.isArray(byShip)) {
                    byShip.forEach(s => addBonusToTotalIfNecessary(s, gearInfo));
                } else {
                    addBonusToTotalIfNecessary(byShip, gearInfo);
                }
            }
        }
    });
    return total;
};