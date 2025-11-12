<?php
/**
 * Response Helper
 * Standardized JSON response format for all API endpoints
 */

class Response {
    /**
     * Send success response
     * @param mixed $data Data to return
     * @param string $message Optional success message
     * @param int $statusCode HTTP status code (default: 200)
     */
    public static function success($data = [], $message = 'Success', $statusCode = 200) {
        http_response_code($statusCode);
        return [
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ];
    }

    /**
     * Send error response
     * @param string $message Error message
     * @param int $statusCode HTTP status code (default: 400)
     * @param mixed $errors Optional detailed errors
     */
    public static function error($message = 'An error occurred', $statusCode = 400, $errors = null) {
        http_response_code($statusCode);
        $response = [
            'status' => 'error',
            'message' => $message
        ];
        
        if ($errors !== null) {
            $response['errors'] = $errors;
        }
        
        return $response;
    }

    /**
     * Send validation error response
     * @param array $errors Validation errors
     * @param string $message Optional error message
     */
    public static function validationError($errors, $message = 'Validation failed') {
        return self::error($message, 422, $errors);
    }

    /**
     * Send unauthorized response
     * @param string $message Optional error message
     */
    public static function unauthorized($message = 'Unauthorized access') {
        return self::error($message, 401);
    }

    /**
     * Send not found response
     * @param string $message Optional error message
     */
    public static function notFound($message = 'Resource not found') {
        return self::error($message, 404);
    }

    /**
     * Send server error response
     * @param string $message Optional error message
     */
    public static function serverError($message = 'Internal server error') {
        return self::error($message, 500);
    }
}
?>
