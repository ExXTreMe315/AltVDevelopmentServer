import * as alt from 'alt-server';
import * as chat from 'chat';

const weapons = [
    "dagger",
    "bat",
    "bottle",
    "crowbar",
    "flashlight",
    "golfclub",
    "hammer",
    "hatchet",
    "knuckle",
    "knife",
    "machete",
    "switchblade",
    "nightstick",
    "wrench",
    "battleaxe",
    "poolcue",
    "stone_hatchet",
    "pistol",
    "pistol_mk2",
    "combatpistol",
    "appistol",
    "stungun",
    "pistol50",
    "snspistol",
    "snspistol_mk2",
    "heavypistol",
    "vintagepistol",
    "flaregun",
    "marksmanpistol",
    "revolver",
    "revolver_mk2",
    "doubleaction",
    "raypistol",
    "ceramicpistol",
    "navyrevolver",
    "gadgetpistol",
    "weapon_stungun_mp",
    "microsmg",
    "smg",
    "smg_mk2",
    "assaultsmg",
    "combatpdw",
    "machinepistol",
    "minismg",
    "raycarbine",
    "pumpshotgun",
    "pumpshotgun_mk2",
    "sawnoffshotgun",
    "assaultshotgun",
    "bullpupshotgun",
    "musket",
    "heavyshotgun",
    "dbshotgun",
    "autoshotgun",
    "combatshotgun",
    "assaultrifle",
    "assaultrifle_mk2",
    "carbinerifle",
    "carbinerifle_mk2",
    "advancedrifle",
    "specialcarbine",
    "specialcarbine_mk2",
    "bullpuprifle",
    "bullpuprifle_mk2",
    "compactrifle",
    "militaryrifle",
    "heavyrifle",
    "tacticalrifle",
    "mg",
    "combatmg",
    "combatmg_mk2",
    "gusenberg",
    "sniperrifle",
    "heavysniper",
    "heavysniper_mk2",
    "marksmanrifle",
    "marksmanrifle_mk2",
    "precisionrifle",
    "rpg",
    "grenadelauncher",
    "grenadelauncher_smoke",
    "minigun",
    "firework",
    "railgun",
    "hominglauncher",
    "compactlauncher",
    "rayminigun",
    "emplauncher",
    "grenade",
    "bzgas",
    "smokegrenade",
    "flare",
    "molotov",
    "stickybomb",
    "proxmine",
    "snowball",
    "pipebomb",
    "ball",
    "petrolcan",
    "parachute",
    "fireextinguisher",
    "hazardcan",
    "fertilizercan",
];

const BodyParts = [
    "Pelvis",
    "LeftHip",
    "LeftLeg",
    "LeftFoot",
    "RightHip",
    "RightLeg",
    "RightFoot",
    "LowerTorso",
    "UpperTorso",
    "Chest",
    "UnderNeck",
    "LeftShoulder",
    "LeftUpperArm",
    "LeftElbrow",
    "LeftWrist",
    "RightShoulder",
    "RightUpperArm",
    "RightElbrow",
    "RightWrist",
    "Neck",
    "Head"
];

//=> Player Connect
alt.on('playerConnect', handleConnect);
alt.on('playerDeath', handleDeath);
alt.on('beforePlayerConnect', handleBeforeConnect);

/**
 * @param {alt.Player} player
 */

function handleConnect(player) {
    alt.log(`${player.name} connected to the Server`)

    //player.spawn(4486, -4458, 4, 500); // Spawns after 0,5 second at Cayo Perico
    //player.spawn(1674, 2535, 45, 500); // Spawns after 0,5 second in the Prison
    //player.spawn(-2155, 3160, 32, 500); // Spawns after 0,5 second at Fort Zancudo
    //player.spawn(918, 34, 112, 500); // Spawns after 0,5 second at Casino Roof
    //player.spawn(-373.92, -125.55, 38.66, 500); // Spawns after 0,5 second at LSC
    //player.spawn(593, 2725, 42); // Spawns after 0,5 second at Harmony
    //player.spawn(127, -1000, 29); // Spawns after 0,5 second am Stadtpark
    //player.spawn(-556, -228, 38.25); // Spawns after 0,5 second am DOJ
    player.spawn(607.12, 0.58, 70.61); // Spawns after 0,5 second at VPD
    player.model = `mp_m_freemode_01`;
}

function handleBeforeConnect(connectionInfo){
    if(connectionInfo.branch != "release") player.kick("Wrong Alt:V Version. Please use release"); 
}

//=> Player Death
export const deadPlayers = {};
const TimeBetweenRespawn = 1000; // 1 Seconds

function handleDeath(player) {
    if (deadPlayers[player.id]) {
        return;
    }

    deadPlayers[player.id] = alt.setTimeout(() => {
        // Check if the player still has an entry.
        if (deadPlayers[player.id]) {
            delete deadPlayers[player.id];
        }

        // Check if the player hasn't just left the server yet.
        if (!player || !player.valid) {
            return;
        }

        player.spawn(607.12, 0.58, 70.61, 5000); // Respawn the player.
    }, TimeBetweenRespawn);
}

//=> Command's

//> Position
chat.registerCmd('pos', (player) => {
    chat.send(player, `${JSON.stringify(player.pos)}`);
    console.log(player.pos);
    alt.emitClient(player, 'log:pos', player.pos)
});

chat.registerCmd('rot', (player) => {
    chat.send(player, `${JSON.stringify(player.rot)}`);
    console.log(player.rot);
});

//> Veh Spawn
chat.registerCmd("veh", (player, args) => {
    if (args.length === 0) {
      chat.send(player, "Usage: /veh (vehicleModel)");
      return;
    }
    try {
      let vehicle = new alt.Vehicle(args[0], player.pos.x+2, player.pos.y+2, player.pos.z+0.5, player.rot.x, player.rot.y, player.rot.z);
      /*alt.setTimeout(() => {
        alt.emitClient(player, 'warp', player, vehicle, -1);
      }, 200)*/
    } catch (e) {
      chat.send(player, `{ff0000} Vehicle Model {ff9500}${args[0]} {ff0000}does not exist..`);
      alt.log(e);
    }
});

chat.registerCmd("del", (player) => {
    if(player.vehicle) {
        player.vehicle.destroy();
    } else {
        chat.send(player, "You are not in a Vehicle");

    } 
});
  
chat.registerCmd("repair", (player) => {
    if(player.vehicle) {
        player.vehicle.repair();
    } else {
        chat.send(player, "You are not in a Vehicle");
        return;
    }
});

chat.registerCmd("weapon", (player, args) => {
    if (args.length === 0) {
        chat.send(player, "Usage: /weapon (modelName)");
        return;
    }
    player.giveWeapon(alt.hash("weapon_" + args[0]), 500, true);
});
  
chat.registerCmd("weapons", (player, args) => {
    for (let weapon of weapons) {
        player.giveWeapon(alt.hash("weapon_" + weapon), 500, true);
    }
});

chat.registerCmd("settime", (player, args) => {
    alt.emitAllClients('settime', args);
});

chat.registerCmd("pausetime", (player, args) => {
    alt.emitAllClients('pausetime');
});

chat.registerCmd("dlc", (player, args) => {
    let component = JSON.parse(args[0]);
    let drawable = JSON.parse(args[1]);
    let texture = JSON.parse(args[2]);
    let dlc = args[3];
    player.setDlcClothes(alt.hash(dlc), component, drawable, texture)
});

chat.registerCmd("modd", (player, args) => {
    let vehicle = player.vehicle;
    
    let id0 = JSON.parse(args[0]);
    let id1 = JSON.parse(args[1]);

    vehicle.modKit = 1;
    vehicle.setMod(id0, id1);
});

//=> Test
alt.on('weaponDamage', (attacker, victim, weaponHash, damage, offset, bodyPart) => {
    if (weaponHash === 0x787F0BB) {
        alt.log(victim.health);
        victim.health = victim.health-1
        alt.log(victim.health);
    }
});

alt.on('weaponDamage', (attacker, victim, weaponHash, damage, offset, bodyPart) => {
    if (weaponHash === 0x83BF0278) {
        if(bodyPart == 20){
            victim.health = victim.health-100
        } else {
            victim.health = victim.health-25

        }
    }
});

alt.on('weaponDamage', (attacker, victim, weaponHash, damage, offset, bodyPart) => {
    alt.log(BodyParts[bodyPart]);
    alt.log(attacker, victim, weaponHash, damage, offset, bodyPart);
});

alt.on('playerWeaponChange', (player, oldWeapon, weapon) => {
    //Carbinerifle
    if(weapon === 0x83BF0278) {
        let bone = "24818";
        let weapon = "w_ar_carbinerifle";
        alt.emitClient(player,'deattach:weapon' , bone, weapon)
    }
    if(oldWeapon === 0x83BF0278) {
        let bone = "24818";
        let weapon = "w_ar_carbinerifle";
        let pos_x = 0.13;
        let pos_y = -0.16;
        let pos_z = 0;
        let rot_x = 180;
        let rot_y = -155;
        let rot_z = 0;
        alt.emitClient(player,'attach:weapon' , bone, weapon, pos_x, pos_y, pos_z, rot_x, rot_y, rot_z);
    }
    //Pistol Mk2
    if(weapon === 0xBFE256D4) {
        alt.emitClient(player,'deattach:weapon' , bone, weapon)
    }
    if(oldWeapon === 0xBFE256D4) {
        let bone = "23553";
        let weapon = "w_pi_pistolmk2";
        let pos_x = 0;
        let pos_y = 0;
        let pos_z = -0.22;
        let rot_x = 90;
        let rot_y = 0;
        let rot_z = 180;
        alt.emitClient(player,'attach:weapon' , bone, weapon, pos_x, pos_y, pos_z, rot_x, rot_y, rot_z)
    }
});

//=> Default Functions
/**
 * Get all players in a certain range of a position.
 * @param  {} pos
 * @param  {} range
 * @param  {} dimension=0
 * @returns {Array<alt.Player>}
 */
 export function getPlayersInRange(pos, range, dimension = 0) {
    if (pos === undefined || range === undefined) {
        throw new Error('GetPlayersInRange => pos or range is undefined');
    }

    return alt.Player.all.filter(player => {
        return player.dimension === dimension && distance2d(pos, player.pos) <= range;
    });
}

/**
 * Get the forward vector of a player.
 * @param  {} rot
 * @returns {{x,y,z}}
 */
export function getForwardVectorServer(rot) {
    const z = -rot.z;
    const x = rot.x;
    const num = Math.abs(Math.cos(x));
    return {
        x: -Math.sin(z) * num,
        y: Math.cos(z) * num,
        z: Math.sin(x)
    };
}

/**
 * Get the distance from one vector to another.
 * Does take Z-Axis into consideration.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {number}
 */
export function distance(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    );
}

/**
 * Get the distance from one vector to another.
 * Does not take Z-Axis into consideration.
 * @param  {} vector1
 * @param  {} vector2
 * @returns {{x,y,z}}
 */
export function distance2d(vector1, vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

/**
 * Check if a position is between two vectors.
 * @param  {} pos
 * @param  {} vector1
 * @param  {} vector2
 * @returns {boolean}
 */
export function isBetween(pos, vector1, vector2) {
    const validX = pos.x > vector1.x && pos.x < vector2.x;
    const validY = pos.y > vector1.y && pos.y < vector2.y;
    return validX && validY ? true : false;
}

/**
 * Get a random position around a position.
 * @param  {} position
 * @param  {} range
 * @returns {{x,y,z}}
 */
export function randomPositionAround(position, range) {
    return {
        x: position.x + Math.random() * (range * 2) - range,
        y: position.y + Math.random() * (range * 2) - range,
        z: position.z
    };
}

/**
 * Get the closest vector from a group of vectors.
 * @param  {alt.Vector3} pos
 * @param  {Array<{x,y,z}> | Array<{pos:alt.Vector3}} arrayOfPositions
 * @returns {Array<any>}
 */
export function getClosestVectorFromGroup(pos, arrayOfPositions) {
    arrayOfPositions.sort((a, b) => {
        if (a.pos && b.pos) {
            return distance(pos, a.pos) - distance(pos, b.pos);
        }

        return distance(pos, a.pos) - distance(pos, b.pos);
    });

    return arrayOfPositions[0];
}

/**
 * Get the closest player to a player.
 * @param  {} player
 * @returns {Array<alt.Player>}
 */
export function getClosestPlayer(player) {
    return getClosestVectorFromGroup(player.pos, [...alt.Player.all]);
}

/**
 * Get the closest vehicle to a player.
 * @param  {alt.Vector3} player
 * @returns {Array<alt.Vehicle>}
 */
export function getClosestVehicle(player) {
    return getClosestVectorFromGroup(player.pos, [...alt.Vehicle.all]);
}