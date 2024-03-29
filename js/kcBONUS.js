var EQUIPBONUS = {
    'Rainy Summer 2020': {
        'E-4 Normal': [
            {
                mod: [1.2, 1.3, 1.4],
                accMod: [1.2, 1.3, 1.4],
                eqids: [82, 83, 302],
                distinct: true,
                excludeLBAS: true
            },
        ],
        'E-4 Submarine': [
            {
                mod: [1.44, 1.69, 1.96],
                accMod: [1.44, 1.69, 1.96],
                eqids: [82, 83, 302],
                distinct: true,
                excludeLBAS: true
            }
        ],
        'E-4 X/Z3': [
            {
                mod: [1.2, 1.3, 1.4],
                accMod: [1.2, 1.3, 1.4],
                eqids: [82, 83, 302],
                distinct: true,
                excludeLBAS: true
            },
            {
                mod: 1.3,
                accMod: 1.3,
                eqids: [82, 83, 302],
            }
        ],
        'E-7 Y': [
            {
                mod: 1.22,
                accMod: 1.22,
                eqids: [143, 144]
            },
        ],
        'E-7 Z': [
            {
                mod: 1.3,
                accMod: 1.3,
                eqids: [143, 144]
            },
            {
                mod: 1.15,
                accMod: 1.15,
                eqtypes: [TYPE3SHELL]
            },
            {
                mod: 1.17,
                accMod: 1.17,
                eqtypes: [APSHELL]
            }
        ]
    },
    'Summer 2021': {
        'E-1 Map': [
            {
                mod: 1.15,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316],
            },
            {
                mod: 1.2,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432],
            }
        ],
        'E-2 Map': [
            {
                mod: 1.1,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316],
            },
            {
                mod: 1.15,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432],
            }
        ],
        'E-2 W Boss': [
            {
                mod: 1.2,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316],
            },
            {
                mod: 1.25,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432],
            }
        ],
        'E-2 Z Boss': [
            {
                mod: 1.25,
                eqids: [64, 188, 233, 242, 248, 256, 257, 277, 305, 306, 316],
            },
            {
                mod: 1.35,
                eqids: [243, 244, 401, 405, 406, 424, 425, 431, 432],
            }
        ],
        'E-3 Map': [
            {
                mod: 1.08,
                eqids: [64, 158, 159, 184, 189, 248, 249, 305, 306, 353],
            },
            {
                mod: 1.15,
                eqids: [252, 423, 434, 435],
            },
            {
                mod: 1.05,
                eqids: [158, 159, 197, 198, 205, 206, 233, 242, 254, 256, 257, 277, 353],
            },
            {
                mod: 1.08,
                eqids: [184, 188, 243, 249, 422],
            },
            {
                mod: 1.08,
                eqids: [189, 244, 252, 423, 424, 425, 434, 435],
            }
        ],
        'E-3 Boss': [
            {
                mod: 1.08,
                eqids: [64, 158, 159, 184, 189, 248, 249, 305, 306, 353],
            },
            {
                mod: 1.15,
                eqids: [252, 423, 434, 435],
            },
            {
                mod: 1.1,
                eqids: [158, 159, 197, 198, 205, 206, 233, 242, 254, 256, 257, 277, 353],
            },
            {
                mod: 1.12,
                eqids: [184, 188, 243, 249, 422],
            },
            {
                mod: 1.12,
                eqids: [189, 244, 252, 423, 424, 425, 434, 435],
            }
        ]
    },
    'Spring 2022': {
        'E-2': [
            {
                mod: [1.05, 1.1, 1.158, 1.216],
                eqtypes: [SEAPLANE, SEAPLANEBOMBER, SEAPLANEFIGHTER],
            },
            {
                mod: [1.03, 1.06, 1.093, 1.126],
                eqtypes: [SEAPLANEBOMBER],
            },
            {
                mod: [1.07, 1.145, 1.225, 1.311],
                eqids: [59],
            }
        ],
        'E-4/5': [
            {
                mod: [1.18, 1.392, 1.643, 1.939],
                accMod: 1.15,
                eqids: [170, 263, 264, 388, 466],
                LBASOnly: true,
                LBASShare: true
            },
            {
                mod: 1,
                accMod: 1.05,
                eqtypes: [TORPBOMBER, DIVEBOMBER, SEAPLANE, SEAPLANEBOMBER, LANDBOMBER, JETBOMBER, HEAVYBOMBER],
                LBASOnly: true,
                LBASShare: true
            }
        ]
    },
    'Summer 2022': {
        'E-1/2/3 Map': [
            {
                mod: 1.07,
                LBASOnly: true,
                LBASShare: true,
                eqids: [158, 159, 178, 184, 189, 249, 353, 354],
            },
            {
                mod: 1.1,
                LBASOnly: true,
                LBASShare: true,
                eqids: [250, 251, 252, 253, 423, 434, 435, 473, 474, 479],
            },
            {
                mod: 1.04,
                LBASShare: true,
                eqids: [158, 159, 197, 198, 205, 206, 233, 242, 254, 256, 257, 277, 353, 459],
            },
            {
                mod: 1.05,
                LBASShare: true,
                eqids: [64, 184, 188, 243, 248, 249, 305, 306, 316, 422, 431, 432, 473, 474],
            },
            {
                mod: 1.06,
                LBASShare: true,
                eqids: [189, 244, 252, 405, 423, 424, 425, 433, 434, 435, 479],
            }
        ],
        'E-3-1 Boss': [
            {
                mod: 1.07,
                LBASOnly: true,
                LBASShare: true,
                eqids: [158, 159, 178, 184, 189, 249, 353, 354],
            },
            {
                mod: 1.1,
                LBASOnly: true,
                LBASShare: true,
                eqids: [250, 251, 252, 253, 423, 434, 435, 473, 474, 479],
            },
            {
                mod: 1.0712,
                LBASShare: true,
                eqids: [158, 159, 197, 198, 205, 206, 233, 242, 254, 256, 257, 277, 353, 459],
            },
            {
                mod: 1.092,
                LBASShare: true,
                eqids: [64, 184, 188, 243, 248, 249, 305, 306, 316, 422, 431, 432, 473, 474],
            },
            {
                mod: 1.113,
                LBASShare: true,
                eqids: [189, 244, 252, 405, 423, 424, 425, 433, 434, 435, 479],
            }
        ],
        'E-3-2 Boss': [
            {
                mod: 1.07,
                LBASOnly: true,
                LBASShare: true,
                eqids: [158, 159, 178, 184, 189, 249, 353, 354],
            },
            {
                mod: 1.1,
                LBASOnly: true,
                LBASShare: true,
                eqids: [250, 251, 252, 253, 423, 434, 435, 473, 474, 479],
            },
            {
                mod: 1.092,
                LBASShare: true,
                eqids: [158, 159, 197, 198, 205, 206, 233, 242, 254, 256, 257, 277, 353, 459],
            },
            {
                mod: 1.113,
                LBASShare: true,
                eqids: [64, 184, 188, 243, 248, 249, 305, 306, 316, 422, 431, 432, 473, 474],
            },
            {
                mod: 1.1342,
                LBASShare: true,
                eqids: [189, 244, 252, 405, 423, 424, 425, 433, 434, 435, 479],
            }
        ],
        'E-5 Map': [
            {
                mod: 1.06,
                LBASOnly: true,
                LBASShare: true,
                eqids: [158, 159, 178, 184, 189, 249, 353, 354],
            },
            {
                mod: 1.08,
                LBASOnly: true,
                LBASShare: true,
                eqids: [250, 251, 252, 253, 405, 423, 434, 435, 473, 474, 479, 480],
            },
            {
                mod: 1.03,
                LBASShare: true,
                eqids: [158, 159, 195, 197, 198, 205, 206, 233, 242, 254, 255, 256, 257, 277, 353, 354, 375, 389, 405, 419, 420, 459],
            },
            {
                mod: 1.04,
                LBASShare: true,
                eqids: [64, 184, 188, 243, 248, 249, 305, 306, 316, 422, 431, 432, 473, 474],
            },
            {
                mod: 1.05,
                LBASShare: true,
                eqids: [189, 244, 252, 405, 423, 424, 425, 433, 434, 435, 479, 480],
            }
        ],
        'E-5-4 Boss': [
            {
                mod: 1.06,
                LBASOnly: true,
                LBASShare: true,
                eqids: [158, 159, 178, 184, 189, 249, 353, 354],
            },
            {
                mod: 1.08,
                LBASOnly: true,
                LBASShare: true,
                eqids: [250, 251, 252, 253, 405, 423, 434, 435, 473, 474, 479, 480],
            },
            {
                mod: 1.0815,
                LBASShare: true,
                eqids: [158, 159, 195, 197, 198, 205, 206, 233, 242, 254, 255, 256, 257, 277, 353, 354, 375, 389, 405, 419, 420, 459],
            },
            {
                mod: 1.1128,
                LBASShare: true,
                eqids: [64, 184, 188, 243, 248, 249, 305, 306, 316, 422, 431, 432, 473, 474],
            },
            {
                mod: 1.1445,
                LBASShare: true,
                eqids: [189, 244, 252, 405, 423, 424, 425, 433, 434, 435, 479, 480],
            }
        ],

    }
}