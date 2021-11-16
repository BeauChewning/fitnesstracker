const Workout = require("../../models/workout");

const router = require("express").Router();

router.post("/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/workouts/:id', ({ body, params }, res) => {
  Workout.findOneAndUpdate({id: params.id}, { $push: {exercises: body}})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

router.get("/workouts", (req, res) => {
    Workout.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get('/workouts/range',(req, res) => {

})

module.exports = router;