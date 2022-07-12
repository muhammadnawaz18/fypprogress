const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    building_name: {
      type: String,
      required: false,
    },
    class_name: {
      type: String,
      required: false,
    },
    teacher_name: {
      type: String,
      required: false,
    },
    section: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
    st_time: {
      type: String,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    end_time: {
      type: String,
      required: false
    },
    day: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Slot = mongoose.model("Slot", slotSchema);

module.exports = Slot;
