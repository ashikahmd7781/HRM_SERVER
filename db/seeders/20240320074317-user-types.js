'use strict';

module.exports = {
  up: (models, mongoose) => {
    return models.user_types
    .insertMany([
      {
        _id : "65fa9768a8c6f601a3b9d1b8",
        user_type : "admin"
      },
      {
        _id : "65fa97d33f1f1cfd77e757ba",
        user_type : "employee"
      }
    ])
    .then((res) =>{
      console.log(res.insertedCount)
    });
    
  },

  down: (models, mongoose) => {
  return models.user_types
  .deleteMany({
    _id :{
      $in:[
        "65fa9768a8c6f601a3b9d1b8",
        "65fa97d33f1f1cfd77e757ba",
        

      ],
    },
  })
  .then((res) =>{
    console.log(res.deletedCount)
  });
  },
};
