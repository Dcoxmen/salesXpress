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
  admin: {
    type: String,
    required: true
  },
  myaccounts: {
    type: [String]
  },
  salesgoal: {
    type: Number
  },
  complanpay: {
    type: Number
  },
  complan: [
    {
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      reportsto: {
        type: String,
        required: true
      },
      basesalary: {
        type: Number
      },
      salesincentive: {
        type: Number
      },
      ontargetearn: {
        type: Number
      },
      revenue: {
        type: Number
      },
      avgcontract: {
        type: Number
      },
      compensationvar: {
        type: String
      },
      lifecycle: {
        type: String
      },
      tierlevel: {
        type: String
      }

    }
  ],
  metrics: [
    {
      model: {
        type: String,
        required: true
      },
      revenue: {
        type: Number,
        required: true
      },
      margin: {
        type: Number,
        required: true
      },
      cost: {
        type: Number
      },
      average: {
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
  local: {
    district: {
      type: String
    },
    districtmgr: {
      type: String
    },
    region: {
      type: String
    },
    regionmgr: {
      type: String
    },
    contact: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);