function simCombined(type,F1,F1C,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
	var ships1 = F1.ships, ships2 = F2.ships, ships1C = F1C.ships;
	var alive1 = [], alive1C = [], alive2 = [], subsalive1 = [], subsalive1C = [], subsalive2 = [];
	var hasInstall1 = false, hasInstall2 = false, hasInstall1C = false;
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
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP <= 0) continue;
		if (ships1C[i].retreated) continue;
		if(ships1C[i].isSub) subsalive1C.push(ships1C[i]);
		else alive1C.push(ships1C[i]);
		ships1C[i].HPprev = ships1C[i].HP;
		if (!MECHANICS.morale) ships1C[i].morale = 49;
		if (ships1C[i].isInstall) hasInstall1C = true;
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
	
	if (!FIXENAGEMENT){
		let r = Math.random();
		if (r < .45) ENGAGEMENT = 1;
		else if (r < .6) ENGAGEMENT = 1.2;
		else if (r < .9 || F1.noRedT || F2.noRedT || F1C.noRedT) ENGAGEMENT = .8;
		else ENGAGEMENT = .6;
	}
	
	F1.AS = F2.AS = F1C.AS = 0;

	// combined airstrike mod
	F1.airstrikeMod = -10; F1C.airstrikeMod = -20;
	F1.airstrikeaccMod = 15; F1C.airstrikeaccMod = -15;
	if (type == 3){  // guess based on Fall 2020 E4 data 
		F1.airstrikeaccMod = -15;
	}
	
	// if (aironly && ships2.length <= 2 && [652,651,650].indexOf(ships2[0].mid) != -1) bombing = true;
	if (bombing) aironly = true;

	// replace Echelon modifier with old one for single fleet
	if (F1.formation.id == 4) F1.formation = ECHELONOLD;
	if (F1C.formation.id == 4) F1C.formation = ECHELONOLD;
	if (F2.formation.id == 4) F2.formation = ECHELONOLD;
	
	//code here
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		dataroot.api_dock_id = 1;
		var retreatlist = [];
		for (var i=0; i<ships1.length; i++) if (ships1[i].retreated) retreatlist.push(i+1);
		if (retreatlist.length) dataroot.api_escape_idx = retreatlist;
		var retreatlistC = [];
		for (var i=0; i<ships1C.length; i++) if (ships1C[i].retreated) retreatlistC.push(i+1);
		if (retreatlistC.length) dataroot.api_escape_idx_combined = retreatlistC;
		if (NEWFORMAT) {
			dataroot.api_f_maxhps = []; dataroot.api_f_nowhps = [];
			dataroot.api_e_maxhps = []; dataroot.api_e_nowhps = [];
			for (var i=0; i<6; i++) {
				dataroot.api_f_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
				dataroot.api_f_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
			}
		} else {
			dataroot.api_maxhps = [-1];
			dataroot.api_nowhps = [-1];
			for (var i=0; i<6; i++) {
				dataroot.api_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
				dataroot.api_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
			}
		}
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
		if (NEWFORMAT) {
			dataroot.api_f_maxhps_combined = []; dataroot.api_f_nowhps_combined = [];
			for (var i=0; i<6; i++) {
				dataroot.api_f_nowhps_combined.push((i<ships1C.length)? ships1C[i].HP : -1);
				dataroot.api_f_maxhps_combined.push((i<ships1C.length)? ships1C[i].maxHP : -1);
			}
		} else {
			dataroot.api_nowhps_combined = [-1];
			dataroot.api_maxhps_combined = [-1];
			for (var i=0; i<6; i++) {
				dataroot.api_nowhps_combined.push((i<ships1C.length)? ships1C[i].HP : -1);
				dataroot.api_maxhps_combined.push((i<ships1C.length)? ships1C[i].maxHP : -1);
			}
		}
		var escape = [];
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].escaped) escape.push(i+1);
		}
		if (escape.length) dataroot.api_escape_idx = escape;
		var escapeC = [];
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].escaped) escapeC.push(i+1);
		}
		if (escapeC.length) dataroot.api_escape_idx_combined = escapeC;
	}
	if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].enableSecondShelling) doShell2 = true;
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
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,true);
		results.jetCost += calJetCost(alive1.concat(alive1C),alive2);
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2,subsalive2,(C)? BAPI.data.api_injection_kouku:undefined,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) BAPI.data.api_injection_kouku = null;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].HP <= 0) { alive1C.splice(i,1); i--; }
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

	// AS friend fleet
	if (!NBonly && friendFleet && friendFleet.friendType == 2 && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) logFriendFleetInfo(friendFleet,BAPI.data);
		if (C) BAPI.data.api_friendly_kouku = {api_stage_flag: [1,1,1], api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		compareAP(friendFleet,F2);
		airPhase(friendFleet.ships,[],alive2,subsalive2,(C)? BAPI.data.api_friendly_kouku:undefined);
		if (C) {
			if (BAPI.data.api_friendly_kouku.api_stage1) BAPI.data.api_friendly_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_friendly_kouku = null;
			if (BAPI.api_friendly_kouku) delete BAPI.data.api_friendly_kouku.api_stage3_combined;
		}
		
		removeSunk(alive2);
		F2.AS = 0;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2);
		F1C.AS = F1.AS;
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2,subsalive2,(C)? BAPI.data.api_kouku:undefined,false,bombing);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].HP <= 0) { alive1C.splice(i,1); i--; }
		}
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].HP <= 0) { alive2.splice(i,1); i--; }
		}
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		compareAP(F1,F2);
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2,subsalive2,(C)? BAPI.data.api_kouku2:undefined);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
		}
		
		for (var i=0; i<alive1.length; i++) {   //remove dead things
			if (alive1[i].HP <= 0) { alive1.splice(i,1); i--; }
		}
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].HP <= 0) { alive1C.splice(i,1); i--; }
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
	if (MECHANICS.OASW && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].canOASW()) attackers1.push(alive1C[i]);
		}
		orderByRange(attackers1,order1);
		for (var i=0; i<alive2.length; i++) {
			if (alive2[i].canOASW()) attackers2.push(alive2[i]);
		}
		orderByRange(attackers2,order2);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
			shellPhase(order1,order2,alive1C,subsalive1C,alive2,subsalive2,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,true,(C)? BAPI.data.api_opening_atack : undefined);
	}
	
	//shelling functions
	var shellRange = function(escort1,api_hou) {
		var ships1f = (escort1)? ships1C : ships1;
		var alive1f = (escort1)? alive1C : alive1;
		var subsalive1f = (escort1)? subsalive1C : subsalive1;
		var hasInstall1f = (escort1)? hasInstall1C : hasInstall1;
		if (!NBonly && !aironly && alive1f.length+subsalive1f.length > 0 && alive2.length+subsalive2.length > 0) {
			var order1 = [], order2 = [];
			orderByRange(ships1f,order1,hasInstall2);
			orderByRange(alive2,order2,hasInstall1f);
			
			shellPhase(order1,order2,alive1f,subsalive1f,alive2,subsalive2,(C)? api_hou:undefined);
		}
	}
	
	var shellOrder = function(escort1,api_hou) {
		var ships1f = (escort1)? ships1C : ships1;
		var alive1f = (escort1)? alive1C : alive1;
		var subsalive1f = (escort1)? subsalive1C : subsalive1;
		var hasInstall1f = (escort1)? hasInstall1C : hasInstall1;
		if (!NBonly && !aironly && alive1f.length+subsalive1f.length > 0 && alive2.length+subsalive2.length > 0) {
			var order1 = [], order2 = [];
			for (var i=0; i<ships1f.length; i++) {
				if (!hasInstall2 && ships1f[i].isSub) continue;
				if (ships1f[i].retreated) continue;
				if (ships1f[i].canShell()) order1.push(ships1f[i]);
			}
			for (var i=0; i<ships2.length; i++) {
				if (!hasInstall1f && ships2[i].isSub) continue;
				if (ships2[i].retreated) continue;
				if (ships2[i].canShell()) order2.push(ships2[i]);
			}
			
			shellPhase(order1,order2,alive1f,subsalive1f,alive2,subsalive2,(C)? api_hou:undefined);
		}
	}
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F1C.clearFleetLoS();
	F2.clearFleetLoS();
	
	//shelling 1
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki1 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		if (type==2) {
			F1.basepowshell = F1.formation.shellbonus; F1.baseaccshell = F1.formation.accbase;
			F2.basepowshell = F1.formation.shellbonusE; F2.baseaccshell = 65; // source: https://bbs.nga.cn/read.php?pid=359696724
			shellRange(false,(C)? BAPI.data.api_hougeki1 : undefined);
		} else {
			F1C.basepowshell = F1C.formation.shellbonus; F1C.baseaccshell = F1C.formation.accbase;
			F2.basepowshell = F1C.formation.shellbonusE; F2.baseaccshell = 65; // source: https://bbs.nga.cn/read.php?pid=359696724
			shellRange(true,(C)? BAPI.data.api_hougeki1 : undefined);
		}
	}
	
	// closing torpedo for CTF/TTF
	if (type!=2 && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}
	
	//shelling 2
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki2 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		F1.basepowshell = F1.formation.shellbonus; F1.baseaccshell = F1.formation.accbase;
		F2.basepowshell = F1.formation.shellbonusE; F2.baseaccshell = 80; // source: https://bbs.nga.cn/read.php?pid=359696724
		if (type==2) {
			F2.baseaccshell = 65; // source: https://bbs.nga.cn/read.php?pid=359696724
			if (doShell2) shellOrder(false,(C)? BAPI.data.api_hougeki2 : undefined);
		} else {
			shellRange(false,(C)? BAPI.data.api_hougeki2 : undefined);
		}
	}
	
	//shelling 3
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki3 = {api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1],api_si_list:[-1]};
		if (type==2) {
			F1C.basepowshell = F1C.formation.shellbonus; F1C.baseaccshell = F1C.formation.accbase;
			F2.basepowshell = F1C.formation.shellbonusE; F2.baseaccshell = 80; // source: https://bbs.nga.cn/read.php?pid=359696724
			shellRange(true,(C)? BAPI.data.api_hougeki3 : undefined);
		} else if (doShell2) {
			F1.basepowshell = F1.formation.shellbonus; F1.baseaccshell = F1.formation.accbase;
			F2.basepowshell = F1.formation.shellbonusE; F2.baseaccshell = 80; // source: https://bbs.nga.cn/read.php?pid=359696724
			shellOrder(false,(C)? BAPI.data.api_hougeki3 : undefined);
		}
	}
	
	// closing torpedo for STF
	if (type==2 && !NBonly && !aironly && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1C,subsalive1C,alive2,subsalive2,false,(C)? BAPI.data.api_raigeki:undefined);
	}

	// update morale (day battle) https://twitter.com/Divinity__123/status/1447941762966867972
	if (MECHANICS.morale && !noupdate && !NBonly) {
		updateMoraleStart(ships1);
		updateMoraleStart(ships1C);
	}
	
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2,ships1C);
		results.mvpDay = F1.getMVP();
		results.mvpDayC = F1C.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
		results.repairsDayC = {};
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].repairs) results.repairsDayC[i] = ships1C[i].repairs.slice();
		}
	}
	
	//friend fleet
	if ((doNB||NBonly) && friendFleet && friendFleet.friendType == 1 && alive2.length+subsalive2.length > 0) {
		friendFleetPhase(friendFleet,F2,alive2,subsalive2,BAPI);
		removeSunk(alive2); removeSunk(subsalive2);
	}
	
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length > 0) {
		didNB = !NBonly;
		var order1 = [], order2 = [];
		for (var i=0; i<ships1C.length; i++) {
			order1.push(ships1C[i]);
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

		nightPhase(order1,order2,alive1C,subsalive1C,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);

		// update morale (night battle) https://twitter.com/Divinity__123/status/1447941762966867972
		if (MECHANICS.morale && !noupdate) {
			updateMoraleStart(ships1,true);
			updateMoraleStart(ships1C,true)
		}
	}
	
	//results
	if (!noupdate) {
		// var subonly = true;
		// for (var j=0; j<ships2.length; j++) if (ships2[j].type != 'SS') subonly = false;
		updateSupply(ships1,didNB,NBonly,bombing,noammo);
		updateSupply(ships1C,didNB,NBonly,bombing,noammo);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1) : getRank(ships1,ships2,ships1C);
	
	results.redded = false;
	results.flagredded = (ships1[0].HP/ships1[0].maxHP <= .25);
	results.reddedIndiv = [false,false,false,false,false];
	results.reddedIndivC = [false,false,false,false,false];
	results.flagsunk = (ships2[0].HP <= 0);
	results.undamaged = true;
	results.buckets = 0;
	results.repairCost1 = 0;
	results.repairCost2 = 0;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP/ships1[i].maxHP <= .25) {
			results.redded = true;
			results.reddedIndiv[i] = true;
			if (!ships1[i].isflagship) ships1[i].protection = false;
		}
		if (ships1[i].HP/ships1[i].maxHP <= .5) results.undamaged = false;
		if (ships1[i].HP/ships1[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1[i]) > BUCKETTIME) results.buckets++;
		if (ships1[i].repairSpent) {
			results.repairCost1 += ships1[i].repairSpent == 1;
			results.repairCost2 += ships1[i].repairSpent == 2;
			delete ships1[i].repairSpent;
		}
	}
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP/ships1C[i].maxHP <= .25) {
			if (!ships1C[i].isflagship) results.redded = true; //don't count escort flag taiha as retreat
			results.reddedIndivC[i] = true;
			if (!ships1C[i].isflagship) ships1C[i].protection = false;
		}
		if (ships1C[i].HP/ships1C[i].maxHP <= .5) results.undamaged = false;
		if (ships1C[i].HP/ships1C[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1C[i]) > BUCKETTIME) results.buckets++;
		if (ships1C[i].repairSpent) {
			results.repairCost1 += ships1C[i].repairSpent == 1;
			results.repairCost2 += ships1C[i].repairSpent == 2;
			delete ships1C[i].repairSpent;
		}
	}
	results.MVP = F1.getMVP();
	results.MVPC = F1C.getMVP();
	results.sinkFlagship = F1.getSinkFlagship();
	results.sinkFlagshipC = F1C.getSinkFlagship();
	results.dmgTotals = F1.DMGTOTALS;
	results.dmgTotalsC = F1C.DMGTOTALS;
	if (didNB) results.didNB = true;
	
	//update morale (post battle)
	if (MECHANICS.morale && !noupdate) {
		updateMorale(ships1,results.rank,((didNB)? 0 : results.MVP));
		updateMorale(ships1C,results.rank,results.MVPC);
	}
	
	return results;
}

function simStatsCombined(numsims,type,foptions) {
	console.log(type);
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
		totalTransportGauge: 0,
		nodes: []
	};
	for (var i=0; i<FLEETS2.length; i++) {
		totalResult.nodes.push({
			num: 0,
			didNB: 0, //used for rsammo calc
			redded: 0,
			redIndiv: [0,0,0,0,0,0],
			redIndivC: [0,0,0,0,0,0],
			undamaged: 0,
			MVPs: [0,0,0,0,0,0],
			MVPsC: [0,0,0,0,0,0],
			sinkFlagships: [0,0,0,0,0,0],
			sinkFlagshipsC: [0,0,0,0,0,0],
			dmgTotals: [0,0,0,0,0,0],
			dmgTotalsC: [0,0,0,0,0,0],
			ranks: {S:0,A:0,B:0,C:0,D:0,E:0},
			flagsunk: 0,
			airStates: [0,0,0,0,0],
			nbStates: [0,0,0],
			lbasKills: [0,0,0,0,0,0],
			lbasKillsC: [0,0,0,0,0,0],
			lbasWipes: [0,0,0,0,0,0,0,0,0,0,0,0],
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
	var formdef = FLEETS1[0].formation, formdefc = FLEETS1[1].formation;
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
			for (let n=0; n<2; n++) {
				for (let ship of FLEETS1[n].ships) {
					if (options.bonusA) ship.bonusSpecial = ship.bonusA || 1;
					else if (options.bonusB) ship.bonusSpecial = ship.bonusB || 1;
					else if (options.bonusC) ship.bonusSpecial = ship.bonusC || 1;
				}
			}
			if (options.formation != '0') {
				if (options.NBonly) {
					FLEETS1[0].formation = ALLFORMATIONS[options.formation];
					FLEETS1[1].formation = ALLFORMATIONS[options.formation];
				}else{
					FLEETS1[0].formation = ALLFORMATIONS[type+options.formation];
					FLEETS1[1].formation = ALLFORMATIONS[type+options.formation+'E'];
				}
			} else {
				FLEETS1[0].formation = formdef;
				FLEETS1[1].formation = formdefc;
			}
			if (options.randform && !FLEETS2[j].combinedWith) {
				let tempform = randFormation(options.randform);
				if (tempform != '0') FLEETS2[j].formation = ALLFORMATIONS[tempform];
				else FLEETS2[j].formation = formdef2[j];
			}
			FLEETS1[0].DMGTOTALS = [0,0,0,0,0,0]; FLEETS1[1].DMGTOTALS = [0,0,0,0,0,0];
			FLEETS1[0].SINKFLAGSHIP = [false, false, false, false, false, false]; FLEETS1[1].SINKFLAGSHIP = [false, false, false, false, false, false]; 
			var supportNum = 0;
			let friendFleet = null;
			if (options.maelstrom) maelstromLoss(FLEETS1[0], options.maelstrom);
			if (options.lbraid && FLEETLBRAID) landBaseLoss(alllbas);
			if (j == FLEETS2.length - 1) {
				supportNum = 1;
				if (options.randfriend) {
					let idx = randFriendFleet(options.randfriend);
					if (idx && FLEETS1S[idx]) friendFleet = FLEETS1S[idx]; 
					else friendFleet = null;
				}else{
					friendFleet = FLEETS1S[2];
				}
				underwaySupply(FLEETS1[0]);
			}else if (options.randfriend) {
				let idx = randFriendFleet(options.randfriend);
				if (idx && FLEETS1S[idx]) friendFleet = FLEETS1S[idx]; 
				else friendFleet = null;
			}
			if (options.emergencyrepair) emergencyRepair(FLEETS1[0]);
			var LBASwaves = [];
			for (var k=0; k<options.lbas.length; k++) LBASwaves.push(LBAS[options.lbas[k]-1]);
			if (options.engagemod) {
				ENGAGEMENT = options.engagemod;
				FIXENAGEMENT = true;
			}else FIXENAGEMENT = false;
			var res;
			if (FLEETS2[j].combinedWith) res = sim12vs12(type,FLEETS1[0],FLEETS1[1],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			else res = simCombined(type,FLEETS1[0],FLEETS1[1],FLEETS2[j],FLEETS1S[supportNum],LBASwaves,options.NB,options.NBonly,options.aironly,options.landbomb,options.noammo,null,false,friendFleet);
			totalResult.nodes[j].num++;
			if (res.redded) totalResult.nodes[j].redded++;
			for (var k=0; k<res.reddedIndiv.length; k++) if (res.reddedIndiv[k]) totalResult.nodes[j].redIndiv[k]++;
			for (var k=0; k<res.reddedIndivC.length; k++) if (res.reddedIndivC[k]) totalResult.nodes[j].redIndivC[k]++;
			if (res.undamaged) totalResult.nodes[j].undamaged++;
			if (res.flagsunk) totalResult.nodes[j].flagsunk++;
			totalResult.nodes[j].ranks[res.rank]++;
			totalResult.nodes[j].MVPs[res.MVP]++;
			totalResult.nodes[j].MVPsC[res.MVPC]++;
			if (res.sinkFlagship > -1) totalResult.nodes[j].sinkFlagships[res.sinkFlagship]++;
			if (res.sinkFlagshipC > -1) totalResult.nodes[j].sinkFlagshipsC[res.sinkFlagshipC]++;
			for (let i = 0; i < res.dmgTotals.length; i++) totalResult.nodes[j].dmgTotals[i] += res.dmgTotals[i];
			for (let i = 0; i < res.dmgTotalsC.length; i++) totalResult.nodes[j].dmgTotalsC[i] += res.dmgTotalsC[i];
			totalResult.nodes[j].airStates[FLEETS1[0].AS+2]++;
			if (res.didNB){
				if (res.didNBescort) totalResult.nodes[j].nbStates[2]++;
				else totalResult.nodes[j].nbStates[1]++;
			}
			else totalResult.nodes[j].nbStates[0]++;
			if (res.lbasKills) {
				for (let k=0; k<6; k++) {
					if (res.lbasKills[k]) totalResult.nodes[j].lbasKills[k]++;
					if (res.lbasKillsC[k]) totalResult.nodes[j].lbasKillsC[k]++;
				}
			}
			if (res.lbasWipes) {
				for (let k=0; k<res.lbasWipes.length; k++) {
					if (res.lbasWipes[k]) totalResult.nodes[j].lbasWipes[k]++;
				}
			}
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
			if (TRANSPORTOPERATION && j == FLEETS2.length - 1) {
				if (res.rank == 'S'){
					totalResult.totalTransportGauge += Math.floor(FLEETS1[0].getTransportPoints());
					totalResult.totalTransportGauge += Math.floor(FLEETS1[1].getTransportPoints());
				}else if (res.rank == 'A') {
					totalResult.totalTransportGauge += Math.floor(.7*FLEETS1[0].getTransportPoints());
					totalResult.totalTransportGauge += Math.floor(.7*FLEETS1[1].getTransportPoints());
				}
			}
			//if ((res.redded && DORETREAT)||res.flagredded) break;
			if (!canContinue(FLEETS1[0].ships,FLEETS1[1].ships)) break;
		}
		let flagshipFinal = FLEETS2[FLEETS2.length-1].ships[0];
		totalResult.totalGaugeDamage += flagshipFinal.maxHP - Math.max(0,flagshipFinal.HP);
		for (var fl=0; fl<=1; fl++) {
			for (var j=0; j<FLEETS1[fl].ships.length; j++) { //get refuel and repair costs
				var ship = FLEETS1[fl].ships[j];
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
		//lbas
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
	
	// totalResult.totalFuelR/=numsims;
	// totalResult.totalSteelR/=numsims;
	// totalResult.totalFuelS/=numsims;
	// totalResult.totalAmmoS/=numsims;
	// totalResult.totalBauxS/=numsims;
	// for (var j=0; j<FLEET2.length; j++) {
		// totalResult.nodes[j].redded/=numsims;
		// totalResult.nodes[j].undamaged/=numsims;
		// totalResult.nodes[j].flagsunk/=numsims;
		// for (rank in totalResult.nodes[j].ranks) totalResult.nodes[j].RANKS[rank]/=numsims;
		// for (var i=0; i<totalResult.nodes[j].MVPs.length; i++) totalResult.nodes[j].MVPs[i]/=numsims;
		// for (var i=0; i<totalResult.nodes[j].redIndiv.length; i++) totalResult.nodes[j].redIndiv[i]/=numsims;
	// }
	
	updateResults(totalResult);
	
	console.log(totalResult);
	// console.log('RED RATE: '+totalResult.RED);
	// console.log('UNDAMAGED: '+totalResult.UNDAMAGED);
	// console.log('FLAG SUNK: '+totalResult.FLAGSUNK);
	// console.log('AVG REPAIR FUEL: '+totalResult.totalFuelR);
	// console.log('AVG REPAIR STEEL: '+totalResult.totalSteelR);
	// console.log('AVG SUPPLY FUEL: '+totalResult.totalFuelS);
	// console.log('AVG SUPPLY AMMO: '+totalResult.totalAmmoS);
	// console.log('AVG SUPPLY BAUX: '+totalResult.totalBauxS);
	// console.log(totalResult.RANKS);
	// console.log(totalResult.MVPS);
	
	return 0;
}


//-------------------------------
function sim6vs12(F1,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
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
	
	if (!FIXENAGEMENT){
		let r = Math.random();
		if (r < .45) ENGAGEMENT = 1;
		else if (r < .6) ENGAGEMENT = 1.2;
		else if (r < .9 || F1.noRedT || F2.noRedT || F2C.noRedT) ENGAGEMENT = .8;
		else ENGAGEMENT = .6;
	}
	
	F1.AS = F2.AS = F2C.AS = 0;

	// combined airstrike mod
	F2.airstrikeMod = -10; F2C.airstrikeMod = -20;
	F2.airstrikeaccMod = 15; F2C.airstrikeaccMod = -15;
	
	if (bombing) aironly = true;
	
	// replace Echelon modifier with old one for single fleet
	if (F1.formation.id == 4) F1.formation = ECHELONOLD;

	//initial
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		dataroot.api_dock_id = 1;
		var retreatlist = [];
		for (var i=0; i<ships1.length; i++) if (ships1[i].retreated) retreatlist.push(i+1);
		if (retreatlist.length) dataroot.api_escape_idx = retreatlist;
		if (NEWFORMAT) {
			dataroot.api_f_maxhps = []; dataroot.api_f_nowhps = [];
			dataroot.api_e_maxhps = []; dataroot.api_e_nowhps = [];
			dataroot.api_e_maxhps_combined = []; dataroot.api_e_nowhps_combined = [];
			for (let ship of ships1) {
				dataroot.api_f_nowhps.push(ship.HP);
				dataroot.api_f_maxhps.push(ship.maxHP);
			}
		} else {
			dataroot.api_maxhps = [-1];
			dataroot.api_maxhps_combined = [-1];
			dataroot.api_nowhps = [-1];
			dataroot.api_nowhps_combined = [-1];
			for (var i=0; i<6; i++) {
				dataroot.api_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
				dataroot.api_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
				dataroot.api_nowhps_combined.push(-1);
				dataroot.api_maxhps_combined.push(-1);
			}
		}
		dataroot.api_ship_ke = [];
		dataroot.api_ship_ke_combined = [];
		dataroot.api_eSlot = [];
		dataroot.api_eSlot_combined = [];
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
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke_combined.push((i<ships2C.length)? ships2C[i].mid : -1);
			if (NEWFORMAT) {
				dataroot.api_e_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
				dataroot.api_e_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			} else {
				dataroot.api_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
				dataroot.api_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			}
			dataroot.api_eSlot_combined.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot_combined[i].push((i<ships2C.length && j<ships2C[i].equips.length)? ships2C[i].equips[j].mid : -1);
		}
	}
	if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].enableSecondShelling) doShell2 = true;
	}
	

	//jet lbas
	if (LBASwaves && LBASwaves.length && !NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_air_base_injection = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		var uniqueLBs = [];
		for (var i=0; i<LBASwaves.length; i++) {
			if (uniqueLBs.indexOf(LBASwaves[i]) == -1) uniqueLBs.push(LBASwaves[i]);
		}
		var jetLBAS = LandBase.createJetLandBase(uniqueLBs);
		if (jetLBAS.equips.length) {
			compareAP(jetLBAS,F2,true,true,true);
			results.jetCost += calJetCost([jetLBAS],alive2.concat(alive2C));
			LBASPhase(jetLBAS,alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)?BAPI.data.api_air_base_injection:undefined);
			removeSunk(alive2); removeSunk(alive2C);
			removeSunk(subsalive2); removeSunk(subsalive2C);
			if (C) {
				BAPI.data.api_air_base_injection.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[jetLBAS.AS+2];
			}
			F2.AS = F2C.AS = 0;
		} else {
			if (C) delete BAPI.data.api_air_base_injection;
		}
	}
	
	//jet airstrike
	if (!NBonly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,true,true);
		results.jetCost += calJetCost(alive1,alive2.concat(alive2C));
		airPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_injection_kouku:undefined,true,false,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) BAPI.data.api_injection_kouku = null;
		}
		
		removeSunk(alive1);
		removeSunk(alive2);
		removeSunk(alive2C);
	}
	
	//lbas
	if (LBASwaves && LBASwaves.length && !NBonly) {
		if (C) BAPI.data.api_air_base_attack = [];
		for (var i=0; i<LBASwaves.length; i++) LBASwaves[i]._currentSlots = LBASwaves[i].planecount.slice();
		for (var i=0; i<LBASwaves.length; i++) {
			if (LBASwaves[i].equips.length <= 0) continue;
			if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
				LBASwaves[i].planecount = LBASwaves[i]._currentSlots.slice();
				compareAP(LBASwaves[i],F2,false,true,true);
				var LBAPI = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
				LBASPhase(LBASwaves[i],alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)?LBAPI:undefined);
				removeSunk(alive2); removeSunk(alive2C);
				removeSunk(subsalive2); removeSunk(subsalive2C);
				if (C) {
					LBAPI.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[LBASwaves[i].AS+2];
					BAPI.data.api_air_base_attack.push(LBAPI);
				}
			}
		}
		F2.AS = F2C.AS = 0;
	}

	// AS friend fleet
	if (!NBonly && friendFleet && friendFleet.friendType == 2 && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) logFriendFleetInfo(friendFleet,BAPI.data);
		if (C) BAPI.data.api_friendly_kouku = {api_stage_flag: [1,1,1], api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(friendFleet,F2,false,true);
		F2C.AS = F2.AS;
		airPhase(friendFleet.ships,[],alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_friendly_kouku:undefined,false,false,true);
		if (C) {
			if (BAPI.data.api_friendly_kouku.api_stage1) BAPI.data.api_friendly_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_friendly_kouku = null;
		}
		
		removeSunk(alive2);
		removeSunk(alive2C);	
		F2.AS = F2C.AS = 0;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,false,true);
		F2C.AS = F2.AS;
		airPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_kouku:undefined,false,bombing,true);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		removeSunk(alive1);
		removeSunk(alive2);
		removeSunk(alive2C);
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		compareAP(F1,F2,false,true);
		F2C.AS = F2.AS;
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_kouku2:undefined,false,false,true);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
		}
		
		removeSunk(alive1);
		removeSunk(alive2);
		removeSunk(alive2C);
	}
	
	//support phase
	if (Fsupport && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) {
			supportPhase(Fsupport.ships,alive2.concat(alive2C),subsalive2.concat(subsalive2C),Fsupport.supportType,BAPI,Fsupport.supportBoss);
			removeSunk(alive2); removeSunk(subsalive2);
			removeSunk(alive2C); removeSunk(subsalive2C);
		}
	}

	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1.length; i++) {
			if (alive1[i].canOASW()) attackers1.push(alive1[i]);
		}
		orderByRange(attackers1,order1);
		for (var i=0; i<alive2C.length; i++) {
			if (alive2C[i].canOASW()) attackers2.push(alive2C[i]);
		}
		orderByRange(attackers2,order2);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
			var targets = {alive1:alive1,subsalive1:subsalive1,alive2:alive2,alive2C:alive2C,subsalive2:subsalive2,subsalive2C:subsalive2C};
			shellPhaseC(order1,order2,targets,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
		removeSunk(alive1);
		removeSunk(subsalive1);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && (alive2.length+subsalive2.length > 0 || alive2C.length+subsalive2C.length > 0)) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)? BAPI.data.api_opening_atack : undefined,true);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}

	//calculate survival of enemy escort
	results.survival2C = [];
	ships2C.forEach((ship) => results.survival2C.push(ship.HP/ship.maxHP > .25));
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F2.clearFleetLoS();
	F2C.clearFleetLoS();
	
	//shelling 1
	if (C && !NBonly) BAPI.data.api_hougeki1 = null;
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2C.length+subsalive2C.length > 0) {
		F1.basepowshell = 5; F2C.basepowshell = -5;
		F1.baseaccshell = 80; F2C.baseaccshell = 90;
		var order1 = [], order2 = [];
		orderByRange(ships1,order1,hasInstall2C);
		orderByRange(ships2C,order2,hasInstall1);
		
		if (C) BAPI.data.api_hougeki1 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2C,subsalive2C,(C)? BAPI.data.api_hougeki1:undefined);
	}
	
	//closing torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && (alive2.length+subsalive2.length > 0 || alive2C.length+subsalive2C.length > 0)) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1,subsalive1,alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)? BAPI.data.api_raigeki:undefined,true);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}
	
	//shelling 2
	if (!NBonly && !aironly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length > 0) {
		F1.basepowshell = 5; F2.basepowshell = 10;
		F1.baseaccshell = 80; F2.baseaccshell = 90;
		
		var order1 = [], order2 = [];
		orderByRange(ships1,order1,hasInstall2);
		orderByRange(ships2,order2,hasInstall1);
		
		if (C) BAPI.data.api_hougeki2 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		shellPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,(C)? BAPI.data.api_hougeki2:undefined);
	}
	
	//shelling 3
	if (doShell2 && !NBonly && !aironly && alive1.length+subsalive1.length > 0 && (alive2.length+subsalive2.length > 0 || alive2C.length+subsalive2C.length > 0)) {
		F1.basepowshell = 5; F2.basepowshell = 10;
		F1.baseaccshell = 80; F2.baseaccshell = 90;
		
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			if (!hasInstall2 && !hasInstall2C && ships1[i].isSub) continue;
			if (ships1[i].retreated) continue;
			if (ships1[i].canShell()) order1.push(ships1[i]);
		}
		for (var i=0; i<ships2.length; i++) {
			if (!hasInstall1 && ships2[i].isSub) continue;
			if (ships2[i].retreated) continue;
			if (ships2[i].canShell()) order2.push(ships2[i]);
		}
		
		if (C) BAPI.data.api_hougeki3 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		var targets = {alive1:alive1,subsalive1:subsalive1,alive2:alive2,alive2C:alive2C,subsalive2:subsalive2,subsalive2C:subsalive2C};
		shellPhaseC(order1,order2,targets,(C)? BAPI.data.api_hougeki3:undefined);
	
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}

	// update morale (day battle) https://twitter.com/Divinity__123/status/1447941762966867972
	if (MECHANICS.morale && !noupdate && !NBonly) {
		updateMoraleStart(ships1);
	}
	
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2.concat(ships2C));
		results.mvpDay = F1.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
	}
	
	//friend fleet
	if ((doNB||NBonly) && friendFleet && friendFleet.friendType == 1 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		friendFleetPhase(friendFleet,F2,alive2.concat(alive2C),subsalive2.concat(subsalive2C),BAPI);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}

	//calculate survival of enemy main
	results.survival2 = [];
	ships2.forEach((ship) => results.survival2.push(ship.HP > 0));
	
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		didNB = !NBonly;
		var count = 0, allsunk = true; count2 = 0;
		for (var i=0; i<ships2.length; i++) if (ships2[i].HP > 0) { allsunk = false; break; }
		for (var i=0; i<ships2C.length; i++) {
			let point = 0;
			if (ships2C[i].HP/ships2C[i].maxHP > .5) point = 1;
			else if (ships2C[i].HP/ships2C[i].maxHP > .25) point = ships2C[i].isPT? .5: .7;
			count += point;
			if (ships2C[i].HP > 0) count2 += 1;
		}
		if (ships2C[0].HP > 0) count += 1;
		var fightescort = (allsunk || count >= 3 || count2 >= 5);
		if (fightescort) results.didNBescort = true;
		
		var order1 = [], order2 = [];
		for (var i=0; i<ships1.length; i++) {
			order1.push(ships1[i]);
		}
		if (fightescort) {
			for (var i=0; i<ships2C.length; i++) {
				order2.push(ships2C[i]);
			}
		} else {
			for (var i=0; i<ships2.length; i++) {
				order2.push(ships2[i]);
			}
		}	
		
		if (C) {
			if (!BAPI.yasen) BAPI.yasen = {};
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1],api_n_mother_list:[-1]};
			if (NEWFORMAT) {
				formatRemovePadding(BAPI.yasen.api_hougeki);
				BAPI.yasen.api_hougeki.api_at_eflag = [];
			}
			BAPI.yasen.api_flare_pos = [-1,-1];
			BAPI.yasen.api_touch_plane = [-1,-1];
			let n = (fightescort)? 2 : 1;
			BAPI.yasen.api_active_deck = [1,n];
			if (!NBonly) BAPI.yasen.api_ship_ke_combined = [];
		}

		if (fightescort) nightPhase(order1,order2,alive1,subsalive1,alive2C,subsalive2C,NBonly,(C)? BAPI.yasen:undefined);
		else nightPhase(order1,order2,alive1,subsalive1,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);

		// update morale (night battle) https://twitter.com/Divinity__123/status/1447941762966867972
		if (MECHANICS.morale && !noupdate) {
			updateMoraleStart(ships1,true);
		}
	}
	
	//results
	if (!noupdate) {
		updateSupply(ships1,didNB,NBonly,bombing,noammo,true);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1) : getRank(ships1,ships2.concat(ships2C));
	
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
			if (!ships1[i].isflagship) ships1[i].protection = false;
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

//------------------
function sim12vs12(type,F1,F1C,F2,Fsupport,LBASwaves,doNB,NBonly,aironly,bombing,noammo,BAPI,noupdate,friendFleet) {
	var F2C = F2.combinedWith;
	var ships1 = F1.ships, ships2 = F2.ships, ships1C = F1C.ships, ships2C = F2C.ships;
	var alive1 = [], alive1C = [], alive2 = [], alive2C = [], subsalive1 = [], subsalive1C = [], subsalive2 = [], subsalive2C = [];
	var hasInstall1 = false, hasInstall2 = false, hasInstall1C = false, hasInstall2C = false;
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
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP <= 0) continue;
		if (ships1C[i].retreated) continue;
		if(ships1C[i].isSub) subsalive1C.push(ships1C[i]);
		else alive1C.push(ships1C[i]);
		ships1C[i].HPprev = ships1C[i].HP;
		if (!MECHANICS.morale) ships1C[i].morale = 49;
		if (ships1C[i].isInstall) hasInstall1C = true;
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
	
	if (!FIXENAGEMENT){
		let r = Math.random();
		if (r < .45) ENGAGEMENT = 1;
		else if (r < .6) ENGAGEMENT = 1.2;
		else if (r < .9 || F1.noRedT || F2.noRedT || F1C.noRedT || F2C.noRedT) ENGAGEMENT = .8;
		else ENGAGEMENT = .6;
	}
	
	F1.AS = F2.AS = F1C.AS = F2C.AS = 0;

	// combined airstrike mod
	F1.airstrikeMod = -10; F1C.airstrikeMod = -20;
	F2.airstrikeMod = -10; F2C.airstrikeMod = -20;
	F1.airstrikeaccMod = 15; F1C.airstrikeaccMod = -15;
	F2.airstrikeaccMod = 15; F2C.airstrikeaccMod = -15;
	if (type == 3){  // guess based on Fall 2020 E4 data 
		F1.airstrikeaccMod = -15;
	}

	if (bombing) aironly = true;
	
	if (C) {
		console.log('ENGAGEMENT: '+ENGAGEMENT);
		var dataroot = (NBonly)? BAPI.yasen : BAPI.data;
		dataroot.api_formation = [F1.formation.id,F2.formation.id,{1:1,.8:2,1.2:3,.6:4}[ENGAGEMENT]];
		dataroot.api_dock_id = 1;
		var retreatlist = [];
		for (var i=0; i<ships1.length; i++) if (ships1[i].retreated) retreatlist.push(i+1);
		if (retreatlist.length) dataroot.api_escape_idx = retreatlist;
		var retreatlistC = [];
		for (var i=0; i<ships1C.length; i++) if (ships1C[i].retreated) retreatlistC.push(i+1);
		if (retreatlistC.length) dataroot.api_escape_idx_combined = retreatlistC;
		if (NEWFORMAT) {
			dataroot.api_f_maxhps = []; dataroot.api_f_nowhps = [];
			dataroot.api_e_maxhps = []; dataroot.api_e_nowhps = [];
			for (var i=0; i<6; i++) {
				dataroot.api_f_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
				dataroot.api_f_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
			}
		} else {
			dataroot.api_maxhps = [-1];
			dataroot.api_nowhps = [-1];
			for (var i=0; i<6; i++) {
				dataroot.api_nowhps.push((i<ships1.length)? ships1[i].HP : -1);
				dataroot.api_maxhps.push((i<ships1.length)? ships1[i].maxHP : -1);
			}
		}
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
		dataroot.api_ship_ke_combined = [];
		dataroot.api_eSlot_combined = [];
		if (NEWFORMAT) {
			dataroot.api_f_maxhps_combined = []; dataroot.api_f_nowhps_combined = [];
			dataroot.api_e_maxhps_combined = []; dataroot.api_e_nowhps_combined = [];
			for (var i=0; i<6; i++) {
				dataroot.api_f_nowhps_combined.push((i<ships1C.length)? ships1C[i].HP : -1);
				dataroot.api_f_maxhps_combined.push((i<ships1C.length)? ships1C[i].maxHP : -1);
			}
		} else {
			dataroot.api_nowhps_combined = [-1];
			dataroot.api_maxhps_combined = [-1];
			for (var i=0; i<6; i++) {
				dataroot.api_nowhps_combined.push((i<ships1C.length)? ships1C[i].HP : -1);
				dataroot.api_maxhps_combined.push((i<ships1C.length)? ships1C[i].maxHP : -1);
			}
		}
		for (var i=0; i<6; i++) {
			dataroot.api_ship_ke_combined.push((i<ships2C.length)? ships2C[i].mid : -1);
			if (NEWFORMAT) {
				dataroot.api_e_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
				dataroot.api_e_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			} else {
				dataroot.api_nowhps_combined.push((i<ships2C.length)? ships2C[i].HP : -1);
				dataroot.api_maxhps_combined.push((i<ships2C.length)? ships2C[i].maxHP : -1);
			}
			dataroot.api_eSlot_combined.push([]);
			for (var j=0; j<5; j++)
				dataroot.api_eSlot_combined[i].push((i<ships2C.length && j<ships2C[i].equips.length)? ships2C[i].equips[j].mid : -1);
		}
		var escape = [];
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].escaped) escape.push(i+1);
		}
		if (escape.length) dataroot.api_escape_idx = escape;
		var escapeC = [];
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].escaped) escapeC.push(i+1);
		}
		if (escapeC.length) dataroot.api_escape_idx_combined = escapeC;
	}
	if (C) console.log(API);
	
	var doShell2 = false;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].enableSecondShelling) doShell2 = true;
	}
	for (var i=0; i<ships2.length; i++) {
		if (ships2[i].enableSecondShelling) doShell2 = true;
	}
	
	//jet lbas
	if (LBASwaves && LBASwaves.length && !NBonly && alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_air_base_injection = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		var uniqueLBs = [];
		for (var i=0; i<LBASwaves.length; i++) {
			if (uniqueLBs.indexOf(LBASwaves[i]) == -1) uniqueLBs.push(LBASwaves[i]);
		}
		var jetLBAS = LandBase.createJetLandBase(uniqueLBs);
		if (jetLBAS.equips.length) {
			compareAP(jetLBAS,F2,false,true,true);
			results.jetCost += calJetCost([jetLBAS],alive2.concat(alive2C));
			LBASPhase(jetLBAS,alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)?BAPI.data.api_air_base_injection:undefined);
			removeSunk(alive2); removeSunk(alive2C);
			removeSunk(subsalive2); removeSunk(subsalive2C);
			if (C) {
				BAPI.data.api_air_base_injection.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[jetLBAS.AS+2];
			}
			F2.AS = F2C.AS = 0;
		} else {
			if (C) delete BAPI.data.api_air_base_injection;
		}
	}
	
	//jet airstrike
	if (!NBonly && !bombing && alive1.length+subsalive1.length+alive2C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_injection_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,true,true);
		results.jetCost += calJetCost(alive1.concat(alive1C),alive2.concat(alive2C));
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_injection_kouku:undefined,true,false,true);
		if (C) {
			if (!BAPI.data.api_injection_kouku.api_stage1) BAPI.data.api_injection_kouku = null;
		}
		
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(alive2); removeSunk(alive2C);
	}
	
	//lbas
	if (LBASwaves && LBASwaves.length && !NBonly) {
		if (C) BAPI.data.api_air_base_attack = [];
		for (var i=0; i<LBASwaves.length; i++) LBASwaves[i]._currentSlots = LBASwaves[i].planecount.slice();
		for (var i=0; i<LBASwaves.length; i++) {
			if (LBASwaves[i].equips.length <= 0) continue;
			if (alive1.length+subsalive1.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
				LBASwaves[i].planecount = LBASwaves[i]._currentSlots.slice();
				compareAP(LBASwaves[i],F2,false,true,true);
				var LBAPI = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
				LBASPhase(LBASwaves[i],alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)?LBAPI:undefined);
				removeSunk(alive2); removeSunk(alive2C);
				removeSunk(subsalive2); removeSunk(subsalive2C);
				if (C) {
					LBAPI.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[LBASwaves[i].AS+2];
					BAPI.data.api_air_base_attack.push(LBAPI);
				}
			}
		}
		F2.AS = F2C.AS = 0;
	}

	// AS friend fleet
	if (!NBonly && friendFleet && friendFleet.friendType == 2 && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) logFriendFleetInfo(friendFleet,BAPI.data);
		if (C) BAPI.data.api_friendly_kouku = {api_stage_flag: [1,1,1], api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(friendFleet,F2,false,true);
		F2C.AS = F2.AS;
		airPhase(friendFleet.ships,[],alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_friendly_kouku:undefined,false,false,true);
		if (C) {
			if (BAPI.data.api_friendly_kouku.api_stage1) BAPI.data.api_friendly_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_friendly_kouku = null;
		}
		
		removeSunk(alive2);
		removeSunk(alive2C);	
		F2.AS = F2C.AS = 0;
	}
	
	//opening airstrike
	if (!NBonly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_kouku = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null,api_stage3_combined:null};
		compareAP(F1,F2,false,true);
		F1C.AS = F1.AS;
		F2C.AS = F2.AS;
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_kouku:undefined,false,bombing,true);
		if (C) {
			if (BAPI.data.api_kouku.api_stage1) BAPI.data.api_kouku.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
			else BAPI.data.api_kouku = null;
		}
		
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(alive2); removeSunk(alive2C);
	}
	
	//second airphase
	if (!NBonly && aironly && !bombing && alive1.length+subsalive1.length+alive2C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		compareAP(F1,F2,false,true);
		if (C) BAPI.data.api_kouku2 = {api_plane_from:[[-1],[-1]],api_stage1:null,api_stage2:null,api_stage3:null};
		airPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),(C)? BAPI.data.api_kouku2:undefined,false,false,true);
		if (C) {
			if (!BAPI.data.api_kouku2.api_stage1) delete BAPI.data.api_kouku2;
			else BAPI.data.api_kouku2.api_stage1.api_disp_seiku = {4:1,3:2,2:0,1:3,0:4}[F1.AS+2];
		}
		
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(alive2); removeSunk(alive2C);
	}
	
	//support phase
	if (Fsupport && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var chance = Fsupport.supportChance(Fsupport.supportBoss);
		if (Math.random() < chance) supportPhase(Fsupport.ships,alive2.concat(alive2C),subsalive2.concat(subsalive2C),Fsupport.supportType,BAPI,Fsupport.supportBoss);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}

	
	//opening asw
	if (MECHANICS.OASW && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		var attackers1 = [], order1 = [], attackers2 = [], order2 = [];
		for (var i=0; i<alive1C.length; i++) {
			if (alive1C[i].canOASW()) attackers1.push(alive1C[i]);
		}
		orderByRange(attackers1,order1);
		for (var i=0; i<alive2C.length; i++) {
			if (alive2C[i].canOASW()) attackers2.push(alive2C[i]);
		}
		orderByRange(attackers2,order2);
		
		if (order1.length+order2.length) {
			if (C) BAPI.data.api_opening_taisen = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
			var targets = {alive1:alive1,alive1C:alive1C,subsalive1:subsalive1,subsalive1C:subsalive1C,alive2:alive2,alive2C:alive2C,subsalive2:subsalive2,subsalive2C:subsalive2C};
			shellPhaseC(order1,order2,targets,(C)? BAPI.data.api_opening_taisen:undefined,true);
		}
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// opening torpedo
	if (!NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_opening_atack = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),true,(C)? BAPI.data.api_opening_atack : undefined,true);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}

	//calculate survival of enemy escort
	results.survival2C = [];
	ships2C.forEach((ship) => results.survival2C.push(ship.HP/ship.maxHP > .25));
	
	//shelling functions
	var shellRange = function(d1,d2,api_hou) {
		if (!NBonly && !aironly && d1.alive1f.length+d1.subsalive1f.length > 0 && d2.alive2f.length+d2.subsalive2f.length > 0) {
			var order1 = [], order2 = [];
			orderByRange(d1.ships1f,order1,d2.hasInstall2f);
			orderByRange(d2.alive2f,order2,d1.hasInstall1f);
			
			shellPhase(order1,order2,d1.alive1f,d1.subsalive1f,d2.alive2f,d2.subsalive2f,(C)? api_hou:undefined);
		}
	}
	
	var shellOrder = function(d1,d2,api_hou) {
		var d1length = d1.alive1f.length+d1.subsalive1f.length;
		if (d1.alive1fC) d1length += d1.alive1fC.length + d1.subsalive1fC.length;
		var d2length = d2.alive2f.length+d2.subsalive2f.length;
		if (d2.alive2fC) d2length += d2.alive2fC.length + d2.subsalive2fC.length;
		if (!NBonly && !aironly && d1length > 0 && d2length > 0) {
			var order1 = [], order2 = [];
			for (var i=0; i<d1.ships1f.length; i++) {
				if (!d2.hasInstall2f && d1.ships1f[i].isSub) continue;
				if (d1.ships1f[i].retreated) continue;
				if (d1.ships1f[i].canShell()) order1.push(d1.ships1f[i]);
			}
			for (var i=0; i<d2.ships2f.length; i++) {
				if (!d1.hasInstall1f && d2.ships2f[i].isSub) continue;
				if (d2.ships2f[i].retreated) continue;
				if (d2.ships2f[i].canShell()) order2.push(d2.ships2f[i]);
			}
			
			if (d1.alive1fC) {
				var targets = {alive1:d1.alive1f,alive1C:d1.alive1fC,subsalive1:d1.subsalive1f,subsalive1C:d1.subsalive1fC,alive2:d2.alive2f,alive2C:d2.alive2fC,subsalive2:d2.subsalive2f,subsalive2C:d2.subsalive2fC};
				shellPhaseC(order1,order2,targets,(C)? api_hou:undefined);
			} else {
				shellPhase(order1,order2,d1.alive1f,d1.subsalive1f,d2.alive2f,d2.subsalive2f,(C)? api_hou:undefined);
			}
		}
	}
	
	//recalculate fLoS before shelling because recon may have been shot down
	F1.clearFleetLoS();
	F1C.clearFleetLoS();
	F2.clearFleetLoS();
	F2C.clearFleetLoS();
	
	//shelling 1
	var d1M = {ships1f: ships1, alive1f: alive1, subsalive1f: subsalive1, hasInstall1f: hasInstall1};
	var d1E = {ships1f: ships1C, alive1f: alive1C, subsalive1f: subsalive1C, hasInstall1f: hasInstall1C};
	var d2M = {ships2f: ships2, alive2f: alive2, subsalive2f: subsalive2, hasInstall2f: hasInstall2};
	var d2E = {ships2f: ships2C, alive2f: alive2C, subsalive2f: subsalive2C, hasInstall2f: hasInstall2C};
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki1 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		// F1.basepowshell = F1.formation.shellbonus;
		// F2.basepowshell = F1.formation.shellbonus;
		F1.basepowshell = SIMCONSTS.shellEcMF || ((type==3)? -5 : 2); F2.basepowshell = SIMCONSTS.shellEcME || 10;
		F1.baseaccshell = SIMCONSTS.accEcMF || ((type==3)? 54 : 78); F2.baseaccshell = SIMCONSTS.accEcME || 90;
		shellRange(d1M, d2M, (C)? BAPI.data.api_hougeki1 : undefined);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	//shelling 2
	var d1A = {ships1f: ships1, alive1f: alive1, subsalive1f: subsalive1, alive1fC: alive1C, subsalive1fC: subsalive1C, hasInstall1f: hasInstall1||hasInstall1C};
	var d2A = {ships2f: ships2, alive2f: alive2, subsalive2f: subsalive2, alive2fC: alive2C, subsalive2fC: subsalive2C, hasInstall2f: hasInstall2||hasInstall2C};
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki2 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2) {
			// F1.basepowshell = F1.formation.shellbonus;
			// F2.basepowshell = F1.formation.shellbonus;
			F1.basepowshell = SIMCONSTS.shellEcMF || 2; F2.basepowshell = SIMCONSTS.shellEcME || 10;
			F1.baseaccshell = SIMCONSTS.accEcMF || 78; F2.baseaccshell = SIMCONSTS.accEcME || 90;
			if (doShell2) shellOrder(d1A, d2A, (C)? BAPI.data.api_hougeki2 : undefined);
		} else {
			// F1C.basepowshell = F1C.formation.shellbonus;
			// F2.basepowshell = F1C.formation.shellbonus;
			F1C.basepowshell = SIMCONSTS.shellEcEF || -5; F2C.basepowshell = SIMCONSTS.shellEcEE || -5;
			F1C.baseaccshell = SIMCONSTS.accEcEF || 67; F2C.baseaccshell = SIMCONSTS.accEcEE || 80;
			shellRange(d1E, d2E, (C)? BAPI.data.api_hougeki2 : undefined);
		}
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// closing torpedo for CTF/TTF
	if (type!=2 && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)? BAPI.data.api_raigeki:undefined,true);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	//shelling 3
	var d1A = {ships1f: ships1, alive1f: alive1, subsalive1f: subsalive1, alive1fC: alive1C, subsalive1fC: subsalive1C, hasInstall1f: hasInstall1||hasInstall1C};
	var d2A = {ships2f: ships2, alive2f: alive2, subsalive2f: subsalive2, alive2fC: alive2C, subsalive2fC: subsalive2C, hasInstall2f: hasInstall2||hasInstall2C};
	if (!NBonly) {
		if (C) BAPI.data.api_hougeki3 = {api_at_eflag:[-1],api_at_list:[-1],api_at_type:[-1],api_damage:[-1],api_df_list:[-1],api_cl_list:[-1]};
		if (type==2) {
			// F1C.basepowshell = F1C.formation.shellbonus;
			// F2.basepowshell = F1C.formation.shellbonus;
			F1C.basepowshell = SIMCONSTS.shellEcEF || -5; F2C.basepowshell = SIMCONSTS.shellEcEE || -5;
			F1C.baseaccshell = SIMCONSTS.accEcEF || 67; F2C.baseaccshell = SIMCONSTS.accEcEE || 80;
			shellRange(d1E, d2E, (C)? BAPI.data.api_hougeki3 : undefined);
		} else if (doShell2) {
			// F1.basepowshell = F1.formation.shellbonus;
			// F2.basepowshell = F1.formation.shellbonus;
			F1.basepowshell = SIMCONSTS.shellEcMF || ((type==3)? -5 : 2); F2.basepowshell = SIMCONSTS.shellEcME || 10;
			F1.baseaccshell = SIMCONSTS.accEcMF || ((type==3)? 54 : 78); F2.baseaccshell = SIMCONSTS.accEcME || 90;
			shellOrder(d1A, d2A, (C)? BAPI.data.api_hougeki3 : undefined);
		}
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}
	
	// closing torpedo for STF
	if (type==2 && !NBonly && !aironly && alive1.length+subsalive1.length+alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		if (C) BAPI.data.api_raigeki = {api_edam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_erai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_eydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fdam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_frai:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fydam:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_ecl:[-1,0,0,0,0,0,0,0,0,0,0,0,0],api_fcl:[-1,0,0,0,0,0,0,0,0,0,0,0,0]};
		torpedoPhase(alive1.concat(alive1C),subsalive1.concat(subsalive1C),alive2.concat(alive2C),subsalive2.concat(subsalive2C),false,(C)? BAPI.data.api_raigeki:undefined,true);
		removeSunk(alive1); removeSunk(alive1C);
		removeSunk(subsalive1); removeSunk(subsalive1C);
		removeSunk(alive2); removeSunk(alive2C);
		removeSunk(subsalive2); removeSunk(subsalive2C);
	}

	// update morale (day battle) https://twitter.com/Divinity__123/status/1447941762966867972
	if (MECHANICS.morale && !noupdate && !NBonly) {
		updateMoraleStart(ships1);
		updateMoraleStart(ships1C);
	}
	
	if (noupdate) {
		results.rankDay = getRank(ships1,ships2.concat(ships2C),ships1C);
		results.mvpDay = F1.getMVP();
		results.mvpDayC = F1C.getMVP();
		results.repairsDay = {};
		for (var i=0; i<ships1.length; i++) {
			if (ships1[i].repairs) results.repairsDay[i] = ships1[i].repairs.slice();
		}
		results.repairsDayC = {};
		for (var i=0; i<ships1C.length; i++) {
			if (ships1C[i].repairs) results.repairsDayC[i] = ships1C[i].repairs.slice();
		}
	}
	
	//friend fleet
	if ((doNB||NBonly) && friendFleet && friendFleet.friendType == 1 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		friendFleetPhase(friendFleet,F2,alive2.concat(alive2C),subsalive2.concat(subsalive2C),BAPI);
		removeSunk(alive2); removeSunk(subsalive2);
		removeSunk(alive2C); removeSunk(subsalive2C);
	}

	//calculate survival of enemy main
	results.survival2 = [];
	ships2.forEach((ship) => results.survival2.push(ship.HP > 0));
	
	//night battle
	var didNB = false;
	if ((doNB||NBonly) && alive1C.length+subsalive1C.length > 0 && alive2.length+subsalive2.length+alive2C.length+subsalive2C.length > 0) {
		didNB = !NBonly;
		var count = 0, allsunk = true; count2 = 0;
		for (var i=0; i<ships2.length; i++) if (ships2[i].HP > 0) { allsunk = false; break; }
		for (var i=0; i<ships2C.length; i++) {
			let point = 0;
			if (ships2C[i].HP/ships2C[i].maxHP > .5) point = 1;
			else if (ships2C[i].HP/ships2C[i].maxHP > .25) point = ships2C[i].isPT? .5: .7;
			count += point;
			if (ships2C[i].HP > 0) count2 += 1;
		}
		if (ships2C[0].HP > 0) count += 1;
		var fightescort = (allsunk || count >= 3 || count2 >= 5);
		if (fightescort) results.didNBescort = true;
		
		var order1 = [], order2 = [];
		for (var i=0; i<ships1C.length; i++) {
			order1.push(ships1C[i]);
		}
		if (fightescort) {
			for (var i=0; i<ships2C.length; i++) {
				order2.push(ships2C[i]);
			}
		} else {
			for (var i=0; i<ships2.length; i++) {
				order2.push(ships2[i]);
			}
		}	
		
		if (C) {
			if (!BAPI.yasen) BAPI.yasen = {};
			BAPI.yasen.api_hougeki = {api_at_list:[-1],api_damage:[-1],api_df_list:[-1],api_sp_list:[-1],api_cl_list:[-1],api_n_mother_list:[-1]};
			if (NEWFORMAT) {
				formatRemovePadding(BAPI.yasen.api_hougeki);
				BAPI.yasen.api_hougeki.api_at_eflag = [];
			}
			BAPI.yasen.api_flare_pos = [-1,-1];
			BAPI.yasen.api_touch_plane = [-1,-1];
			let n = (fightescort)? 2 : 1;
			BAPI.yasen.api_active_deck = [1,n];
			if (!NBonly) BAPI.yasen.api_ship_ke_combined = [];
		}

		if (fightescort) nightPhase(order1,order2,alive1C,subsalive1C,alive2C,subsalive2C,NBonly,(C)? BAPI.yasen:undefined);
		else nightPhase(order1,order2,alive1C,subsalive1C,alive2,subsalive2,NBonly,(C)? BAPI.yasen:undefined);

		// update morale (night battle) https://twitter.com/Divinity__123/status/1447941762966867972
		if (MECHANICS.morale && !noupdate) {
			updateMoraleStart(ships1,true);
			updateMoraleStart(ships1C,true)
		}
	}
	
	//results
	if (!noupdate) {
		// var subonly = true;
		// for (var j=0; j<ships2.length; j++) if (ships2[j].type != 'SS') subonly = false;
		updateSupply(ships1,didNB,NBonly,bombing,noammo,true);
		updateSupply(ships1C,didNB,NBonly,bombing,noammo,true);
	}
	
	
	results.rank = (bombing)? getRankRaid(ships1) : getRank(ships1,ships2.concat(ships2C),ships1C);
	
	results.redded = false;
	results.flagredded = (ships1[0].HP/ships1[0].maxHP <= .25);
	results.reddedIndiv = [false,false,false,false,false];
	results.reddedIndivC = [false,false,false,false,false];
	results.flagsunk = (ships2[0].HP <= 0);
	results.undamaged = true;
	results.buckets = 0;
	results.repairCost1 = 0;
	results.repairCost2 = 0;
	for (var i=0; i<ships1.length; i++) {
		if (ships1[i].HP/ships1[i].maxHP <= .25) {
			results.redded = true;
			results.reddedIndiv[i] = true;
			if (!ships1[i].isflagship) ships1[i].protection = false;
		}
		if (ships1[i].HP/ships1[i].maxHP <= .5) results.undamaged = false;
		if (ships1[i].HP/ships1[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1[i]) > BUCKETTIME) results.buckets++;
		if (ships1[i].repairSpent) {
			results.repairCost1 += ships1[i].repairSpent == 1;
			results.repairCost2 += ships1[i].repairSpent == 2;
			delete ships1[i].repairSpent;
		}
	}
	for (var i=0; i<ships1C.length; i++) {
		if (ships1C[i].HP/ships1C[i].maxHP <= .25) {
			if (!ships1C[i].isflagship) results.redded = true; //don't count escort flag taiha as retreat
			results.reddedIndivC[i] = true;
			if (!ships1C[i].isflagship) ships1C[i].protection = false;
		}
		if (ships1C[i].HP/ships1C[i].maxHP <= .5) results.undamaged = false;
		if (ships1C[i].HP/ships1C[i].maxHP <= BUCKETPERCENT || getRepairTime(ships1C[i]) > BUCKETTIME) results.buckets++;
		if (ships1C[i].repairSpent) {
			results.repairCost1 += ships1C[i].repairSpent == 1;
			results.repairCost2 += ships1C[i].repairSpent == 2;
			delete ships1C[i].repairSpent;
		}
	}
	results.MVP = F1.getMVP();
	results.MVPC = F1C.getMVP();
	results.sinkFlagship = F1.getSinkFlagship();
	results.sinkFlagshipC = F1C.getSinkFlagship();
	results.dmgTotals = F1.DMGTOTALS;
	results.dmgTotalsC = F1C.DMGTOTALS;
	if (didNB) results.didNB = true;
	
	//update morale (post battle)
	if (MECHANICS.morale && !noupdate) {
		updateMorale(ships1,results.rank,((didNB)? 0 : results.MVP));
		updateMorale(ships1C,results.rank,results.MVPC);
	}
	
	return results;
}

function emergencyRepair(fleet){
    if (!fleet.combinedWith) return;
    if (fleet.isescort) fleet = fleet.combinedWith;
    let ships0 = fleet.ships; 
    let ships1 = fleet.combinedWith.ships;
    let ships = ships0.concat(ships1);
    
    let akashi = ships.find((ship, i) => i > 0 && ship.mid == 187 && ship.HP/ship.maxHP > .5);
    let akitsushima = ships.find((ship, i) => i > 0 && ship.mid == 450 && ship.HP/ship.maxHP > .5);
    if (akashi === undefined && akitsushima === undefined) return;

    let srfs = [false, false, false, false];
    if (akashi !== undefined && akashi.equips){
        akashi.equips.forEach((eq, i) => srfs[i] = eq.type == SRF);
        ships0.forEach((ship, i) => {
            if (ship.HP/ship.maxHP > .25 && srfs[Math.floor(i / 3)]) {
                ship.HP = Math.min(Math.ceil(ship.HP + 0.3 * ship.maxHP), ship.maxHP);
                ship.morale = Math.min(ship.morale + 7, 100);
            } 
        });
        ships1.forEach((ship, i) => {
            if (ship.HP/ship.maxHP > .25 && srfs[Math.floor(i / 3) + 2]) {
                ship.HP = Math.min(Math.ceil(ship.HP + 0.3 * ship.maxHP), ship.maxHP);
                ship.morale = Math.min(ship.morale + 7, 100);
            }
        });
    }else if (akitsushima.equips){
        akitsushima.equips.forEach((eq, i) => srfs[i] = eq.type == SRF);
        ships1.forEach((ship, i) => {
            if (ship.HP/ship.maxHP > .25 && srfs[Math.floor(i / 3)]) {
                ship.HP = Math.min(Math.ceil(ship.HP + 0.25 * ship.maxHP), ship.maxHP);
                ship.morale = Math.min(ship.morale + 7, 100);
            } 
        });
    }
}