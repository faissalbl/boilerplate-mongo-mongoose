require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env['MONGO_URI'];

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const Person = require('./models/person');

const createAndSavePerson = (done) => {
  const p = new Person({
    name: "Faissal",
    age: 40,
    favoriteFoods: ["arroz com feijão", "ovo ou carne", "abóbora", "charuto"]
  });

  p.save().then(doc => {
      console.log(doc);
      done(null, doc);
  }).catch(err => {
      console.error(err);
      done(err);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then(people => 
      done(null, people)
  ).catch(err => done(err));
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }).then(
    people => done(null, people)
  ).catch(err => done(err));
};

const findOneByFood = (food, done) => {
  Person.findOne({
      favoriteFoods: { $in: [ food ] },
  }).then(p => 
      done(null, p)
  ).catch(err => done(err));
};

const findPersonById = (personId, done) => {
  Person.findById(personId).then(p => 
      done(null, p)
  ).catch(err => done(err));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId).then(p => {
      p.favoriteFoods.push(foodToAdd);
      p.save().then(updatedP => 
          done(null, updatedP)  
      ).catch(err => done(err))
  }).catch(err => done(err));
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true },
  ).then(p => 
      done(null, p)  
  ).catch(err => done(err));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).then(res => 
      done(null, res)
  ).catch(err => done(err));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }).then(res => {
      console.log(res);
      done(null, res);
  }).catch(err => done(err));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({
      favoriteFoods: { $in: [ foodToSearch ] },
  }).sort({
      name: 'asc'
  }).limit(
      2
  ).select(
      '-age'
  ).exec().then(res => {
      done(null, res);
  }).catch(err => done(err));
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
