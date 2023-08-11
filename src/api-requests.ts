import { User, Counter, Checks } from "@prisma/client";
import { members } from "./lib/conf-data";
//import { Counter } from "@prisma/client";


export type ErrorResponse = {
  status: string;
  message: string;
};

export type UserListResponse = {
  status: string;
  results: number;
  users: User[];
};

export type UserResponse = {
  status: string;
  data: { user: User };
};

export type UsersResponse = {
  status: string;
  results: number;
  users: User[];
}

export type CounterResponse = {
  status: string;
  data: { counter: Counter };
};

export type ChekResponse = {
  status: string;
  data: { check: Checks };
};

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = isJson
      ? data.message || response.statusText
      : response.statusText;
    throw new Error(message);
  }

  return data as T;
}

export async function apiCreateCheck(
  checkData: string
): Promise<Checks> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/check/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: checkData,
  });
  
  return handleResponse<ChekResponse>(response).then(
    (data) => data.data.check
  );
}

export async function apiCreateUser(
  userData: string
): Promise<User> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: userData,
  });

  return handleResponse<UserResponse>(response).then(
    (data) => data.data.user
  );
}

export async function apiFetchUsers(
  page: number,
  limit: number
): Promise<User[]> {
  const response = await fetch(
    `${SERVER_ENDPOINT}/api/users` // ?page=${page}&limit=${limit}`
  );
  
  return handleResponse<UsersResponse>(response).then(
    (data) => data.users
  );
}

export async function apiCreateCounter(
  counterData:string
): Promise<Counter>{
  const response = await fetch(`${SERVER_ENDPOINT}/api/counters/`, {
    method: "POST",
    headers: {
      "Contrnt-Type": "application/json",
    },
    body:counterData,
  });
  
  return handleResponse<CounterResponse>(response).then(
    (data) => data.data.counter
  );
}

// export async function apiFetchSingleFeedback(
//   feedbackId: string
// ): Promise<Feedback> {
//   const response = await fetch(
//     `${SERVER_ENDPOINT}/api/feedbacks/${feedbackId}`
//   );

//   return handleResponse<FeedbackResponse>(response).then(
//     (data) => data.data.feedback
//   );
// }

// export async function apiFetchFeedbacks(
//   page: number,
//   limit: number
// ): Promise<Feedback[]> {
//   const response = await fetch(
//     `${SERVER_ENDPOINT}/api/feedbacks?page=${page}&limit=${limit}`
//   );

//   return handleResponse<FeedbackListResponse>(response).then(
//     (data) => data.feedbacks
//   );
// }

// export async function apiDeleteFeedback(feedbackId: string): Promise<void> {
//   const response = await fetch(
//     `${SERVER_ENDPOINT}/api/feedbacks/${feedbackId}`,
//     {
//       method: "DELETE",
//     }
//   );

//   if (response.status !== 204) {
//     const errorResponse: ErrorResponse = await response.json();
//     if (errorResponse) {
//       throw new Error(errorResponse.message);
//     } else {
//       throw new Error(`API error: ${response.status}`);
//     }
//   }
//}
