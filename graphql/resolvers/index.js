const bcrypt = require("bcryptjs"); 
const Event = require("../../model/event"); 
const User = require("../../model/user"); 

const user = async userId => {
  try{
    const user = await  User.findById(userId)
    
    return { ...user._doc, 
      _id: user.id, 
      createdEvents:events.bind(this, user._doc.createdEvents) 
    }; 

  }catch(err){
    throw err; 
  }
    
}

const events = async eventIds => {
  try{
    const events =  await Event.find({ _id: {$in: eventIds}})
    events.map(event => {
            return { ...event._doc, _id: event.id, creator: user.bind(this, event._doc.creator)}
        })
    return events;
    }
     

  catch(err){
    throw err; 
  }
  
}

module.exports = {
    events: async () => {
      try{
        const events = await  Event.find()
        return events.map(event => {
          return {
            ...event._doc,
             _id: event.id , 
             date:new Date(event._doc.date).toISOString(),  
             creator: user.bind(this, event._doc.creator)
            };
        });

      }catch(err){
        throw err;
      }
    },
    createEvent: async args => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '603488d1d2b05fff018adfe1'
      });
      let createdEvent;
      try{
        const result = await event.save()
            createdEvent = { ...result._doc, _id: result._doc._id.toString(),
            date: new Date(event._doc.date).toISOString(), 
            creator: user.bind(this, result._doc.creator) };
          // find the user ;   
          const user = await  User.findById('603488d1d2b05fff018adfe1');
          if (!user) {
            throw new Error('User not found.');
          }
          user.createdEvents.push(event);
          const userSaveResult  = await  user.save();
          return createdEvent;

      }catch(err){
        throw err; 
      }
    },
    createUser: async args => {
      try{
        const existingUser =  User.findOne({ email: args.userInput.email })
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const hashedPassword = await  bcrypt.hash(args.userInput.password, 12);
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        const result= await   user.save();
        return { ...result._doc, password: null, _id: result.id };
      }catch(err){
        throw err; 
      }
      
  
    }
  }