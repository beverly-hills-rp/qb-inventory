const payload = {
	"action": "open",
	"slots": 41,
	"maxammo": {
		"pistol": 250,
		"shotgun": 200,
		"rifle": 250,
		"smg": 250
	},
	"maxweight": 120000,
	"inventory": [
		{
			"useable": false,
			"unique": true,
			"label": "Phone",
			"amount": 1,
			"shouldClose": false,
			"slot": 1,
			"info": [],
			"description": "Neat phone ya got there",
			"image": "phone.png",
			"type": "item",
			"name": "phone",
			"weight": 700
		},
		{
			"useable": true,
			"unique": true,
			"label": "ID Card",
			"amount": 1,
			"shouldClose": false,
			"slot": 2,
			"info": {
				"gender": 0,
				"citizenid": "CPU60525",
				"firstname": "Felipe",
				"birthdate": "2001-01-01",
				"lastname": "Meneses",
				"nationality": "Brazil"
			},
			"description": "A card containing all your information to identify yourself",
			"image": "id_card.png",
			"type": "item",
			"name": "id_card",
			"weight": 0
		},
		{
			"useable": true,
			"unique": true,
			"label": "Drivers License",
			"amount": 1,
			"shouldClose": false,
			"slot": 3,
			"info": {
				"lastname": "Meneses",
				"birthdate": "2001-01-01",
				"type": "Class C Driver License",
				"firstname": "Felipe"
			},
			"description": "Permit to show you can drive a vehicle",
			"image": "driver_license.png",
			"type": "item",
			"name": "driver_license",
			"weight": 0
		},
		{
			"useable": false,
			"unique": true,
			"label": "Walther P99",
			"amount": 1,
			"slot": 4,
			"type": "weapon",
			"description": "A small firearm designed to be held in one hand",
			"image": "weapon_pistol.png",
			"name": "weapon_pistol",
			"weight": 1000,
			"info": {
				"ammo": 17,
				"serie": "68Fsw7sf896uWka",
				"quality": 95.3499999999998,
				"attachments": [
					{
						"label": "Flashlight",
						"component": "COMPONENT_AT_PI_FLSH"
					}
				]
			}
		},
		{
			"useable": true,
			"unique": true,
			"label": "Widowmaker",
			"amount": 1,
			"slot": 5,
			"type": "weapon",
			"description": "Weapon Rayminigun",
			"image": "weapon_rayminigun.png",
			"name": "weapon_rayminigun",
			"weight": 1000,
			"info": {
				"ammo": 0,
				"serie": "30CGp0ad758KJNF",
				"quality": 100
			}
		},
		{
			"useable": true,
			"unique": false,
			"label": "Pistol ammo",
			"amount": 1,
			"shouldClose": true,
			"slot": 6,
			"info": [],
			"description": "Ammo for Pistols",
			"image": "pistol_ammo.png",
			"type": "item",
			"name": "pistol_ammo",
			"weight": 200
		},
		{
			"useable": true,
			"unique": false,
			"label": "Cola",
			"amount": 11,
			"shouldClose": true,
			"slot": 7,
			"info": [],
			"description": "For all the thirsty out there",
			"image": "cola.png",
			"type": "item",
			"name": "kurkakola",
			"weight": 500
		},
		{
			"useable": true,
			"unique": false,
			"label": "Heavy Armor",
			"amount": 1,
			"shouldClose": true,
			"slot": 8,
			"info": [],
			"description": "Some protection won't hurt... right?",
			"image": "armor.png",
			"type": "item",
			"name": "heavyarmor",
			"weight": 5000
		},
		{
			"useable": true,
			"unique": false,
			"label": "Stormram",
			"amount": 1,
			"shouldClose": true,
			"slot": 9,
			"info": [],
			"description": "A nice tool to break into doors",
			"image": "police_stormram.png",
			"type": "item",
			"name": "police_stormram",
			"weight": 18000
		},
		null,
		{
			"useable": false,
			"unique": true,
			"label": "Flashlight",
			"amount": 1,
			"slot": 11,
			"type": "weapon",
			"description": "A battery-operated portable light",
			"image": "weapon_flashlight.png",
			"name": "weapon_flashlight",
			"weight": 1000,
			"info": {
				"ammo": 0,
				"serie": "18gTC1uF360UoOu",
				"quality": 100
			}
		},
		{
			"useable": true,
			"unique": false,
			"label": "SMG ammo",
			"amount": 2,
			"shouldClose": true,
			"slot": 12,
			"info": [],
			"description": "Ammo for Sub Machine Guns",
			"image": "smg_ammo.png",
			"type": "item",
			"name": "smg_ammo",
			"weight": 500
		},
		{
			"useable": true,
			"unique": false,
			"label": "Bottle of Water",
			"amount": 1,
			"shouldClose": true,
			"slot": 13,
			"info": [],
			"description": "For all the thirsty out there",
			"image": "water_bottle.png",
			"type": "item",
			"name": "water_bottle",
			"weight": 500
		},
		{
			"useable": true,
			"unique": false,
			"label": "Shotgun ammo",
			"amount": 1,
			"shouldClose": true,
			"slot": 14,
			"info": [],
			"description": "Ammo for Shotguns",
			"image": "shotgun_ammo.png",
			"type": "item",
			"name": "shotgun_ammo",
			"weight": 500
		},
		null,
		null,
		{
			"useable": false,
			"unique": true,
			"label": "Evidence Bag",
			"amount": 1,
			"shouldClose": false,
			"slot": 17,
			"info": {
				"ammolabel": "9x19mm parabellum bullet",
				"type": "casing",
				"ammotype": 453432689,
				"label": "Bullet Casing",
				"serie": "68Fsw7sf896uWka",
				"street": "Atlee St | "
			},
			"description": "A filled evidence bag to see who committed the crime >:(",
			"image": "evidence.png",
			"type": "item",
			"name": "filled_evidence_bag",
			"weight": 200
		},
		{
			"useable": false,
			"unique": true,
			"label": "Evidence Bag",
			"amount": 1,
			"shouldClose": false,
			"slot": 18,
			"info": {
				"ammolabel": "9x19mm parabellum bullet",
				"type": "casing",
				"ammotype": 453432689,
				"label": "Bullet Casing",
				"serie": "68Fsw7sf896uWka",
				"street": "Atlee St | "
			},
			"description": "A filled evidence bag to see who committed the crime >:(",
			"image": "evidence.png",
			"type": "item",
			"name": "filled_evidence_bag",
			"weight": 200
		},
		null,
		{
			"useable": true,
			"unique": false,
			"label": "Rifle ammo",
			"amount": 1,
			"shouldClose": true,
			"slot": 20,
			"info": [],
			"description": "Ammo for Rifles",
			"image": "rifle_ammo.png",
			"type": "item",
			"name": "rifle_ammo",
			"weight": 1000
		},
		null,
		{
			"useable": false,
			"unique": true,
			"label": "Taser",
			"amount": 1,
			"slot": 22,
			"type": "weapon",
			"description": "A weapon firing barbs attached by wires to batteries, causing temporary paralysis",
			"image": "weapon_stungun.png",
			"name": "weapon_stungun",
			"weight": 1000,
			"info": {
				"quality": 100,
				"serie": "16SYa9bv134abFS"
			}
		},
		null,
		{
			"useable": false,
			"unique": true,
			"label": "Carbine Rifle",
			"amount": 1,
			"slot": 24,
			"type": "weapon",
			"description": "A lightweight automatic rifle",
			"image": "weapon_carbinerifle.png",
			"name": "weapon_carbinerifle",
			"weight": 1000,
			"info": {
				"serie": "60wGB9rt026wECa",
				"attachments": [
					{
						"label": "Flashlight",
						"component": "COMPONENT_AT_AR_FLSH"
					},
					{
						"label": "3x Scope",
						"component": "COMPONENT_AT_SCOPE_MEDIUM"
					}
				],
				"quality": 100
			}
		}
	],
	"Ammo": [],
	"other": {
		"coords": {
			"x": 459.8505554199219,
			"y": -981.4549560546876,
			"z": 30.6783447265625
		},
		"slots": 35,
		"maxweight": 100000,
		"label": "Dropped-37807",
		"inventory": [
			{
				"useable": true,
				"unique": false,
				"label": "Heavy Armor",
				"amount": 1,
				"weight": 5000,
				"type": "item",
				"info": [],
				"slot": 1,
				"image": "armor.png",
				"description": "Some protection won't hurt... right?",
				"name": "heavyarmor",
				"id": 37807
			},
			null,
			{
				"useable": true,
				"unique": false,
				"label": "Handcuffs",
				"amount": 1,
				"weight": 100,
				"type": "item",
				"info": [],
				"slot": 3,
				"image": "handcuffs.png",
				"description": "Comes in handy when people misbehave. Maybe it can be used for something else?",
				"name": "handcuffs",
				"id": 37807
			},
			null,
			null,
			null,
			null,
			null,
			null,
			{
				"useable": true,
				"unique": true,
				"label": "Visa Card",
				"amount": 1,
				"weight": 0,
				"type": "item",
				"info": {
					"cardActive": true,
					"cardPin": 1234,
					"citizenid": "CPU60525",
					"name": "Felipe Meneses",
					"cardNumber": 5141542841881607,
					"cardType": "visa"
				},
				"slot": 10,
				"image": "visacard.png",
				"description": "Visa can be used via ATM",
				"name": "visa",
				"id": 37807
			}
		],
		"name": 37807
	}
};
