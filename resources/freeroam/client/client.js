import * as alt from 'alt-client';
import * as native from 'natives';

alt.setWeatherSyncActive(true);

alt.onServer('warp', (player, vehicle, seat) => {
    native.taskWarpPedIntoVehicle(player, vehicle, seat);
});

alt.onServer('log:pos', (pos) => {
    console.log(pos.x, pos.y, pos.z);
});

alt.onServer('settime', args => {
    let hh;
    let mm;
    let ss;
    
    if(args[0]){
        hh = JSON.parse(args[0]);
    } else {
        hh = 0;
    }
    
    if(args[1]){
        mm = JSON.parse(args[1]);
    } else {
        mm = 0;
    }
    
    if(args[2]){
        ss = JSON.parse(args[2]);
    } else {
        ss = 0;
    }
    alt.log(`Set Time to: ${hh} ${mm} ${ss}`);
    native.setClockTime(hh,mm,ss)
});

alt.onServer('pausetime', () => {
    if (native.pauseClock(true)){
        native.pauseClock(false);
    }
    if (native.pauseClock(false)){
        native.pauseClock(true);
    }
});

alt.onServer('warp', (player, vehicle, seat) => {
    native.taskWarpPedIntoVehicle(player, vehicle, seat);
});

alt.onServer('drawNotification', (imageName, headerMsg, detailsMsg, message) =>{
    drawNotification(imageName, headerMsg, detailsMsg, message);
});

export function drawNotification(imageName, headerMsg, detailsMsg, message) {
    native.beginTextCommandThefeedPost('STRING');
    native.addTextComponentSubstringPlayerName(message);
    native.endTextCommandThefeedPostMessagetextTu(
        imageName.toUpperCase(),
        imageName.toUpperCase(),
        false,
        4,
        headerMsg,
        detailsMsg,
        1.0,
        ''
    );
    native.endTextCommandThefeedPostTicker(false, false);
}

//Load Cayo
alt.on('connectionComplete', () => {
    let blip = native.addBlipForCoord(5943.5679611650485, -6272.114833599767, 2); // a invisible blip to make the map clickable at the island
    native.setBlipSprite(blip, 407);
    native.setBlipScale(blip, 0);
    native.setBlipAsShortRange(blip, false);

    alt.requestIpl('h4_islandairstrip');
    alt.requestIpl('h4_islandairstrip_props');
    alt.requestIpl('h4_islandx_mansion');
    alt.requestIpl('h4_islandx_mansion_props');
    alt.requestIpl('h4_islandx_props');
    alt.requestIpl('h4_islandxdock');
    alt.requestIpl('h4_islandxdock_props');
    alt.requestIpl('h4_islandxdock_props_2');
    alt.requestIpl('h4_islandxtower');
    alt.requestIpl('h4_islandx_maindock');
    alt.requestIpl('h4_islandx_maindock_props');
    alt.requestIpl('h4_islandx_maindock_props_2');
    alt.requestIpl('h4_IslandX_Mansion_Vault');
    alt.requestIpl('h4_islandairstrip_propsb');
    alt.requestIpl('h4_beach');
    alt.requestIpl('h4_beach_props');
    alt.requestIpl('h4_beach_bar_props');
    alt.requestIpl('h4_islandx_barrack_props');
    alt.requestIpl('h4_islandx_checkpoint');
    alt.requestIpl('h4_islandx_checkpoint_props');
    alt.requestIpl('h4_islandx_Mansion_Office');
    alt.requestIpl('h4_islandx_Mansion_LockUp_01');
    alt.requestIpl('h4_islandx_Mansion_LockUp_02');
    alt.requestIpl('h4_islandx_Mansion_LockUp_03');
    alt.requestIpl('h4_islandairstrip_hangar_props');
    alt.requestIpl('h4_IslandX_Mansion_B');
    alt.requestIpl('h4_islandairstrip_doorsclosed');
    alt.requestIpl('h4_Underwater_Gate_Closed');
    alt.requestIpl('h4_mansion_gate_closed');
    alt.requestIpl('h4_aa_guns');
    alt.requestIpl('h4_IslandX_Mansion_GuardFence');
    alt.requestIpl('h4_IslandX_Mansion_Entrance_Fence');
    alt.requestIpl('h4_IslandX_Mansion_B_Side_Fence');
    alt.requestIpl('h4_IslandX_Mansion_Lights');
    alt.requestIpl('h4_islandxcanal_props');
    alt.requestIpl('h4_beach_props_party');
    alt.requestIpl('h4_islandX_Terrain_props_06_a');
    alt.requestIpl('h4_islandX_Terrain_props_06_b');
    alt.requestIpl('h4_islandX_Terrain_props_06_c');
    alt.requestIpl('h4_islandX_Terrain_props_05_a');
    alt.requestIpl('h4_islandX_Terrain_props_05_b');
    alt.requestIpl('h4_islandX_Terrain_props_05_c');
    alt.requestIpl('h4_islandX_Terrain_props_05_d');
    alt.requestIpl('h4_islandX_Terrain_props_05_e');
    alt.requestIpl('h4_islandX_Terrain_props_05_f');
    alt.requestIpl('H4_islandx_terrain_01');
    alt.requestIpl('H4_islandx_terrain_02');
    alt.requestIpl('H4_islandx_terrain_03');
    alt.requestIpl('H4_islandx_terrain_04');
    alt.requestIpl('H4_islandx_terrain_05');
    alt.requestIpl('H4_islandx_terrain_06');
    alt.requestIpl('h4_ne_ipl_00');
    alt.requestIpl('h4_ne_ipl_01');
    alt.requestIpl('h4_ne_ipl_02');
    alt.requestIpl('h4_ne_ipl_03');
    alt.requestIpl('h4_ne_ipl_04');
    alt.requestIpl('h4_ne_ipl_05');
    alt.requestIpl('h4_ne_ipl_06');
    alt.requestIpl('h4_ne_ipl_07');
    alt.requestIpl('h4_ne_ipl_08');
    alt.requestIpl('h4_ne_ipl_09');
    alt.requestIpl('h4_nw_ipl_00');
    alt.requestIpl('h4_nw_ipl_01');
    alt.requestIpl('h4_nw_ipl_02');
    alt.requestIpl('h4_nw_ipl_03');
    alt.requestIpl('h4_nw_ipl_04');
    alt.requestIpl('h4_nw_ipl_05');
    alt.requestIpl('h4_nw_ipl_06');
    alt.requestIpl('h4_nw_ipl_07');
    alt.requestIpl('h4_nw_ipl_08');
    alt.requestIpl('h4_nw_ipl_09');
    alt.requestIpl('h4_se_ipl_00');
    alt.requestIpl('h4_se_ipl_01');
    alt.requestIpl('h4_se_ipl_02');
    alt.requestIpl('h4_se_ipl_03');
    alt.requestIpl('h4_se_ipl_04');
    alt.requestIpl('h4_se_ipl_05');
    alt.requestIpl('h4_se_ipl_06');
    alt.requestIpl('h4_se_ipl_07');
    alt.requestIpl('h4_se_ipl_08');
    alt.requestIpl('h4_se_ipl_09');
    alt.requestIpl('h4_sw_ipl_00');
    alt.requestIpl('h4_sw_ipl_01');
    alt.requestIpl('h4_sw_ipl_02');
    alt.requestIpl('h4_sw_ipl_03');
    alt.requestIpl('h4_sw_ipl_04');
    alt.requestIpl('h4_sw_ipl_05');
    alt.requestIpl('h4_sw_ipl_06');
    alt.requestIpl('h4_sw_ipl_07');
    alt.requestIpl('h4_sw_ipl_08');
    alt.requestIpl('h4_sw_ipl_09');
    alt.requestIpl('h4_islandx_mansion');
    alt.requestIpl('h4_islandxtower_veg');
    alt.requestIpl('h4_islandx_sea_mines');
    alt.requestIpl('h4_islandx');
    alt.requestIpl('h4_islandx_barrack_hatch');
    alt.requestIpl('h4_islandxdock_water_hatch');
    alt.requestIpl('h4_beach_party');
    alt.requestIpl('h4_mph4_terrain_01_grass_0');
    alt.requestIpl('h4_mph4_terrain_01_grass_1');
    alt.requestIpl('h4_mph4_terrain_02_grass_0');
    alt.requestIpl('h4_mph4_terrain_02_grass_1');
    alt.requestIpl('h4_mph4_terrain_02_grass_2');
    alt.requestIpl('h4_mph4_terrain_02_grass_3');
    alt.requestIpl('h4_mph4_terrain_04_grass_0');
    alt.requestIpl('h4_mph4_terrain_04_grass_1');
    alt.requestIpl('h4_mph4_terrain_04_grass_2');
    alt.requestIpl('h4_mph4_terrain_04_grass_3');
    alt.requestIpl('h4_mph4_terrain_05_grass_0');
    alt.requestIpl('h4_mph4_terrain_06_grass_0');
    alt.requestIpl('h4_mph4_airstrip_interior_0_airstrip_hanger');
});

let nearIsland = false;

alt.everyTick(() => {
    let distance = alt.Player.local.pos.distanceTo(new alt.Vector3(4840.571, -5174.425, 2.0));

    if (distance < 2000) {
        if (!nearIsland) {
            nearIsland = true;
            native.setScenarioGroupEnabled('Heist_Island_Peds', true);
            native.setAudioFlag('PlayerOnDLCHeist4Island', true);
            native.setAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Zones', true, true);
            native.setAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Disabled_Zones', false, true);
            native.setDeepOceanScaler(0.1);
        }
    } else {
        if (nearIsland) {
            nearIsland = false;
            native.setScenarioGroupEnabled('Heist_Island_Peds', false);
            native.setAudioFlag('PlayerOnDLCHeist4Island', false);
            native.setAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Zones', false, false);
            native.setAmbientZoneListStatePersistent('AZL_DLC_Hei4_Island_Disabled_Zones', false, false);
            native.resetDeepOceanScaler();
        }
    }

    if (nearIsland) {
        native.setRadarAsExteriorThisFrame();
        native.setRadarAsInteriorThisFrame(alt.hash('h4_fake_islandx'), 4700.0, -5145.0, 0, 0);
    }
});

function attachObjectToPlayer2(player, boneId, objectName, positionX, positionY, positionZ, rotationX, rotationY, rotationZ) {
    removeObjectFromPlayer(alt.Player.local);
    let hashOfProp = native.getHashKey(objectName);

    native.requestModel(hashOfProp);
    const modelLoadInterval = alt.setInterval(() => {
        if (native.hasModelLoaded(hashOfProp)) {
            alt.clearInterval(modelLoadInterval);
        } 
    }, 100);

    let newObject = native.createObject(hashOfProp, player.pos.x, player.pos.y, player.pos.z, true, true, true);

    // Release memory for model
    native.setModelAsNoLongerNeeded(hashOfProp);
    
    let boneIndex = native.getPedBoneIndex(player.scriptID, Number(boneId)); 

    if (newObject) {
        native.setPedCurrentWeaponVisible(player.scriptID, false, true, true, true);

        native.attachEntityToEntity(newObject, player.scriptID, boneIndex, Number(positionX), Number(positionY), Number(positionZ), 
            Number(rotationX), Number(rotationY), Number(rotationZ), false, false, false, false, 1, true);  
    }
}

alt.onServer('attach:weapon', (bone, weapon, pos_x, pos_y, pos_z, rot_x, rot_y, rot_z) => {
    attachObjectToPlayer2(alt.Player.local, bone, weapon, pos_x, pos_y, pos_z, rot_x, rot_y, rot_z);
});
/*
alt.on('keyup', key => {
    if(key == 69){
        attachObjectToPlayer2(alt.Player.local, "24818", "w_ar_carbinerifle", 0.13, -0.16, 0, 180, -155, 0);
        attachObjectToPlayer2(alt.Player.local, "23553", "w_pi_pistolmk2", 0, 0, -0.22, 90, 0, 180);
    }
});*/