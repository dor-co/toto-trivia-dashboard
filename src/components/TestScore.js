var currentQuestion = { //current question with all the details
    question: "Sfsf",
    answers: [
        {
            id: 324234324,
            text: "דגכדכדכגד",
            price: 0,
        },
        {
            id: 3242343234,
            text: "דגכדכדכגד",
            price: 0,
        },
        {
            id: 3242343424,
            text: "דגכדכדכגד",
            price: 1,
        },
    ],
    questionIndex: 1,
};
 
var questions = [ //list of all the questions with answers
    {
        id: 123123123,
        q: "מי הבוס?",
        a: [
            {
                id: 324234324,
                text: "דגכדכדכגד",
                price: 1,
                isCorrect: false,
            },
            {
                id: 3242343234,
                text: "דגכדכדכגד",
                price: 1,
                isCorrect: false,
            },
            {
                id: 3242343424,
                text: "דגכדכדכגד",
                price: 1,
                isCorrect: true,
            },
        ],
    },
];
 
var userAnswers = [ //list of the answers of the user
    {
        userId: 123456,
        questionId: 123123123,
        answerId: 3242343424,
        questionIndex: 1,
    },
    {
        userId: 123456,
        questionId: 123123123,
        answerId: 3242343424,
        questionIndex: 2,
    },
    {
        userId: 123456,
        questionId: 123123123,
        answerId: 3242343424,
        questionIndex: 3,
    },
    {
        userId: 123456,
        questionId: 123123123,
        answerId: 3242343424,
        questionIndex: 4,

    },
];
 
var users = [ //list of users
    {
        userId: 234234,
        name: "dor",
        teamId: 1,
        groupId: 4,
    },
    {
        userId: 234234,
        name: "boris",
        teamId: 2,
        groupId: 4,
    },
];
 
var scoreArray = userAnswers
    .map((a) => {
        return {
            team: users.filter((el) => el.userId == a.userId).teamId,
            group: users.filter((u = u.id))[0].groupId,
            questionIndex: a.questionIndex,
            points: (function () {
                var answer = questions
                    .filter((q) => (q.id = a.questionId))[0]

                    .a.filter((ans) => (ans.id = a.answerId))[0];
                return answer.isCorrect ? answer.price : 0;
            })(),
        };
    })
    .filter((a) => a.points > 0);
 
scoreArray = [
    {
        questionIndex: 1,
        team: 1,
        group: 3,
        points: 1,
    },
    {
        questionIndex: 1,
        team: 1,
        group: 3,
        points: 1,
    },
];
 
var groupScoreMatrix = [[]]; //enter the score to the matrix
scoreArray.forEach((a) => {
    groupScoreMatrix[groupId][questionIndex] += a.points;
});