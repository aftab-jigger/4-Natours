const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);
console.log('Tours Length > ', tours.length);

exports.checkID = (req, res, next, val) => {
  console.log('Tour id is > ', val);
  if (val > tours.length) {
    // return statement is very important over here otherwise the next function will execute
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }
  next();
};

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
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tour,
    },
  });
};
exports.updateTour = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour is here ....>',
    },
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
