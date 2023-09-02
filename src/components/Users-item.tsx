
import { User } from "@prisma/client";
import { MouseEvent, useCallback } from "react";

interface Props {
  user: User;
}

export function UserItem({ user }: Props): JSX.Element {
  return (
    <div className="flex ">
      <div>
        {user.name}
      </div>
    </div>
  );
}
