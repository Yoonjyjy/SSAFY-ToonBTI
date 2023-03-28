var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildASTSchema } = require("graphql");
const schemaGql = require("./schema.graphqls");

// Construct a schema, using GraphQL schema language
const schema = buildASTSchema(schemaGql);

class Question {
  constructor(questionNo, question, image, answerList) {
    this.questionNo = questionNo;
    this.question = question;
    this.image = image;
    this.answerList = answerList;
  }
}

class Answer {
  constructor(answerId, question, answer) {
    this.answerId = answerId;
    this.question = question;
    this.answer = answer;
  }
}

class UserAnswer {
  constructor(uuid, answer) {
    this.uuid = uuid;
    this.answer = answer;
  }
}

class User {
  constructor(userType, description, image, count) {
    this.userType = userType;
    this.description = description;
    this.image = image;
    this.count = count;
  }
}

class Webtoon {
  constructor(webtoonId, webtoonTitle, image, similarity) {
    this.webtoonId = webtoonId;
    this.webtoonTitle = webtoonTitle;
    this.image = image;
    this.similarity = similarity;
  }
}

// If Message had any complex fields, we'd put them on this object.
class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

// Maps username to content
var fakeDatabase = {};

var root = {
  getQuestions: () => {
    return [
      new Question(1, "question1", "quest img", [
        new Answer(1, this, "answer1"),
        new Answer(2, this, "answer2"),
      ]),
    ];
  },
  getWebtoons: ({ userType }) => {
    if (userType === "LSRA")
      return [new Webtoon(1, "webtoon1", "webtoon img", "similarity1")];
    return [new Webtoon(2, "webtoon2", "webtoon img", "similarity2")];
  },
  hello: () => {
    return "Hello world!";
  },
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({ input }) => {
    // Create a random id for our "database".
    var id = require("crypto").randomBytes(10).toString("hex");

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({ id, input }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
};

var app = express();
app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql");
});
