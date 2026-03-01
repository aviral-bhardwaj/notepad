import { HStack, Text } from "@chakra-ui/react";

import type { UserInfo } from "./rustpad";

export type TypingIndicatorProps = {
  typingUsers: Record<number, UserInfo>;
};

function TypingIndicator({ typingUsers }: TypingIndicatorProps) {
  const users = Object.values(typingUsers);
  if (users.length === 0) return null;

  const names = users.map((u) => u.name);
  let message: string;
  if (names.length === 1) {
    message = `${names[0]} is typing…`;
  } else if (names.length === 2) {
    message = `${names[0]} and ${names[1]} are typing…`;
  } else {
    message = `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]} are typing…`;
  }

  return (
    <HStack h={5} px={3.5} fontSize="xs" color="#888888" flexShrink={0}>
      <Text fontStyle="italic">{message}</Text>
    </HStack>
  );
}

export default TypingIndicator;
