import React, { useCallback } from 'react';
import { useApolloClient, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import { History } from 'history';

const Container = styled.div`
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

const getChatQuery = gql`
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

interface ChatRoomScreenParams {
  chatId: string;
  history: History;
}

export interface ChatQueryMessage {
  id: string;
  content: string;
  createdAt: Date;
}

export interface ChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: Array<ChatQueryMessage>;
}

type OptionalChatQueryResult = ChatQueryResult | null;

const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({
  chatId,
  history,
}) => {
  const client = useApolloClient();
  const { data } = useQuery<any>(getChatQuery, {
    variables: { chatId },
  });
  const onSendMessage = useCallback(
    (content: string) => {
      if (!data.chat) return null;

      const message = {
        id: (data.chat.messages.length + 10).toString(),
        createdAt: new Date(),
        content,
        __typename: 'Chat',
      };

      client.writeQuery({
        query: getChatQuery,
        variables: { chatId },
        data: {
          chat: {
            ...data.chat,
            messages: data.chat.messages.concat(message),
          },
        },
      });
    },
    [data, chatId, client]
  );

  if (!data) return null;

  return (
    <Container>
      <ChatNavbar chat={data.chat} history={history} />
      {data.chat.messages && <MessagesList messages={data.chat.messages} />}
      <MessageInput onSendMessage={onSendMessage} />
    </Container>
  );
};

export default ChatRoomScreen;
