const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);
console.log('Tours Length > ', tours.length);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  console.log('new ID > ', newId);
  console.log('new Object > ', req.body);

  const newTour = Object.assign({ id: newId }, req.body);

  console.log('new Tour > ', newTour);

  tours.push(newTour);

  console.log('Updated Tours Length > ', tours.length);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      if (error) throw error;
      res.status(201).json({
        status: 'success',
        tour: newTour,
      });
    }
  );
};
exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (tour) {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour,
      },
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
};
exports.updateTour = (req, res) => {
  console.log(req.body);
  const id = req.params.id * 1;

  if (id > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated Tour is here ....>',
      },
    });
  }
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  console.log("You want to delete data which've the id > ", id);
  if (id > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
