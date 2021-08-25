var EQUIPBONUS = {
    'Rainy Summer 2020': {
        'E-4 Normal': [
            {
                mod: [1.2, 1.3, 1.4],
                eqids: [82, 83, 302],
                distinct: true,
                excludeLBAS: true
            },
        ],
        'E-4 Submarine': [
            {
                mod: [1.44, 1.69, 1.96],
                eqids: [82, 83, 302],
                distinct: true,
                excludeLBAS: true
            }
        ],
        'E-4 X/Z3': [
            {
                mod: [1.2, 1.3, 1.4],
                eqids: [82, 83, 302],
                distinct: true,
                excludeLBAS: true
            },
            {
                mod: 1.3,
                eqids: [82, 83, 302],
            }
        ],
        'E-7 Y': [
            {
                mod: 1.22,
                eqids: [143, 144]
            },
        ],
        'E-7 Z': [
            {
                mod: 1.3,
                eqids: [143, 144]
            },
            {
                mod: 1.15,
                eqtypes: [TYPE3SHELL]
            },
            {
                mod: 1.17,
                eqtypes: [APSHELL]
            }
        ]
    },
    'Summer 2021': {
        'E-1 Map': [
            {
                mod: 1.15,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316]
            },
            {
                mod: 1.2,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432]
            }
        ],
        'E-2 Map': [
            {
                mod: 1.1,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316]
            },
            {
                mod: 1.15,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432]
            }
        ],
        'E-2 W Boss': [
            {
                mod: 1.2,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316]
            },
            {
                mod: 1.25,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432]
            }
        ],
        'E-2 Z Boss': [
            {
                mod: 1.25,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316]
            },
            {
                mod: 1.35,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432]
            }
        ],
    }
}