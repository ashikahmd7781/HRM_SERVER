
'use strict';

module.exports = {
  up: (models, mongoose) => {
    return models.users
    .insertMany ([{
      _id : "65e040af0dfce51b8598a818",
        name : "mark",
        email : 'mark@gmail.com',
        password : "$2a$12$qLEbL4JLGOdsn6U5kXYOfO9te4gmt2YTz/zIrdzlzLpMMNKFCL176",

    }
  ])
  .then((res)=>{
    console.log(res.insertMany)
  })


    
  },

  down: (models, mongoose) => {
    return models.users
    .deleteMany({
      _id : {
        $in : [
          "65e040af0dfce51b8598a818",

        ]
      }
    })
    .then((res)=>{
      console.log(res.deletedCount)
    });
 
  },
};
