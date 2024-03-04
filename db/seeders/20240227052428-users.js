
'use strict';

module.exports = {
  up: (models, mongoose) => {
    return models.users
    .insertMany ([{
      _id : "65e040af0dfce51b8598a818",
        name : "ashik",
        email : 'ashik@gmail.com',
        password : "$2a$12$H25VgDM0ImZX/PCAsWCDLehvv4gQFGSsajooiIWEMcxV1qXl/uVOm",

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
