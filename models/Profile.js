const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  franchise: {
    type: String,
    required: true
  },
  market: {
    type: String
  },
  location: {
    type: String
  },
  ranking: {
    type: Number
  },
  admin: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
  district: {
    type: String
  },
  region: {
    type: String
  },
  curweeklob: [
    {
      upsrev: {
        type: Number
      },
      upsmgndol: {
        type: Number
      },
      upsmgnpct: {
        type: Number
      },
      dhlrev: {
        type: Number
      },
      dhlmgndol: {
        type: Number
      },
      dhlmgnpct: {
        type: Number
      },
      ltlrev: {
        type: Number
      },
      ltlmgndol: {
        type: Number
      },
      ltlmgnpct: {
        type: Number
      },
      totalrev: {
        type: Number
      },
      totalmgndol: {
        type: Number
      },
      totalmgnpct: {
        type: Number
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      }

    }
  ],
  ytdlobmgn: [
    {
      year: {
        type: String,
        required: true
      },
      upsytdrev: {
        type: Number
      },
      upsytdmgndol: {
        type: Number
      },
      upsytdmgnpct: {
        type: Number
      },
      dhlytdrev: {
        type: Number
      },
      dhlytdmgndol: {
        type: Number
      },
      dhlytdmgnpct: {
        type: Number
      },
      ltlytdrev: {
        type: Number
      },
      ltlytdmgndol: {
        type: Number
      },
      ltlytdmgnpct: {
        type: Number
      },
      totalytdrev: {
        type: Number
      },
      totalytdmgndol: {
        type: Number
      },
      totalytdmgnpct: {
        type: Number
      },
    }
  ],
  ytdlobact: [
  {
    year: {
      type: String
    },
    curwkupsact: {
      type: Number
    },
    curwkdhlact: {
      type: Number
    },
    curwkltlact: {
      type: Number
    },
    curwktotalact: {
      type: Number
    },
    ytdupsact: {
      type: Number
    },
    ytddhlact: {
      type: Number
    },
    ytdltlact: {
      type: Number
    },
    ytdktotalact: {
      type: Number
    }
  }
],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);