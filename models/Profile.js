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
  jobtitle: {
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
      level: {
        type: String,
        required: true
      },
      reportsto: {
        type: String
      },
      basesalary: {
        type: Number,
        required: true
      },
      salesincentive: {
        type: Number
      },
      ontargetearn: {
        type: Number
      }
    }
  ],
  comptype: [
    {
      model: {
        type: String,
        required: true
      },
      revenue: {
        type: Number,
        required: true
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
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);