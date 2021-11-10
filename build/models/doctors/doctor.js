"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var DoctorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    hospitalId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Hospital",
        index: false
    },
    specialityId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Speciality",
        index: false
    },
    experience: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    schedule: {
        monday: {
            startTime: {
                type: String,
                required: false
            },
            endTime: {
                type: String,
                required: false
            }
        },
        tuesday: {
            startTime: {
                type: String,
                required: false
            },
            endTime: {
                type: String,
                required: false
            }
        },
        wednesday: {
            startTime: {
                type: String,
                required: false
            },
            endTime: {
                type: String,
                required: false
            }
        },
        thursday: {
            startTime: {
                type: String,
                required: false
            },
            endTime: {
                type: String,
                required: false
            }
        },
        friday: {
            startTime: {
                type: String,
                required: false
            },
            endTime: {
                type: String,
                required: false
            }
        },
        satureday: {
            startTime: {
                type: String,
                required: false
            },
            endTime: {
                type: String,
                required: false
            }
        },
        sunday: {
            startTime: {
                type: String,
                required: false
            },
            endTime: {
                type: String,
                required: false
            }
        },
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Doctor', DoctorSchema);
