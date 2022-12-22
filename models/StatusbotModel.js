import mongoose from "mongoose";

const schema = mongoose.Schema({
  bot_status: {
    type: String,
  },
  company_code: {
    type: String,
  },
  website: {
    type: String,
  },
});
const StatusBotModel = mongoose.model("StatusBot", schema);

export default StatusBotModel;
