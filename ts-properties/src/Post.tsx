import React from 'react';
import { useFetch } from 'hook-use-fetch';
import { Header } from 'semantic-ui-react';

export const Post: React.FC<{ id: string }> = ({ id }) => {
  const [fetchState, result] = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    [id]
  );
  switch (fetchState) {
    case 'loading':
      return <>Please wait while loading</>;
    case 'loaded':
      if (!isPost(result)) {
        throw new Error('');
      }
      return (
        <article>
          <Header as='h4'> {result.title}</Header>
          <br></br>
          {result.body}
        </article >
      );
    default:
      return <>Sorry, shits happen</>;
  }
}

const isPost = (obj: any): obj is { title: string, body: string } => !!obj &&
  typeof obj === "object" &&
  "title" in obj &&
  "body" in obj;
