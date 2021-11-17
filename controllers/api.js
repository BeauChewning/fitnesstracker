const Workout = require("../models/workout");

const router = require("express").Router();

router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/workouts/:id', ({ body, params }, res) => {
  Workout.findOneAndUpdate({_id: params.id}, { $push: {exercises: body}})
  .then(Workout => {
    res.json(Workout);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

router.get("/workouts", async (req, res) => {
  await Workout.aggregate([{
    $addFields: {
      totalDuration: { $sum: "$exercises.duration" } ,
    }
  }])
    .sort({ date: 1 })
    .then(Workout => {
      res.json(Workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/workouts/range', async (req, res) => {
  await Workout.aggregate([{
    $addFields: {
      totalDuration: { $sum: "$exercises.duration" } ,
    }
  }]).sort({ date: -1 }).limit(10)
  .then(Workout => {
    res.json(Workout);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
})

module.exports = router;