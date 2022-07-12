const Slot = require("../models/Slot");

const addSlot = async (req, res) => {
  try {
    if (!req.body.building_name) {
      res.status(400).json({ status: 0, message: "Please select building" });
    } else if (!req.body.class_name) {
      res.status(400).json({ status: 0, message: "Please select class name" });
    } else if (!req.body.teacher_name) {
      res.status(400).json({ status: 0, message: "Please enter teacher name" });
    } else if (!req.body.section) {
      res.status(400).json({ status: 0, message: "Please enter section" });
    } else if (!req.body.course) {
      res.status(400).json({ status: 0, message: "Please enter course name" });
    } else if (!req.body.st_time) {
      res.status(400).json({ status: 0, message: "Please select Start time" });
    } else if (!req.body.day) {
      res.status(400).json({ status: 0, message: "Please select day" });
    } else if (!req.body.end_time) {
      return res.status(400).json({ status: 0, msg: "Please select end time" })
    } else if (req.body.st_time == req.body.end_time) {
      return res.status(400).json({ status: 0, msg: "Starting and ending time can not be same" });
    }
    const check = await Slot.find(
      {
        $and: [
          { st_time: { $lte: req.body.end_time } },
          { end_time: { $gt: req.body.st_time } },
          { day: req.body.day },
          { class_name: req.body.class_name },
          { building_name: req.body.building_name }

        ]
      }
    );





    if (check.length > 0) {
      return res.status(404).json({ status: 0, msg: `Slot from ${check[0].st_time} to ${check[0].end_time} has been booked already` });
    } else {
      const slot = new Slot({
        building_name: req.body.building_name,
        class_name: req.body.class_name,
        teacher_name: req.body.teacher_name,
        section: req.body.section,
        st_time: req.body.st_time,
        end_time: req.body.end_time,
        course: req.body.course,
        duration: req.body.duration,
        day: req.body.day,
      });

      if (slot.st_time > slot.end_time) {
        return res.status(400).json({ status: 0, msg: "Please select Correct time" })
      } else {

        const newSlot = await slot.save();
        if (newSlot) {
          return res.status(201).json({
            status: 1,
            msg: "Your slot has been created successfully",
            yourSlot: newSlot,
          });
        } else {
          return res.status(400).json({ status: 0, msg: "Something went wrong" })
        }
      }
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};





const listOfSlots = async (req, res) => {
  try {
    const list = await Slot.find({});
    const count = await Slot.find().countDocuments();
    console.log(list)
    if (list.length < 1) {
      res.status(400).json({
        status: 0,
        msg: "No List Found",
      });
    }
    else {
      res.status(200).json({
        status: 1,
        msg: "List Of Slots",
        num_of_slots: count,
        slots: list,
      });
    }

  } catch (error) {
    return res.status(500).json(error.message);
  }
};


const deleteSlot = async (req, res) => {
  try {
    if (!req.body.slot_id) {
      res.status(400).json({ status: 0, message: "Please select a slot" });
    } else {

      const slot = await Slot.findByIdAndDelete(req.body.slot_id)
      if (slot) {
        return res.status(200).json({ status: 1, msg: "Slot deleted successfully" })
      } else {

        return res.status(400).json({ status: 0, msg: "Something went wrong" })
      }
    }
  } catch (error) {

    return res.status(500).json(error.message);
  }
}


const updateSlot = async (req, res) => {
  try {
    if (!req.body.slot_id) {
      res.status(400).json({ status: 0, message: "Please select a slot" });
    } else if (req.body.st_time == req.body.end_time) {
      res.status(400).json({ status: 0, message: "Start and end time should not be same" });

    } else if (req.body.st_time > req.body.end_time) {
      res.status(400).json({ status: 0, message: "Start time should be less than end time" });

    } else {
      const check = await Slot.findOne(
        {
          $and: [
            { st_time: { $lte: req.body.end_time } },
            { end_time: { $gt: req.body.st_time } },
            { day: req.body.day },
            { class_name: req.body.class_name },
            { building_name: req.body.building_name }

          ]
        }
      );



      if (check) {
        return res.status(200).json({ status: 0, msg: `Slot from ${check.st_time} to ${check.end_time} has been booked already` })
      } else {

        const slot = await Slot.findByIdAndUpdate({
          _id: req.body.slot_id,

        }, { ...req.body })
        await slot.save()
        return res.status(200).json({ status: 1, msg: "Slot updated successfully" })
      }
    }

  } catch (error) {
    return res.status(500).json(error.message);

  }
}

module.exports = { addSlot, listOfSlots, deleteSlot, updateSlot };
