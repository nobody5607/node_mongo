import mongoose from "mongoose";

const schema = mongoose.Schema({
  queue_date: {
    type: Date,
  },
  account_number: {
    type: String,
  },
});
const QueueModel = mongoose.model("Queue", schema);

export default QueueModel;
