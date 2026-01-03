/**
 * Reusable API response helpers for Next.js route handlers.
 *
 * These helpers return the global `Response` object using `Response.json(...)`
 * so existing code that expects a `Response` (as in Next 13 route handlers)
 * can keep returning the value directly.
 *
 * Usage examples:
 *  - return jsonSuccess({ user });
 *  - return jsonError("Invalid credentials", 401);
 *  - return jsonBadRequest(["username is required", "password too short"]);
 *
 * The helpers try to keep shape consistent:
 *  { success: boolean, message?: string, data?: T, errors?: string[] }
 */

import { ApiResponse } from "@/types/ApiResponse";

/**
 * Base JSON response helper.
 * Returns a `Response` constructed by `Response.json`.
 */
export function json<T = unknown>(
  body: T,
  status: number = 200,
): Response {
  return Response.json(body as any, { status });
}

/**
 * Success response.
 * - `data` is optional payload.
 * - `message` is optional human-readable message.
 */
export function jsonSuccess<T = unknown>(
  data?: T,
  message: string = "Success",
  status: number = 200,
): Response {
  const payload: ApiResponse & { data?: T } = {
    success: true,
    message,
  };
  if (typeof data !== "undefined") payload.data = data;
  return json(payload, status);
}

/**
 * Created response (201).
 */
export function jsonCreated<T = unknown>(
  data?: T,
  message: string = "Created",
): Response {
  return jsonSuccess(data, message, 201);
}

/**
 * Generic error response.
 * Use a proper HTTP status code (default 500).
 */
export function jsonError(
  message: string = "Internal Server Error",
  status: number = 500,
): Response {
  const payload: ApiResponse = {
    success: false,
    message,
  };
  return json(payload, status);
}

/**
 * Validation / bad request response (400).
 * Accepts either a string or array of strings for errors.
 */
export function jsonBadRequest(
  errors: string | string[] = "Bad Request",
): Response {
  const errorArray = Array.isArray(errors) ? errors : [errors];
  const payload: ApiResponse & { errors: string[] } = {
    success: false,
    message: "Bad Request",
    errors: errorArray,
  };
  return json(payload, 400);
}

/**
 * Conflict response (409).
 */
export function jsonConflict(
  message: string = "Conflict",
): Response {
  return jsonError(message, 409);
}

/**
 * Not found response (404).
 */
export function jsonNotFound(
  message: string = "Not Found",
): Response {
  return jsonError(message, 404);
}

/**
 * Unauthorized response (401).
 */
export function jsonUnauthorized(
  message: string = "Unauthorized",
): Response {
  return jsonError(message, 401);
}

/**
 * Helper to create a response for validation libraries (e.g. zod).
 * Accepts an array of strings or a function that returns strings.
 */
export function jsonValidationError(
  validationErrors: string[] | (() => string[]),
  message: string = "Validation Error",
): Response {
  const errors = typeof validationErrors === "function" ? validationErrors() : validationErrors;
  const payload: ApiResponse & { errors: string[] } = {
    success: false,
    message,
    errors,
  };
  return json(payload, 400);
}

export default {
  json,
  jsonSuccess,
  jsonCreated,
  jsonError,
  jsonBadRequest,
  jsonConflict,
  jsonNotFound,
  jsonUnauthorized,
  jsonValidationError,
};
