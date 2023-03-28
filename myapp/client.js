var fetch = require("isomorphic-fetch");

test_mutation().then((id) => test_query(id));

async function test_mutation() {
  const author = "andy";
  const content = "hope is a good thing";
  const query = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id, content, author
  }
}`;
  const { data } = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        input: {
          author,
          content,
        },
      },
    }),
  }).then((r) => r.json());

  console.log("data returned:", data);
  return data.createMessage.id;
}

async function test_query(id) {
  const getQuery = `query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id, content, author 
    }
  }`;

  fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: getQuery,
      variables: {
        id: id,
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
}
