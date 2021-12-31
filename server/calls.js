const bcrypt = require('bcrypt');
const Award = require('./models/Award.js')
const User = require('./models/User.js')
const Platform = require('./models/Platform.js')
const Quiz = require('./models/Quiz.js')
const Submission = require('./models/Submission.js')


var json = require('./response.json');
var USERS = json.data
var PLATFORMS = require('./platform.json')
var QUIZZES = require('./quiz.json')
var AWARDS = require('./award.json')

const generateDB = async () => {
    const date = Date.now()
    const USER_IDS = await createUsers()
    console.log("Finished Creating Users")
    await createFriends(USER_IDS)
    const PLATFORM_OBJECTS = await createPlatforms(USER_IDS)
    console.log("Finished Creating Platforms")
    const AWARDS_COLLECTION = await createAwards(PLATFORM_OBJECTS)
    console.log("Finished Creating Awards")
    const QUIZZES_COLLECTION = await createQuizzes(USER_IDS, PLATFORM_OBJECTS)
    console.log("Finished Creating Quizzes")
    const SUBMISSION_COLLECTION = await createSubmissions(USER_IDS)
    console.log(`Script completed after ${Date.now() - date}ms`);
}

const createUsers = async () => {
    try {
        var users = []
        for (var i = 0; i < USERS.length; i++) {
            var obj = USERS[i]

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(obj.password, salt)
            const user = new User({
                ...obj,
                password: hash
            })
            const newUser = await user.save()
            users.push(newUser._id.toString())
        }
        // console.dir(users, {'maxArrayLength': null})
        return users
        
    } catch (error) {
        console.log(error)
    }
}

const createFriends = async (USER_IDS) => {
    try {
        for (const u of USER_IDS) {
            var counter = Math.floor(Math.random() * (40 - 10 + 1 )) + 10
            for (var i = 0; i < counter; i++) {
                const index = Math.floor(Math.random() * (156 - 0 + 1)) + 0
                const user = await User.findByIdAndUpdate(
                    u,
                    { $addToSet: { friends: USER_IDS[index]} },
                    { new: true }
                )
                const otherUser = await User.findByIdAndUpdate(
                    USER_IDS[index],
                    { $addToSet: { friends: u} },
                    { new: true }
                )
            }
        }
    } catch (error) {
        
    }
}


const createPlatforms = async (USER_IDS) => {
    var platforms = []
    try {
        for (const p of PLATFORMS) {
            const userId = Math.floor(Math.random() * (156 - 0 + 1)) + 0
            const newPlatform = new Platform({
                ...p,
                owner: USER_IDS[userId],
                subscribers: [{
                    userId: USER_IDS[userId],
                    role: 'Creator'
                }],
                subscriberCount: 1
            });
            const createdPlatform = await newPlatform.save();
            platforms.push({
                id: createdPlatform._id.toString(), 
                owner: createdPlatform.owner.toString(),
                name: createdPlatform.name
            })
            await User.findByIdAndUpdate(USER_IDS[userId], { $inc: { 'platformsJoined': 1 }})
        }
        

        var members = []
        for (const userId of USER_IDS ) {
            members.push({userId, role: 'Consumer'})
        }
    
        for (var i = 0; i < platforms.length; i++) {
           
            const newMembers = members.slice(0, 158 - i * 7)
           
            const filtered = newMembers.filter(m => m.userId !== platforms[i].owner)
            
            const pla = await Platform.findByIdAndUpdate(
                platforms[i].id, 
                { $push: { subscribers : { $each: filtered } },
                $inc: { 'subscriberCount': filtered.length} }
            )

            for (const f of filtered) {
                await User.findByIdAndUpdate(f.userId, { $inc: { 'platformsJoined': 1 } } )
            }
        }
        return platforms
    } catch (error) {
        console.log(error)
    }
}

const createAwards = async (PLATFORM_OBJECTS) => {
    try {
        var awards = []
        for (const a of AWARDS) {
            const index = PLATFORM_OBJECTS.findIndex(p => p.name === a.platformId);
            const platform = PLATFORM_OBJECTS[index]

            const newAward = new Award ({
                ...a,
                platformId: platform.id
            });
    
            const createdAward = await newAward.save();
            awards.push({
                id: createdAward._id.toString()
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const createQuizzes = async (USER_IDS, PLATFORM_OBJECTS) => {
    try {
        var quizzes = []

        for (const q of QUIZZES) {
            
            // Find index of platform in array
            const index = PLATFORM_OBJECTS.findIndex(p => p.name === q.platformId);
            const platform = PLATFORM_OBJECTS[index]

            console.log(platform)
            console.log(index)
            // Generate a random user
            // Make sure user is a member of platform
            
            const fetchedPlatform = await Platform.findById(platform.id)
           
            var userId
            while (true) {
                userId = Math.floor(Math.random() * (156 - 0 +1)) + 0
                const found = fetchedPlatform.subscribers.findIndex(s => s.userId === USER_IDS[userId] )
                
                if (found) {
                    break
                }
            }

            
            const newQuiz = new Quiz ({
                ...q,
                owner: USER_IDS[userId],
                platformId:platform.id,
                status: 'published'
            });
    
            const createdQuiz = await newQuiz.save();
            quizzes.push({
                id: createdQuiz._id.toString()
            })
            await Platform.findByIdAndUpdate(platform.id, { $inc: { 'quizCount': 1 } })

        }
        
    } catch (error) {
        console.log(error)
    }
}

const createSubmissions = async (USER_IDS) => {
    // Get all quizzes
    

    // For each user, check if user belongs to platform.
    // If so, flip 50/50 to take quiz
    try {
        const quizzes = await Quiz.find().populate("platformId", "subscribers")

        for (const u of USER_IDS) {
            for (const q of quizzes) {
                const isMember = q.platformId.subscribers.findIndex(s => s.userId === u)
                if (isMember && Math.round(Math.random()) === 1) {

                    // Generate Anwers
                    var answers = []

                    for (var i = 0; i < q.questions.length; i++) {
                        answers.push(String.fromCharCode(97+ (Math.floor(Math.random() * (3 - 0 +1)) + 0)))
                    }
                    // Take Quiz
                    const questions = q.questions
                    var total_correct = 0
                    
                    var i = 0
                    questions.forEach((question)=>{
                        if(question != null){
                            if(question.answer === answers[i]){
                                total_correct+=1
                            }
                            i+=1
                        } 
                    })
                    
                    const count = await Submission.countDocuments({ quizId: q._id, userId: u })

                    var newSubmission
                    if (count) {
                        newSubmission = new Submission({
                            pointsAwarded: 0,
                            quizId:q._id,
                            answers:answers,
                            platformId: q.platformId._id,
                            userId: u,
                            timeTaken: Math.floor(Math.random() * ((q.time * 60) - 20 +1)) + 20,
                            score:total_correct,
                            attemptNumber: count + 1
                        })
                    } else {
                        const timeTaken = Math.floor(Math.random() * ((q.time * 60) - 20 +1)) + 20
                        const pointsAwarded = timeTaken === 0 ? (total_correct * (total_correct / q.questions.length)) / (1 / (q.time * 60)) :
                            (total_correct * (total_correct / q.questions.length)) / (timeTaken / (q.time * 60))
                        newSubmission = new Submission({
                            pointsAwarded: Math.floor(pointsAwarded),
                            quizId:q._id,
                            answers:answers,
                            platformId: q.platformId._id,
                            userId: u,
                            timeTaken: timeTaken,
                            score:total_correct,
                        })
                    }
                    
                    //save submission
                    const created_submission = await newSubmission.save()

                    // await Quiz.findByIdAndUpdate(q._id, { $inc: { 'submissionCount': 1 } })

                    // Like / Dislike Quiz
                    if (Math.round(Math.random()) === 1) {
                        await Quiz.findByIdAndUpdate(
                            q._id,
                            { $push: { 'likes.likedBy': u } ,
                             $inc: { 'likes.totalLikes': 1, 'submissionCount': 1 } }, 
                            { new: true } 
                        )
                    } else {
                        await Quiz.findByIdAndUpdate(
                            q._id,
                            { $push: { 'likes.disLikedBy': u } ,
                             $inc: { 'likes.totalDislikes': 1, 'submissionCount': 1 } }, 
                            { new: true } 
                        )
                    }
                }
            }
        }
       
        // console.log(submissions)
    } catch (error) {
        console.log(error)
    }
}

exports.logDate = logDate
exports.generateDB = generateDB
exports.createUsers = createUsers
exports.createPlatforms = createPlatforms
exports.createQuizzes = createQuizzes
exports.createSubmissions = createSubmissions